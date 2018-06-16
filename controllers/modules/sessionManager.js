'use strict'
let formatear = require("./responseFormatter");

let sessionManager = new Object();

sessionManager.needLogin = (req, res, next) => {
    if (req.user == undefined) next();
    else res.redirect("/login");
}

sessionManager.needLoginAPI = (req, res, next) => {
    if (req.user == undefined) next();
    else res.json(formatear(false, "La sesión no está iniciada"));
}

sessionManager.needLogout = (req, res, next) => {
    if (req.user != undefined) next();
    else res.redirect("/home");
}

sessionManager.needLogoutAPI = (req, res, next) => {
    if (req.user != undefined) next();
    else res.json(formatear(false, "La sesión ya está iniciada"));
}

module.exports = sessionManager;