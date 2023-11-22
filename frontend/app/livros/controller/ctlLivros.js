const axios = require("axios");
const moment = require("moment");

const getAllLivros = (req, res) =>
  (async () => {
    userName = req.session.userName;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/getAllLivros", {});
      //console.log("[ctlLogin.js] Valor resp:", resp.data);
      res.render("livros/view_manutencao", {
        title: "Manutenção de livros",
        data: resp.data,
        userName: userName,
      });
    } catch (erro) {
      console.log("[ctlLivros.js|getAllLivros] Try Catch:Erro de requisição");
    }
  })();

function validateForm(regFormPar) {

  if (regFormPar.datanascimento == "") {
    regFormPar.datanascimento = null;
  }

  return regFormPar;
}


const insertLivros = (req, res) =>
  (async () => {
    var oper = "";
    var registro = {};
    var autor = {};
    userName = req.session.userName;
    token = req.session.token;

    try {
      if (req.method == "GET") {
        oper = "c";
        autor = await axios.get(
          process.env.SERVIDOR_DW3 + "/getAllAutor",
          {}
        );
        //console.log("[crlAutor|insertAutor] valor de livro:", livro.data.registro);
        registro = {
          livroid: 0,
          codigo: "",
          titulo: "",
          paginas: "",
          ano: "",
          autorid: 0,
          deleted: false,
        };

        res.render("livros/view_cadLivros", {
          title: "Cadastro de livros",
          data: registro,
          aut: autor.data.registro,
          oper: oper,
          userName: userName,
        });
      } else {
        oper = "c";
        const livroREG = validateForm(req.body);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/insertLivros",
          {
            livroid: 0,
            codigo: livroREG.codigo,
            titulo: livroREG.titulo,
            paginas: livroREG.paginas,
            ano: livroREG.ano,
            autorid: livroREG.autorid,
            deleted: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        console.log("[ctlLivros|insertLivros] resp:", resp.data);
        if (resp.data.status == "ok") {
          registro = {
            livroid: 0,
            codigo: "",
            titulo: "",
            paginas: "",
            ano: "",
            autorid: 0,
            deleted: false,
          };
        } else {
          registro = livroREG;
        }
        autor = await axios.get(
          process.env.SERVIDOR_DW3 + "/getAllAutor",
          {}
        );
        oper = "c";
        res.render("livros/view_cadLivros", {
          title: "Cadastro de livros",
          data: registro,
          aut: autor.data.registro,
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

const viewLivros = (req, res) =>
  (async () => {
    var oper = "";
    var registro = {};
    var autor = {};
    userName = req.session.userName;
    token = req.session.token;

    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;

        parseInt(id);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/getLivroByID",
          {
            livroid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          registro = resp.data.registro[0];
          
          autor = await axios.get(
            process.env.SERVIDOR_DW3 + "/getAllAutor",
            {}
          );
          console.log("[ctlLivros|viewLivros] GET oper:", oper);

          res.render("livros/view_cadLivros", {
            title: "Cadastro de livros",
            data: registro,
            aut: autor.data.registro,
            oper: oper,
            userName: userName,
          });
        }
      } else {
        oper = "vu";
        console.log("[ctlLivros|viewLivros] POST oper:", oper);
        const livroREG = validateForm(req.body);
        console.log("[ctlLivros|viewLivros] POST id:", livroREG.id);
        const id = parseInt(livroREG.livroid);
        resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/updateLivros",
          {
            livroid: id,
            codigo: livroREG.codigo,
            titulo: livroREG.titulo,
            paginas: livroREG.paginas,
            ano: livroREG.ano,
            autorid: livroREG.autorid,
            deleted: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resp.data.status == "ok") {
          res.json({ status: "ok" });
        } else {
          res.json({ status: "erro" });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlLivros.js|viewLivros] Livros não pode ser alterado" });
      console.log(
        "[ctlLivros.js|viewLivros] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

const deleteLivros = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;

    try {
      oper = "v";
      const id = parseInt(req.body.livroid);
    
      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/deleteLivros",
        {
          livroid: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok" });
      } else {
        res.json({ status: "erro" });
      }
    } catch (erro) {
      console.log(
        "[ctlLivros.js|deleteLivros] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

module.exports = {
  getAllLivros,
  //cadLivros,
  // getLivroByID,
  viewLivros,
  insertLivros,
  // updateLivros,
  deleteLivros,
};