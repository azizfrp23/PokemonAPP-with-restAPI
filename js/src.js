const $main = document.querySelector('.main')
const $url = 'https://pokeapi.co/api/v2/pokemon'

var offset = 0

var state = 1126 / 20
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const number = document.querySelector('.number')
var page = 1;

function fetchData(url,query,cb){
    fetch(`${url}?${query}`)
    .then(res => res.json())
    .then(r => cb(r))

}

function cardTemp(res){
    return `
        <div class="card">
            <div class="card_title">
                <h3>${res.name}</h3>
            </div>
        </div>       
    `

}
fetchData($url,`offset${offset}&limit20`,res =>{
    $main.innerHTML = res.results.map(item => cardTemp(item)).join('')
})

next.addEventListener('click', e =>{
    e.preventDefault()
    page++
    number.innerHTML = page
    offset+=20
    fetchData($url,`offset=${offset}&limit20`,res =>{
        $main.innerHTML = res.results.map(item => cardTemp(item)).join('')
    })
    if(page > state){
        next.classList.add('disabled')
    }
    if(page > 0 ){
        prev.classList.remove('disabled')
    }
})
prev.addEventListener('click', e =>{
    e.preventDefault()
    page--
    number.innerHTML = page
    offset-=20
    fetchData($url,`offset=${offset}&limit20`,res =>{
        $main.innerHTML = res.results.map(item => cardTemp(item)).join('')
    })
    if(page < 1){
        prev.classList.add('disabled')

    }
    if(page < state){
        next.classList.remove('disabled')

    }
 
})