window.onload = function() {
  contadorRodape();
};

// Variáveis globais
const itensPorPagina = 6; // Exibir 6 personagens por página
let paginaAtual = 1;
let totalPersonagens = 0;
const urlPersonagem = "https://rickandmortyapi.com/api/character";
const urlepisodio = "https://rickandmortyapi.com/api/episode";
const urlLocalizacao = "https://rickandmortyapi.com/api/location";

// Função para obter os dados dos personagens da API do Rick and Morty
function obterPersonagens(termoPesquisa = '') {
  const parametrosPesquisa = termoPesquisa ? `?name=${termoPesquisa}` : '';
  const url = `https://rickandmortyapi.com/api/character/${parametrosPesquisa}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao obter os personagens');
      }
      return response.json();
    })
    .then(data => {
      const personagens = data.results;
      totalPersonagens = personagens.length;

      const listaPersonagens = document.getElementById('lista-personagens');
      listaPersonagens.innerHTML = '';

      const inicio = (paginaAtual - 1) * itensPorPagina;
      const fim = inicio + itensPorPagina;
      const personagensPaginados = personagens.slice(inicio, fim);

      personagensPaginados.forEach(personagem => {
        const valorTraduzido = personagem.status === 'Alive' ? '🟢 Vivo' : '🔴 Morto';
        const cardPersonagem = `
          <div class="col-md-3 mb-4 imagecard">
           
            <button type="button" class="btn botaoAnimado" data-toggle="modal" data-target="#modal${personagem.id}">
              <div class="card modeloCard">
                <img src="${personagem.image}" class="card-img-top" alt="${personagem.name}">
                <div class="card-body">
                  <h5 class="card-title">${personagem.name}</h5>
                    <p class="card-text">
                      Status: ${valorTraduzido}<br>
                      Espécie: ${personagem.species}
                    </p>
                </div>
              </div>
            </button>
            <div class="modal fade" id="modal${personagem.id}" tabindex="-1" role="dialog" aria-labelledby="modal${personagem.id}Label" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="modal${personagem.id}Label">${personagem.name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p class="text-dark">Última localização conhecida: ${personagem.location.name}<br>
                    Visto pela última vez no episódio: ${personagem.origin.name}</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        listaPersonagens.innerHTML += cardPersonagem;
      });
    })
    .catch(error => {
      console.log('Erro ao obter os personagens:', error);
    });
}


// Função para atualizar a página com base na página atual
function atualizarPagina() {
  obterPersonagens();
}

///////////////////////////////////////////////footer//////////////////////////////////////////

function contadorRodape() {
  axios.get(urlPersonagem).then(res => {
    const quantidadePersonagens = res.data.info.count;
    const quantidadePersonagensFooter = document.getElementById("quantidadePersonagens");
    quantidadePersonagensFooter.textContent = "PERSONAGENS: " + quantidadePersonagens;
  });

  axios.get(urlLocalizacao).then(res => {
    const quantidadeLocalizacoes = res.data.info.count;
    const localizacaoFooter = document.getElementById("localizacao");
    localizacaoFooter.textContent = "LOCALIZAÇÕES: " + quantidadeLocalizacoes;
  });

  axios.get(urlepisodio).then(res => {
    const quantidadeEpisodios = res.data  .info.count;
    const episodioFooter = document.getElementById("episodio");
    episodioFooter.textContent = "EPISÓDIOS: " + quantidadeEpisodios;
  });
}

// Chama a função para obter os personagens e atualizar o rodapé ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  obterPersonagens();
});

// Adiciona o evento de input no campo de pesquisa
const campoPesquisa = document.getElementById('campo-pesquisa');
campoPesquisa.addEventListener('input', () => {
  paginaAtual = 1;
  obterPersonagens(campoPesquisa.value.trim());
});

// Evento de abertura do modal
$('#exampleModal').on('show.bs.modal', function (event) {
  const button = $(event.relatedTarget); // Botão que acionou o modal
  const name = button.data('name'); // Extrai o nome do atributo data-name
  const location = button.data('location'); // Extrai a localização do atributo data-location
  const origin = button.data('origin'); // Extrai a origem do atributo data-origin

  const modal = $(this); // Referência ao modal em si
  modal.find('.modal-title').text(name); // Define o nome no título do modal
  modal.find('.modal-body').html(`
    <p class="text-dark">Última localização conhecida: ${location}<br>
    Visto pela última vez no episódio: ${origin}</p>
  `); // Insere as informações no corpo do modal
});

