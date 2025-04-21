// const a = prompt("Nhập điểm");
// switch (a) {
//     case 8:
//         alert("học sinh giỏi"); break
//     case 7:
//         alert("học sinh khá"); break
//     case 6:
//         alert("học sinh trung bình"); break
//     default: alert("học sinh yếu");
// }

const a = Number(prompt("Nhập năm:"));
const b = a % 4 === 0&& a % 100 !== 0 || a % 400 === 0;
const m = Number(prompt("Nhập tháng:"));
if (a < 0) {
    alert("Nhập sai năm, vui lòng nhập số nguyên dương.");
}
else {
    switch (m) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            alert("Tháng có 31 ngày");
            break;
        case 4: case 6: case 9: case 11:
            alert("Tháng có 30 ngày");
            break;
        case 2:
            if (b) {
                alert("Tháng có 29 ngày (năm nhuận)");
            } else {
                alert("Tháng có 28 ngày");
            }
            break;
        default:
            alert("Nhập sai tháng, vui lòng nhập từ 1 đến 12.");
    }
}
link: https://www.w3schools.com/js/js_switch.asp