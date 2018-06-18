var gerentes;
var gerenteSeleccionado = null;
var tabla;
var form;
var tituloForm;

var tb_username;
var tb_password;
var tb_nombre;
var tb_apellidoP;
var tb_apellidoM;
var tb_telefono;
var tb_correo;
var cb_estado;
var tb_cp;
var tb_ciudad;
var tb_domicilio;
var cb_agencia;
var cb_rol;

var btn_Agregar;
var btn_Guardar;
var btn_Cancelar;
var lb_Guardando;

$(() => {
    tabla = new Tabla();
    $("#table").html("").append(tabla.getTable());
    tabla.setClass("table", "table");
    tabla.setClass("thead", "table__head");
    tabla.setClass("tbody", "table__body");
    tabla.setClass("th", "table__th");
    tabla.setClass("tr", "table__row-td");
    tabla.setClass("td", "table__td");
    tabla.setHeader(["NOMBRE", "TELÉFONO", "CORREO", "ESTADO", "CIUDAD"]);

    tb_username = $("#tb_username");
    tb_password = $("#tb_password");
    tb_nombre = $("#tb_nombre");
    tb_apellidoP = $("#tb_apellidoP");
    tb_apellidoM = $("#tb_apellidoM");
    tb_telefono = $("#tb_telefono");
    tb_correo = $("#tb_correo");
    cb_estado = $("#cb_estado");
    tb_cp = $("#tb_cp");
    tb_ciudad = $("#tb_ciudad");
    tb_domicilio = $("#tb_domicilio");
    cb_agencia = $("#cb_agencia");
    cb_rol = $("#cb_rol");

    form = $("#form");
    tituloForm = $("#tituloForm");
    lb_Guardando = $("#lb_Guardando");
    btn_Agregar = $("#btn_Agregar").click(() => {
        $.ajax({
            url: "/api/Estados",
            method: "GET",
            success: (res) => {
                estados = res.data;
                cb_estado.html("");
                $.each(estados, (index, estado) => {
                    cb_estado.append($("<option>").val(estado).html(estado));
                })
            }
        });
        $.ajax({
            url: "/api/Agencias",
            method: "GET",
            success: (res) => {
                agencias = res.data;
                cb_agencia.html("");
                $.each(agencias, (index, agencia) => {
                    cb_agencia.append($("<option>").val(agencia._id).html(agencia.nombre));
                })
            }
        });
        $.ajax({
            url: "/api/Roles",
            method: "GET",
            success: (res) => {
                roles = res.data;
                cb_rol.html("");
                $.each(roles, (index, rol) => {
                    cb_rol.append($("<option>").val(rol._id).html(rol.nombre));
                })
            }
        });
        gerenteSeleccionado = null;

        tb_nombre.val("");
        tb_apellidoP.val("");
        tb_apellidoM .val("");
        tb_telefono.val("");
        tb_correo.val("");
        cb_estado.val("");
        tb_cp.val("");
        tb_ciudad.val("");
        tb_domicilio.val("");
        cb_agencia.val("");
        cb_rol.val("");


        tituloForm.html("Agregar Gerente");
        $("#table").hide();
        form.show();
    });
    btn_Guardar = $("#btn_Guardar").click(() => {
        lb_Guardando.html("Guardando").show();
        if (gerenteSeleccionado) { // /Put
            $.ajax({
                url: "/api/Agentes/" + gerenteSeleccionado._id,
                method: "PUT",
                data: {
                    username: tb_username.val(),
                    nombre: tb_nombre.val(),
                    apellidoP: tb_apellidoP.val(),
                    apellidoM: tb_apellidoM.val(),
                    telefono: tb_telefono.val(),
                    correo: tb_correo.val(),
                    estado: cb_estado.val(),
                    cp: tb_cp.val(),
                    ciudad: tb_ciudad.val(),
                    domicilio: tb_domicilio.val(),
                    agencia: cb_agencia.val(),
                    rol: cb_rol.val()
                },
                success: (res) => {
                    if (res.status) {
                        lb_Guardando.html("Guardado con éxito");
                    } else {
                        lb_Guardando.html("Ocurrió un error al guardar");
                    }
                }
            });
        } else { // Post
            $.ajax({
                url: "/api/Agentes/",
                method: "POST",
                data: {
                    username: tb_username.val(),
                    password: tb_password.val(),
                    nombre: tb_nombre.val(),
                    apellidoP: tb_apellidoP.val(),
                    apellidoM: tb_apellidoM.val(),
                    telefono: tb_telefono.val(),
                    correo: tb_correo.val(),
                    estado: cb_estado.val(),
                    cp: tb_cp.val(),
                    ciudad: tb_ciudad.val(),
                    domicilio: tb_domicilio.val(),
                    agencia: cb_agencia.val(),
                    rol: cb_rol.val()
                },
                success: (res) => {
                    if (res.status) {
                        lb_Guardando.html("Guardado con éxito");
                        tituloForm.html("Modificar Agencia");
                        gerenteSeleccionado = res.data;
                    } else {
                        lb_Guardando.html("Ocurrió un error al guardar");
                    }
                }
            });
        }
    });
    btn_Cancelar = $("#btn_Cancelar").click(() => {
        form.hide();
        $("#table").show();
        actualizarTabla();
    });

    $("#btn-remove").click(() => {
        $.ajax({
            url: `/api/Agentes/${gerenteSeleccionado._id}`,
            method: "DELETE",
            success: function() {
                actualizarTabla();
            }
        });
    });

    actualizarTabla();
});

