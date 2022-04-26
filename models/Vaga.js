var knex = require("../database/connection");

class Vaga{

    async new(titulo, level, tipo, empresa, descricao){

        try{

            await knex.insert({ titulo, level, tipo, empresa, descricao}).table("vagas");

        }catch(err){
            console.log(err);
        }
    }


}

module.exports = new Vaga();