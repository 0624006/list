
$(function () {
    var emp = "";// 上方報名成功之顯示字串
    var list_emp = ""; // 撈取人員名單span
    var emp_dep = "", emp_no = "", emp_name = "";//紀錄部門、工號、姓名
    selectALL_input();//查詢資料庫是否有值
    /*-------預設值-------*/

    $('#submit').on('click', function () {
        var tmp = $('.emp>div>input');
        emp_dep = tmp.eq(0).val();
        emp_no = tmp.eq(1).val();
        emp_name = tmp.eq(2).val();
        if (emp_dep != "" && emp_no != "" && emp_name != "") {
            //存進資料庫
            list();
            tmp.eq(0).val("");
            tmp.eq(1).val("");
            tmp.eq(2).val("");
        } else {
            alert('請填寫部門、工號與姓名，再送出！');
        }
    });

    function list() {
        list_emp = $(".emp_list>span");
        if (list_emp.length === 40) {
            list_emp[39].remove();
        }
        emp = `${emp_dep} ${emp_no} ${emp_name}`; // 報到人員，格式：09136　林鈺真
        console.log(emp);
        $('.emp>span').html(`${emp}　報到成功！`); // 報到成功提示
        $('.emp_list').prepend($("<span/>", { "text": emp, })); // 顯示人員名單
        insert_input(emp_no, emp_name, emp_dep);
    }

    // _ajax_撈取已報到人員
    function selectALL_input() {
        $.ajax({
            url: 'ajax/emp_emplist.php',
            type: 'post',
            cache: false,
            dataType: 'json',
            data: {
                'action': 'emp_selectALL_input',
            },
            success: function (data) {
                console.log(data);
                $.each(data, function (index, n) {
                    emp = data[index].emp_dep + "　" + data[index].emp_no + "　" + data[index].emp_name;
                    $('.emp_list').append($("<span/>", { "text": emp, })); // 顯示人員名單
                });
            },
            error: function (xhr) { alert("發生錯誤: " + xhr.status + " " + xhr.statusText); }
        });
    }

    // _ajax_新增人員進資料庫
    function insert_input(emp_no, emp_name, emp_dep) {
        $.ajax({
            url: 'ajax/emp_emplist.php',
            type: 'post',
            cache: false,
            dataType: 'text',
            data: {
                'action': 'emp_insert_input',
                'emp_no': emp_no,
                'emp_name': emp_name,
                'emp_dep': emp_dep,
            },
            success: function (data) {
            },
            error: function (xhr) { alert("發生錯誤: " + xhr.status + " " + xhr.statusText); }
        });
    }

});
