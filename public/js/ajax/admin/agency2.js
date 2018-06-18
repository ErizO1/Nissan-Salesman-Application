let agencias;
let agenciaSeleccionada = null;
var tabla;
let form;
let tituloForm;

let tb_nombre;
let cb_estado;
let tb_ciudad;
let tb_cp;
let tb_telefono;
let tb_domicilio;
let tb_correo;

let btn_Agregar;
let btn_Guardar;
let btn_Cancelar;
let lb_Guardando;

$(() => {
    tabla = new Tabla();
    $("#table").html("").append(tabla.getTable());
    tabla.setClass("table", "table");
    tabla.setClass("thead", "table__head");
    tabla.setClass("tbody", "table__body");
    tabla.setClass("th", "table__th");
    tabla.setClass("tr", "table__row-td");
    tabla.setClass("td", "table__td");
    tabla.setHeader(["NOMBRE", "ESTADO", "MUNICIPIO", "TELÉFONO"]);

    tb_nombre = $("#tb_nombre");
    cb_estado = $("#cb_estado");
    tb_ciudad = $("#tb_ciudad");
    tb_cp = $("#tb_cp");
    tb_telefono = $("#tb_telefono");
    tb_domicilio = $("#tb_domicilio");
    tb_correo = $("#tb_correo");

    form = $("#form");
    tituloForm = $("#tituloForm");
    lb_Guardando = $("#lb_Guardando");
    btn_Agregar = $("#btn_Agregar").click(() => {
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
        agenciaSeleccionada = null;
        tb_nombre.val("");
        cb_estado.val("");
        tb_ciudad.val("");
        tb_cp.val("");
        tb_telefono.val("");
        tb_domicilio.val("");
        tb_correo.val("");
        tituloForm.html("Agregar Agencia");
        $("#table").hide();
        form.show();
    });
    btn_Guardar = $("#btn_Guardar").click(() => {
        lb_Guardando.html("Guardando").show();
        if (agenciaSeleccionada) { // /Put
            $.ajax({
                url: "/api/Agencias/" + agenciaSeleccionada._id,
                method: "PUT",
                data: {
                    nombre: tb_nombre.val(),
                    estado: cb_estado.val(),
                    ciudad: tb_ciudad.val(),
                    cp: tb_cp.val(),
                    domicilio: tb_domicilio.val(),
                    telefono: tb_telefono.val(),
                    correo: tb_correo.val(),
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
                url: "/api/Agencias",
                method: "POST",
                data: {
                    nombre: tb_nombre.val(),
                    estado: cb_estado.val(),
                    ciudad: tb_ciudad.val(),
                    cp: tb_cp.val(),
                    domicilio: tb_domicilio.val(),
                    telefono: tb_telefono.val(),
                    correo: tb_correo.val(),
                },
                success: (res) => {
                    if (res.status) {
                        lb_Guardando.html("Guardado con éxito");
                        tituloForm.html("Modificar Agencia");
                        agenciaSeleccionada = res.data;
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
            url: `api/Agencias/${agenciaSeleccionada._id}`,
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
        url: "/api/Agencias",
        method: "GET",
        dataType: "json",
        success: (res) => {
            agencias = res.data;
            tabla.cleanTable();
            $.each(agencias, (index, agencia) => {
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
                    agenciaSeleccionada = agencia;
                    tb_nombre.val(agencia.nombre);
                    cb_estado.val(agencia.estado);
                    tb_ciudad.val(agencia.ciudad);
                    tb_cp.val(agencia.cp);
                    tb_telefono.val(agencia.telefono);
                    tb_domicilio.val(agencia.domicilio);
                    tb_correo.val(agencia.correo);
                    tituloForm.html("Modificar Agencia");
                    $("#table").hide();
                    form.show();
                })
                controls.find(".remove-agency_show").click(function() {
                    agenciaSeleccionada = agencia;
                });
                tabla.appendRow([
                    agencia.nombre,
                    agencia.estado,
                    agencia.ciudad,
                    agencia.telefono,
                    controls
                ]);
            })
        }
    });
}