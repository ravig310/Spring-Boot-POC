var express = require('express');
var app = express();
var watch = require('node-watch');
var http = require('http');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var jf = require('jsonfile'); //jsonfile module
users=[];
connections =[];
var  obj ;

server.listen(process.env.PORT || 3005);
console.log('Server running ...');

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static('scripts'));
app.use(express.static('styles'));


io.sockets.on('connection',function(socket){
    connections.push(socket);
    console.log('Connected : %s sockets connected', connections.length);

    // Read the file and send to the callback
  jf.readFile('data.json', handleFile)

// Write the callback function
function handleFile(err, data) {
     console.log(data);
    if (err) throw err
        obj =data;
        console.log(obj);
        io.sockets.emit('new message', {msg: obj});
    // You can now play with your datas
}   



var watcher = watch('data.json', { recursive: true });
var newObj;
watcher.on('change', function(evt, name) {
  // callback 
  console.log(evt);
  if (evt == 'update') {
    // on create or modify 
    
    jf.readFile('data.json',function(err,data){     
        newObj = data;
        console.log(newObj);
        console.log('it is here');
         io.sockets.emit('change message', {msg: newObj});
      //  io.sockets.emit(handleFile);
    });
  }
 
  if (evt == 'remove') {
    // on delete 
  }
});
watcher.on('error', function(err) {
  // handle error 
});
//watcher.close();

 socket.on('new form',function(dat){
    jf.readFile('data.json',function(err,data){
       // var newObj = JSON.parse(data);      
        newObj = data;
        console.log(newObj);      
        console.log('it is here');
        console.log(dat);
 
        var id = dat.id;

        newObj[id].name = dat.value;
        console.log(newObj[id].name);
        console.log(newObj);
       jf.writeFile('data.json',newObj,function(dat){
        console.log(dat);        
    });

});
 });
   setTimeout(function(){
      socket.disconnected(true);
console.log(socket);
}, 300);

  
  //Disconnect
    socket.on('disconnect',function(data){
        connections.splice(connections.indexOf(socket),1);
        console.log('Disconnected : %s sockets connected', connections.length);
     
    });

});