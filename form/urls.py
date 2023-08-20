from django.urls import path
from . import views
from .utils.api_view import MyAPIHandler, get_synology_data

app_name = 'form'

urlpatterns = [
    path('table/', views.index, name='table'),
    path('api/', MyAPIHandler.as_view(), name='api'),
    #path('api/', get_synology_folders(request='requests'), name='api'),



    # Добавьте другие пути здесь
]
