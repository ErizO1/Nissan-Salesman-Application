var mongoose = require("mongoose");

var VehiculosSchema = new mongoose.Schema({
    modelo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Modelos",
        required: true
    },
    variante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variantes",
        required: true
    },
    agencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agencias",
        required: true
    },
    noSerie: {
        type: String,
        required: true
    },
    fechaEntrada: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    venta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ventas"
    },
    meta: {
        activo: {type: Boolean, default: true},
        creado: {type: Date, default: Date.now},
        modificado: {type: Date, default: Date.now}
    }
});

// Obtiene todos los clientes
VehiculosSchema.statics.obtener = function(callback) {
    return this.find({"meta.activo": true}, callback);
}

// Obtiene todos los clientes
VehiculosSchema.statics.obtenerPorID = function(id, callback) {
    return this.find({_id: id, "meta.activo": true})
    .populate("modelo")
    .populate("variante")
    .populate("agencia")
    .populate("venta")
    .exec(callback);
}

// Obtiene todos los clientes
VehiculosSchema.statics.obtenerPorAgencia = function(id, callback) {
    return this.find({agencia: id, "meta.activo": true})
    .populate("modelo")
    .populate("variante")
    .populate("agencia")
    .populate("venta")
    .exec(callback);
}

// Ingresa un nuevo documento a la coleccion
VehiculosSchema.statics.crear = function(cliente, callback) {
    return this.create(cliente, callback);
}

// Ingresa el criterio de búsqueda y obtiene los datos
VehiculosSchema.statics.guardar = function(id, cliente, callback) {
    console.log(id);
    return this.findOneAndUpdate(
        {
            "_id": id,
            "meta.activo": true
        },
        cliente,
        { new: true },
        callback
    );
}

// Elimina lógicamente el registro
VehiculosSchema.statics.eliminar = function(id, callback) {
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

var Vehiculos = mongoose.model("Vehiculos", VehiculosSchema);

module.exports = Vehiculos;