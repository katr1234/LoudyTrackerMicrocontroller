# LoudyTrackerFrontend

## Test Setup API for Testing
Will be deleted later
- Clone the repo with the URL `git clone https://github.com/katr1234/LoudyTrackerFrontend.git`
- Open the above cloned project in your desired IDE
- Add `.env` file to the `app directory` (not needed for now, but there the secrets are stored)
- Create virtual environment
    - Open the terminal, navigate to the app directory and create a virtual environment by executing the command `python -m venv venv`
    - Directoly via VS Code (`F1 --> Python: Create Environment`)
- Activate the created virtual environment using the command `venv\Scripts\activate`
- Install all depenencies listed in `requirements.txt`. Command `pip install -r requirements.txt`
- Run project local: `python app\app.py`
- Open `localhost:8080`

## Docker
- Change to `server directory`: `cd server`
- Build Docker Container: `docker build -t loudy-tracker-api .`
- Run Docker Container: `docker run -p 8000:8000 loudy-tracker-api`

## Test data
[
    {
        "timestamp": 1773990331,
        "value": 60
    },
    {
        "timestamp": 1773990336,
        "value": 63
    },
    {
        "timestamp": 1773990341,
        "value": 40
    }
]