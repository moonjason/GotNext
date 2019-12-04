const express = require('express');
const path = require('path');

'use strict';
const yelp = require('yelp-fusion');

const app = express();
const PORT = process.env.PORT || 8000; 

const apiKey = 'W9xPCYm2aOXa1Nd1ygsJs4pfWeySayBVWyFhrgbdLczQClTzdoUKOpEKAvmxrLCUmJ3W9BjgWT4YsZOeSqlq3BElFXTlUDmrNgDwaPgnt8W3LtJUOcmrIJ1f8BXfXXYx';
const client = yelp.client(apiKey)

app.use(express.static(path.join(__dirname, 'build')));

app.get('/hello', (req, res) => {
    try{
        res.send('hi?')
    } catch(err){
        console.log(err)
    }
})

app.get('/api/v1/courts/:location', (req, res) => {
    try {
        client.search({
            term: 'Basketball Court',
            location: req.params.location,
          }).then(response => {
            res.json(response.jsonBody.businesses)
          }).catch(e => {
            console.log(e);
          });
    } catch(err){ 
        console.log(err)
    }
})

app.get('/*', (req ,res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})