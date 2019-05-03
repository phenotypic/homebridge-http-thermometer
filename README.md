# homebridge-http-thermometer

[![npm](https://img.shields.io/npm/dt/homebridge-http-thermometer.svg)](https://www.npmjs.com/package/homebridge-http-thermometer) [![npm](https://img.shields.io/npm/v/homebridge-http-thermometer.svg)](https://www.npmjs.com/package/homebridge-http-thermometer)

## Description

This [homebridge](https://github.com/nfarina/homebridge) plugin exposes a web-based thermometer to Apple's [HomeKit](http://www.apple.com/ios/home/). Using simple HTTP requests, you can poll your home's temperature.

## Installation

1. Install [homebridge](https://github.com/nfarina/homebridge#installation-details)
2. Install this plugin: `npm install -g homebridge-http-thermometer`
3. Update your `config.json` file

## Configuration

```json
"accessories": [
     {
       "accessory": "Thermometer",
       "name": "Thermometer",
       "apiroute": "http://myurl.com"
     }
]
```

### Core
| Key | Description | Default |
| --- | --- | --- |
| `accessory` | Must be `Thermometer` | N/A |
| `name` | Name to appear in the Home app | N/A |
| `apiroute` | Root URL of your thermometer (excluding the rest of the requests) | N/A |
| `pollInterval` _(optional)_ | Time (in seconds) between when homebridge will check the `/status` of your thermometer | `60` |

### Additional options
| Key | Description | Default |
| --- | --- | --- |
| `timeout` _(optional)_ | Time (in milliseconds) until the accessory will be marked as "Not Responding" if it is unreachable | `3000` |
| `http_method` _(optional)_ | The HTTP method used to communicate with the thermostat | `GET` |
| `username` _(optional)_ | Username if HTTP authentication is enabled | N/A |
| `password` _(optional)_ | Password if HTTP authentication is enabled | N/A |
| `model` _(optional)_ | Appears under the "Model" field for the device | `homebridge-http-thermometer` |
| `serial` _(optional)_ | Appears under the "Serial" field for the device | apiroute |
| `manufacturer` _(optional)_ | Appears under the "Manufacturer" field for the device | `Tom Rodrigues` |

## API Interfacing

Your API should be able to return the temperature when it receives `/status` in the JSON format like below:
```
{
    "currentTemperature": FLOAT_VALUE
}
```
