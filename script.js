//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

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

function erroDados (){
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

function manterConexao (){
    const segundaPromessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',
    {
        name: nomeUsuario
    }
);
}