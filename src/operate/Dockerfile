# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /src

COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY main.py .
COPY log_conf.yml .

EXPOSE 80

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80", "--log-config", "log_conf.yml"]