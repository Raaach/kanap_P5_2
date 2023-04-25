const cart = []

retrieveItemsFromCache()
console.log(cart) //on le place ici pour permettre à la fonction d'apparaitre avec console.log dans la console 
cart.forEach((item)=>displayItem(item))//une boucle: pour chaque item lace la fonction

function retrieveItemsFromCache(){
  const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++){
      const item = localStorage.getItem(localStorage.key(i))||""
      const itemObject = JSON.parse(item) // parse pour en faire un objet
      cart.push(itemObject)// à chaque fois qu'on trouve un objet, on va pusher cette objet là 
    }
}// a revoir car un peu chinois

//item correspond aux données qui sont l'id, image, couleur etc...

function displayItem(item){
  const article = makeArticle(item) //fait un article
    console.log(article)//affiche article dans la console
  const imageDiv = makeImageDiv(item) //fait une div 
  article.appendChild(imageDiv)// on donné à article un enfant div qui lui contient l'image
  
  const cartItemContent = makeCartContent(item)  
  article.appendChild(cartItemContent)
  displayArticle(article) //montre le/lance le (il s'affichera une fois que tout sera terminé)
  displayTotalQuantity()
  displayTotalPrice()
}

function displayTotalQuantity(){
  const totalQuantity = document.querySelector("#totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total
}

function displayTotalPrice(){
  let total = 0
  const totalPrice = document.querySelector("#totalPrice")
  cart.forEach(item => {
    const totalUnitPrice = item.price * item.quantity
    total = total + totalUnitPrice // on peut aussi l'écrire total += totalUnitPrice
  })
  console.log(total)
  totalPrice.textContent = total
}


function makeCartContent(item) {
  const cartItemContent= document.createElement("div")
  cartItemContent.classList.add("cart__item__content")

  const description = makeDescription(item)
  const settings = makeSettings(item)

  cartItemContent.appendChild(description)
  cartItemContent.appendChild(settings)
  return cartItemContent
}

function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")

  addQuantityToSettings(settings, item)
  addDeleteToSettings(settings)

  return settings
}

function addDeleteToSettings(settings) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")

  const p = document.createElement("p")
  p.classList.add("deleteItem")
  p.textContent= "Supprimer"

  div.appendChild(p)
  settings.appendChild(div)

}

function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")

  const p = document.createElement("p")
  p.textContent = "Qté : " 
  quantity.appendChild(p)

  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.name = "itemQuantity"
  input.min = "1"
  input.max = "100"
  input.value = item.quantity
  quantity.appendChild(input)
  
  settings.appendChild(quantity)

}

function makeDescription(item){

  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")

  const h2 = document.createElement ("h2")
  h2.textContent = item.name

  const p = document.createElement("p")
  p.textContent = item.color

  const p2 = document.createElement("p2")
  p2.textContent = item.price + " €"

  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)
  
  return description
}


function displayArticle(article) { //on lui passe comme argument article
  document.querySelector("#cart__items").appendChild(article)

} 

function makeArticle(item) {
  const article = document.createElement("article")
  article.classList.add("cart__item")
  article.dataset.id = item.id//Ce stockage, invisible par le navigateur et par les moteurs de recherche, 
  //permet de stocker toutes les informations que nous souhaitons dans toutes les balises HTML de notre page
  article.dataset.color = item.color
  return article
}

function makeImageDiv(item){
  const div = document.createElement("div")
  div.classList.add("cart__item__img")

  const image= document.createElement ('img')
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}

