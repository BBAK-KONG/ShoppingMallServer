const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('point', {
    sum: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id3: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'point',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id3" },
        ]
      },
      {
        name: "user_id3_idx",
        using: "BTREE",
        fields: [
          { name: "user_id3" },
        ]
      },
    ]
  });
};
