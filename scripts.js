/*
  --------------------------------------------------------------------------------------
   ************************** Funções Medicamentos *************************************
  --------------------------------------------------------------------------------------
*/


/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/get_medicamentos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.medicamentos.forEach(item => insertList(item.medicine, item.posology, item.doctor, item.specialty))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputMedicine, inputPosology, inputDoctor, inputSpecialty) => {
  const formData = new FormData();
  formData.append('medicine', inputMedicine);
  formData.append('posology', inputPosology);
  formData.append('doctor', inputDoctor);
  formData.append('specialty', inputSpecialty);

  let url = 'http://127.0.0.1:5000/add_medicamento';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão de exclusão para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("button");
  let txt = document.createTextNode("x");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista clicando no botão Excluir
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que deseja excluir esse medicamento?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Medicamento excluído!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://localhost:5000/del_medicamento?medicine=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo medicamento, posologia, médico(a) e especialidade
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputMedicine = document.getElementById("newMedicine").value;
  let inputPosology = document.getElementById("newPosology").value;
  let inputDoctor = document.getElementById("newDoctor").value;
  let inputSpecialty = document.getElementById("newSpecialty").value;

  if (inputMedicine === '') {
    alert("Escreva o nome de um medicamento!");
  } if (inputPosology === '') {
    alert("Descreva como utilizar a medicação!");
  } if (inputDoctor === '') {
    alert("Escreva o nome do(a) médico(a)!");
  } if (inputSpecialty === '') {
    alert("Escreva uma especialidade!");
  } else {
    postItem(inputMedicine, inputPosology, inputDoctor, inputSpecialty)
    insertMedicine(inputMedicine, inputPosology, inputDoctor, inputSpecialty)
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para exibir medicamentos na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (medicine, posology, medic, specialty) => {
  var table = document.getElementById('myTable');
  var item = [medicine, posology, medic, specialty];
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1));
  document.getElementById("newMedicine").value = "";
  document.getElementById("newPosology").value = "";
  document.getElementById("newDoctor").value = "";
  document.getElementById("newSpecialty").value = "";

  removeElement();
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir medicamento na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertMedicine = (medicine, posology, medic, specialty) => {
  var table = document.getElementById('myTable');

  // Verifica se já existe um medicamento com o mesmo nome na lista
  if (isMedicineAlreadyInList(table, medicine)) {
    alert("Esse medicamento já está na lista.");
    return; // Não adiciona o medicamento se já existir
  }

  var item = [medicine, posology, medic, specialty];
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1));
  document.getElementById("newMedicine").value = "";
  document.getElementById("newPosology").value = "";
  document.getElementById("newDoctor").value = "";
  document.getElementById("newSpecialty").value = "";

  removeElement();
  alert("Medicamento inserido")

  // Atualiza a lista de consultas após um pequeno intervalo
  setTimeout(() => {
    shwList();
  }, 10)
}

/*
  --------------------------------------------------------------------------------------
  Função para verificar se o medicamento já está na lista
  --------------------------------------------------------------------------------------
*/
const isMedicineAlreadyInList = (table, medicine) => {
  var rowCount = table.rows.length;
  for (var i = 1; i < rowCount; i++) { // Começando de 1 para ignorar o cabeçalho
    var row = table.rows[i];
    var existingMedicine = row.cells[0].textContent.toLowerCase(); // Converte para letras minúsculas

    if (existingMedicine === medicine.toLowerCase()) {
      return true; // O medicamento já está na lista
    }
  }
  return false; // O medicamento não está na lista
}

/*
  --------------------------------------------------------------------------------------
  Função para rolar suavemente de volta ao topo da página
  --------------------------------------------------------------------------------------
*/
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/*
  --------------------------------------------------------------------------------------
  Função para limpar a tabela (não exclui do banco de dados)
  --------------------------------------------------------------------------------------
*/
function clsList() {
  var rowCount = myTable.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    myTable.deleteRow(i);
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para exibir a lista de medicamentos sem repetí-la
  --------------------------------------------------------------------------------------
*/
function shwList() {
  var rowCount = myTable.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    myTable.deleteRow(i);
  }
  getList()
}

