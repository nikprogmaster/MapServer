var XLSX = require("xlsx");
var workbook = XLSX.readFile("Map.xlsx");
var sheet_name_list = workbook.SheetNames;

var worksheet = workbook.Sheets[sheet_name_list[0]];

var headers = {};
var data = [];
for (z in worksheet) {
    if (z[0] === "!") continue;
    //parse out the column, row, and value
    var col = z.substring(0, 1);

    var row = parseInt(z.substring(1));

    var value = worksheet[z].v;

    //store header names
    if (row == 1) {
        headers[col] = value;
        // storing the header names
        continue;
    }

    if (!data[row]) data[row] = {};
    data[row][headers[col]] = value;
}
//drop those first two rows which are empty
data.shift();
data.shift();

var resultStr = '[\n'
for (i in data) {
    var element = data[i]
    resultStr += '{\n'
    resultStr += `place: \'${ element['name'] }\',\n`
    resultStr += `contact: \'${ element['description'] }\',\n`
    resultStr += `longitude: \'${ element['longitude'] }\',\n`
    resultStr += `latitude: \'${ element['latitude'] }\'\n`
    if (element == data[data.length - 1]) {
        resultStr += '}\n'
    } else {
        resultStr += '},\n'
    }
}
resultStr += ']'

// When create server
const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    console.log(req.url)
    console.log(req.method)
    console.log(req.headers)

    res.writeHead(200, {'Content-type': 'text/plain; charset=utf-8'})
    res.end(resultStr)
})

server.listen(3000, '127.0.0.1', () => console.log('Сервер работает'))


