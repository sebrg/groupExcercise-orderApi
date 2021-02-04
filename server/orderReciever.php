<?php 
  
  session_start();   
  require "./classes.php";


if(isset($_SERVER["REQUEST_METHOD"])) {
  if($_SERVER["REQUEST_METHOD"] === "POST") {
    
    /* echo json_encode($_POST["cart"]);
    exit; */
  
    

    

    $cart = json_decode($_POST["cart"]);     
    $date = $_POST["date"]; 
      
      $orderItemList = [];
      
      //      ARRAY    INDEX
      foreach($cart as $cartItem) {
        
        $name = $cartItem->product->name;
        $price = $cartItem->product->price;
        $descr = $cartItem->product->descr;
        $img = $cartItem->product->img;
        $quantity = $cartItem->quantity; 

        $product = new Product($name, $price, $descr, $img);
        $orderItem = new OrderItem($product, $quantity); 

        array_push($orderItemList, $orderItem);
      }

      $newOrder = new Order($date, $orderItemList);
      $orderList = [];

      array_push($orderList, $newOrder);
      if(isset($_SESSION["orders"])) {
        $orderList = unserialize($_SESSION["orders"]);
        array_push($orderList, $newOrder);

      }
        $_SESSION["orders"] = serialize($orderList); 
        $orderList = unserialize($_SESSION["orders"]);    
       
       
        echo json_encode($orderList);       

    
    




  }
    else if($_SERVER["REQUEST_METHOD"] === "GET") {



      $orderList = unserialize($_SESSION["orders"]);    
    
      echo json_encode($orderList);
 
  }

}




?>




