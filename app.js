
const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error");

form.addEventListener("submit", handleForm);

function handleForm(e) {
  e.preventDefault();

  if (input.value === "") {
    errorMsg.textContent = "Veuillez remplir le champs de recherche !";
    return;
  } else {
    errorMsg.textContent = ""
    wikiSearch(input.value)
  }
}

async function wikiSearch (searchInput) {
    // méthode fetch pour récupérer les données en fonction de la valeur de l'input
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
    );
    // analyse de la réponse, conversion au format json pour être utilisable 
    const data = await response.json()
    // création des cards avec les méthodes query et search  
    creatCards(data.query.search)
}

const displayResult = document.querySelector('.display-result')

function creatCards(data) {
    if (!data.length) {
        errorMsg.textContent = 'Aucun résultat ...'
        return
    }
    // création d'une carte pour chaque élément 
    data.forEach(el => {
        const url = `http://en.wikipedia.org/?curid=${el.pageid}`
        const cards = document.createElement('div')
        cards.className = 'result-item'
        cards.innerHTML = `<h3 class='result-title'>
        <a href='${url}' target='_blank'>${el.title}</a>
        </h3>
        <a href="${url}" class='result-link' target ="_blank">${url}</a>
        <span class="result-snippet">${el.snippet}</span>`;
        
        // Ajout de l'enfant à l'élément parent
        displayResult.appendChild(cards)
    })
}

