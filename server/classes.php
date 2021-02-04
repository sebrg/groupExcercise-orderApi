<?php 

class Product {
    function __construct($name, $price, $descr, $img){
        $this->name = $name;
        $this->price = $price;
        $this->descr = $descr;
        $this->img = $img;
    }
}


class OrderItem {
    function __construct($product, $quantity) {
        $this->product = $product;
        $this->quantity = $quantity;
    }
}



class Order {
    function __construct($date, $orderItems){

    
        $this->date = $date;
        $this->orderItems = $orderItems;
    }

    public function totalSum() {

        $orderPrices = ["sdsds"];

      

        return json_encode($orderPrices);
        
    }
    
    
    
    
   /*  function totalProducts();  */

}


?>