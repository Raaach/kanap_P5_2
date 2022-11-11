//const queryString = window.location.search     //"_id107fb5b75607497b96722bda5b504926"
//console.log(queryString)
//const urlParams = new URLSearchParams(queryString)
//console.log(urlParams)
//const id = urlParams.get("id")
//console.log(id)


fetch('http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926')              
    .then((response)=> response.json())
    .then((res) => handleData(res))

function handleData(Kanap){
    console.log({Kanap})
    const {altTxt, colors, description, imageUrl,name, price, _id}= Kanap
    makeImage(imageUrl, altTxt)
    //makeColor(colors)
    //makeDescription(description)
    makeTitle(name)
    //makePrice(_id)
}

function makeImage(imageUrl, altTxt){
    const image = document.createElement('img')
    image.src = imageUrl
    image.alt = altTxt
    const parent= document.querySelector(".item__img")
    parent.appendChild(image)
}
function makeTitle(name){
    const h1 = document.querySelector("#title")
    h1.textContent = name
}
function makeColor(colors){
    const color = document.createElement('div')
}