# tasks/serializers.py

from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'completed']
    
    def validate_title(self, value):
        if not value:
            raise serializers.ValidationError("Title is required.")
        if len(value) < 5:
            raise serializers.ValidationError("Title must be at least 5 characters long.")
        return value
    
    def validate(self, data):
        if data['completed'] and not data['description']:
            raise serializers.ValidationError("Description is required if the task is completed.")
        return data

    def validate_completed(self, value):
        print(f"Validating completed with value: {value}") 
        if not isinstance(value, bool):
            raise serializers.ValidationError("Completed status must be a boolean. checker")
        return value
