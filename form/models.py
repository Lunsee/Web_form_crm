from django.db import models

class Model_work_place(models.Model):
    id = models.AutoField(primary_key=True)
    computer_type = models.CharField(max_length=50)
    monitor_size = models.CharField(max_length=50)
    storage_type = models.CharField(max_length=50)
    hdd_memory_size = models.CharField(max_length=50)
    ssd_memory_size = models.CharField(max_length=50)
    processor_type = models.CharField(max_length=50)
    processor_note = models.TextField()
    graphics_card = models.CharField(max_length=100)
    keyboard = models.CharField(max_length=100)
    mouse = models.CharField(max_length=100)
    letters = models.TextField()
    current_date = models.DateField()  # Добавлено поле для текущей даты
    desired_date = models.DateField()  # Добавлено поле для желаемой даты
    ups_needed = models.BooleanField(default=False)  # Добавлено поле для ИБП



    class Meta:
        db_table = 'work_place'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    """
    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        # Пересчитываем и сохраняем обновленные записи
        records = YourModel.objects.order_by('id')
        for index, record in enumerate(records, start=1):
            record.id = index
            record.save()
    """

    def __str__(self):
        return f"{self.id}: {self.letters}"
