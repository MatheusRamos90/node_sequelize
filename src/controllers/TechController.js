// const Address = require('../models/Address.js');
const User = require('../models/User.js');
const Tech = require('../models/Tech.js');

module.exports = {
    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: {
                association: 'techs'
            }
        });

        // retorno diferenciado com remoção de campos que não fazem diferença para o consumo de dados
        // const user = await User.findByPk(user_id, {
        //     include: {
        //         association: 'techs',
        //         attributes: ['name'], // é possível escolher os campos que desejo retornar no response
        //         through: { // se existe uma entidade pivo relacionada aqui faço a mesma coisa do 'attributes' acima
        //             // attributes: []
        //             attributes: ['user_id']
        //         }
        //
        //     }
        // });

        return res.json(user.techs);
    },

    async store(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // procura pelo dado se não cria-o com o nome vindo da requisição
        const [ tech ] = await Tech.findOrCreate({
            where: { name }
        });

        await user.addTech(tech); //quando existe um relacionamento é possível usar o método 'addAlgumaCoisa'

        return res.json(tech);
    },

    async remove(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // procura por um único dado igual ao passado pelo request
        const tech = await Tech.findOne({
            where: { name }
        });

        await user.removeTech(tech); //quando existe um relacionamento é possível usar o método 'removeTabela'

        return res.json();
    }

};