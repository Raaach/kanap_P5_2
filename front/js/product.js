/*Utilisation de window location search pour obtenir l'url appartir de ?id
 pour avoir uniquement le numéro de l'id pour faire des appel API avec 
fetch sur la page produit*/

const queryString = new URLSearchParams(window.location.search);
const id = queryString.get("id");
console.log(id);
if (id != null){
  let itemPrice = 0
  let imgUrl, altText, articleName
}

/*Utlisation de l'interpolation de chaine avec la fonction fetch afin
d'ajouter la variable de l'id obtenu grace à URLSearchParams()*/

fetch(`http://localhost:3000/api/products/${id}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // console.log("les Kanap",res)
    return handleData(data);
  });

  function handleData(Kanap){                                 //je récupère toute les donnéees du Kanap
   //console.log({Kanap})
    const {altTxt, colors, description, imageUrl,name, price, _id}= Kanap//et je les passe à make... de chacun d'eux
    imgUrl= imageUrl
    altText = altTxt
    articleName = name
    itemPrice = price
    itemId = _id
    makeImage(imageUrl, altTxt)
    makeColor(colors)
    makeDescription(description)
    makeTitle(name)
    makePrice(price)
    makeId (id)
  }

 /*pour chaque donnée respective je lui associe un élement corresponddant du html */

//fonction créant l'id 
function makeId(id) {
  const itemElement = document.querySelector('.item');
  itemElement.id = id;
      //console.log(id);
}

//fonction créant l'image et ses éléments
function makeImage(imageUrl, altTxt){                      
  const image = document.createElement('img')
  image.src = imageUrl
  image.alt = altTxt
  const parent= document.querySelector(".item__img")
  parent.appendChild(image)
}

//fonction créant les couleurs en utilisant forEach 
function makeColor(colors){
  const select = document.querySelector("#colors")
  if (select != null){
      colors.forEach((color) =>{
          const option = document.createElement("option")
          option.value = color
          option.textContent = color
          select.appendChild(option)
      })
  }
}

//fonction créant l'élément prix 
function makePrice(price) {
  const span = document.querySelector("#price")               //attention le prix à ne pas mettre dans le localstorage
  const h3 = document.querySelector("#price")
  h3.textContent = price
}

//fonction créant l'élément description
function makeDescription(description){
  const p = document.querySelector("#description")
  p.textContent = description
}

//fonction créant le titre du kanap
function makeTitle(name){
  const h1 = document.querySelector("#title")
  h1.textContent = name
}

//const du bouton 'ajout au panier'
const button = document.querySelector("#addToCart")                 //le bouton panier on le relie via docuement querry
if (button != null){                                                // si le button est non null
    button.addEventListener("click",(e) => {                        //au click 
        const color = document.querySelector("#colors").value       //on a la const color.value 
        const quantity = document.querySelector("#quantity").value  //on a la const quantity.value

        if (isCartInvalid(color, quantity)) return                  //si la fonction est onvalid return: arrte toi là
        saveCart (color, quantity)                                  //lance la fonction saveCart
        window.location.href = "cart.html"                          // et enfin redirige nous vers le panier
    })
}

//fonction créant la sauvegarde en localStorage
function saveCart(color,quantity){
  const key = `${id}-${color}`                        // key est égale à l'id et à la couleur correspondant
  const donnee = {
      id: itemId,                                       
     color: color,
     quantity: Number(quantity),
     //price: itemPrice,                              // le price à ne pas mettre dans le localstorage mais via fetch
     imageUrl : imgUrl, 
     altTxt : altText,
     name: articleName, 
 }                                                   // dans le local storage on a la key qui s'affiche en string
 localStorage.setItem(key, JSON.stringify(donnee))   
}

//fonction permettant de valider ou invalider le remplissage des cases couleurs et quantité
function isCartInvalid(color, quantity){             
  if (color == null|| color === ''){
  alert("veuillez choisir une couleur, merciii :)")  // si la couleur n'est pas choisis alerte moi (suivie du message)
  return true}
  if (quantity == null || quantity == 0 ){
  alert("veuillez choisir une quantité, merci bien à vous :)")
  return true}                                      //return veut dire arrete toi 
  if (quantity <= 0 || quantity >= 101 ){
    alert("veuillez choisir une quatité entre 1 et 100, merci bien")
    return true}
}                                                   //alors la popup affichera le message alerte