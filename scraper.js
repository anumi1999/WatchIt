var fs = require("fs");
const puppeteer = require('puppeteer');
var rawTxt = [];
// async function scrapeProduct(url , res){
  
// }

function mergeValues(values, content) {
  for (var key in values) {
    console.log("printing " + values[key]);
    content = content.replace("{{" + key + "}}", values[key])
  }
  console.log("process 3 ends");
  return content;
}
function lol(templateName, values , res ){
  console.log("values: " + values);
  var fileContent = fs.readFileSync('./views/' + templateName + '.html', 'utf8');

  fileContent = mergeValues(values, fileContent);
  res.write(fileContent);
  console.log("Process 2 end");
}
async function view(templateName, values, res) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(values);
  var y = 1;
  for( var i = 1 ; i <= 11 ; i++ ){
      var [t] = await page.$x('/html/body/div[1]/div[6]/section/div/div[2]/div/div/a['+y+']/div/h4');
      var txt2 = await t.getProperty('textContent');
      rawTxt[i] = await txt2.jsonValue();
      console.log(rawTxt[i]);
      y+= 1;
  }
  var p = {
    badges : rawTxt[1],
    beaches : rawTxt[2],
    hill: rawTxt[3],
    mountain: rawTxt[4],
    Deserts: rawTxt[5],
    Rivers: rawTxt[6],
    Bird: rawTxt[7],
    National:rawTxt[8],
    Wildlife:rawTxt[9],
    Biosphere:rawTxt[10],
    Tiger:rawTxt[11]
  }
  browser.close();
  console.log("Process 1 end");
  lol("green" , p , res); 
  console.log("Process Check up");
  res.end();
}

module.exports.view = view;
