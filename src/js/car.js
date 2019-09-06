!function ($) {
    if (getcookie('cookiesid') && getcookie('cookienum')) {
        let csid = getcookie('cookiesid').split(',');
        let cnum = getcookie('cookienum').split(',');
        // console.log(csid, cnum);
        $.each(csid, function (index, value) {
            showgoodlists(value, cnum[index]);
        })
    }
    // 渲染列表
    // clone渲染
    function showgoodlists(sid, num) {
        $.ajax({
            url: "http://localhost/1907-project-zxm/src/php/sanmu.php",
            dataType: 'json',
        }).done(function (data) {
            $.each(data, function (index, value) {
                let $strhtml = '';
                if (value.sid == sid) {
                    // console.log(value.sid);
                    let $clonebox = $('.goods-item:hidden').clone(true, true);
                    $clonebox.css('display', 'block');

                    $clonebox.find('.goods-name .goods-pic').find('img').attr('src', value.url);
                    $clonebox.find('.goods-pic').find('img').attr('sid', value.sid);
                    $clonebox.find('.goods-d-info').find('a').html(value.titile);
                    $clonebox.find('.b-price').find('strong').html(value.price);
                    $clonebox.find('.quantity-form').find('input').val(num);

                    // 小计
                    let $zmoney = (value.price * num).toFixed(2);
                    $clonebox.find('.b-sum strong').html($zmoney);
                    // $('.check-weight')
                    $('.item-list').append($clonebox);
                    pricetotal();
                }
            });

        })
    }

    // 如果购物车为空
    empty();
    function empty() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            // alert(1)
            $('.car_bigbox').show().siblings().hide();
        } else {
            $('.car_emptybox').show().siblings().hide();
        }
    }
    // 计算总价,选中的商品
    function pricetotal() {
        let $allPrice = 0;
        let $allNum = 0;
        $('.goods-item:visible').each(function (index, element) {
            if ($(element).find('.goods-info').find('.cart-checkbox').find('input').is(':checked')) {
                $allPrice += parseFloat($(element).find('.b-sum strong').html());
                $allNum += parseInt($(element).find('.quantity-form input').val());
            }
        })
        $('#monetTotal span i').html(($allPrice).toFixed(2));
        $('#monetTotal .num').html($allNum);
        $('.chekc-price').find(".p1 span").html(($allPrice).toFixed(2));
    }
    // 全选/取消全选
    $('#allinput').on('change', function () {
        $('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        pricetotal()////取消选项，重算总和
    })
    //事件委托
    // console.log($('.goods-item:visible').find(':checkbox').length);//找不到元素 所有input框和被选中的框比

    var $inputs = $('.goods-item:visible').find(':checkbox');
    $('.item-list').on('click', $inputs, function () {
        if ($('.goods-item:visible').find('input:checkbox').length == $('.goods-item:visible').find('input:checked').size()) {
            $('#allinput').prop('checked', true)
        } else {
            $('#allinput').prop('checked', false)
        }
        pricetotal();
    })

    // 数量增加
    $('.quantity-form .quantity-add ').on('click', function () {
        let $count = $(this).parents('.b_price_boxnum').find('.quantity-form input').val();
        $count++;
        if ($count >= 99) {
            $count = 99;
        }
        $(this).parents('.b_price_boxnum').find('.quantity-form input').val($count);
        $(this).parents('.goods-info').find('.b-sum strong').html(sigleprice($(this)));
        pricetotal();
        setcookie($(this));
    })

    //数量 --
    $('.quantity-form .quantity-down ').on('click', function () {
        let $count = $(this).parents('.b_price_boxnum').find('.quantity-form input').val();
        $count--;
        if ($count <= 1) {
            $count = 1;
        }
        $(this).parents('.b_price_boxnum').find('.quantity-form input').val($count);
        $(this).parents('.goods-info').find('.b-sum strong').html(sigleprice($(this)));
        pricetotal();
        setcookie($(this));
    })


    //直接输入改变数量
    $('.quantity-form input').on('input', function () {
        let $reg = /^\d+$/g;
        let $value_newInput = parseInt($(this).val());
        if ($reg.test($value_newInput)) {
            if ($value_newInput >= 99) {
                $(this).val(99);
            } else if ($value_newInput <= 0) {
                $(this).val(1);
            } else {
                $(this).val($value_newInput);
            }
        } else {
            $(this).val(1);
        }
        $(this).parents('.goods-info').find('.b-sum').find('strong').html(sigleprice($(this)));//改变后的价格
        pricetotal();
        setcookie($(this));
    })

    //改变数量后 重新算的 单品价格和总和
    function sigleprice(obj) {
        let $dpj = parseFloat(obj.parents('.goods-info').find('.b-price').find('strong').html());
        let $dpnum = parseInt(obj.parents('.goods-info').find('.quantity-form input').val());
        return ($dpj * $dpnum).toFixed(2);
    }

    // //8.将改变后的数量的值存放到cookie
    // //点击按钮将商品的数量和id存放cookie中
    // // 取cookie转数组
    var arrsid = [];
    var arrnum = [];

    function cookieToArray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            arrsid = getcookie('cookiesid').split(',');//cookie商品的sid  
            arrnum = getcookie('cookienum').split(',');//cookie商品的num
        }
    }
    function setcookie(obj) {
        cookieToArray();//公用区用public
        console.log(arrsid, arrnum, $index);
        var $index = obj.parents('.goods-item').find('img').attr('sid');
        arrnum[$.inArray($index, arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val();
        addcookie('cookienum', arrnum.toString(), 20);
    }

    //9.删除操作
    //删除cookie
    function delgoodslist(sid, arrsid) {//sid：当前删除的sid，arrsid:cookie的sid的值
        var $index = -1;
        $.each(arrsid, function (index, value) {//删除的sid对应的索引位置。 index:数组项的索引
            if (sid == value) {
                $index = index;//如果传入的值和数组的值相同，返回值对应的索引。
            }
        });
        arrsid.splice($index, 1);//删除数组对应的值
        arrnum.splice($index, 1);//删除数组对应的值
        addcookie('cookiesid', arrsid.toString(), 30);//添加cookie
        addcookie('cookienum', arrnum.toString(), 30);//添加cookie
    }

    //删除单个商品的函数(委托)
    $('.item-list').on('click', '.b-action a', function (ev) {
        cookieToArray();//得到数组,上面的删除cookie需要。
        if (confirm('你确定要删除吗？')) {
            $(this).first().parents('.goods-item').remove();//通过当前点击的元素找到整个一行列表，删除
        }
        delgoodslist($(this).first().parents('.goods-info').find('img').attr('sid'), arrsid);
        pricetotal();
    });

    //删除全部商品的函数
    $('.del_pl a').on('click', function () {
        cookieToArray();//得到数组,上面的删除cookie需要。
        if (confirm('你确定要全部删除吗？')) {
            $('.goods-item:visible').each(function () {
                if ($(this).find('input:checkbox').is(':checked')) {//复选框一定是选中的
                    $(this).remove();
                    delgoodslist($(this).find('img').attr('sid'), arrsid);
                }
            });
            pricetotal();
        }
    });


}(jQuery) 