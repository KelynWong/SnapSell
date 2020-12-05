const app = require("./controller/app.js");

const PORT = 7777;
app.listen(PORT, function(){
    console.log('Web App Hosted at http://localhost:%s',PORT)
})