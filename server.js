var http = require('http');  
var url = require('url');  
var fs = require('fs'); 
var p = require('path')
var express = require('express') ;
var scrap = require('./scraper.js');
var popat = require('./trial.js');
const app = express();
const puppeteer = require('puppeteer');
var bodyParser = require("body-parser");
const { raw, response } = require('express');
var rawTxt = [];
async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    var y = 1;
    for( var i = 1 ; i <= 11 ; i++ ){
        var [t] = await page.$x('/html/body/div[1]/div[6]/section/div/div[2]/div/div/a['+y+']/div/h4');
        var txt2 = await t.getProperty('textContent');
        rawTxt[i] = await txt2.jsonValue();
        console.log(rawTxt[i]);
        y+= 1;
    }
    browser.close();
}
var server = http.createServer(function(request, response) {  
console.log(request.url);
var path = url.parse(request.url).pathname; 
var ror = url.parse(request.url, true).query;
console.log(ror);
console.log(path);
    switch (path) {  
        case '/': 
        console.log('called page');
        fs.readFile("index.html", function(error, data) {  
            if (error) {  
                response.writeHead(404);  
                response.write(error);  
                response.end();  
            } else {  
                response.writeHead(200, {  
                    'Content-Type': 'text/html',
                }); 
                response.write(data);  
                response.end();  
            }  
        }); 
            break;
        case '/css/style.css':
            console.log('called css');
            var cssPath = p.join(__dirname, path);
            var fileStream = fs.createReadStream(cssPath);
            response.writeHead(200, {"Content-Type": "text/css"});
            fileStream.pipe(response);
            break;
        case '/script.js':
            console.log('called css');
            var cssPath = p.join(__dirname, path);
            var fileStream = fs.createReadStream(cssPath);
            response.writeHead(200, {"Content-Type": "text/javascript"});
            fileStream.pipe(response);
            break;
        case '/p.js':
                console.log('called css');
                var cssPath = p.join(__dirname, path);
                var fileStream = fs.createReadStream(cssPath);
                response.writeHead(200, {"Content-Type": "text/javascript"});
                fileStream.pipe(response);
                break;
        case "/img/nature.png":
            console.log('called image');
            var imagePath = p.join(__dirname, path);
            var fileStream = fs.createReadStream(imagePath);
            response.writeHead(200, {"Content-Type": "image/png"});
            fileStream.pipe(response);
            break;
        case "/img/mountain.png":
                console.log('called image');
                var imagePath = p.join(__dirname, path);
                var fileStream = fs.createReadStream(imagePath);
                response.writeHead(200, {"Content-Type": "image/png"});
                fileStream.pipe(response);
                break;
        case "/img/buildings.png":
                    console.log('called image');
                    var imagePath = p.join(__dirname, path);
                    var fileStream = fs.createReadStream(imagePath);
                    response.writeHead(200, {"Content-Type": "image/png"});
                    fileStream.pipe(response);
                    break; 
        case "/img/Querim_beach_Goa.jpg":
                console.log('called image');
                var imagePath = p.join(__dirname, path);
                var fileStream = fs.createReadStream(imagePath);
                response.writeHead(200, {"Content-Type": "image/jpg"});
                fileStream.pipe(response);
                break;
        case "/img/orissa3.jpg":
                console.log('called image');
                var imagePath = p.join(__dirname, path);
                var fileStream = fs.createReadStream(imagePath);
                response.writeHead(200, {"Content-Type": "image/jpg"});
                fileStream.pipe(response);
                break;
        case "/img/24749590798_b4faa24eeb_k.jpg":
                console.log('called image');
                var imagePath = p.join(__dirname, path);
                var fileStream = fs.createReadStream(imagePath);
                response.writeHead(200, {"Content-Type": "image/jpg"});
                fileStream.pipe(response);
                break;  
        case "/img/Origins.png":
                console.log('called image');
                var imagePath = p.join(__dirname, path);
                var fileStream = fs.createReadStream(imagePath);
                response.writeHead(200, {"Content-Type": "image/png"});
                fileStream.pipe(response);
                break; 
        case "/css/selfie.css":
            console.log('called css');
            var cssPath = p.join(__dirname, path);
            var fileStream = fs.createReadStream(cssPath);
            response.writeHead(200, {"Content-Type": "text/css"});
            fileStream.pipe(response);
                break;
        case '/green_page.html':
            // scrapeProduct('https://www.incredibleindia.org/content/incredible-india-v2/en/experiences/nature-and-wildlife.html');
            // var rawTxt1 ={
            //     badges : rawTxt[1],
            //     beaches : rawTxt[2],
            //     hill: rawTxt[3],
            //     mountain: rawTxt[4],
            //     Deserts: rawTxt[5],
            //     Rivers: rawTxt[6],
            //     Bird: rawTxt[7],
            //     National:rawTxt[8],
            //     Wildlife:rawTxt[9],
            //     Biosphere:rawTxt[10],
            //     Tiger:rawTxt[11],
            //     t : rawTxt
            // }
            scrap.view("green" , 'https://www.incredibleindia.org/content/incredible-india-v2/en/experiences/nature-and-wildlife.html' , response);
            console.log("Back to me");
            console.log("After response");
            break;
        case '/About.html':
            fs.readFile("About.html", function(error, data) {  
                if (error) {  
                    response.writeHead(404);  
                    response.write(error);  
                    response.end();  
                } else {  
                    response.writeHead(200, {  
                        'Content-Type': 'text/html',
                    }); 
                    response.write(data);  
                    response.end();  
                }  
            });
            break;
        case '/red.html':
            fs.readFile("./views/red.html", function(error, data) {  
                if (error) {  
                    response.writeHead(404);  
                    response.write(error);  
                    response.end();  
                } else {  
                    response.writeHead(200, {  
                        'Content-Type': 'text/html',
                    }); 
                    response.write(data);  
                    response.end();  
                }  
            });
            break;
        case '/selfie.html':
            fs.readFile("selfie.html", function(error, data) {  
                if (error) {  
                    response.writeHead(404);  
                    response.write(error);  
                    response.end();  
                } else {  
                    response.writeHead(200, {  
                        'Content-Type': 'text/html',
                    }); 
                    response.write(data);  
                    response.end();  
                }  
            });
            break;
        case '/t':
            console.log('hehe');
            // popat.u();
            console.log(ror.id);
            main_uri = "https://www.incredibleindia.org/content/incredible-india-v2/en/experiences/nature-and-wildlife/"
            popat.view('t' , parseInt(ror.id) , main_uri , response);
            break;
        default:  
            response.writeHead(404);  
            response.write("opps this doesn't exist - 404");  
            response.end();  
            break;  
    }  
});  
server.listen(8080);  