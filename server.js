const logger = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const port = process.env.PORT || 3000;
const request = require("request");

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.get('/', (req, res) => {
  res.send("Home page. Server running  okay.");
});

// Đây là đoạn code để tạo Webhook
app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === 'dangnhapthanhcong') {
    // console.log(req.query['hub.challenge'])
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

// Xử lý khi có người nhắn tin cho bot
app.post('/webhook', function(req, res) {
  var entries = req.body.entry;
  // console.log('=====================> body cua facebook', req.body)
  for (var entry of entries) {
    var messaging = entry.messaging;
    // console.log('===========> truong messaging', messaging);
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        // If user send text
        if (message.message.text) {
          var text = message.message.text;
          console.log(text); // In tin nhắn người dùng
          sendMessage(senderId, "Tui là bot đây: " + text);
        }
      }
    }
  }

  res.status(200).send("OK");
});


// Gửi thông tin tới REST API để trả lời
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: "EAAFdHrire4EBAIGrIb9ds2o77m3jhbw7g8ZB5M6fqRZBE1kqtglu19LBxZA3X0JwE7J13eXf3DZAi3uK4tSd6K348LMnBG2438dcdj1utRv6d1MpxgTzcENI0lVm9SrkVxMEoxv2RRm4llkvE1BnkQap1yEsvHu4ZBCxe5lVmwwZDZD",
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        text: message
      },
    }
  });
}

app.listen(port, () => {
  console.log(port)
})