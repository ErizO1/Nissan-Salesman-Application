let express = require("express");
let formateador = require("../../controllers/modules/responseFormatter");
let ComapradorExtController = require("../../controllers/api/ComparadorExtController");

var router = express.Router();
var controller = new ComapradorExtController();

router.get("/", (req, res) => {
    controller.index_get()
    .then(
        (clientes) => {
            res.status(200).json(formateador(true, clientes));
        },
        (err) => {
            res.status(400).json(formateador(false, err));
        })
    .catch((err) => {
        res.status(500).json(formateador(false, err));
    })
});

module.exports = router;