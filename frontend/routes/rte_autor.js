var express = require('express');
var autorApp = require("../app/autor/controller/ctlAutor")

////var login = require("../controllers/login/login")
var router = express.Router();
//const passport = require('passport');

function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
/* GET métodos */
router.get('/', authenticationMiddleware, autorApp.getAllAutor);
router.get('/openAutorInsert', authenticationMiddleware, autorApp.openAutorInsert);
router.get('/openAutorUpdate/:id', authenticationMiddleware, autorApp.openAutorUpdate);

/* POST métodos */
router.post('/insertAutor', authenticationMiddleware, autorApp.insertAutor);
router.post('/getDados', authenticationMiddleware, autorApp.getDados);
router.post('/updateAutor', authenticationMiddleware, autorApp.updateAutor);
router.post('/deleteAutor', authenticationMiddleware, autorApp.deleteAutor);

module.exports = router;