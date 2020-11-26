var n = "";
var row = "";
var count = "";
var list_row = "";
var list_col = "";
var list_emp = "";
var emp_num = "";//用於計數，相當於顯示每一筆已獲獎之人員資料
var dt = "";
var time = "";
var refreshSetTimeouId = "";
var mutationObserver = "";
var list_data = "";


$(function () {

    dt = new Date();
    time = (dt.getHours() < 10 ? "0" : "") + dt.getHours() + ":" + (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? "0" : "") + dt.getSeconds();
    $('#btn_bottom>p').html("— 更新時間：" + time + " —");

    // n = 9;//測試用


    list();
    //顯示資料，上面可不理。
    function show_list() {
        $('#inner, .carousel-indicators').empty();
        //這裡可以放連接ajax，回傳之資料(根據序號由大到小排序，最新的再前面，放成陣列或json格式?)存入js變數中，再讓他去跑最下面的迴圈顯示

        // n += 5;//測試用
        row = Math.ceil(n / 9);
        count = 9;
        emp_num = 0;
        dt = new Date();
        time = (dt.getHours() < 10 ? "0" : "") + dt.getHours() + ":" + (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? "0" : "") + dt.getSeconds();
        $('#btn_bottom>p').html("— 更新時間：" + time + " —");

        for (var j = 0; j < row; j++) {

            if (j === 0) {
                list_row = $("<div/>", {
                    "class": "carousel-item active",
                }).appendTo($('#inner'));

                $("<li/>", {
                    "data-target": "#carouselExampleIndicators",
                    "data-slide-to": j,
                    "class": "active",
                }).appendTo($("ol.carousel-indicators"));

            } else {
                list_row = $("<div/>", {
                    "class": "carousel-item",
                }).appendTo($('#inner'));

                $("<li/>", {
                    "data-target": "#carouselExampleIndicators",
                    "data-slide-to": j,
                }).appendTo($("ol.carousel-indicators"));

            }

            list_col = $("<div/>", {
                "class": "col-12 row  row-cols-3",
                "id": "list",
            }).appendTo(list_row);

            if (j + 1 === row) {
                count = n - (row - 1) * count;
            }

            for (var i = 0; i < count; i++) {
                list_emp = `獎項：X獎-$1000 <br>部門：${list_data[emp_num].emp_dep}<br>工號：${list_data[emp_num].emp_no}<br>姓名：${list_data[emp_num].emp_name}`;//** 替換資料值，emp_num是用來對應ajax回傳之陣列
                if (j === 0) {
                    if (i < 5) {
                        $("<div/>", { "class": "new", }).html(list_emp).appendTo(list_col);
                    } else {
                        $("<div/>").html(list_emp).appendTo(list_col);
                    }
                } else {
                    $("<div/>").html(list_emp).appendTo(list_col);
                }
                emp_num += 1;
            }
        };        
    }

    function running() {
        clearTimeout(refreshSetTimeouId);
        if (n < 10) {
            show_list();
            refreshSetTimeouId = setTimeout(function () {
                list();
            }, 3000);
        } else {
            show_list();
        }

        mutationObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.target.getAttribute('data-slide-to') === ($('.carousel-indicators>li').length - 1).toString()) {
                    console.log('-----');
                    refreshSetTimeouId = setTimeout(function () {
                        list();
                    }, 3900);
                }
            });
        });

        /**Element**/
        $('.carousel-indicators>li').each(function (index) {
            mutationObserver.observe($('.carousel-indicators>li')[index], {
                // attributeFilter: ['class', 'active'],
                attributes: true,
            });
        });
    };

    // _ajax_新增人員進資料庫
    function list() {
        clearTimeout(refreshSetTimeouId);
        $.ajax({
            url: 'ajax/emp_emplist.php',
            type: 'post',
            cache: false,
            dataType: 'json',
            data: {
                'action': 'emp_list',
            },
            success: function (data) {
                list_data = data;
                n = Object.keys(data).length;
                console.log(n);
                running();
            },
            error: function (xhr) { alert("發生錯誤: " + xhr.status + " " + xhr.statusText); }
        });
    }

})
