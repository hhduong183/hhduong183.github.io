let a = question("Nhập tuổi của bạn: ");
if (a >= 18) {
    console.log("Người dùng đã đủ tuổi");
} else {
    if (a < 18 && a >= 16) {
        console.log("Đợi xíu nữa nhé");
    } else { 
        console.log("Người dùng chưa đủ tuổi"); 
    }
}

