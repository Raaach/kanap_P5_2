const queryString= window.location.search
const urlParams = new URLSearchParams (queryString)
const id = urlParams.get("id")

 fetch("http://localhost:3000/api/products/_id")
    .then((response)=> response.json())
    .then((res) => console.log(res))