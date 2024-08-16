import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
//use this to connect to the database
let recipes

export default class RecipesDAO {
  static async injectDB(conn) {
    if (recipes) {
      return //if there is already a db conn do nothing
    }
    try {
      recipes = await conn.db("SourdoughAndStuff").collection("recipes")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addRecipe(recipeTitle, description, ingredients, instructions, tags, imgRelPath) {
    try {
      const recipeDoc = {
          recipeTitle: recipeTitle,
          description: description,
          ingredients: ingredients,
          instructions: instructions,
          tags: tags,
          imgRelPath:imgRelPath
      }
      console.log("adding")
      //insertOne is a mongodb command to insert into db
      return await recipes.insertOne(recipeDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async getRecipe(recipeId) {
    try {
      //ObjectId converts a string to an objectId
      return await recipes.findOne({ _id: ObjectId.createFromHexString(recipeId) })
    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

  static async updateRecipe(recipeId, recipeTitle, description, ingredients, instructions, tags, imgRelPath) {
    try {
      const updateResponse = await recipes.updateOne(
        { _id: ObjectId.createFromHexString(recipeId) },
        { $set: { recipeTitle: recipeTitle, description: description, ingredients: ingredients, instructions: instructions, tags: tags, imgRelPath: imgRelPath } }
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update recipe: ${e}`)
      return { error: e }
    }
  }

  static async deleteRecipe(recipeId) {

    try {
      const deleteResponse = await recipes.deleteOne({
        _id: ObjectId.createFromHexString(recipeId)
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete recipe: ${e}`)
      return { error: e }
    }
  }

  static async getRecipesByTag(tag) {
    try {
      const cursor = await recipes.find({ tags: { "$in" : [tag]} })
      //db.coll.find({"tags" : { $in : ['etc1']  } } );
      
      
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get recipes: ${e}`)
      return { error: e }
    }
  }

  static async getAllRecipes() {
    try {
      const cursor = await recipes.find({})
      //db.coll.find({"tags" : { $in : ['etc1']  } } );


      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get recipes: ${e}`)
      return { error: e }
    }
  }

}