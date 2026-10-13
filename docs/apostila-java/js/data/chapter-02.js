(function () {

  const html = `
  <div class="chapter">
    <p class="chapter-eyebrow">CAPÍTULO 2 · PARTE I — FUNDAMENTOS DA LINGUAGEM</p>
    <h1 class="chapter-title">Decisões: condicionais e comparação</h1>
    <p class="chapter-lede">Até aqui o programa calculava um número e confiava em você para interpretá-lo.
    Neste capítulo, ele aprende a decidir sozinho — a diferença entre "imprimir um resultado" e
    "reagir a um resultado".</p>

    <div class="chapter-meta">
      <span class="chip">boolean</span>
      <span class="chip">operadores relacionais</span>
      <span class="chip">if / else if / else</span>
      <span class="chip">&amp;&amp; e ||</span>
    </div>

    <section id="aprender">
      <h2>O QUE VAMOS APRENDER</h2>
      <ul class="concept-list">
        <li>O tipo <code>boolean</code> e os operadores relacionais (<code>== != &gt; &lt; &gt;= &lt;=</code>)</li>
        <li>A estrutura <code>if</code> / <code>else if</code> / <code>else</code></li>
        <li>Os operadores lógicos <code>&amp;&amp;</code> e <code>||</code>, e por que eles avaliam em "curto-circuito"</li>
        <li>Por que comparar <code>double</code> com <code>==</code> exige cuidado</li>
      </ul>
    </section>

    <section id="construir">
      <h2>O QUE VAMOS CONSTRUIR</h2>
      <p>Vamos estender o mesmo <code>Main.java</code> do Capítulo 1 para que ele próprio classifique o
      resultado: identificar a direção do movimento a partir do sinal da velocidade, e determinar se a
      posição final ficou dentro de uma área de observação predefinida.</p>
    </section>

    <section id="conceito">
      <h2>CONCEITO</h2>
      <p>Um <strong>operador relacional</strong> compara dois valores e produz um resultado do tipo
      <code>boolean</code> — <code>true</code> ou <code>false</code>, nunca outra coisa. Java tem seis:</p>

      <table class="roadmap-table">
        <thead><tr><th>Operador</th><th>Significado</th><th>Exemplo</th></tr></thead>
        <tbody>
          <tr><td class="v">==</td><td>igual a</td><td class="c">velocidade == 0</td></tr>
          <tr><td class="v">!=</td><td>diferente de</td><td class="c">velocidade != 0</td></tr>
          <tr><td class="v">&gt;</td><td>maior que</td><td class="c">posicaoFinal &gt; limiteArea</td></tr>
          <tr><td class="v">&lt;</td><td>menor que</td><td class="c">posicaoFinal &lt; -limiteArea</td></tr>
          <tr><td class="v">&gt;=</td><td>maior ou igual a</td><td class="c">tempo &gt;= 0</td></tr>
          <tr><td class="v">&lt;=</td><td>menor ou igual a</td><td class="c">tempo &lt;= 60</td></tr>
        </tbody>
      </table>
      <p class="ref-note">Ver <a class="ref-link" href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op2.html" target="_blank" rel="noopener">Oracle, "Equality, Relational, and Conditional Operators"</a>.</p>

      <p>Como toda comparação produz um <code>boolean</code>, o resultado pode ser guardado em uma
      variável antes de ser usado — <code>boolean estaParada = velocidade == 0;</code> é código Java
      válido, e às vezes deixa a intenção mais clara do que embutir a comparação direto dentro de um
      <code>if</code>.</p>

      <p>A estrutura <code>if</code> executa um bloco somente quando a condição é <code>true</code>.
      Encadeando <code>else if</code>, você cobre múltiplos casos mutuamente exclusivos; o <code>else</code>
      final captura tudo o que sobrou. Um erro comum é usar vários <code>if</code> soltos quando o certo
      seria <code>else if</code> — com <code>if</code>s soltos, mais de um bloco pode rodar; com
      <code>else if</code>, no máximo um roda.</p>

      <p>Os operadores lógicos <code>&amp;&amp;</code> (E) e <code>||</code> (OU) combinam duas expressões
      booleanas em uma só. Ambos avaliam em <strong>curto-circuito</strong>: em <code>a &amp;&amp; b</code>,
      se <code>a</code> já é <code>false</code>, Java nem chega a avaliar <code>b</code> — o resultado já
      está decidido. O mesmo vale para <code>a || b</code> quando <code>a</code> é <code>true</code>. Isso
      não é só uma otimização; é o que torna seguro escrever coisas como
      <code>velocidade != 0 &amp;&amp; (100 / velocidade) &gt; 5</code> sem arriscar uma divisão por zero.</p>

      <div class="callout note">
        <span class="callout-label">CUIDADO COM == EM DOUBLE</span>
        <p>Como <code>double</code> guarda uma aproximação de ponto flutuante, duas contas que
        matematicamente deveriam dar o mesmo valor às vezes diferem no bit menos significativo. Por isso,
        evite <code>if (posicaoFinal == 50.0)</code> para valores calculados — prefira comparações de
        intervalo (<code>&gt;</code>, <code>&lt;=</code> etc.), que são exatamente o que este capítulo usa.
        Quando for realmente necessário testar igualdade entre doubles, compara-se a diferença absoluta
        com uma tolerância pequena — a mesma ideia usada na seção de Testes do Capítulo 1.</p>
      </div>
    </section>

    <section id="antes-do-codigo">
      <h2>ANTES DO CÓDIGO</h2>
      <div class="callout bad">
        <span class="callout-label">UMA SOLUÇÃO RUIM</span>
        <p>Continuar só imprimindo <code>posicaoFinal</code> e deixar que uma pessoa olhe o número e
        decida, de cabeça, se ele está "muito longe" ou "voltando". Funciona enquanto for uma partícula e
        um resultado por vez. No Capítulo 5, quando o programa lidar com várias partículas de uma vez,
        essa leitura manual se torna inviável — e mesmo com uma só, é fácil errar a interpretação.</p>
      </div>
      <div class="callout good">
        <span class="callout-label">A SOLUÇÃO QUE VAMOS IMPLEMENTAR</span>
        <p>Fazer o próprio programa decidir e relatar a interpretação, usando <code>if</code>/<code>else</code>
        sobre os valores já calculados. Definir uma "área de observação" (por exemplo, de -50 m a 50 m) é
        uma prática comum em instrumentação e simulação científica: qualquer leitura fora da faixa
        esperada precisa ser sinalizada, não apenas exibida.</p>
      </div>
    </section>

    <section id="codigo">
      <h2>CÓDIGO</h2>
      <div class="code-block">
        <div class="code-block-header"><span class="code-filename">Main.java</span><button class="copy-btn" type="button">Copiar</button></div>
        <pre><code class="language-java">public class Main {
    public static void main(String[] args) {
        double posicaoInicial = -40.0;  // metros
        double velocidade = 6.0;        // metros por segundo
        double tempo = 12.0;            // segundos
        double limiteArea = 50.0;       // metros (área observada: -limiteArea a +limiteArea)

        double posicaoFinal = posicaoInicial + velocidade * tempo;
        System.out.println("Posição final: " + posicaoFinal + " m");

        if (velocidade > 0) {
            System.out.println("Direção: avançando");
        } else if (velocidade < 0) {
            System.out.println("Direção: recuando");
        } else {
            System.out.println("Direção: parada");
        }

        if (posicaoFinal > limiteArea || posicaoFinal < -limiteArea) {
            System.out.println("Status: fora da área de observação");
        } else {
            System.out.println("Status: dentro da área de observação");
        }
    }
}</code></pre>
      </div>
      <p><strong>Nova variável (linha 5).</strong> <code>limiteArea</code> define o tamanho da faixa
      observada, para não deixar o número "50" solto no meio da lógica mais abaixo.</p>
      <p><strong>Direção (linhas 10–14).</strong> Três casos mutuamente exclusivos — por isso
      <code>else if</code>, e não três <code>if</code> separados.</p>
      <p><strong>Status da área (linhas 16–20).</strong> <code>posicaoFinal &gt; limiteArea</code> cobre
      "foi longe demais para a frente"; <code>posicaoFinal &lt; -limiteArea</code> cobre "foi longe demais
      para trás". O <code>||</code> diz "se qualquer uma das duas for verdadeira".</p>
    </section>

    <section id="integracao">
      <h2>INTEGRAÇÃO</h2>
      <p>A lógica de decisão entra logo depois do cálculo do Capítulo 1, no mesmo <code>main</code>. Isso
      já começa a deixar o método longo — motivo real para, no Capítulo 4, extrairmos
      <code>classificarDirecao(...)</code> e <code>estaDentroDaArea(...)</code> como métodos separados. Mais
      adiante (Capítulos 6–7), essas verificações viram comportamento do próprio objeto
      <code>Particula</code>.</p>
    </section>

    <section id="laboratorio">
      <h2>LABORATÓRIO INTERATIVO</h2>
      <p class="lab-hint">Mesma fórmula do Capítulo 1, agora com a área de observação marcada na régua —
      mude o limite e veja a classificação mudar em tempo real.</p>
      <div class="lab" id="lab-decisao">
        <div class="lab-title">x = x₀ + v·t, classificada por if / else</div>
        <div class="lab-controls">
          <div class="lab-field">
            <label>x₀ <span class="lab-value" id="lab2X0Val">-40.0 m</span></label>
            <input type="range" id="lab2X0" min="-40" max="40" step="0.5" value="-40">
          </div>
          <div class="lab-field">
            <label>v <span class="lab-value" id="lab2VVal">6.00 m/s</span></label>
            <input type="range" id="lab2V" min="-8" max="8" step="0.25" value="6">
          </div>
          <div class="lab-field">
            <label>t <span class="lab-value" id="lab2TVal">12.0 s</span></label>
            <input type="range" id="lab2T" min="0" max="20" step="0.5" value="12">
          </div>
          <div class="lab-field">
            <label>limiteArea <span class="lab-value" id="lab2LimVal">50 m</span></label>
            <input type="range" id="lab2Lim" min="10" max="60" step="5" value="50">
          </div>
        </div>
        <div class="lab-track-wrap">
          <div class="lab-track">
            <div class="lab-ruler"></div>
            <div class="lab-tick" style="left:0%"></div><div class="lab-tick-label" style="left:0%">-60</div>
            <div class="lab-tick" style="left:16.67%"></div><div class="lab-tick-label" style="left:16.67%">-40</div>
            <div class="lab-tick" style="left:33.33%"></div><div class="lab-tick-label" style="left:33.33%">-20</div>
            <div class="lab-tick" style="left:50%"></div><div class="lab-tick-label" style="left:50%">0</div>
            <div class="lab-tick" style="left:66.67%"></div><div class="lab-tick-label" style="left:66.67%">20</div>
            <div class="lab-tick" style="left:83.33%"></div><div class="lab-tick-label" style="left:83.33%">40</div>
            <div class="lab-tick" style="left:100%"></div><div class="lab-tick-label" style="left:97%">60</div>
            <div class="lab-origin"></div>
            <div class="lab-limit" id="lab2LimitNeg"></div>
            <div class="lab-limit-label" id="lab2LimitNegLabel">-50</div>
            <div class="lab-limit" id="lab2LimitPos"></div>
            <div class="lab-limit-label" id="lab2LimitPosLabel">50</div>
            <div class="lab-marker ghost" id="lab2Ghost" title="posição inicial"></div>
            <div class="lab-marker" id="lab2Marker" title="posição final"></div>
          </div>
        </div>
        <div class="lab-readout" id="lab2Readout">posição final: <strong>32.00 m</strong></div>
        <div class="status-row" id="lab2Status"></div>
      </div>
    </section>

    <section id="exercicio">
      <h2>EXERCÍCIO GUIADO</h2>
      <div class="exercise-box">
        <span class="exercise-kicker">EXERCÍCIO</span>
        <p>Uma partícula parte de <strong>x₀ = 20.0 m</strong> com <strong>v = -3.5 m/s</strong>, ao longo
        de <strong>t = 15.0 s</strong>, na mesma área de observação de ±50 m. Calcule a posição final e
        imprima a direção do movimento e o status da área, reaproveitando exatamente a estrutura do
        capítulo.</p>
      </div>
      <div class="hints">
        <details class="reveal"><summary>Mostrar dica 1</summary><div class="reveal-body">
          <p>O cálculo de <code>posicaoFinal</code> não muda em nada — é a mesma fórmula do Capítulo 1.</p>
        </div></details>
        <details class="reveal"><summary>Mostrar dica 2</summary><div class="reveal-body">
          <p>A direção tem três casos possíveis (positiva, negativa, zero) — isso pede
          <code>if</code>/<code>else if</code>/<code>else</code>, não apenas <code>if</code>/<code>else</code>.</p>
        </div></details>
        <details class="reveal"><summary>Mostrar dica 3</summary><div class="reveal-body">
          <p>"Fora da área" significa longe demais para um lado <em>ou</em> para o outro — duas
          comparações unidas com <code>||</code>.</p>
        </div></details>
      </div>
      <details class="reveal solution">
        <summary>Mostrar solução</summary>
        <div class="reveal-body">
          <div class="code-block">
            <div class="code-block-header"><span class="code-filename">Main.java (exercício)</span><button class="copy-btn" type="button">Copiar</button></div>
            <pre><code class="language-java">public class Main {
    public static void main(String[] args) {
        double posicaoInicial = 20.0;
        double velocidade = -3.5;
        double tempo = 15.0;
        double limiteArea = 50.0;

        double posicaoFinal = posicaoInicial + velocidade * tempo;
        System.out.println("Posição final: " + posicaoFinal + " m");

        if (velocidade > 0) {
            System.out.println("Direção: avançando");
        } else if (velocidade < 0) {
            System.out.println("Direção: recuando");
        } else {
            System.out.println("Direção: parada");
        }

        if (posicaoFinal > limiteArea || posicaoFinal < -limiteArea) {
            System.out.println("Status: fora da área de observação");
        } else {
            System.out.println("Status: dentro da área de observação");
        }
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
        <p>Combine as duas classificações em uma só mensagem: imprima <strong>"Cruzeiro seguro"</strong>
        somente se a partícula estiver <em>avançando</em> (v &gt; 0) <em>e</em> dentro da área de
        observação; caso contrário, imprima <strong>"Atenção necessária"</strong>. Guarde cada condição
        em uma variável <code>boolean</code> antes de combiná-las — isso deixa o <code>if</code> final
        curto e fácil de ler.</p>
      </div>
      <details class="reveal solution">
        <summary>Mostrar solução</summary>
        <div class="reveal-body">
          <div class="code-block">
            <div class="code-block-header"><span class="code-filename">Main.java (desafio)</span><button class="copy-btn" type="button">Copiar</button></div>
            <pre><code class="language-java">double posicaoInicial = -40.0;
double velocidade = 6.0;
double tempo = 12.0;
double limiteArea = 50.0;

double posicaoFinal = posicaoInicial + velocidade * tempo;

boolean estaAvancando = velocidade > 0;
boolean estaDentroDaArea = posicaoFinal <= limiteArea && posicaoFinal >= -limiteArea;

if (estaAvancando && estaDentroDaArea) {
    System.out.println("Cruzeiro seguro");
} else {
    System.out.println("Atenção necessária");
}</code></pre>
          </div>
          <p>Repare que <code>estaDentroDaArea</code> foi escrita aqui com <code>&amp;&amp;</code>
          (dentro dos dois limites ao mesmo tempo) em vez do <code>||</code> usado antes para "fora" — são
          a mesma regra vista de lados opostos.</p>
        </div>
      </details>
    </section>

    <section id="desafio-extra">
      <h2>DESAFIO EXTRA</h2>
      <div class="exercise-box">
        <span class="exercise-kicker">DESAFIO EXTRA · SEM SOLUÇÃO PRONTA</span>
        <p>Leia sobre avaliação em curto-circuito na
        <a class="ref-link" href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op2.html" target="_blank" rel="noopener">documentação oficial da Oracle</a>
        e escreva, como comentário no seu código, por que
        <code>velocidade != 0 &amp;&amp; (100 / velocidade) &gt; 5</code> nunca lança um erro de divisão
        por zero, e o que aconteceria se você invertesse a ordem das duas condições.</p>
      </div>
    </section>

    <section id="testes">
      <h2>TESTES</h2>
      <p>Verificação manual novamente — calcule à parte e compare com a saída. Preste atenção especial
      ao caso de fronteira: ele é onde a maioria dos bugs de condicional aparece.</p>
      <table class="roadmap-table">
        <thead><tr><th>Entrada</th><th>Esperado</th><th>Por quê</th></tr></thead>
        <tbody>
          <tr><td class="v">v = 6.0</td><td class="c">Direção: avançando</td><td class="c">caso normal, v &gt; 0</td></tr>
          <tr><td class="v">v = 0.0</td><td class="c">Direção: parada</td><td class="c">caso de borda — nem &gt; nem &lt;, cai no else</td></tr>
          <tr><td class="v">posicaoFinal = 50.0 exatos</td><td class="c">Status: dentro da área</td><td class="c">fronteira — <code>50 &gt; 50</code> é <code>false</code>, então não é "fora"</td></tr>
          <tr><td class="v">posicaoFinal = 50.01</td><td class="c">Status: fora da área</td><td class="c">passou da fronteira por pouco</td></tr>
        </tbody>
      </table>
      <p>O terceiro caso não é acidente: com <code>&gt;</code> (estrito), o limite em si conta como
      "dentro". Se a intenção fosse o contrário, o código usaria <code>&gt;=</code>. Decidir isso
      conscientemente — e testar exatamente no limite — é o que evita bugs de fronteira.</p>
    </section>

    <section id="revisao">
      <h2>REVISÃO</h2>
      <ul>
        <li><strong>O que aprendi:</strong> <code>boolean</code>, operadores relacionais, <code>if</code>/<code>else if</code>/<code>else</code>,
        operadores lógicos <code>&amp;&amp;</code>/<code>||</code> com curto-circuito, cuidado ao comparar
        <code>double</code> com <code>==</code>.</li>
        <li><strong>Classes criadas:</strong> ainda só <code>Main</code>, agora com lógica de decisão.</li>
        <li><strong>Padrão aplicado:</strong> verificação de faixa (range check) — usado o tempo todo em
        instrumentação e simulação científica para sinalizar leituras fora do esperado.</li>
        <li><strong>Conexão com o projeto:</strong> por enquanto decidimos uma vez, para um instante.
        O Capítulo 3 repete essa decisão ao longo de vários instantes, usando laços.</li>
      </ul>

      <ul class="checklist">
        <li><input type="checkbox" id="chk-02-1" data-checklist="item-1"><label for="chk-02-1">Rodei o código do capítulo e vi as três saídas (posição, direção, status)</label></li>
        <li><input type="checkbox" id="chk-02-2" data-checklist="item-2"><label for="chk-02-2">Completei o exercício guiado sozinho</label></li>
        <li><input type="checkbox" id="chk-02-3" data-checklist="item-3"><label for="chk-02-3">Entendo por que usar <code>else if</code> em vez de vários <code>if</code> soltos</label></li>
        <li><input type="checkbox" id="chk-02-4" data-checklist="item-4"><label for="chk-02-4">Testei o laboratório mudando o limiteArea e observando a classificação mudar</label></li>
      </ul>

      <div class="complete-bar">
        <span>Confira a checklist acima antes de seguir em frente.</span>
        <button class="complete-btn" type="button" data-complete-chapter>Marcar capítulo como concluído</button>
      </div>
    </section>
  </div>
  `;

  function setupLab(content) {
    const x0 = content.querySelector('#lab2X0');
    const v = content.querySelector('#lab2V');
    const t = content.querySelector('#lab2T');
    const lim = content.querySelector('#lab2Lim');
    if (!x0 || !v || !t || !lim) return;

    const x0Val = content.querySelector('#lab2X0Val');
    const vVal = content.querySelector('#lab2VVal');
    const tVal = content.querySelector('#lab2TVal');
    const limVal = content.querySelector('#lab2LimVal');
    const marker = content.querySelector('#lab2Marker');
    const ghost = content.querySelector('#lab2Ghost');
    const readout = content.querySelector('#lab2Readout');
    const statusRow = content.querySelector('#lab2Status');
    const limitPos = content.querySelector('#lab2LimitPos');
    const limitNeg = content.querySelector('#lab2LimitNeg');
    const limitPosLabel = content.querySelector('#lab2LimitPosLabel');
    const limitNegLabel = content.querySelector('#lab2LimitNegLabel');

    const DOMAIN = 60; // track mostra de -60 a +60

    function toPercent(x) {
      const clamped = Math.max(-DOMAIN, Math.min(DOMAIN, x));
      return ((clamped + DOMAIN) / (DOMAIN * 2)) * 100;
    }

    function update() {
      const x0n = parseFloat(x0.value);
      const vn = parseFloat(v.value);
      const tn = parseFloat(t.value);
      const limite = parseFloat(lim.value);
      const xf = x0n + vn * tn;

      x0Val.textContent = x0n.toFixed(1) + ' m';
      vVal.textContent = vn.toFixed(2) + ' m/s';
      tVal.textContent = tn.toFixed(1) + ' s';
      limVal.textContent = limite.toFixed(0) + ' m';

      ghost.style.left = toPercent(x0n) + '%';
      marker.style.left = toPercent(xf) + '%';
      limitPos.style.left = toPercent(limite) + '%';
      limitNeg.style.left = toPercent(-limite) + '%';
      limitPosLabel.style.left = toPercent(limite) + '%';
      limitPosLabel.textContent = limite.toFixed(0);
      limitNegLabel.style.left = toPercent(-limite) + '%';
      limitNegLabel.textContent = '-' + limite.toFixed(0);

      readout.innerHTML = 'posição final: <strong>' + xf.toFixed(2) + ' m</strong>';

      let direcao, direcaoClass;
      if (vn > 0) { direcao = 'avançando'; direcaoClass = 'ok'; }
      else if (vn < 0) { direcao = 'recuando'; direcaoClass = 'warn'; }
      else { direcao = 'parada'; direcaoClass = ''; }

      const foraDaArea = xf > limite || xf < -limite;
      const status = foraDaArea ? 'fora da área' : 'dentro da área';
      const statusClass = foraDaArea ? 'err' : 'ok';

      statusRow.innerHTML =
        '<span class="status-pill ' + direcaoClass + '">direção: ' + direcao + '</span>' +
        '<span class="status-pill ' + statusClass + '">status: ' + status + '</span>';
    }

    [x0, v, t, lim].forEach(el => el.addEventListener('input', update));
    update();
  }

  Apostila.registerChapter({
    id: 'cap-02',
    number: 2,
    part: 'Parte I — Fundamentos da linguagem',
    title: 'Decisões: condicionais e comparação',
    html,
    afterRender: setupLab
  });

})();
