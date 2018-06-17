'use strict'

let VehiculosModel = require("../../models/VehiculosModel");
function VehiculosController() {}

// GET /
VehiculosController.prototype.index_get = () => {
    return new Promise((resolve, reject) => {
        VehiculosModel.obtener((err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// GET /:id
VehiculosController.prototype.id_get = (id) => {
    return new Promise((resolve, reject) => {
        VehiculosModel.obtenerPorID(id, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// GET /agencia/:id
VehiculosController.prototype.agencia_get = (id) => {
    return new Promise((resolve, reject) => {
        VehiculosModel.obtenerPorAgencia(id, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// POST /
VehiculosController.prototype.index_post = (clienteNuevo) => {
    console.log(VehiculosModel);
    return new Promise((resolve, reject) => {
        VehiculosModel.crear(clienteNuevo, (err, cliente) => {
            if (err) reject(err);
            resolve(cliente);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// PUT /
VehiculosController.prototype.index_put = (id, clienteModificado) => {
    return new Promise((resolve, reject) => {
        VehiculosModel.guardar(id, clienteModificado, (err, clienteGuardado) => {
            if (err) reject(err);
            resolve(clienteGuardado);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// DELETE /
VehiculosController.prototype.index_delete = (id) => {
    return new Promise((resolve, reject) => {
        VehiculosModel.eliminar(id, (err, clienteEliminado) => {
            if (err) reject(err);
            resolve(clienteEliminado);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

module.exports = VehiculosController;