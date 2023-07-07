$(document).ready(function () {
    let token = null;
    let idUser = null;
    let nick = null;

    let listarSalas = () => {
        console.log('Agora busca as salas na Api')
        $.ajax({
            url: 'http://api-chat-zexy.onrender.com/salas',
            method: 'GET',
            headers: { token: token, iduser: idUser, nick: nick },
            success: function (response) {
                console.log(response);
                $('#salas').html('');
                response.forEach(sala => {
                    $('#salas').append(`<div class="sala" id="${sala.id}">${sala.nome}</div>`);
                }
                );
                $('.sala').on('click', function () {
                    console.log($(this).attr('id'));
                    entrarSala($(this).attr('id'));
                    $('#salas').hide();
                    $('#mensagens').show();
                    listarMensagens($(this).attr('id'));
                    
                }
                );

            }
        });

    }

    let entrarSala = (idSala) => {
        console.log('Agora entra na sala')
        $.ajax({
            url: 'https://api-chat-zexy.onrender.com/sala/entrar',
            method: 'POST',
            headers: { token: token, iduser: idUser, nick: nick },
            data: { idSala: idSala },
            success: function (response) {
                console.log(response);
                $('#salas').html('');
                response.forEach(sala => {
                    $('#salas').append(`<div class="sala" id="${sala.id}">${sala.nome}</div>`);
                }
                );
                $('.sala').on('click', function () {
                    console.log($(this).attr('id'));
                }
                );
            }
        });
    }

    let listarMensagens = (idSala) => {
        console.log('Agora lista as mensagens da sala')
        $.ajax({
            url: 'https://api-chat-zexy.onrender.com/sala/mensagens',
            method: 'GET',
            headers: { token: token, iduser: idUser, nick: nick },
            data: { idSala: idSala },
            success: function (response) {
                console.log(response);
                $('#mensagens').html('');
                response.forEach(mensagem => {
                    $('#mensagens').append(`<div class="mensagem" id="${mensagem.id}">${mensagem.texto}</div>`);
                }
                );
                //ver onde fica o botão para enviar mensagem
                $('.mensagem').on('click', function () {
                    console.log($(this).attr('id'));
                }
                );
            }
        });
    }

    let enviarMensagem = (idSala, texto) => {
        console.log('Agora envia a mensagem')
        $.ajax({
            url: 'https://api-chat-zexy.onrender.com/sala/mensagem',
            method: 'POST',
            headers: { token: token, iduser: idUser, nick: nick },
            data: { idSala: idSala, texto: texto },
            success: function (response) {
                console.log(response);
                $('#mensagens').html('');
                response.resp.forEach(mensagem => {
                    $('#mensagens').append(`<div class="mensagem" id="${mensagem.id}">${mensagem.texto}</div>`);
                }
                );
                $('.mensagem').on('click', function () {
                    console.log($(this).attr('id'));
                }
                );
            }
        });
        
    }



    $('#salas').hide();
    $('#mensagens').hide();

    $('#btn-entrar').on('click', (event) => {
        event.preventDefault();
        if ($('#input-nick').val().length > 2) {
            console.log($('#input-nick').val())
            $.ajax({
                url: 'http://api-chat-zexy.onrender.com/entrar',
                method: 'POST',
                data: { nick: $('#input-nick').val() },
                success: function (response) {
                    console.log(response)
                    token = response.token;
                    idUser = response.idUser;
                    nick = response.nick;
                    $('#input-nick').val('');
                    $('#inicio').hide();
                    $('#salas').show();
                    listarSalas();

                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            })
        }
    })
})