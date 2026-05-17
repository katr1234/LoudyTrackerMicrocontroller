from time import sleep
from luma.core.interface.serial import i2c
from luma.oled.device import sh1106
from PIL import Image, ImageDraw

serial = i2c(port=1, address=0x3C)
device = sh1106(serial)

image = Image.new("1", (device.width, device.height))
draw = ImageDraw.Draw(image)

draw.text((0, 0), "Hallo Pi!", fill=255)

device.display(image)

sleep(10)
