var Vaga = require("../models/Vaga");

class VagaController{
    
    async create(req, res){
        
        var { titulo, level, tipo, empresa, descricao } = req.body;

        if(titulo == undefined || titulo == "" || titulo == " "){
            res.status(400);
            res.json({err: "Precisa definir um título para a vaga."})
            return;
        }

        await Vaga.new(titulo, level, tipo, empresa, descricao);

        res.status(200);
        res.send("Tudo ok.")
    }

    async index(req, res){
        var vagas = await Vaga.findAll();
        res.json(vagas);
    }

    async remove(req, res){
        var id = req.params.id;

        var result = await Vaga.delete(id);
        
        if(result.status){
            res.status(200);
            res.send("Tudo Ok!");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

}

module.exports = new VagaController();