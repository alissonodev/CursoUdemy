/**
 * Função que recebe uma data e retorna apenas a hora formatada.
 * @param {Date} data - Opcional. Se não enviado, usa a data atual.
 */
function retonaHora(data) {
    // Verifica se foi enviado algo E se esse 'algo' NÃO é uma instância de Date
    // Isso evita que tentem passar strings ou números diretamente aqui
    if (data && !(data instanceof Date)) {
        throw new TypeError('Esperando instância de Date.');
    }

    // Se a variável 'data' estiver vazia (null, undefined, etc)
    if (!data) {
        // Cria um novo objeto com a data e hora exata deste momento
        data =  new Date();
    }

    // Retorna a hora formatada usando as configurações do Brasil (pt-BR)
    return data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',   // Hora com 2 dígitos (ex: 09)
        minute: '2-digit', // Minutos com 2 dígitos
        second: '2-digit', // Segundos com 2 dígitos
        hour12: false      // Usa formato 24h (se true, usaria AM/PM)
    });
}

try {
    // Chama a função sem passar nada (ela vai usar a hora atual do sistema)
    const hora = retonaHora();
    console.log(hora);
} catch(e) {
    // Se qualquer erro (throw) acontecer no 'try', o código pula para cá
    // 'e' guarda as informações do erro que aconteceu
    console.log(e);
} finally {
    // Este bloco **SEMPRE** será executado, independente de ter dado erro ou não
    console.log('Boa tarde!');
}