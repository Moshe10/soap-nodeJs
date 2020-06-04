let parseString = require('xml2js').parseString;
let xml2js = require('xml2js');
let fs = require('fs');

let xml = fs.readFileSync('./test.xml');

parseString(xml, function (err, result) {
    // console.dir(result);
});

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/test.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result);
        console.log('Done');
    });
});

let obj = {root: {$: {id: "my id"}, _: "my inner text"}};
let obj2 = {
    "quiz": {
        "sport": {
            "q1": {
                "question": "Which one is correct team name in NBA?",
                "options": [
                    "New York Bulls",
                    "Los Angeles Kings",
                    "Golden State Warriros",
                    "Huston Rocket"
                ],
                "answer": "Huston Rocket"
            }
        },
        "maths": {
            "q1": {
                "question": "5 + 7 = ?",
                "options": [
                    "10",
                    "11",
                    "12",
                    "13"
                ],
                "answer": "12"
            },
            "q2": {
                "question": "12 - 8 = ?",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "answer": "4"
            }
        }
    }
}
 
let builder = new xml2js.Builder();
let newXml = builder.buildObject(obj);
// console.log(newXml);
