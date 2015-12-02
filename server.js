var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var Sighting = require('./sightings.js')

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/sighting', function(req, res) {
  var sighting = new Sighting(req.body);
  sighting.save().then(function(result) {
    return res.status(201).end();
  })
})

app.get('/api/sighting', function(req, res) {
  Sighting
  .find(req.query)
  .exec().then(function(sightings) {
    return res.json(sightings);
  })
})

app.put('/api/sighting', function(req, res) {
  Sighting.update({_id: req.query.id}, req.body).then(function() {
    return res.status(200).end();
  })
})

app.delete('/api/sighting', function(req, res) {
  Sighting.remove({_id: req.query.id}, req.body).then(function() {
    return res.status(200).end();
  })
})

mongoose.connect('mongodb://localhost/birdSightings');
app.listen(8082, function() {
  console.log('Listening on port 8082');
});
