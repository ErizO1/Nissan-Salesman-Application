let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");
let roles = require("./RolesModel");

let AgentesSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellidoP: {
        type: String,
        required: true
    },
    apellidoM: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    cp: {
        type: Number,
        required: true
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

// Ingresa el criterio de búsqueda y obtiene los datos
AgentesSchema.statics.buscar = function(busqueda, callback) {
    busqueda["meta.activo"] = true;
    console.log(JSON.stringify(busqueda));
    return this.find(busqueda, callback);
}

// Ingresa un nuevo documento a la coleccion
AgentesSchema.statics.crear = function(agente, callback) {
    return this.register(agente, agente.password , callback);
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
        { new: true },
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