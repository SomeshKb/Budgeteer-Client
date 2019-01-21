//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/Bugeteer-Client'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/Bugeteer-Client/index.html'));
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });