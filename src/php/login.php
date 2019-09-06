<?php

require "conn.php";
if (isset($_POST['usename']) && isset($_POST['pass'])) {
    $usename = $_POST['usename'];
    $pass = sha1($_POST['pass']);
    // $usename = $_POST['usename'];
    // $result = $conn->query("select * from samusertable where telphone='$tel' password='$pass' and uesrname='$usename' ");
    // 2条数据
    $result = $conn->query("select * from samusertable where username='$usename'and password='$pass' ");

    if ($result->fetch_assoc()) { //匹配成功
        echo true;
    } else {
        echo false;
    }
}
