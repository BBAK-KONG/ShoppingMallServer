var DataTypes = require("sequelize").DataTypes;
var _destination = require("./destination");
var _order_imformation = require("./order_imformation");
var _point = require("./point");
var _product = require("./product");
var _shopping_basket = require("./shopping_basket");
var _user = require("./user");

function initModels(sequelize) {
  var destination = _destination(sequelize, DataTypes);
  var order_imformation = _order_imformation(sequelize, DataTypes);
  var point = _point(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var shopping_basket = _shopping_basket(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  order_imformation.belongsTo(product, { as: "product_id2_product", foreignKey: "product_id2"});
  product.hasMany(order_imformation, { as: "order_imformations", foreignKey: "product_id2"});
  shopping_basket.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(shopping_basket, { as: "shopping_baskets", foreignKey: "product_id"});
  destination.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(destination, { as: "destinations", foreignKey: "user_id"});
  order_imformation.belongsTo(user, { as: "user_id2_user", foreignKey: "user_id2"});
  user.hasMany(order_imformation, { as: "order_imformations", foreignKey: "user_id2"});
  point.belongsTo(user, { as: "user_id3_user", foreignKey: "user_id3"});
  user.hasOne(point, { as: "point", foreignKey: "user_id3"});
  shopping_basket.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(shopping_basket, { as: "shopping_baskets", foreignKey: "user_id"});

  return {
    destination,
    order_imformation,
    point,
    product,
    shopping_basket,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
