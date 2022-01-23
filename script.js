/* eslint-disable complexity */
const botaoCriarTarefa = document.getElementById('criar-tarefa');
const input = document.getElementById('texto-tarefa');
const listaDeTarefa = document.getElementById('lista-tarefas');
const tarefa = document.getElementsByTagName('li');
const botaoApagaTudo = document.getElementById('apaga-tudo');
const botaoApagaFinalizados = document.getElementById('remover-finalizados');
const botaoSalvarLista = document.getElementById('salvar-tarefas');
const botaoRemoveSelecionado = document.getElementById('remover-selecionado');
const botaoMoverCima = document.getElementById('mover-cima');
const botaoMoverBaixo = document.getElementById('mover-baixo');
const arrayDeTarefas = [];

// Requisito 7 e 8
function selecionarTarefa(event) {
  // eslint-disable-next-line no-restricted-syntax
  for (const valor of tarefa) {
    valor.style.removeProperty('background-color');
  }
  event.target.style.backgroundColor = 'rgb(128,128,128)';
  // eslint-disable-next-line no-restricted-syntax
  for (const valor of arrayDeTarefas) {
    if (valor.tarefa === event.target.innerText) {
      valor.selecionada = true;
    } else {
      valor.selecionada = false;
    }
  }
}

// Requisito 9
function riscarTarefa(event) {
  if (event.target.className === '') {
    event.target.className = 'completed';
  } else if (event.target.className === 'completed') {
    event.target.classList.remove('completed');
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const valor of arrayDeTarefas) {
    if (valor.tarefa === event.target.innerText) {
      if (valor.riscada === true) {
        valor.riscada = false;
      } else {
        valor.riscada = true;
      }
    }
  }
}

// Requisito 5 e 6
function inserirTarefa() {
  const linha = document.createElement('li');
  linha.innerText = input.value;
  arrayDeTarefas.push({
    tarefa: input.value,
    selecionada: false,
    riscada: false,
  });
  linha.addEventListener('click', selecionarTarefa);
  linha.addEventListener('dblclick', riscarTarefa);

  listaDeTarefa.appendChild(linha);
  input.value = '';
}

botaoCriarTarefa.addEventListener('click', inserirTarefa);

// Requisito 10
function apagarTudo() {
  for (let i = listaDeTarefa.children.length; i >= 0; i -= 1) {
    if (listaDeTarefa.children.length > 0) {
      listaDeTarefa.firstElementChild.remove();
    } else {
      break;
    }
  }
}

botaoApagaTudo.addEventListener('click', apagarTudo);

// Requisito 11
function removerFinalizados() {
  for (let i = tarefa.length - 1; i >= 0; i -= 1) {
    if (tarefa[i].className === 'completed') {
      listaDeTarefa.removeChild(tarefa[i]);
    }
  }
}

botaoApagaFinalizados.addEventListener('click', removerFinalizados);

// Requisito 12
function salvarLista() {
  localStorage.setItem('tarefa', JSON.stringify(arrayDeTarefas));
}

botaoSalvarLista.addEventListener('click', salvarLista);

function recuperarLista() {
  const arraySalvo = JSON.parse(localStorage.getItem('tarefa'));
  for (let i = 0; i < arraySalvo.length; i += 1) {
    const linha = document.createElement('li');
    linha.innerText = arraySalvo[i].tarefa;
    arrayDeTarefas.push(arraySalvo[i]);
    linha.addEventListener('click', selecionarTarefa);
    linha.addEventListener('dblclick', riscarTarefa);

    if (arraySalvo[i].selecionada) {
      linha.style.backgroundColor = 'rgb(128,128,128)';
    }
    if (arraySalvo[i].riscada) {
      linha.classList.add('completed');
    }
    listaDeTarefa.appendChild(linha);
  }
}

window.onload = function onLoad() {
  if (localStorage.length > 0) {
    recuperarLista();
  }
};

// Requisito 13
function moverParaCima() {
  for (let i = 0; i < tarefa.length; i += 1) {
    if (tarefa[i].style.backgroundColor === 'rgb(128, 128, 128)' && i > 0) {
      listaDeTarefa.insertBefore(tarefa[i], tarefa[i].previousSibling);
    }
  }
}

function moverParaBaixo() {
  for (let i = 0; i < tarefa.length; i += 1) {
    if (tarefa[i].style.backgroundColor === 'rgb(128, 128, 128)' && i < tarefa.length) {
      const tarefaReferencia = tarefa[i + 2];
      listaDeTarefa.insertBefore(tarefa[i], tarefaReferencia);
      break;
    }
  }
}

botaoMoverCima.addEventListener('click', moverParaCima);
botaoMoverBaixo.addEventListener('click', moverParaBaixo);

// Requisito 14
function removerSelecionado() {
  for (let i = 0; i < tarefa.length; i += 1) {
    if (tarefa[i].style.backgroundColor === 'rgb(128, 128, 128)') {
      listaDeTarefa.removeChild(tarefa[i]);
    }
  }
}

botaoRemoveSelecionado.addEventListener('click', removerSelecionado);
