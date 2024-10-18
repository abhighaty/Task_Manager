from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()  # Base queryset for all operations
    serializer_class = TaskSerializer  # Serializer for validation and serialization
    http_method_names = ['get', 'post', 'put', 'delete'] 

    def create(self, request, *args, **kwargs):
        title = request.data.get('title')
        description = request.data.get('description')
        completed = request.data.get('completed')

        # Check for missing fields
        if not title or not isinstance(title, str) or len(title) == 0:
            return Response({"error": "Title is required and must be a non-empty string."}, 
                            status=status.HTTP_400_BAD_REQUEST)

        if not description or not isinstance(description, str):
            return Response({"error": "Description must be a string."}, 
                            status=status.HTTP_400_BAD_REQUEST)

        if not (isinstance(completed, bool) or (completed=='True' or completed=='False')):
            print(completed)
            return Response({"error": "Completed status must be a boolean."}, 
                            status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)  
    
    def retrieve(self, request, pk=None):
        try:
            task = self.get_object() 
            serializer = self.get_serializer(task)
            return Response(serializer.data)
        except NotFound:
            return Response({"error": "Task not found."}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            task = self.get_object()  
            task.delete()  
            return Response(status=status.HTTP_204_NO_CONTENT)
        except NotFound:
            return Response({"error": "Task not found."}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        title = request.data.get('title')
        description = request.data.get('description')
        completed = request.data.get('completed')

        if title is not None and (not isinstance(title, str) or len(title) == 0):
            return Response({"error": "Title must be a non-empty string."}, 
                            status=status.HTTP_400_BAD_REQUEST)

        if description is not None and not isinstance(description, str):
            return Response({"error": "Description must be a string."}, 
                            status=status.HTTP_400_BAD_REQUEST)

        if completed is not None and not (isinstance(completed, bool) or (completed=='True' or completed=='False')):
            print(completed)
            return Response({"error": "Completed status must be a boolean."}, 
                            status=status.HTTP_400_BAD_REQUEST)

        return super().update(request, *args, **kwargs)  
        
    
        
    
