var mongoose = require("mongoose");

var VariantesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    caracteristicas: {
        type: {
            aireAcondicionado: {
                type: Boolean,
                required: true
            },
            pasajeros: {
                type: Number,
                required: true
            },
            capacidadTanque: {
                type: Number,
                required: true
            },
            puertas: {
                type: Number,
                required: true
            },
            quemacocos: {
                type: Boolean,
                required: true
            },
            convertible: {
                type: Boolean,
                required: true
            },
            rendimiento: {
                type: Number,
                required: true
            },
            potencia: {
                type: Number,
                required: true
            },
            torque: {
                type: Number,
                required: true
            },
            transmision: {
                type: String,
                required: true
            },
            traccion: {
                type: String,
                required: true
            }
        },
        required: true
    },
    meta: {
        activo: {type: Boolean, default: true},
        creado: {type: Date, default: Date.now},
        modificado: {type: Date, default: Date.now}
    }
});

// Obtiene todos los clientes
VariantesSchema.statics.obtener = function(callback) {
    return this.find({"meta.activo": true}, callback);
}

// Obtiene todos los clientes
VariantesSchema.statics.obtenerPorID = function(id, callback) {
    return this.find({_id: id, "meta.activo": true}).populate("administrador").populate("agentes").exec(callback);
}

// Ingresa un nuevo documento a la coleccion
VariantesSchema.statics.crear = function(cliente, callback) {
    return this.create(cliente, callback);
}

// Ingresa el criterio de búsqueda y obtiene los datos
VariantesSchema.statics.guardar = function(id, cliente, callback) {
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
VariantesSchema.statics.eliminar = function(id, callback) {
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

var Variantes = mongoose.model("Variantes", VariantesSchema);

module.exports = Variantes;