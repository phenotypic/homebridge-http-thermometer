<p align="center">
  <a href="https://github.com/homebridge/homebridge"><img src="https://raw.githubusercontent.com/homebridge/branding/master/logos/homebridge-color-round-stylized.png" height="140"></a>
</p>

<span align="center">

# homebridge-http-thermometer

[![npm](https://img.shields.io/npm/v/homebridge-http-thermometer.svg)](https://www.npmjs.com/package/homebridge-http-thermometer) [![npm](https://img.shields.io/npm/dt/homebridge-http-thermometer.svg)](https://www.npmjs.com/package/homebridge-http-thermometer)

</span>

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

### Additional options
| Key | Description | Default |
| --- | --- | --- |
| `pollInterval` | Time (in seconds) between device polls | `300` |
| `timeout` | Time (in milliseconds) until the accessory will be marked as _Not Responding_ if it is unreachable | `3000` |
| `http_method` | HTTP method used to communicate with the device | `GET` |
| `username` | Username if HTTP authentication is enabled | N/A |
| `password` | Password if HTTP authentication is enabled | N/A |
| `model` | Appears under the _Model_ field for the accessory | plugin |
| `serial` | Appears under the _Serial_ field for the accessory | version |
| `manufacturer` | Appears under the _Manufacturer_ field for the accessory | author |
| `firmware` | Appears under the _Firmware_ field for the accessory | version |

## API Interfacing

Your API should be able to return the temperature when it receives `/status` in the JSON format like below:
```
{
    "currentTemperature": FLOAT_VALUE
}
```
