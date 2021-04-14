class Calculator {

	add(a, b){
		return a+b;
	}

	sub(a, b){
		return a-b;
	}

	mul(a, b){
		return a*b;
	}

	div(a, b){
		return a/b;
	}

	per(a, b){
		return a*100/b;
	}
}

let calculator = new Calculator;

let a = prompt('Введите число')*1;
let b = prompt('Введите число')*1;

console.log(a+' + '+b+' = '+calculator.add(a, b));
console.log(a+' - '+b+' = '+calculator.sub(a, b));
console.log(a+' * '+b+' = '+calculator.mul(a, b));
console.log(a+' / '+b+' = '+calculator.div(a, b));
console.log(a+' / '+b+' = '+calculator.per(a, b)+'%');
