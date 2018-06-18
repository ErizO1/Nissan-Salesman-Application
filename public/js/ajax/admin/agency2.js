let gerentes;
let gerenteSeleccionado = { };
let tabla;
let cb_agencias_add;
let cb_agencias_edit;
$(() => {
    tabla = $(".table");
    cb_agencias_add = $("#cb_agencias_add");
    cb_agencias_edit = $("#cb_agencias_edit");
    actualizarTabla();
});

let actualizarTabla = () => {
    let tbody = $(tabla.find("tbody"));

    $.ajax({
        url: "/api/Agentes",
        method: "GET",
        dataType: "json",
        success: (res) => {
            tbody.html("");
            gerentes = res.data.filter(gerente => gerente.rol._id == "5b24b3d8f0da9671e1c9f665");
            $.each(gerentes, (index, gerente) => {
                console.log(gerente);
                let row = `
                <tr class='table__row-td'>
                    <td class='table__td'>${gerente.nombre} ${gerente.apellidoP}</td>
                    <td class='table__td'>${gerente.telefono}</td>
                    <td class='table__td'>${gerente.correo}</td>
                    <td class='table__td'>${gerente.domicilio}</td>
                    <td class='table__controls'>
                    <div class='table__dropdown dropdown dropleft'>
                        <a class='table__dropdown-button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>...</a>
                        <div class='table__dropdown-menu dropdown-menu' aria-labelledby='data1'>
                            <a class='edit-employee_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.edit-employee'>Edit</a>
                            <a class='remove-employee_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.delete-element'>Delete</a>
                        </div>
                    </div>
                    </td>
                </tr>
                `
                row = $(row);
                row.find(".edit-employee_show").click(() => {
                    gerenteSeleccionado = gerente;
                    $("#username").val(gerente.username);
                    $("#password").val(gerente.password);
                    $("#nombre").val(gerente.nombre);
                    $("#apellido-p").val(gerente.apellidoP);
                    $("#apellido-m").val(gerente.apellidoM);
                    $("#telefono").val(gerente.telefono);
                    $("#correo").val(gerente.correo);
                    $("#estado").val(gerente.estado);
                    $("#ciudad").val(gerente.ciudad);
                    $("#cp").val(gerente.cp);
                    $("#domicilio").val(gerente.domicilio);

                });

                row.find(".remove-employee_show").click(() => {
                    gerenteSeleccionado = gerente;
                });

                tbody.append(row);
            })
        }
    });

    $.ajax({
        url: "api/Agencias",
        method: "GET",
        success: (res) => {
            agencias = res.data;
            $.each(agencias, (index, agencia) => {
                cb_agencias_add.append($("<option>").val(agencia._id).html(agencia.nombre));
                cb_agencias_edit.append($("<option>").val(agencia._id).html(agencia.nombre));
            })
        }
    });

    $("#btn-remove-manager").click(() => {
        $.ajax({
            url: `api/Agentes/${gerenteSeleccionado._id}`,
            method: "DELETE",
            success: actualizarTabla
        });
    });

    $("#edit-manager-submit").click(() => {
        let data = { };
        $("#edit-employee-form").find('[name]').each(function(index, value){
            var name  = $(this).attr('name'),
                value = $(this).val();
            data[name] = value;
        });
        $.ajax({
            url: `/api/Agentes/${gerenteSeleccionado._id}`,
            method: "PUT",
            data: data,
            success: actualizarTabla
        });
    });

    $("#add-manager-submit").click(() => {
        let data = { };
        $("#add-employee-form").find('[name]').each(function(index, value){
            var name  = $(this).attr('name'),
                value = $(this).val();
            data[name] = value;
        });
        data.rol = "5b24b3d8f0da9671e1c9f665"
        $.ajax({
            url: `/api/Agentes/`,
            method: "POST",
            data: data,
            success: actualizarTabla
        });
    });
}