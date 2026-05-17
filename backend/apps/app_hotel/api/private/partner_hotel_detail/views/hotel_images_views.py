from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, exceptions

from django.utils.text import slugify
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import uuid
import os

from apps.app_user.models import NguoiDung
from apps.app_hotel.models import KhachSan
from apps.app_hotel.model.hinh_anh_models import HinhAnhKhachSan
from apps.app_hotel.api.private.partner_hotel_detail.serializers.hotel_images_serializers import (
    PartnerHotelImageSerializer,
)
from apps.app_hotel.api.permissions import (
    IsAuthenticatedPartner,
    IsAuthenticatedPartnerActive,
)

class BasePartnerHotelImageView(APIView):
    permission_classes = [IsAuthenticatedPartner, IsAuthenticatedPartnerActive]
    serializer_class = PartnerHotelImageSerializer

    def _get_partner_hotel(self, partner: NguoiDung) -> KhachSan:
        try:
            return KhachSan.objects.get(id_user=partner)
        except KhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Partner has not yet registered a hotel."}
            )

class PartnerHotelImageListView(BasePartnerHotelImageView):
    def get(self, request: Request, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        images = HinhAnhKhachSan.objects.filter(id_hotel=hotel)
        serializer = self.serializer_class(images, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request: Request, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        
        # Handle file upload if present
        request_data = request.data.copy() if hasattr(request.data, 'copy') else request.data
        if 'file' in request.FILES:
            file = request.FILES['file']
            fs = FileSystemStorage(location=os.path.join(settings.MEDIA_ROOT, 'hotel_images'))
            
            # Generate a unique filename to prevent overwriting
            ext = file.name.split('.')[-1]
            unique_filename = f"{uuid.uuid4().hex}.{ext}"
            filename = fs.save(unique_filename, file)
            
            # Generate the URL
            request_data['url'] = f"{settings.MEDIA_URL}hotel_images/{filename}"

        # Determine slug from name
        image_name = request_data.get('image_name', 'hotel_image')
        slug = slugify(image_name)
        
        serializer = self.serializer_class(data=request_data)
        if serializer.is_valid():
            # If this is set as primary, unset other primary images
            # QueryDict returns strings, so we must parse boolean
            is_primary = request_data.get('is_primary', 'false').lower() == 'true' if isinstance(request_data.get('is_primary'), str) else request_data.get('is_primary', False)
            
            if is_primary:
                HinhAnhKhachSan.objects.filter(id_hotel=hotel, is_primary=True).update(is_primary=False)
                
            serializer.save(id_hotel=hotel, slug=slug, is_primary=is_primary)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PartnerHotelImageDetailView(BasePartnerHotelImageView):
    def _get_hotel_image(self, hotel: KhachSan, id_hotel_image: int) -> HinhAnhKhachSan:
        try:
            return HinhAnhKhachSan.objects.get(id_hotel=hotel, id_hotel_image=id_hotel_image)
        except HinhAnhKhachSan.DoesNotExist:
            raise exceptions.NotFound(
                detail={"error": "Image not found or does not belong to your hotel."}
            )

    def get(self, request: Request, id_hotel_image: int, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        image = self._get_hotel_image(hotel, id_hotel_image)
        serializer = self.serializer_class(image)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request: Request, id_hotel_image: int, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        image = self._get_hotel_image(hotel, id_hotel_image)
        
        # Partial update
        serializer = self.serializer_class(image, data=request.data, partial=True)
        
        if serializer.is_valid():
            # Handle slug if name changed
            if 'image_name' in serializer.validated_data:
                serializer.validated_data['slug'] = slugify(serializer.validated_data['image_name'])
                
            # If setting as primary, unset others
            if serializer.validated_data.get('is_primary', False) and not image.is_primary:
                HinhAnhKhachSan.objects.filter(id_hotel=hotel, is_primary=True).update(is_primary=False)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, id_hotel_image: int, *args, **kwargs):
        hotel = self._get_partner_hotel(request.user)
        image = self._get_hotel_image(hotel, id_hotel_image)
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
