let userData = JSON.parse(localStorage.userData);
let bt_logout;

$(() => {
    bt_logout = $("#logout");

    bt_logout.click(function(e) {
        e.preventDefault();
        localStorage.removeItem("userData");

        $.ajax({
            url: "/api/Sesion/logout",
            method: "POST",
            success: function(data){
                document.location.href = "/";
            },
            fail: function(err){
                console.log(err);
            }
        })
    });
});