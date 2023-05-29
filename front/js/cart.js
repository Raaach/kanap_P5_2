
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
    //console.log(article)//affiche article dans la console
  const imageDiv = makeImageDiv(item) //fait une div 
  article.appendChild(imageDiv)// on donné à article un enfant div qui lui contient l'image
  
  const cartItemContent = makeCartContent(item)  
  article.appendChild(cartItemContent)
  displayArticle(article) //-montre le/lance le- (il s'affichera une fois que tout sera terminé)
  displayTotalQuantity()
  displayTotalPrice()
  //quantityPositif()
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
  //console.log(total)
  totalPrice.textContent = total
}

/*************************/


function quantityPositif(quantity){
   if (quantity <= 0 || quantity >= 101 ){
     alert("veuillez choisir une quatité entre 1 et 100, merci bien")
     return true}
 } //alors la popup affichera le message alerte et bloquera le tout

/*************************/



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
  addDeleteToSettings(settings, item)

  return settings
}

function addDeleteToSettings(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))

  const p = document.createElement("p")
  //p.classList.add("deleteItem")
  p.textContent= "Supprimer"

  div.appendChild(p)
  settings.appendChild(div)

}

function deleteItem(item){
  const itemToDelete = cart.findIndex((kanap) => kanap.id === item.id && kanap.color === item.color) // le Index signifie qu'on veut juste voir une simple donée comme un chiffre et nom tt le item
  // dans le cart trouve le produit, ici kanap
  // tel que son id soit égale au item.id

  cart.splice(itemToDelete, 1)
  //console.log(cart)
  displayTotalPrice()
  displayTotalQuantity()
  deleteDataFromCache(item)
  deleteArticleFromCart(item)
}

function deleteArticleFromCart(item){
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  )
  //console.log("article à suprimer:", articleToDelete)
  articleToDelete.remove()
}

function deleteDataFromCache(item){
  const key = `${item.id}-${item.color}`
  //console.log("on delete cette key :", key)
  localStorage.removeItem(key)
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
  input.min = "0"
  input.max = "100"
  input.value = item.quantity
  input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value,item)) 
                  // on envoie le id et le input dans la function updatePriceAndQuantity


  quantity.appendChild(input)
  settings.appendChild(quantity)

}

function updatePriceAndQuantity(id, newValue,item){
  const itemToUpdate = cart.find((item) => item.id === id)// on lui demande de chercher dans item l'id qui correspond au id
  itemToUpdate.quantity = Number(newValue)// on a mis number pour afficher le résultat en chiffre
  item.quantity = itemToUpdate.quantity
  displayTotalQuantity()//on appelle les display pour relancer la fonction corespondante
  displayTotalPrice()   //pour avoir une nouvelle quantité et un nouveau prix
  saveNewDataToCache(item)
}

function saveNewDataToCache(item){
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`  
  localStorage.setItem(key, dataToSave)
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

const orderButton = document.querySelector("#order")
if (orderButton != null ){
  orderButton.addEventListener("click", (e) => submitForm(e))

  
}

function submitForm(e){
  e.preventDefault() // preventDefeult permet de ne pas raffraichir la page
  if (cart.length === 0) {
    alert(" Veuillez séléctionnner un produit")
    return // on lui mets un retunr comme ça si c'est incomplet il s'arretera là et ne lira pas tout le code
  }
  if (isFormulaireInvalide()) return
  if (isEmailValide()) return
  
  const body = makeRequestFormulaire()
  fetch("http://localhost:3000/api/products/order", {// on fait cela pour poster les données dans order avec POST
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId
      window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId
      return console.log(data)
    })
    .catch((err) => console.error(err)) // ça permet d'avoir un message en rouge
  //console.log(form.elements)
}

function isFormulaireInvalide(){
  const form = document.querySelector(".cart__order__form")
  const inputs = form.querySelectorAll("input")
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("S'il vous plait remplissez toute les cases")
      return true
    }
    return false
  })
}

function isEmailValide(){
  const email = document.querySelector("#email").value
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/ //regex est une expresion décrit une syntaxe précise pour l'émail ici
  if (email == "" ){
    alert ("Veuillez saisir un email valide.")
    return true
  }
  if (regex.test(email) === false) {
    alert("S'il vous plait entrez un email valide")
    return true
  }
  return false
}

function makeRequestFormulaire (){
  const form = document.querySelector(".cart__order__form")

  const firstName= form.elements.firstName.value
  const lastName= form.elements.lastName.value
  const address= form.elements.address.value
  const city= form.elements.city.value
  const email= form.elements.email.value

  const body = {
    contact : {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email
    },
    products: getIdsFromCach()
  }
  //console.log(body)
  return body
}

function getIdsFromCach() {
  const numberOfProducts = localStorage.length
  const ids = []
  for (let i = 0; i < numberOfProducts; i++) {
    const key = localStorage.key(i)
    //console.log(key)
    const id = key.split("-")[0]
    ids.push(id)
  }
  return ids
}