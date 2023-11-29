function addPermit(){
    console.log("addPermit");
    showcase = document.getElementById("showcase")
    showcase.innerHTML = "<p>will add form here</p><button onclick='checkout()'>Checkout</button>";
    
}
function checkout(){
    console.log("checkout");
    window.location.href = "checkout.html";
}