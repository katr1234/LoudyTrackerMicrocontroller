# This part of the code records the microfon data and calculate the dB
import sounddevice as sd
import numpy as np

print("Start measuring... ")

x = 0

while(x < 100):
	duration = 1  # Every second the microfon is measuring data

	audio = sd.rec(int(duration * 44100), samplerate=44100, channels=1)
	sd.wait()

	# Calculate dB
	volume = np.linalg.norm(audio)

	print("Volume: ", volume)
	x = x + 1


