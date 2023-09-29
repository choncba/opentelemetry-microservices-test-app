# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1
ENV  PYTHONIOENCODING=utf-8
WORKDIR /src
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY main.py .

# Run the application
CMD ["python3", "main.py"]