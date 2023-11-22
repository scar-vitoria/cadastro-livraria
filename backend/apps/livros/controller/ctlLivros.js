const mdlLivros = require("../model/mdlLivros");

const getAllLivros = (req, res) =>
  (async () => {
    let registro = await mdlLivros.getAllLivros();
    res.json({ status: "ok", "registro": registro });
  })();

const getLivroByID = (req, res) =>
  (async () => {
    const livroID = parseInt(req.body.livroid);
    let registro = await mdlLivros.getLivroByID(livroID);

    res.json({ status: "ok", "registro": registro });
  })();

const insertLivros = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const livroREG = request.body;    
    let { msg, linhasAfetadas } = await mdlLivros.insertLivros(livroREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateLivros = (request, res) =>
  (async () => {
    const livroREG = request.body;
    let  { msg, linhasAfetadas } = await mdlLivros.updateLivros(livroREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

  const deleteLivros = (request, res) =>
  (async () => {
    const livroREG = request.body;
    let { msg, linhasAfetadas } = await mdlLivros.deleteLivros(livroREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllLivros,
  getLivroByID,
  insertLivros,
  updateLivros,
  deleteLivros
};