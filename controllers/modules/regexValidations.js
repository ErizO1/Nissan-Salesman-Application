'use strict'

function regexValidations() {};

regexValidations.telefono = /^\d{10}$/;
regexValidations.rfc = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$/;
regexValidations.nombre = /^[a-z|A-Z|\.|\s]+$/;
regexValidations.nombreModelo = /^[a-z|A-Z|\d|\.|\-|\s]+$/;
regexValidations.correo = /^[a-zA-Z0-9_]*\@[a-zA-Z0-9_]*\..+$/;
regexValidations.cp = /^\d{5}$/;
regexValidations.nombreUsuario = /^.+$/;
regexValidations.anio = /^\d{4}$/;
regexValidations.color = /^\#[0-9A-Fa-f]{6}$/

module.exports = regexValidations;