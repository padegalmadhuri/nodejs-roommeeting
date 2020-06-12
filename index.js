const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var app = express();
app.use(bodyParser.json());

var port=process.env.PORT||3000;
app.get('/', (req, res)=>{
    res.send("<h1>Meeting Room</h1>")
});
var rooms = [];
var bookings = [];

//adding the Room
app.post('/addRoom', function (req, res) {
    rooms.push(req.body);
    res.send("Added Room");
});

//Displaying the Rooms
app.get('/displayRooms', function (req, res) {
    res.send(JSON.stringify(rooms));
});

//Booking the Rooms
app.post('/bookRoom', function (req, res) {
    let book = req.body;
    let flag = true;
    let start = parseInt(req.body["startTime"].split(":").join(""));
    let end = parseInt(req.body["endTime"].split(":").join(""));
    //console.log(start,end);
    for (let i = 0; i < bookings.length; i++) {
      let checkStart = parseInt(bookings[i].startTime.split(":").join(""));
      let checkEnd = parseInt(bookings[i].endTime.split(":").join(""));
      console.log(bookings[i].date,book.date)
            if (((bookings[i].date).toString() == (book.date).toString()) &&
            ((start > checkStart && start < checkEnd) ||
             (end > checkStart && end < checkEnd) || (start == checkStart && end == checkEnd))) {
                  flag = false;
            }
          }
    if (flag) {
        bookings.push(book);
        res.send("Booking done");
    }
    else {
      res.send("the slot is already booked change the slot timimgs if you want")
    }
});

//Displaying the Bookings Data
app.get("/bookingsData", (req, res) => {
    res.send(JSON.stringify(bookings));
});

app.listen(port,()=>{
  console.log(`App is listening at PORT ${port}`)
});
