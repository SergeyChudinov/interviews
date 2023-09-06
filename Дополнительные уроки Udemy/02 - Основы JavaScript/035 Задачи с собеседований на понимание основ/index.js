// Какое будет выведено значение: let x = 5; alert( x++ ); ?
let x = 5;
console.log( x++ );
// Чему равно такое выражение: [ ] + false - null + true ?
console.log([ ] + false - null + true) // NaN
/* [ ] + false => ''
[ ] + false = 'false'
'false' - null = NaN
NaN + true = NaN
*/
// Что выведет этот код:  
let y = 1; let z = y = 2; // присвоение идет справо налево!
console.log(z) // 2
console.log(y) // 2
// Чему равна сумма [ ] + 1 + 2?
console.log([ ] + 1 + 2) // '12'
// Что выведет этот код: alert( "1"[0] )?
console.log("1"[0]) // '1'
// Чему равно 2 && 1 && null && 0 && undefined ?
console.log(2 && 1 && null && 0 && undefined) // null
// Есть ли разница между выражениями? !!( a && b ) и (a && b)?
console.log(!!( 1 && 2 )) // true
console.log((1 && 2)) // 2
// Что выведет этот код: alert( null || 2 && 3 || 4 ); ?
console.log( null || 2 && 3 || 4 ) // 3
// Правда ли что a == b ?
a = [1, 2, 3]; b = [1, 2, 3];
console.log(a === b) // false;
// Что выведет этот код: alert( +"Infinity" ); ?
console.log( +"Infinity" ) // NaN -ошибка => Infinity
// Верно ли сравнение: "Ёжик" > "яблоко"?
console.log("Ёжик" > "яблоко") // false   (смотреть юникод!)
// Чему равно 0 || "" || 2 || undefined || true || falsе ?
console.log(0 || "" || 2 || undefined || true || falsе) // 2