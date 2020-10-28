var socket = io.connect('http://74.208.168.156:8080',{'forceNew':true});

socket.on('messages',function(data){
    console.log(data);
    render(data);
});

function render(data){
var html = data.map(function(message,index){
    return(`
            <div class="message">
                <strong>${message.nickname}</strong>
                <p> ${message.text}</p>
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