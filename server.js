var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8200));

app.use(express.static(__dirname + '/app'));

app.listen(app.get('port'), function () {
    console.log('app is running on port', app.get('port'));
});
