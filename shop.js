/**
 * Created with IntelliJ IDEA.
 * User: AVT
 * Date: 01.02.15
 * Time: 19:31
 * To change this template use File | Settings | File Templates.
 */
var Model = require('./model.js');

var shop = function() {

    // GET ALL SHOPS
    // Get full list of shops
    var get = function(req, res, next) {
        var response = res;
        //Model.Shop.sync({force: true}).then(function(){
            Model.Shop.findAll({
            where: {}}).success(function (result) {
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'
                });
                response.end(JSON.stringify(result));
            })
        //})
    };

    // GET SHOP
    // Get one shop by id
    var getById = function(req, res, next) {
        var response = res;
        Model.Shop.find({where : {id: req.params.id}}).success(function (result) {
            response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8' });
            response.end(JSON.stringify(result));
        })
    };

    // Create new shop
    var createShop = function(req, res, next) {
        var newShop = req.params;
        Model.Shop.create(newShop).complete(function(err, func1) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(func1));
            res.send();
        });
    };

    // UPDATE SHOP IN DB
    var update = function(req, res, next) {
        var tmpShop = req.params;
        Model.Shop.update(tmpShop, {where: { id : tmpShop.id }}).complete(function(err, func1) {
            if (!err) console.log('^^^===== ' + err)
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'
            });
            res.send();
        });
    };

    return {
        get : get,
        getById : getById,
        createShop : createShop,
        update : update
    }
};
module.exports = new shop();
