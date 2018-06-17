var mongoose = require("mongoose");
let validador = require("../controllers/modules/regexValidations");
let VariantesModel = require("./VariantesModel");

var ModelosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        validate: validador.nombre
    },
    anio: {
        type: Number,
        required: true,
        validate: validador.anio
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    colores: {
        type: {
            interior: {
                type: [{
                    nombre: {
                        type: String,
                        required: false
                    },
                    codigo: {
                        type: String,
                        required: false
                    }
                }],
                default: []
            },
            exterior: {
                type: [{
                    nombre: {
                        type: String,
                        required: false
                    },
                    codigo: {
                        type: String,
                        required: false
                    }
                }],
                default: []
            },
        },
        required: true
    },
    dimensiones: {
        type: {
            alto: Number,
            ancho: Number,
            largo: Number
        },
        required: true
    },
    imagenes: {
        type: {
            urls: [{
                type: String,
                required: false
            }],
            banner: {
                type: String,
                required: true
            }
        },
        required: true
    },
    variantes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variantes",
        required: false
    }],
    meta: {
        activo: {type: Boolean, default: true},
        creado: {type: Date, default: Date.now},
        modificado: {type: Date, default: Date.now}
    }
});

// Obtiene todos los clientes
ModelosSchema.statics.obtener = function(callback) {
    return this.find({"meta.activo": true}, callback);
}

// Obtiene todos los clientes
ModelosSchema.statics.obtenerPorID = function(id, callback) {
    return this.find({_id: id, "meta.activo": true}).populate("variantes").exec(callback);
}

ModelosSchema.statics.obtenerComparadorExt = function(callback) {
    return this.find({"meta.activo": true}).select({
        _id: false,
        nombre: true,
        "dimensiones.alto": true,
        "dimensiones.ancho": true,
        "dimensiones.largo": true,
        "imagenes.urls": true,
    }).populate({
        _id: false,
        path: "variantes",
        model: "Variantes",
        select: {
            nombre: true,
            precio: true,
            "caracteristicas.rendimiento" : true,
            "caracteristicas.potencia" : true,
            "caracteristicas.torque" : true,
            "caracteristicas.transmision" : true,
            "caracteristicas.traccion" : true,
        }
    }).exec(callback);
}

// Ingresa un nuevo documento a la coleccion
ModelosSchema.statics.crear = function(modelo, callback) {
    return this.create(modelo, callback);
}

// Ingresa un nuevo documento a la coleccion
ModelosSchema.statics.crearVarainte = function(id, variante, callback) {
    VariantesModel.crear(variante, (err, varianteCreada) => {
        this.findOne(
            {
                "_id": id,
                "meta.activo": true
            }, (err, modelo) => {
                if (err) callback(err, modelo);
                modelo.variantes.push(varianteCreada._id);
                modelo.save();
                callback(err, modelo);
            }
        );
    })
}

// Ingresa el criterio de búsqueda y obtiene los datos
ModelosSchema.statics.guardar = function(id, modelo, callback) {
    return this.findOneAndUpdate(
        {
            "_id": id,
            "meta.activo": true
        },
        modelo,
        { new: true },
        callback
    );
}

// Elimina lógicamente el registro
ModelosSchema.statics.eliminar = function(id, callback) {
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

var Modelos = mongoose.model("Modelos", ModelosSchema);

module.exports = Modelos;