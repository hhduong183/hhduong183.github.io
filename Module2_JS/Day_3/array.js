const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const b = [2, 4, 6, 8, 10];
const x = "them vao dau";
const y = "them vao cuoi";
b[b.length] = "1";
console.log(b);

for (let i = b.length - 1; i > 0; i--) {
    if (i != 0) {
        b[i] = b[i - 1];
        console.log("so i=", i);
    } 
    else {
        
    }
}
b[0] = x;
console.log(b);
a[a.length] = y;

console.log(a);
console.log(a.length);
a.length=a.length-1;
console.log(a);
a.push(y);




 a1="1,2,3,4,5,6,7,8,9,10,11";
console.log(a1);
// console.log(a.length);