/*
  --------------------------------------------------------------------------------------
  Função para buscar medicamento
  --------------------------------------------------------------------------------------
*/
const searchMedicine = () => {
  let srchMedicine = document.getElementById("srchMedicine").value;
  if (srchMedicine === '') {
    alert("Escreva o nome de um medicamento!");
  } else {
    var rowCount = myTable.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
      myTable.deleteRow(i);
    }
    getMedicine(srchMedicine);
    // Limpar campo de pesquisa após pesquisa bem-sucedida
    document.getElementById("srchMedicine").value = "";
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para buscar medicamento via requisição GET
  --------------------------------------------------------------------------------------
*/
const getMedicine = async (srchMedicine) => {
  let url = `http://localhost:5000/get_medicamento?medicine=${srchMedicine}`;
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.medicine) {
        insertList(data.medicine, data.posology, data.doctor, data.specialty);
      } else {
        alert("Nenhum medicamento encontrado.");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Variável para rastrear o estado da pesquisa (exibida ou oculta)
  --------------------------------------------------------------------------------------
*/
let isSearchVisible = false;

/*
  --------------------------------------------------------------------------------------
  Variável para rastrear o estado de inserir Medicamento
  --------------------------------------------------------------------------------------
*/
let isInsertMedicineVisible = false;

/*
  --------------------------------------------------------------------------------------
  Função para atualizar lista
  --------------------------------------------------------------------------------------
*/
function toggleList() {
  const listSection = document.querySelector(".items");
  const toggleListButton = document.getElementById("toggleListButton");
    shwList(); // Chama a função para exibir a lista    
}

/*
  --------------------------------------------------------------------------------------
  Função para alternar a exibição/ocultação da pesquisa
  --------------------------------------------------------------------------------------
*/

function toggleSearchBox() {
  const searchBox = document.getElementById("searchBox");
  const toggleSearchButton = document.getElementById("toggleSearchButton");

  if (isSearchVisible) {
    // Se a pesquisa estiver visível, oculta ela
    searchBox.style.display = "none";
    toggleSearchButton.textContent = "Pesquisar Medicamento";
  } else {
    // Se a pesquisa estiver oculta, exibe ela
    searchBox.style.display = "block";
    toggleSearchButton.textContent = "Ocultar Pesquisar Medicamento";
  }

  // Inverte o estado da pesquisa
  isSearchVisible = !isSearchVisible;
}

/*
  --------------------------------------------------------------------------------------
  Função para alternar a exibição/ocultação do formulário de inserção
  --------------------------------------------------------------------------------------
*/

function toggleInsertMedicine() {
  const insertMedicineForm = document.querySelector(".newItem");
  const insertMedicineButton = document.getElementById("insertMedicineButton");

  if (isInsertMedicineVisible) {
    insertMedicineForm.style.display = "none"; // Oculta o formulário de inserção
    insertMedicineButton.textContent = "Inserir Medicamento"; // Altera o texto do botão
  } else {
    insertMedicineForm.style.display = "block"; // Exibe o formulário de inserção
    insertMedicineButton.textContent = "Ocultar Inserir Medicamento"; // Altera o texto do botão
  }

  // Inverte o estado do formulário de inserção
  isInsertMedicineVisible = !isInsertMedicineVisible;
}

/*
  --------------------------------------------------------------------------------------
   *********************** Funções Agenda de Consultas *********************************
  --------------------------------------------------------------------------------------
*/

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getListConsult = async () => {
  let url = 'http://127.0.0.1:5000/get_consultas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.consultas.forEach(item => insertListConsult(item.id, item.doctor_name, item.specialty, item.date, item.time))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postConsult = async (inputDoctor_name, inputSpecialty, inputDate, inputTime) => {
  // Formata a data no formato dd/mm/aaaa
  const formattedDate = inputDate.split('-').reverse().join('/');

  const formData = new FormData();
  formData.append('doctor_name', inputDoctor_name);
  formData.append('specialty', inputSpecialty);
  formData.append('date', formattedDate); // Envia a data formatada
  formData.append('time', inputTime);

  let url = 'http://127.0.0.1:5000/add_consulta';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para atualizar uma consulta no servidor via requisição PUT
  --------------------------------------------------------------------------------------
*/
const putConsult = async (id, doctor_name, specialty, dateInput, time) => {
  // Formatar a data para o formato dd/mm/yyyy
  const [yyyy, mm, dd] = dateInput.split('-');
  const formattedDate = `${dd}/${mm}/${yyyy}`;

  // Montar os dados da requisição usando FormData
  const formData = new FormData();
  formData.append('id', id); // Inclui o ID no FormData
  formData.append('doctor_name', doctor_name);
  formData.append('specialty', specialty);
  formData.append('date', formattedDate);
  formData.append('time', time);

  // Construir a URL da requisição
  let url = `http://localhost:5000/update_consulta?id=${id}`;

  // Enviar a requisição PUT para atualizar a consulta
  const response = await fetch(url, {
    method: 'PUT',
    body: formData
  });

  return response;
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão de exclusão para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertBtnCancel = (parent) => {
  let span = document.createElement("button");
  let txt = document.createTextNode("X");
  span.className = "cancelar";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão de edição para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertBtnEdit = (parent) => {
  let span = document.createElement("button");
  let txt = document.createTextNode("Editar");
  span.className = "editar";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteConsult = (item) => {
  let url = 'http://localhost:5000/del_consulta_id?id=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar uma nova consulta
  --------------------------------------------------------------------------------------
*/
const newConsult = async () => {
  let inputDoctor_name = document.getElementById("newDoctor_name").value;
  let inputSpecialty = document.getElementById("newSpclty").value;
  let inputDate = document.getElementById("newDate").value;
  let inputTime = document.getElementById("newTime").value;

  // Verifica se todos os campos estão preenchidos
  if (inputDoctor_name === "" || inputSpecialty === "" || inputDate === "" || inputTime === "") {
    alert("Por favor, preencha todos os campos para agendar uma consulta.");
    return;
  }

  // Chama a função para adicionar consulta
  postConsult(inputDoctor_name, inputSpecialty, inputDate, inputTime);

  // Limpa os campos após inserção bem-sucedida
  document.getElementById("newDoctor_name").value = "";
  document.getElementById("newSpclty").value = "";
  document.getElementById("newDate").value = "";
  document.getElementById("newTime").value = "";

  // Atualiza a lista de consultas após um pequeno intervalo
  setTimeout(() => {
    showListConsult();
  }, 100); // 100 milissegundos
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir uma consulta na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertListConsult = (id, doctor_name, specialty, date, time) => {
  var table = document.getElementById('consultTable');
  var row = table.insertRow();

  // Insere os dados da consulta nas células da linha
  var celId = row.insertCell(0);
  celId.textContent = id;

  var celDoctorName = row.insertCell(1);
  celDoctorName.textContent = doctor_name;

  var celSpecialty = row.insertCell(2);
  celSpecialty.textContent = specialty;

  var celDate = row.insertCell(3);
  celDate.textContent = date;

  var celTime = row.insertCell(4);
  celTime.textContent = time;

  // Insere botões de edição, cancelamento e agenda
  var celEdit = row.insertCell(5);
  insertBtnEdit(celEdit);

  var celCancel = row.insertCell(6);
  insertBtnCancel(celCancel);

  var celAgenda = row.insertCell(7);
  insertBtnAgenda(celAgenda);

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um evento para o botão de cancelamento
  --------------------------------------------------------------------------------------
*/
celCancel.querySelector('.cancelar').addEventListener('click', async function() {
  if (confirm("Você tem certeza que deseja excluir essa consulta?")) {
    const row = this.parentNode.parentNode; 
    const id = row.cells[0].innerText.trim();

    try {
      console.log('Iniciando exclusão da consulta e do evento do Google Calendar...');
      
      // Remove a linha da tabela visualmente
      row.remove();
      console.log('Linha da tabela removida visualmente.');

      // Deleta o evento do Google Calendar
      const deletedFromCalendar = await deleteEventByTableRowId(id);
      console.log('Resultado da exclusão do evento do Google Calendar:', deletedFromCalendar);

      // Deleta a consulta do servidor
      const deletedFromServer = await deleteConsult(id);
      console.log('Resultado da exclusão da consulta do servidor:', deletedFromServer);

      // Exibe um alerta de sucesso
      alert("Consulta excluída com sucesso!");
    } catch (error) {
      console.error('Erro ao excluir consulta:', error);
      alert("Erro ao excluir consulta.");
    }
  }
});
}

/*
  --------------------------------------------------------------------------------------
  Função para limpar a tabela de consultas (não exclui do banco de dados)
  --------------------------------------------------------------------------------------
*/
function clearConsultList() {
  var rowCount = consultTable.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    consultTable.deleteRow(i);
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para exibir a lista de consultas sem repeti-las
  --------------------------------------------------------------------------------------
*/
function showListConsult() {
  clearConsultList(); // Limpa a lista atual de consultas
  getListConsult(); // Obtém e exibe a lista atualizada de consultas do servidor
}

/*
  --------------------------------------------------------------------------------------
   Localiza a tabela de consultas
  --------------------------------------------------------------------------------------
*/
const consultTable = document.getElementById('consultTable');

/*
  --------------------------------------------------------------------------------------
   Localiza os formulários de adicionar e editar consulta
  --------------------------------------------------------------------------------------
*/
const newConsultForm = document.querySelector('.newConsult');
const editConsultForm = document.querySelector('.editConsult');

/*
  --------------------------------------------------------------------------------------
  Adiciona um ouvinte de evento de clique botão Editar
  --------------------------------------------------------------------------------------
*/
consultTable.addEventListener('click', function(event) {
  // Verifica se o clique ocorreu em um botão de edição
  if (event.target.classList.contains('editar')) {
    // Obtém a linha (tr) onde o botão foi clicado
    const row = event.target.parentNode.parentNode;
    
    // Obtém os dados da linha
    const id = row.cells[0].innerText.trim(); // ID na primeira célula 
    
    // Limpa os campos do formulário de adicionar consulta
    document.getElementById('newDoctor_name').value = '';
    document.getElementById('newSpclty').value = '';
    document.getElementById('newDate').value = '';
    document.getElementById('newTime').value = '';

    // Oculta o formulário de adicionar consulta
    newConsultForm.style.display = 'none';

    // Preenche o formulário de edição com os dados da consulta selecionada
    document.getElementById('editId').value = id;
    document.getElementById('editId').style.display = 'none'; // Oculta o campo de ID

    document.getElementById('editDoctor_name').value = row.cells[1].innerText.trim(); 
    document.getElementById('editSpclty').value = row.cells[2].innerText.trim(); 

    // Formata a data para o formato "dd/mm/aaaa" para o input type="date"
    const dateParts = row.cells[3].innerText.trim().split('/');
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    document.getElementById('editDate').value = formattedDate;

    document.getElementById('editTime').value = row.cells[4].innerText.trim(); 

    // Verifica no localStorage se existe um item com a chave "event-<id>"
    const cachedEvent = checkLocalStorageForEvent(id);
    if (cachedEvent) {
      document.getElementById('IdGoogle').value = cachedEvent.id || '';
      document.getElementById('IdGoogle').style.display = 'none'; // Oculta o campo de IdGoogle
      document.getElementById('eTagGoogle').value = cachedEvent.etag || '';
      document.getElementById('eTagGoogle').style.display = 'none'; // Oculta o campo de IdGoogle
    } else {
      document.getElementById('IdGoogle').value = '';
      document.getElementById('IdGoogle').style.display = 'none'; // Oculta o campo de IdGoogle
      document.getElementById('eTagGoogle').value = '';
      document.getElementById('eTagGoogle').style.display = 'none'; // Oculta o campo de eTagGoogle
    }
    // Exibe o formulário de edição
    editConsultForm.style.display = 'block';
  }
});
/*
  --------------------------------------------------------------------------------------
  Adiciona um ouvinte para o botão "Cancelar Edição"
  --------------------------------------------------------------------------------------
*/
const cancelEditButton = document.getElementById('cancelEditConsultButton');
cancelEditButton.addEventListener('click', function() {
 
  // Limpa os campos do formulário de edição
  document.getElementById('editId').value = '';
  document.getElementById('editDoctor_name').value = '';
  document.getElementById('editSpclty').value = '';
  document.getElementById('editDate').value = '';
  document.getElementById('editTime').value = '';

  // Oculta o formulário de edição
  editConsultForm.style.display = 'none';

  // Exibe o formulário de adicionar consulta
  newConsultForm.style.display = 'block';
});

/*
  --------------------------------------------------------------------------------------
  Função para Verificar o LocalStorage
  --------------------------------------------------------------------------------------
*/
function checkLocalStorageForEvent(id) {
  try {
    console.log('Iniciando processo de verificação para a linha da tabela:', id);

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('event-')) {
        const eventInfo = JSON.parse(localStorage.getItem(key));
        if (eventInfo.tableRowId === id) {
          console.log(`Evento encontrado no LocalStorage para a chave ${key}:`, eventInfo);
          return eventInfo;
        }
      }
    }

    console.log('Não há consulta sincronizada com o Google Agenda para a tableRowId:', id);
    return null;
  } catch (error) {
    console.error('Erro ao verificar o LocalStorage:', error);
    return null;
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para atualizar uma consulta no Servidor a partir dos dados do formulário
  --------------------------------------------------------------------------------------
*/
const updateConsult = async () => {
  try {
    // Obtém os valores dos campos do formulário de edição
    let id = document.getElementById('editId').value.trim(); // Mantém o valor do ID como está
    let doctor_name = document.getElementById('editDoctor_name').value.trim();
    let specialty = document.getElementById('editSpclty').value.trim();
    let dateInput = document.getElementById('editDate').value;
    let time = document.getElementById('editTime').value;

    // Validar campos obrigatórios
    if (!doctor_name || !specialty || !dateInput || !time) {
      alert('Todos os campos são obrigatórios.');
      return;
    }

    // Confirmar a ação de edição
    const confirmacao = window.confirm('Tem certeza que deseja editar a consulta?');

    if (!confirmacao) {
      return;
    }

/*
  --------------------------------------------------------------------------------------
  Função para verificar se há eTag e Id do Google Calendar 
  --------------------------------------------------------------------------------------
*/
    const eventInfo = checkLocalStorageForEvent(id);
    if (eventInfo && eventInfo.etag && eventInfo.id) {
      await updateGoogleCalendarEvent();
    }
    // Chama a função putConsult para enviar a requisição PUT
    const response = await putConsult(id, doctor_name, specialty, dateInput, time);

    // Verificar se a requisição foi bem-sucedida
    if (response.ok) {
      // Processar a resposta JSON
      const responseData = await response.json();
      console.log('Consulta atualizada:', responseData);
      alert('Consulta atualizada com sucesso!');

      // Atualiza a lista de consultas na interface
      showListConsult();

      // Limpar campos do formulário de edição após a atualização
      document.getElementById('editId').value = '';
      document.getElementById('editDoctor_name').value = '';
      document.getElementById('editSpclty').value = '';
      document.getElementById('editDate').value = '';
      document.getElementById('editTime').value = '';

      // Ocultar formulário de edição após a atualização
      editConsultForm.style.display = 'none';

      // Exibir o formulário de adicionar consulta novamente
      newConsultForm.style.display = 'block';

    } else {
      // Exibir mensagem de erro caso a requisição falhe
      const errorData = await response.json();
      console.error('Erro ao atualizar consulta:', errorData);
      alert('Erro ao atualizar consulta: ' + errorData.mensagem);
    }
  } catch (error) {
    // Exibir mensagem de erro genérico caso ocorra uma exceção
    console.error('Erro ao atualizar consulta:', error);
    alert('Erro ao atualizar consulta.');
  }
};

/*
  --------------------------------------------------------------------------------------
  Função para realizar login pelo Auth0
  --------------------------------------------------------------------------------------
*/

// Variável para armazenar o cliente Auth0
let auth0 = null;

// Configurações do Auth0
const config = {
    domain: '[SUBSTITUA PELO DOMÍNIO AUTH0]', // Substituir pelo 'domain' do Auth0
    client_id: '[SUBSTITUA PELO CLIENT ID AUTH0]]', // Substituir pelo 'client_id' do Auth0
    redirect_uri: 'http://localhost:8000/#home', // Redirecionar para home após o login
    cacheLocation: 'localstorage' // Armazenar token no localStorage
};

// Função para configurar o cliente Auth0
const configureClient = async () => {
    auth0 = await createAuth0Client(config);
};

// Função para realizar login ao clicar no botão de login
const login = async () => {
    await auth0.loginWithRedirect();
};

// Função para realizar logout ao clicar no botão de logout
const logout = async () => {
    await auth0.logout({
        returnTo: 'http://localhost:8000/#index'
    });
};

// Função para verificar o estado de autenticação ao carregar a página
const handleAuthentication = async () => {
    try {
        await auth0.handleRedirectCallback();
        
        // Obter o token de acesso
        const token = await auth0.getTokenSilently();
        
        // Log do token obtido
        console.log('Token obtido:', token);
        
    } catch (error) {
        console.error('Erro ao processar o redirecionamento de autenticação', error);
    }

    // Atualizar a interface de usuário após o login
    await updateUI();
}

/*
  --------------------------------------------------------------------------------------
  Função para atualizar a interface de usuário com base no estado de autenticação
  --------------------------------------------------------------------------------------
*/
const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();

    // Mostrar ou ocultar os links do menu com base no estado de autenticação
    document.getElementById('homeLink').style.display = isAuthenticated ? 'inline-block' : 'none';
    document.getElementById('medicamentoLink').style.display = isAuthenticated ? 'inline-block' : 'none';
    document.getElementById('agendaLink').style.display = isAuthenticated ? 'inline-block' : 'none';
    document.getElementById('logoutButton').style.display = isAuthenticated ? 'inline-block' : 'none';
    document.getElementById('indexLink').style.display = isAuthenticated ? 'none' : 'inline-block';

    // Esconder a seção de login se o usuário estiver autenticado
    document.getElementById('index').style.display = isAuthenticated ? 'none' : 'block';

    // Exibir a seção ativa do localStorage
    const activeSection = localStorage.getItem("activeSection");
    if (isAuthenticated && activeSection) {
        showSection(activeSection);
    } else if (isAuthenticated) {
        showSection('home'); // Mostrar a seção home por padrão após o login
    } else {
        // Ocultar todas as seções se o usuário não estiver autenticado
        const sections = document.querySelectorAll('.container');
        sections.forEach(section => {
            section.style.display = 'none';
        });
    }
};

/*
  --------------------------------------------------------------------------------------
  Função para mostrar a sessão ativa
  --------------------------------------------------------------------------------------
*/
function showSection(sectionId) {
    const sections = document.querySelectorAll('.container');

    // Oculta todas as seções
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Exibe a seção específica
    document.getElementById(sectionId).style.display = 'block';

    // Verifica se é a seção de cadastro de medicamento para mostrar a lista de medicamentos
    if (sectionId === "cadastrar-medicamento") {
        shwList(); // Corrigir para showList() se necessário
    }

    // Verifica se é a seção de agenda de consultas para mostrar a lista de consultas
    if (sectionId === "agenda-de-consultas") {
        showListConsult(); // Corrigir para showListConsult() se necessário
    }

    // Salva a seção ativa no localStorage
    localStorage.setItem("activeSection", sectionId);
}

// Ao carregar a página, inicializa o cliente Auth0 e verifica o estado de autenticação
document.addEventListener("DOMContentLoaded", async () => {
    await configureClient();

    // Verifica se a URL contém um código de autenticação
    if (window.location.search.includes('code=')) {
        await handleAuthentication();
        window.history.replaceState({}, document.title, "/"); // Limpa o código da URL
    } else {
        // Verifica o estado de autenticação se não houver redirecionamento
        await updateUI();
    }
});

/*
  --------------------------------------------------------------------------------------
  Função para alternar entre as seções do menu
  --------------------------------------------------------------------------------------
*/
function toggleSection(sectionId) {
  // Oculta todas as seções exceto a seção selecionada
  document.querySelectorAll(".container").forEach(function(container) {
    container.style.display = "none";
  });
  
  // Exibe a seção selecionada
  document.getElementById(sectionId).style.display = "block";
  
  // Salva a seção ativa no localStorage
  localStorage.setItem("activeSection", sectionId);
}

// Ao carregar a página, verifica se há uma seção ativa no localStorage e a exibe
document.addEventListener("DOMContentLoaded", function() {
  const activeSection = localStorage.getItem("activeSection");

  // Verifica se há um fragmento de URL para determinar a seção inicial
  const fragment = window.location.hash.substr(1);
  const initialSection = fragment || activeSection;

  // Mostra a seção inicial
  if (initialSection) {
    showSection(initialSection);
  } else {
    // Se nenhuma seção inicial estiver definida, mostra a seção padrão (index, por exemplo)
    showSection('index');
  }
});

/*
  --------------------------------------------------------------------------------------
  Função para carregar a biblioteca Google Identity Services
  --------------------------------------------------------------------------------------
*/
const loadGoogleIdentityServices = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = resolve;
    document.head.appendChild(script);
  });
};

/*
  --------------------------------------------------------------------------------------
  Função para autenticar o usuário com o Google e obter o token de acesso
  --------------------------------------------------------------------------------------
*/
const authenticateWithGoogle = async () => {
  return new Promise((resolve, reject) => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: '[SUBSTITUIR PELO ID DE CLIENTE DO GOOGLE CALENDAR]', // Substituir pelo 'client_id' da API Google Calendar
      scope: 'https://www.googleapis.com/auth/calendar.events',
      callback: (response) => {
        if (response.error) {
          reject(response);
        } else {
          const accessToken = response.access_token;
          localStorage.setItem('googleAccessToken', accessToken); // Salvar o token no localStorage
          resolve(accessToken);
        }
      },
    });

    client.requestAccessToken();
  });
};

/*
--------------------------------------------------------------------------------------
Função para criar um botão do Google Agenda
--------------------------------------------------------------------------------------
*/
const insertBtnAgenda = (parent) => {
  let button = document.createElement("button");
  button.className = "agnd"; // Certifique-se de que a classe aqui corresponde à verificação no evento de clique
  button.textContent = "Sincronizar";
  parent.appendChild(button);
};

/*
--------------------------------------------------------------------------------------
Função para formatar os eventos e enviar para o Google Calendar
--------------------------------------------------------------------------------------
*/

consultTable.addEventListener('click', async function(event) {
  if (event.target.classList.contains('agnd')) {
    const row = event.target.parentNode.parentNode;
    const id = row.cells[0].innerText.trim();
    const doctorName = row.cells[1].innerText.trim();
    const specialty = row.cells[2].innerText.trim();
    const dateParts = row.cells[3].innerText.trim().split('/');
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    const time = row.cells[4].innerText.trim();

    try {
      console.log('Botão do Google Agenda clicado. Iniciando verificação e criação de evento no Google Calendar...');
      console.log('Dados para verificar e criar evento:', { doctorName, specialty, date: formattedDate, time });

      const startDateTime = new Date(`${formattedDate}T${time}`);
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

      const eventData = {
        summary: `Consulta com ${doctorName}`,
        description: `Especialidade: ${specialty}`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'America/Sao_Paulo'
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'America/Sao_Paulo'
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'popup', minutes: 60 }
          ]
        }
      };

      await loadGoogleIdentityServices();
      const googleAccessToken = await authenticateWithGoogle();

      // Verificar se o evento já existe no LocalStorage
      const localStorageKey = `event-${eventData.summary}-${eventData.start.dateTime}`;
      const cachedEvent = JSON.parse(localStorage.getItem(localStorageKey));

      if (cachedEvent && cachedEvent.etag) {
        // Verificar se o evento já existe no Google Calendar com base no ETag
        const eventExists = await checkEventByEtag(googleAccessToken, cachedEvent.id, cachedEvent.etag);

        if (eventExists) {
          console.log('Evento já existe no Google Calendar. Não criando um novo evento.');
          alert('Este evento já foi sincronizado anteriormente.');
          return; // Não faz nada se o evento já estiver no Google Calendar
        }
      }

      const createdEvent = await createEventOnGoogleCalendar(googleAccessToken, eventData);
      console.log('Novo evento criado com sucesso no Google Calendar:', createdEvent);

      // Salvar evento e ETag no LocalStorage
      const eventToCache = {
        id: createdEvent.id,
        etag: createdEvent.etag,
        tableRowId: id // Incluindo o ID da linha da tabela
      };
      localStorage.setItem(localStorageKey, JSON.stringify(eventToCache));
      
      // Mensagem de log dos dados salvos no localStorage
      console.log('Dados salvos no LocalStorage:', eventToCache);

      alert('Novo evento criado com sucesso no Google Calendar.');
    } catch (error) {
      console.error('Erro ao verificar ou criar evento no Google Calendar:', error);
      alert('Erro ao verificar ou criar evento no Google Calendar.');
    }
  }
});

