let mongoose = require("mongoose");
let Modelo = require("./models/ModelosModel");
let VariantesModel = require("./models/VariantesModel");
let faker = require("faker");
let request = require("request");

let carModels = [
    {
        nombre: "Altima",
        categoria: "Autos",
        images: {
            banner: "https://www.nissan.com.mx/altima/img/galeries/5/21-04-2017_09_31_57-28-03-2016_04_51_19-6.jpg.png",
            urls: [
                "https://www.nissan.com.mx/altima/img/galeries/5/28-03-2016_04_51_06-5.jpg",
                "https://www.nissan.com.mx/altima/img/galeries/6/21-04-2017_09_37_27-28-03-2016_04_52_08-2.png",
                "https://www.nissan.com.mx/altima/img/galeries/6/21-04-2017_09_36_25-11-04-2016_12_43_42-2.jpg.png",
                "https://www.nissan.com.mx/altima/img/galeries/6/21-04-2017_09_38_16-28-03-2016_04_52_21-3.png",
                "https://www.nissan.com.mx/altima/img/galeries/5/21-04-2017_09_32_30-28-03-2016_04_50_21-2.jpg.png",
                "https://www.nissan.com.mx/altima/img/galeries/5/28-03-2016_04_50_04-1.jpg",
                "https://www.nissan.com.mx/altima/img/galeries/5/21-04-2017_09_33_10-28-03-2016_04_51_32-7.jpg.png"
            ],
        }
    },
    {
        nombre: "Versa",
        categoria: "Autos",
        images: {
            banner: "https://www.nissan.com.mx/versa/img/galeries/19/03-08-2017_15_11_23-01_galeria_exterior1.jpg",
            urls: [
                "https://www.nissan.com.mx/versa/img/galeries/20/03-08-2017_15_16_52-06_galeria_interior1.jpg",
                "https://www.nissan.com.mx/versa/img/galeries/19/03-08-2017_15_13_29-02_galeria_exterior2.jpg",
                "https://www.nissan.com.mx/versa/img/galeries/19/03-08-2017_15_14_21-03_galeria_exterior3.jpg",
                "https://www.nissan.com.mx/versa/img/galeries/19/03-08-2017_15_14_55-04_galeria_exterior4.jpg",
                "https://www.nissan.com.mx/versa/img/galeries/19/03-08-2017_15_15_16-05_galeria_exterior5.jpg",
                "https://www.nissan.com.mx/versa/img/galeries/20/03-08-2017_15_18_02-10_galeria_interior5.jpg"
            ],
        }
    },
    {
        nombre: "Tiida",
        categoria: "Autos",
        images: {
            banner: "https://www.nissan.com.mx/tiida/img/galeries/34/04-05-2017_12_28_09-img-galeria-exterior4.jpg",
            urls: [
                "https://www.nissan.com.mx/tiida/img/galeries/34/04-05-2017_12_28_20-img-galeria-exterior5.jpg",
                "https://www.nissan.com.mx/tiida/img/galeries/34/04-05-2017_12_27_26-img-galeria-exterior1.jpg",
                "https://www.nissan.com.mx/tiida/img/galeries/34/04-05-2017_12_27_42-img-galeria-exterior2.jpg",
                "https://www.nissan.com.mx/tiida/img/galeries/34/04-05-2017_12_28_00-img-galeria-exterior3.jpg",
                "https://www.nissan.com.mx/tiida/img/galeries/34/04-05-2017_12_28_00-img-galeria-exterior4.jpg",
                "https://www.nissan.com.mx/versa/img/galeries/20/03-08-2017_15_17_10-07_galeria_interior2.jpg"
            ],
        }
    },
    {
        nombre: "37OZ Nismo",
        categoria: "Autos",
        images: {
            banner: "https://www.nissan.com.mx/370z-nismo/img/galeries/52/06-07-2017_11_35_54-29_galeria_disenoexterior5.jpg",
            urls: [
                "https://www.nissan.com.mx/370z-nismo/img/galeries/52/06-07-2017_11_35_54-29_galeria_disenoexterior5.jpg",
                "https://www.nissan.com.mx/370z-nismo/img/galeries/52/06-07-2017_11_36_44-30_galeria_disenoexterior6.jpg",
                "https://www.nissan.com.mx/370z-nismo/img/galeries/52/05-07-2017_19_13_21-25_galeria_disenoexterior1.jpg",
                "https://www.nissan.com.mx/370z-nismo/img/galeries/52/05-07-2017_19_13_35-26_galeria_disenoexterior2.jpg",
                "https://www.nissan.com.mx/370z-nismo/img/galeries/52/05-07-2017_19_15_12-27_galeria_disenoexterior3.jpg",
                "https://www.nissan.com.mx/370z-nismo/img/galeries/52/05-07-2017_19_16_05-28_galeria_disenoexterior4.jpg"
            ],
        }
    },
    {
        nombre: "Note",
        categoria: "Autos",
        images: {
            banner: "https://www.nissan.com.mx/note/img/galeries/23/06-03-2017_05_44_50-img-galeria-exterior3.jpg",
            urls: [
                "https://www.nissan.com.mx/note/img/galeries/23/06-03-2017_05_44_50-img-galeria-exterior3.jpg",
                "https://www.nissan.com.mx/note/img/galeries/23/06-03-2017_05_45_12-img-galeria-exterior4.jpg",
                "https://www.nissan.com.mx/note/img/galeries/23/06-03-2017_05_45_35-img-galeria-exterior5.jpg",
                "https://www.nissan.com.mx/note/img/galeries/23/09-03-2017_05_39_39-img-galeria-exterior1.jpg",
                "https://www.nissan.com.mx/note/img/galeries/23/06-03-2017_05_44_24-img-galeria-exterior2.jpg",
                "https://www.nissan.com.mx/note/img/galeries/23/06-03-2017_05_45_35-img-galeria-exterior5.jpg"
            ],
        }
    },
    {
        nombre: "Maxima",
        categoria: "Autos",
        images: {
            banner: "https://www.nissan.com.mx/maxima/img/galeriaMosaico/Full/01.jpg",
            urls: [
                "https://www.nissan.com.mx/maxima/img/galeriaMosaico/Full/01.jpg",
                "https://www.nissan.com.mx/maxima/img/galeriaMosaico/Full/04.jpg",
                "https://www.nissan.com.mx/maxima/img/galeriaMosaico/Full/05.jpg",
                "https://www.nissan.com.mx/maxima/img/galeriaMosaico/Full/06.jpg",
                "https://www.nissan.com.mx/maxima/img/galeriaMosaico/Full/08.jpg",
                "https://www.nissan.com.mx/maxima/img/galeriaMosaico/Full/09.jpg"
            ],
        }
    },
    {
        nombre: "Sentra",
        categoria: "Autos",
        images: {
            banner: "https://www.nissan.com.mx/sentra/img/galeries/2/26-02-2016_06_40_19-5.jpg",
            urls: [
                "https://www.nissan.com.mx/sentra/img/galeries/2/26-02-2016_06_41_30-10.jpg",
                "https://www.nissan.com.mx/sentra/img/galeries/3/26-02-2016_06_43_14-2.jpg",
                "https://www.nissan.com.mx/sentra/img/galeries/2/26-02-2016_06_40_40-6.jpg",
                "https://www.nissan.com.mx/sentra/img/galeries/3/26-02-2016_06_43_14-2.jpg",
                "https://www.nissan.com.mx/sentra/img/galeries/3/26-02-2016_06_43_29-3.jpg",
                "https://www.nissan.com.mx/sentra/img/galeries/3/26-02-2016_06_43_41-4.jpg"
            ],
        }
    },
    {
        nombre: "GT-R",
        categoria: "Autos",
        images: {
            banner: "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_33_43-img-galeria-exterior-4.jpg",
            urls: [
                "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_33_43-img-galeria-exterior-4.jpg",
                "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_33_57-img-galeria-exterior-5.jpg",
                "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_34_30-img-galeria-exterior-7.jpg",
                "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_35_09-img-galeria-exterior-10.jpg",
                "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_35_28-img-galeria-exterior-11.jpg",
                "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_33_33-img-galeria-exterior-3.jpg"            
            ],
        }
    },
    {
        nombre: "March",
        categoria: "Autos",
        images: {
            banner: "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_33_43-img-galeria-exterior-4.jpg",
            urls: [
                "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_33_43-img-galeria-exterior-4.jpg",
                "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_33_57-img-galeria-exterior-5.jpg",
                "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_34_30-img-galeria-exterior-7.jpg",
                "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_35_09-img-galeria-exterior-10.jpg",
                "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_35_28-img-galeria-exterior-11.jpg",
                "https://www.nissan.com.mx/march/img/galeries/40/24-05-2017_10_33_33-img-galeria-exterior-3.jpg"
            ],
        }
    },
    {
        nombre: "Murano",
        categoria: "SUVS",
        images: {
            banner: "https://www.nissan.com.mx/murano/img/galeries/67/10-04-2018_19_08_41-e_01.jpg",
            urls: [
                "https://www.nissan.com.mx/murano/img/galeries/67/10-04-2018_19_28_14-e_06.jpg",
                "https://www.nissan.com.mx/murano/img/galeries/67/10-04-2018_19_11_19-e_03.jpg",
                "https://www.nissan.com.mx/murano/img/galeries/67/10-04-2018_19_13_06-e_04.jpg",
                "https://www.nissan.com.mx/murano/img/galeries/68/20-04-2018_20_03_50-i_02.jpg",
                "https://www.nissan.com.mx/murano/img/galeries/68/20-04-2018_20_04_08-i_03.jpg",
                "https://www.nissan.com.mx/murano/img/galeries/68/20-04-2018_20_04_41-i_05.jpg"
            ],
        }
    },
    {
        nombre: "X-Trail",
        categoria: "SUVS",
        images: {
            banner: "https://www.nissan.com.mx/kicks/img/galeries/9/26-04-2018_17_21_47-07-09-2016_12_20_31-5.jpg",
            urls: [
                "https://www.nissan.com.mx/kicks/img/galeries/7/02-09-2016_15_09_23-1.jpg",
                "https://www.nissan.com.mx/kicks/img/galeries/7/02-09-2016_15_10_48-4.jpg",
                "https://www.nissan.com.mx/kicks/img/galeries/7/26-04-2018_16_14_09-01.jpg",
                "https://www.nissan.com.mx/kicks/img/galeries/8/02-09-2016_15_17_38-2.jpg",
                "https://www.nissan.com.mx/kicks/img/galeries/9/07-09-2016_12_23_54-14.jpg",
                "https://www.nissan.com.mx/kicks/img/galeries/7/02-09-2016_15_11_07-5.jpg"
            ],
        }
    },
    {
        nombre: "Armada",
        categoria: "SUVS",
        images: {
            banner: "https://www.nissan.com.mx/armada/img/galeries/26/05-12-2016_13_35_32-galeria_interior0.jpg",
            urls: [
                "https://www.nissan.com.mx/armada/img/galeries/27/02-12-2016_10_39_23-galeria_interior5.jpg",
                "https://www.nissan.com.mx/armada/img/galeries/26/02-12-2016_10_35_35-galeria_exterior6.jpg",
                "https://www.nissan.com.mx/armada/img/galeries/26/02-12-2016_10_34_59-galeria_exterior4.jpg",
                "https://www.nissan.com.mx/armada/img/galeries/26/02-12-2016_10_34_22-galeria_exterior2.jpg",
                "https://www.nissan.com.mx/armada/img/galeries/27/02-12-2016_10_38_03-galeria_interior1.jpg",
                "https://www.nissan.com.mx/armada/img/galeries/27/02-12-2016_10_40_48-galeria_interior10.jpg"
            ],
        }
    },
    {
        nombre: "NP300",
        categoria: "PickUp",
        images: {
            banner: "https://www.nissan.com.mx/np300/img/galeries/46/29-06-2017_04_51_36-img-galeria-exterior2.jpg",
            urls: [
                "https://www.nissan.com.mx/np300/img/galeries/46/27-06-2017_06_27_43-img-galeria-exterior3.jpg",
                "https://www.nissan.com.mx/np300/img/galeries/46/29-06-2017_04_52_48-img-galeria-exterior4.jpg",
                "https://www.nissan.com.mx/np300/img/galeries/46/27-06-2017_06_28_11-img-galeria-exterior5.jpg",
                "https://www.nissan.com.mx/np300/img/galeries/46/28-06-2017_12_50_47-img-galeria-exterior1.jpg",
                "https://www.nissan.com.mx/np300/img/galeries/46/29-06-2017_04_51_36-img-galeria-exterior2.jpg",
                "https://www.nissan.com.mx/np300/img/galeries/46/27-06-2017_06_27_43-img-galeria-exterior3.jpg"
            ],
        }
    },
    {
        nombre: "NP300 Frontier",
        categoria: "PickUp",
        images: {
            banner: "https://www.nissan.com.mx/np300-frontier/img/galeries/55/11-07-2017_10_32_53-img-galeria-exterior2.jpg",
            urls: [
                "https://www.nissan.com.mx/np300-frontier/img/galeries/55/11-07-2017_10_30_09-img-galeria-exterior1.jpg",
                "https://www.nissan.com.mx/np300-frontier/img/galeries/55/11-07-2017_10_33_05-img-galeria-exterior3.jpg",
                "https://www.nissan.com.mx/np300-frontier/img/galeries/55/11-07-2017_10_33_43-img-galeria-exterior5.jpg",
                "https://www.nissan.com.mx/np300-frontier/img/galeries/57/11-07-2017_10_43_43-img-galeria-exterior5.jpg",
                "https://www.nissan.com.mx/np300-frontier/img/galeries/55/11-07-2017_10_32_53-img-galeria-exterior2.jpg",
                "https://www.nissan.com.mx/np300-frontier/img/galeries/55/11-07-2017_10_30_09-img-galeria-exterior1.jpg"
            ],
        }
    },
    {
        nombre: "NP350-URVAN",
        categoria: "Comercial",
        images: {
            banner: "https://www.nissan.com.mx/nv350-urvan/img/galeries/64/30-11-2017_18_53_31-06.png",
            urls: [
                "https://www.nissan.com.mx/nv350-urvan/img/galeries/64/30-11-2017_18_51_54-02.png",
                "https://www.nissan.com.mx/nv350-urvan/img/galeries/64/30-11-2017_18_52_31-03.png",
                "https://www.nissan.com.mx/nv350-urvan/img/galeries/64/30-11-2017_18_51_35-01.png",
                "https://www.nissan.com.mx/nv350-urvan/img/galeries/65/30-11-2017_18_55_12-02.png",
                "https://www.nissan.com.mx/nv350-urvan/img/galeries/65/30-11-2017_18_56_04-05.png",
                "https://www.nissan.com.mx/nv350-urvan/img/galeries/65/30-11-2017_18_56_22-06.png"
            ],
        }
    },
    {
        nombre: "NT400 Cabstar",
        categoria: "Comercial",
        images: {
            banner: "https://www.nissan.com.mx/nt400-cabstar/img/galeries/29/08-02-2017_15_51_53-galeria_exterior_2.jpg",
            urls: [
                "https://www.nissan.com.mx/nt400-cabstar/img/galeries/29/08-02-2017_15_51_53-galeria_exterior_2.jpg",
                "https://www.nissan.com.mx/nt400-cabstar/img/galeries/29/08-02-2017_15_52_08-galeria_exterior_3.jpg",
                "https://www.nissan.com.mx/nt400-cabstar/img/galeries/29/08-02-2017_15_52_43-galeria_exterior_4.jpg",
                "https://www.nissan.com.mx/nt400-cabstar/img/galeries/29/08-02-2017_15_53_07-galeria_exterior_5.jpg",
                "https://www.nissan.com.mx/nt400-cabstar/img/galeries/29/08-02-2017_15_53_30-galeria_exterior_6.jpg",
                "https://www.nissan.com.mx/nt400-cabstar/img/galeries/29/08-02-2017_15_51_09-galeria_exterior_1.jpg"
            ],
        }
    },
];

