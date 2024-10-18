
Task Manager
This is a Django-based task management application that helps users manage their tasks. The frontend uses React for the UI, and the backend is powered by Django.

Features
Create, update, and delete tasks
View tasks in a user-friendly interface

Prerequisites
Python 3.x
pip (Python package installer)
Git

Summary of Steps:
-Clone the repository: git clone <repo-url>
-Create and activate a virtual environment:
  python -m venv venv
  venv\Scripts\activate
-Install the dependencies using pip install -r requirements.txt.
-Run migrations: python manage.py migrate (creates the db.sqlite3).
-Optionally create a superuser: python manage.py createsuperuser.
-Start the development server: python manage.py runserver.


