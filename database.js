var express = require( 'express' )
var mysql = require( 'mysql2' )
const colorDiff = require('color-diff');
const fs = require("fs");

var database = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6692551",
    password: "pHBcf8w2UL",
    database: 'sql6692551',
});

var app = express()
app.use(express.json())

app.use(express.static('views'))

app.set('view engine', 'ejs');

app.listen(3306, function () {
    console.log("Server listening on port: 3306")
})

app.get('/', function (req, res, next) {
    database.query(
        'SELECT * FROM `User`',
        function(err, results, fields) {
            if (err) {
                res.status(500).send(err.message);
                return;
            }

            //ดึงค่าสี R, G, B จาก database
            const skinColorRGB = { 
                R: results[0].color_r, 
                G: results[0].color_g, 
                B: results[0].color_b 
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
            res.render('home', { users: results, closestColor: closestColor });
        }
    );
})

app.get('/test', function (req, res, next) {
    // ดึง ID ล่าสุดจากฐานข้อมูล
    database.query(
        'SELECT id FROM `User` ORDER BY id DESC LIMIT 1',
        function(err, results, fields) {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            
            // ถ้ามีผลลัพธ์จากการดึง ID ล่าสุด
            if (results.length > 0) {
                const latestId = results[0].id;

                // ดึงข้อมูลผู้ใช้จาก ID ล่าสุด
                database.query(
                    'SELECT * FROM `User` WHERE `id` = ?',
                    [latestId],
                    function(err, results, fields) {
                        if (err) {
                            res.status(500).send(err.message);
                            return;
                        }

                        //ดึงค่าสี R, G, B จาก database
                        const skinColorRGB = { 
                            R: results[0].color_r, 
                            G: results[0].color_g, 
                            B: results[0].color_b 
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
                        res.render('home', { users: results, closestColor: closestColor });
                    }
                );
            } else {
                res.status(404).send("No user found.");
            }
        }
    );
})

app.get('/:id', function (req, res, next) {
    const id = req.params.id;
    database.query(
      'SELECT * FROM `User` WHERE `id` = ?',
      [id],
      function(err, results) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        
        // ถ้ามีผลลัพธ์จากการดึง ID ล่าสุด
        if (results.length > 0) {
            const latestId = results[0].id;

            // ดึงข้อมูลผู้ใช้จาก ID ล่าสุด
            database.query(
                'SELECT * FROM `User` WHERE `id` = ?',
                [latestId],
                function(err, results, fields) {
                    if (err) {
                        res.status(500).send(err.message);
                        return;
                    }

                    //ดึงค่าสี R, G, B จาก database
                    const skinColorRGB = { 
                        R: results[0].color_r, 
                        G: results[0].color_g, 
                        B: results[0].color_b 
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
                    res.render('home', { users: results, closestColor: closestColor });
                }
            );
        } else {
            res.status(404).send("No user found.");
        }
    });
})

  
app.post('/User', function (req, res, next) {
    database.query(
        'INSERT INTO `User`(`color_r`, `color_g`, `color_b`, `image`) VALUES (?, ?, ?, ?)',
        [req.body.colorR, req.body.colorG, req.body.colorB, req.body.image],
        function(err, results) {
            res.json(results);
        }
    );
})
  
app.put('/User', function (req, res, next) {
    database.query(
        'UPDATE `User` SET `color_r` = ?, `color_g` = ?, `color_b` = ?, `image` = ? WHERE id = ?',
        [req.body.colorR, req.body.colorG, req.body.colorB, req.body.image, req.body.id],
        function(err, results) {
            res.json(results);
        }
    );
})
  
app.delete('/User', function (req, res, next) {
    database.query(
        'DELETE FROM `User` WHERE id = ?',
        [req.body.id],
        function(err, results) {
            res.json(results);
        }
    );
})