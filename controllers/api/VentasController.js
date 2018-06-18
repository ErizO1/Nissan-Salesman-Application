'use strict'

let VentasModel = require("../../models/VentasModel");
let ClientesModel = require("../../models/ClientesModel");
let AgentesModel = require("../../models/AgentesModel");
let VehiculosModel = require("../../models/VehiculosModel");
function VentasController() {}

// GET /
VentasController.prototype.index_get = () => {
    return new Promise((resolve, reject) => {
        VentasModel.obtener((err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// GET /:id
VentasController.prototype.id_get = (id) => {
    return new Promise((resolve, reject) => {
        VentasModel.obtenerPorID(id, (err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// GET /Agente/:id
VentasController.prototype.agente_get = (idAgente) => {
    console.log(VentasModel);
    return new Promise((resolve, reject) => {
        VentasModel.obtenerPorIDAgente(idAgente, (err, cliente) => {
            if (err) reject(err);
            resolve(cliente);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// GET /Cliente/:id
VentasController.prototype.cliente_get = (idCliente) => {
    console.log(VentasModel);
    return new Promise((resolve, reject) => {
        VentasModel.obtenerPorIDAgente(idCliente, (err, cliente) => {
            if (err) reject(err);
            resolve(cliente);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// POST /
VentasController.prototype.index_post = (nuevaVenta) => {
    return new Promise((resolve, reject) => {
        ClientesModel.obtenerPorID(nuevaVenta.cliente, (err, cliente) => {
            if (err) return reject(err);
            if (!cliente || cliente.length == 0) return reject("El cliente no se encuentra");

            AgentesModel.obtenerPorID(nuevaVenta.agente, (err, agente) => {
                if (err) return reject(err);
                if (!agente || agente.length == 0) return reject("El agente no se encuentra");

                VehiculosModel.obtenerPorID(nuevaVenta.vehiculo, (err, vehiculo) => {
                    if (err) return reject(err);
                    if (!vehiculo || vehiculo.length == 0) return reject("El vehiculo no se encuentra");
                    vehiculo = vehiculo[0];
                    if (vehiculo.status != "Disponible") return reject("Este vehiculo no se puede poner a la venta");
                    
                    nuevaVenta.status = "Apartado";
                    VentasModel.crear(nuevaVenta, (err, ventaCreada) => {
                        vehiculo.status = "Apartado";
                        vehiculo.save((err, vehiculoGuardado) => {
                            if (err) reject(err);
                            resolve(ventaCreada);
                        })
                    })
                })
            })
        })
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

// PUT /:id/Credito
VentasController.prototype.credito_put = (id, credito) => {
    return new Promise((resolve, reject) => {
        VentasModel.obtenerPorID(id, (err, venta) => {
            if (err) return reject(err);
            if (!venta) return reject("La venta no se encuentra");
            venta = venta[0];
            if (venta.status != "Apartado") return reject("La venta no se puede modificar")
            if (credito.tasa == undefined) return reject("No se especificó la tasa")
            if (credito.mensualidades == undefined) return reject("No se especificaron las mensualidades");
            venta.credito = { };
            venta.credito.tasa = credito.tasa;
            venta.credito.mensualidades = credito.mensualidades;

            venta.save((err, ventaCredito) => {
                if (err) reject(err);
                return resolve(ventaCredito);
            })
        });
    }, (err) => {
        console.log(err);
        return reject(err);
    });
}

// PUT /:id/Contado
VentasController.prototype.contado_put = (id) => {
    return new Promise((resolve, reject) => {
        VentasModel.obtenerPorID(id, (err, venta) => {
            if (err) return reject(err);
            if (!venta) return reject("La venta no se encuentra");
            venta = venta[0];
            if (venta.status != "Apartado") return reject("La venta no se puede modificar")
            if (venta.credito) venta.credito = undefined;

            venta.save((err, ventaContado) => {
                if (err) reject(err);
                return resolve(ventaContado);
            })
        });
    }, (err) => {
        console.log(err);
        return reject(err);
    });
}

// PUT /:id/Precio
VentasController.prototype.precio_put = (id, precio) => {
    return new Promise((resolve, reject) => {
        if (precio == undefined) return reject("No se ingresó el precio");
        VentasModel.obtenerPorID(id, (err, venta) => {
            if (err) return reject(err);
            if (!venta) return reject("La venta no se encuentra");
            venta = venta[0];
            if (venta.status != "Apartado") return reject("La venta no se puede modificar")
            venta.precio = precio;

            venta.save((err, ventaContado) => {
                if (err) return reject(err);
                return resolve(ventaContado);
            })
        });
    }, (err) => {
        console.log(err);
        return reject(err);
    });
}

// PUT /:id/vender
VentasController.prototype.vender_put = (id) => {
    return new Promise((resolve, reject) => {
        VentasModel.obtenerPorID(id, (err, venta) => {
            if (err) return reject(err);
            venta = venta[0];
            if (venta.status != "Apartado") return reject("La venta ya está concretada, no puede venderse de nuevo")
            venta.status = "Vendido";
            venta.save((err, ventaCerrada) => {
                if (err) return reject(err);
                VehiculosModel.obtenerPorID(venta.vehiculo, (err, vehiculo) => {
                    if (err) return reject(err);
                    vehiculo = vehiculo[0];
                    vehiculo.status = "Vendido";
                    vehiculo.save((err, vehiculoVendido) => {
                        if (err) return reject(err);
                        // vehiculoVendido = vehiculoVendido[0];
                        // VentasModel.eliminar(ventaCerrada._id, (err, ventaEliminada) => {
                            // if (err) return reject(err);
                            VehiculosModel.eliminar(vehiculoVendido.id, (err, vehiculoEliminado) => {
                                if (err) return reject(err);
                                return resolve(venta);
                            })
                        // })
                    })
                })
            })
        })
    }, (err) => {
        console.log(err);
        return reject(err);
    })
};

// DELETE /:id/Cancelar
VentasController.prototype.cancelar_delete = (id) => {
    return new Promise((resolve, reject) => {
        VentasModel.obtenerPorID(id, (err, venta) => {
            if (err) return reject(err);
            venta = venta[0];
            if (venta.status != "Apartado") return reject("La venta ya está concretada, no puede cancelarse")
            venta.status = "Cancelado";
            venta.save((err, ventaCerrada) => {
                if (err) return reject(err);
                VehiculosModel.obtenerPorID(venta.vehiculo, (err, vehiculo) => {
                    if (err) return reject(err);
                    vehiculo = vehiculo[0];
                    vehiculo.status = "Disponible";
                    vehiculo.save((err, vehiculoVendido) => {
                        if (err) return reject(err);
                        VentasModel.eliminar(ventaCerrada._id, (err, ventaEliminada) => {
                            if (err) return reject(err);
                            return resolve(ventaEliminada);
                        })
                    })
                })
            })
        })
    }, (err) => {
        console.log(err);
        return reject(err);
    })
};

// DELETE /:id
VentasController.prototype.index_delete = (id) => {
    return new Promise((resolve, reject) => {
        this.eliminar(id, (err, venta) => {
            if (err) reject(err);
            resolve(venta);
        });
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

module.exports = VentasController;