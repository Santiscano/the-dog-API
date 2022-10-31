import './style.css'


// escribire las peticiones en promesas async y otras formas para guardar las distintas metodologias
const key = 'live_PZZZZPpekjYiKNTreoz13QYo60hxFDQIrl29r7S0ccg8BkkscVeGiqMIwxYCGMo5'

const API_BASE = 'https://api.thedogapi.com/v1/images/search?limit=3&';

// span para mostrar errores
const spanError = document.getElementById('error')

// ejercicio con promesas peticion GET
const loadRandomImages = () => {
  fetch(API_BASE)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    // manipulacion del DOM traer imagenes
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');

     // manipular src
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

    // guardar img
    btn1.onclick = () => saveFavoriteImages(data[0].id);
    btn3.onclick = () => saveFavoriteImages(data[2].id);
    btn2.onclick = () => saveFavoriteImages(data[1].id);
    }
  )
}
loadRandomImages();
// recargar con click
const buttonLoad = document.getElementById('buttonLoad');
buttonLoad.onclick = () => loadRandomImages();

          // cargar favoritos 
          // GET
const API_LOAD_ALL_FAVORITES = 'https://api.thedogapi.com/v1/favourites'

// load
const loadFavoritesImages = async () => {
  const res = await fetch(API_LOAD_ALL_FAVORITES,{
    method: 'GET',
    headers: {
      'X-API-KEY': 'live_PZZZZPpekjYiKNTreoz13QYo60hxFDQIrl29r7S0ccg8BkkscVeGiqMIwxYCGMo5',
    },
  });
  const data = await res.json();
  const console_load = console.log('cargados de favoritos: ' + data.img);
  if(res.status !== 200){
    spanError.innerHTML = 'el error es: ' + res.status + ' ' + data.message;
  } else{
    const section = document.getElementById('favoriteDogsImages')
    section.innerHTML = "";
      data.forEach(dogs => {
        const article = document.createElement('article');
        const margin = document.createElement('div');
        const div = document.createElement('div')
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnText = document.createTextNode('Eliminar de favoritos');
  
        img.src = dogs.image.url;
        img.width = 150;
        section.className ='py-20 grid gap-28 md:gap-12 md:grid-cols-3'
        
        article.className = 'w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'
        margin.className = 'flex flex-col items-center pb-10 px-6 pt-8'
        img.className = 'mb-3 w-24 h-24 rounded-full shadow-lg'
        div.className = 'flex mt-4 space-x-3 md:mt-6'
        btn.className = 'inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        btn.appendChild(btnText);
        btn.onclick = () => deleteFavorite(dogs.id);
        div.append(btn);
        margin.append(img,div);
        article.appendChild(margin);
        section.appendChild(article);
      });
  }
}
loadFavoritesImages();


          // async await peticiones POST
  // url grabar favorites
const API_URL_FAVORITES = `https://api.thedogapi.com/v1/favourites?limit=3&api_key=${key}`

// headers y body de peticion fetch
async function saveFavoriteImages (id) { 
  const res = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      image_id: id,
      // image_id: "ryo54a6V7",
      sub_id: "test"
    }),
  });
  const data = await res.json();
  const data_console = await console.log(res);
  loadFavoritesImages();
  if(res.status !== 200){
    spanError.innerHTML = 'el error es: ' + res.status + ' ' + data.message;
  } else{
    spanError.innerHTML = 'todo va bien la respuesta fue: ' + res.status + ' ' + data.message;
  }
}


          // async peticion DELETE
  // 
const DELETE_FAVORITE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`

async function deleteFavorite(id) {
  const res = await fetch(DELETE_FAVORITE(id),{
    method: 'DELETE',
    headers: {'Content-Type': 'application/json',
      'X-API-KEY': 'live_PZZZZPpekjYiKNTreoz13QYo60hxFDQIrl29r7S0ccg8BkkscVeGiqMIwxYCGMo5',
    },
    body: JSON.stringify({image_id: id}),
  });
  loadFavoritesImages();
  console.log('perrito eliminado de favoritos');
}
