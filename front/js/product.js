const id = window.location.search
const urlParams = new URLSearchParams(id)
console.log(id)

//const queryString= window.location.search
//const urlParams = new URLSearchParams(queryString)
//const id = urlParams.get("id")
//console.log({id})

 fetch("http://localhost:3000/api/products/{id}")
    .then((response)=> response.json())
    .then((res) => console.log(res))