# Generated by Django 5.1.2 on 2024-12-01 23:54

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_comment_profile'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['-created_at'], 'verbose_name': 'Comment', 'verbose_name_plural': 'Comments'},
        ),
        migrations.AddField(
            model_name='comment',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, verbose_name='Updated At'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='rating',
            field=models.DecimalField(decimal_places=1, max_digits=2, validators=[api.models.validate_rating], verbose_name='Rating'),
        ),
    ]