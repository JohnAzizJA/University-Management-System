from django.db import models

# Create your models here.
class Room(models.Model):
    ROOM_TYPES = [
        ('CLASSROOM', 'Classroom'),
        ('LAB', 'Laboratory'),
    ]
    
    room_num = models.CharField(max_length=10, unique=True)
    room_type = models.CharField(max_length=20, choices=ROOM_TYPES, default='CLASSROOM')
    capacity = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)
    
    def __str__(self):
        return f"Room {self.room_num} ({self.get_room_type_display()}) - Capacity: {self.capacity}"
    
class Resource(models.Model):
    RESOURCE_TYPES = [
        ('EQUIPMENT', 'Equipment'),
        ('SOFTWARE', 'Software'),
        ('OTHER', 'Other'),
    ]
    
    name = models.CharField(max_length=100)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    serial_number = models.CharField(max_length=100, blank=True, null=True)
    allocated_to = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return f"{self.name} ({self.get_resource_type_display()})"
    
class Reservation(models.Model):
    RESERVATION_TYPES = [
        ('CLASS', 'Class'),
        ('EVENT', 'Event'),
    ]
    
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='reservations')
    type = models.CharField(max_length=255, choices=RESERVATION_TYPES)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    
    def __str__(self):
        return f"Reservation for {self.room.room_num} from {self.start_time} to {self.end_time} ({self.get_type_display()})"
    
class MaintenanceRequest(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
    ]
    
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='maintenance_requests')
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Maintenance Request for {self.room.room_num} - Status: {self.get_status_display()}"