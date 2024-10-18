# tasks/tests.py

from rest_framework import status
from rest_framework.test import APITestCase
from .models import Task

class TaskViewSetTests(APITestCase):

    def setUp(self):
        self.task_data = {
            'title': 'Sample Task',
            'description': 'This is a sample task description.',
            'completed': 'False'
        }
        self.task = Task.objects.create(**self.task_data)  

    def test_create_task(self):
        response = self.client.post('/api/tasks/', self.task_data)
        print(response.data)  
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 2)

    def test_list_tasks(self):
        response = self.client.get('/api/tasks/')  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  

    def test_retrieve_task(self):
        response = self.client.get(f'/api/tasks/{self.task.id}/')  
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.task.title)  

    def test_update_task(self):
        update_data = {
            'title': 'Updated Task',
            'description': 'This is an updated task description.',
            'completed': 'True'
        }
        response = self.client.put(f'/api/tasks/{self.task.id}/', update_data)
        print(response.data, 'dummy data') 
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_task(self):
        response = self.client.delete(f'/api/tasks/{self.task.id}/')  
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 0)  
