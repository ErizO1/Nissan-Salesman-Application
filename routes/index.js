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

router.get("/comparador", function(req, res){
    res.render("comparer");
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

module.exports = router;