'use strict';
module.exports = (sequelize, DataTypes) => {
  const access_tokens = sequelize.define('access_tokens', {
    code: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  access_tokens.associate = function(models) {
    // associations can be defined here
  };
  return access_tokens;
};