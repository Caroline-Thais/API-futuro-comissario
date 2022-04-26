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

}

module.exports = new VagaController();