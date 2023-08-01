const hiddenInputElement = document.getElementById('selectedMentoria');

const form = document.getElementById("form");

let mentoriaId = null;

const buscarMentor = async (id) => {
    const response = await fetch(`http://localhost:3000/mentores/${id}`);
    const mentor = await response.json();
    return mentor;
  };
  
  const buscarMentores = async () => {
    const response = await fetch(`http://localhost:3000/mentores`);
    const mentores = await response.json();
    console.log(buscarMentores)
    return mentores;
  };

  const carregarSelect = async () => {
    const mentores = await buscarMentores();
    const mentorSelect = document.getElementById('mentor');
    mentorSelect.innerHTML = '';
    const opcaoVazia = new Option('Selecione um mentor...', '');
    mentorSelect.options.add(opcaoVazia);
  
    mentores.forEach(mentor => {
      const opcao = new Option(mentor.nome, mentor.id); 
      mentorSelect.options.add(opcao);
    });
  };

  const getIdUrl = () => {
    const paramString = window.location.search;
    const params = new URLSearchParams(paramString);
    mentoriaId = params.get('id');
  };

  const buscarMentoria = async () => {
    const response = await fetch(`http://localhost:3000/mentorias/${mentoriaId}`);
    const mentoria = await response.json();
    return mentoria;
  };
  const editarMentoria = async (mentoria) => {
    await fetch(`http://localhost:3000/mentorias/${mentoriaId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentoria)
    })
    
    window.location = "mentorias.html";
}
const carregarDadosForm = async (mentoria) => {
    let mentor = ''
    if (mentoria.mentor.id) {
        mentor = mentoria.mentor.id
    } else {
        mentor = mentoria.mentor
    }

    document.getElementById('titulo').value = mentoria.titulo
    document.getElementById('mentor').value = mentor
    document.getElementById('status').checked = mentoria.status

  };

  const carregarDados = async () => {
    getIdUrl();
    const mentoria = await buscarMentoria();
    const mentores = await buscarMentores();
    await carregarSelect();
    carregarDadosForm(mentoria, mentores);


};

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const titulo = form.elements ['titulo'].value;
  const mentorId = form.elements ['mentor'].value
  const status = form.elements['status'].checked;

const mentorObjeto = await buscarMentor(mentorId)
    const mentoria = {
        titulo,
        mentor: {
            id: mentorObjeto.id,
            nome: mentorObjeto.nome
        },
        status
    }

    editarMentoria(mentoria)
})

carregarDados()



