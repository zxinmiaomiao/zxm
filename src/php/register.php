<?php
require "conn.php";
//检测用户名
// if(isset($_GET['checkname'])){
//     $username=$_GET['checkname'];

//     //通过查询方式来测试是否存在用户名。
//     $result=$conn->query("select * from usertable where username='$username'");

//     if($result->fetch_assoc()){//存在
//         echo true;//1
//     }else{//不存在
//         echo false;//空隙
//     }

// }




//前端用户点击了submit按钮。接收前端传入表单的值。
// if(isset($_POST['submit'])){
//     $name=$_POST['username'];
//     $pass=sha1($_POST['password']);//加密
//     $email=$_POST['email'];
//     //添加数据库
//     $conn->query("insert usertable values(null,'$name','$pass','$email',NOW())");

//     //php的跳转
//     header('location:http://localhost/js1907/Day%2023/loginregister/src/login.html');
// }

// 检测用户名
// if (isset($_POST['newname'])) {
//     $newname = $_POST['newname'];
//     // echo $username;
//     //通过查询方式来测试是否存在用户名。
//     $result = $conn->query("select * from samusertable where username='$newname'");
//     if ($result->fetch_assoc()) { //存在
//         echo true; //1
//     } else { //不存在
//         echo false; //空隙
//     }
// }

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
