// Import mongoose
const mongoose = require('mongoose');

// Set up the MongoDB URI for connection
const MONGO_URI = 'mongodb://localhost:27017/week8';  // Database named 'week8'

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

// Handle any connection errors
db.on('error', function (err) {
  console.log("Error occurred during connection: " + err);
});

// Confirm successful connection
db.once('connected', function () {
  console.log(`Connected to ${MONGO_URI}`);
});

// Define a schema for the "Person" collection
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Name is a required field
  age: Number,                             // Age is a number
  gender: String,                          // Gender is a string
  salary: Number                           // Salary is a number
});

// Create a model based on the schema
const Person = mongoose.model('Person', personSchema, 'personCollection');

// Add a single document to the "Person" collection
const doc1 = new Person({ name: 'Alex', age: 39, gender: 'Male', salary: 4567 });

doc1.save()  // Save the document to the database
  .then((doc) => {
    console.log("New document added:", doc);  // Log the saved document
  })
  .catch((err) => {
    console.error("Error:", err);  // Handle errors during save
  });

// Add multiple documents to the collection
const manyPersons = [
  { name: 'Simon', age: 42, gender: 'Male', salary: 3456 },
  { name: 'Neesha', age: 23, gender: 'Female', salary: 1000 },
  { name: 'Mary', age: 27, gender: 'Female', salary: 5402 },
  { name: 'Mike', age: 40, gender: 'Male', salary: 4519 }
];

// Insert multiple documents into the collection
Person.insertMany(manyPersons)
  .then(() => {
    console.log("Multiple documents inserted successfully.");
  })
  .catch((error) => {
    console.log("Error inserting documents:", error);
  });

// Fetch data with no filtering and limit the results to 5
Person.find().limit(5)
  .then(docs => {
    console.log("Fetched documents (limit 5):", docs);
  })
  .catch(err => {
    console.error("Error fetching documents:", err);
  });

// Fetch data with filtering criteria (gender = Female and age > 25)
Person.find({ gender: 'Female', age: { $gt: 25 } })
  .then(docs => {
    console.log("Filtered documents (gender = Female, age > 25):", docs);
  })
  .catch(err => {
    console.error("Error fetching filtered documents:", err);
  });
// Count total number of documents in the collection
Person.countDocuments()
  .then(count => {
    console.log("Total number of documents in the collection:", count);
  })
  .catch(err => {
    console.error("Error counting documents:", err);
  });

// Delete documents where age is greater than or equal to 25
Person.deleteMany({ age: { $gte: 25 } })
  .then(result => {
    console.log("Documents deleted:", result);
  })
  .catch(err => {
    console.error("Error deleting documents:", err);
  });

// Update all documents where gender is Female and set salary to 5555
Person.updateMany({ gender: 'Female' }, { $set: { salary: 5555 } })
  .then(result => {
    console.log("Documents updated:", result);
  })
  .catch(err => {
    console.error("Error updating documents:", err);
  });*/
