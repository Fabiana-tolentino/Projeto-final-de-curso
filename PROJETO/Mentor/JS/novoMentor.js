const form = document.getElementById("form")


const buscarMentor = async (id) => {
    const resposta = await fetch (`http://localhost:3000/mentores/${id}`)
    const mentor = await resposta.json()
    return mentor
}

const buscarMentores = async () => {
    const resposta = await fetch('http://localhost:3000/mentores')
    const mentores = await resposta.json()
    return mentores
}

const carregarSelect = async () => {
    const mentores = await buscarMentores()
    const mentorSelect = document.getElementById('mentor')
    
    const opcaoVazia = new Option('Selecione um Mentor...')
    mentorSelect.options.add(opcaoVazia)

    mentores.forEach(mentor => {
        const opcao = new Option(mentor.nome, mentor.id)
        mentorSelect.options.add (opcao)
    })
}

const cadastrarMentor =async (mentor) =>{ 
    // Função que escuta o evento de envio do formulário
    // o URL é o primeiro parametro, depois passa o segundo parametro para especificar
    // qual o método e como será a requisição. 
    await fetch ("http://localhost:3000/mentores", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */* ",
            "Content-Type": "application/json"
        },
        // convertendo para uma string
        body: JSON.stringify(mentor)
    })
        window.location = "mentores.html" 

};
// Redireciona para a página "mentores.html" após o salvamento bem-sucedido.

form.addEventListener("submit", async (e) => {
    e.preventDefault() 
    // Impede o comportamento padrão de envio para o backend, pois os dados serão tratados aqui
    // Pegando as informações do formulário
    const nome  = form.elements["nome"].value
    const email = form.elements["email"].value

    
    
    const mentor = {
        nome,
        email
    }
    
    cadastrarMentor(mentor) // Chama a função para salvar o novo mentor
   
}); 

carregarSelect ()

