let express = require("express");
let formateador = require("../../controllers/modules/responseFormatter");
let VentasController = require("../../controllers/api/VentasController");

var router = express.Router();
var controller = new VentasController();

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

router.get("/:id", (req, res) => {
    controller.id_get(req.params.id)
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

router.get("/Agente/:id", (req, res) => {
    controller.agente_get(req.params.id)
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

router.get("/Cliente/:id", (req, res) => {
    controller.cliente_get(req.params.id)
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
    
router.post("/", (req, res) => {
    venta = { };
    venta.cliente = req.body.cliente;
    venta.agente = req.body.agente;
    venta.vehiculo = req.body.vehiculo;
    controller.index_post(venta)
    .then(
        (ventaCreada) => {
            res.status(200).json(formateador(true, ventaCreada));
        },
        (err) => {
            console.log(err);
            res.status(400).json(formateador(false, err));
        })
    .catch((err) => {
        res.status(500).json(formateador(false, err));
    })
});

router.put("/:id/Credito", (req, res) => {
    controller.credito_put(req.params.id, req.body)
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

router.put("/:id/Contado", (req, res) => {
    controller.contado_put(req.params.id)
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

router.put("/:id/Precio", (req, res) => {
    controller.precio_put(req.params.id, req.body.precio)
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

router.put("/:id/Vender", (req, res) => {
    controller.vender_put(req.params.id)
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

router.delete("/:id/Cancelar", (req, res) => {
    controller.cancelar_delete(req.params.id)
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

router.delete("/:id/", (req, res) => {
    controller.index_delete(req.params.id)
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