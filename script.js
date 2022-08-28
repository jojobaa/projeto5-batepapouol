//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
const todos = "todos";
const type = "message";
//...................................................................................pergunta nome do usuário
let nomeUsuario = prompt("Que nome deseja usar?");

//.....................................................................................pega nome dos usuários
const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',
    {
        name: nomeUsuario
    }
);


promessa.then(dadosResposta);
promessa.catch(erroDados);

//....................................................................................mostra nome dos usuários 

function dadosResposta(resposta) {

    console.log("qualquer coisa");
}

//...............................................................................................mostra erro

function erroDados() {
    alert('deu errado');
    nomeUsuario = prompt("Que nome deseja usar?");

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',
        {
            name: nomeUsuario
        }
    );
}

//............................................................................................

const segundaPromessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',
    {
        name: nomeUsuario
    }
);

setInterval(manterConexao, 5000);

function manterConexao() {
    const segundaPromessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',
        {
            name: nomeUsuario
        }
    );
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
    
    chat.innerHTML="";
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

        if (dadosMensagens[i].type === 'message') {

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

    const scrolar = document.querySelector('.chat:last-child');
    scrolar.scrollIntoView();
}

function mensagemEnviada(){
    const pegarMensagem = document.querySelector('.mandar-mensagem-nova').value
    const apagaMensagem = document.querySelector('.mandar-mensagem-nova')

    const quartaPromessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', 
    {
        from: nomeUsuario,
        to: todos,
        text: pegarMensagem,
        type: type 
    })

    apagaMensagem.value = "";
}