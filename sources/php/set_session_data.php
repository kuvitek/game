<?php
    $userName=$_REQUEST['userName'];
    session_start();
    if ($userName!=""){
        $_SESSION['userName'] = $userName;
//        $bytes = random_bytes(5);
//        $_SESSION['accessToken'] = bin2hex($bytes);            
        $_SESSION['accessToken'] = rand();
    };
    echo json_encode($_SESSION);
