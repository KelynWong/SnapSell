// Name: Wong En Ting Kelyn
// Admission no.: P1935800
// Class: DIT/1B/01

var express = require('express');
var app = express();

var user = require('../models/user.js');
var listing = require('../models/listing.js');
var offers = require('../models/offers.js');
var likes = require('../models/likes.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodedParser);
app.use(bodyParser.json());

app.get('/users/', function(req,res){
    user.getAllUsers(function(err, result){
        if(!err){
            res.status(200).send(result);
        }else{
            res.status(500).send("{\"Result\":\"Internal Error\"}");
        }
    });
});

app.post('/users/', function (req, res) {
    var username = req.body.username;
    var pic = req.body.profile_pic_url;
    
    user.addUser(username, pic, function(err, result){
        if(!err){
            // res.status(201).send("{\"Affected rows\":\"" + result.affectedRows + "\"}");
            res.status(201).send("{\"UserID\":\"" + result.insertId + "\"}");
        }else if(err.code === "ER_DUP_ENTRY"){
            res.status(422).send("{\"Message\":\"Duplicate entry\"}");
        }else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    });
});

app.get('/users/:userid', function(req,res){
    var id=req.params.userid;

    user.findByID(id, function(err, result){
        if(!err){
            if (result.length == 0) {
                res.status(404).send("{\"Message\":\"User not found\"}")
            } else {
                  res.status(200).send(result);
            }
        }else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    });
});

app.put('/users/:userid', function (req, res) {
    var username = req.body.username;
    var pic = req.body.profile_pic_url;
    var id=req.params.userid;
    user.updateUser(username, pic, id, function(err, result){
        if (!err) {
            if (result.affectedRows == 0) {
                res.status(404).send("{\"Message\":\"User not found\"}")
            } else {
                res.status(204).send("{\"Affected rows\":\"" + result.affectedRows + "\"}");
            }
        } else if(err.code === "ER_DUP_ENTRY"){
            res.status(422).send("{\"Message\":\"Duplicate entry\"}");
        }else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

app.get('/users/:user_id/listings', function (req, res) {
    var id=req.params.user_id;
    listing.getListingByUserId(id, function(err, result){
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("{\"Message\":\"User not found\"}")
            } else {
                res.status(200).send(result);
            }
        } else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

app.get('/listings/', function (req, res) {
    
    listing.getAllListings(function(err, result){
        if (!err) {
            res.status(200).send(result);
        } else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

app.get('/listings/:listing_id/', function (req, res) {
    var id=req.params.listing_id;
    listing.getListingById(id, function(err, result){
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("{\"Message\":\"Listing not found\"}")
            } else {
                res.status(200).send(result);
            }
        } else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

app.post('/listings/', function (req, res) {

    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var id = req.body.fk_poster_id;
    
    listing.postListing(title, description, price, id, function(err, result){
        if (!err) {
            res.status(201).send("{\"Affected rows\":\"" + result.affectedRows + "\"}");
            // res.status(201).send("{\"UserID\":\"" + result.insertId + "\"}");
        }else if(err.code === "ER_NO_REFERENCED_ROW_2"){
            res.status(404).send("{\"Message\":\"User does not exist\"}");
        }else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    });
});

app.delete('/listings/:listing_id', function (req, res) {
    var id = req.params.listing_id;
    
    listing.deleteListing(id, function (err, result) {
        if (!err) {
            res.status(204).send("{\"Message\":\"Record deleted\"}");
        }else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    });
});

app.put('/listings/:listing_id', function (req, res) {
    var id = req.params.listing_id;
    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;

    listing.putListing(id, title, description, price, function (err, result) {
        if (!err) {
            if (result.affectedRows == 0) {
                res.status(404).send("{\"Message\":\"Listing not found\"}")
            } else {
                res.status(204).send("{\"Affected rows\":\"" + result.affectedRows + "\"}");
            }
        } else if(err.code === "ER_DUP_ENTRY"){
            res.status(422).send("{\"Message\":\"Duplicate entry\"}");
        }else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    });
});

app.get('/listings/:listing_id/offers', function (req, res) {
    var id=req.params.listing_id;
    offers.getOffersById(id, function(err, result){
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("{\"Message\":\"Listing not found\"}")
            } else {
                res.status(200).send(result);
            }
        } else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

app.post('/listings/:listing_id/offers', function (req, res) {
    var id=req.params.listing_id;
    var offer = req.body.offer;
    var offeror_id = req.body.fk_offeror_id
    offers.postOffers(id, offer, offeror_id, function(err, result){
        if (!err) {
            res.status(201).send("{\"Affected rows\":\"" + result.affectedRows + "\"}");
        } else if(err.code === "ER_DUP_ENTRY"){
            res.status(422).send("{\"Message\":\"Duplicate entry\"}");
        }else if(err.code === "ER_NO_REFERENCED_ROW_2"){
            res.status(422).send("{\"Message\":\"Listing does not exist\"}");
        }else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

app.get('/listings/:listing_id/likes', function (req, res) {
    var listing_id=req.params.listing_id;

    likes.getListingLikes(listing_id, function(err, result){
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("{\"Message\":\"Listing not found\"}")
            } else {
                res.status(200).send(result);
            }
        } else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    })
});

app.post('/listings/:listing_id/likes/:liker_id', function (req, res) {
    var listing_id=req.params.listing_id;
    var liker_id=req.params.liker_id;
    
    likes.postListingLikes(listing_id, liker_id, function(err, result){
        if(!err){
            res.status(201).send("{\"Affected rows\":\"" + result.affectedRows + "\"}");
            // res.status(201).send("{\"UserID\":\"" + result.insertId + "\"}");
        }else if(err.code === "ER_DUP_ENTRY"){
            res.status(201).send("{\"Message\":\"Duplicate entry\"}");
        }else if(err.code === "ER_NO_REFERENCED_ROW_2"){
            res.status(422).send("{\"Message\":\"User does not exist\"}");
        }else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    });
  });
  
app.delete('/listings/:listing_id/likes/:liker_id', function (req, res) {
    var listing_id=req.params.listing_id;
    var liker_id=req.params.liker_id;
    
    likes.deleteListingLikes(listing_id, liker_id, function(err, result){
        if(!err){
            if (result.affectedRows == 0) {
                res.status(404).send("{\"Message\":\"User or listing not found\"}")
            } else {
                res.status(204).send("{\"Message\":\"Record deleted\"}");
            }
        }else{
            res.status(500).send("{\"Message\":\"Some error occurred\"}");
        }
    });
  });

module.exports = app