import app from "./server.js"
import mongodb from "mongodb"
import RecipesDAO from "./dao/recipesDAOv2.js" //changed

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@sourdoughandstuff.hr0bb.mongodb.net/?retryWrites=true&w=majority&appName=SourdoughAndStuff`

const port = 10000
const options = {
    maxPoolSize: 50,
    wtimeoutMS: 2500, //how long it can be trying to connect before time out
    useNewUrlParser: true 
  }

MongoClient.connect(
  uri,
  options)
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  }) //if no error, then
  .then(async client => { //connecting to db with MongoClient.connect reurns a client.
    await RecipesDAO.injectDB(client)
    //start server with app.listen
    app.listen(port, () => { 
      console.log(`listening on port ${port}`)
    })
  })

//reload

const url = 'https://sourdoughandstuff-backend.onrender.com/api/v1/recipes/'; 
const interval = 60000; // Interval in milliseconds (30 seconds)

function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}


setInterval(reloadWebsite, interval);
