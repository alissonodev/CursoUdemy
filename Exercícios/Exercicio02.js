function ePaisagem(largura, altura) {
    return largura > altura; // Se colocar um >= ele retorna "true" caso a imagem for quadrada.
}

console.log(ePaisagem(1080, 1920))

//Rescrevi o código
const ePaisagem2 = (largura, altura) => largura >= altura;
console.log(ePaisagem2(1920, 1920))