const Bootbot = require('./lib/BootBot');
const Engbot = new Bootbot({
  accessToken: "EAAFdHrire4EBAKG6DLMJ7zQ3eHUPMnSmtCs9LZBbaQu09W4DXmSsCF93UoZCHuFjRUKM5cZBFQZAm1EmrXuCoVGDYyrpCJs7BUUWnmDg2AlBZCqPGUn2ZAuDXYo0KsHOwasWZA3srPvLHz5ZAOdJJNomqTH4TZAHYzWorkg7QRu0adl6jq7YsbVNA",
  verifyToken: "dangnhapthanhcong"
})

Engbot.hear(['hello', 'hi', 'hey'], (payload, chat) => {
  chat.say('Hello there!');
});

Engbot.hear(/gif (.*)/i, (payload, chat, data) => {
  const query = data.match[1];
  chat.say('Searching for the perfect gif...');
  fetch(GIPHY_URL + query)
    .then(res => res.json())
    .then(json => {
      chat.say({
        attachment: 'image',
        url: json.data.image_url
      }, {
        typing: true
      });
    });
});

exports.EngbotFunction = Engbot.start;
