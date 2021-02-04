window.addEventListener("load", initSite())

async function initSite() {
    showOrders()
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

async function showOrders() {
    const getOrder = await makeReq("./server/orderReciever.php", "GET")
    
    
    let main = document.getElementsByTagName("main")[0]

    getOrder.forEach(orderHeads => {
        console.log(orderHeads)

        let orderDiv = document.createElement("div")
        let orderDateTitle = document.createElement("h2")
        let table = document.createElement("table")
        let tableRow = document.createElement("tr") 
        let tableDescName = document.createElement("th")
        let tableDescPrice = document.createElement("th")
        let tableTitleQuantity = document.createElement("th")
     
        orderDiv.className="orderDiv"
        orderDateTitle.innerText = orderHeads.date
        tableDescName.innerText = "Name"
        tableDescPrice.innerText = "Price"
        tableTitleQuantity.innerText = "Quantity"
        
        tableRow.append(tableDescName, tableDescPrice, tableTitleQuantity)
        table.appendChild(tableRow)
        orderDiv.append(orderDateTitle, table)
        main.appendChild(orderDiv)

        orderHeads.orderItems.forEach(orderProducts => {
            console.log(orderProducts)

            let tableItemRow = document.createElement("tr")
            let tableItemName = document.createElement("td")
            let tableItemPrice = document.createElement("td")
            let tableItemQuantity = document.createElement("td")

            tableItemName.innerText = orderProducts.product.name
            tableItemPrice.innerText = orderProducts.product.price
            tableItemQuantity.innerText = orderProducts.quantity

            table.append(tableItemRow, tableItemName, tableItemPrice, tableItemQuantity)
                   
        })



    });



}