(function () {

  const html = `
  <div class="chapter">
    <p class="chapter-eyebrow">INTRODUÇÃO</p>
    <h1 class="chapter-title">PhysicsLab</h1>
    <p class="chapter-lede">Uma apostila interativa para aprender Java construindo, capítulo a capítulo,
    um simulador de física real — não uma coleção de exemplos soltos.</p>

    <div class="chapter-meta">
      <span class="chip">18 capítulos</span>
      <span class="chip">1 projeto contínuo</span>
      <span class="chip">Java 17+</span>
      <span class="chip">Física com fontes citadas</span>
    </div>

    <section id="visao-geral">
      <h2>VISÃO GERAL DO PROJETO</h2>
      <p>O <strong>PhysicsLab</strong> é um simulador de sistemas físicos escrito em Java. Ele começa
      da forma mais simples possível — uma única partícula se movendo em linha reta — e cresce, capítulo
      a capítulo, até se tornar um pequeno motor de simulação capaz de lidar com múltiplos corpos, forças,
      colisões simples, persistência em arquivo e, mais adiante, um domínio completamente diferente
      (circuitos elétricos) reaproveitando a mesma arquitetura.</p>
      <p>Cada recurso da linguagem Java aparece porque o projeto passa a exigir aquele recurso — nunca
      o contrário. Quando o código começa a repetir três variáveis para cada partícula, isso motiva a
      criação de uma classe. Quando o motor de simulação precisa tratar corpos diferentes da mesma forma,
      isso motiva interfaces e polimorfismo. A física fornece o problema real; Java fornece as ferramentas
      para resolvê-lo.</p>
      <div class="callout physics">
        <span class="callout-label">SOBRE AS REFERÊNCIAS DE FÍSICA</span>
        <p>Toda fórmula usada no projeto é apresentada com a fonte de onde vem — priorizando material
        acadêmico aberto e verificável, como o <em>University Physics</em> da OpenStax (Rice University)
        e referências de engenharia elétrica de instituições reconhecidas. Os links aparecem ao lado de
        cada fórmula para consulta e aprofundamento.</p>
      </div>
    </section>

    <section id="versao-final">
      <h2>VERSÃO FINAL (APROXIMADA)</h2>
      <p>Ao final da apostila, o PhysicsLab será um programa de linha de comando, organizado em pacotes,
      capaz de:</p>
      <ul>
        <li>Simular múltiplos corpos físicos (partículas, projéteis, corpos sob gravidade) ao longo do
        tempo, com posição, velocidade, aceleração e massa representadas como vetores 2D;</li>
        <li>Aplicar diferentes forças (gravidade, atrito, força aplicada) de forma polimórfica através de
        um motor de simulação único;</li>
        <li>Validar entradas e reagir a erros com exceções específicas, sem encerrar de forma abrupta;</li>
        <li>Salvar e carregar configurações de simulação em arquivo;</li>
        <li>Simular também um domínio elétrico simples (resistores, tensão, corrente) reaproveitando a
        mesma interface de "componente simulável" usada para os corpos físicos;</li>
        <li>Ter uma suíte de testes automatizados cobrindo a lógica central;</li>
        <li>Estar documentado e organizado para publicação séria no GitHub, como projeto de estudo.</li>
      </ul>
    </section>

    <section id="roadmap">
      <h2>ROTEIRO DE VERSÕES</h2>
      <p>O projeto evolui em pequenos incrementos. Cada versão acrescenta algo real e usável —
      nunca um pedaço de código isolado só para "mostrar sintaxe".</p>
      <table class="roadmap-table">
        <thead>
          <tr><th>Versão</th><th>O que é adicionado</th><th>Capítulo</th></tr>
        </thead>
        <tbody>
          <tr><td class="v">v0.1</td><td>Um corpo em linha reta, simulado passo a passo no console</td><td class="c">Cap. 1–2</td></tr>
          <tr><td class="v">v0.2</td><td>Simulação repetida ao longo do tempo, com paradas condicionais</td><td class="c">Cap. 3–4</td></tr>
          <tr><td class="v">v0.3</td><td>Várias partículas simultâneas, exibidas juntas</td><td class="c">Cap. 5</td></tr>
          <tr><td class="v">v0.4</td><td>Cada partícula vira um objeto com estado protegido</td><td class="c">Cap. 6–7</td></tr>
          <tr><td class="v">v0.5</td><td>Posição e velocidade viram vetores 2D; constantes centralizadas</td><td class="c">Cap. 8</td></tr>
          <tr><td class="v">v0.6</td><td>Corpos especializados reaproveitam comportamento comum</td><td class="c">Cap. 9</td></tr>
          <tr><td class="v">v0.7</td><td>O motor passa a tratar qualquer corpo ou força de forma uniforme</td><td class="c">Cap. 10–11</td></tr>
          <tr><td class="v">v0.8</td><td>Estados e materiais bem definidos; métodos com várias formas</td><td class="c">Cap. 12</td></tr>
          <tr><td class="v">v0.9</td><td>Dezenas de corpos organizados e localizáveis por nome</td><td class="c">Cap. 13–14</td></tr>
          <tr><td class="v">v0.10</td><td>O sistema resiste a entradas inválidas sem quebrar</td><td class="c">Cap. 15</td></tr>
          <tr><td class="v">v0.11</td><td>Simulações podem ser salvas e recarregadas</td><td class="c">Cap. 16</td></tr>
          <tr><td class="v">v0.12</td><td>Novo domínio (circuitos) reaproveita a mesma arquitetura</td><td class="c">Cap. 17</td></tr>
          <tr><td class="v">v0.13</td><td>Cobertura de testes para toda a lógica central</td><td class="c">Cap. 18</td></tr>
          <tr><td class="v">v1.0</td><td>Projeto documentado e pronto para o GitHub</td><td class="c">Projeto final</td></tr>
        </tbody>
      </table>
    </section>

    <section id="mapa-conceitos">
      <h2>MAPA DE CONCEITOS JAVA</h2>
      <p>Assim você enxerga, a qualquer momento, o porquê de estar estudando cada assunto.</p>
      <div class="map-grid">
        <div class="map-row"><div class="map-v">v0.1</div><div class="map-body"><strong>Variáveis, tipos primitivos, operadores</strong><span>Representar posição, velocidade e tempo de forma correta e reutilizável</span></div></div>
        <div class="map-row"><div class="map-v">v0.2</div><div class="map-body"><strong>Condicionais, laços, métodos</strong><span>Repetir a simulação no tempo e organizar o comportamento em blocos nomeados</span></div></div>
        <div class="map-row"><div class="map-v">v0.3</div><div class="map-body"><strong>Arrays e Strings</strong><span>Guardar e exibir várias partículas sem duplicar variáveis</span></div></div>
        <div class="map-row"><div class="map-v">v0.4</div><div class="map-body"><strong>Classes, objetos, construtores, encapsulamento</strong><span>Agrupar estado e comportamento de cada partícula, com validação</span></div></div>
        <div class="map-row"><div class="map-v">v0.5</div><div class="map-body"><strong>Composição, static, final</strong><span>Vetores 2D como peças reutilizáveis; constantes físicas centralizadas</span></div></div>
        <div class="map-row"><div class="map-v">v0.6</div><div class="map-body"><strong>Herança</strong><span>Corpos especializados compartilham comportamento comum sem duplicar código</span></div></div>
        <div class="map-row"><div class="map-v">v0.7</div><div class="map-body"><strong>Classes abstratas, interfaces, polimorfismo, sobrescrita</strong><span>Um motor único que simula qualquer corpo ou força</span></div></div>
        <div class="map-row"><div class="map-v">v0.8</div><div class="map-body"><strong>Enums, sobrecarga</strong><span>Estados bem definidos e métodos com múltiplas formas de chamada</span></div></div>
        <div class="map-row"><div class="map-v">v0.9</div><div class="map-body"><strong>Collections (List, Map), Generics</strong><span>Gerenciar muitos corpos e criar um repositório reutilizável</span></div></div>
        <div class="map-row"><div class="map-v">v0.10</div><div class="map-body"><strong>Exceptions</strong><span>Reagir a massa negativa, tempo inválido, ou arquivo corrompido sem quebrar</span></div></div>
        <div class="map-row"><div class="map-v">v0.11</div><div class="map-body"><strong>Arquivos, organização em pacotes</strong><span>Persistir e recarregar simulações</span></div></div>
        <div class="map-row"><div class="map-v">v0.12</div><div class="map-body"><strong>Reuso de interfaces</strong><span>Circuitos elétricos simples usando a mesma arquitetura de simulação</span></div></div>
        <div class="map-row"><div class="map-v">v0.13</div><div class="map-body"><strong>Testes automatizados (JUnit)</strong><span>Cobrir a lógica central e formalizar as verificações manuais dos capítulos anteriores</span></div></div>
      </div>
    </section>

    <section id="como-usar">
      <h2>COMO USAR ESTA APOSTILA</h2>
      <ul>
        <li><strong>Navegação:</strong> use o menu à esquerda ou as setas no rodapé de cada capítulo. O
        botão no topo do menu recolhe/expande a barra lateral.</li>
        <li><strong>Pesquisa:</strong> pressione <code>/</code> ou clique no campo de busca para encontrar
        capítulos e termos específicos dentro do conteúdo já escrito.</li>
        <li><strong>Exercícios:</strong> tente resolver antes de abrir as dicas. As dicas são progressivas
        — a primeira é sutil, a última quase entrega o caminho.</li>
        <li><strong>Soluções:</strong> ficam escondidas atrás de um botão, sempre depois do exercício e das
        dicas — nunca antes.</li>
        <li><strong>Progresso:</strong> ao terminar um capítulo, marque-o como concluído no botão ao final
        do texto. A barra lateral mostra quantos dos 18 você já concluiu.</li>
      </ul>
      <div class="callout note">
        <span class="callout-label">REQUISITOS</span>
        <p>JDK 17 ou superior instalado, e um editor de sua preferência (IntelliJ IDEA, VS Code com o
        Extension Pack for Java, ou terminal + <code>javac</code>/<code>java</code> diretamente). O código
        de cada capítulo é mostrado por completo — nada de "..." escondendo partes importantes.</p>
      </div>
    </section>
  </div>
  `;

  Apostila.registerChapter({ id: 'intro', number: 0, part: 'Introdução', title: 'Visão geral do projeto', html });

  // esqueleto completo dos 18 capítulos — os ainda não escritos aparecem como "em breve"
  Apostila.registerPlaceholder('cap-01', 1, 'Parte I — Fundamentos da linguagem', 'O primeiro instante do movimento');
  Apostila.registerPlaceholder('cap-02', 2, 'Parte I — Fundamentos da linguagem', 'Decisões: condicionais e comparação');
  Apostila.registerPlaceholder('cap-03', 3, 'Parte I — Fundamentos da linguagem', 'Laços: a linha do tempo da simulação');
  Apostila.registerPlaceholder('cap-04', 4, 'Parte I — Fundamentos da linguagem', 'Métodos: organizando o comportamento');
  Apostila.registerPlaceholder('cap-05', 5, 'Parte I — Fundamentos da linguagem', 'Arrays e Strings: várias partículas');

  Apostila.registerPlaceholder('cap-06', 6, 'Parte II — Orientação a objetos', 'Classes e objetos: nasce a Particula');
  Apostila.registerPlaceholder('cap-07', 7, 'Parte II — Orientação a objetos', 'Encapsulamento, construtores e validação');
  Apostila.registerPlaceholder('cap-08', 8, 'Parte II — Orientação a objetos', 'Composição, static e final');
  Apostila.registerPlaceholder('cap-09', 9, 'Parte II — Orientação a objetos', 'Herança: corpos físicos especializados');
  Apostila.registerPlaceholder('cap-10', 10, 'Parte II — Orientação a objetos', 'Classes abstratas e interfaces');
  Apostila.registerPlaceholder('cap-11', 11, 'Parte II — Orientação a objetos', 'Polimorfismo e sobrescrita');
  Apostila.registerPlaceholder('cap-12', 12, 'Parte II — Orientação a objetos', 'Enums e sobrecarga de métodos');

  Apostila.registerPlaceholder('cap-13', 13, 'Parte III — Estruturas e robustez', 'Collections: List e Map');
  Apostila.registerPlaceholder('cap-14', 14, 'Parte III — Estruturas e robustez', 'Generics: um repositório genérico');
  Apostila.registerPlaceholder('cap-15', 15, 'Parte III — Estruturas e robustez', 'Exceptions: quando algo dá errado');
  Apostila.registerPlaceholder('cap-16', 16, 'Parte III — Estruturas e robustez', 'Arquivos: salvando simulações');

  Apostila.registerPlaceholder('cap-17', 17, 'Parte IV — Expansão e testes', 'Novo domínio: circuitos elétricos');
  Apostila.registerPlaceholder('cap-18', 18, 'Parte IV — Expansão e testes', 'Testes automatizados e versão final');

  Apostila.registerPlaceholder('final', null, 'Projeto final', 'Construindo a versão final');
  Apostila.registerPlaceholder('github', null, 'Projeto final', 'Preparando para o GitHub');

})();
