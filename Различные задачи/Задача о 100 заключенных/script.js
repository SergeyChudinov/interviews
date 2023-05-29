let array = [];
while (array.length < 100) {
    const num = Math.floor(Math.random() * 100 + 1);
    if (array.includes(num)) {
        continue;
    } else {
        array.push(num);
    } 
}
console.log(array);
// console.log(array.sort((a, b) => a - b));
const cloneArray = [...array].sort((a, b) => a - b)
console.log(cloneArray);

document.querySelectorAll('.box').forEach((el, index) => {
    el.textContent = array[index];
})
// document.querySelectorAll('.box').forEach(el => {
//     el.addEventListener('click', event => {
//         event.target.classList.toggle('red');
//     })
// })

document.querySelector('button').addEventListener('click', play);
function play() {
    let color = 0;
    let x = cloneArray[0];
    let i = x;
    const boxEls = document.querySelectorAll('.box');

    while (cloneArray.length > 0) { 
        x = cloneArray[0];
        i = x;
        console.log(x);
        console.log(+boxEls[i - 1].textContent);
        while (+boxEls[i - 1].textContent != x) {
            console.log(`Открыли коробку под номером ${i}, в ней был номер ${boxEls[i - 1].textContent}`);
            
            boxEls[i - 1].style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
            let index = cloneArray.indexOf(+i);
            console.log(index);
            cloneArray.splice(index, 1);
            i = boxEls[i - 1].textContent;
            
        } 
        if (+boxEls[i - 1].textContent == x) {
            console.log(`Открыли коробку под номером ${i}, в ней был номер ${boxEls[i - 1].textContent}`);
            boxEls[i - 1].style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
            let index = cloneArray.indexOf(+i);
            console.log(index);
            cloneArray.splice(index, 1);
        }
        console.log(cloneArray);
        // color = Math.floor(Math.random() * 300 + 1);
        color += 50;
    }

};
function render() {
    console.log(`Открыли коробку под номером ${i}, в ней был номер ${boxEls[i - 1].textContent}`);
    boxEls[i - 1].style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
    let index = cloneArray.indexOf(+i);
    console.log(index);
    cloneArray.splice(index, 1);
};
