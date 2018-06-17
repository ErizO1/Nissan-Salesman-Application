var mongoose = require("mongoose");
var validador = require("../controllers/modules/regexValidations");

var ClienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        validate: validador.nombre
    },
    apellidoP: {
        type: String,
        required: true,
        validate: validador.nombre
    },
    apellidoM: {
        type: String,
        required: true,
        validate: validador.nombre
    },
    rfc: {
        type: String,
        required: true,
        validate: validador.rfc
    },
    telefono: {
        type: String,
        required: true,
        validate: validador.telefono
    },
    correo: {
        type: String,
        required: true,
        validate: validador.correo
    },
    estado: {
        type: String,
        required: true,
    },
    cp: {
        type: Number,
        required: true,
        validate: validador.cp
    },
    domicilio: {
        type: String,
        required: true
    },
    agencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agencias",
        required: false
    },
    agente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agentes",
        required: false
    },
    meta: {
        activo: {type: Boolean, default: true},
        creado: {type: Date, default: Date.now},
        modificado: {type: Date, default: Date.now}
    }
});

// Obtiene todos los clientes
ClienteSchema.statics.obtener = function(callback) {
    return this.find({"meta.activo": true}, callback);
}

// Obtiene todos los clientes
ClienteSchema.statics.obtenerPorID = function(id, callback) {
    return this.find({_id: id, "meta.activo": true}).populate("agencia").populate("agente").exec(callback);
}

// Ingresa un nuevo documento a la coleccion
ClienteSchema.statics.crear = function(cliente, callback) {
    return this.create(cliente, callback);
}

// Ingresa el criterio de búsqueda y obtiene los datos
ClienteSchema.statics.guardar = function(id, cliente, callback) {
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
ClienteSchema.statics.eliminar = function(id, callback) {
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

var Clientes = mongoose.model("Clientes", ClienteSchema);

module.exports = Clientes;