const mongoose = require("mongoose");
const uri =
  "mongodb+srv://manojmohan9777:4B6w384366UcN8Tn@manojdemo.uuvsnog.mongodb.net/?retryWrites=true&w=majority";
function connect() {
  const options = { useNewUrlParser: true };
  mongoose.connect(uri, options).then(
    () => {
      console.log("Database connection established!");
    },
    (err) => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
}
module.exports = connect;
