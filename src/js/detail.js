!function ($) {
    // 引入头部
    $('header').load('head.html');
    // 取得首页传过来的值
    $sid = location.search.substring(1).split('=')[1];
    $.ajax({
        url: "http://localhost/1907-project-zxm/src/php/getdata.php",
        data: {
            sidm: $sid,
        },
        dataType: 'json'
    }).done(function (d) {

        let $smallpic = d.urls.split(',');
        $('#small_pic img').attr('src', d.url);
        $('#df img').attr('src', d.url);
        $('#small_pic img').attr('sid', d.sid); //添加自定义属性sid
        $('#goods_titile_detail').html(d.titile);
        $('.pricenum strong ').html(d.price);
        // //拼接小图片
        let $htmlstr = ''
        $.each($smallpic, function (index, value) {
            $htmlstr += `
                <li>
                    <img src="${value}" />
                </li>
            `;
        });
        $('.enlarge_box .movelist ul').html($htmlstr);

        !function ($) {
            // 放大镜
            class magnifying {
                constructor() {
                    this.spic = $('#small_pic');
                    this.sf = $('#smf');
                    this.bf = $('#df');
                    this.bpic = $('#bpic');
                    this.ullist = $('.smallimg_list');
                    this.list = $('.smallimg_list li');
                    this.left = $('.up');
                    this.right = $('.down');
                    // this.liimgsmall = $('.smallimg_list li img');
                }
                init() {
                    let _this = this;
                    this.spic.hover(function () {
                        $("#smf,#df").css({ 'visibility': 'visible' });
                        _this.spic.on('mousemove', function (ev) {
                            _this.spicmove(ev);
                        })
                    }, function () {
                        $("#smf,#df").css({ 'visibility': 'hidden' });
                    });

                    this.sf.css({
                        width: this.spic.width() * this.bf.width() / this.bpic.width(),
                        height: this.spic.height() * this.bf.height() / this.bpic.height(),
                    });
                    this.bili = this.bpic.width() / this.spic.width();


                    //  li的事件委托给ul
                    $('.enlarge_box .smallimg_list').on('mouseover', 'li', function () {
                        _this.changeurl($(this));
                    })

                    this.num = 6;//可视区长度
                    this.liheight = this.ullist.height() / this.list.length;
                    if (this.list.length <= 6) {
                        this.right.css('color', '#fff');
                    }
                    this.right.on('click', function () {
                        _this.rightclick();
                    })

                    this.left.on('click', function () {
                        _this.leftclick();
                    })
                }
                spicmove(ev) {
                    var ev = ev || window.event;
                    // console.log(ev.pageX);
                    let l = ev.pageX - this.spic.offset().left - this.sf.width() / 2;
                    let t = ev.pageY - this.spic.offset().top - this.sf.height() / 2;
                    if (l <= 0) {
                        l = 0;
                    } else if (l >= this.spic.width() - this.sf.width()) {
                        l = this.spic.width() - this.sf.width();
                    }
                    if (t <= 0) {
                        t = 0;
                    } else if (t >= this.spic.height() - this.sf.height()) {
                        t = this.spic.height() - this.sf.height();
                    }

                    $('#smf').css({
                        left: l,
                        top: t,
                    });
                    this.bpic.css({
                        left: -l * this.bili,
                        top: -t * this.bili
                    })
                }
                changeurl(objli) {
                    let imgurl = objli.find('img').attr("src");
                    objli.addClass("active").siblings().removeClass("active");
                    this.spic.find('img').attr('src', imgurl);
                    this.bpic.attr('src', imgurl);
                    this.sf.css({
                        width: this.spic.width() * this.bf.width() / this.bpic.width(),
                        height: this.spic.height() * this.bf.height() / this.bpic.height(),
                    });
                    this.bili = this.bpic.width() / this.spic.width();
                }

                rightclick() {
                    if (this.list.length > this.num) {
                        this.num++;
                        this.left.css('color', '#333');
                        if (this.num === this.list.length) {
                            this.right.css('color', '#fff');
                        }
                        this.ullist.animate({
                            top: - this.liheight * (this.num - 6)
                        }).css({ top: 0 });

                    }
                }
                leftclick() {
                    if (this.num > 6) {
                        this.num--;
                        this.right.css('color', '#333');
                        if (this.num === 6) {
                            this.left.css('color', '#fff');
                        }
                        this.ullist.animate({
                            top: -this.liheight * (this.num - 6)
                        });
                    }

                }

            }
            new magnifying().init();

        }(jQuery)

        // 加入购物车
        // 数量++

        $('#addnum').on('click', function () {
            var $goodsnum = $('#input_addnum').val();
            $goodsnum++;
            $('#input_addnum').val($goodsnum);
        });
        // 数量--
        $('#reducenum').on('click', function () {
            var $goodsnum = $('#input_addnum').val();
            $goodsnum++;
            $('#input_addnum').val($goodsnum);
        });

        // 存cookie数量和编号
        let sidarr = [];
        let numarr = [];
        function cookieToArray() {
            if (getcookie('cookiesid') && getcookie('cookienum')) {
                sidarr = getcookie('cookiesid').split(',');
                numarr = getcookie('cookienum').split(',');
            }
        }

        $('#addCart').on('click', function () {
            //通过当前点击的按钮，获取当前商品的(图片)sid。
            let $sid = $(this).parents('.detail_totalbox').find('#small_pic').find('img').attr('sid');

            //是否第一次，获取cookie才能知道是否是第一次。第一次会存储cookie(编号和数量)
            cookieToArray(); //取出转换成数组

            if ($.inArray($sid, sidarr) !== -1) { //存在
                //通过sid获取对应的数量，取出数量+当前新添加的商品的数量。
                // console.log(numarr);
                // console.log(sidarr); //当前sid对应的数组的索引位置
                // console.log($.inArray($sid, sidarr)); //当前sid对应的数组的索引位置
                // console.log(numarr[$.inArray($sid, sidarr)]);
                let changenum = parseInt(numarr[$.inArray($sid, sidarr)]) + parseInt($('#input_addnum').val());//原来的数量+当前的数量。
                numarr[$.inArray($sid, sidarr)] = changenum;//数组值改变
                addcookie('cookienum', numarr.toString(), 10);//继续添加cookie 
            } else { //不存在
                sidarr.push($sid); //将编号push进数组
                addcookie('cookiesid', sidarr.toString(), 10); //存储cookie ，整个数组。
                numarr.push($('#input_addnum').val()); //将商品的数量push进数组
                addcookie('cookienum', numarr.toString(), 10);
                sidarr.push($sid);
            }
        });
    });
$('footer').load('footer.html');

}(jQuery)