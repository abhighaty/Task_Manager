
# Task Manager
This is a Django-based task management application that helps users manage their tasks. The frontend uses React for the UI, and the backend is powered by Django.

## Prerequisites
Python 3.x
pip (Python package installer)
Git

## Features
Create, update, and delete tasks
View tasks in a user-friendly interface

* Note - 'taskmanager' folder contains the django app and 'task_app' folder contains the react app

## Summary of Steps for backend setup:

* Clone the repository: git clone <repo-url>
* Create and activate a virtual environment:
    ``` 
    * python -m venv venv
    * venv\Scripts\activate 
    ```
* Install the dependencies using pip install -r requirements.txt(upgrade to latest pip if facing issues installing requirements.txt).
* Run migrations: python manage.py migrate (creates the db.sqlite3).
* Start the development server: python manage.py runserver.

## Summary of Steps for frontend setup:
* Navigate to the Frontend Directory

    ```cd task_app```

* Install the Necessary Dependencies

    ```npm install```

* Start the Development Server

    ```npm start```


## Additional information:

* Run tests.py under tasks app under taskmanager.
* To test APIs from swagger - http://127.0.0.1:8000/swagger/
* To test API - http://127.0.0.1:8000/api/tasks/
* React webpage view to use the application  - http://localhost:3000/
