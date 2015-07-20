/**
 * Created with IntelliJ IDEA.
 * User: AVT
 * Date: 31.01.15
 * Time: 17:02
 * To change this template use File | Settings | File Templates.
 */
var Model = require('./model.js');

var item = function() {

    // GET
    // Get full list of item by subsrt
    var get = function(req, res, next) {
        var response = res;
        var substr = '%' + req.params.substr + '%';
        console.log('========== Item.Get!!!! :: ' + substr);
        //console.log(Model.Item);
        //console.log('=====================');
        Model.Item.sync({force: true}).then(function(){
            Model.Item.findAll({
            where: {
                    name: {
                        $like: substr
                    }
                }
            }).success(function (result) { //
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'
                });
                response.end(JSON.stringify(result));
            })
        })
    };

    // GET item by id
    // Get one item by id
    var getById = function(req, res, next) {
        var response = res;
        console.log('========== Item.GetBydId')

        Model.Item.find({where : {id: req.params.id}}).success(function (result) { // .sync({force: true})
            response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8' });
            response.end(JSON.stringify(result));
        })
    };

    // Create item
    var createItem = function(req, res, next) {
        var newItem = req.params;
        Model.Item.create(newItem).complete(function(err, func1) { //sync({force: true}).
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(func1));
            res.send();
        });
    };

    // UPDATE item IN DB
    var update = function(req, res, next) {
        var tmpItem = req.params;
        Model.Item.update(tmpItem, {where: { id : tmpItem.id }}).complete(function(err, func1) { //sync({force: true}).
            if (!err) console.log('^^^===== ' + err)
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'
            });
            res.send();
        });
    };

    return {
        get : get,
        getById : getById,
        createItem : createItem,
        update : update
    }
};
module.exports = new item();
