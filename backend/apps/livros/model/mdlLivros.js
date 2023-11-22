const db = require("../../../database/databaseconfig");

const getAllLivros = async () => {
  return (
    await db.query(
      "SELECT *, (SELECT nome from AUTOR where autorid = livros.autorid)" +
        "FROM livros where deleted = false ORDER BY titulo ASC"
    )
  ).rows;
};

const getLivroByID = async (livroIDPar) => {
  return (
    await db.query(
      "SELECT *, (SELECT nome from AUTOR where autorid = livros.autorid)" +
        "FROM livros WHERE livroid = $1 and deleted = false ORDER BY titulo ASC",
      [livroIDPar]
    )
  ).rows;
};

const insertLivros = async (livroREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO livros " + "values(default, $1, $2, $3, $4, $5, $6)",
        [
          livroREGPar.codigo,
          livroREGPar.titulo,
          livroREGPar.paginas,
          livroREGPar.ano,
          livroREGPar.autorid,
          livroREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlLivros|insertLivros] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const updateLivros = async (livroREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE livros SET " +
          "codigo = $2, " +
          "titulo = $3, " +
          "paginas = $4, " +
          "ano = $5, " +
          "autorid = $6, " +
          "deleted = $7 " +
          "WHERE livroid = $1",
        [
          livroREGPar.livroid,
          livroREGPar.codigo,
          livroREGPar.titulo,
          livroREGPar.paginas,
          livroREGPar.ano,
          livroREGPar.autorid,
          livroREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlLivros|insertLivros] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const deleteLivros = async (livroREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE livros SET " + "deleted = true " + "WHERE livroid = $1",
      [livroREGPar.livroid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlLivros|insertLivros] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  getAllLivros,
  getLivroByID,
  insertLivros,
  updateLivros,
  deleteLivros
};