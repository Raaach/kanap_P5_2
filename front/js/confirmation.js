const orderId = getOrderId()
displayOrderId (orderId)
removeAllCache()

function getOrderId(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return  urlParams.get("orderId")
}

function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId");
    if (orderId) {
      orderIdElement.textContent = orderId;
    } else {
      orderIdElement.textContent = "No order ID available";
    }
  }
  

function removeAllCache(){
    const cache = window.localStorage
    cache.clear()
}