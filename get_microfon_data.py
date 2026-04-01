# This part of the code records the microfon data and calculate the dB
import sounddevice as sd
import numpy as np

print("Start measuring... ")


def read_audio_data(duration, sample_rate, channels):
	audio = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=channels)
	sd.wait()

	# Calculate dB
	volume = np.linalg.norm(audio)

	print("Volume: ", volume)




duration = 1  # Every second the microfon is measuring data
sample_rate = 44100  # in Hz
channels = 1  # 1 --> Mono (1 Signal, everything will be recorded in one channel), 2 --> Stereo

x = 0
while(x < 2):
	read_audio_data(duration, sample_rate, channels)	
	x = x + 1


