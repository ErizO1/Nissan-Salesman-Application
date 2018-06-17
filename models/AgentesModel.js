let mongoose = require("mongoose");
let validador = require("../controllers/modules/regexValidations");
let passportLocalMongoose = require("passport-local-mongoose");
let roles = require("./RolesModel");

let AgentesSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        match: validador.nombreUsuario
    },
    nombre: {
        type: String,
        required: true,
        match: validador.nombre
    },
    apellidoP: {
        type: String,
        required: true,
        match: validador.nombre
    },
    apellidoM: {
        type: String,
        required: true,
        match: validador.nombre
    },
    telefono: {
        type: String,
        required: true,
        match: validador.telefono
    },
    correo: {
        type: String,
        required: true,
        match: validador.correo
    },
    estado: {
        type: String,
        required: true,
    },
    ciudad: {
        type: String,
        required: true
    },
    cp: {
        type: Number,
        required: true,
        match: validador.cp
    },
    domicilio: {
        type: String,
        required: true
    },
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roles",
        required: true
    },
    agencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agencias",
        required: false
    },
    meta: {
        activo: {type: Boolean, default: true},
        creado: {type: Date, default: Date.now},
        modificado: {type: Date, default: Date.now}
    }
});

// Obtiene todos los clientes
AgentesSchema.statics.obtener = function(callback) {
    return this.find({"meta.activo": true}).populate("rol").exec(callback);
}

// Obtiene todos los clientes
AgentesSchema.statics.obtenerPorID = function(id, callback) {
    return this.find({_id: id, "meta.activo": true}).populate("agencia").populate("rol").exec(callback);
}

// Ingresa un nuevo documento a la coleccion
AgentesSchema.statics.crear = function(agente, contrasena, callback) {
    return this.register(agente, contrasena, callback);
}

// Ingresa el criterio de búsqueda y obtiene los datos
AgentesSchema.statics.guardar = function(id, cliente, callback) {
    console.log(id);
    return this.findOneAndUpdate(
        {
            "_id": id,
            "meta.activo": true
        },
        cliente,
        { new: true, runValidators: true },
        callback
    );
}

// Elimina lógicamente el registro
AgentesSchema.statics.eliminar = function(id, callback) {
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

AgentesSchema.plugin(passportLocalMongoose);

let Agentes = mongoose.model("Agentes", AgentesSchema);

module.exports = Agentes;