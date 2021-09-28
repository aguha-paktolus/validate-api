const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mainroutes = require("./routes");


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//routes defined in other file
app.use("/", mainroutes);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
