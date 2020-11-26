<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $action = $_POST['action'];
    require_once('connection.php');

    function sql_function($sql, $conn, $mult){
        if($mult){
            $result=$conn->mysqli_multi_query($sql); // 多條sql用
        }else{
            $result=$conn->query($sql); // 單條sql用
        }
        if (mysqli_connect_errno($result)) {die("連線失敗: " . mysqli_connect_errno($result));};
        return $result;
    }

    /* -----check_in-----*/
    //emp_selectAll：報到刷卡頁面顯示已報到人員名單
    if ($action == 'emp_selectAll'){
        $result=sql_function("SELECT * FROM emplist WHERE emp_ckin_type='N' ORDER BY emp_id DESC LIMIT 40",$conn, false);        
        $rows = $result->num_rows;
        $emp_row = array();        
        for ($i = 0; $i < $rows; $i++) {
            $row = mysqli_fetch_array($result);
            array_push($emp_row, array('emp_dep'=>$row['emp_dep'],'emp_no'=>$row['emp_no'],'emp_name'=>$row['emp_name']));
        }
        echo json_encode($emp_row);
    }
    //emp_insert：報到刷卡頁面報到insert
    if ($action == 'emp_insert'){
        $emp_no = $_POST['emp_no'];
        $emp_name = $_POST['emp_name'];
        $emp_dep = $_POST['emp_dep'];
        $result=sql_function("INSERT INTO emplist(emp_no, emp_name, emp_dep) VALUES ('$emp_no', '$emp_name', '$emp_dep')",$conn, false);
    }

    /* -----check_in_input-----*/
    //emp_selectALL_input：手動報到頁面顯示已手動報到人員名單
    if ($action == 'emp_selectALL_input'){    
        $result=sql_function("SELECT * FROM emplist WHERE emp_ckin_type='F' ORDER BY emp_id DESC LIMIT 24",$conn, false);       
        $rows = $result->num_rows;
        $emp_row = array();
        for ($i = 0; $i < $rows; $i++) {
            $row = mysqli_fetch_array($result);
            array_push($emp_row, array('emp_dep'=>$row['emp_dep'],'emp_no'=>$row['emp_no'],'emp_name'=>$row['emp_name']));
        }
        echo json_encode($emp_row);
    }

    //emp_insert_input：手動報到刷卡頁面手動報到insert
    if ($action == 'emp_insert_input'){
        $emp_no = $_POST['emp_no'];
        $emp_name = $_POST['emp_name'];
        $emp_dep = $_POST['emp_dep'];
        $result=sql_function("INSERT INTO emplist(emp_no, emp_name, emp_dep, emp_ckin_type) VALUES ('$emp_no', '$emp_name', '$emp_dep', 'F')",$conn, false);       
    }

    /* -----list-----*/
    if ($action == 'emp_list'){
        $result=sql_function("SELECT * FROM `emplist` WHERE emp_lottery <> '0' ORDER BY emp_lottery DESC",$conn, false);        
        $rows = $result->num_rows;
        $emp_row = array();   
        for ($i = 0; $i < $rows; $i++) {
            $row = mysqli_fetch_array($result);
            array_push($emp_row, array('emp_dep'=>$row['emp_dep'],'emp_no'=>$row['emp_no'],'emp_name'=>$row['emp_name']));
        }
        echo json_encode($emp_row);
    }



    $conn -> close();  
}else{
    echo "不要亂執行！";
}
?>
