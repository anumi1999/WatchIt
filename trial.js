var express = require('express') ;
const app = express();
var fs = require("fs");
const { url } = require('inspector');
const puppeteer = require('puppeteer');
var raw = [];
var heade = [];
var video_src = "";
function mergeValues(values , content , res){
    content 
    for (var key in values) {
        o = values[key]
        if (key == "place"){
            content = content.replace("{{" + key + "}}", values[key])
        }
        else{
            content = content.replace("{{" + key + "}}", values[key][0]);
        }
    }
    res.write(content);
    video_src = "https://www.incredibleindia.org" + video_src;
    res.write('<div class= "carousel carousel-inner"><div class="carousel-item active"><video src = "'+ video_src + '" autoplay loop muted></video></div></div>')
    if(heade.length == 0){
        res.write('<div class="places"><div class="row"><div class = "col-md-2"></div><div class="col-md-8 col-sm-1"><p style="text-align: center; padding: 20px;">')
        for(var t = 1 ; t < values[key].length ; t++){
            res.write("<br>");
            if(heade.some(res=> res.includes(raw[t]))){
                res.write("<b>"+ raw[t] + "</b>");
            }else{
                res.write(raw[t]);
                res.write("<br>");
            }
        }
        res.write("</p></div></div></div>")
    }
    else{
        var flag = 0;
        res.write('<div class="places">')
        for(var t = 1 ; t < values[key].length ; t++){
            if( raw[t] == ""){
                continue;
            }
            if(heade.some(res=> res.includes(raw[t]))){
                flag = 1;
                res.write('<div class="row"><div class = "col-md-12"><div class="card-body"><h5 class="card-title">'+ raw[t] + '</h5>');
            }else{
                if(flag == 1){
                    res.write('<p class="card-text">' + raw[t]);
                    flag = 0;
                    res.write("</p></div></div></div>");
                }
            }
        }
    }
    res.write("</p></div></div></div></div>");
    res.write("</div>");
    res.write('<footer> <br><br> <div class = "jumbo bg-light"> <div class="row"> <div class="col-4 offset-1 col-sm-2"> <h5>Links</h5> <ul class="list-unstyled"> <li><a href="#">Home</a></li> <li><a href="#">About</a></li> <li><a href="#">Contact</a></li> </ul> </div> <div class="col-7 col-sm-5"> <h5>Our Address</h5> <address> 121, Clear Water Bay Road<br> Clear Water Bay, Indore<br> India<br> Tel. <i class="fa fa-phone fa-lg"></i> : +91 1234 5678<br> Fax <i class = "fa fa-fax fa-lg"></i> : +91 8765 4321<br> Email <i class="fa fa-envelope fa-lg"></i> : <a href="mailto:muskanjain0603@gmail.com">muskanjain0603@gmail</a> </address> </div> <div class="col-12 col-sm-4 align-self-center"> <div class="text-center"> <a class="btn btn-social-icon btn-google" href="http://google.com/+"> <i class="fa fa-google-plus"></i></a> <a class="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i class="fa fa-facebook"></i></a> <a class="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"> <i class="fa fa-linkedin"></i></a> <a class="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i class="fa fa-twitter"></i></a> <a class="btn btn-social-icon btn-google" href="http://youtube.com/"><i class="fa fa-youtube"></i></a> <a class="btn btn-social-icon" href="mailto:muskanjain0603@gmail.com"><i class="fa fa-envelope-o"></i></a> </div> </div> </div> <div class="row justify-content-center"> <div class="col-auto"> <p>© Copyright 2020 Feel Awesome Sites</p> </div> </div> </div> </footer>')
    return content;
}
arr = ["" , "lakes" , "beaches" , "hill-stations" , "mountain-ranges" , "deserts" , "rivers" , "bird-sanctuaries" , "national-parks" , "wildlife-sanctuaries-in-india" , "biosphere-reserves-in-india" , "tiger-reserves"]
arr1 = ["" , "Lakes" , "Beaches" , "Hill Stations" , "Mountain Ranges" , "Deserts" , "Rivers" , "Bird Sanctuaries" , "national-parks" , "Wildlife Sanctuaries in India" , "Biosphere Reserves in India" , "Tiger Reserves"]
async function view(page , id, uri , res ){
    const browser = await puppeteer.launch();
    const pageo = await browser.newPage();
    console.log(uri + arr[id] + ".html" );
    await pageo.goto(uri + arr[id] + ".html" , {
        timeout: 3000000
    });
    var y = 0;
    
    var for_head = await pageo.$x('/html/body/div[1]/div[4]/div/div[1]/div/div/div/div[2]//p//b/text()');
    var o = await pageo.$x('/html/body/div[1]/div[4]/div/div[1]/div/div/div/div[2]//p')
    video_src = await pageo.$$eval("source", el => el.map(x => x.getAttribute("src")));
    for( i = 0 ; i < o.length ; i++ ){
        var txt2 = await o[i].getProperty('textContent');
        rawing = await txt2.jsonValue();
        if (rawing != /(\r\n|\n|\r)/gm ){
            z = rawing.split(/(\r\n|\n|\r)/gm );
            z = z.filter(el => el !== '\n')
            z = z.filter(el => el !== '')
            for( var t = 0 ; t < z.length ; t++){
                    raw[y] = z[t];
                    raw[y] = raw[y].trim();
                    y+=1;
            }
        }
    }
    for(var i = 0 ; i < for_head.length ; i++){
        var txt = await for_head[i].getProperty('textContent');
        heade[i] = await txt.jsonValue();
        heade[i] = heade[i].trim();
    }
    heade = heade.filter(el => el !== '\n')
    heade = heade.filter(el => el !== '')
    console.log(heade);
    browser.close()
    var fileContent = fs.readFileSync('./views/' + page + '.html' , 'utf-8');
    p = {
        place: arr1[id],
        content : raw
    }
    fileContent = mergeValues(p , fileContent , res);
    res.end();
    raw.splice(0 , raw.length);
    heade.splice(0, heade.length);
    video_src = "";
}
module.exports.view = view;
