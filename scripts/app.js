const $pokeListContainer = document.querySelector("#poke-list"),
  $pokeTemplate = document.querySelector("#poke-template").content,
  $pokeFragment = document.createDocumentFragment(),
  $linkPrevious = document.querySelector("#link-previous");
$linkNext = document.querySelector("#link-next");
(POKE_API = "https://pokeapi.co/api/v2/pokemon/"),
  (nextPage = null),
  (previousPage = null);

document.addEventListener("DOMContentLoaded", (e) => fetchPokemon(POKE_API));
document.addEventListener("click", (e) => {
  if (
    e.target.matches("a[id='link-previous']") ||
    e.target.matches("a[id='link-next']")
  ) {
    const goUrl = e.target.dataset.go;
    if(goUrl !== "null") fetchPokemon(goUrl);
  }
});
const fetchPokemon = async (url) => {
  try {
    const request = await fetch(url),
      response = await request.json();

    const { next, previous, results: pokemon } = response;
    
    $pokeListContainer.innerHTML = '';
    pokemon.forEach(async pokemon=>{
        const {name,url} = pokemon;
        const responsePoke = await fetch(url),
        requestPoke = await responsePoke.json()
        const {back_default:pokeImage} = requestPoke.sprites;

        $pokeTemplate.querySelector("h5").textContent = name
        $pokeTemplate.querySelector("img").src = pokeImage
        let pokeNode = $pokeTemplate.cloneNode(true);
        
   //     $pokeFragment.appendChild(pokeNode)
   $pokeListContainer.appendChild(pokeNode)
    })

   
    
    $linkPrevious.dataset.go = previous;
    $linkNext.dataset.go = next;
  } catch (err) {
    console.error(err);
  }
};

