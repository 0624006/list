
$(function () {
    var emp = "";// 上方報名成功之顯示字串
    var list_emp = ""; // 撈取人員名單span
    var emp_dep = "", emp_no = "", emp_name = ""; //紀錄部門、工號、姓名
    selectALL();//查詢資料庫是否有值
    /*-------預設值-------*/

    document.body.onselectstart = document.body.oncontextmenu = function () { return false; }
    $('#txt_add').focus();
    $("#txt_add").blur(function () {
        $('#txt_add').focus();
    });
    $('#txt_add').on('change', function () {
        console.log($(this).val());
        $(this).val('');
        list();
    });
    $('#btn_add').on('click', function () {
        list();
    });

    function list() {
        list_emp = $(".emp_list>span");
        if (list_emp.length === 40) {
            list_emp[39].remove();
        }
        emp_no = `${getRandom(0, 9)}${getRandom(0, 9)}${getRandom(0, 9)}${getRandom(0, 9)}${getRandom(1, 9)}`;
        emp_name = '測試中';
        emp_dep = 'MIS';

        // emp = `0000${getRandom(1, 9)}　XXX`; // 報到人員，格式：09136　林鈺真
        emp = `${emp_no}　${emp_name} `; // 報到人員，格式：09136　林鈺真
        console.log(emp);
        $('.emp>span').html(`${emp}　報到成功！`); // 報到成功提示
        $('.emp_list').prepend($("<span/>", { "text": emp, })); // 顯示人員名單
        insert(emp_no, emp_name, emp_dep);
    }

    // _ajax_撈取已報到人員
    function selectALL() {
        $.ajax({
            url: 'ajax/emp_emplist.php',
            type: 'post',
            cache: false,
            dataType: 'json',
            data: {
                'action': 'emp_selectAll',
            },
            success: function (data) {
                console.log(data);
                $.each(data, function (index, n) {
                    emp = data[index].emp_no + "　" + data[index].emp_name;
                    $('.emp_list').append($("<span/>", { "text": emp, })); // 顯示人員名單
                });
            },
            error: function (xhr) { alert("發生錯誤: " + xhr.status + " " + xhr.statusText); }
        });
    }

    // _ajax_新增人員進資料庫
    function insert(emp_no, emp_name, emp_dep) {
        $.ajax({
            url: 'ajax/emp_emplist.php',
            type: 'post',
            cache: false,
            dataType: 'text',
            data: {
                'action': 'emp_insert',
                'emp_no': emp_no,
                'emp_name': emp_name,
                'emp_dep': emp_dep,
            },
            success: function (data) {
            },
            error: function (xhr) { alert("發生錯誤: " + xhr.status + " " + xhr.statusText); }
        });
    }


    /* 測試用，亂數替代，產出min(含) ~ max(含)之間的值 */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

});
