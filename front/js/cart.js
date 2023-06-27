
const cart = []                                     //cette const est un tableau

retrieveItemsFromCache()
cart.forEach((item)=>displayItem(item))             //une boucle: pour chaque item lance la fonction

//fonction pour récuperer ce qu'il y a dans le localStorage
function retrieveItemsFromCache(){
  const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++){        //on va utiliser une boucle
      const item = localStorage.getItem(localStorage.key(i))||""
      const itemObject = JSON.parse(item)           // parse pour en faire un objet
      cart.push(itemObject)                         // à chaque fois qu'on trouve un objet, on va pusher cette objet là 
    }
}

//item correspond aux données qui sont l'id, image, couleur etc...

//fonction créant l'item
function displayItem(item){
  const article = makeArticle(item)                 //fait un article
  const imageDiv = makeImageDiv(item)               //fait une div 
  article.appendChild(imageDiv)                     // on donné à article un enfant div qui lui contient l'image
  
  const cartItemContent = makeCartContent(item)  
  article.appendChild(cartItemContent)
  displayArticle(article)                           //-montre le/lance le- (il s'affichera une fois que tout sera terminé)
  displayTotalQuantity()
  displayTotalPrice()
}

//fonction créant la quantité total
function displayTotalQuantity(){
  const totalQuantity = document.querySelector("#totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total
} 

//fonction créant le prix total 
function displayTotalPrice() {
  let total = 0;
  const totalPrice = document.querySelector("#totalPrice");

  cart.forEach((item) => {
    const totalUnitPrice = item.price * item.quantity;

    if (!isNaN(totalUnitPrice)) {                   // Check si totalUnitPrice est a valid number
      total += totalUnitPrice;
    }
  });

  totalPrice.textContent = total.toFixed(2);        // Convertir le total en un nombre décimal fixe avec 2 décimales
}

//fonctoin pour le contenu
function makeCartContent(item) {
  const cartItemContent= document.createElement("div")
  cartItemContent.classList.add("cart__item__content")

  const description = makeDescription(item)
  const settings = makeSettings(item)

  cartItemContent.appendChild(description)
  cartItemContent.appendChild(settings)
  return cartItemContent
}

// function pour creer le setting (parametre) en incluant les fontions d'ajout de suppression
function makeSettings(item) {
  const settings = document.createElement("div")
  settings.classList.add("cart__item__content__settings")

  addQuantityToSettings(settings, item)
  addDeleteToSettings(settings, item)

  return settings
}

// function ajout du bouton supprimer 
function addDeleteToSettings(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))

  const p = document.createElement("p")
  p.textContent= "Supprimer"

  div.appendChild(p)
  settings.appendChild(div)

}
// function supression
function deleteItem(item){
  const itemToDelete = cart.findIndex((kanap) => kanap.id === item.id && kanap.color === item.color) 
  // le Index signifie qu'on veut juste voir une simple donnée comme un chiffre et nom et le item
  // dans le cart trouve le produit, ici kanap
  // tel que son id soit égale au item.id

  cart.splice(itemToDelete, 1)
  //effaces en 1

  // et ensuite relance les fonctions suivantes 
  displayTotalPrice()
  displayTotalQuantity()
  deleteDataFromCache(item)
  deleteArticleFromCart(item)
}

// funtion suprimer l'article de cart 
function deleteArticleFromCart(item){
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  )
  articleToDelete.remove()
  //suprimer
}

// function pour suprimer du cache
function deleteDataFromCache(item){
  const key = `${item.id}-${item.color}`
  localStorage.removeItem(key)
}

// function ajout de quantité à setting
function addQuantityToSettings(settings, item) {
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")

  const p = document.createElement("p")
  p.textContent = "Qté : " 
  quantity.appendChild(p)

  const input = document.createElement("input")
  input.type = "number"
  input.classList.add("itemQuantity")
  input.id = item.id
  input.name = "itemQuantity"
  input.min = "0"
  input.max = "100"
  input.value = item.quantity
  
  // on envoie le id et le input dans la function updatePriceAndQuantity
  
  input.addEventListener("change", () => updatePriceAndQuantity(item.id, input.value, item))
  input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))

  quantity.appendChild(input)
  settings.appendChild(quantity)
}

