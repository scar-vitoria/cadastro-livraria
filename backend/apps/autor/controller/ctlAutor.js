const mdlAutor = require("../model/mdlAutor");

const getAllAutor = (req, res) =>
  (async () => {
    let registro = await mdlAutor.getAllAutor();
    res.json({ status: "ok", registro: registro });
  })();

const getAutorByID = (req, res) =>
  (async () => {
    const autorID = parseInt(req.body.autorid);
    let registro = await mdlAutor.getAutorByID(autorID);

    res.json({ status: "ok", registro: registro });
  })();

const insertAutor = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlAutor.insertAutor(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const updateAutor = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlAutor.updateAutor(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const deleteAutor = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlAutor.deleteAutor(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();
module.exports = {
  getAllAutor,
  getAutorByID,
  insertAutor,
  updateAutor,
  deleteAutor
};