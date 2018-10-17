let Engbot = (req, res) => {
  let message = req.query['mesage'];
  res.send(message);
}
exports.EngbotFunction = Engbot;
