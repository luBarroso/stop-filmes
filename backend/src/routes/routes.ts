import { getVerificaFilme, getAvalFilme, getVerificaPessoa, getRankGenero, getVotosFilme, getInfoFilme } from "../controllers/filme.controller";

const { Router } = require("express");
const router = Router();

export default router;
router.get("/filme/verificacao/:genero/:letra", getVerificaFilme);
router.get("filme/avaliacao/:id", getAvalFilme);
router.get("pessoa/verificacao/:funcao/:letra", getVerificaPessoa);
router.get("/filme/rank/:id", getRankGenero);
router.get("filme/votos/:id", getVotosFilme);
router.get("/filme/:id", getInfoFilme);

module.exports = router;
