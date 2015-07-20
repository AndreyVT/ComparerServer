/**
 * Created with IntelliJ IDEA.
 * User: AVT
 * Date: 01.03.15
 * Time: 15:46
 * To change this template use File | Settings | File Templates.
 */
var Model = require('./model.js');

var purchase = function() {

    // GET ALL purchase for user
    // Get full list of purchase fo user
    var get = function(req, res, next) {
        var userId = req.params.userId;
        var response = res;
        //Model.Purchase.sync({force: true}).then(function(){
            Model.Purchase.findAll({ //
            where: { UserId: userId}}).success(function (result) {
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'
                });
                response.end(JSON.stringify(result));
            })
        //})
    };

    // GET Purchase
    // Get one Purchase by id
    var getById = function(req, res, next) {
        console.log('==================')
        console.log('^ var getById PURCHASE')
        var response = res;
        Model.Purchase.find({where : {id: req.params.id}}).success(function (result) {
            //response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8' });
            response.end(JSON.stringify(result));
        })
    };

    // Create new Purchase
    var createPurchase = function(req, res, next) {
        var newPurchase = req.params;
        console.log('==================')
        console.log('^var createPurchase')
        console.log(newPurchase)
        console.log('==================')
        Model.Purchase.create(newPurchase).complete(function(err, func1) {
            //res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(func1));
            res.send();
        });
    };

    // UPDATE Purchase IN DB
    var update = function(req, res, next) {
        var tmpPurchase = req.params;
        console.log('==================')
        console.log('^update PURCHASE')
        console.log(tmpPurchase)
        console.log('==================')
        Model.Purchase.update(tmpPurchase, {where: { id : tmpPurchase.id }}).complete(function(err, func1) {
            if (err) console.log('^^^===== Model.Purchase.update ' + err);
            else console.log('^^^===== Model.Purchase.update ======== ' + func1);
            res.send();
        });
    };

    return {
        get : get,
        getById : getById,
        createPurchase : createPurchase,
        update : update
    }
};
module.exports = new purchase();
