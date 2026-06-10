// argumento que sustenta todos os argumentos enviados
function funcao() {
    let total = 0;
    for (let argumento of arguments) {
        total += argumento;
    }

    console.log(total);
}
funcao(10, 20, 36, 58, 66, 66)

//-----------------------------------------------------

function funcao(a, b, c, d, e, f) {
    console.log(a, b, c, d, e, f);
}
funcao(1, 2, 3);// Os parâmetros não passados serão definidos pelo JS como undefined.

//-----------------------------------------------------

// Declaramos o parâmetro b = 20 caso ele não seja passado.
function funcao(a, b=20) {
    console.log(a + b);
}
funcao(2)// Podemos passar undefined para forçar o uso do valor padrão da função, mesmo que outros parâmetros recebam strings.

//-----------------------------------------------------

// Valor literal
function funcao([valor1, valor2, valor3]) {
    console.log(valor1, valor2, valor3);
}
funcao(['Alisson', 'Cardoso', 26]);