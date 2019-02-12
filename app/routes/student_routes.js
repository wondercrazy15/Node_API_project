var ObjectID = require('mongodb').ObjectID;
const MongoPaging = require('mongo-cursor-pagination');

module.exports = function(app, db) {

    /* Select Record Id WIse  API  */

    app.get('/student/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('student').findOne(details, (err, item) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(item);
        } 
        });
    });


    /* pagination  API  */

    app.get('/student', async (req, res, next) => {
        try {
          let result = await MongoPaging.findWithReq(req, db.collection('student'), {
           
            // paginatedField: 'created',
            fields: {
              _id: 1,
              s_name: 1,
              s_username:1,
              s_password:1,
              s_gender:1,
              s_birthDate:1,
              s_stander:1,
              s_address:1,
            },
            limit: Number( req.query.limit), // Also need to cap this to 25
            skip: Number( req.query.skip),
            next:   req.query.next,
            previous:  req.query.previous,
            
          });

          res.json(result);
        } 
        catch (err) {
          next(err);
        }
      });
    
    /* Delete  Records  API  */

    app.delete('/student/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('student').remove(details, (err, item) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send('Note ' + id + ' deleted!');
        } 
        });
    });
  
    /* Update  Records  API  */

    app.put('/student/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const student = {   s_name: req.body.s_name,
                            s_username: req.body.s_username,
                            s_password: req.body.s_password,
                            s_gender: req.body.s_gender, 
                            s_birthDate: req.body.s_birthDate, 
                            s_address: req.body.s_address, 
                            s_standerd: req.body.s_standerd 
                        };
        db.collection('student').update(details, student, (err, result) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(student);
        } 
        });
    });

    /* add  Records  API  */

    app.post('/student', (req, res) => {
        const student = { s_name: req.body.s_name,
                          s_username: req.body.s_username,
                          s_password: req.body.s_password,
                          s_gender: req.body.s_gender, 
                          s_birthDate: req.body.s_birthDate, 
                          s_address: req.body.s_address, 
                          s_standerd: req.body.s_standerd 
                         };
                       

        db.collection('student').insert(student, (err, result) => {
        if (err) { 
            res.send({ 'error': 'An error has occurred' }); 
        } else {
            res.send(result.ops[0]);
        }
        });
    });
};