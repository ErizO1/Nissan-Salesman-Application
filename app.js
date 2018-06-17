let express               = require("express");
let app                   = express();
let cors                  = require("cors");
let expressSanitizer      = require("express-sanitizer");
let methodOverride        = require("method-override");
let bodyParser            = require("body-parser");
let passport              = require("passport");
let LocalStrategy         = require("passport-local");
let passportLocalMongoose = require("passport-local-mongoose");
let Agentes = require("./models/AgentesModel");
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./swagger.json');
let sessionManager = require("./controllers/modules/sessionManager");

//seedDB();

//Requiring route files
let sesionesRouter = require("./routes/api/SesionesRouter");
let clientesRouter = require("./routes/api/ClientesRouter");
let agenciasRouter = require("./routes/api/AgenciasRouter");
let agentesRouter = require("./routes/api/AgentesRouter");
let modelosRouter = require("./routes/api/ModelosRouter");
let comparadorExtRouter = require("./routes/api/ComapradorExtRouter");

//=======================App setup===============================

//Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//Passport configuration
app.use(require("express-session")({
    secret: "AMLO did nothing wrong",
    resave: false,
    saveUninitialized: false
}));

//Initializing passport
app.use(passport.initialize()); 
app.use(passport.session());

//Initializing Local Strategy Authentication
console.log(Agentes.createStrategy());
passport.use(Agentes.createStrategy());
passport.serializeUser(Agentes.serializeUser());
passport.deserializeUser(Agentes.deserializeUser());

//Setting current user for local's
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// Swagger
app.use('/api/Docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Routing instances
app.use("/api/Sesion", sesionesRouter);
app.use("/api/Clientes", sessionManager.needLoginAPI, clientesRouter);
app.use("/api/Agencias", sessionManager.needLoginAPI, agenciasRouter);
app.use("/api/Agentes", sessionManager.needLoginAPI, agentesRouter);
app.use("/api/Modelos", sessionManager.needLoginAPI, modelosRouter);
app.use("/api/ComparadorExt", comparadorExtRouter);
// app.use("/api/Modelos/Variantes", sessionManager.needLoginAPI, variantesRouter);
// app.use("/api/Clientes", clientesRouter);
// app.use("/api/Agencias", agenciasRouter);
// app.use("/api/Agentes", agentesRouter);
// app.use("/api/Modelo", modelosRouter);

module.exports = app;