(function() {
  'use strict';

  describe('Thermostat', function() {

    var thermostat;

    beforeEach(function() {
      thermostat= new Thermostat();
    });

    it('has a default starting temp of 20 degrees', function() {
      expect(thermostat.getTemperature()).toBe(20);
    });

    it('can increase the temperature with an up function', function() {
      thermostat.up();
      expect(thermostat.getTemperature()).toBe(21);
    });

    it('can decrease the temperature with a down function', function() {
      thermostat.down();
      expect(thermostat.getTemperature()).toBe(19);
    });

    it('has a minimum temperature of 10 degrees', function() {
      for (var t = 20; t > 9; t--) {
        thermostat.down();
      }
      expect(thermostat.getTemperature()).toBe(10);
    });

    it('power saving mode is on by default', function() {
      expect(thermostat.isInPowerSaving()).toBe(true);
    });

    it('can reset the temperature back to 20 degrees', function() {
      thermostat.up();
      thermostat.reset();
      expect(thermostat.getTemperature()).toBe(20);
    });

    it('can report when energy usage is medium', function() {
      expect(thermostat.energyUsage()).toBe('medium-usage');
    });

    it('can report when energy usage is low', function() {
      for (var t = 20; t > 17; t--) {
        thermostat.down();
      }
      expect(thermostat.energyUsage()).toBe('low-usage');
    });

    it('can report when energy usage is high', function() {
      for (var t = 20; t < 26; t++) {
        thermostat.up();
      }
      expect(thermostat.energyUsage()).toBe('high-usage');
    });

    describe('Context: power saving mode is on', function() {
      it('has a maximum temperature of 25 degrees', function() {
      	for (var t = 20; t < 26; t++) {
      	  thermostat.up();
      	}
      	expect(thermostat.getTemperature()).toBe(25);
      });
    });

    describe('Context: power saving mode off', function() {
      beforeEach(function() {
        thermostat.togglePowerSaving();
      });
      it('has a maximum temperature of 32 degrees', function() {
        for (var t = 20; t < 33; t++) {
          thermostat.up();
        }
        expect(thermostat.getTemperature()).toBe(32);
      });
    });

  });
}());
