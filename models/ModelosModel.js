var mongoose = require("mongoose");
let validador = require("../controllers/modules/regexValidations");
let VariantesModel = require("./VariantesModel");

var ColoresProp = new mongoose.Schema({
    nombre: {
        type: String,
        required: false
    },
    codigo: {
        type: String,
        required: false,
        match: validador.color
    }
})

var Colores = new mongoose.Schema({
    interior: {
        type: [ColoresProp],
        default: []
    },
    exterior: {
        type: [ColoresProp],
        default: []
    },
})

var Dimensiones = new mongoose.Schema({
        alto: {
            type: Number,
            required: true
        },
        ancho: {
            type: Number,
            required: true
        },
        largo: {
            type: Number,
            required: true
        }
});

var Imagenes = new mongoose.Schema({
    urls: [{
        type: String,
        required: true
    }],
    banner: {
        type: String,
        required: true
    }
})

var ModelosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        match: validador.nombreModelo
    },
    anio: {
        type: Number,
        required: true,
        match: validador.anio
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
        type: Colores,
        required: true
    },
    dimensiones: {
        type: Dimensiones,
        required: true
    },
    imagenes: {
        type: Imagenes,
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
        categoria: true,
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
    this.findOne(
        {
            "_id": id,
            "meta.activo": true
        }, (err, modelo) => {
            if (err) return callback(err);
            if (!modelo) return callback("El modelo no se encuentra")
            VariantesModel.crear(variante, (err, varianteCreada) => {
                if (err) return callback(err);
                modelo.variantes.push(varianteCreada);
                modelo.save(callback);
        });
    });
}

// Ingresa el criterio de búsqueda y obtiene los datos
ModelosSchema.statics.guardar = function(id, modelo, callback) {
    return this.findOneAndUpdate(
        {
            "_id": id,
            "meta.activo": true
        },
        modelo,
        { new: true, runValidators: true },
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