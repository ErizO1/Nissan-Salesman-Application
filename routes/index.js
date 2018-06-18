var express = require("express");
var router = express.Router();
let Modelo = require("../models/ModelosModel");
let sessionManager = require("../controllers/modules/sessionManager");

router.get("/", sessionManager.needLogout, function(req, res){
    res.render("login");
});

router.get("/inicio", sessionManager.needLogin, function(req, res){

    Modelo.find({}, (err, foundModels) => {
        if(err){
            res.send(err);
        }else{    
            res.render("home", {models: foundModels});
        }
    })

});

router.get("/modelo/:nombre/:id", sessionManager.needLogin, function(req, res){
    var id = req.params.id;

    Modelo.findOne({"_id": id, "meta.activo": true}, (err, foundModel) => {
        if(err){
            res.send(err);
        }else{
            console.log(foundModel);
            res.render("detalles", {model: foundModel});
        }
    })

});

router.get("/comparador", sessionManager.needLogin, function(req, res){
    res.render("comparer");
});

//Global
router.get("/gerentes", sessionManager.needLogin, function(req, res){
    res.render("global/gerentes");
});

router.get("/agencias", sessionManager.needLogin, function(req, res){
    res.render("global/agencias");
});

router.get("/modelos", sessionManager.needLogin, function(req, res){
    res.render("global/modelos");
});

router.get("/stock/global", sessionManager.needLogin, function(req, res){
    res.render("global/stock");
});

//Gerente

router.get("/empleados", sessionManager.needLogin, function(req, res){
    res.render("gerente/empleados");
});

router.get("/stock/agencia", sessionManager.needLogin, function(req, res){
    res.render("gerente/stock");
});

router.get("/envios", sessionManager.needLogin, function(req, res){
    res.render("gerente/envios");
});

router.get("/ventas/local", sessionManager.needLogin, function(req, res){
    res.render("gerente/ventas");
});

//Vendedor

router.get("/clientes", sessionManager.needLogin, function(req, res){
    res.render("vendedor/clientes");
});

router.get("/ventas/vendedor", sessionManager.needLogin, function(req, res){
    res.render("vendedor/ventas");
});

router.get("/stock/local", sessionManager.needLogin, function(req, res){
    res.render("vendedor/stock");
});

router.get("/compador", sessionManager.needLogin, function(req, res){
    res.render("comparer");
});

module.exports = router;