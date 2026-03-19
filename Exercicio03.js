function fizzBuzz(numero){
    if (numero % 3 === 0 && numero % 5 === 0) return 'FizzBuzz'; //Alt+SetaCima/Baixo move a linha
    if (numero % 3 === 0) return 'Fizz'; //(%) operador de resto "módulo" ou "remainder" 
    if (numero % 5 === 0) return 'Buzz';
    return NaN;    
}

for (let i = 0; i <= 100; i++) {
    console.log(i, fizzBuzz(i))
}