# FarmTed Backend : (Part 2)

## State Api's

This project aims to build a rest api using [Django Rest Framework](https://www.django-rest-framework.org/) also known as DRF.

## Use Cases

To get a list of States(**Note: No params set**):

    http://localhost:8000/views/places/

To get a list of District:

    http://localhost:8000/views/places/?state=STATE

To get a list of Sub-Districts:

    http://localhost:8000/views/places/?district=DISTRICT

To get a list of Villages:

    http://localhost:8000/views/places/?sub_district=SUB_DISTRICT

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Download and install [pip](https://pip.pypa.io/en/stable/installing/) and [python](https://www.python.org/downloads/), preferably the latest versions.

### Development

Install using `pip`...

    pip install virtualenv

To verify installation run

    pip show virtualenv

Create a virutalenv

    virtualenv mypython

Activate the virutal environment

    source mypython/bin/activate

To deactivate the virtual environment, use

    deactivate

You can learn more about customizing your virutal environment [here](https://virtualenvwrapper.readthedocs.io/en/latest/command_ref.html#controlling-the-active-environment)

Use the `requirements.txt` to install all the required dependencies

    pip install -r requirements.txt

After the installation, get into the `state` folder

    cd state

Install the dependencies for `Swagger-UI`

    npm install

Here we are done with the `installation` part.

## Time to get our app `up` and `running`

Migrate the database

    ./manage.py makemigrations && ./manage.py migrate

Create a `Super User` to use all the features

    ./manage.py createsuperuser

Fill all the details required and start the app

    ./manage.py runserver

## Acknowledgments

* Code -> eat -> repeat