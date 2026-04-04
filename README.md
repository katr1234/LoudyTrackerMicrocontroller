# LoudyTrackerMicrocontroller

## Environment
- Create venv: `python -m venv .venv`
- Activate venv: `source .venv/bin/activate`
- Install pip: `python -m pip install --upgrade pip`
- Package install: `python -m pip install sounddevice numpy RPi.GPIO requests`
- Run file: `python <filename>.py`

## Docker Compose
- `docker compose up --build`
- Run docker compose in background: `docker compose up -d --build`
- Stop and delete: `docker compose down`
- Start: `docker compose start`
- Restart: `docker compose restart`


## Installation of Docker
- Install docker: `curl -fsSL https://get.docker.com | sh`
### Fix permissions
- Create docker group: `sudo groupadd docker`
- Add your user to the docker group: `sudo usermod -aG docker $USER`
- Login to new group: `newgrp docker`
