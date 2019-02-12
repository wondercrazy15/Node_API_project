const Boom = require('boom')
module.exports = function(app, db) {

    app.get('/', (req,res) => {
        res.send('OK'); // Sends HTTP status code 200 back to browser
      });
      
    app.all('*',(req,res) => {
        res.json(Boom.notFound('Invalid Request')); // this will set the status to 404
    });
      
};