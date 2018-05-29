const nodemailer = require('nodemailer');
const weatherClient = require('./weather');
const WeatherObject = require('./classes/WeatherObject.js');
const avgTemps = require('./data/average_temps.json');
const Mail = require('./classes/Mail.js');

const SENDER = process.env.EMAIL || 'israelhilljr@gmail.com';
const EMAIL_SERVICE = "gmail";
const TEMP_VAR = 5;

let transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
        user: SENDER,
        pass: process.env.EMAIL_PSWD
    }
});

/**
 * Triggered by: /api/v1/subscription
 * Creates a new subscription
 * @param {String} recEmail recipient email 
 * @param {String} city     recipient city
 */
exports.handleNewSubscriptionRequest = (recEmail, city) => {
    getWeather(city)
    .then(res => {
        const weather = new WeatherObject(res.data, city);
        sendEmail(buildMail(recEmail, weather));
    })
    .catch(err => {
        console.log(err);
    });
}

/**
 * Get the current weather in city.
 * @param {String} city 
 */
function getWeather(city) {
    let queryCity = city;
    // openweatherapi does not recognize 'Washington DC' or 'DC'
    if(city === 'Washington, DC') {
        queryCity = "District of Columbia"
    }
    return weatherClient.getCurrentWeather(queryCity);
}

/**
 * Build email HTML contents using data from weather object.
 * @param {WeatherObject} weather 
 */
function buildEmailHtml(weather) {
    // ? will be replaced with the email message.
    let html = '<html style="margin:0; padding:0;"> <body> <div class="widgetContainer" style="font-family:Verdana; ' +
    'box-sizing:border-box;"> <table style="width:100%; border-collapse:collapse; color:#ecf0f1; height:60px"> <tr style="">' + 
    '<th></th> <th style="height:80px; font-weight:100; background-color:#2980b9;">Weather App</th> <th></th> </tr> <tr> ' +
    '<td style="width:20%"></td> <td style="background-color:#2c3e50; height:400px;"> <div style="background-color:#34495e; ' + 
    'height:70%; text-align:center;"> <p style="padding:20% 20% 0% 20%; color:#bdc3c7;">?</p> ' +
    '</div> </td> <td style="width:20%"></td> </tr> </table> </div> </body> </html>';
    return html.replace('?', weather.toString());
}

/**
 * Generate an email subject line based on the current weather.
 * @param {WeatherObject} weather 
 */
function getEmailSubject(weather) {
    let city = (weather.getCityName() === 'District of Columbia') ? 'Washington, DC' : weather.getCityName();
    const avgTemp = avgTemps[city];
    const currTemp = weather.getTempF();
    const desc = weather.toString();
    let subject = '';
    
    if(currTemp > avgTemp + TEMP_VAR || desc.includes('sunny')) {
        subject = "It's nice out! Enjoy a discount on us.";
    }
    else if(currTemp < avgTemp - TEMP_VAR || desc.includes('rain')) {
        subject = "Not so nice out? That's okay, enjoy a discount on us.";
    }
    else {
        subject = "Enjoy a discount on us.";
    }
    return subject;
}

/**
 * Deliver email to user.
 * @param {Mail} mail 
 */
function sendEmail(mail) {
    const mailOptions = {
        from: SENDER,
        to: mail.getRecipient(),
        subject: mail.getSubject(),
        html: mail.getContent() 
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err)
        }
    });
}

/**
 * Build a Mail object with appropriate weather data and subjet line
 * @param {String} email 
 * @param {WeatherObject} weather 
 */
function buildMail(email, weather) {
    let mail = new Mail(email);
    mail.setSubject(getEmailSubject(weather));
    mail.setContent(buildEmailHtml(weather));
    return mail;
}

/**
 * Send out the newsletter to the email provided
 * @param {String} email 
 * @param {String} city 
 * @param {Object} cache 
 */
exports.sendOutNewsLetter = function(email, city, cache) {
    if(cache[city]) {
        // weather object already in cache... no need to make new request to api
        sendEmail(buildMail(email, cache[city]));
    }
    else {
        getWeather(city)
        .then(res => {
            const weather = new WeatherObject(res.data, city);
            cache[city] = weather;
            sendEmail(buildMail(email, weather));
        })
        .catch(err => {
            console.log(err);
        });
    }
}