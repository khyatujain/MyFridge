var mongoose = require('mongoose');
var food = mongoose.model('food');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.foodReadOne = function (req, res) {
    if (req.params && req.params.foodid) {
        food
            .findById(req.params.foodid)
            .exec(function(err, food) {
                if (!food) {
                    sendJsonResponse(res, 404, {
                        "message": "foodid not found"
                    });
                    return;
                } else if(err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
            sendJsonResponse(res, 200, food);
        });
    } else {
    sendJsonResponse(res, 404, {
        "message": "No foodid in request"
        });
       
    }
};

module.exports.foodList = function(req, res) {
    food.find()
    .exec(function(err,food){
       if(food.length==0){
           sendJsonResponse(res, 404, {
                        "message": "no food items"
            });
            return;
        }
        else if(err){
            console.log(err);
            sendJsonResponse(res, 404, err);
            return;
        }
        console.log(food);
        sendJsonResponse(res, 200, food);
    });
    
};




module.exports.foodCreate = function(req, res) {
    food.create({
        name: req.body.name,
        date: req.body.date,
        expiry: req.body.expiry,
        left_overs: req.body.left_overs,
        quantity: req.body.quantity,
        }, function(err, food) {
            if (err) {
                res.status(400).json(err);
            } else {
//                console.log("Item created " + food);
//                res.header("_id", food._id);
                //sendJsonResponse(res, 201, food);
                res.status(201).json(food);
            }
    });
};



module.exports.foodUpdateOne = function(req, res) {
    if (!req.params.foodid) {
        sendJsonResponse(res, 404, {
        "message": "Not found, foodid is required"
        });
    return;
    }
    food
    .findById(req.params.foodid)
    .exec(
    function(err, food) {
        if (!food) {
                sendJsonResponse(res, 404, {
                "message": "foodid not found"
        });
        return;
        } 
        else if (err) {
            sendJsonResponse(res, 400, err);
            return;
        }
        food.name = req.body.name;
        food.date = req.body.date;
        food.expiry = req.body.expiry;
        food.left_overs = req.body.left_overs;
        food.quantity = req.body.quantity;

        food.save(function(err, food) {
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 200, food);
            }
        });
    });
};

module.exports.foodDeleteOne = function(req, res) {
    var foodid = req.params.foodid;
    if (foodid) {
        food
            .findByIdAndRemove(foodid)
            .exec(
            function(err, food) {
                if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                }
                sendJsonResponse(res, 204, null);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No foodid"
        });
    }
};

