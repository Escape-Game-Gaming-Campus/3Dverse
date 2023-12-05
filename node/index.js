const Pusher = require("pusher");

const pusher = new Pusher({
  appId : "1717184",
  key : "bc08e3d493ddd062e4b1",
  secret : "d0ee021bf45c0babc607",
  cluster : "eu",
  useTLS : true
});

pusher.trigger("my-channel", "my-event", {
  message : "hello world"
});