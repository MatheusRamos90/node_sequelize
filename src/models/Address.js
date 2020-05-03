const { Model, DataTypes } = require('sequelize');

class Address extends Model {
    static init(connection) {
        super.init({
            zipcode: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER
        }, {
            sequelize: connection
        });
    }

    // associação de entidades com sequelize
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' }); //um endereço para um usuário 1:1
    }
}

module.exports = Address;