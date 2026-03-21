function soma(x, y){
    // Validação: verifica se ambos são números
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new Error('x e y precisa ser número.');
    }        

    return x + y;
}

try {
    // CASO 1: Sucesso (Passando dois números separados por vírgula)
    console.log(soma(100, 200));
    // CASO 2: Erro (Passando uma string)
    // O código vai parar aqui e pular direto para o catch
    console.log(soma('50' + 70));
} catch(error) {
    // console.log(error); // Mostra o erro técnico no console do desenvolvedor
    console.log(error); // Boa pratica é não exiber o erro para o usuário final. 
    console.log('Alguma coisa mais amigável pro usuario.');
}