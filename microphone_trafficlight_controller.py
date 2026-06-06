import sounddevice as sd
import numpy as np
import time
import RPi.GPIO as GPIO
import requests
import socket
from luma.core.interface.serial import i2c
from luma.oled.device import sh1106
from PIL import Image, ImageDraw, ImageFont
from datetime import datetime, timezone

# import asyncio

print("Start measuring... ")

# Calculating dB
DB_OFFSET = 80 # Synced offset value

# Traffic Light
GPIO_RED = 17
GPIO_YELLOW = 27
GPIO_GREEN = 22

# Send Data
API_URL = 'http://127.0.0.1:8000/sensordata'

# Monitor
## I2C Connection
serial = i2c(port=1, address=0x3C)
## Initialize device
device = sh1106(serial)
display_locked_until = 30

# Get IP Address
def get_ip_address():
	s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	try:
		s.connect(("8.8.8.8", 80)) # which network is used
		ip_address = s.getsockname()[0]
	except Exception:
		ip_address = "Keine IP"
	finally:
		s.close();
	return ip_address + ":3000"


ip_address = get_ip_address()
font = ImageFont.truetype(
	"/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
	50
)


def show_on_disply(db_value, color_text):
	global display_locked_until
	
	if time.time() < display_locked_until:
		return
	
	image = Image.new("1", (device.width, device.height))
	draw = ImageDraw.Draw(image)
	
	draw.text((0, 0), f"{db_value:.1f}", font=font, fill=255)
	
	if ip_address.startswith("127."):
		get_ip_address()
		
	draw.text((0, 54), f"{ip_address}", fill=255)
	
	device.display(image)

def read_audio_data(duration, sample_rate, channels):
	## Step 1: Read Data
	audio = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=channels,  dtype="float32")
	sd.wait()

	# Calculate dB
	## Step 2: Calculate RMS
	rms = np.sqrt(np.mean(audio**2))

	## Step 3: Calculate log
	if rms > 1e-10:
		dbfs = 20 * np.log10(rms)
	else:
		dbfs = -100

	## Step 4: Calculate dB
	db = dbfs + DB_OFFSET
	
	
	# GPIO
	## Set/ Change Color
	# if db >= 85
	if db >= 45:
		GPIO.output(GPIO_RED, True)
		GPIO.output(GPIO_YELLOW, False)
		GPIO.output(GPIO_GREEN, False)
		status = "ROT"
	# elif db < 85 and db >= 65:
	elif db < 45 and db >= 35:
		GPIO.output(GPIO_RED, False)
		GPIO.output(GPIO_YELLOW, True)
		GPIO.output(GPIO_GREEN, False)
		status = "GELD"
	else:
		GPIO.output(GPIO_RED, False)
		GPIO.output(GPIO_YELLOW, False)
		GPIO.output(GPIO_GREEN, True)
		status = "GRUEN"
	
	show_on_disply(db, status)
	
	return db
	
def send_data(sensordata_payload):
	try:
		response = requests.post(API_URL, json=sensordata_payload)
		print(response.text)
	except Exception as ex:

		image = Image.new("1", (device.width, device.height))
		draw = ImageDraw.Draw(image)
		
		draw.text((0, 0), "FEHLER!", fill=255)
		draw.text((0, 20), "Daten senden", fill=255)
		draw.text((0, 40), "nicht moeglich", fill=255)
		
		device.display(image)
		display_locked_until = time.time() + 30
		print(f'Sending data {sensordata_payload} not possible. Data will not be sent agian');
	

duration = 1  # Every second the microfon is measuring data
sample_rate = 44100  # in Hz
channels = 1  # 1 --> Mono (1 Signal, everything will be recorded in one channel), 2 --> Stereo

try:
	# GPIO Pins
	## GPIO Modus (BOARD/ BCM)
	GPIO.setmode(GPIO.BCM)
	
	## Set Direction of the pins (IN/ OUT)
	GPIO.setup(GPIO_RED, GPIO.OUT)
	GPIO.setup(GPIO_YELLOW, GPIO.OUT)
	GPIO.setup(GPIO_GREEN, GPIO.OUT)
	
	## Set Initial Color
	GPIO.output(GPIO_RED, False)
	GPIO.output(GPIO_YELLOW, False)
	GPIO.output(GPIO_GREEN, True)
	
	sensordata_payload = []

	while(True):
		count = 0
		while(count < 10):
			db_value = read_audio_data(duration, sample_rate, channels)	

			sensordata_payload.append({
				"timestamp": int(datetime.now(timezone.utc).timestamp()),
				"value": float(db_value)
			})
			
			# Sleep process
			time.sleep(0.2)
			count = count + 1			
		
		# asyncio.run(send_data(sensordata_payload))	
		send_data(sensordata_payload)
			
except KeyboardInterrupt:
	print("Stopped")
finally:
	GPIO.cleanup()

