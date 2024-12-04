import {
  getVerificaFilme,
  getAvalFilme,
  getVerificaPessoa,
  getRankGenero,
  getVotosFilme,
  getInfoFilme,
  getGenresRand,
} from "../controllers/filme.controller";

const { Router } = require("express");
const router = Router();

export default router;
router.get("/filme/verificacao/:genero/:letra", getVerificaFilme);
router.get("/filme/avaliacao/:id", getAvalFilme);
router.get("/pessoa/verificacao/:funcao/:letra", getVerificaPessoa);
router.get("/filme/rank/:genero", getRankGenero);
router.get("/filme/votos/:id", getVotosFilme);
router.get("/filme/:genero", getInfoFilme);
router.get("/genero/rand", getGenresRand);

module.exports = router;
