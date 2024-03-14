var express = require( 'express' )
var mysql = require( 'mysql2' )
const colorDiff = require('color-diff');

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

            //ดึงค่าสี R, G, B จาก database
            const skinColorRGB = { 
                R: results[0].colorR, 
                G: results[0].colorG, 
                B: results[0].colorB 
            };

            //สีโทนทั้งหมด
            const availableColors = [
                { name: '01', R: 253, G: 240, B: 214 },
                { name: '02', R: 250, G: 227, B: 186 },
                { name: '03', R: 233, G: 193, B: 133 },
                { name: '04', R: 209, G: 157, B: 100 },
                { name: '05', R: 248, G: 224, B: 194 },
                { name: '06', R: 248, G: 215, B: 176 },
                { name: '07', R: 226, G: 176, B: 139 },
                { name: '08', R: 205, G: 152, B: 108 },
                { name: '09', R: 250, G: 222, B: 201 },
                { name: '10', R: 250, G: 199, B: 167 },
                { name: '11', R: 218, G: 152, B: 117 },
                { name: '12', R: 188, G: 124, B: 88 },
            ];

            let closestColor = availableColors[0];
            let minDistance = colorDiff.diff(skinColorRGB, closestColor);

            for (let i = 1; i < availableColors.length; i++) {
                const distance = colorDiff.diff(skinColorRGB, availableColors[i]);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestColor = availableColors[i];
                }
            }

            res.render('hometest', { users: results, closestColor: closestColor });
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