'use strict'

let ModelosModel = require("../../models/ModelosModel");
let VariantesModel = require("../../models/VehiculosModel");
function ModelosController() {}

// GET /
ModelosController.prototype.index_get = () => {
    return new Promise((resolve, reject) => {
        ModelosModel.obtener((err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// GET /:id
ModelosController.prototype.id_get = (id) => {
    return new Promise((resolve, reject) => {
        ModelosModel.obtenerPorID(id, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// GET /buscar
ModelosController.prototype.buscar_post = (busqueda) => {
    return new Promise((resolve, reject) => {
        ModelosModel.buscar(busqueda, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// POST /
ModelosController.prototype.index_post = (clienteNuevo) => {
    console.log(ModelosModel);
    return new Promise((resolve, reject) => {
        ModelosModel.crear(clienteNuevo, (err, cliente) => {
            if (err) reject(err);
            resolve(cliente);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// PUT /
ModelosController.prototype.index_put = (id, clienteModificado) => {
    return new Promise((resolve, reject) => {
        ModelosModel.guardar(id, clienteModificado, (err, clienteGuardado) => {
            if (err) reject(err);
            resolve(clienteGuardado);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// DELETE /
ModelosController.prototype.index_delete = (id) => {
    return new Promise((resolve, reject) => {
        ModelosModel.eliminar(id, (err, clienteEliminado) => {
            if (err) reject(err);
            resolve(clienteEliminado);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// Variantes
// GET /Variantes/:id
ModelosController.prototype.variantes_get = (id) => {
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

// POST /:id/Variantes
ModelosController.prototype.variantes_post = (id, variante) => {
    return new Promise((resolve, reject) => {
        ModelosModel.crearVarainte(id, variante, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// PUT /Variantes/:id
ModelosController.prototype.variantes_put = (id, variante) => {
    return new Promise((resolve, reject) => {
        VariantesModel.guardar(id, variante, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// DELETE /Variantes/:id
ModelosController.prototype.variantes_delete = (id) => {
    console.log(ModelosModel);
    return new Promise((resolve, reject) => {
        VariantesModel.eliminar(id, (err, cliente) => {
            if (err) reject(err);
            resolve(cliente);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

module.exports = ModelosController;