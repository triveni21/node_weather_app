console.log('Starting app..');

setTimeout(() => {
	console.log('Inside callback');
}, 2000);

setTimeout(() => {
	console.log('Second callback');
}, 0);

console.log('Finishing app..');

// Call stack: Is like DS
// We can not process callback till call stack is empty, what is it takes more time that timeout