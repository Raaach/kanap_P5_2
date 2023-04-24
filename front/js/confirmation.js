const orderId = getOrderId()
displayOrderId (orderId)
removeAllCache()


function getOrderId(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return  urlParams.get("id")
    
}


function displayOrderId(orderId){
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

function removeAllCache(){
    const cache = window.localStorage
    cache.clear()
}