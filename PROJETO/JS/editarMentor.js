const form = document.getElementById('myForm')
let mentorId = null // variável global para armazena o livro em edição

const getIdUrl = () => {
    const paramsString = window.location.search
    const params = new URLSearchParams(paramsString)
    mentorId = params.get('id')
}

const buscarMentor = async () => {
    const resposta = await fetch(`http://localhost:3000/mentores/${mentorId}`)
    const mentor = await resposta.json()
    return mentor
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const nome  = form.elements['nome'].value
    const email = form.elements['email'].value
 
    const mentor = {
        nome,
        email
    }

    editarMentor(mentor)
})

const carregarDadosFormulario = async (mentor) => {
    document.getElementById('nome').value = mentor.nome
    document.getElementById('email').value = mentor.email 
}

const editarMentor = async (mentor) => {
    await fetch(`http://localhost:3000/mentor/${mentorId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentor)
    })
    
    window.location = 'mentores.html'
}


const buscarMentores = async () => {
    const resposta = await fetch('http://localhost:3000/mentores')
    const mentores = await resposta.json()
    return mentores
}

const carregarSelect = async () => {
    const mentores = await buscarMentores()
    const mentorSelect = document.getElementById('mentor')
    
    const opcaoVazia = new Option('Selecione um mentor...')
    mentorSelect.options.add(opcaoVazia)

    mentores.forEach(mentor => {
        const opcao = new Option(mentor.nome, mentor.id)
        mentorSelect.options.add(opcao)
    })
}
const carregarDados = async () => {    
    getIdUrl()    
    const mentor = await buscarMentor()
    carregarDadosFormulario(mentor)
}
carregarDados()