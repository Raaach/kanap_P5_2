/*Utilisation de window location search pour obtenir l'url appartir de ?id et suppresion des
3 première caractère avec slice pour avoir uniquement le numéro de l'id pour faire des appel API avec 
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
    function makeId(id) {
      const itemElement = document.querySelector('.item');
      itemElement.id = id;
      console.log(id);
  }

function makeImage(imageUrl, altTxt){                       //pour chaque donnée respective je lui associe un élement corresponddant du html 
  const image = document.createElement('img')
  image.src = imageUrl
  image.alt = altTxt
  const parent= document.querySelector(".item__img")
  parent.appendChild(image)
}

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

function makePrice(price) {
  const span = document.querySelector("#price")               //attention le prix à ne pas mettre dans le localstorage
  const h3 = document.querySelector("#price")
  h3.textContent = price
}

function makeDescription(description){
  const p = document.querySelector("#description")
  p.textContent = description
}

function makeTitle(name){
  const h1 = document.querySelector("#title")
  h1.textContent = name
}

const button = document.querySelector("#addToCart")                 //le bouton panier on le relie via docuement querry
if (button != null){                                                // si le button est non null
    button.addEventListener("click",(e) => {                        //
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value

        if (isCartInvalid(color, quantity)) return
        saveCart (color, quantity)
        window.location.href = "cart.html"                              // dès le clique du bouton panier on est redirigé vers le panier
    })
}

function saveCart(color,quantity, id){
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

function isCartInvalid(color, quantity){                                                           // alors la popup affichera le message alerte
  if (color == null|| color === ''){
  alert("veuillez choisir une couleur, merciii :)") // si la couleur n'est pas choisis alerte moi (suivie du message)
  return true}
  if (quantity == null || quantity == 0 ){
  alert("veuillez choisir une quantité, merci bien à vous :)")
  return true} //veut dire arrete toi 
  if (quantity <= 0 || quantity >= 101 ){
    alert("veuillez choisir une quatité entre 1 et 100, merci bien")
    return true}
} //alors la popup affichera le message alerte