from django.contrib import admin
from .models import Room, Resource, Reservation, MaintenanceRequest

# Register your models here.
@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('room_num', 'room_type', 'capacity', 'is_available')
    search_fields = ('room_num',)
    list_filter = ('room_type', 'is_available')
    
@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('name', 'resource_type', 'serial_number', 'allocated_to')
    search_fields = ('name', 'serial_number', 'allocated_to')
    list_filter = ('resource_type',)
    
@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('room', 'type', 'start_time', 'end_time')
    search_fields = ('room__room_num',)
    list_filter = ('type', 'start_time', 'end_time')
    
@admin.register(MaintenanceRequest)
class MaintenanceRequestAdmin(admin.ModelAdmin):
    list_display = ('room', 'status', 'created_at', 'updated_at')
    search_fields = ('room__room_num', 'description')
    list_filter = ('status', 'created_at', 'updated_at')