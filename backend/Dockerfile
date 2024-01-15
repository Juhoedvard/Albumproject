# Käytä Pythonin virallista kuvaa pohjana
FROM python:latest

# Aseta työskentelykansio kontissa
WORKDIR /backend
ENV PYTHONBUFFERED=1


RUN pip install --upgrade pip
# Kopioi vaaditut tiedostot konttiin
COPY requirements.txt .

# Asenna riippuvuudet
RUN pip install --no-cache-dir -r requirements.txt

# Kopioi Django-sovelluksen koodi konttiin
COPY . .


CMD ["gunicorn", "--config", "./gunicorn_conf.py", "photo_album.wsgi"]


