import {
  getGenresRand,
  getInfoFilme,
  getRankGenero,
} from "../controllers/filme.controller";

const { Router } = require("express");
const router = Router();

export default router;

router.get("/filme/rank/:id", getRankGenero);
router.get("/filme/:id", getInfoFilme);
router.get("/filme/rand", getGenresRand);

module.exports = router;
