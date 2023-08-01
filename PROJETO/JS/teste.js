const formulario = document.getElementById('formulario')
let livroId = null // variável global para armazena o livro em edição

const buscarAutor = async (id) => {
    const resposta = await fetch(`http://localhost:3000/autores/${id}`)
    const autor = await resposta.json()
    return autor
}

const buscarAutores = async () => {
    const resposta = await fetch('http://localhost:3000/autores')
    const autores = await resposta.json()
    return autores
}

const carregarSelect = async () => {
    const autores = await buscarAutores()
    const autorSelect = document.getElementById('autor')
    
    const opcaoVazia = new Option('Selecione um autor...')
    autorSelect.options.add(opcaoVazia)

    autores.forEach(autor => {
        const opcao = new Option(autor.nome, autor.id)
        autorSelect.options.add(opcao)
    })
}

const getIdUrl = () => {
    const paramsString = window.location.search
    const params = new URLSearchParams(paramsString)
    livroId = params.get('id')
}

const buscarLivro = async () => {
    const response = await fetch(`http://localhost:3000/livros/${livroId}`)
    const livro = await response.json()
    return livro
}

const editarLivro = async (livro) => {
    await fetch(`http://localhost:3000/livros/${livroId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
    })
    
    window.location = '../../index.html'
}

const carregarDadosFormulario = async (livro) => {
    let autor = ''
    if (livro.autor.id) {
        autor = livro.autor.id
    } else {
        autor = livro.autor
    }

    document.getElementById('titulo').value = livro.titulo
    document.getElementById('autor').value = autor
    document.getElementById('ano').value = livro.ano
}

const carregarDados = async () => {    
    getIdUrl()    
    const livro = await buscarLivro()
    await carregarSelect()
    carregarDadosFormulario(livro)
}

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    const titulo = formulario.elements['titulo'].value
    const autor = formulario.elements['autor'].value
    const ano = formulario.elements['ano'].value

    const autorObjeto = await buscarAutor(autor)
    const livro = {
        titulo,
        autor: {
            id: autorObjeto.id,
            nome: autorObjeto.nome
        },
        ano
    }

    editarLivro(livro)
})

carregarDados()