var mongoose = require("mongoose");
var validador = require("../controllers/modules/regexValidations");

var Credito = new mongoose.Schema({
    tasa: {
        type: Number,
        required: true
    },
    mensualidades: {
        type: Number,
        required: true
    }
});

var VentasModel = new mongoose.Schema({
    vehiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehiculos",
        required: true, 
    },
    agente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agentes",
        required: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clientes",
        required: true
    },
    fechaVenta: {
        type: Date,
        required: false,
    },
    precio: {
        type: Number,
        required: false,
    },
    credito: {
        type: Credito,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
    meta: {
        activo: {type: Boolean, default: true},
        creado: {type: Date, default: Date.now},
        modificado: {type: Date, default: Date.now}
    }
});

// Obtiene todos los clientes
VentasModel.statics.obtener = function(callback) {
    return this.find({"meta.activo": true}, callback);
}

// Obtiene todos los clientes
VentasModel.statics.obtenerPorID = function(id, callback) {
    return this.find({_id: id, "meta.activo": true})
        .populate("vehiculo")
        .populate("agente")
        .populate("cliente")
        .exec(callback);
}

// Obtiene todos los clientes
VentasModel.statics.obtenerPorIDAgente = function(idAgente, callback) {
    return this.find({agente: idAgente, "meta.activo": true})
        .populate("vehiculo")
        .populate("agente")
        .populate("cliente")
        .exec(callback);
}

// Obtiene todos los clientes
VentasModel.statics.obtenerPorIDCliente = function(idCliente, callback) {
    return this.find({cliente: idCliente, "meta.activo": true})
        .populate("vehiculo")
        .populate("agente")
        .populate("cliente")
        .exec(callback);
}

// Ingresa un nuevo documento a la coleccion
VentasModel.statics.crear = function(venta, callback) {
    return this.create(venta, callback);
}

// Ingresa el criterio de búsqueda y obtiene los datos
VentasModel.statics.guardar = function(id, venta, callback) {
    return this.findOneAndUpdate(
        {
            "_id": id,
            "meta.activo": true
        },
        venta,
        { new: true, runValidators: true },
        callback
    );
}

// Elimina lógicamente el registro
VentasModel.statics.eliminar = function(id, callback) {
    return this.findOneAndUpdate(
        { 
            "_id": id,
            "meta.activo": true
        },
        { "meta.activo": false },
        { new: true },
        callback
    );
}

var Ventas = mongoose.model("Ventas", VentasModel);

module.exports = Ventas;