let actualizarTabla = () => {
    $.ajax({
        url: "/api/Agentes/",
        method: "GET",
        dataType: "json",
        success: (res) => {
            gerentes = res.data;
            tabla.cleanTable();
            $.each(gerentes, (index, gerente) => {
                let controlsHTML = "<div class='table__dropdown dropdown dropleft'>";
                controlsHTML += "<a class='table__dropdown-button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>...</a>";
                controlsHTML += "<div class='table__dropdown-menu dropdown-menu' aria-labelledby='data1'>";
                controlsHTML +=   "<a class='edit-agency_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.form-agency'>Editar</a>";
                controlsHTML +=   "<a class='remove-agency_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.delete-element'>Borrar</a>";
                controlsHTML += "</div>";
                controlsHTML += "</div>";
                let controls = $(controlsHTML)
                console.log(controls.get()[0]);
                controls.find(".edit-agency_show").click(function() {
                    $.ajax({
                        url: "/api/Estados",
                        method: "GET",
                        success: (res) => {
                            estados = res.data;
                            $.each(estados, (index, estado) => {
                                cb_estado.append($("<option>").val(estado).html(estado));
                            })
                        }
                    });
                    $.ajax({
                        url: "/api/Agencias",
                        method: "GET",
                        success: (res) => {
                            agencias = res.data;
                            cb_agencia.html("");
                            $.each(agencias, (index, agencia) => {
                                cb_agencia.append($("<option>").val(agencia._id).html(agencia.nombre));
                            })
                        }
                    });
                    $.ajax({
                        url: "/api/Roles",
                        method: "GET",
                        success: (res) => {
                            roles = res.data;
                            cb_rol.html("");
                            $.each(roles, (index, rol) => {
                                cb_rol.append($("<option>").val(rol._id).html(rol.nombre));
                            })
                        }
                    });
                    gerenteSeleccionado = gerente;
                    tb_nombre.val(gerente.nombre);
                    tb_apellidoP.val(gerente.apellidoP);
                    tb_apellidoM .val(gerente.apellidoM);
                    tb_telefono.val(gerente.telefono);
                    tb_correo.val(gerente.correo);
                    cb_estado.val(gerente.estado);
                    tb_cp.val(gerente.cp);
                    tb_ciudad.val(gerente.ciudad);
                    tb_domicilio.val(gerente.domicilio);
                    cb_agencia.val(gerente.agencia);
                    cb_rol.val(gerente.rol.nombre);

                    tituloForm.html("Modificar Gerente");
                    $("#table").hide();
                    form.show();
                })
                controls.find(".remove-agency_show").click(function() {
                    gerenteSeleccionado = gerente;
                });
                tabla.appendRow([
                    gerente.nombre,
                    gerente.telefono,
                    gerente.correo,
                    gerente.estado,
                    gerente.ciudad,
                    controls
                ]);
            })
        }
    });
}