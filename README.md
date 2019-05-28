# homebridge-http-thermometer

[![npm](https://img.shields.io/npm/v/homebridge-http-thermometer.svg)](https://www.npmjs.com/package/homebridge-http-thermometer) [![npm](https://img.shields.io/npm/dt/homebridge-http-thermometer.svg)](https://www.npmjs.com/package/homebridge-http-thermometer)

## Description

This [homebridge](https://github.com/nfarina/homebridge) plugin exposes a web-based thermometer to Apple's [HomeKit](http://www.apple.com/ios/home/). Using simple HTTP requests, the plugin polls your home's temperature.

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
| `apiroute` | Root URL of your device | N/A |
| `pollInterval` _(optional)_ | Time (in seconds) between device polls | `60` |

### Additional options
| Key | Description | Default |
| --- | --- | --- |
| `timeout` _(optional)_ | Time (in milliseconds) until the accessory will be marked as _Not Responding_ if it is unreachable | `3000` |
| `http_method` _(optional)_ | HTTP method used to communicate with the device | `GET` |
| `username` _(optional)_ | Username if HTTP authentication is enabled | N/A |
| `password` _(optional)_ | Password if HTTP authentication is enabled | N/A |
| `model` _(optional)_ | Appears under the _Model_ field for the accessory | `homebridge-http-thermometer` |
| `serial` _(optional)_ | Appears under the _Serial_ field for the accessory | apiroute |
| `manufacturer` _(optional)_ | Appears under the _Manufacturer_ field for the accessory | `Tom Rodrigues` |

## API Interfacing

Your API should be able to return the temperature when it receives `/status` in the JSON format like below:
```
{
    "currentTemperature": FLOAT_VALUE
}
```
