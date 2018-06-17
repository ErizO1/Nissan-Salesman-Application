let express = require("express");
let formateador = require("../../controllers/modules/responseFormatter");
var router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(formateador(true, [
            "Aguascalientes",
            "Baja California",
            "Baja California Sur",
            "Campeche",
            "Ciudad de México",
            "Chiapas",
            "Chihuahua",
            "Coahuila",
            "Colima",
            "Durango",
            "Estado de México",
            "Guanajuato",
            "Guerrero",
            "Hidalgo",
            "Jalisco",
            "Michoacán",
            "Morelos",
            "Nayarit",
            "Nuevo León",
            "Oaxaca",
            "Puebla",
            "Querétaro",
            "Quintana Roo",
            "San Luis Potosí",
            "Sinaloa",
            "Sonora",
            "Tabasco",
            "Tamaulipas",
            "Tlaxcala",
            "Veracruz",
            "Yucatán",
            "Zacatecas"
        ]));
});

module.exports = router;