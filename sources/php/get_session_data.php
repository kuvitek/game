<?php
    session_start();
    if (!isset($_SESSION['userName'])) {
        $_SESSION['userName'] = "";
        $_SESSION['accessToken'] = "";    
    };
    echo json_encode($_SESSION);
