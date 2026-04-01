# This part of the code records the microfon data and calculate the dB
import sounddevice as sd
import numpy as np
import time
import RPi.GPIO as GPIO

print("Start measuring... ")

DB_OFFSET = 80 # Synced offset value

GPIO_RED = 17
GPIO_YELLOW = 27
GPIO_GREEN = 22

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
	
	print("RMS", rms)
	print("DB: ", db)
	
	# GPIO
	## Set/ Change Color
	if db >= 85:
		GPIO.output(GPIO_RED, True)
		GPIO.output(GPIO_YELLOW, False)
		GPIO.output(GPIO_GREEN, False)
	elif db < 85 and db >= 65:
		GPIO.output(GPIO_RED, False)
		GPIO.output(GPIO_YELLOW, True)
		GPIO.output(GPIO_GREEN, False)
	else:
		GPIO.output(GPIO_RED, False)
		GPIO.output(GPIO_YELLOW, False)
		GPIO.output(GPIO_GREEN, True)
	
	# Sleep process
	time.sleep(2)

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
	
	while(True):
		read_audio_data(duration, sample_rate, channels)	
except KeyboardInterrupt:
	print("Stopped")
finally:
	GPIO.cleanup()