// fonction recharger le prix et la quantité
function updatePriceAndQuantity(id, newValue, item){
  const itemToUpdate = cart.find((item) => item.id === id)    // on lui demande de chercher dans cart l'id qui correspond au id
  itemToUpdate.quantity = Number(newValue)                    // on a mis number pour afficher le résultat en chiffre

// puis on demande à la machine de verifier si la quantité selectionné est 
// supérieur à zéro et inférieur à 101, alors recharge la quantité
// sinon lance l'alerte 
// et la valeur de base sera de 1
  if(item.quantity > 0 && item.quantity < 101){
    item.quantity = itemToUpdate.quantity
  } else {
    alert("Veuillez choisir une quatité entre 1 et 100, merci bien")
    const input = document.getElementById(`${item.id}`)
    input.value = 1
    item.quantity = 1
  }
  displayTotalQuantity()                                    //on appelle les display pour relancer la fonction corespondante
  displayTotalPrice()                                       //pour avoir une nouvelle quantité et un nouveau prix
  saveNewDataToCache(item)

}

// function pour enregistrer la data dans la cache
function saveNewDataToCache(item){
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`  
  localStorage.setItem(key, dataToSave)
}

// fontcion pour la description de l'objet
function makeDescription(item){

  const description = document.createElement("div")         // on cree une Div
  description.classList.add("cart__item__content__description") //avec une class

  const h2 = document.createElement ("h2")                  // puis on cree un H2
  h2.textContent = item.name                                // qui contiendra le nom de l'objet

  const p = document.createElement("p")                     // on cree l'élément p
  p.textContent = " Color : " + item.color                  // qui contiendra le message "color" et la couleur de l'objet

// on va utiliser l'API fetch pour effectuer une requette HTTP pour recuperer le prix:

  fetch(`http://localhost:3000/api/products/${item.id}`)    // on envoie une requette GET à l'url, où le ${item.id} est l'id que je souhaite recupérer
                                                            // La méthode fetch renvoie une promesse qui sera résolue une fois que la réponse sera disponible
  .then((response) => response.json())                      // .then est appelé lorsque la réponse est reçue, il convertit la réponse en format JSON avec response.json()
  .then((product) => {                                      // .then est appelé avec l'objet product, qui contient les données du produit, y compris le prix
    const price = product.price;                            // le prix estextrait de product et stocké daans la const price
    const p2 = document.createElement("p");                 // un élément p est créé et contient le messag" Price" suivie du prix récuperé précédament
    p2.textContent = "Price: " + price + " €";
    description.appendChild(p2);
    item.price = price;                                     // mettre à jour l'objet article avec le prix récupéré
    displayTotalPrice()
  })
  //Si une erreur se produit lors de la récupération du produit 
  //ou de l'extraction du prix, le bloc catch est exécuté. 
  //Il affiche un message d'erreur dans un nouvel élément <p2>
  // et l'ajoute à l'élément description.
  .catch((error) => {
    console.error("Error fetching product:", error);
    const p2 = document.createElement("p2");
    p2.textContent = "Price: Error fetching price";
    description.appendChild(p2);
  });

  description.appendChild(h2)
  description.appendChild(p)
  
  return description
}

// function lancer article
function displayArticle(article) {                            //on lui passe comme argument article
  document.querySelector("#cart__items").appendChild(article)

} 

// function créer article 
function makeArticle(item) {
  const article = document.createElement("article")
  article.classList.add("cart__item")
  article.dataset.id = item.id
  //Ce stockage, invisible par le navigateur et par les moteurs de recherche, 
  //permet de stocker toutes les informations que nous souhaitons dans toutes les balises HTML de notre page
  article.dataset.color = item.color
  article.dataset.price = item.price
  return article
}

// fonction créer image
function makeImageDiv(item){
  const div = document.createElement("div")
  div.classList.add("cart__item__img")

  const image= document.createElement ('img')
  image.src = item.imageUrl
  image.alt = item.altTxt
  div.appendChild(image)
  return div
}

// fonction bouton de comande
const orderButton = document.querySelector("#order")
if (orderButton != null ){
  orderButton.addEventListener("click", (e) => submitForm(e))
}

