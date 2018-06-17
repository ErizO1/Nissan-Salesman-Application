'use strict'
let formatear = require("./responseFormatter");

function sessionManager() { };

sessionManager.needLogin = (req, res, next) => {
    if (req.user != undefined) next();
    else res.redirect("/");
}

sessionManager.needLoginAPI = (req, res, next) => {
    if (req.user != undefined) next();
    else res.json(formatear(false, "La sesión no está iniciada"));
}

sessionManager.needLogout = (req, res, next) => {
    if (req.user == undefined) next();
    else res.redirect("/inicio");
}

sessionManager.needLogoutAPI = (req, res, next) => {
    if (req.user == undefined) next();
    else res.json(formatear(false, "La sesión ya está iniciada"));
}

module.exports = sessionManager;