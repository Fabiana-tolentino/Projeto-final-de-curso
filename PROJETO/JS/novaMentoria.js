const form = document.getElementById("form")


const buscarMentoria = async (id) => {
  const response = await fetch (`https://api-projeto-final-de-curso-g2z0.onrender.commentorias/${id}`)
  const mentoria = await response.json()
  return mentoria
}

const buscarMentorias = async () => {
  const response = await fetch (`https://api-projeto-final-de-curso-g2z0.onrender.commentorias`)
  const mentorias = await response.json()
  return mentorias
}

const carregarSelect = async () => {
  const mentorias = await buscarMentorias();
  const mentoriaSelect = document.getElementById('mentoria');

  mentoriaSelect.innerHTML = '';

  const opcaoVazia = new Option('Selecione um mentor...', '');
  mentoriaSelect.options.add(opcaoVazia);

  mentorias.forEach(mentoria => {
    const opcao = new Option(mentoria.nome, mentoria.id);
    mentoriaSelect.options.add(opcao);
  });
}

const newMentor = async (mentor) => {
  await fetch (`https://api-projeto-final-de-curso-g2z0.onrender.commentorias`, {
    method: 'POST',
    headers: {
      "Accept": "application/json, text/plain, */* ",
        "Content-Type": "application/json"
      },
      // convertendo para uma string
      body: JSON.stringify(mentor)
  })
  window.location = "mentorias.html" 
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = form.elements["titulo"].value;
  const mentoria = form.elements["mentor"].value;
  const status = form.elements["status"].checked;

  const mentoriaObjeto = await buscarMentoria(mentoria);

  const mentor = {
    titulo,
    mentor: {
      id: mentoriaObjeto.id,
      nome: mentoriaObjeto.nome
    },
    status,
  };

  newMentor(mentor);
});

  carregarSelect()



 

