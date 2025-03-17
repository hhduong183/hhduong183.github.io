$sql_acc = "SELECT * FROM account WHERE id = 1";

$sql_acc = "SELECT * FROM account WHERE id = 1";

switch ($row_acc['quyen']) {
case 1:
echo "Quản trị viên";
break;
case 2:
echo "Trương phòng";
break;
case 3:
echo "Phó phòng";
break;
case 4:
echo "Trưởng nhóm";
break;
default:
echo "Nhân viên";
break;
}