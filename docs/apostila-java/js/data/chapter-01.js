(function () {

  const html = `
  <div class="chapter">
    <p class="chapter-eyebrow">CAPÍTULO 1 · PARTE I — FUNDAMENTOS DA LINGUAGEM</p>
    <h1 class="chapter-title">O primeiro instante do movimento</h1>
    <p class="chapter-lede">O PhysicsLab começa da forma mais simples possível: uma partícula, uma
    posição, uma velocidade, um instante de tempo. Este capítulo constrói a primeira linha do projeto
    e, com ela, as ferramentas mais básicas de Java.</p>

    <div class="chapter-meta">
      <span class="chip">variáveis</span>
      <span class="chip">tipos primitivos</span>
      <span class="chip">operadores aritméticos</span>
      <span class="chip">System.out</span>
    </div>

    <section id="aprender">
      <h2>O QUE VAMOS APRENDER</h2>
      <ul class="concept-list">
        <li>O que são variáveis e por que Java exige que você declare um tipo para cada uma</li>
        <li>Os tipos primitivos mais usados no projeto: <code>double</code>, e uma visão geral dos outros sete</li>
        <li>Operadores aritméticos e de atribuição (<code>+ - * / +=</code>)</li>
        <li>Como imprimir valores no console combinando texto e números</li>
      </ul>
    </section>

    <section id="construir">
      <h2>O QUE VAMOS CONSTRUIR</h2>
      <p>Um único arquivo, <code>Main.java</code>, que representa uma partícula se movendo em linha reta
      com velocidade constante e calcula sua posição depois de um certo tempo. É pouco código — mas é
      o primeiro tijolo real do PhysicsLab, não um exemplo descartável.</p>
    </section>

    <section id="conceito">
      <h2>CONCEITO</h2>
      <p>Uma <strong>variável</strong> é um espaço nomeado na memória do programa que guarda um valor.
      Em Java, toda variável tem um <strong>tipo</strong> fixo, definido no momento em que ela é criada,
      e esse tipo nunca muda depois. Isso é diferente de linguagens como Python ou JavaScript, onde uma
      mesma variável pode guardar um número e depois um texto. Java é <strong>fortemente tipado</strong>:
      o compilador verifica, antes mesmo do programa rodar, se cada valor é compatível com o tipo da
      variável que vai recebê-lo. Isso custa um pouco de verbosidade na declaração, mas evita uma classe
      inteira de erros que só apareceriam em tempo de execução em linguagens mais permissivas.</p>

      <p>Java tem oito <strong>tipos primitivos</strong> — tipos que não são objetos e guardam o valor
      diretamente, sem indireção. Os quatro que você vai usar com mais frequência no início do projeto:</p>

      <table class="roadmap-table">
        <thead><tr><th>Tipo</th><th>Guarda</th><th>Exemplo no projeto</th></tr></thead>
        <tbody>
          <tr><td class="v">double</td><td>número com casas decimais (64 bits)</td><td class="c">posição, velocidade, tempo</td></tr>
          <tr><td class="v">int</td><td>número inteiro (32 bits)</td><td class="c">contagem de passos da simulação (Cap. 3)</td></tr>
          <tr><td class="v">boolean</td><td><code>true</code> ou <code>false</code>, nada mais</td><td class="c">"a partícula ainda está em movimento?" (Cap. 2)</td></tr>
          <tr><td class="v">char</td><td>um único caractere</td><td class="c">não usado no projeto por enquanto</td></tr>
        </tbody>
      </table>
      <p class="ref-note">Os outros quatro (<code>byte</code>, <code>short</code>, <code>long</code>,
      <code>float</code>) existem para casos de memória ou precisão específicos — a
      <a class="ref-link" href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html" target="_blank" rel="noopener">documentação oficial da Oracle</a>
      descreve os oito em detalhe.</p>

      <p>Escolhemos <code>double</code> para grandezas físicas porque posição, velocidade e tempo raramente
      são números inteiros — e porque <code>double</code> tem precisão suficiente para os cálculos deste
      projeto sem a complexidade de tipos de ponto flutuante mais estreitos como <code>float</code>.</p>

      <p>Os <strong>operadores aritméticos</strong> (<code>+</code>, <code>-</code>, <code>*</code>,
      <code>/</code>) funcionam sobre variáveis numéricas como você espera da matemática. O operador
      <code>=</code> não significa igualdade — significa <em>atribuição</em>: "calcule o que está à
      direita e guarde o resultado na variável à esquerda". E <code>System.out.println(...)</code> imprime
      uma linha no console; quando você usa <code>+</code> entre um texto e um número, Java converte o
      número em texto automaticamente antes de concatenar.</p>
    </section>

    <section id="antes-do-codigo">
      <h2>ANTES DO CÓDIGO</h2>
      <p>Queremos responder uma pergunta simples: se uma partícula parte de uma posição inicial
      <code>x₀</code>, com velocidade constante <code>v</code>, onde ela estará depois de um tempo
      <code>t</code>?</p>

      <div class="callout bad">
        <span class="callout-label">UMA SOLUÇÃO RUIM</span>
        <p>Calcular o resultado na cabeça (ou numa calculadora) e escrever
        <code>System.out.println("Posição final: 13.5 m")</code>. Funciona uma vez, para um único caso.
        Mas o número 13.5 não significa nada para quem lê o código, e para testar outro cenário você
        precisaria refazer a conta fora do programa e editar o texto manualmente. O código não representa
        o problema — só imprime uma resposta já pronta.</p>
      </div>

      <div class="callout good">
        <span class="callout-label">A SOLUÇÃO QUE VAMOS IMPLEMENTAR</span>
        <p>Representar cada grandeza física com uma variável nomeada, e deixar o próprio programa
        calcular o resultado a partir delas. Assim, mudar a velocidade ou o tempo significa mudar um
        número em uma linha — o cálculo se ajusta sozinho. É exatamente para isso que variáveis existem:
        dar nome e permanência a valores que o programa precisa lembrar e manipular.</p>
      </div>

      <p>A física por trás disso é o <strong>movimento retilíneo uniforme</strong>: quando a velocidade
      é constante, a posição final é a posição inicial somada ao deslocamento, e o deslocamento é
      velocidade vezes tempo.</p>

      <div class="formula-box">
        <div class="formula">x = x₀ + v·t</div>
        <div class="formula-caption">x: posição final (m) · x₀: posição inicial (m) · v: velocidade (m/s) · t: tempo (s)</div>
      </div>
      <p class="ref-note">Esta é a equação de "posição a partir da velocidade média" para aceleração
      zero — ver
      <a class="ref-link" href="https://openstax.org/books/university-physics-volume-1/pages/3-4-motion-with-constant-acceleration" target="_blank" rel="noopener">OpenStax, <em>University Physics Vol. 1</em>, seção 3.4</a>
      (Rice University, licença Creative Commons).</p>
    </section>

    <section id="codigo">
      <h2>CÓDIGO</h2>
      <div class="code-block">
        <div class="code-block-header"><span class="code-filename">Main.java</span><button class="copy-btn" type="button">Copiar</button></div>
        <pre><code class="language-java">public class Main {
    public static void main(String[] args) {
        double posicaoInicial = 0.0;   // metros
        double velocidade = 4.5;       // metros por segundo
        double tempo = 3.0;            // segundos

        double posicaoFinal = posicaoInicial + velocidade * tempo;

        System.out.println("Posição inicial: " + posicaoInicial + " m");
        System.out.println("Velocidade: " + velocidade + " m/s");
        System.out.println("Tempo decorrido: " + tempo + " s");
        System.out.println("Posição final: " + posicaoFinal + " m");
    }
}</code></pre>
      </div>

      <p><strong>Declarações (linhas 3–5).</strong> Cada linha cria uma variável <code>double</code> e já
      atribui um valor inicial. O comentário depois de <code>//</code> não afeta a execução — existe só
      para registrar a unidade física de cada grandeza, algo que o tipo <code>double</code> sozinho não
      expressa.</p>
      <p><strong>O cálculo (linha 7).</strong> Java respeita a precedência matemática usual: a
      multiplicação (<code>velocidade * tempo</code>) acontece antes da soma. O resultado é guardado em
      <code>posicaoFinal</code> — se você mudar qualquer uma das três variáveis acima, esta linha
      recalcula automaticamente na próxima execução.</p>
      <p><strong>Saída (linhas 9–12).</strong> Cada <code>println</code> concatena um rótulo em texto com
      o valor numérico da variável correspondente, usando <code>+</code>.</p>
    </section>

    <section id="integracao">
      <h2>INTEGRAÇÃO</h2>
      <p>Este <code>Main.java</code> é a raiz do projeto PhysicsLab — por enquanto, o projeto inteiro
      cabe neste arquivo. Isso é intencional: no Capítulo 4, quando tivermos métodos, vamos extrair este
      cálculo para fora do <code>main</code>. No Capítulo 6, quando tivermos classes, a partícula deixará
      de ser três variáveis soltas e virará um objeto <code>Particula</code> de verdade. Cada capítulo
      reorganiza um pouco do que já existe — o comportamento se mantém, a estrutura melhora.</p>
    </section>

    <section id="laboratorio">
      <h2>LABORATÓRIO INTERATIVO</h2>
      <p class="lab-hint">Isto roda em JavaScript, aqui no navegador, só para você visualizar o
      conceito — o programa que você escreve de verdade é o <code>Main.java</code> acima. A fórmula é
      exatamente a mesma.</p>
      <div class="lab" id="lab-mru">
        <div class="lab-title">Movimento retilíneo uniforme — x = x₀ + v·t</div>
        <div class="lab-controls">
          <div class="lab-field">
            <label>x₀ (posição inicial) <span class="lab-value" id="labX0Val">0.0 m</span></label>
            <input type="range" id="labX0" min="-25" max="25" step="0.5" value="0">
          </div>
          <div class="lab-field">
            <label>v (velocidade) <span class="lab-value" id="labVVal">3.00 m/s</span></label>
            <input type="range" id="labV" min="-10" max="10" step="0.25" value="3">
          </div>
          <div class="lab-field">
            <label>t (tempo) <span class="lab-value" id="labTVal">4.0 s</span></label>
            <input type="range" id="labT" min="0" max="20" step="0.5" value="4">
          </div>
        </div>
        <div class="lab-track-wrap">
          <div class="lab-track">
            <div class="lab-ruler"></div>
            <div class="lab-tick" style="left:0%"></div><div class="lab-tick-label" style="left:0%">-30</div>
            <div class="lab-tick" style="left:16.67%"></div><div class="lab-tick-label" style="left:16.67%">-20</div>
            <div class="lab-tick" style="left:33.33%"></div><div class="lab-tick-label" style="left:33.33%">-10</div>
            <div class="lab-tick" style="left:50%"></div><div class="lab-tick-label" style="left:50%">0</div>
            <div class="lab-tick" style="left:66.67%"></div><div class="lab-tick-label" style="left:66.67%">10</div>
            <div class="lab-tick" style="left:83.33%"></div><div class="lab-tick-label" style="left:83.33%">20</div>
            <div class="lab-tick" style="left:100%"></div><div class="lab-tick-label" style="left:97%">30</div>
            <div class="lab-origin"></div>
            <div class="lab-marker ghost" id="labGhost" title="posição inicial"></div>
            <div class="lab-marker" id="labMarker" title="posição final"></div>
          </div>
        </div>
        <div class="lab-readout" id="labReadout">x = 0.0 + (3.00 × 4.0) → <strong>12.00 m</strong></div>
      </div>
    </section>

    <section id="exercicio">
      <h2>EXERCÍCIO GUIADO</h2>
      <div class="exercise-box">
        <span class="exercise-kicker">EXERCÍCIO</span>
        <p>Uma partícula parte da posição <strong>-12.0 m</strong> (atrás da origem) com velocidade
        constante de <strong>2.75 m/s</strong>. Calcule e imprima a posição dessa partícula em três
        instantes: <strong>t = 5 s</strong>, <strong>t = 10 s</strong> e <strong>t = 20 s</strong>,
        reaproveitando a mesma fórmula do capítulo. Ao final, calcule e imprima o
        <strong>deslocamento</strong> entre a posição em t = 5 s e a posição em t = 20 s.</p>
      </div>

      <div class="hints">
        <details class="reveal"><summary>Mostrar dica 1</summary><div class="reveal-body">
          <p>Você não precisa recalcular a fórmula "no braço" três vezes com números diferentes. Pense em
          quais variáveis mudam entre os três cálculos e quais permanecem fixas.</p></div></details>
        <details class="reveal"><summary>Mostrar dica 2</summary><div class="reveal-body">
          <p>Crie uma variável de tempo para cada instante (por exemplo <code>tempo1</code>,
          <code>tempo2</code>, <code>tempo3</code>) e calcule uma posição correspondente para cada uma,
          reaproveitando as mesmas <code>posicaoInicial</code> e <code>velocidade</code>.</p></div></details>
        <details class="reveal"><summary>Mostrar dica 3</summary><div class="reveal-body">
          <p>O deslocamento entre dois instantes é apenas a subtração entre as duas posições já
          calculadas: <code>posicaoEmT3 - posicaoEmT1</code> (usando t = 20 s e t = 5 s).</p></div></details>
      </div>

      <details class="reveal solution">
        <summary>Mostrar solução</summary>
        <div class="reveal-body">
          <div class="code-block">
            <div class="code-block-header"><span class="code-filename">Main.java (exercício)</span><button class="copy-btn" type="button">Copiar</button></div>
            <pre><code class="language-java">public class Main {
    public static void main(String[] args) {
        double posicaoInicial = -12.0;
        double velocidade = 2.75;

        double tempo1 = 5.0;
        double tempo2 = 10.0;
        double tempo3 = 20.0;

        double posicaoEmT1 = posicaoInicial + velocidade * tempo1;
        double posicaoEmT2 = posicaoInicial + velocidade * tempo2;
        double posicaoEmT3 = posicaoInicial + velocidade * tempo3;

        System.out.println("Posição em t=5s: " + posicaoEmT1 + " m");
        System.out.println("Posição em t=10s: " + posicaoEmT2 + " m");
        System.out.println("Posição em t=20s: " + posicaoEmT3 + " m");

        double deslocamento = posicaoEmT3 - posicaoEmT1;
        System.out.println("Deslocamento entre t=5s e t=20s: " + deslocamento + " m");
    }
}</code></pre>
          </div>
        </div>
      </details>
    </section>

    <section id="desafio">
      <h2>DESAFIO</h2>
      <div class="exercise-box">
        <span class="exercise-kicker">DESAFIO</span>
        <p>Crie <strong>três partículas diferentes</strong>, cada uma com sua própria posição inicial,
        velocidade e tempo, e imprima a posição final de cada uma de forma organizada (por exemplo,
        "Partícula A: posição final = ..."). Pense em como nomear as variáveis para não se confundir
        entre as três partículas.</p>
      </div>
      <details class="reveal solution">
        <summary>Mostrar solução</summary>
        <div class="reveal-body">
          <p>Uma solução válida usa um prefixo ou sufixo consistente por partícula
          (<code>x0A</code>, <code>vA</code>, <code>tA</code>, <code>x0B</code>...). Repare como o
          código já começa a ficar longo e repetitivo com apenas três partículas — isso não é acidente.
          É exatamente o problema que arrays vão resolver no Capítulo 5, e que classes vão resolver de
          forma ainda melhor no Capítulo 6.</p>
          <div class="code-block">
            <div class="code-block-header"><span class="code-filename">Main.java (desafio)</span><button class="copy-btn" type="button">Copiar</button></div>
            <pre><code class="language-java">public class Main {
    public static void main(String[] args) {
        double x0A = 0.0, vA = 4.5, tA = 3.0;
        double x0B = -10.0, vB = 1.2, tB = 8.0;
        double x0C = 5.0, vC = -2.0, tC = 6.0;

        double posicaoFinalA = x0A + vA * tA;
        double posicaoFinalB = x0B + vB * tB;
        double posicaoFinalC = x0C + vC * tC;

        System.out.println("Partícula A: posição final = " + posicaoFinalA + " m");
        System.out.println("Partícula B: posição final = " + posicaoFinalB + " m");
        System.out.println("Partícula C: posição final = " + posicaoFinalC + " m");
    }
}</code></pre>
          </div>
        </div>
      </details>
    </section>

    <section id="desafio-extra">
      <h2>DESAFIO EXTRA</h2>
      <div class="exercise-box">
        <span class="exercise-kicker">DESAFIO EXTRA · SEM SOLUÇÃO PRONTA</span>
        <p>Consulte a
        <a class="ref-link" href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html" target="_blank" rel="noopener">documentação oficial da Oracle sobre tipos primitivos</a>
        (em inglês — vale praticar a leitura técnica) e descubra a diferença entre <code>float</code> e
        <code>double</code>. Reescreva o programa do capítulo trocando <code>double</code> por
        <code>float</code> (lembre-se: literais <code>float</code> precisam do sufixo <code>f</code>,
        como em <code>4.5f</code>). A saída impressa muda? Por quê?</p>
      </div>
    </section>

    <section id="testes">
      <h2>TESTES</h2>
      <p>Ainda não temos métodos nem uma biblioteca de testes — isso vem nos Capítulos 4 e 18. Por
      enquanto, o teste é manual, e mesmo assim vale o hábito: <strong>calcule o resultado esperado à
      parte</strong> (na cabeça, no papel ou em uma calculadora) e compare com o que o programa imprime.</p>
      <table class="roadmap-table">
        <thead><tr><th>Entrada</th><th>Esperado</th><th>Por quê</th></tr></thead>
        <tbody>
          <tr><td class="v">x₀=0, v=4.5, t=3.0</td><td class="c">13.5 m</td><td class="c">0 + 4.5×3</td></tr>
          <tr><td class="v">x₀=0, v=0, t=10</td><td class="c">0.0 m</td><td class="c">velocidade zero não desloca a partícula</td></tr>
          <tr><td class="v">x₀=10, v=-2, t=5</td><td class="c">0.0 m</td><td class="c">velocidade negativa move a partícula de volta à origem</td></tr>
        </tbody>
      </table>
      <p>O segundo e o terceiro caso são <strong>casos de borda</strong>: velocidade zero e velocidade
      negativa. Rode o programa com esses valores e confirme que a saída bate — isso já é, em espírito,
      o que um teste automatizado vai fazer por você a partir do Capítulo 18.</p>
    </section>

    <section id="revisao">
      <h2>REVISÃO</h2>
      <ul>
        <li><strong>O que aprendi:</strong> variáveis, tipos primitivos (com foco em <code>double</code>),
        operadores aritméticos e de atribuição, concatenação de texto com números, <code>System.out</code>.</li>
        <li><strong>Classes criadas:</strong> <code>Main</code> — ainda não uma classe "de domínio", mas
        já o ponto de entrada real do projeto.</li>
        <li><strong>Conceito de física aplicado:</strong> movimento retilíneo uniforme,
        x = x₀ + v·t (<a class="ref-link" href="https://openstax.org/books/university-physics-volume-1/pages/3-1-position-displacement-and-average-velocity" target="_blank" rel="noopener">OpenStax, seção 3.1</a>).</li>
        <li><strong>Conexão com o projeto:</strong> este arquivo é a semente do PhysicsLab. O próximo
        capítulo adiciona decisões — o que fazer quando a partícula ultrapassa um limite, por exemplo.</li>
      </ul>

      <ul class="checklist">
        <li><input type="checkbox" id="chk-01-1" data-checklist="item-1"><label for="chk-01-1">Rodei o código do capítulo no meu computador e vi a saída no console</label></li>
        <li><input type="checkbox" id="chk-01-2" data-checklist="item-2"><label for="chk-01-2">Completei o exercício guiado sozinho (ou tentei bastante antes de olhar a solução)</label></li>
        <li><input type="checkbox" id="chk-01-3" data-checklist="item-3"><label for="chk-01-3">Entendo por que usamos variáveis em vez de escrever os números diretamente</label></li>
        <li><input type="checkbox" id="chk-01-4" data-checklist="item-4"><label for="chk-01-4">Testei o laboratório interativo mudando x₀, v e t</label></li>
      </ul>

      <div class="complete-bar">
        <span>Confira a checklist acima antes de seguir em frente.</span>
        <button class="complete-btn" type="button" data-complete-chapter>Marcar capítulo como concluído</button>
      </div>
    </section>
  </div>
  `;

  function setupLab(content) {
    const x0 = content.querySelector('#labX0');
    const v = content.querySelector('#labV');
    const t = content.querySelector('#labT');
    if (!x0 || !v || !t) return;

    const x0Val = content.querySelector('#labX0Val');
    const vVal = content.querySelector('#labVVal');
    const tVal = content.querySelector('#labTVal');
    const marker = content.querySelector('#labMarker');
    const ghost = content.querySelector('#labGhost');
    const readout = content.querySelector('#labReadout');

    function toPercent(x) {
      const clamped = Math.max(-30, Math.min(30, x));
      return ((clamped + 30) / 60) * 100;
    }

    function update() {
      const x0n = parseFloat(x0.value);
      const vn = parseFloat(v.value);
      const tn = parseFloat(t.value);
      const xf = x0n + vn * tn;

      x0Val.textContent = x0n.toFixed(1) + ' m';
      vVal.textContent = vn.toFixed(2) + ' m/s';
      tVal.textContent = tn.toFixed(1) + ' s';

      ghost.style.left = toPercent(x0n) + '%';
      marker.style.left = toPercent(xf) + '%';

      readout.innerHTML = 'x = ' + x0n.toFixed(1) + ' + (' + vn.toFixed(2) + ' × ' + tn.toFixed(1) +
        ') &nbsp;→&nbsp; <strong>' + xf.toFixed(2) + ' m</strong>';
    }

    [x0, v, t].forEach(el => el.addEventListener('input', update));
    update();
  }

  Apostila.registerChapter({
    id: 'cap-01',
    number: 1,
    part: 'Parte I — Fundamentos da linguagem',
    title: 'O primeiro instante do movimento',
    html,
    afterRender: setupLab
  });

})();
