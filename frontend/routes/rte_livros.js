var express = require('express');
var livrosApp = require("../app/livros/controller/ctlLivros")

////var login = require("../controllers/login/login")
var router = express.Router();
//const passport = require('passport');

//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
/* GET métodos */
router.get('/', authenticationMiddleware, livrosApp.getAllLivros);
router.get('/insertLivros', authenticationMiddleware, livrosApp.insertLivros);
router.get('/viewLivros/:id/:oper', authenticationMiddleware, livrosApp.viewLivros);

/* POST métodos */
router.post('/insertLivros', authenticationMiddleware, livrosApp.insertLivros);
router.post('/deleteLivros', authenticationMiddleware, livrosApp.deleteLivros);
router.post('/viewLivros', authenticationMiddleware, livrosApp.viewLivros);

module.exports = router;