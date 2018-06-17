let express = require("express");
let formateador = require("../controllers/modules/responseFormatter");
let ModelosController = require("../controllers/api/ModelosController");
let VariantesController = require("../controllers/api/VariantesController");

var router = express.Router();
var modelosController = new ModelosController();
var variantesController = new VariantesController();

router.get("/", (req, res) => {
    modelosController.index_get()
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
    modelosController.id_get(req.params.id)
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
    modelosController.index_post(req.body)
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
    
router.post("/buscar", (req, res) => {
    modelosController.buscar_post(req.body)
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
    
router.put("/:id", (req, res) => {
    modelosController.index_put(req.params.id, req.body)
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

router.delete("/:id", (req, res) => {
    modelosController.index_delete(req.params.id, req.body)
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

// Variantes

router.get("/Variantes/:id", (req, res) => {
    variantesController.variantes_get(req.params.id)
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

// Crea una variante en un modelo
router.post("/:id/Variantes", (req, res) => {
    modelosController.variantes_post(req.params.id, req.body)
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