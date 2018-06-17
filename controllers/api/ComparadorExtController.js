'use strict'

let ModelosModel = require("../../models/ModelosModel");
function ComparadorExtController() {}

// GET /
ComparadorExtController.prototype.index_get = () => {
    return new Promise((resolve, reject) => {
        ModelosModel.obtenerComparadorExt((err, clientes) => { 
            if (err) reject(err);
            resolve(clientes);
        });  
    }, (err) => {
        console.log(err);
        reject(err);
    });
}

module.exports = ComparadorExtController;