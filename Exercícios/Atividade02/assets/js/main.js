// --- SELEÇÃO DE ELEMENTOS DO DOM ---
const inputTarefa = document.querySelector('.input-tarefa');// Campo de texto onde o usuário digita
const btnTarefa = document.querySelector('.btn-tarefa');    // Botão de adicionar tarefa
const tarefas = document.querySelector('.tarefas');         // Lista <ul> ou <ol> onde as tarefas vão entrar

/**
 * Cria um elemento de lista (li) vazio.
 * Isolada em uma função para reaproveitamento de código.
 */
function criaLi() {
    const li = document.createElement('li');
    return li;
}

// --- EVENTOS DE ENTRADA ---

// Ouve o teclado no campo de input
inputTarefa.addEventListener('keypress', function(e) {
    // Verifica se a tecla pressionada foi o 'Enter' (código 13)
    if (e.keyCode === 13) {
         if (!inputTarefa.value) return;// Se o campo estiver vazio, para a execução
        criaTarefa(inputTarefa.value);  // Cria a tarefa com o valor do input
    }
});

// Ouve o clique no botão de adicionar tarefa
btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;// Validação para não adicionar tarefa em branco
    criaTarefa(inputTarefa.value); // Envia o texto para a função principal
});

// --- FUNÇÕES AUXILIARES DE INTERFACE ---

/**
 * Limpa o campo de digitação e coloca o cursor piscando nele novamente.
 */
function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

/**
 * Cria o botão "Apagar" e o coloca colado ao lado do texto da tarefa.
 * @param {HTMLElement} li - O elemento li onde o botão será inserido.
 */
function criaBotaoApagar(li) {
    li.innerText += ' ';// Adiciona um espaço em branco após o texto da tarefa
    const botaoApagar = document.createElement('button');// Cria o elemento HTML <button>
    botaoApagar.innerText = 'Apagar'// Escreve o texto dentro do botão
    botaoApagar.setAttribute('class', 'apagar');// Adiciona a classe CSS 'apagar' para estilização e identificação
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');// Adiciona uma dica flutuante ao passar o mouse
    li.appendChild(botaoApagar);// Coloca o botão dentro do elemento <li>
}

/**
 * Função Orquestradora: Junta todas as pequenas funções para criar a tarefa na tela.
 */
function criaTarefa(textoInput) {
    const li = criaLi();      // 1. Cria a tag <li>
    li.innerText = textoInput // 2. Coloca o texto digitado dentro dela
    tarefas.appendChild(li);  // 3. Joga a <li> dentro da lista principal (ul)
    limpaInput();             // 4. Reseta o campo de texto
    criaBotaoApagar(li);      // 5. Adiciona o botão de deletar na li recém-criada
    salvarTarefas();          // 6. Atualiza o banco de dados local
}

// --- REMOÇÃO DE TAREFAS (Event Delegation) ---

// Em vez de escutar cada botão individual, escuta os cliques na página inteira
document.addEventListener('click', function(e){
    const el = e.target;// Captura exatamente o elemento que foi clicado

    // Se o elemento clicado tiver a classe 'apagar'
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();// Remove o elemento PAI do botão (que é a tag <li> inteira)
        salvarTarefas()// Atualiza o banco de dados, removendo-a do salvamento também
    }
});

// --- PERSISTÊNCIA DE DADOS (LocalStorage) ---

/**
 * Coleta todas as tarefas da tela e salva no LocalStorage do navegador.
 */
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');// Pega todas as <li> que estão na tela
    const listaDeTarefas = [];// Cria um array vazio para guardar apenas os textos

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;// Pega o texto da li (Texto da tarefa + a palavra 'Apagar')
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();// Remove a palavra 'Apagar' e os espaços extras
        listaDeTarefas.push(tarefaTexto);// Guarda o texto limpo no array
    }

    // O LocalStorage só aceita strings. JSON.stringify converte o array em uma string formatada.
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);// Salva no navegador com a chave 'tarefas'
}

/**
 * Recupere as tarefas salvas quando a página é aberta ou recarregada.
 */
function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');// Pega a string do LocalStorage
    const listaDeTarefas = JSON.parse(tarefas);// Converte a string JSON de volta para um Array de verdade
    
    // Recria cada tarefa na tela usando o loop
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

// Inicialização automática: Assim que o script carrega, lê o banco de dados local
adicionaTarefasSalvas();