let models = [];

for(var i=0; i<15; i++){
    var newModel = {
        nombre: carModels[i].nombre,
        descripcion: "Descripcion chida",
        anio: 2018,
        categoria: carModels[i].categoria,
        colores : {
            interior: [
                {
                    nombre: faker.commerce.color(),
                    codigo: faker.internet.color()
                }
            ],
            exterior: [
                {
                    nombre: faker.commerce.color(),
                    codigo: faker.internet.color()
                }
            ]
        },
        dimensiones: {
            alto: faker.random.number(),
            ancho: faker.random.number(),
            largo: faker.random.number()
        },
        imagenes: {
            urls: carModels[i].images.urls,
            banner: carModels[i].images.banner
        },
        variantes: [           
        ]
    };

    models.push(newModel);

}

function seedDB(){

    Modelo.remove({}, (err) => {
        if(err){
            console.log(err);
        }else{
            models.forEach(function(model){
                Modelo.create(model, (err, createdModel) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(createdModel);

                        var id = createdModel._id; 
                        var url = "http://localhost:3000/api/Modelos/"+id+"/Variantes";

                        for(var i=0; i<3; i++){

                            var variante = {
                                nombre: faker.address.city(),
                                precio: faker.commerce.price(),
                                caracteristicas: {
                                    AireAcondicionado: faker.random.boolean(),
                                    Puertas: faker.random.number(),
                                    Quemacocos: faker.random.boolean(), 
                                    Convertible: faker.random.boolean(),
                                    Rendimiento: faker.random.number(),
                                    Potencia: faker.random.number(),
                                    Torque: faker.random.number(),
                                    Transmision: "Automática",
                                    Traccion: "4x4"
                                }
                            };

                            /*
                            request.post(
                                {
                                    url: url,
                                    body: JSON.stringify(variante)
                                }, 
                                function(err,httpResponse,body){
                                    if(err){
                                        console.log(err);
                                    }else{

                                        console.log("Variante agregada"); 
                                    }
                                }
                            );*/

                            request({
                                url: url,
                                method: "POST",
                                json: true,   // <--Very important!!!
                                body: variante
                            }, function (error, response, body){
                                console.log(response);
                            });
                        }
                    }
                });
            });
        }
    });
    
    /*request.get("http://localhost:3000/api/ComparadorExt", (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        
        console.log(body);
        var modelosRecibidos = JSON.stringify(body);
        console.log(modelosRecibidos);


        modelosRecibidos.forEach((modelo) => {

            let id = modelo._id;
            let url = "http://localhost:3000/api/Modelos/"+id+"/Variantes";


            for(var i=0; i<3; i++){

                var variante = {
                    nombre: faker.address.city(),
                    precio: faker.commerce.price(),
                    caracteristicas: {
                        AireAcondicionado: faker.random.boolean(),
                        Puertas: faker.random.number(),
                        Quemacocos: faker.random.boolean(), 
                        Convertible: faker.random.boolean(),
                        Rendimiento: faker.random.number(),
                        Potencia: faker.random.number(),
                        Torque: faker.random.number(),
                        Transmision: "Automática",
                        Traccion: "4x4"
                    }
                };
                
                request.post({
                    "headers": { "content-type": "application/x-www-form-urlencoded" },
                    "url": url,
                    "body": variante
                }, (error, response, body) => {
                    if(error) {
                        return console.dir(error);
                    }
                    console.dir(JSON.parse(body));
                });

                console.log("Hey");
                ///:id/Variante
            }
                       

        });

    });*/

}

module.exports = seedDB;