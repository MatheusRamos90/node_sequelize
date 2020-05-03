const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show(req, res) {
        // Encontrar todos usuários que tem email que terminam com '@gmail.com'
        // Desses usuários buscar todos que moram na rua 'Rua Blumenau'
        // Desses usuários buscar as tecnologias que começam com React

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.iLike]: '%@gmail.com'
                }
            },
            include: [
                {
                    association: 'addresses',
                    where: {
                        street: 'Rua Blumenau'
                    }
                }, // addresses
                {
                    association: 'techs',
                    required: false,
                    where: {
                        name: {
                            [Op.iLike]: 'React%'
                        }
                    }
                } // techs
            ]
        });

        return res.json(users);
    }
};