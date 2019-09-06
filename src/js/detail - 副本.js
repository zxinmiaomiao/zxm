!function ($) {

    // 取得首页传过来的值
    $sid = location.search.substring(1).split('=')[1];
    $.ajax({
        url: "http://localhost/1907-project-zxm/src/php/getdata.php",
        data: {
            sidm: $sid,
        },
        dataType: 'json'
    }).done(function (d) {
        console.log(d);
        let $smallpic = d.urls.split(',');
        console.log($smallpic);
        $('#small_pic img').attr('src', d.url);
        $('#small_pic img').attr('sid', d.sid); //添加自定义属性sid
        $('#goods_titile_detail').html(d.titile);
        $('.pricenum strong ').html(d.price);
        //拼接小图片
        let $htmlstr = ''
        $.each($smallpic, function (index, value) {
            $htmlstr += `
                <li>
                    <img src="${value}" />
                </li>
            `;
        });
        $('.enlarge_box .movelist ul').html($htmlstr);

    });

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
            $('#right').on('click',function(){
                var $list=$('#list ul li');//8
                if($list.length>$num){
                    $num++;
                    $('#left').css('color','#333');
                    if($list.length==$num){
                        $('#right').css('color','#fff');
                    }
                    $('#list ul').animate({
                        left:-($num-6)*$list.eq(0).innerWidth()
                    })
                }
            });


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

        // rightclick() {
        //     if (this.list.length > this.num) {
        //         this.num++;
        //         this.left.css('color', '#333');
        //         if (this.num === this.list.length) {
        //             this.right.css('color', '#fff');
        //         }
        //         this.ullist.animate({
        //             top: - this.liheight * (this.num - 6)
        //         }).css({ top: 0 });

        //     }
        // }
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







    // 购物车数量增加



}(jQuery)