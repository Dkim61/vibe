# Pull base image
FROM python:3.9

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install dependencies
COPY Pipfile Pipfile.lock /code/
RUN pip install pipenv && pipenv install --system
RUN pip install requests
RUN pip install python-decouple
RUN pip install gunicorn
RUN pipenv install npm
# RUN pipenv npm install @mui/material 
CMD gunicorn --bind 0.0.0.0:$PORT config.wsgi


# Copy project
COPY . /code/