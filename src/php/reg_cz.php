<?php
require "conn.php";
if (isset($_POST['newname'])) {
    $newname = $_POST['newname'];
    //通过查询方式来测试是否存在用户名。
    $result = $conn->query("select * from samusertable where username='$newname'");
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else { //不存在
        echo false; //空隙
    }
}
