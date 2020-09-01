var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/fyp";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  const dbo = db.db('fyp');
  dbo.collection("gates").find( { $text: { $search: ""}});
  db.close();
});