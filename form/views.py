from django.shortcuts import render

def index(request):
    return render(request, 'table.html')
# Create your views here.

def table_view(request):
    return render(request, 'table.html')

from .utils.api_view import MyAPIHandler
from .utils.database import insert_data_to_database

