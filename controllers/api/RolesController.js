'use strict'

let RolesModel = require("../../models/RolesModel");
function AgenciasController() {}

// GET /
AgenciasController.prototype.index_get = () => {
    return new Promise((resolve, reject) => {
        RolesModel.obtener((err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    }, (err) => {
        console.log(err);
        reject(err);
    });
}
module.exports = AgenciasController;