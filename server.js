var restify = require('restify');

var shop = require('./shop.js');
var purchase = require('./purchase.js');
var item = require('./item.js');
var record = require('./record.js');
var users = require('./user.js');

var app = restify.createServer()


app.use(restify.CORS({origins: ['http://localhost'],
    credentials: true }));

app.use(restify.fullResponse());
app.use(restify.bodyParser());
 
app.use(function(req, res, next) {
  //console.log('==== app use  ' + req.body);

    if (req.params.itemId) {
      Model.Item.findById(req.params.itemId, function(err, item) {
      req.item = item;
      next();
    });
  }
  else {
    next();
  }
});
 
    ////////////  SHOP   ///////////////////////////////////////////////////////////////////////////////////
    // GET ALL SHOPS
    // Get full list of shops
    app.get('/api/v1/shops/', shop.get);
    // GET SHOP
    // Get one shop by id
    app.get('/api/v1/shops/:id', shop.getById);
    // CREATE
    // Create new shop
    app.post('/api/v1/shops/', shop.createShop);
    // UPDATE SHOP IN DB
    // Обновить существующую запись
    app.put('/api/v1/shops/:id', shop.update);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////  PURCHASES   ///////////////////////////////////////////////////////////////////////////////////
    // GET PURCHASES
    // Get list for userId
    app.get('/api/v1/purchases/:userId', purchase.get);
    // GET purchase
    // Get one purchase by id
    app.get('/api/v1/purchase/:id', purchase.getById);
    // CREATE
    // Create new purchase
    app.post('/api/v1/purchase/', purchase.createPurchase);
    // UPDATE purchase IN DB
    // Обновить существующую запись
    app.put('/api/v1/purchase/:id', purchase.update);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////  ITEMS   ///////////////////////////////////////////////////////////////////////////////////
    // GET ITEMS
    // Get list items by subsrt
    app.get('/api/v1/items/:substr', item.get);
    // GET item
    // Get one item by id
    app.get('/api/v1/item/:id', item.getById);
    // CREATE
    // Create new item
    app.post('/api/v1/item/', item.createItem);
    // UPDATE item IN DB
    // Обновить существующую запись
    app.put('/api/v1/item/:id', item.update);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////  RECORDS   ///////////////////////////////////////////////////////////////////////////////////
    // GET RECORDS
    // Get list records by purchaseId by subsrt
    app.get('/api/v1/records/:purchaseId', record.get);
    // GET record
    // Get one record by id
    app.get('/api/v1/record/:id', record.getById);
    // CREATE
    // Create new record
    app.post('/api/v1/record/', record.createRecord);
    // UPDATE record IN DB
    // Обновить существующую запись
    app.put('/api/v1/record/:id', record.update);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////  USERS   ///////////////////////////////////////////////////////////////////////////////////
    // GET USERS
    // Get list users
    app.get('/api/v1/users/', users.get);
    // GET user
    // Get one record by id
    app.get('/api/v1/user/:id', users.getById);
    // CREATE
    // Create new record
    app.post('/api/v1/user/', users.createUser);
    // UPDATE record IN DB
    // Обновить существующую запись
    app.put('/api/v1/user/:id', users.update);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(7777, function() {
    console.log('%s listening at1 %s', app.name, app.url);
});

/*app.get('/api/v1/items/:itemId', function(req, res, next) {
    //Model.seq.authenticate();
    console.log('get ' + req);
    res.send(200, req.item);
});

app.put('/api/v1/items/:itemId', function(req, res, next) {
    req.item.set(req.body);
    console.log('put save' + req);
    req.item.save(function(err, item) {
        res.send(204, item);
    });
});

app.post('/api/v1/items/:itemId', function(req, res, next) {
    var item = new Item(req.body);
    console.log('save' + req);
    item.save(function(err, item) {
        res.send(201, item);
    });
});

app.del('/api/v1/items/:itemId', function(req, res, next) {
    req.item.remove(function(err) {
        console.log('del' + req);
        res.send(204, {text:"trololo"});
    });
});*/
