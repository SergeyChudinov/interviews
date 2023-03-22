// let amount = 100000;
let step = 1000;
let index = 0;
let stopped = false;
let stopCycle = () => {
	console.log(stopped);
	stopped = true;
}
let startCycle = () => {
	index = 0;
	stopped = false;
	continueCycle();
}
let continueCycle = () => {
	stopped = false;
	console.log('index', index)
	cycle(getNextMaxIndex(index))
}

function cycle(maxIndex) {
	if (stopped) {
		return;
	}
	for (let i = index + 1; i <= maxIndex; i++) {
		const a = Math.log2(i);
		console.log(`log2(${i}) = ${a}`)
	}
	let nextMaxIndex = getNextMaxIndex(maxIndex);
	index = maxIndex;
	return setTimeout(() => cycle(nextMaxIndex), 0);
}

function getNextMaxIndex(maxIndex) {
	return maxIndex + step;
}
document.querySelector('.stopCycle').addEventListener('click', () => stopCycle());
document.querySelector('.startCycle').addEventListener('click', () => startCycle());
document.querySelector('.continueCycle').addEventListener('click', () => continueCycle());


// return (maxIndex + step) > amount ? amount : maxIndex + step;