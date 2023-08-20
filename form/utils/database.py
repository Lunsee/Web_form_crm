from django.db import IntegrityError
from form.models import Model_work_place


#from .models import MyModel

def insert_data_to_database(place_id, letters):
    try:

       # my_model.save()
        Model_work_place.objects.create(place_id=place_id, letters=letters)
        print("Data inserted successfully")
    except IntegrityError as e:
        print(f"Error inserting data to database: {e}")
