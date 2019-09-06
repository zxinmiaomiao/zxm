
//表单验证
const aInput = document.querySelectorAll('.regist_form input');
const oForm = document.querySelector('#register-btn');
// let cartflag = true;
let usenameflag = true;
let emailflag = true;
let passflag = true;
let repassflag = true;
let telflag = true;

//用户名验证
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
            $('.usename_box .tips-box-default').html('输入正确-----请输入下一列').css({ 'color': 'green' });
            usenameflag = true;
            $.ajax({
                url: "http://localhost/1907-project-zxm/src/php/reg_cz.php",
                dataType: "json",
                type: 'post',
                data: {
                    newname: $('.usename_box input').val(),
                },
            }).done(function (d) {
                if (!d) {
                    $('.usename_box .tips-box-default').html('用户名不能为空-----请输入4-20位字符').css({ 'color': 'red' });

                } else {
                    $('.usename_box .tips-box-default').html('用户名已经').css({ 'color': 'red' });
                    usenameflag = false;
                }

               
            });




            aInput[1].focus();
        } else {
            $('.usename_box .tips-box-default').html('格式不符-----用户名请输入4-20位字符').css({ 'color': 'red' });
            usenameflag = false;
            this.focus();
        }
    } else {
        $('.usename_box .tips-box-default').html('用户名不能为空-----请输入4-20位字符').css({ 'color': 'red' });
        usenameflag = false;
        this.focus();
    }
}
// 邮箱验证
aInput[1].onfocus = function () {
    if (this.value === '') {
        emailflag = false;
    }
};
aInput[1].onblur = function () {
    if (this.value !== '') {
        //规则
        let email = /^(\w+[+-._]*\w+)\@(\w+[+-.]*\w+)\.(\w+[+-.]*\w+)$/;
        if (email.test(this.value)) {
            $('.email_box .tips-box-default').html('输入正确-----请输入下一列').css({ 'color': 'green' });
            emailflag = true;
            aInput[2].focus();
        } else {
            $('.email_box .tips-box-default').html('格式不符合要求-----请输入正确的邮箱').css({ 'color': 'red' });
            emailflag = false;
        }
    } else {
        $('.email_box .tips-box-default').html('邮箱不能为空-----请输入正确的邮箱').css({ 'color': 'red' });
        emailflag = false;
    }
}

// 密码验证

//密码强度(1种字符：弱   2种-3种字符：中   4种字符：强)
//数字  大写字母  小写字符   特殊字符
aInput[2].onfocus = function () {
    if (this.value === '') {
        passflag = true;
        aInput[3].value = '';
        passflag = false;
    } else {
        aInput[3].value = '';
        $('.repassword_box .tips-box-default').html('请再次输入上面的密码').css({ 'color': '#aaa' });
        passflag = false;

    }
};
aInput[2].oninput = function () {

    let num = 0;
    let numreg = /\d+/;
    let uppercase = /[A-Z]+/;
    let lowercase = /[a-z]+/;
    let othercase = /[\W\_]+/;
    if (numreg.test(this.value)) {
        num++;
    }
    if (uppercase.test(this.value)) {
        num++;
    }
    if (lowercase.test(this.value)) {
        num++;
    }
    if (othercase.test(this.value)) {
        num++;
    }

    if (num !== 0) {

        switch (num) {
            case 1:
                $('#passwordCheck').children().eq(1).show().siblings().hide();
                passflag = false;
                break;
            case 2:
                $('#passwordCheck').children().eq(2).show().siblings().hide();
                break;
            case 3:
                $('#passwordCheck').children().eq(3).show().siblings().hide();
                passflag = true;
                break;
            case 4:
                $('#passwordCheck').children().eq(4).show().siblings().hide();
                passflag = true;
                break;
        }
    } else {
        $('#passwordCheck').children().eq(0).show().siblings().hide();
        passflag = false;
    }
}

//密码框改变的函数


