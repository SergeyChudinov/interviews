const NodeList = document.querySelectorAll('div');
const HTMLColection = document.getElementsByTagName("div");

[...NodeList][0].remove()

console.log(NodeList);
console.log(HTMLColection);

console.log(document.body.childNodes)
console.log(document.body.children);

NodeList.forEach(el => console.log(el))
// HTMLColection.forEach((el) => console.log(el)); // не работает

// [].filter.call(NodeList, (el, i) => i !== 1)
console.log([].join.call(NodeList, '-')); // [object HTMLDivElement]-[...]
console.log([].filter.call(NodeList, (el, i) => i !== 1)); // [div, div]
console.log(Array.prototype.join.call(NodeList, "-")); // [object HTMLDivElement]-[...]
console.log(Array.prototype.filter.call(NodeList, (el, i) => i !== 1)); //[div, div]

div.before("<p>Привет</p>", document.createElement("hr"));

const elem = document.querySelector("#elem");
// elem.addEventListener("click", {
// 	handleEvent(event) {
// 		console.log(event.type + " на " + event.currentTarget);
// 	},
// });

// class Menu {
// 	handleEvent(event) {
// 		switch (event.type) {
// 			case "mousedown":
// 				elem.innerHTML = "Нажата кнопка мыши";
// 				break;
// 			case "mouseup":
// 				elem.innerHTML += "...и отжата.";
// 				break;
// 		}
// 	}
// }

class Menu {
  handleEvent(event) {
    // mousedown -> onMousedown
    let method = "on" + event.type[0].toUpperCase() + event.type.slice(1);
    this[method]();
  }
  onMousedown() {
    elem.innerHTML = "Кнопка мыши нажата";
  }

  onMouseup() {
    elem.innerHTML += "...и отжата.";
  }
}

let menu = new Menu();
elem.addEventListener("mousedown", menu);
elem.addEventListener("mouseup", menu);