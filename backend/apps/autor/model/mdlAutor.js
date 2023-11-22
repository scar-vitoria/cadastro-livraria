const db = require("../../../database/databaseconfig");

const getAllAutor = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM autor where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const getAutorByID = async (autorIDPar) => {
  return (
    await db.query(
      "SELECT * " +
        "FROM Autor WHERE autorid = $1 and deleted = false ORDER BY nome ASC",
      [autorIDPar]
    )
  ).rows;
};

const insertAutor = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO autor " + "values(default, $1, $2, $3, $4)",
        [
          registroPar.codigo,
          registroPar.nome,
          registroPar.descricao,
          registroPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAutor|insertAutor] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const updateAutor = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE autor SET " +
          "codigo = $2, " +
          "nome = $3, " +
          "descricao = $4, " +
          "deleted = $5 " +          
          "WHERE autorid = $1",
        [
          registroPar.autorid,
          registroPar.codigo,
          registroPar.nome,
          registroPar.descricao,
          registroPar.deleted,      
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAutor|updateAutor] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


const deleteAutor = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE autor SET " + "deleted = true " + "WHERE autorid = $1",
      [registroPar.autorid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlAutor|deleteAutor] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};


module.exports = {
  getAllAutor,
  getAutorByID,
  insertAutor,
  updateAutor,
  deleteAutor
};