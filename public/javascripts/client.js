
strings = {
    'connected': '[log][time]%time%[/time]: Вы успешно соединились с сервером. Ваш id=[id]%id%[/id][/log]',
    'disconnected': '[log][time]%time%[/time]: Вы разорвали соединение с сервером.[/log]',
    'userJoined': '[sys][time]%time%[/time]: Пользователь [user]%name%[/user] присоединился к чату.[/sys]',
    'messageSent': '[out][time]%time%[/time]: [user]%name%[/user]: %text%[/out]',
    'messageReceived': '[in][time]%time%[/time]: [user]%name%[/user]: %text%[/in]',
    'userSplit': '[sys][time]%time%[/time]: Пользователь [user]%name%[/user] покинул чат.[/sys]'
};

window.onload = function() {
    document.querySelector('#connect').onclick = function() {

        var socket = io.connect('http://localhost:3000');
        document.querySelector('#connect').remove();
        var btnD = document.createElement('a');
        btnD.className = "btn btn-default";
        btnD.id = "disconnect";
        btnD.setAttribute('role', 'button');
        btnD.innerHTML = "Разорвать соединение";
        btnD.onclick = function() {
            // socket.emit('disconnect');
        }
        document.querySelector('#ctrlPanel').appendChild(btnD);
        

        socket.on('message', function (msg) {
            console.log(msg);
            // Добавляем в лог сообщение, заменив время, имя и текст на полученные
            document.querySelector('#log').innerHTML += strings[msg.event].replace(/\[([a-z]+)\]/g, '<span class="$1">').replace(/\[\/[a-z]+\]/g, '</span>').replace(/\%time\%/, msg.time).replace(/\%id\%/, msg.id).replace(/\%text\%/, unescape(msg.text).replace('<', '&lt;').replace('>', '&gt;')) + '<br>';
        });
    };
};



// socket.on('node-added', function (node) {
//   var $nodes = $("ul#nodes").append(`
//     <li id="${node.id}">
//       <span>${node.id}</span>
//       <button>x</button>
//     </li>
//   `)

//   $nodes
//     .find(`li#${node.id} button`)
//     .on('click', function () {
//       socket.emit('remove-node', node)
//     })
// })