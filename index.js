var Service, Characteristic;
var request = require('request');

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory('homebridge-http-thermometer', 'Thermometer', Thermometer);
};

function Thermometer(log, config) {
  this.log = log;

  this.name = config.name;
  this.apiroute = config.apiroute;
  this.pollInterval = config.pollInterval || 60;

  this.manufacturer = config.manufacturer || 'Tom Rodrigues';
  this.serial = config.serial || this.apiroute;
  this.model = config.model || 'homebridge-http-thermometer';

  this.username = config.username || null;
  this.password = config.password || null;
  this.timeout = config.timeout || 3000;
  this.http_method = config.http_method || 'GET';

  if (this.username != null && this.password != null) {
    this.auth = {
      user: this.username,
      pass: this.password
    };
  }

  this.log(this.name, this.apiroute);

  this.service = new Service.TemperatureSensor(this.name);
}

Thermometer.prototype = {

  identify: function(callback) {
    this.log('Identify requested!');
    callback();
  },

  _httpRequest: function(url, body, method, callback) {
    request({
        url: url,
        body: body,
        method: this.http_method,
        timeout: this.timeout,
        rejectUnauthorized: false,
        auth: this.auth
      },
      function(error, response, body) {
        callback(error, response, body);
      });
  },

  _getStatus: function(callback) {
    var url = this.apiroute + '/status';
    this.log('[+] Getting status:', url);

    this._httpRequest(url, '', this.http_method, function(error, response, responseBody) {
      if (error) {
        this.log('[!] Error getting status: %s', error.message);
        this.service.getCharacteristic(Characteristic.CurrentTemperature).updateValue(new Error("Polling failed"));
        callback(error);
      } else {
        this.log('[*] Thermometer response:', responseBody);
        var json = JSON.parse(responseBody);
        this.service.getCharacteristic(Characteristic.CurrentTemperature).updateValue(json.currentTemperature);
        this.log('[*] Updated CurrentTemperature:', json.currentTemperature);
        callback();
      }
    }.bind(this));
  },

  getServices: function() {

    this.informationService = new Service.AccessoryInformation();
    this.informationService
      .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
      .setCharacteristic(Characteristic.Model, this.model)
      .setCharacteristic(Characteristic.SerialNumber, this.serial);

    this.service.getCharacteristic(Characteristic.CurrentTemperature)
      .setProps({
        minValue: -100,
        maxValue: 100,
        minStep: 0.1
      });

    this._getStatus(function() {}.bind(this));

    setInterval(function() {
      this._getStatus(function() {}.bind(this));
    }.bind(this), this.pollInterval * 1000);

    return [this.informationService, this.service];
  }
};
