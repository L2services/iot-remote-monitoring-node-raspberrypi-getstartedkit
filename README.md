# SenseHat
This is a variation of the Microsoft provided code to connect a Raspberry Pi to the Azure IoT Remote Monitoring Suite specifically designed to work with the Sense Hat. 

This project uses the `nodeimu` and `sense-hat-led` NPM libraries to enable access to the onboard SenseHat temperature/humidity and LED Matrix respectively.

Follow the steps associated with the [Real sensor (Intermediate)](https://docs.microsoft.com/azure/iot-suite/iot-suite-raspberry-pi-kit-node-get-started-basic) guide replacing the manual wiring of the LED and BME280 sensor with the simple installation of the Pi Sense Hat.

# Connect your Microsoft Azure IoT Raspberry Pi 3 Starter Kit to the remote monitoring solution

The Node.js code in this repository supports a set of tutorials that help you learn how to connect a Raspberry Pi 3 device to the Azure IoT Suite remote monitoring solution. Choose the tutorial appropriate to whether you have the sensor hardware available to use with your Raspberry Pi and the scenario you are interested in:

## The tutorials

| Tutorial | Notes |
| -------- | ----- |
| [Simulated telemetry (Basic)](https://docs.microsoft.com/azure/iot-suite/iot-suite-raspberry-pi-kit-node-get-started-simulator) | Simulates sensor data. Uses a standalone Raspberry Pi. |
| [Real sensor (Intermediate)](https://docs.microsoft.com/azure/iot-suite/iot-suite-raspberry-pi-kit-node-get-started-basic) | Uses data from a BME280 sensor connected to your Raspberry Pi. |
| [Implement firmware update (Advanced)](https://docs.microsoft.com/azure/iot-suite/iot-suite-raspberry-pi-kit-node-get-started-advanced) | Uses data from a BME280 sensor connected to your Raspberry Pi. Enables remote firmware updates on your Raspberry Pi. |

## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
