window.onload = function() { contadorRodape(); };

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
        
        const status = document.createElement("p");
        status.classList.add("personagem-status");

        if(personagem.status === "Alive"){
          valorTraduzido = "🟢 Vivo";
        }else{
          valorTraduzido = "🔴 Morto";
        }
        status.textContent = valorTraduzido + " - " + personagem.species;
        const cardPersonagem = 
        `
          <div class="col-md-3 mb-4 imagecard">
            
            <button type="button" class="btn botaoAnimado" data-toggle="modal" data-target="#exampleModal ">
              <div class="card modeloCard">
                <img src="${personagem.image}" class="card-img-top" alt="${personagem.name}" >
                <div class="card-body">
                  <h5 class="card-title">${personagem.name}</h5>
                  <p class="card-text">
                    Status: ${valorTraduzido}<br>
                    Espécie: ${personagem.species}
                  </p>
                </div>
              </div>
              </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="${personagem.id}" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title text-dark" id="${personagem.id}">${personagem.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <p class="text-dark">Ultima localização conhecida: ${personagem.location.name} <br>
                        Visto ultima vez no episodio: ${personagem.origin.name}
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-sucess" data-dismiss="modal">Fechar</button>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
        `;
        listaPersonagens.innerHTML += cardPersonagem;
        console.log(personagem)
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
      const quantidadeEpisodios = res.data.info.count;
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
  

  