fetch("http://localhost:3000/api/products")
    .then((res)=> res.json())
    .then((data) => addProducts(data))

 //   .then((data) => {                                       //pour consoleloger une fonction, on ecrit 
 //       console.log(data)                                   //on ajoute console.log()
 //       return addProducts(data)})                          //le return devant la fonction de base


 /* les infos en dessous sont recupéré de la basse de donnée qui corresponds au data[0] */ 
        //altTxt: "Photo d'un canapé bleu, deux places"
        //colors:(3) ['Blue', 'White', 'Black']
        //description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim _id est laborum."
        //imageUrl: "http://localhost:3000/images/kanap01.jpeg"
        //name: "Kanap Sinopé"
        //price: 1849
        //_id: "107fb5b75607497b96722bda5b504926"

        
function addProducts(KanapS){
    
    KanapS.forEach((canape) => {                                        //pour chaque data fait "data:" suivie de la données serveur avec console.log
        
        
                                                                    //const _id = KanapS[0]._id     
                                                                    //const imageUrl  = KanapS[0].imageUrl
                                                                    //const altTxt = KanapS[0].altTxt
                                                                    //const name = KanapS[0].name
                                                                    //const description = KanapS[0].description
        
        const{ _id, imageUrl, altTxt, name, description} = canape    // c'est une façon de transformer les cinq lignes 
                                                                   // du dessus en une ligne    
        
        const anchor = makeAnchor(_id) 
        const article = document.createElement("article")        
        const image = makeImage(imageUrl, altTxt)
        const h3 = makeH3(name)
        const p = makeParagraph(description)                           // const p c'est makeParagraphe depuis descritpion
        
        appendElementsToArticle(article, [image, h3, p])
        appendArticleToAnchor(anchor, article)
    });
}

 function appendElementsToArticle(article, array){                     // article aura comment enfant:
        array.forEach((item) => {                                      //article.appendChild(image)
            article.appendChild(item)                                  //article.appendChild(h3)
                                                                       //article.appendChild(p)
        })      
}

function makeAnchor(_id){
    const anchor = document.createElement ("a")                   //on cree la const anchor "a" qui donnera <a></a>
    anchor.href = "./product.html?=_id" + _id                       // on lui rajoute un lien + requète
    return anchor                                                 // la fonction s'arrete
    }

function appendArticleToAnchor(anchor, article){
        const items = document.querySelector("#items")             //on cree la constante items en sélctionnant le items de l'index html
        if (items != null){                                        //si items est non null
            items.appendChild(anchor)                              //on lui donne un enfant qui est anchor (qui est la constente au dessus)
            anchor.appendChild(article)
        }
    }

function makeImage(imageUrl, altTxt){
        const image = document.createElement("img")
        image.src = imageUrl
        image.alt = altTxt
        return image
        
    }

function makeH3(name){
        const h3 = document.createElement("h3")
        h3.textContent = name
        h3.classList.add("productName")
        return h3
     }

function makeParagraph(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
    }