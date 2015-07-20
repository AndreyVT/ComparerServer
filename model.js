/**
 * Created with IntelliJ IDEA.
 * User: AVT
 * Date: 31.01.15
 * Time: 17:00
 * To change this template use File | Settings | File Templates.
 */
var Sequelize = require('sequelize');

sequelize = new Sequelize('cmpr', 'cmpr', 'cmpr123', {
        dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
        port:    3306 // or 5432 (for postgres)
    });

Shops = sequelize.define('Shop', {name: Sequelize.STRING, address: Sequelize.STRING, tag: Sequelize.STRING}, {
        tableName: 'cmpr_shops'});

Users = sequelize.define('User', {name: Sequelize.STRING, email: Sequelize.STRING, tag: Sequelize.STRING}, {
    tableName: 'cmpr_users'});

Items = sequelize.define('Item', {name: Sequelize.STRING, artikul: Sequelize.STRING, tag: Sequelize.STRING}, {
    tableName: 'cmpr_items'});

Purchase = sequelize.define('Purchase', {dateRecord: Sequelize.DATE, name: Sequelize.STRING, tag: Sequelize.STRING}, {
    tableName: 'cmpr_purchase'});

Record = sequelize.define('Record', {price: Sequelize.FLOAT, tag: Sequelize.STRING}, {
    tableName: 'cmpr_record'} );

Users.hasOne(Shops);
Users.hasOne(Purchase);

Shops.hasOne(Purchase);

Purchase.hasOne(Record);
Items.hasOne(Record);



sequelize
    .authenticate()
    .complete(function(err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err)
        } else {
            console.log('Connection has been established successfully.')
        }
    });

var model = function(){
    this.seq = sequelize;
    this.Shop = Shops;
    this.User = Users;
    this.Item = Items;
    this.Purchase = Purchase;
    this.Record = Record;
};

module.exports = new model();