/*
--------------------------------------------------------------------------------------
Função GET para verificar se o evento existe no Google Calendar com base no ETag
--------------------------------------------------------------------------------------
*/
async function checkEventByEtag(googleAccessToken, eventId, etag) {
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${googleAccessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar evento: ${response.status} - ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Resposta da verificação de evento por ETag:', responseData);

    // Verificar se o ETag do evento no Google Calendar é o mesmo do evento armazenado
    return responseData.etag === etag;
  } catch (error) {
    console.error('Erro ao verificar evento por ETag no Google Calendar:', error);
    throw error;
  }
}

/*
--------------------------------------------------------------------------------------
Função POST para criar um evento no Google Calendar
--------------------------------------------------------------------------------------
*/
async function createEventOnGoogleCalendar(googleAccessToken, eventData) {
  const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${googleAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar evento: ${response.status} - ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Resposta do Google Calendar:', responseData);
    return responseData;
  } catch (error) {
    console.error('Erro ao criar evento no Google Calendar:', error);
    throw error;
  }
}

/*
--------------------------------------------------------------------------------------
Função para formatar um evento a ser deletado no Google Calendar
--------------------------------------------------------------------------------------
*/
async function deleteEventByTableRowId(tableRowId) {
  try {
    console.log('Iniciando processo de deleção para a linha da tabela:', tableRowId);

    // Verifica se há algum evento no LocalStorage correspondente à tableRowId
    let cachedEvent = null;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('event-')) {
        const eventInfo = JSON.parse(localStorage.getItem(key));
        if (eventInfo.tableRowId === tableRowId) {
          cachedEvent = eventInfo;
          console.log(`Evento encontrado no LocalStorage para a chave ${key}:`, cachedEvent);
          break;
        }
      }
    }

    // Se não encontrou nenhum evento correspondente, avisa no console e retorna
    if (!cachedEvent) {
      console.log('Não há consulta sincronizada com o Google Agenda para a tableRowId:', tableRowId);
      return;
    }

    // Obter o token de acesso do Google
    const googleAccessToken = await authenticateWithGoogle();
    console.log('Token de acesso obtido:', googleAccessToken);

    // Deletar o evento no Google Calendar usando o ETag e ID do evento
    const deleteResult = await deleteEventOnGoogleCalendar(googleAccessToken, cachedEvent.id, cachedEvent.etag);

    // Verificar o resultado da exclusão do evento no Google Calendar
    if (deleteResult) {
      // Remover o evento do LocalStorage apenas se a exclusão no Google Calendar foi bem-sucedida
      const localStorageKey = `event-${tableRowId}`;
      localStorage.removeItem(localStorageKey);
      console.log('Evento removido do LocalStorage:', localStorageKey);
    } else {
      console.error('Erro ao deletar evento no Google Calendar.');
    }
  } catch (error) {
    console.error('Erro ao deletar consulta:', error);
  }
}

