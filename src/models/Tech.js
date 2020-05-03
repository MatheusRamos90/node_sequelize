const { Model, DataTypes } = require('sequelize');

class Tech extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: 'techs' //nome entidade
        });
    }

    // associação de entidades com sequelize
    static associate(models) {
        // varias tecnologias para varios usuarios... 'tech_id' pertence à entidade 'user_techs', e este campo referencia de 'id' da entidade 'techs'
        this.belongsToMany(models.User, { foreignKey: 'tech_id', through: 'user_techs', as: 'users' });
    }
}

module.exports = Tech;