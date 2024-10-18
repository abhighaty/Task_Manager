# my_project/utils.py

from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):

    response = exception_handler(exc, context)

    if response is None:
        return Response(
            {"error": "A server error occurred."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    if response.status_code == status.HTTP_404_NOT_FOUND:
        response.data = {"error": "The requested resource was not found."}
    elif response.status_code == status.HTTP_400_BAD_REQUEST:
        original_error_message = response
        response.data = {"error": f"Bad request. input data validation failed"}

    return response
