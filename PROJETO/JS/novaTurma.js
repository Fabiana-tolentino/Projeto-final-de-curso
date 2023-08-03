const form = document.getElementById("form")

form.addEventListener("submit", (e) => {
    e.preventDefault() // tira o comportamento padrao de enviar para o back, pois será tratado aqui os dados
    //pegando as infos
    const mentoria  = form.elements["mentoria"].value
    const mentor    = form.elements["mentor"].value
    const data      = form.elements["data"].value
    const diaSemana = form.elements["diaSemana"].value
    const horaIni   = form.elements["horaIni"].value
    const horaFim   = form.elements["horaFim"].value
    const turm      = form.elements["turm"].value
    const link      = form.elements["link"].value
    const encontros = form.elements["encontros"].value

    const turmas ={
        mentoria,
        mentor,
        data,
        diaSemana,
        horaIni,
        horaFim,
        turm,
        link,
        encontros
    }
    
    newTurma(turmas)
})
  // cria uma nova função para aparecer o post para a api

const newTurma =async (turma) =>{ // escuta de evento
// o URL é o primeiro parametro, depois passa o segundo parametro para especificar
// qual o método e como será a requisição. 
await fetch ("https://api-projeto-final-de-curso-g2z0.onrender.comturmas", {
    method: "POST",
    headers: {
        "Accept": "application/json, text/plain, */* ",
        "Content-Type": "application/json"
    },
    // convertendo para uma string
    body: JSON.stringify(turma)
})
// para redirecionar para a tela de listagem, quando o novo mentor for criado
window.location = "turmas.html" 
} 
