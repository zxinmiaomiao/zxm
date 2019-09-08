<?php
require "conn.php";
//检测用户名

if (isset($_POST['submit'])) {
    $username = $_POST['usename'];
    $email = $_POST['email'];
    $password = sha1($_POST['pass']);
    $telphone = $_POST['tel'];
    $result = $conn->query("insert into samusertable values(null,'$username',' $email','$password',' $telphone',NOW())");

    if ($result) {
        echo 1;
    } else {
        echo 0;
    }
}
