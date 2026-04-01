from dataclasses import dataclass
from http.client import HTTPException
from typing import List

from fastapi import FastAPI
import uvicorn

app = FastAPI(
    title="Test Fast API",
    desciription="Add discription if you want",
    version="0.0.0",
    docs_url="/"
)


@dataclass
class SensordataInput:
    """
    Input model for sensor data sent by raspberry pi
    """
    timestamp: int
    value: float


@app.get("/version")
def get_version():
    """
    Returns current version of api
    """
    return "0.0.0"


@app.post("/sensordata", status_code=201)
def upload_sensordata(sensordata: List[SensordataInput]):
    """
    Test endpoint for sensor data
    Does nothing
    """
    for sensordata_elem in sensordata:
        if sensordata_elem.value < 0:
            return HTTPException(400, "A value bellow 0 is not possible")
    return {"message": "Successful added values"}


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
