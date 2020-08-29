<?php  
    $name=$_POST['name'];
    $email=$_POST['email'];
    $subject=$_POST['subject'];
    $mobileno=$_POST['mobileno'];
    $message=$_POST['message'];
    
    if($name==''||$email==''||$subject==''||$mobileno==''||$message=='') {
        echo "<script>alert('All Fields are required !')</script>";
    }
    else {
        $to="avirawat1048@gmail.com";
        $subject="Your Portfolio discussion";
        mail($to,$subject,$message);
        echo "<script>alert('Your mesaage sent successfully ,As Soon as Avinash will reply')</script>";

    }
?>