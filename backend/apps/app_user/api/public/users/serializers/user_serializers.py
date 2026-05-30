from rest_framework import serializers
from apps.app_user.model.nguoi_dung_models import ThongTinNguoiDung, NguoiDung

class ThongTinNguoiDungSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThongTinNguoiDung
        fields = [
            'first_name', 'last_name', 'display_name', 'phone_number',
            'date_of_birth', 'country', 'gender', 'address'
        ]

class UserSerializer(serializers.ModelSerializer):
    personal_info = ThongTinNguoiDungSerializer(read_only=True)

    class Meta:
        model = NguoiDung
        fields = ['id_user', 'email', 'personal_info', "verified_at", "verification_expires_at"]

class UserPartialUpdateSerializer(serializers.ModelSerializer):
    personal_info = ThongTinNguoiDungSerializer()

    class Meta:
        model = NguoiDung
        fields = ['id_user', 'email', 'personal_info']
        read_only_fields = ['id_user', 'email']

    def update(self, instance: NguoiDung, validated_data):
        personal_info_data = validated_data.pop('personal_info', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if personal_info_data is not None:
            ThongTinNguoiDung.objects.update_or_create(
                id_user=instance,
                defaults=personal_info_data
            )
            
        return instance
    
    
