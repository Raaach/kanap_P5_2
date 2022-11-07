fetch("http://localhost:3000/api/products")
    .then((res)=> res.json())
    .then((data) => addProducts(data))

function addProducts(data){
    const imageUrl = data[0].imageUrl       

    const anchor = makeAnchor(imageUrl) 
    appendChildran(anchor)

    }

function makeAnchor(url){
    const anchor = document.createElement ("a")                //on cree la const anchor "a" qui donnera <a></a>
    anchor.href = url                                          // on lui rajoute un lien 
    return anchor
    }

function appendChildran(anchor){
        const items = document.querySelector("#items")             //on cree la constante items
        if (items != null){                                        //si items est non null
            items.appendChild(anchor)                              //on lui donne un enfant qui est anchor (qui est la constente au dessus)
        }
    }