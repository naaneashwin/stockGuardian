// const http = require('node:http');
const fs = require('node:fs');
const express = require('express');

const app = express();

// const server = http.createServer((req, res) => {
//     // res.writeHead(200,'Hello' ,{ 'Content-Type': 'text/plain'});
//     // res.setHeader('Content-Type', 'text/plain');
//     fs.readFile('./mongo.txt', {encoding: 'utf-8'}, (err, data) => {
//         if (err) {
//             res.statusMessage = 'There is an error' + err;
//             res.statusCode = 404;
//             res.end();
//         } else {
//             res.write(data);
//             res.end();
//         }
//     });
// });

// server.listen(3000);

app.listen(3000, () => {
    console.log('App is listening @ Port 3000');
});

// app.use((req, res, next) => {
//     console.log(req.url);
//     console.log(req.path);
//     console.log(req.params);
//     console.log(req.body);
//     next();
// })

// app.use('/:id', (req, res) => {
//     res.send(`In path /${req.params.id}`)
// })

// app.get('/', (req, res) => {
//     res.status(200).send('In path /');
// });

app.get('/stocks', (req, res, next) => {
    res.send('In path ' + req.path)
});

app.use((req, res) => {
    res.status(404).send('Page not found Ashiwn')
})

app.use(function (err, req, res, next) {
    console.log('Hello' + err);
    if (err) {
        res.status(err.response?.status).send(err.response?.message);
    }
    res.status(500).send('Internal Server Error Ashwin');
});