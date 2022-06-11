const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('point', {
    sum: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id3: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'point',
    timestamps: false,
    charset:'utf8',
    collate: 'uft8_general_ci',
    indexes: [
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
