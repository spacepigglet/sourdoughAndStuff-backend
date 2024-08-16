import RecipesDAO from "../dao/recipesDAO.js"
//controller gets information from the route and sends it to the DAO which will in turn access the DB
export default class RecipesController {
  static async apiPostRecipe(req, res, next) {
    try {
      //the body of the request (submitted with the http request) will be json

      const recipeTitle = req.body.recipeTitle
      const description = req.body.description
      const ingredients = req.body.ingredients
      const instructions = req.body.instructions
      const tags = req.body.tags
      const imgRelPath = req.body.imgRelPath
      
      console.log('recipeTitle', recipeTitle)
      
      const reviewResponse = await RecipesDAO.addRecipe(
        recipeTitle,
        description,
        ingredients,
        instructions,
        tags,
        imgRelPath
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetRecipe(req, res, next) {
    try {
      //req.params: ":id" in routes for example
      let id = req.params.id || {}
      let recipe = await RecipesDAO.getRecipe(id)
      if (!recipe) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(recipe)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiUpdateRecipe(req, res, next) {
    try {
      
      const recipeId = req.params.id
      const recipeTitle = req.body.recipeTitle
      const description = req.body.description
      const ingredients = req.body.ingredients
      const instructions = req.body.instructions
      const tags = req.body.tags
      const imgRelPath = req.body.imgRelPath

      //response from mongodb from the DAO
      const reviewResponse = await RecipesDAO.updateRecipe(
        recipeId,
        recipeTitle,
        description,
        ingredients,
        instructions,
        tags,
        imgRelPath
      )

      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (reviewResponse.modifiedCount === 0) { //0 if nothing was changed
        throw new Error(
          "unable to update recipe",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteRecipe(req, res, next) {
    try {
      const recipeId = req.params.id
      const reviewResponse = await RecipesDAO.deleteRecipe(recipeId)
      res.json(reviewResponse)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetRecipesByTag(req, res, next) {
    try {
      let tag = req.params.tag || {}
      let recipes = await RecipesDAO.getRecipesByTag(tag)
      if (!recipes) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(recipes)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
  static async apiGetAllRecipes(req, res, next) {
    try {
      
      let recipes = await RecipesDAO.getAllRecipes()
      if (!recipes) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(recipes)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}