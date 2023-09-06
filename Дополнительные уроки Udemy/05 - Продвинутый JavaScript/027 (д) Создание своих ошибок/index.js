'use strict';

// для ошибки удалим из строки id или tag, разные ошибки
const data = [
    {
        id: 'box',
        tag: 'div'
    },
    {
        id: '1',
        tag: 'nav'
    },
    {
        id: 'circle',
        tag: 'nav'
    }
]

try {
	try {
		data.forEach((blockObj, i) => {
			const block = document.createElement(blockObj.tag);
			if (!blockObj.id) throw new SyntaxError(`В данных под номером ${i + 1} нет id`);
			block.setAttribute('id', blockObj.id);
			document.body.append(block);
		})
	} catch(e) {
		if (e.name === 'SyntaxError') {
			console.error(e.message);
		} else {
			throw e;
		}	
	}
} catch(e) {
	console.error(e.message);
}

// const err = new SyntaxError('abc');
// console.log(err.name, err.message, err.stack)