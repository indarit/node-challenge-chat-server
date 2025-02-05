const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const bodyParser = require("body-parser");
const { text } = require("express");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.status(200).json(messages);
});
app.get("/messages/search", (req, res)) => {
  const textQuery = req.query.text;
  if (textQuery != null) {
    return res.send(404)

  // colocar un if que valide que el textQuery viene vacio
  //const textQuery = req.query.text;
    //  const search = messages.filter((element) =>
    //   element.text.toLowerCase().includes(textQuery)
    //  );
let resul = [];
for (const obj of messages) {
  console.log(obj);
  if (obj.text.toLocaleLowerCase().includes(textQuery.toLocaleLowerCase()))
    resul.push(obj);
  }
  res.send(resul);
}};
     //res.send(search);

    
app.get("/messages/:messages_id", (request, response) => {
  const messagesId = request.params.messages_id;
  const result = messages.find((q) => q.id == messagesId);
  if (result) {
    response.status(200).json(result);
  } else {
    response.status(404).send("Not Found 0");
  }
});

app.post("/messages", (request, response) => {
  const newId = messages.length > 0 ? messages[messages.length - 1].id + 1 : 0;
  if (!request.body.from) {
    // el signo de exclamacion es  una  negacion y en esta sintaxis es si from  nos trae un valor entonces
    response.status(400).json("from noT valid");
    return;
  }

  if (!request.body.text) {
    // el signo de exclamacion es  una  negacion y en esta sintaxis es si from  nos trae un valor entonces
    response.status(400).json("from noT valid");
    return;
  }

  const newmessages = {
    id: newId,
    ...request.body,
  };

  messages.push(newmessages);
  response.status(200).json(newmessages);
});
app.delete("/messages/:messages_id", (request, response) => {
  const messagesId = request.params.messages_id;
  const messagesIdx = messages.findIndex((q) => q.id == messagesId);
  if (messagesIdx > -1) {
    messages.splice(messagesId, 1);
    response.status(200).json(messages);
  } else {
    response.status(404).send("Not Found 1");
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
