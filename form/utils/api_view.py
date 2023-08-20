
from django.shortcuts import render
import requests
from django.views import View
from django.http import JsonResponse
from form.models import Model_work_place
from datetime import datetime
import json
import paramiko
import re


def get_synology_data(request):
    # Параметры подключения SSH к серверу Synology
    host = '176.226.182.33'
    port = 22
    username = 'Dist'
    password = 'Dolgopolov1'

    # Команда для получения списка файлов
    folders_command = 'ls /volume1'
    users_command = "awk -F: '$3 >= 1000 && $3 < 65534 {print $1}' /etc/passwd"

    try:
        # Создание SSH-соединения
        client = paramiko.SSHClient()
        client.load_system_host_keys()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect(host, port, username, password)

        # Выполнение команды на сервере Synology для списка папок
        _, stdout, _ = client.exec_command(folders_command)
        folders = stdout.read().decode().splitlines()


        # Выполнение команды на сервере Synology для списка пользователей
        _, stdout, _ = client.exec_command(users_command)
        users = stdout.read().decode().splitlines()

        # Фильтрация папок и список пользователей, исключая те, которые начинаются с символа "@"
        folders = [folder for folder in folders if not folder.startswith('@')]
        users = [user for user in users if not user == "http"]

        # Закрытие SSH-соединения
        client.close()

        # Вывод списка папок в консоль
        print("List of folders:", folders)
        print("List of users:", users)

        # Возвращаем  в JSON-ответе
        return {'success': True, 'folders': folders, 'users': users}

    except paramiko.AuthenticationException:
        return JsonResponse({'success': False, 'error': 'Ошибка аутентификации SSH'})

    except paramiko.SSHException as e:
        return JsonResponse({'success': False, 'error': f'Ошибка SSH: {str(e)}'})

    except Exception as e:
        return JsonResponse({'success': False, 'error': f'Произошла ошибка: {str(e)}'})


def get_user_permissions(username, folder_path):
    synology_ip = '176.226.182.33'
    synology_port = 22
    synology_username = 'Dist'
    synology_password = 'Dolgopolov1'

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        ssh.connect(synology_ip, port=synology_port, username=synology_username, password=synology_password)

        # Формируем команду для получения прав доступа к папке
        command = f'sudo /usr/syno/bin/synoacltool -get "/volume1/{folder_path}" | grep {username}'
        print("command:", command)
        stdin, stdout, stderr = ssh.exec_command(command)
        output = stdout.read().decode().strip()
        print(stderr.readlines())
        print("Output:", output)
        ssh.close()

        # Регулярное выражение для извлечения прав
        pattern = r'user:Dist:allow:(.*):fd--'
        # Поиск совпадений с помощью регулярного выражения
        matches = re.search(pattern, output)

        # Если найдено совпадение, извлечь права из группы захвата
        if matches:
            permissions = matches.group(1)
            print("Права в функции:", permissions)
            correct_permissions = permissions[:11]
            print("Корректировка переменной с правами:", correct_permissions)
            return correct_permissions
        else:
            print("Права не найдены.")


    except paramiko.ssh_exception.AuthenticationException as e:
        # Обработка ошибки неверных учетных данных
        return f"Ошибка аутентификации: {e}"

    except paramiko.ssh_exception.SSHException as e:
        # Обработка других ошибок SSH
        return f"Ошибка SSH: {e}"

    except Exception as e:
        # Обработка других ошибок
        return f"Ошибка: {e}"


class MyAPIHandler(View):
    def post(self, request):
        data = request.POST
        variant = data.get('customSelectOption_main_select')
        print("Variant is:")
        print(variant)

        if variant == 'syn_us_fold':
            print("Variant is 'add_rights'")
            synology_data_response = get_synology_data(request)
            success = synology_data_response.get('success')

            if success:
                folders = synology_data_response.get('folders')
                print("Success is 'True'")
                users = synology_data_response.get('users')
                print("Users:", users)
                return JsonResponse({'success': True, 'folders': folders, 'users': users})
            else:
                error = synology_data_response.get('error')
                print("Success is 'False'")
                return JsonResponse({'success': False, 'message': error})

        if variant == 'syn_perm':
            user_from_select = data.get('UsersSelect')
            folder_from_select = data.get('folderSelect')
            print("user_from_select:", user_from_select)
            print("folder_from_select:", folder_from_select)
            if (user_from_select != '' and  folder_from_select  != ''):
                permissions = get_user_permissions(user_from_select, folder_from_select)
                print("perm in api:", permissions)

                if permissions != '':
                    print("Success is 'True'")

                    return JsonResponse({'success': True, 'permission': permissions})



        if variant == 'org':
            print("Variant is 'org'")
            computer_type = data.get('computerType_select')
            print("computer_type:", computer_type)

            monitor_size = data.get('monitorSize_select')
            print("monitor_size:", monitor_size)

            storage_type = data.get('storageType_select')
            print("storage_type:", storage_type)

            hdd_memory_size = data.get('hhdmemorySize_select')
            print("hdd_memory_size:", hdd_memory_size)

            ssd_memory_size = data.get('ssdmemorySize_select')
            print("ssd_memory_size:", ssd_memory_size)

            processor_type = data.get('processorType_select')
            print("processor_type:", processor_type)


            processor_note = data.get('processorNote')
            graphics_card = data.get('graphicsCard')
            keyboard = data.get('keyboard')
            mouse = data.get('mouse')
            user_date = datetime.strptime(data.get('desiredDate'), '%Y-%m-%d').date()
            letters = data.get('letters')
            ups_needed = data.get('upsNeeded')

            if ups_needed == 'true':
                ups_needed = True
            else:
                ups_needed = False

            current_date = datetime.now().date()

            Model_work_place.objects.create(
                letters=letters,
                computer_type=computer_type,
                monitor_size=monitor_size,
                storage_type=storage_type,
                hdd_memory_size=hdd_memory_size,
                ssd_memory_size=ssd_memory_size,
                processor_type=processor_type,
                processor_note=processor_note,
                graphics_card=graphics_card,
                keyboard=keyboard,
                mouse=mouse,
                desired_date=user_date,
                current_date=current_date,
                ups_needed=ups_needed
            )

            response = {
                'success': True,
                'message': 'Data inserted successfully',
            }
            return JsonResponse(response)

        else:
            return JsonResponse({'success': False, 'message': 'Invalid variant value'})


        return JsonResponse({'success': False, 'message': 'Invalid variant'})