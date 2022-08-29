let nomeUsuario;
const all = "todos";
const type = "message";
//...................................................................................pergunta nome do usuário
function recebeNome() {
    nomeUsuario = prompt("Que nome deseja usar?");

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',
        {
            name: nomeUsuario
        }
    );

    promessa.catch(erroDados);
}

recebeNome();

function erroDados() {
    alert('algo deu errado, tente novamente!');
    recebeNome();
}

//........................................................................................................

setInterval(manterConexao, 5000);

function manterConexao() {
     const segundaPromessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',
        {
            name: nomeUsuario
        }
    );
    segundaPromessa.catch(erroSegundaPromessa);
}
function erroSegundaPromessa(){
}

function conseguirMenssagens() {
    const terceiraPromessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')

    terceiraPromessa.then(carregarMenssagens);
    terceiraPromessa.catch(carregarMenssagens);
}
setInterval(conseguirMenssagens, 3000);

function carregarMenssagens(response) {
    const chat = document.querySelector('.chat');
    const dadosMensagens = response.data;

    chat.innerHTML = "";
    for (i = 0; i < dadosMensagens.length; i++) {

        if (dadosMensagens[i].type === 'status') {

            chat.innerHTML += ` 
          <div class="mensagens-de-status">
             <div class="tempo">(${dadosMensagens[i].time})</div>
             <div class="nome">${dadosMensagens[i].from}</div>
             <div class="mensagem">${dadosMensagens[i].text}</div>
          </div>`
        }

        if (dadosMensagens[i].type === 'message') {

            chat.innerHTML += ` 
            <div class="mensagens-normais">
                <div class="tempo">(${dadosMensagens[i].time})</div>
                <div class="nome">${dadosMensagens[i].from}</div>
                para
                <div class="destino">${dadosMensagens[i].to}</div>
                <div class="mensagem">${dadosMensagens[i].text}</div>               
            </div>`
        }

        if (dadosMensagens[i].type === 'private_message' && dadosMensagens[i] === nomeUsuario) {

            chat.innerHTML += ` 
            <div class="mensagens-reservadas">
               <div class="tempo">(${dadosMensagens[i].time})</div>
               <div class="nome">${dadosMensagens[i].from}</div>
               para
               <div class="destino">${dadosMensagens[i].to}</div>
               <div class="mensagem">${dadosMensagens[i].text}</div>             
            </div>`
        }

    }

    const scrolar = document.querySelector('.chat').lastElementChild;
    scrolar.scrollIntoView();
}

function mensagemEnviada() {
    const pegarMensagem = document.querySelector('.mandar-mensagem-nova').value
    const apagaMensagem = document.querySelector('.mandar-mensagem-nova')

    const quartaPromessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',
        {
            from: nomeUsuario,
            to: all,
            text: pegarMensagem,
            type: type
        })
    quartaPromessa.catch(off)
    apagaMensagem.value = "";
}

function off() {
    window.location.reload();
}