const express = require('express');
const router = express.Router();
const Gpio = require('pigpio').Gpio;

const motor1IN1 = new Gpio(27, {mode: Gpio.OUTPUT});
const motor1IN2 = new Gpio(17, {mode: Gpio.OUTPUT});
const motor2IN1 = new Gpio(23, {mode: Gpio.OUTPUT});
const motor2IN2 = new Gpio(24, {mode: Gpio.OUTPUT});

router.get('/move/:direction', function(req, res, next) {
        try {
          if (req.params.direction) {
                const direction = req.params.direction;
                switch(direction) {
                        case 'forward':
                                motor1IN1.digitalWrite(1);
                                motor1IN2.digitalWrite(0);
                                motor2IN1.digitalWrite(0);
                                motor2IN2.digitalWrite(1);
                                break;
                        case 'reverse':
                                motor1IN1.digitalWrite(0);
                                motor1IN2.digitalWrite(1);
                                motor2IN1.digitalWrite(1);
                                motor2IN2.digitalWrite(0);
                                break;
                        case 'left':
                                motor1IN1.digitalWrite(1);
                                motor1IN2.digitalWrite(0);
                                break;
                        case 'right':
                                motor2IN1.digitalWrite(0);
                                motor2IN2.digitalWrite(1);
                                break;
                        case 'stop':
                                motor1IN1.digitalWrite(0);
                                motor1IN2.digitalWrite(0);
                                motor2IN1.digitalWrite(0);
                                motor2IN2.digitalWrite(0);
                                break;

                }
          }
          res.json(`moving ${req.params.direction}`);
        } catch (err) {
          req.json(err);
        }
});


module.exports = router;
