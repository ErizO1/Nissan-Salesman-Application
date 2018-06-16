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
let sesionesRouter = require("./routes/SesionesRouter");
let clientesRouter = require("./routes/ClientesRouter");
let agenciasRouter = require("./routes/AgenciasRouter");
let agentesRouter = require("./routes/AgentesRouter");
let modelosRouter = require("./routes/ModelosRouter");

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
passport.use(new LocalStrategy(Agentes.authenticate()));
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
app.use("/api/Clientes",sessionManager.needLoginAPI, clientesRouter);
app.use("/api/Agencias", agenciasRouter);
app.use("/api/Agentes", agentesRouter);
app.use("/api/Modelo", modelosRouter);

module.exports = app;