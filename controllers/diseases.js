var express = require("express");
var router = express.Router();
var async = require('async');
var db = require('../models');


router.get('/', function(req, res) {
    db.disease.findAll().then(function(diseases) {
        res.render('diseases/all', { diseases: diseases });
    });
});

router.post('/', function(req, res) {
    db.disease.create({
        name: req.body.name,
        description: req.body.description,
        severity: req.body.severity
    }).then(function(newDisease) {
        var symptoms = [];
        if (req.body.symptoms) {
            symptoms = req.body.symptoms.split(", ");
        }

        if (symptoms.length > 0) {
            async.forEachSeries(symptoms, function(s, callback) {
                db.symptom.findOrCreate({
                    where: { name: s.trim() }
                }).spread(function(symptom, wasCreated) {
                    newDisease.addSymptom(symptom);
                    callback();
                });
            }, function() {
                res.redirect("'/diseases");
            });
        } else {
            res.redirect('/diseases');
        }
    });
});

router.get('/add', function(req, res) {
    res.render('diseases/add');
});

router.get('/:id', function(req, res) {
    db.disease.findOne({
        where: { id: req.params.id },
        include: [db.symptom]
    }).then(function(disease) {
        res.render('diseases/show', { diseases: disease });
    });
})

module.exports = router;
