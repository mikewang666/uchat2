##  UCHAT

##### The application   designed by WANG  WU YANG YAO GROUP 
- It's an introductionfor our teamwork 

+ Our application is called uchat, which is used for people to socialize and chat. The first idea is to refer to the function of wechat



##Project framework

We design the project structure based on MVC framework


![Alt text](/5.jpg)


##Client/Server protocol



`
app.ws('/chat', function(ws, res) {
  clients.push(ws);`
`
ws.on('message', function(msg) {
    clients.forEach(function(client) {
      if (client != ws) {
        client.send(msg);
      }
    });
  });`
`
 ws.on('close', function() {
    console.log('Connection closed');
    // remove it
    var idx = clients.indexOf(ws);
`
`
    if (idx !== -1) {
      clients.splice(idx, 1);
    }});
`
`
  ws.on('error', function() {
    console.log('Connection error');`
  `  ws.close();
    // remove it
    var idx = clients.indexOf(ws);
    if (idx !== -1) {
      clients.splice(idx, 1);
    }``
  });
});`

