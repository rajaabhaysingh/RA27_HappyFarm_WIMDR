import urllib.request
import urllib.parse
import json
import requests
import random
import datetime
import string

# apikey = 'ugkItPT4qRo-nHFQXwzsdrtrcTZ9Ezd1SHjtQMaY8C'
apikey = 'JqkSwtNhQBY-vTZVBgXEEkjxxYqc09ZhBOYyBb3kd3'
inboxID = 10
start = 0


def get_random_alphanumeric_string(letters_count, digits_count):
    sample_str = ''.join((random.choice(string.ascii_letters)
                          for i in range(letters_count)))
    sample_str += ''.join((random.choice(string.digits)
                           for i in range(digits_count)))

    # Convert string to list and shuffle it to mix letters and digits
    sample_list = list(sample_str)
    random.shuffle(sample_list)
    final_string = ''.join(sample_list)
    return final_string


def getInboxes():
    data = urllib.parse.urlencode({'apikey': apikey})
    data = data.encode('utf-8')
    request = urllib.request.Request("https://api.textlocal.in/get_inboxes/?")
    f = urllib.request.urlopen(request, data)
    fr = f.read()
    encoding = f.info().get_content_charset('utf-8')
    JSON_object = json.loads(fr.decode(encoding))
    return(JSON_object)


def getMessages():
    data = urllib.parse.urlencode({'apikey': apikey, 'inbox_id': inboxID})
    data = data.encode('utf-8')
    request = urllib.request.Request(
        "https://api.textlocal.in/get_messages/?start=" + str(start))
    f = urllib.request.urlopen(request, data)
    fr = f.read()
    encoding = f.info().get_content_charset('utf-8')
    JSON_object = json.loads(fr.decode(encoding))
    return(JSON_object)


def sendSMS(numbers, message):
    sender = "TXTLCL"
    data = urllib.parse.urlencode({'apikey': apikey, 'numbers': numbers,
                                   'message': message, 'sender': sender, 'test': False})
    data = data.encode('utf-8')
    request = urllib.request.Request("https://api.textlocal.in/send/?")
    f = urllib.request.urlopen(request, data)
    fr = f.read()
    print(fr)


def sendErrorMessage(error, phone):
    '''
    give an error interface for user to notify something has gone wrong
    '''
    error = "Oops! Something went wrong.\nPlease recheck format\n\nMore Information about error:\n\n" + \
        error + "\nThats all from our side."
    sendMessage(error, phone)


def sendMessage(message, phone):
    '''
    Logic to send sms message goes here
    '''
    length = len(phone)
    numbers = [phone[1:length], ]
    message = message + "\n\nThank you.\nPlease visit our website at www.farmted.ml"
    sendSMS(numbers=numbers, message=message)
    print("\n\n\n\nMessage sent to user:\n\n")
    print("--------------------------------------------------------------------------")
    print(message)
    print("--------------------------------------------------------------------------")


def registerUser(phone):
    password = get_random_alphanumeric_string(6, 2)
    payload = {'password': password,
               'phone': phone, 'password_confirm': password}
    req = requests.post(
        "http://localhost:8000/phone/register_phone/", data=payload)
    data = req.json()
    message = ""
    if req.status_code == 201:
        message = "Congratulations!\nYou have been successfully registered"
        # temp = "You can use these credentials to login on our website:\n\nLogin: " + \
        #     phone + "\nPassword: " + password + "\n"
        # message = message + temp
        sendMessage(message, phone)
    else:
        for field in data:
            message = message + " " + str(data[field][0]) + '\n'
        sendErrorMessage(message, phone)


def get_my_items(phone):
    payload = {'phone': phone}
    req = requests.post(
        "http://localhost:8000/phone/register_phone/get_my_items/", data=payload)
    data = req.json()
    message = ""
    if req.status_code == 200:
        if len(data) > 0:
            message = "Here are some of your items on sale. Please visit our website to view all.\n\n"
            for obj in data:
                temp = ""
                temp = temp + "Item Id: " + str(obj['id']) + '\n'
                temp = temp + "Item name: " + str(obj['name']) + '\n'
                temp = temp + "Type: " + str(obj['group']) + '\n'
                temp = temp + "Price: " + str(float(obj['basePrice'])) + '\n'
                act_date = datetime.datetime.strptime(
                    str(obj['date_of_expiry']), "%Y-%m-%dT%H:%M:%SZ")
                act_date = act_date.strftime("%I:%M%p %B %d, %Y")
                temp = temp + "Expiry date: " + \
                    act_date + '\n'
                message = message + temp + '\n'
        else:
            message = "You have no items on sale. Please add an item on sale using our website."
        sendMessage(message, phone)
    else:
        sendErrorMessage(data['error'], phone)


