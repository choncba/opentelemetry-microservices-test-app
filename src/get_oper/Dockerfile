FROM python:3.9.18-slim-bullseye
WORKDIR /code
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY app.py .
# ENV PORT=8003
# EXPOSE ${PORT}
ENV FLASK_APP=app
CMD ["flask", "run", "--host=0.0.0.0", "--port=80"]