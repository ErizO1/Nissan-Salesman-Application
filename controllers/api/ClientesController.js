'use strict'

let ClientesModel = require("../../models/ClientesModel");
function ClientesController() {}

// GET /
ClientesController.prototype.index_get = () => {
    return new Promise((resolve, reject) => {
        ClientesModel.obtener((err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// GET /:id
ClientesController.prototype.id_get = (id) => {
    return new Promise((resolve, reject) => {
        ClientesModel.obtenerPorID(id, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// GET /buscar
ClientesController.prototype.buscar_post = (busqueda) => {
    return new Promise((resolve, reject) => {
        ClientesModel.buscar(busqueda, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// POST /
ClientesController.prototype.index_post = (clienteNuevo) => {
    console.log(ClientesModel);
    return new Promise((resolve, reject) => {
        ClientesModel.crear(clienteNuevo, (err, cliente) => {
            if (err) reject(err);
            resolve(cliente);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// PUT /
ClientesController.prototype.index_put = (id, clienteModificado) => {
    return new Promise((resolve, reject) => {
        ClientesModel.guardar(id, clienteModificado, (err, clienteGuardado) => {
            if (err) reject(err);
            resolve(clienteGuardado);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// DELETE /
ClientesController.prototype.index_delete = (id) => {
    return new Promise((resolve, reject) => {
        ClientesModel.eliminar(id, (err, clienteEliminado) => {
            if (err) reject(err);
            resolve(clienteEliminado);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

module.exports = ClientesController;