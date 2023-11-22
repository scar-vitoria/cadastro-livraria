const express = require("express");
const routerApp = express.Router();

const appLivros = require("../apps/livros/controller/ctlLivros");
const appAutor = require("../apps/autor/controller/ctlAutor");
const appLogin = require("../apps/login/controller/ctlLogin");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//Rotas de Livros
routerApp.get("/getAllLivros", appLivros.getAllLivros);
routerApp.post("/getLivroByID", appLogin.AutenticaJWT, appLivros.getLivroByID);
routerApp.post("/insertLivros", appLogin.AutenticaJWT, appLivros.insertLivros);
routerApp.post("/updateLivros", appLivros.updateLivros);
routerApp.post("/deleteLivros", appLivros.deleteLivros);

//Rotas de Autor
routerApp.get("/getAllAutor", appAutor.getAllAutor);
routerApp.post("/getAutorByID", appAutor.getAutorByID);
routerApp.post("/insertAutor", appAutor.insertAutor);
routerApp.post("/updateAutor", appAutor.updateAutor);
routerApp.post("/deleteAutor", appAutor.deleteAutor);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;