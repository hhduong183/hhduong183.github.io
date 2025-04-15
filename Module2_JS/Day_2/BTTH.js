a=prompt("Nhập số a: ");
b=prompt("Nhập số b: ");
x=prompt("Nhập số x: ");
if (a<b) {
    if (x==a) {
        console.log("x=a");
    }
    else {
        if (x==b) {
            console.log("x=b");
        }
        else {
            if (x>a && x<b) {
                console.log("a<x<b");
            }
            else {
                console.log("x không thuộc khoảng a,b");
            }
        }
    }
}
else {
    console.log("a không nhỏ hơn b");
}
