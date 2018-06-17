'use strict'

let VariantesModel = require("../../models/VariantesModel");
function VariantesController() {}

// GET /:id
VariantesController.prototype.id_get = (id) => {
    return new Promise((resolve, reject) => {
        VariantesModel.obtenerPorID(id, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// PUT /
VariantesController.prototype.index_put = (id, clienteModificado) => {
    return new Promise((resolve, reject) => {
        VariantesModel.guardar(id, clienteModificado, (err, clienteGuardado) => {
            if (err) reject(err);
            resolve(clienteGuardado);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// DELETE /
VariantesController.prototype.index_delete = (id) => {
    return new Promise((resolve, reject) => {
        VariantesModel.eliminar(id, (err, clienteEliminado) => {
            if (err) reject(err);
            resolve(clienteEliminado);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

module.exports = VariantesController;