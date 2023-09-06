//queueMicrotask() - код код, выполниться после макрозадач , но до render!

// () => {}
//микротаски => than, catch, finally и await
// render
// () => {}
//микротаски => than, catch, finally и await
// render
// () => {}
// это горантирует, что общее окружение страницы, остается одним и темже между микрозадачами!

setTimeout(() => console.log('timeout'));
Promise.resolve().then(() => console.log('promise'));
queueMicrotask(() => console.log('queueMicrotask'));
Promise.resolve().then(() => console.log('promise2'));
console.log('code')