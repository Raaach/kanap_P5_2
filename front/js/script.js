fetch("http://localhost:3000/api/products")
    .then((res)=> res.json())
    .then((data) => addProducts(data))

function addProducts(data){
    
    const imageUrl= data[0].imageUrl
                    
         
   const anchor = document.createElement ("a")                  //on cree la const anchor "a" qui donnera <a></a>
    anchor.href = imageUrl                                      // on lui rajoute un lien 
    anchor.text = "Canapé confortable"                          // on place un texte

    const items = document.querySelector("#items")             //on cree la constante items
    if (items != null){                                        //si items est non null
        items.appendChild(anchor)                              //on lui donne un enfant qui est anchor (qui est la constente au dessus)
        }
    }
