// 1°) Recupera o ID
const form = document.getElementById ("form") // capturando o  formulario DO HTML
let turmaId = null // variavel global para armazenar o mentor em edição

// O URLSearchParams permite analisar e manipular os parametros de uma URL; 
// Aqui capturamos o valor do parametro id com o Get;

const getIdUrl =  () => {
    console.log(window.location.search)
    const paramsString = window.location.search // pega as infos que foram enviadas
    const params = new URLSearchParams(paramsString) // define metodos para buscar parametros da URL
    turmaId = params.get ('id') 
}
 // 2°) Busco o mentor
const buscarturma = async () => {
    const response = await fetch (`http://localhost:3000/mentores/${turmaId}`)
    const turma = await response.json()
    return turma
}

//3°) Envio os dados para o formulário

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const nome  = form.elements ['nome'].value
    const email = form.elements ['email'].value

    const turma = {
        nome,
        email
    }
    editarTurma(turma)
})
//4°) Cria a função que vai enviar os dados para API
const carregarDadosForm = async (turma) => {
    document.getElementById ('nome').value = turma.nome
    document.getElementById ('email').value = turma.email
}



const editarTurma = async (turma) => {
    await fetch (`http://localhost:3000/mentores/${turmaId}`, {
        method: 'PUT',
        headers: {
            "Accept": "application/json, text/plain, */* ",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(turma) 
    })
    window.location = "turma.html"
}

const carregarDados = async () => {
    getIdUrl()
const turma = await buscarturma()
carregarDadosForm (turma)   
}

carregarDados()


