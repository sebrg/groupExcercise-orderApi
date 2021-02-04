<?php 


if(isset($_SERVER["REQUEST_METHOD"])) {
    if($_SERVER["REQUEST_METHOD"] === "GET") {

      
   
         require "./classes.php";
        
         
        
        $dxracer = new Product("Dxracer", "3000", "kör jätte bra", "bild");
        $secretlab = new Product("Secretlab", "5000", "kör jätte bra", "bild");
        $hermanMiller = new Product("HermanMiller", "14000", "kör jätte bra", "bild");
        
        $allProducts = array($dxracer, $secretlab, $hermanMiller);
         
        /* $testOrder = array(array("product" => $hermanMiller, "quantity" => 3), array()); */

        

        echo json_encode($allProducts);
  
    
 

    }
}

?>