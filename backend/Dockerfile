FROM python:3.11-slim

# Add Tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

WORKDIR /app

COPY . .
RUN pip install -r requirements.txt

WORKDIR /app/flask-app
CMD ["python", "app.py"]
