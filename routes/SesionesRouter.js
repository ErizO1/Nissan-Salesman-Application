let express = require("express");
let formateador = require("../controllers/modules/responseFormatter");
let SesionesController = require("../controllers/api/SesionesController");
let SessionManager = require("../controllers/modules/sessionManager")

var router = express.Router();
var controller = new SesionesController();

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", SessionManager.needLogoutAPI, controller.login_post);
    
router.post("/logout", SessionManager.needLoginAPI, controller.logout_post);

module.exports = router;