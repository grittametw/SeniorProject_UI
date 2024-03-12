var express = require( 'express' )
var mysql = require( 'mysql2' )
var ejs = require('ejs')
var path = require('path')

var database = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: 'mydb',
});

var app = express()
app.use(express.json())

app.use(express.static('views'))
app.use('/css', express.static(__dirname + 'views/css'))

app.set('view engine', 'ejs');
  
app.listen(3000, function () {
    console.log("Server listening on port: 3000")
})

app.get('/hometest', function (req, res, next) {
    database.query(
        'SELECT * FROM `users`',
        function(err, results, fields) {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            res.render('hometest', { users: results });
        }
    );
})
  
app.get('/users/:id', function (req, res, next) {
    const id = req.params.id;
        database.query(
        'SELECT * FROM `users` WHERE `id` = ?',
        [id],
        function(err, results) {
            res.json(results);
        }
    );
})
  
app.post('/users', function (req, res, next) {
    database.query(
        'INSERT INTO `users`(`colorR`, `colorG`, `colorB`, `image`) VALUES (?, ?, ?, ?)',
        [req.body.colorR, req.body.colorG, req.body.colorB, req.body.image],
        function(err, results) {
            res.json(results);
        }
    );
})
  
app.put('/users', function (req, res, next) {
    database.query(
        'UPDATE `users` SET `colorR` = ?, `colorG` = ?, `colorB` = ?, `image` = ? WHERE id = ?',
        [req.body.colorR, req.body.colorG, req.body.colorB, req.body.image, req.body.id],
        function(err, results) {
            res.json(results);
        }
    );
})
  
app.delete('/users', function (req, res, next) {
    database.query(
        'DELETE FROM `users` WHERE id = ?',
        [req.body.id],
        function(err, results) {
            res.json(results);
        }
    );
})