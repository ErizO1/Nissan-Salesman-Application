$(document).ready(function(){

    refreshManagers();

    $("#add-gerente").on('click', loadStates);
    $("#add-manager-submit").on('click', addEmployee);
    $("#btn-remove-manager").on('click', removeManager);

    /*
    $("#form-stock-state").on('change', fillSelectCities);
    $("#form-stock-city").on('change', fillSelectAgencies);*/

    function showManagers(managers){
        var result = "";

        var managers = managers.data;
        var rol = "Gerente";

        var filteredArray = managers.filter(function(itm){
            return rol.indexOf(itm.rol.nombre) > -1;
        });
          
        managers = filteredArray;
    
        $.each(managers, function(index, manager){
            result += "<tr class='table__row-td'>";
            result += "<td class='table__td'>" + manager.nombre + " " + manager.apellidoP + "</td>";
            result += "<td class='table__td'>" + manager.telefono + "</td>";
            result += "<td class='table__td'>" + manager.correo + "</td>";
            result += "<td class='table__td'>" + manager.domicilio + "</td>";
            result += "<td class='table__controls'>";
            result += "<div class='table__dropdown dropdown dropleft'>";
            result += "<a class='table__dropdown-button' id='data1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>...</a>";
            result += "<div class='table__dropdown-menu dropdown-menu' aria-labelledby='data1'>";
            result += "<a class='edit-employee_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.edit-employee' data-id='" + manager._id + "'>Edit</a>";
            result += "<a class='remove-employee_show table__dropdown-item dropdown-item' href='#' data-toggle='modal' data-target='.delete-element' data-id='" + manager._id + "'>Delete</a>";
            result += "</div>";
            result += "</div>";
            result += "</td>";
            result += "</tr>";
        });
    
        $("#table-managers").html(result);

        editButtons = $(".edit-employee_show");
        editButtons.on('click', updateEmployee);

        removeButtons = $(".remove-employee_show");
        removeButtons.on('click', function(){
            var id = $(this).attr("data-id");
            $("#btn-remove-manager").attr("data-id", id);
        });
    }
   
    function refreshManagers(){

        var URL = "/api/Agentes";
    
        $.ajax({
            url: URL,
            method: "GET",
            dataType: "json",
            success: showManagers
        });

    }

    function loadStates(){
        var filter = $("#filter-state-add"),
            url = "/api/Agencias";

        $.ajax({
            url: url,
            method: "GET",
            success: function(dataStates){
                var estados = dataStates.data.estado;
                console.log("estados");
            }
        });
    }

    function addEmployee(){
        
        var userForm = $("#add-employee-form"),
            url = "/api/Agentes",
            data = {};
        
        userForm.find('[name]').each(function(index, value){
            var name  = $(this).attr('name'),
                value = $(this).val();

            data[name] = value;
        });

        console.log(data);
        
        $.ajax({
            url: url,
            method: "POST",
            data: data,
            success: refreshManagers
        });
    }

    function updateEmployee(){
        var id = $(this).attr("data-id"),
            url = "/api/Agentes/" + id;
        
        var username  = $("#username"),
            password = $("#password"),
            nombre   = $("#nombre"),
            apellidoP = $("#apellido-p"),
            apellidoM = $("#apellido-m"),
            telefono = $("#telefono"),
            correo = $("#correo"),
            estado = $("#estado"),
            ciudad = $("#ciudad"),
            cp = $("#cp"),
            domicilio = $("#domicilio"),
            agencia = $("#agencia");

            $.ajax({
                url: url,
                method: "GET",
                dataType: "json",
                success: function(manager){

                    console.log(manager);

                    var manager = manager.data[0];

                    console.log(manager);

                    var agencias;

                    $.ajax({
                        url: "/api/Agencias",
                        method: "GET",
                        dataType: "json",
                        success: function(data){
                            //agencias.data=
                        }
                    });

                    username.val(manager.username);
                    password.val(manager.password);
                    nombre.val(manager.nombre);
                    apellidoP.val(manager.apellidoP);
                    apellidoM.val(manager.apellidoM);
                    telefono.val(manager.telefono);
                    correo.val(manager.correo);
                    estado.val(manager.estado);
                    ciudad.val(manager.ciudad);
                    cp.val(manager.cp);
                    domicilio.val(manager.domicilio);

                    $("#edit-manager-submit").on('click', function(){
                        
                        var userForm = $("#edit-employee-form"),
                            urlUpdate = "/api/Agentes/" + id + "?_method=PUT",
                            data = {};
                        
                        userForm.find('[name]').each(function(index, value){
                            var name  = $(this).attr('name'),
                                value = $(this).val();
                
                            data[name] = value;
                        });

                        console.log(data);
                        $.ajax({
                            url: urlUpdate,
                            method: "POST",
                            data: data,
                            success: refreshManagers
                        });
    
                    });
                }
            });
    }

    function removeManager(){
        var id = $("#btn-remove-manager").attr("data-id");
        var url = "/api/Agentes/" + id + "?_method=DELETE";

        $.ajax({
            url: url,
            method: "POST",
            success: refreshManagers
        });
    }
    
});