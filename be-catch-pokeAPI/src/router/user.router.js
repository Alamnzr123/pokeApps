import express from "express";
import userController from "../controller/user.controller.js";
const router = express.Router();

router.get("/user", userController.listUser);
router.get("/userdetail/:name", userController.listUserbyId);
router.post("/catch-pokemon", userController.catchPokemon);
router.get("/mypokemons", userController.listMyPokemons);
router.get("/check-probability", userController.checkProbability);
router.get("/check-number", userController.checkNumber);
router.delete("/release-pokemon/:id", userController.releasePokemon);
router.patch("/rename-pokemon/:id", userController.renamePokemon);

export default router;