
$(document).ready(function () {
    const telphone = $('.tel_box .telphone');
    const password = $('.password_box .password');
    const usename = $('.usename_box .usename');
    const login = $('#login_btn');



    let usenameflag = true;

    let passflag = true;



    const aInput = document.querySelectorAll('.login_form input');
    aInput[0].focus();
    aInput[0].onfocus = function () {
        if (this.value === '') {
            usenameflag = false;
        }
    }
    aInput[0].onblur = function () {
        if (this.value !== '') {
            let usename = /^[\u4e00-\u9fa5a-zA-Z0-9\-]{4,20}$/;
            if (usename.test(this.value)) {
                $('.usename_box .tips-box-default').html('输入格式正确-----请输入下一列').css({ 'color': 'green' });
                usenameflag = true;
                aInput[1].focus();
            } else {
                $('.usename_box .tips-box-default').html('格式不符-----').css({ 'color': 'red' });
                usenameflag = false;
                this.focus();
            }
        } else {
            $('.usename_box .tips-box-default').html('用户名不能为空---').css({ 'color': 'red' });
            usenameflag = false;
            this.focus();
        }
    }



    login.on('click', function () {
        $.ajax({
            type: "post",
            url: "http://localhost/1907-project-zxm/src/php/login.php",
            data: {
                tel: telphone.val(),
                pass: password.val(),
                usename: usename.val(),
            },
        }).done(function (data) {
            console.log(data);

            if (!data) {
                alert('输入错误');
            } else {
                location.href = 'http://localhost/1907-project-zxm/src/index-00.html';
                document.cookie = `useinfor=${usename.val()};expires=20 `;

            }
        });
    })

});


