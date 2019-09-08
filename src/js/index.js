
!function ($) {
    // 引入头部
    $('header').load('head.html');



    // 轮播图
    class lunbo {
        constructor() {
            this.sambanner = $('.sambanner');
            this.banner_pic = $('.sambanner .banner_pic');
            this.banner_piclist = $('.banner_pic li');
            this.banne_trig = $('.sambanner .banner_trig');
            this.banner_triglist = $('.banner_trig li');
            this.num = 0; //当前操作的按钮的索引。
            this.timer = null;
        }
        init() {
            let _this = this;
            this.banner_triglist.on("click", function () {
                _this.num = $(this).index();
                _this.tabswitch(_this.num);
            });
            this.timer = setInterval(function () {
                _this.num++;
                _this.indexadd();
                _this.tabswitch(_this.num);
            }, 2000)

            this.sambanner.hover(function () {
                clearInterval(_this.timer);
            }, function () {
                _this.timer = setInterval(function () {
                    _this.num++;
                    _this.indexadd();
                    _this.tabswitch(_this.num);
                }, 2000)
            });
        }
        // 索引增加
        indexadd() {
            if (this.num > this.banner_triglist.length - 1) {
                this.num = 0;
            }
        }
        //切换
        tabswitch($index) {
            $(this.banner_piclist).eq($index).animate({ opacity: 1 }).siblings().css({ opacity: 0 });
            $(this.banner_triglist).eq($index).addClass('cur').siblings().removeClass('cur');
        }

    }
    new lunbo().init();

    
    // 会员热购列表

    class bestbuy {
        constructor() {
            this.bestbuy_scroll = $('.bestbuy_scroll');
            this.bestbuy_right = $('.bestbuy_right');
            this.btn = $(".btn");
            this.btn_prev = $('.btn_prev');
            this.btn_next = $('.btn_next');
        }
        init() {
            // alert(1);

            $(this.bestbuy_scroll).hover(function () {
                $(this).find('.btn').css('opacity', '0').animate({
                    opacity: 1
                });
                $(this).find('.btn').animate({
                    opacity: 0
                });
            });
        }
    }
    new bestbuy().init();

    // 渲染列表
    $.ajax({
        url: "http://localhost/1907-project-zxm/src/php/sanmu.php",
        dataType: 'json',
    }).done(function (recommends) {

        let strhtml = '<ul>';
        $.each(recommends, function (index, value) {
            strhtml += `
            <li>
            <a href="detail.html?sid=${value.sid}" target='_blank'>
                <div class="imgbox">
                    <img alt=""
                        src="${value.url}">
                </div>
                <div class="marking_save">
                    <div class="savebox">
                        <p>已省</p>
                        <p><em>¥</em>20.0</p>
                    </div>
                </div>
                <p class="good_title">
                    <i class="jsd-tag"></i>
                    ${value.titile}
                </p>

                <span class="price"><em>¥</em>${value.price}</span>
            </a>
            <div class="instructor_goods">
                <p class="goods-info">饼皮柔和绵软</p>
                <p class="goods-info">莲蓉清香幼滑 蛋黄饱满鲜香</p>
            </div>
        </li>`

        })
        strhtml += `</ul>`;

        $('.rec_goodslist').html(strhtml);
    })

    $('footer').load('footer.html');
}(jQuery);