// у && выше приоритет чем у ||
console.log( NaN || 2 || undefined ); // 2
console.log( NaN && 2 && undefined ); // Nan
console.log( 1 && 2 && 3 ); // 3
console.log( !1 && 2 || !3 ); // false
console.log( 25 || null && !3 ); // false -не верно => 25
console.log( NaN || null || !3 || undefined || 5); // 5
console.log( NaN || null && !3 && undefined || 5); // null -не верно => 5
console.log( 5 === 5 && 3 > 1 || 5); // true

// const hamburger = 3;
// const fries = 3;
// const cola = 0;
// const nuggets = 2;
// if (hamburger === 3 && cola || fries === 3 && nuggets) {
// 	console.log(hamburger === 3 && cola || fries === 3 && nuggets); // 2
//    console.log('Done!')
// }

// let hamburger;
// const fries = NaN;
// const cola = 0;
// const nuggets = 2;
// if (hamburger || cola || fries === 3 || nuggets) {
// 	console.log(hamburger || cola || fries === 3 || nuggets); // 2
//   console.log('Done!')
// }

let hamburger;
const fries = NaN;
const cola = 0;
const nuggets = 2;
console.log(hamburger && cola || fries === 3 && nuggets); // false
if (hamburger && cola || fries === 3 && nuggets) {
  console.log('Done!')
}