/*
--------------------------------------------------------------------------------------
Função para deletar evento no Google Calendar
--------------------------------------------------------------------------------------
*/
async function deleteEventOnGoogleCalendar(googleAccessToken, eventId, eventEtag) {
  try {
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ etag: eventEtag }),
    });

    if (response.ok) {
      console.log('Evento deletado com sucesso do Google Calendar.');
      return true;
    } else {
      console.error('Erro ao deletar evento do Google Calendar:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Erro ao deletar evento do Google Calendar:', error);
    return false;
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para atualizar a consulta no Google Calendar
  --------------------------------------------------------------------------------------
*/
const updateGoogleCalendarEvent = async () => {
  // Obter o token de acesso do Google
  const googleAccessToken = await authenticateWithGoogle();
  console.log('Token de acesso obtido:', googleAccessToken);

  // Obter os dados do formulário de edição
  const eventId = document.getElementById('IdGoogle').value;
  const etag = document.getElementById('eTagGoogle').value;
  const summary = document.getElementById('editDoctor_name').value;
  const description = document.getElementById('editSpclty').value;
  const date = document.getElementById('editDate').value;
  const time = document.getElementById('editTime').value;

  // Criar objeto Date para o horário de início
  const startDateTime = new Date(`${date}T${time}:00`);
  // Criar objeto Date para o horário de término (1 hora depois)
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

  const event = {
    summary: `Consulta com ${summary}`,
    description: `Especialidade: ${description}`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'America/Sao_Paulo'
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'America/Sao_Paulo'
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 60 }
      ]
    }
  };

  /*
  --------------------------------------------------------------------------------------
  Função PUT para atualizar a consulta no Google Calendar
  --------------------------------------------------------------------------------------
*/
  try {
    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${googleAccessToken}`,
        'Content-Type': 'application/json',
        'If-Match': etag
      },
      body: JSON.stringify(event)
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar o evento no Google Calendar: ${response.statusText}`);
    }

    const updatedEvent = await response.json();
    console.log('Evento atualizado no Google Calendar:', updatedEvent);

    // Atualiza o localStorage com os novos dados do evento
    localStorage.setItem(`event-${updatedEvent.id}`, JSON.stringify({
      id: updatedEvent.id,
      etag: updatedEvent.etag,
      tableRowId: document.getElementById('editId').value
    }));

    alert('Consulta atualizada com sucesso no Google Calendar.');
  } catch (error) {
    console.error('Erro ao atualizar o evento no Google Calendar:', error);
    alert('Erro ao atualizar o evento no Google Calendar.');
  }
};