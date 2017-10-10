 $(function(){
            var socket = io.connect();
            var $chat = $('#chat');
            var $message = $('#message');
                var messageData= {};
            socket.on('new message',function(data){
             //   console.log(data);
                var tableData =[];
                
                for(i=0;i<Object.keys(data.msg).length;i++){
               //     console.log(data.msg[i]);
                    $('#tableData').append('<tr><td>'+data.msg[i].id+
                    '</td><td>' + data.msg[i].name+'</td><td>'+ data.msg[i].age +'</td><td><input type="checkbox"  id ="'+i+'"/></td></tr>')
                }
               // $chat.append('<div class="well">'+ data.msg +'</div>');
            });
            socket.on('change message',function(data){
                 console.log(data);
                console.log(Object.keys(data.msg).length);
                var tableData =[];
                $('#tableData').find('tr').remove();
                for(i=0;i<Object.keys(data.msg).length;i++){
                  //  console.log(data.msg[i]);
                    $('#tableData').append('<tr><td>'+data.msg[i].id+
                    '</td><td>' + data.msg[i].name+'</td><td>'+ data.msg[i].age +'</td><td><input type="checkbox" id ="'+i+'"/></td></tr>')
                }
            });

       
           $("#tableData").click(function (e) {
                console.log('abcd');
                messageData.id = e.target.id;
                console.log(e.target.id);
                messageData.checked = e.target.checked;
            });
           

            $('#messageForm').submit(function(e){
                 e.preventDefault();
                 console.log(e);
                 console.log(typeof messageData.id);
                 if( typeof messageData.id !== 'undefined' && typeof messageData.checked){ 
                    if(messageData.id.length > 0 && messageData.checked){ 
                        messageData.value = $message.val();
                        socket.emit('new form', messageData);
                        $message.val(' ');
                        messageData.id = '';
                    }
                }
                 
            });
        });
