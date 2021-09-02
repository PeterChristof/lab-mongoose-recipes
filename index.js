const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
async function connectToDB(){ 

await mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  
  updateDatabase();

};

async function updateDatabase() {
    try{
  console.log("Connected to the database");
  await Recipe.deleteMany()
  
  const firstRecipe = await Recipe.create(
  {
    title: "Scrambled eggs",
    level: "Easy Peasy",
    ingredients: ["eggs", "oil", "salt"],
    cuisine: "worldwide",
    disType:"breakfast",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 5,
    creator: "unkown",
    

  });

  console.log(firstRecipe.title);
await Recipe.insertMany(data, function(error, docs){});
data.forEach(element => {
  console.log(element.title);
})

await Recipe.findOneAndUpdate (
  { title: "Rigatoni alla Genovese",
    duration: 100 }
);
console.log("success");

await Recipe.findOneAndDelete (
  {
    title: "Carrot Cake"
  }
)

} catch(e) {    
  console.log('Error connecting to the database', e);
  } 
  finally {
    mongoose.connection.close();
  }
};

connectToDB();