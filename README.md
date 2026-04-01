# LoudyTrackerMicrocontroller

## Environment
- Create venv: `python -m venv .venv`
- Activate venv: `source .venv/bin/activate`
- Install pip: `python -m pip install --upgrade pip`
- Package install: `python -m pip install sounddevice numpy RPi.GPIO`
- Run file: `python <filename>.py`

## Docker Compose
- `docker compose up --build`
- Run docker compose in background: `docker compose up -d --build`
- Stop and delete: `docker compose down`
- Start: `docker compose start`
- Restart: `docker compose restart`