def get_my_cart(phone):
    payload = {'phone': phone}
    req = requests.post(
        "http://localhost:8000/phone/register_phone/get_my_cart/", data=payload)
    data = req.json()
    message = ""
    if req.status_code == 200:
        if len(data) > 0:
            message = "Here are some of your items in cart. Please visit our website to view all.\n\n"
            for obj in data:
                temp = ""
                temp = temp + "Item Id: " + \
                    str(obj['item_details']['id']) + '\n'
                temp = temp + "Item name: " + \
                    str(obj['item_details']['name']) + '\n'
                temp = temp + "Price: " + float(obj['final_price']) + '\n'
                temp = temp + "Quantity: " + \
                    str(obj['quantity']) + '\n'
                message = message + temp + '\n'
        else:
            message = "You have no items in cart. Please add an item in your cart using our website."
        sendMessage(message, phone)
    else:
        sendErrorMessage(data['error'], phone)


def get_all_items(search, phone):
    URL = "http://localhost:8000/item/?"
    if search is not None:
        URL = URL + "search=" + str(search)
    req = requests.get(URL)
    data = req.json()
    message = ""
    if req.status_code == 200:
        if data['count'] > 0:
            message = "Here are some items on sale. Please visit our website to view all.\n\n"
            for obj in data['results'][0:5]:
                temp = ""
                temp = temp + "Item Id: " + str(obj['id']) + '\n'
                temp = temp + "Item name: " + str(obj['name']) + '\n'
                temp = temp + "Type: " + str(obj['group']) + '\n'
                temp = temp + "Base Price: " + \
                    str(float(obj['basePrice'])) + '\n'
                act_date = datetime.datetime.strptime(
                    str(obj['date_of_expiry']), "%Y-%m-%dT%H:%M:%SZ")
                act_date = act_date.strftime("%I:%M%p %B %d, %Y")
                temp = temp + "Expiry date: " + \
                    act_date + '\n'
                message = message + temp + '\n'
        else:
            message = "Currently, there are no items on sale. Please come back later."
        sendMessage(message, phone)
    else:
        sendErrorMessage(data['error'], phone)


def processMessage(message, phone):
    print("Processing Message...")
    tokens = message.split()
    if len(tokens) <= 1:
        default_message = "Instructions:\nTo register send:\nE7GEK register email password\n\nTo view your items on sale send:\nE7GEK myitems\n\nTo view your items in cart send:\nE7GEK mycart\n\nTo view all items on sale send:\nE7GEK items\n"
        sendErrorMessage(default_message, phone)
        return
    tokens.pop(0)
    query = tokens[0].lower()
    if query == 'register':
        registerUser(phone=phone)
    elif query == 'myitems':
        get_my_items(phone)
    elif query == 'mycart':
        get_my_cart(phone)
    elif query == 'items':
        if len(tokens) == 2:
            get_all_items(tokens[1], phone=phone)
        else:
            get_all_items(search=None, phone=phone)
    else:
        default_message = "Instructions:\nTo register send:\nE7GEK register email password\n\nTo view your items on sale send:\nE7GEK myitems\n\nTo view your items in cart send:\nE7GEK mycart\n\nTo view all items on sale send:\nE7GEK items\n"
        sendErrorMessage(default_message, phone)


def get_cleaned_number(number):
    return "+" + str(number)


import time

if __name__ == '__main__':
    print("running...")
    start = 0
    while True:
        time.sleep(10)
        resp = getMessages()
        if resp['status'] == 'success':
            messages = resp['messages']
            for msg in messages:
                print("message recieved\n", "is it new - ", msg['isNew'])
                if msg['isNew'] is True:
                    processMessage(
                        msg["message"], get_cleaned_number(msg['number']))
                start += 1
    print("closed...")
