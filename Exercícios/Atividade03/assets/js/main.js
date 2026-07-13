/**
 * Passo 1: Definição da Função Fábrica
 * Cria o objeto da calculadora com todas as suas propriedades e métodos.
 */
function criaCalculadora() {
  return {
    // Busca o elemento da tela (input) no HTML
    display: document.querySelector('.display'),

    /**
     * Passo 2: Inicialização
     * Ativa todos os ouvintes de eventos (clique e teclado) simultaneamente.
     */
    inicia() {
      this.cliqueBotoes();
      this.pressionaBackSpace();
      this.pressionaEnter();
    },

    /**
     * Passo 3: Controle do Teclado - Botão Backspace
     * Captura quando o usuário aperta a tecla de apagar no teclado.
     */
    pressionaBackSpace() {
      this.display.addEventListener('keydown', e => {
        if (e.keyCode === 8) { // Código 8 representa a tecla Backspace
          e.preventDefault();  // Evita o comportamento padrão do navegador
          this.apagaUm();      // DIFERENÇA: Agora apaga um por um, em vez de limpar tudo!
        }
      });
    },

    /**
     * Passo 4: Controle do Teclado - Botão Enter
     * Captura quando o usuário aperta Enter para ver o resultado.
     */
    pressionaEnter() {
      this.display.addEventListener('keyup', e => {
        if (e.keyCode === 13) { // Código 13 representa a tecla Enter
          this.realizaConta();
        }
      });
    },

    /**
     * Passo 5: Processamento Matemático
     * Executa a conta digitada usando a função nativa eval().
     */
    realizaConta() {
      let conta = this.display.value;

      try {
        conta = eval(conta);

        // CORREÇÃO: Garante que se o resultado for 0, ele não dê "Conta inválida"
        if (!conta && conta !== 0) {
          alert('Conta inválida');
          return;
        }

        this.display.value = String(conta);
      } catch(e) {
        alert('Conta inválida');
        return;
      }
    },

    /**
     * Passo 6: Limpeza Total
     * Reseta o visor da calculadora deixando-o vazio.
     */
    clearDisplay() {
      this.display.value = '';
    },

    /**
     * Passo 7: Limpeza Parcial
     * Remove o último caractere da string usando fatiamento (slice).
     */
    apagaUm() {
      this.display.value = this.display.value.slice(0, -1);
    },

    /**
     * Passo 8: Controle de Cliques (Mouse)
     * Escuta os cliques na tela e decide o que fazer com base na classe do botão.
     */
    cliqueBotoes() {
      document.addEventListener('click', e => {
        const el = e.target; // Elemento clicado

        if(el.classList.contains('btn-num')) {
          this.btnParaDisplay(el.innerText);
        }

        if(el.classList.contains('btn-clear')) {
          this.clearDisplay();
        }

        if(el.classList.contains('btn-del')) {
          this.apagaUm();
        }

        if(el.classList.contains('btn-eq')) {
          this.realizaConta();
        }

        // DIFERENÇA DO SEU CÓDIGO: Mantém o foco no input para o teclado continuar funcionando
        this.display.focus();
      });
    },

    /**
     * Passo 9: Alimentação do Visor
     * Concatena o novo número ou operador ao texto existente.
     */
    btnParaDisplay(valor) {
      this.display.value += valor;
    }

  };
}

// Instanciação e execução do código
const calculator = criaCalculadora();
calculator.inicia();