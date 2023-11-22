const axios = require("axios");

const getAllAutor = (req, res) =>
  (async () => {
    userName = req.session.userName;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/getAllAutor", {});
      //console.log("[ctlLogin.js] Valor resp:", resp.data);
      res.render("autor/view_manutencao", {
        title: "Manutenção de autor",
        data: resp.data,
        userName: userName,
      });
    } catch (erro) {
      console.log("[ctlAutor.js|getAllAutor] Try Catch:Erro de requisição");
    }
  })();

const openAutorInsert = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "c";
        res.render("autor/view_cadAutor", {
          title: "Cadastro de autor",
          oper: oper,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlLivros.js|insertLivros] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

function validateForm(regFormPar) {
  if (regFormPar.autorid == "") {
    regFormPar.autorid = 0;
  } else {
    regFormPar.autorid = parseInt(regFormPar.autorid);
  }

  regFormPar.ativo = regFormPar.ativo === "true"; //converte para true ou false um check componet
  regFormPar.deleted = regFormPar.deleted === "true"; //converte para true ou false um check componet

  return regFormPar;
}

const openAutorUpdate = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "u";
        const id = req.params.id;
        parseInt(id);
        res.render("autor/view_cadAutor", {
          title: "Cadastro de Autor",
          oper: oper,
          idBusca: id,
          userName: userName,
        });
      }
      
    } catch (erro) {  
      console.log(
        "[ctlAutor.js|insertAutor] Try Catch: Erro não identificado",
        erro
      );
    }
  })();


const getDados = (req, res) =>
  (async () => {
    const idBusca = req.body.idBusca;    
    parseInt(idBusca);
    console.log("[ctlAutor.js|getDados] valor id :", idBusca);
    try {
      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/getAutorByID",
        {
          autorid: idBusca,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (resp.data.status == "ok") {
        res.json({ status: "ok", registro:resp.data.registro[0] });
      }
    } catch (error) { 
      console.log(
        "[ctlAutor.js|getDados] Try Catch: Erro não identificado",
        erro
      );
    }
    
  })();

const insertAutor = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        regPost.autorid = 0;
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/insertAutor",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Autor inserido com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao inserir Autor!" });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlAutor.js|insertAutor] Try Catch: Erro não identificado",
        erro
      );
    }
  })(); 
  
const updateAutor = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/updateAutor",
          regPost,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok", mensagem: "Autor atualizado com sucesso!" });
        } else {
          res.json({ status: "erro", mensagem: "Erro ao atualizar Autor!" });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlAutor.js|updateAutor] Try Catch: Erro não identificado.",
        erro
      );
    }
  })();

function validateForm(regFormPar) {

  if (regFormPar.datanascimento == "") {
    regFormPar.datanascimento = null;
  }

  return regFormPar;
}

const deleteAutor = (req, res) =>
(async () => {
  token = req.session.token;
  try {
    if (req.method == "POST") {
      const regPost = validateForm(req.body);
      regPost.autorid = parseInt(regPost.autorid);
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/deleteAutor",
        {
          autorid: regPost.autorid,
        },        
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok", mensagem: "Autor removido com sucesso!" });
      } else {
        res.json({ status: "erro", mensagem: "Erro ao remover Autor!" });
      }
    }
  } catch (erro) {
    console.log(
      "[ctlAutor.js|deleteAutor] Try Catch: Erro não identificado", erro);
  }
})();

module.exports = {
  getAllAutor,
  openAutorInsert,
  openAutorUpdate,
  getDados,
  insertAutor,
  updateAutor,
  deleteAutor,
};