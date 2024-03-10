FROM python:3.11-slim

WORKDIR /app

COPY . .
RUN pip install -r requirements.txt

WORKDIR /app/flask-app
CMD ["python", "app.py"]
