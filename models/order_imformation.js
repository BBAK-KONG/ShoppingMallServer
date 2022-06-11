const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_imformation', {
    order_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    user_id2: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    product_id2: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'product',
        key: 'product_id'
      }
    }
  }, {
    sequelize,
    tableName: 'order_imformation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "order_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id2" },
        ]
      },
      {
        name: "product_id_idx",
        using: "BTREE",
        fields: [
          { name: "product_id2" },
        ]
      },
    ]
  });
};
