function count(string) {
  const obj = {};
  for (let i = 0; i < string.length; i++) {
    if (!obj.hasOwnProperty(string[i])) {
			obj[string[i]] = 1;
    } else {
			obj[string[i]]++;
		}
  }
  return obj;
}

function count1 (string) {  
  var count = {};
  string.split('').forEach(function(s) {
     count[s] ? count[s]++ : count[s] = 1;
  });
  return count;
}

function count2 (string) {
  return string.split('').reduce(function(counts,char){
    counts[char] = (counts[char] || 0) + 1;
    return counts;
  },{});
}

function count3 (string) {
  return string.split('').reduce((counts,char) => 
    (counts[char] = (counts[char]||0) + 1, counts),{});
}

console.log(count(''));
console.log(count('a'));
console.log(count('abaaa'));
console.log(count('aba'));
console.log(count('ABC'));
