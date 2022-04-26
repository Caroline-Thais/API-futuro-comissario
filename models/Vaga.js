var knex = require("../database/connection");

class Vaga{

    async new(titulo, level, tipo, empresa, descricao){

        try{

            await knex.insert({ titulo, level, tipo, empresa, descricao}).table("vagas");

        }catch(err){
            console.log(err);
        }
    }

    async findAll(){
        try{

            var result = await knex.select(["id", "titulo", "level", "tipo", "empresa", "descricao"]).table("vagas");
            return result;

        }catch(err){

            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id","titulo", "level", "tipo", "empresa", "descricao"]).where({id: id}).table("vagas");

            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async delete(id){
        var user = await this.findById(id);
        if (user != undefined){

            try{
                await knex.delete().where({id: id}).table("vagas");
                return {status: true}
            }catch(err){
                return { status: false, err: err}
            }
        }else{
            return {status: false, err:"Vaga não cadastrada."}
        }
    }

} 
        

module.exports = new Vaga();