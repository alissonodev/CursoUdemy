function relegio () {
    function getTimeFromSeconds(segundos) {
    const data = new Date(segundos * 1000);
    return data.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'GMT' // Usamos GMT para o cronômetro começar em 00:00:00
    })
}

const relogio = document.querySelector('.relogio');
let segundos = 0;
let timer;

function startClock() {
    timer =setInterval(function() {
        segundos++;
        relogio.innerHTML = getTimeFromSeconds(segundos);
    }, 1000);
}

document.addEventListener('click', function(e){
    const el = e.target;

    if(el.classList.contains('zerar')){
        clearInterval(timer);
        relogio.innerHTML = '00:00:00';
        relogio.classList.remove('pausada');
        segundos = 0;
    }

    if(el.classList.contains('iniciar')){
        relogio.classList.remove('pausada');
        clearInterval(timer);
        startClock();
    }

    if(el.classList.contains('pausar')){
        clearInterval(timer);
    relogio.classList.add('pausada');
    }    
})
}
relegio();