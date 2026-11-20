
require('dotenv').config({path: '../.env'});
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001;

// Home Endpoint
app.get('/', (req, res) => {
    res.send('Weather Backend is Running!');
});

// Weather Endpoint
app.get('/weather', async (req, res) => {

    const city = req.query.city;

    if (!city) {
        return res.status(400).json({
            error: "City parameter is required"
        });
    }

    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({
            error: "API key is not set in environment variables"
        });
    }

    try {

        const params = new URLSearchParams({
            key: apiKey,
            units: 'metric',
            include: 'current',
            
        });

        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?${params}`;

        const response = await fetch(url);

        if (!response.ok) {
            return res.status(response.status).json({
                error: 'Weather API request failed'
            });
        }

        const data = await response.json();
        console.log(data);

        res.json({
              city: data.address,
              temperature: data.currentConditions.temp,
              feelsLike: data.currentConditions.feelslike,
              conditions: data.currentConditions.icon,
              humidity: data.currentConditions.humidity
        });

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            error: 'Unable to fetch weather data'
        });

    }

});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
