import express from "express";
import RecipesController from "./recipes.controller.v2.js"; //changed
//when ppl go to our url, different request will route to different part of our app

const router = express.Router();

//obs: ':' in route becomes a variable
router.route("/all").get(RecipesController.apiGetAllRecipes);
router.route("/tag/:tag").get(RecipesController.apiGetRecipesByTag);
router.route("/new").post(RecipesController.apiPostRecipe);
router
    .route("/:id")
    .get(RecipesController.apiGetRecipe)
    .put(RecipesController.apiUpdateRecipe)
    .delete(RecipesController.apiDeleteRecipe);

export default router;
