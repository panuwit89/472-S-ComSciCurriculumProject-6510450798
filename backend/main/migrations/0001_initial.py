# Generated by Django 5.1.5 on 2025-02-15 17:35

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Curriculum',
            fields=[
                ('curriculum_id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('curriculum_name', models.CharField(max_length=200)),
                ('total_credit', models.IntegerField()),
                ('curriculum_year', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('email', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=20)),
                ('name', models.CharField(max_length=200)),
                ('student_code', models.CharField(blank=True, max_length=10, null=True)),
                ('role', models.CharField(choices=[('student', 'Student'), ('inspector', 'Inspector')], max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('category_id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('category_name', models.CharField(max_length=200)),
                ('category_min_credit', models.IntegerField()),
                ('curriculum_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.curriculum')),
            ],
        ),
        migrations.CreateModel(
            name='Subcategory',
            fields=[
                ('subcategory_id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('subcategory_name', models.CharField(max_length=200)),
                ('subcateory_min_credit', models.IntegerField()),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.category')),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.CharField(max_length=11, primary_key=True, serialize=False)),
                ('credit', models.IntegerField()),
                ('course_name_th', models.CharField(max_length=200)),
                ('course_name_en', models.CharField(max_length=200)),
                ('subcategory_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.subcategory')),
            ],
        ),
        migrations.CreateModel(
            name='Enrollment',
            fields=[
                ('enrollment_id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('semester', models.IntegerField(choices=[(1, 'First'), (2, 'Second')])),
                ('year', models.IntegerField()),
                ('grade', models.DecimalField(decimal_places=2, max_digits=3)),
                ('course_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.course')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.user')),
            ],
        ),
    ]
