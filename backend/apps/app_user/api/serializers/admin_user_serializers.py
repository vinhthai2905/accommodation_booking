from rest_framework import serializers

from apps.app_user.models import NguoiDung, VaiTro, VaiTroNguoiDung

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = VaiTro
        fields = ['id_role', 'role_name']

class AdminUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='personal_info.first_name', allow_null=True, required=False)
    last_name = serializers.CharField(source='personal_info.last_name', allow_null=True, required=False)
    phone_number = serializers.CharField(source='personal_info.phone_number', allow_null=True, required=False)
    role_name = serializers.CharField(write_only=True, required=False)
    current_role = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True, required=False)
    
    hotel_name = serializers.SerializerMethodField()
    hotel_image = serializers.SerializerMethodField()

    class Meta:
        model = NguoiDung
        fields = [
            'id_user', 'email', 'first_name', 'last_name', 'phone_number', 
            'is_active', 'role_name', 'current_role', 'password',
            'hotel_name', 'hotel_image'
        ]
        extra_kwargs = {
            'id_user': {'read_only': True},
        }

    def get_current_role(self, obj):
        role_rel = obj.role_set.first()
        if role_rel:
            return {
                'id_role': role_rel.id_role.id_role,
                'role_name': role_rel.id_role.role_name
            }
        return None

    def get_hotel_name(self, obj):
        if hasattr(obj, 'hotel') and obj.hotel:
            return obj.hotel.name
        return None

    def get_hotel_image(self, obj):
        if hasattr(obj, 'hotel') and obj.hotel:
            primary_image = obj.hotel.hotel_images.filter(is_primary=True).first()
            if primary_image:
                return primary_image.url
            any_image = obj.hotel.hotel_images.first()
            if any_image:
                return any_image.url
        return None

    def create(self, validated_data):
        role_name = validated_data.pop('role_name', 'Khách hàng')
        personal_info = validated_data.pop('personal_info', {})
        first_name = personal_info.get('first_name', '')
        last_name = personal_info.get('last_name', '')
        phone_number = personal_info.get('phone_number', '')
        
        user = NguoiDung.objects.create_user(
            email=validated_data['email'],
            password=validated_data.get('password', 'default_password'),
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            role_name=role_name
        )
        
        # update is_active if provided
        if 'is_active' in validated_data:
            user.is_active = validated_data['is_active']
            user.save()

        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
            
        instance.save()

        personal_info = validated_data.get('personal_info', {})
        if personal_info or hasattr(instance, 'personal_info'):
            info = getattr(instance, 'personal_info', None)
            if info:
                info.first_name = personal_info.get('first_name', info.first_name)
                info.last_name = personal_info.get('last_name', info.last_name)
                info.phone_number = personal_info.get('phone_number', info.phone_number)
                info.save()

        if 'role_name' in validated_data:
            instance.role_set.all().delete()
            try:
                role = VaiTro.objects.get(role_name=validated_data['role_name'])
                VaiTroNguoiDung.objects.create(id_user=instance, id_role=role)
            except VaiTro.DoesNotExist:
                pass

        return instance
