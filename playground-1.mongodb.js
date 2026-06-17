/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('entertainment');

//db.getCollection('movies').deleteMany({});

// Insert a few documents into the sales collection.
/*db.getCollection('movies').insertMany([
    {title: "Inception", year: 2010},
    {title: "The Matrix", year: 1999},
    { title: "Titanic", year: 1997},
    {title: "T2", year: 1991}
]);*/

/*db.movies.updateOne(
   { title: "The Matrix" },
   {
     $set: { year: 2000 }
   }
)*/


/*const cursor = db.getCollection('movies').find();
//const movies = db.getCollection('movies').find({}).toArray()

for( const movie of cursor ) {
    console.log(movie);
}

const directorCursor = db.getCollection('directors').find();
//const movies = db.getCollection('movies').find({}).toArray()

for( const director of directorCursor ) {
    console.log(director);
}*/


const movies = db.getCollection('movies').aggregate(
  [{
    $match: {
      genre: "sci-fi"
    }
  },
  {
    $lookup: {
      from: "directors",
      localField: "directorId",
      foreignField: "_id",
      as: "directorInfo"
      }
  },
  {
    $unwind: 
    {
      path: "$directorInfo",
      preserveNullAndEmptyArrays: true
    }
  }
]
).toArray()

console.log(movies);


//console.log(movies)

// Run a find command to view items sold on April 4th, 2014.
/*const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);
*/