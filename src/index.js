const addToyBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addNewToy = false
let toyContainer = document.querySelector('#toy-collection')


function getAllToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

function postToy(toyData) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toyData.name.value,
        "image": toyData.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((dataToy) => {
      let new_toy = renderToys(dataToy)
      toyContainer.append(new_toy)
    })
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let toyCard = document.createElement('div')
  toyCard.setAttribute('class', 'card')
  toyCard.append(h2, img, p, btn)
  toyContainer.append(toyCard)
}


// add event listener to Add Toy button 
addToyBtn.addEventListener('click', () => {

  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// getting all the toys

getAllToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  })
})