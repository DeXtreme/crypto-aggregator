# Generated by Django 3.1.2 on 2021-10-26 18:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='coin_choices',
            new_name='coin',
        ),
        migrations.AddField(
            model_name='order',
            name='account',
            field=models.ForeignKey(default='0', on_delete=django.db.models.deletion.CASCADE, to='account.account'),
            preserve_default=False,
        ),
    ]