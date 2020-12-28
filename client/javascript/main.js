const ip = process.env.IP_SERVER || "192.168.100.20";
const port = process.env.PORT_SERVER  || "8080";
var direccion='http://'+ip+':'+port;
var socket = io.connect(direccion,{'forceNew':true});

socket.on('messages',function(data){
    console.log(data);
    render(data);
});

function render(data){
var html = data.map(function(message,index){
    return(`
            <div class="chat-box-wrapper">
                <div>
                    <div class="chat-box"><strong>${message.nickname} dice: <br> </strong>${message.text}</div>
                </div>
            </div>
        `);
}).join(' ');
var msg=document.getElementById('message');
msg.innerHTML=html;
msg.scrollTop=msg.scrollHeight;
document.getElementById('text').value="";
}
function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    document.getElementById('nickname').style.display='none';
    socket.emit('add-message', message);
    return false;
}
