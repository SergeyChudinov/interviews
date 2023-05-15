function duplicateEncode2(word){
  const newArr = [];
	for (let i = 0; i < word.length; i++) {
		let arr = word.split('').filter(l => l === word[i]);
		if (arr.length > 1) {
			newArr.push(')');
		} else  {
			newArr.push('(');
		}
	}
	return newArr.join('');
}

function duplicateEncode(word){
	return word.split('').map(let => {
		if (word.split('').filter(l => l === let).length > 1) {
			return ')';
		} else {
			return '(';
		}
	}).join('');
}


console.log(duplicateEncode('din'));
console.log(duplicateEncode('recede'));
console.log(duplicateEncode('Success'));
console.log(duplicateEncode('(( @'));

