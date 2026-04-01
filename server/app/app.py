from dataclasses import dataclass
from http.client import HTTPException
import time
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Query
import uvicorn

app = FastAPI(
    title="Test Fast API",
    desciription="Add discription if you want",
    version="0.0.0",
    docs_url="/"
)

@dataclass
class SensorData():
    """
    Return value for Frontend
    """
    timestamp: int
    value: int
    exceedsThreshold: bool


sensor_data1 = SensorData(timestamp=1773990331, value=60, exceedsThreshold=False)
sensor_data2 = SensorData(timestamp=1773990335, value=65, exceedsThreshold=False)
sensor_data3 = SensorData(timestamp=1773990340, value=45, exceedsThreshold=False)
sensor_data4 = SensorData(timestamp=1773990344, value=50, exceedsThreshold=False)
sensor_data5 = SensorData(timestamp=1773990350, value=75, exceedsThreshold=False)
sensor_data6 = SensorData(timestamp=1773990356, value=85, exceedsThreshold=True)
sensor_data7 = SensorData(timestamp=1773990360, value=80, exceedsThreshold=False)

sensor_datas = [sensor_data1, sensor_data2, sensor_data3, sensor_data4, sensor_data5, sensor_data6, sensor_data7]


@dataclass
class SensordataInput:
    """
    Input model for sensor data sent by raspberry pi
    """
    timestamp: int
    value: float


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/version")
def get_version():
    """
    Returns current version of api
    """
    return {"version": "1.0.0"}


@app.get("/sensordata/mock", status_code=200)
def get_mock_sensor_data(
    from_timestamp: Optional[int] = Query(default=None, alias="from"),
    to_timestamp: Optional[int] = Query(default=None, alias="to"),
    limit: Optional[int] = Query(default=None, alias="limit")
):
    """
    Get data
    """
    filtered_data = [
        data for data in sensor_datas
        if (from_timestamp is None or data.timestamp >= from_timestamp)
        and (to_timestamp is None or data.timestamp <= to_timestamp)
    ]
    if limit is not None:
        filtered_data = filtered_data[:limit]
    return filtered_data


@app.get("/sensordata/hour_mock")
def get_mock_1h_sensor_data():
    """
    Get data from last hour
    """
    now = int(time.time())

    values = [60, 65, 45, 50, 75, 85, 80]
    timestamps = [now - 30, now - 25, now - 20, now - 16, now - 10, now - 4, now]
    threshold = 80
    data = []
    for ts, v in zip(timestamps, values):
        data.append({
            "timestamp": ts,
            "value": v,
            "exceedsThreshold": v > threshold
        })

    return data


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
