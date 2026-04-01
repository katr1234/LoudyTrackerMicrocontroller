# This part of the code records the microfon data and calculate the dB
import sounddevice as sd
import numpy as np
import time

print("Start measuring... ")

DB_OFFSET = 80 # Synced offset value

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
		return

	## Step 4: Calculate dB
	db = dbfs + DB_OFFSET
	
	print("RMS", rms)
	print("DB: ", db)
	
	# Sleep process
	time.sleep(0.1)



duration = 1  # Every second the microfon is measuring data
sample_rate = 44100  # in Hz
channels = 1  # 1 --> Mono (1 Signal, everything will be recorded in one channel), 2 --> Stereo

try:
	while(True):
		counter = 0
		read_audio_data(duration, sample_rate, channels)	
except KeyboardInterrupt:
	print("Stopped")

