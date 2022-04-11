var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { update } = require("../database/connection");

class User{

    async findAll(){
        try{
            var result = await knex.select(["id","name", "email", "role"]).table("users");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id","name", "email", "role"]).where({id: id}).table("users");

            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async new(name, email, password){

        try{
            var hash = await bcrypt.hash(password, 10);

            await knex.insert({ name, email, password: hash, role: 0}).table("users");
        }catch(err){
            console.log(err);
        }
    }

    async findEmail(email){
        try{
            var result = await knex.select("*").from("users").where({email: email});
            
            if(result.length > 0){
                return true;
            }else{
                return false;
            }

        }catch(err){
                console.log(err);
                return false;
            }      
    }
            async update (id, name, email, role){

                var user = await this.findById(id);

                if(user != undefined){
                    var editUser = {}

                    if(email != undefined){
                        if(email != user.email){
                            var result = await this.findEmail(email);
                            if(result == false){
                                editUser.email = email;
                            }else{
                                return {status: false, err: "O email já está cadastrado!"}
                            }
                        }
                    }

                    if(name != undefined){
                        editUser.name = name;
                    }

                    if(role != undefined){
                        editUser.role = role;
                    }

                    try{
                    await knex.update(editUser).where({id: id}).table("users");
                    return{status: true}
                }catch(err){
                    return {status: false, err: err}
                    }
                }else{
                    return{status: false, err: "O usuário não existe."}
                }
            }

            async delete(id){
                var user = await this.findById(id);
                if (user != undefined){

                    try{
                        await knex.delete().where({id: id}).table("users");
                        return {status: true}
                    }catch(err){
                        return { status: false, err: err}
                    }
                }else{
                    return {status: false, err:"O usuárionão existe."}
                }
            }
    }


module.exports = new User();