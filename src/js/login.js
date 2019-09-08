
$(document).ready(function () {
    let usename = $('.usename_box .usename');
    let usenameflag = true;
    let passflag = true;

    $('.usename_box .usename').focus();
    $('.usename_box .usename').blur(function () {
        if ($('.usename_box .usename').val() !== '') {
            $.ajax({
                type: 'post',
                url: "http://localhost/1907-project-zxm/src/php/reg_cz.php",
                data: {
                    newname: $('.usename_box input').val(),
                }
            }).done(function (data) {
                if (data == 1) {
                    $('.usename_box .tips-box-default').html('用户名正确---请输入下面的密码').css({ 'color': 'green' });
                    $('.password_box .password').focus();

                } else {
                    $('.usename_box .tips-box-default').html('用户名未注册，请检查用户名，或者先注册在登录---').css({ 'color': 'red' });

                    $('.usename_box .usename').focus();
                    usenameflag = false;
                }
            });

        } else {
            $('.usename_box .tips-box-default').html('用户名不能为空---').css({ 'color': 'red' });
            $(this).focus();
            usenameflag = false;
        }
    });


    $('#login_btn').on('click', function () {
        if ($('.password_box input').val() == "") {
            $('.password_box .tips-box-default').html('密码不能为空---').css({ 'color': 'red' });
            $('.password_box input').focus();
        }

        if ($('.usename_box .usename').val() != '' && $('.password_box input').val() != "") {
            $.ajax({
                type: "post",
                url: "http://localhost/1907-project-zxm/src/php/login.php",
                data: {
                    pass: $('.password_box .password').val(),
                    usename: $('.usename_box .usename').val(),
                },
            }).done(function (data) {
                if (!data) {
                    $('.password_box .tips-box-default').html('密码和用户名不匹配---').css({ 'color': 'red' });
                    $('.password_box input').focus();


                } else {
                    location.href = 'http://localhost/1907-project-zxm/src/index-00.html';
                    document.cookie = `useinfor=${usename.val()};expires=20 `;
                    // console.log();

                }
            });
        }



    })

});


