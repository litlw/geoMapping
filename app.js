const express     = require("express");
const router      = express.Router();
const path        = require("path");
const Cors        = require("cors");
const Mongo       = require("mongoose");
const bodyparser  = require("body-parser");

const config      = require("./config/database.config");
const app         = express();
const port        = 3000;
const maps        = require("./models/map.model.js");
const data        = require("./models/data.model.js");

app.listen(port, ()=>{
  console.log("Datavis Server started on port "+ port);
})
app.use( cors() );
app.use( bodyparser() );

app.get('/', (req, res)=>{

} );

app.use('/maps', maps);
app.use('/data', data);

app.use(Express.static(path.join(__dirname, 'public')));
