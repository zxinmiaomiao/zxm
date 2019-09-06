<?php
// require("conn.php");
// if(isset($_GET['sidm'])){
//     $sid=$_GET['sidm'];
//     $result=$conn->query("select * from sam where sid=$sid ");
//     echo json_encode($result->fetch_assoc());
// }
// <?php
require('conn.php');
if (isset($_GET['sidm'])) {
    $sid = $_GET['sidm'];
    $result = $conn->query("select * from sam where sid=$sid");
    echo json_encode($result->fetch_assoc());
}
