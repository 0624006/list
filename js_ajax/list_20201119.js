var n = "";
var row = "";
var count = "";
var list_row = "";
var list_emp = "";
var emp_num = "";//用於計數，相當於顯示每一筆已獲獎之人員資料
var dt = "";
var time = "";
var refreshSetTimeouId = "";
var delay = "";
var list_data = "";

$(function () {

    dt = new Date();
    time = (dt.getHours() < 10 ? "0" : "") + dt.getHours() + ":" + (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? "0" : "") + dt.getSeconds();
    $('#btn_bottom>p').html("— 更新時間：" + time + " —");


    list();
    //顯示資料，上面可不理。
    function show_list() {
        clearTimeout(refreshSetTimeouId);
        $('#boardbg').empty();

        row = Math.ceil(n / 9);
        count = 9;
        delay = 0;
        emp_num = 0;
        dt = new Date();
        time = (dt.getHours() < 10 ? "0" : "") + dt.getHours() + ":" + (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? "0" : "") + dt.getSeconds();
        $('#btn_bottom>p').html("— 更新時間：" + time + " —");

        for (var j = 0; j < row; j++) {

            list_row = $("<div/>", {
                "class": "item row row-cols-3",
                "style": `--delay:${delay}s; `,
            }).appendTo($('#boardbg'));

            if (j + 1 === row) {
                count = n - (row - 1) * count;
            }

            for (var i = 0; i < count; i++) {

                list_emp = `獎項：X獎-$1000 <br>部門：${list_data[emp_num].emp_dep}<br>工號：${list_data[emp_num].emp_no}<br>姓名：${list_data[emp_num].emp_name}`;//** 替換資料值，emp_num是用來對應ajax回傳之陣列
                if (j === 0) {
                    if (i < 5) {
                        $("<div/>", { "class": "new", }).html(list_emp).appendTo(list_row);
                    } else {
                        $("<div/>").html(list_emp).appendTo(list_row);
                    }
                } else {
                    $("<div/>").html(list_emp).appendTo(list_row);
                }
                emp_num += 1;
            }
            delay += 5;
        };

        if (delay == 0) delay = 3; // 當資料庫都沒有獎序時，設定每3秒呼叫資料

        refreshSetTimeouId = setTimeout(function () {
            list();
        }, delay * 1000);

    };

    // _ajax_新增人員進資料庫
    function list() {
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
                show_list();
            },
            error: function (xhr) { alert("發生錯誤: " + xhr.status + " " + xhr.statusText); }
        });
    }

})
