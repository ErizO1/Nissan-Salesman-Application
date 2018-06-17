'use strict'

function regexValidations() {};

regexValidations.telefono = new RegExp(/^\d{10}$/);
regexValidations.rfc = new RegExp(/^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$/);
regexValidations.nombre = new RegExp(/^[a-z|A-Z|\.|\s]+$/);
regexValidations.correo = new RegExp(/^[a-zA-Z0-9_]*\@[a-zA-Z0-9_]*\..+$/);
regexValidations.cp = new RegExp(/^\d{5}$/);
regexValidations.nombreUsuario = new RegExp(/^.+$/);
regexValidations.anio = new RegExp(/^\d{4}$/);

module.exports = regexValidations;