window.addEventListener("load", initSite())

async function initSite() {
    await viewProducts()
    placeOrderBtn()

}

async function makeReq(path, method, body) {
    try {
        let response = await fetch(path, {
            method,
            body
        })

        return response.json()
        
    }
     catch(err) {
          console.error("Failed fetch", err)
      } 
}

async function viewProducts() {
    const response = await makeReq("./server/produktReciever.php", "GET")
    
    let prodCont = document.getElementById("produktBox")

    console.log(response)

    for(i = 0; i < response.length; i++){
       
        let prodCard = document.createElement("div")
        prodCard.className = "prodCard"
        prodCont.appendChild(prodCard)       
        
        printProd(response, prodCard)
        cartBtn(prodCard, "Lägg till i kundvagn", response[i])
    }

}

function printProd(from, parent) {
    prodBox = document.createElement("div")  
    let name = document.createElement("h2")
    let price = document.createElement("p")
    name.innerText = from[i].name
    price.innerText = from[i].price + " kr"
    parent.appendChild(name)
    parent.appendChild(price)

}

async function cartBtn(parent, text, product) {
    let addBtn = document.createElement("button")
    addBtn.innerText = text
    parent.appendChild(addBtn)
     
    addBtn.addEventListener("click", async () => {    
        addToCart(product)            
    }) 
     
}



async function addToCart(product) {
    let cartList

    let cart =  {
        product: {
            name: product.name,
            price: product.price
            
        }, 
        quantity: 1
    }
  
    
    if (localStorage.getItem("cart")) {
        cartList = JSON.parse(localStorage.getItem("cart"))
        
            let findCartMatch = cartList.findIndex((cartItem) => { //matchar cartItem i cartList och retunerar index

                return cartItem.product.name == cart.product.name

            })

            if (findCartMatch > -1) { //Första index är 0 vilket blir false, därför säger vi IF index > -1
                cartList[findCartMatch].quantity++ //Ökar kvantitet med 1
            }
            else {
                cartList.push(cart) //Om index mindre än 0 finns varan inte i listan, då läggs en ny till istället

            }
        
    }
    else {
        cartList = []
        cartList.push(cart)
    }
  
        localStorage.setItem("cart", JSON.stringify(cartList)) 

}

async function placeOrderBtn() {
    let orderBtn = document.getElementById("placeOrderBtn")

    orderBtn.addEventListener("click", () => {
        placeOrder()    
    })
    
}


async function placeOrder() {
    
    let cartList = localStorage.getItem("cart")
    
    /* localStorage.getItem("cart") */
    
    if(cartList) {

    let date = new Date().toISOString().slice(0, 10) 
    let body = new FormData()
    body.set("cart", cartList)
    body.set("date", date) 
    
    const rendReq = await makeReq("./server/orderReciever.php", "POST", body)


    console.log(rendReq)
    }

 
    

}

