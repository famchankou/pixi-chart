const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require("axios");

/**
 * Live Weather Feed
 * http://openweathermap.org
 */ 
const API_KEY = "";
const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${API_KEY}`;

const cityId = "London";
const countryCode = "0";
const start = "";
const end = "";
const weatherHistoryApiUrl = `http://history.openweathermap.org/data/2.5/history/city?q=${cityId},${countryCode}&type=hour&start=${start}&end=${end}`;

let Pusher = require('pusher');

let pusher = new Pusher({
    appId: '',
    key: '',
    secret: '',
    cluster: 'eu',
    encrypted: true
});

let allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' == req.method) {
       res.send(200);
    } else {
       next();
    }
};

let app = express();

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let londonTempData = {
    city: 'London',
    unit: 'celsius',
    dataPoints: [
        {
            time: 1130,
            temperature: 12
        },
        {
            time: 1200,
            temperature: 13
        },
        {
            time: 1230,
            temperature: 15
        },
        {
            time: 1300,
            temperature: 14
        },
        {
            time: 1330,
            temperature: 15
        },
        {
            time: 1406,
            temperature: 12
        },
        {
            time: 1130,
            temperature: 12
        },
        {
            time: 1200,
            temperature: 9
        },
        {
            time: 1230,
            temperature: 15
        },
        {
            time: 1300,
            temperature: 10
        },
        {
            time: 1330,
            temperature: 13
        },
        {
            time: 1406,
            temperature: 11
        }
    ]
  }

app.get('/api/get-temperature', (req, res) => {
    res.send(londonTempData);
});

app.get('/api/add-temperature', (req, res) => {
    let temp = parseInt(req.query.temperature);
    let time = parseInt(req.query.time);

    if (temp && time && !isNaN(temp) && !isNaN(time)) {
        let newDataPoint = {
            temperature: temp,
            time: time
        };
        londonTempData.dataPoints.push(newDataPoint);

        pusher.trigger('london-temp-chart', 'new-temperature', {
            dataPoint: newDataPoint
        });
        
        res.send({success:true});
    } else {
        res.send({success:false, errorMessage: 'Invalid Query Paramaters, required - temperature & time.'});
    }
});

const getWeatherData = (url) => {
    return axios.get(url).then(response => response.data);
}

const initWeatherDataFetching = _ => {
    setInterval(() => {
        getWeatherData(weatherApiUrl).then(data => {
            pusher.trigger('london-temp-chart', 'new-temperature', {
                dataPoint: data
            });
        });
    }, 2000);
}

app.use((req, res, next) => {
    let error404 = new Error('Route Not Found');
    error404.status = 404;
    next(error404);
});

module.exports = app;

app.listen(9000, () => {
    console.log('Example app listening on port 9000...');
    // initWeatherDataFetching();
});
