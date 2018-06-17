var express = require("express");
var router = express.Router();
let Modelo = require("../models/ModelosModel");

router.get("/login",  function(req, res){
    res.render("login");
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
});

router.get("/inicio", function(req, res){

    Modelo.find({}, (err, foundModels) => {
        if(err){
            res.send(err);
        }else{    
            res.render("home", {models: foundModels});
        }
    })

});

router.get("/modelo/:nombre/:id", function(req, res){
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

//Global
router.get("/gerentes", function(req, res){
    res.render("global/gerentes");
});

router.get("/agencias", function(req, res){
    res.render("global/agencias");
});

router.get("/modelos", function(req, res){
    res.render("global/modelos");
});

router.get("/stock/global", function(req, res){
    res.render("global/stock");
});

router.get("/", function(req, res){
    res.redirect("/login");
});

//Gerente

router.get("/empleados", function(req, res){
    res.render("gerente/empleados");
});

router.get("/stock/agencia", function(req, res){
    res.render("gerente/stock");
});

router.get("/envios", function(req, res){
    res.render("gerente/envios");
});

router.get("/ventas/local", function(req, res){
    res.render("gerente/ventas");
});

//Vendedor

router.get("/clientes", function(req, res){
    res.render("vendedor/clientes");
});

router.get("/ventas/vendedor", function(req, res){
    res.render("vendedor/ventas");
});

router.get("/stock/local", function(req, res){
    res.render("vendedor/stock");
});

router.get("/compador", function(req, res){
    res.render("comparer");
});

module.exports = router;