// fonction soummetre le formulaire
function submitForm(e){
  e.preventDefault()                                          // preventDefeult permet de ne pas raffraichir la page
  if (cart.length === 0) {
    alert(" Veuillez sélectionner un produit")
    return                                                    // on lui mets un retunr comme ça si c'est incomplet,
                                                              // il s'arretera là et ne lira pas tout le code
  } 
  if (!firstNameValide()) return
  if (!lastNameValide()) return
  if (!addressValide()) return
  if (!cityValide()) return
  if (!isEmailValide()) return

  const body = makeRequestFormulaire()
  
  // Ce code effectue une requête HTTP POST à une URL spécifique pour passer une commande de produits via une API
  fetch("http://localhost:3000/api/products/order",           //envoie une requête POST à l'URL spécifiée pour passer une commande
                                                              // La méthode fetch renvoie une promesse qui sera résolue une fois que la réponse sera disponible
   {
    method: "POST",                                           //La méthode est "POST" pour indiquer une requête de création ou de soumission
    body: JSON.stringify(body),                               // config en JSON où body est l'objet contenant les données
    headers: {                                                // les en-têtes de la requette sont spécifié ici
      Accept: "application/json",                             // que le cerveur accept le format JSON
      "Content-Type": "application/json"                      // et que le corps de la requête est en JSON aussi
    }
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId
      
      window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId
      return 
    })
    .catch((err) => console.error(err)) 
  
}

/* fonctions pour valider ou invalider le nom, prénom, le mail ....*/


function firstNameValide(){
  const firstNameRegex = /^[A-Za-zâêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{3,50}$/
  const firstName = document.getElementById("firstName")
  const firstNameError = document.getElementById("firstNameErrorMsg")
  const firstNameValue = firstName.value.trim()
  let check = true
  
  if (firstNameValue.match(firstNameRegex)) {                   // et j'utilise la méthode 'match()' pour une corespondance
    firstNameError.innerHTML = ""
  } else{
    check = false
    firstNameError.innerHTML = "Veuillez saisir un prénom valide"
  }
  return check
 }

function lastNameValide() {
  const lastNameRegex = /^[A-Za-zâêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{3,50}$/
  const lastName = document.getElementById("lastName")
  const lastNameError = document.getElementById("lastNameErrorMsg")
  const lastNameValue = lastName.value.trim()
  let check = true

  if (lastNameValue.match(lastNameRegex)) {
    lastNameError.innerHTML = ""
  } else{
    check = false
    lastNameError.innerHTML = "Veuillez saisir un Nom valide"
  }
  return check
}

function addressValide() {
  const addressRegex =/^[A-Za-z0-9'âêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{5,50}$/
  const address = document.getElementById("address")
  const addressError = document.getElementById("addressErrorMsg")
  const addressValue = address.value.trim()
  let check = true

  if (addressValue.match(addressRegex)) {
    addressError.innerHTML = ""
  } else{
    check = false
    addressError.innerHTML = "Veuillez saisir une Adresse valide"
  }
  return check
}

function cityValide() {
  const cityRegex =/^[A-Za-z'âêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{3,50}$/ //regex est une expresion décrit une syntaxe précise pour la ici//
  const city = document.getElementById("city")
  const cityError = document.getElementById("cityErrorMsg")
  const cityValue = city.value.trim()
  let check = true

  if (cityValue.match(cityRegex)) {
    cityError.innerHTML = ""
  } else{
    check = false
    cityError.innerHTML = "Veuillez saisir une Ville valide"
  }
  return check
}

function isEmailValide() {
  const emailRegex =/^[A-Za-z'âêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]+@(.+){3,50}$/ //regex est une expresion décrit une syntaxe précise pour l'émail ici//
  const email = document.getElementById("email")
  const emailError = document.getElementById("emailErrorMsg")
  const emailValue = email.value.trim()
  let check = true

  if (emailValue.match(emailRegex)) {
    emailError.innerHTML = ""
  } else{
    check = false
    emailError.innerHTML = "Veuillez saisir une Eamil valide"
  }
  return check
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
  return body
}


function getIdsFromCach() {
  const numberOfProducts = localStorage.length
  const ids = []
  for (let i = 0; i < numberOfProducts; i++) {
    const key = localStorage.key(i)
    
    const id = key.split("-")[0]
    ids.push(id)
  }
  return ids
}