aInput[2].onblur = function () {
    if (this.value !== '') {
        if (this.value.length >= 6 && this.value.length <= 20) {
            $('.password_box .tips-box-default').html('密码符合要求-----请输入下一列').css({ 'color': 'green' });
            aInput[3].focus();
            aInput[3].value = '';
            passflag = true;
        } else {
            $('.password_box .tips-box-default').html('密码长度不够-----请输入6-20位密码').css({ 'color': 'red' });
            passflag = false;
        }
    } else {
        $('.password_box .tips-box-default').html('密码不能为空-----请输入6-20位密码').css({ 'color': 'red' });
        aInput[3].value = '';
        passflag = false;
    }
}


// 确认密码
aInput[3].onfocus = function () {
    if (this.value === '') {
        repassflag = false;
    }
};
aInput[3].onblur = function () {

    if (this.value !== '') {
        if (this.value === aInput[2].value) {

            $('.repassword_box .tips-box-default').html('恭喜输入正确-----离注册成功还有一步之遥').css({ 'color': 'green' });
            repassflag = true;
        } else {
            $('.repassword_box .tips-box-default').html('俩次密码不一致-----请输入上面相同的密码').css({ 'color': 'red' });
            repassflag = false;
        }
    } else {
        $('.repassword_box .tips-box-default').html('确认密码不能为空-----请输入上面相同的密码').css({ 'color': 'red' });
        repassflag = false;
    }

}

// 手机验证

//手机号码：
aInput[4].onfocus = function () {
    if (this.value === '') {
        telflag = false;
    }
};
aInput[4].onblur = function () {
    if (this.value !== '') {
        let tel = /^1[34578]\d{9}$/;
        if (tel.test(this.value)) {
            $('.tel_box .tips-box-default').html('输入正确，恭喜输入完成').css({ 'color': 'green' });
            telflag = true;
        } else {
            $('.tel_box .tips-box-default').html('格式不符合要求-----请输入正确的手机号').css({ 'color': 'red' });
            telflag = false;
        }
    } else {
        $('.tel_box .tips-box-default').html('手机号不能为空-----请输入正确的手机').css({ 'color': 'red' });
        telflag = false;
    }
}

// 提交按钮
//控制提交--form+submit
oForm.onclick = function () { //提交
    if (aInput[0].value === '') {
        $('.usename_box .tips-box-default').html('用户名不能为空-----请输入4-20位字符').css({ 'color': 'red' });
        usenameflag = false;
    }
    if (aInput[1].value === '') {
        $('.email_box .tips-box-default').html('邮箱不能为空-----请输入正确的邮箱').css({ 'color': 'red' });
        emailflag = false;
    }
    if (aInput[2].value === '') {
        $('.password_box .tips-box-default').html('密码不能为空-----请输入6-20位字符密码').css({ 'color': 'red' });
        passflag = false;
    }
    if (aInput[3].value === '') {
        $('.repassword_box .tips-box-default').html('确认密码不能为空-----请输入和上面相同的密码').css({ 'color': 'red' });
        repassflag = false;
    }
    if (aInput[4].value === '') {
        $('.tel_box .tips-box-default').html('手机号不能为空-----请输入正确的手机号').css({ 'color': 'red' });
        telflag = false;
    }
    if (!usenameflag || !emailflag || !passflag || !repassflag || !telflag) { //阻止
        return false;
    }
    console.log(1);
    if ($('.regist_form').find('input:checked').size() === 2) {

        // 数据请求
        const $username = $('.usename_box .usename');
        const $email = $('.email_box .email');
        const $password = $('.password_box .password');
        const $repassword = $('.repassword_box .repassword');
        const $telphone = $('.tel_box .telphone');
        const $submit = $('#register-btn');
        // 发送数据 
        $.ajax({
            url: "http://localhost/1907-project-zxm/src/php/register.php",
            dataType: "json",
            type: 'post',
            data: {
                usename: $username.val(),
                email: $email.val(),
                pass: $password.val(),
                tel: $telphone.val(),
                submit: $submit.html(),
            },
        }).done(function (data) {
            console.log(data);
            if (data == 1) {
                // $('.usename_box .tips-box-default').html('用户名可以注册').css({ 'color': 'green' });
                location.href = 'http://localhost/1907-project-zxm/src/login.html';
            }
        })



    }


};




