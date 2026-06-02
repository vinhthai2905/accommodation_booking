from django.db import transaction
from django.db.models import QuerySet
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import status
from rest_framework import exceptions
from rest_framework.request import Request
from rest_framework.response import Response

from apps.common.base import HotelBaseView
from apps.common.helpers import get_hotel
from apps.common.permission.user_permissions import IsCustomer

from apps.app_booking.choices import TrangThaiDatPhong, PhuongThucThanhToan, TrangThaiThanhToan
from apps.app_booking.models import DatPhong, HoaDon, ThanhToan
from apps.app_booking.models import (
    ChiTietDatPhong,
    ChiTietKhachTreEm,
)
from apps.app_booking.api.public.bookings_users.serializers import (
    BookingCreateSerializer
)

from apps.app_payment.services import ZaloPayCreateOrderService
from apps.app_payment.api.exceptions.zalo import ZaloPaymentGatewayException

from apps.app_hotel.models import PhongKhachSan, KhachSan, ChinhSachTreEm
from apps.app_user.models import NguoiDung


class BookingCreateView(HotelBaseView):
    permission_classes = [IsCustomer]
    serializer_class = BookingCreateSerializer
    hotel_model = KhachSan

    def _flatten_booking_payload(self, incoming_data):
        guest_booking = incoming_data.get("guestBooking", {})
        hotel_selection = incoming_data.get("hotelSelection", {})
        guest_info = incoming_data.get("guestInfo", {})

        return {
            "first_name": guest_info.get("firstName"),
            "last_name": guest_info.get("lastName"),
            "email": guest_info.get("email"),
            "phone_number": guest_info.get("phoneNumber"),
            "country": guest_info.get("country"),
            # -------------------------------------------
            "id_hotel": hotel_selection.get("hotelId"),
            "selected_rooms": hotel_selection.get("roomIds", []),
            # ---------------------------------------------
            "total_adults": guest_booking.get("adults"),
            "total_children": guest_booking.get("children", 0),
            "children_ages": guest_booking.get("childrenAges", []),
            "check_in": guest_booking.get("checkIn"),
            "check_out": guest_booking.get("checkOut"),
            "check_in_time": guest_booking.get("checkInTime"),
            "note": guest_booking.get("note", ""),
        }

    def _validate_booking_payload(self, data):
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)

        return serializer.validated_data

    def _get_user_by_id(self, email):
        try:
            user = NguoiDung.objects.get(email=email)
        except:
            raise exceptions.NotFound("User not found by the given email.")

        return user

    def _get_hotel_child_policy(self, hotel: KhachSan):
        try:
            return hotel.child_policy
        except ObjectDoesNotExist:
            return None

    def _create_booking(
        self, validated_data, hotel: KhachSan, user: NguoiDung
    ) -> DatPhong:
        return DatPhong.objects.create(
            id_user=user,
            id_hotel=hotel,
            check_in_date=validated_data["check_in"],
            check_out_date=validated_data["check_out"],
            check_in_time=validated_data.get("check_in_time"),
            total_room_quantity=len(validated_data["selected_rooms"]),
            total_adults=validated_data.get("total_adults", 0),
            total_children=validated_data.get("total_children", 0),
            note=validated_data.get("note", ""),
            status=TrangThaiDatPhong.PENDING,
        )

    def _get_selected_rooms_with_room_type(self, selected_rooms: list):
        selected_room_ids = [room.id_room for room in selected_rooms]

        return PhongKhachSan.objects.select_related("id_room_type").filter(
            id_room__in=selected_room_ids
        )

    def _create_booking_details(
        self, booking: DatPhong, selected_rooms: QuerySet[PhongKhachSan]
    ) -> int:
        room_amount = 0

        prefetch_selected_rooms = self._get_selected_rooms_with_room_type(
            selected_rooms
        )

        for room in prefetch_selected_rooms:
            ChiTietDatPhong.objects.create(id_booking=booking, id_room=room)
            room_amount = room_amount + room.id_room_type.price

        return room_amount

    def _get_chargeable_child_ages(self, children_ages, child_policy):
        chargeable_ages = []

        for age in children_ages:
            age = int(age)

            is_adult = age > child_policy.adult_age_from
            is_free_child = age < child_policy.max_free_age

            if is_adult or is_free_child:
                continue

            chargeable_ages.append(age)

        return chargeable_ages

    def _create_child_booking_details(
        self, booking: DatPhong, hotel_child_policy, validated_data
    ) -> int:

        if int(validated_data.get("total_children", 0)) == 0:
            return 0
            
        if not hotel_child_policy:
            return 0

        total_child_surcharge = 0
        chargeable_ages = self._get_chargeable_child_ages(
            validated_data.get("children_ages", []), hotel_child_policy
        )

        if len(chargeable_ages) > 0:
            for age in chargeable_ages:
                ChiTietKhachTreEm.objects.create(
                    id_booking=booking,
                    age=age,
                    surcharge_price=hotel_child_policy.surcharge_amount,
                )
                total_child_surcharge += hotel_child_policy.surcharge_amount

        return total_child_surcharge

    def _create_invoce(
        self, booking: DatPhong, total_child_surcharge, room_amount
    ) -> HoaDon:
        return HoaDon.objects.create(
            id_booking=booking,
            total_child_surcharge=total_child_surcharge,
            room_amount=room_amount,
            total_amount=total_child_surcharge + room_amount,
        )
        
    def _create_zalo_order_service(self, booking: DatPhong, invoice: HoaDon, user: NguoiDung) -> dict:
        try:
            zalo_create_order_result = ZaloPayCreateOrderService.create_order(booking, invoice, user)
        except Exception as e:
            raise ZaloPaymentGatewayException(detail={"error": e})

        return zalo_create_order_result
    
    def _create_payment_order_record(self, invoice: HoaDon, id_transaction: str):
        ThanhToan.objects.create(
            id_transaction_service=id_transaction,
            id_invoice = invoice,
            payment_method=PhuongThucThanhToan.ZALOPAY,
            status=TrangThaiThanhToan.PENDING,
            paid_amount = invoice.total_amount
        )

    def post(self, request: Request, *args, **kwargs):
        flatten_data = self._flatten_booking_payload(request.data)
        validated_data = self._validate_booking_payload(flatten_data)

        try:
            with transaction.atomic():
                hotel = get_hotel(id_hotel=validated_data["id_hotel"])
                hotel_child_policy = self._get_hotel_child_policy(hotel)
                user = self._get_user_by_id(email=validated_data["email"])

                booking = self._create_booking(validated_data, hotel, user)
                room_amount = self._create_booking_details(
                    booking, validated_data["selected_rooms"]
                )
                total_child_surcharge = self._create_child_booking_details(
                    booking, hotel_child_policy, validated_data
                )
                invoice = self._create_invoce(
                    booking, total_child_surcharge, room_amount
                )
                
                zalo_order_result = self._create_zalo_order_service(booking, invoice, user)
                
                self._create_payment_order_record(invoice, zalo_order_result["id_transaction"])
                 
                return Response(
                    {
                        "message": "Booking created successfully.",
                        "id_booking": booking.id_booking,
                        "payment_gateway_result": {
                            **zalo_order_result
                        }
                    },
                    status=status.HTTP_201_CREATED,
                )
        except exceptions.NotFound as e:
            raise exceptions.NotFound(detail={"error": str(e)})

        except Exception as e:
            raise exceptions.APIException(detail={"error": str(e)})
