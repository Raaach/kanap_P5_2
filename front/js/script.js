fetch("http://localhost:3000/api/products")
    .then((res)=> res.json())
    .then((data) => {                                       //pour consoleloger une fonction, on ecrit 
        console.log(data)                                   //on ajoute console.log()
        return addProducts(data)})                          //le return devant la fonction de base

        //altTxt: "Photo d'un canapé bleu, deux places"
        //colors:(3) ['Blue', 'White', 'Black']
        //description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        //imageUrl: "http://localhost:3000/images/kanap01.jpeg"
        //name: "Kanap Sinopé"
        //price: 1849
        //_id: "107fb5b75607497b96722bda5b504926"

        
function addProducts(data){
    const id = data[0]._id     
    const imageUrl  = data[0].imageUrl
    const altTxt = data[0].altTxt
    const image = makeImage(imageUrl, altTxt)
    const anchor = makeAnchor(id) 
    const article = makeArticle()
    appendChildren(image)
    appendChildren(anchor, article)
    }

function makeAnchor(id){
    const anchor = document.createElement ("a")                   //on cree la const anchor "a" qui donnera <a></a>
    anchor.href = "./product.html?=id" + id                       // on lui rajoute un lien + requète
    return anchor                                                 // 
    }

function appendChildren(anchor, article){
        const items = document.querySelector("#items")             //on cree la constante items en sélctionnant le items de l'index html
        if (items != null){                                        //si items est non null
            items.appendChild(anchor)                              //on lui donne un enfant qui est anchor (qui est la constente au dessus)
            items.appendChild(article)
        }
    }

function makeImage(imageUrl, altTxt){
        const image = document.createElement("img")
        image.src = imageUrl
        image.alt = altTxt
        return image
        
    }

function makeArticle(){
        const article = document.createElement("article")        
        const h3 = makeH3()
        const p = makeParagraph()
        //article.appendChild(image)
        //article.appendChild(h3)
        //article.appendChild(p)
        console.log(article)
        return article
    }


function makeH3(h3){
        //const h3 = document.createElement("h3")
        //return h3
     }

function makeParagraph(){ }