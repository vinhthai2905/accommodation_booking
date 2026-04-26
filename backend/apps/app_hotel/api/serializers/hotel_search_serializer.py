from rest_framework import serializers

class HotelSearchParamsSerializer(serializers.Serializer):
    check_in = serializers.DateField(input_formats=["%d-%m-%Y"], required=True)
    check_out = serializers.DateField(input_formats=["%d-%m-%Y"], required=True)
    location = serializers.CharField(required=True)
    rooms = serializers.IntegerField(min_value=1, required=True)
    adults = serializers.IntegerField(min_value=1, required=True)
    children = serializers.IntegerField(min_value=0, required=False, default=0)
    children_ages = serializers.ListField(
        child=serializers.IntegerField(min_value=0, max_value=17),
        required=False,
        default=list
    )