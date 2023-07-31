const renderTurmas = (turmas) => { // recebe os mentores
    const table = document.querySelector("tbody")
    table.innerHTML = ''

    turmas.forEach((turma) => {
    const html = `
    <tr>
        <td>${turma.nome}</td>
        <td>${turma.email}</td>
        <td>${turma.email}</td>
        <td>${turma.email}</td>
        <td>${turma.email}</td>
        <td>${turma.email}</td>
        <td>${turma.email}</td>
        <td>
            <button onclick="editarMentor(${turma.id})"><svg class="icon" width="15" height="15" viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 16 16"><path d="M2.453 9.297C1.754 9.996 1 13.703 1 14c0 .521.406 1 1 1 .297 0 4.004-.754 4.703-1.453l5.722-5.722-4.25-4.25-5.722 5.722zM12 1c-.602 0-1.449.199-2.141.891l-.284.284 4.25 4.25.284-.284A3.04 3.04 0 0 0 15 4a3 3 0 0 0-3-3z" fill="#1d35ed" class="fill-000000"></path></svg>
            </button>
            <button onclick="excluirMentor(${turma.id})"><svg class="icon" width="15" height="15" data-name="Layer 1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M36 44H12a3 3 0 0 1-3-3V12a1 1 0 0 1 1-1h28a1 1 0 0 1 1 1v29a3 3 0 0 1-3 3ZM11 13v28a1 1 0 0 0 1 1h24a1 1 0 0 0 1-1V13Z" fill="#f20505" class="fill-55aae1"></path><g opacity=".35"><path d="M35 12v26a2 2 0 0 1-2 2H10v1a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V12Z" fill="#f20505" class="fill-55aae1"></path></g><path d="M43 13H5a1 1 0 0 1 0-2h38a1 1 0 0 1 0 2ZM17 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0v14a1 1 0 0 1-1 1ZM31 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0v14a1 1 0 0 1-1 1ZM24 37a1 1 0 0 1-1-1V18a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1Z" fill="#f20505" class="fill-55aae1"></path><path d="M33 13H15a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v5a1 1 0 0 1-1 1Zm-17-2h16V7a1 1 0 0 0-1-1H17a1 1 0 0 0-1 1Z" fill="#f20505" class="fill-55aae1"></path></svg>
            </button>
        </td>
        
    </tr>
    `
        table.innerHTML = table.innerHTML + html 
          
    })
}

const getTurmas = async (textoPesquisa = null) => {
    let texto = ''

    if (textoPesquisa) {
        texto = `?q=${textoPesquisa}`
    }

    const response = await fetch ( `http://localhost:3000/mentores${texto}`)
    const turmas = await response.json()
    

    renderTurmas(turmas) // mostrar em tela os novos mentores
}
const editarturma = (id) => {
    window.location = `../html/editar.html?id=${id}`
}

const excluirturma = async (id) => {
    await fetch (`http://localhost:3000/turmas/${id}`,{
        method:'DELETE'
    })
}

pesquisa.addEventListener ('keyup', (e) => {
    if (e.key === 'Enter'){
        console.log ('O enter foi clicado')
        const texto = pesquisa.value
        console.log(texto)
        getTurmas(texto)
    }
})


getMentores()




