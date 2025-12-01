const http = require("http");
const fs = require("fs");

const requestHandler = (req, res) => {
    console.log(req.url);

    let fileName = "";

    switch (req.url) {
        case "/":
            fileName = "./home.html";
            break;
        case "/about":
            fileName = "./about.html";
            break;
        case "/contact":
            fileName = "./contact.html";
            break;
        default:
            fileName = "./home.html";
    }

    fs.readFile(fileName, (err, data) => {
        if (err) {
            res.end("404 Page Not Found");
        } else {
            res.end(data);
        }
    });
};

const server = http.createServer(requestHandler);
const port = 5000;

server.listen(port, () => {
    console.log(`Server Started → http://localhost:${port}`);
});


