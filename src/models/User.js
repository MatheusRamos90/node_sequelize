const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING
        }, {
            sequelize: connection
        });
    }

    // associação de entidades com sequelize
    static associate(models) {
        this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' }); //um endereço para um usuário 1:N
        this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
    }
}

module.exports = User;