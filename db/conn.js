const mongoose = require("mongoose");
mongoose.set('strictQuery', true); //enforces strict mode for query execution, which means that an error will be thrown if you try to perform a query on a field that doesn't exist in the schema.


mongoose.connect(`${process.env.DATABASE}`, {  //dynamically set the database connection URL based on environment configuration.
    useNewUrlParser: true,  //tells Mongoose to use the new URL parser instead of the deprecated one.
    useUnifiedTopology: true,  // enables the use of the MongoDB driver's new unified topology engine.  
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));