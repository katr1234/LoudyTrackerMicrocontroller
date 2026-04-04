import requests

x = requests.get('http://127.0.0.1:8000/version')

print(x.text)

url = 'http://127.0.0.1:8000/version'
sensordata_payload = []
sensordata_payload.append({
    "timestamp": 1773990331,
    "value": 60
})
sensordata_payload.append({
    "timestamp": 1773990336,
    "value": 63
})

sensordata_payload = [
{
    "timestamp": 1773990331,
    "value": 60
},
{
    "timestamp": 1773990336,
    "value": 63
}]


x = request.post(url, json=sensordata_payload)
print(x.text)
                          
  
