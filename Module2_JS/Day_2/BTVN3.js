i = -100;
a=0;
b=0;

for (i = 1; i <= 50; i++) {
    a = a + i;
}
console.log("Tổng 1-50 là: a=", a);

for (i = -10; i <= 50; i++) {
    if (i % 2 == 0) {
        b = b + i++;
    }
}
console.log("Tổng chẵn từ -10 -> 50 là: b=", b);

for (i = -100; i <= 100; i++) {
    if (i % 9 == 0) {
        console.log("số:", i);
    }
}