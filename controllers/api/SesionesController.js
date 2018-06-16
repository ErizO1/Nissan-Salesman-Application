'use strict'
// var express = require("express")
let formatear = require("../modules/responseFormatter");
let passport = require("passport");

function SesionesController() {}

// POST /login
SesionesController.prototype.login_post = (req, res) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            res.status(500).json(formatear(false, err))
        }

        if (!user || !user.meta.active) {
            return res.status(404).json(formatear(false, "Usuario y/o Contraseña incorrecots"));
        }

        req.logIn(user, (err) => {
            if (err) {
                res.status(500).json(formatear(false, err));
            } else {
                user.password = "Wont Be dat Izi...";
                res.status(200).json(formatear(true, user));
            }
        });
    })(req, res);
}

// POST /logout
SesionesController.prototype.logout_post = (req, res) => {
    req.logout();
    req.user = undefined;
    res.status(200).json(formatear(true, "Sesion cerrada"));
}

module.exports = SesionesController;