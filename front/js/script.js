fetch("http://localhist:3000/api/products")
    .then((res)=> res.json())
    .then((data) => console.log(data))

const anchor = document.createElement ("a") //on cree la const anchor "a"
anchor.href = "http://localhost:3000/images/kanap01.jpeg" // on lui rajoute un lien 
anchor.text = "Canapé confortable" // on place un texte

const items = document.querySelector("#items") //on cree la constante items
items.appendChild(anchor) //on lui donne un enfant qui est anchor (qui est la constente au dessus)
/* si on a un problème avec la ligne 10, on peut alors écrire: if (items != null)( items.apendChild(anchor))*/
