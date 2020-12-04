// Simplificação do document.querySelector;
const search = element => document.querySelector(element);

// Variaveis de controle de ambiente
let seuVotoPara = search('.left-1 span');
let cargo = search('.left-2 span');
let descricao = search('.left-4');
let aviso = search('.divisao-2');
let lateral = search('.divisao-1-right');
let numeros = search('.left-3');

// Variaveis de controle lógico
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

const comecarEtapa = () => {
  let etapa = etapas[etapaAtual];
  let numeroHTML = '';

  numero = '';
  votoBranco = false;

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHTML += '<div class="numero pisca"></div>'
    } else {
      numeroHTML += '<div class="numero"></div>'
    };
  };

  seuVotoPara.style.display = 'none';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  lateral.innerHTML = '';
  numeros.innerHTML = numeroHTML;
};

const atualizaInterface = () => {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numero) {
      return true;
    } else {
      return false;
    };
  });

  seuVotoPara.style.display = 'flex';
  aviso.style.display = 'flex';

  if (candidato.length > 0) {
    candidato = candidato[0];
    descricao.innerHTML = `
      <span>Nome: ${candidato.nome}</span>
      <span>Partido: ${candidato.partido}</span>
    `;

    let fotosHtml = '';

    for (let i in candidato.fotos) {
      if (candidato.fotos[i].small) {
        fotosHtml += `
          <div class="divisao-1-image small">
            <img src="./images/${candidato.fotos[i].url}" alt="Candidato 84">
            ${candidato.fotos[i].legenda}
          </div>
        `;
      } else {
        fotosHtml += `
          <div class="divisao-1-image">
            <img src="./images/${candidato.fotos[i].url}" alt="Candidato 84">
            ${candidato.fotos[i].legenda}
          </div>
        `;
      }
    };

    lateral.innerHTML = fotosHtml;
  } else {
    descricao.innerHTML = `<div class="aviso--grande pisca">Voto Nulo</div>`;
  };
};

// Funções dos botões
const clicou = numeroClicado => {
  let elementoNumero = search('.numero.pisca');
  if (elementoNumero !== null) {
    elementoNumero.innerHTML = numeroClicado;
    numero = numero + numeroClicado;
    elementoNumero.classList.remove('pisca');
    proximoNumero = elementoNumero.nextElementSibling;

    if (proximoNumero) {
      proximoNumero.classList.add('pisca');
    } else {
      atualizaInterface();
    };
  };
};

const branco = () => {
  numero = '';
  votoBranco = true;
  seuVotoPara.style.display = 'flex';
  aviso.style.display = 'flex';
  numeros.innerHTML = '';
  descricao.innerHTML = `<div class="aviso--grande pisca">Voto em Branco</div>`;
  lateral.innerHTML = '';
};

const corrige = () => {
  comecarEtapa();
};

const confirma = () => {
  let etapa = etapas[etapaAtual];
  let votoConfirmado = false;

  if (votoBranco) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco'
    });
  } else if (numero.length === etapa.numeros) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero
    });
  };

  if (votoConfirmado) {
    etapaAtual++;
    if (etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
      search('.tela').innerHTML = `<div class="aviso--gigante pisca">Fim</div>`;
      console.log(votos);
    };
  };
};

comecarEtapa();