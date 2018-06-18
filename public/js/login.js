let tb_user;
let tb_pass;
let bt_login;

$(() => {
    tb_user = $("#user");
    tb_pass = $("#pass");
    bt_login = $("#login");
    
    bt_login.click(function(e) {
        e.preventDefault();
        if (tb_user.val() != "" && tb_pass.val() != "") {
            $.ajax({
                url: "/api/Sesion/login",
                method: "POST",
                data: {
                    username: tb_user.val(),
                    password: tb_pass.val()
                },
                success: (result) => {
                    console.log(result);
                    localStorage.userData = JSON.stringify({
                        user: result.data
                    });
                    document.location.href = "/inicio";
                },
                error: (err) => {
                    document.location.href = "/inicio";
                    console.log(err);
                    alert("");
                }
            })
        }
    });
});