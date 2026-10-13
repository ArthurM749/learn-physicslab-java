/* ============================================================
   PhysicsLab — motor da apostila
   Registro de capítulos, navegação por hash, busca, progresso.
   ============================================================ */

const Apostila = (function () {

  const TOTAL_CHAPTERS = 18;
  const STORAGE_KEY = 'physicslab_apostila_v1';

  let chapters = [];          // todos os capítulos/páginas registrados (inclui intro e placeholders)
  let currentId = null;
  let state = { completed: {}, checklist: {} };

  const $content = () => document.getElementById('content');
  const $nav = () => document.getElementById('sidebarNav');

  // ---------------- persistência ----------------

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) state = Object.assign({ completed: {}, checklist: {} }, JSON.parse(raw));
    } catch (e) { /* localStorage indisponível — segue sem persistência */ }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  // ---------------- registro de capítulos ----------------

  function registerChapter(chapter) {
    chapter.available = true;
    const idx = chapters.findIndex(c => c.id === chapter.id);
    if (idx !== -1) chapters[idx] = chapter;
    else chapters.push(chapter);
  }

  function registerPlaceholder(id, number, part, title) {
    if (chapters.some(c => c.id === id)) return;
    chapters.push({ id, number, part, title, available: false });
  }

  function getChapter(id) {
    return chapters.find(c => c.id === id);
  }

  // ---------------- normalização p/ busca (ignora acentos) ----------------

  function normalize(str) {
    return (str || '')
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function stripHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || '';
  }

  // ---------------- sidebar ----------------

  function renderSidebar() {
    const nav = $nav();
    nav.innerHTML = '';
    let lastPart = null;

    chapters.forEach(ch => {
      if (ch.part !== lastPart) {
        const label = document.createElement('div');
        label.className = 'nav-part-label';
        label.textContent = ch.part;
        nav.appendChild(label);
        lastPart = ch.part;
      }

      const done = !!state.completed[ch.id];
      const numLabel = ch.number ? String(ch.number).padStart(2, '0') : '·';

      if (ch.available) {
        const a = document.createElement('a');
        a.href = '#' + ch.id;
        a.className = 'nav-item' + (done ? ' is-done' : '');
        a.dataset.id = ch.id;
        a.innerHTML =
          '<span class="nav-item-num">' + numLabel + '</span>' +
          '<span class="nav-item-title">' + ch.title + '</span>' +
          (done ? '<span class="nav-item-check">✓</span>' : '');
        nav.appendChild(a);
      } else {
        const span = document.createElement('div');
        span.className = 'nav-item is-disabled';
        span.innerHTML =
          '<span class="nav-item-num">' + numLabel + '</span>' +
          '<span class="nav-item-title">' + ch.title + '</span>' +
          '<span class="nav-badge">em breve</span>';
        nav.appendChild(span);
      }
    });

    setActiveNav(currentId);
  }

  function setActiveNav(id) {
    document.querySelectorAll('#sidebarNav .nav-item').forEach(el => {
      el.classList.toggle('is-active', el.dataset && el.dataset.id === id);
    });
  }

  function updateProgress() {
    const count = Object.keys(state.completed).filter(k => state.completed[k]).length;
    const pct = Math.min(100, Math.round((count / TOTAL_CHAPTERS) * 100));
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('progressLabel').textContent =
      count + ' de ' + TOTAL_CHAPTERS + ' capítulos concluídos';
  }

  // ---------------- render de capítulo ----------------

  function renderChapter(id, opts) {
    opts = opts || {};
    const chapter = getChapter(id) || getChapter('intro');
    if (!chapter || !chapter.available) {
      renderUnavailable(id);
      return;
    }
    currentId = chapter.id;

    const content = $content();
    content.innerHTML = chapter.html;

    // rodapé de navegação (anterior / próximo) entre capítulos numerados disponíveis
    appendFooterNav(content, chapter);

    if (window.Prism) Prism.highlightAllUnder(content);
    if (typeof chapter.afterRender === 'function') chapter.afterRender(content);

    restoreChecklist(content, chapter.id);
    wireCompleteButton(content, chapter.id);

    document.title = (chapter.number ? 'Cap. ' + chapter.number + ' — ' : '') + chapter.title + ' · PhysicsLab';
    setActiveNav(chapter.id);

    if (opts.scrollToTerm) {
      scrollToTerm(content, opts.scrollToTerm);
    } else {
      content.scrollTop = 0;
      window.scrollTo(0, 0);
      content.focus({ preventScroll: true });
    }

    closeMobileSidebarIfNeeded();
  }

  function renderUnavailable(id) {
    const content = $content();
    content.innerHTML =
      '<div class="chapter">' +
      '<p class="chapter-eyebrow">EM CONSTRUÇÃO</p>' +
      '<h1 class="chapter-title">Este capítulo ainda não foi escrito</h1>' +
      '<p class="chapter-lede">Esta é a primeira entrega da apostila — arquitetura completa, ' +
      'roteiro dos 18 capítulos e o Capítulo 1 funcionando de ponta a ponta. Os demais capítulos ' +
      'são adicionados nas próximas entregas, mantendo a mesma estrutura.</p>' +
      '<p><a class="ref-link" href="#intro">← Voltar para a visão geral do projeto</a></p>' +
      '</div>';
    document.title = 'Em construção · PhysicsLab';
  }

  function appendFooterNav(content, chapter) {
    const idx = chapters.findIndex(c => c.id === chapter.id);
    const prev = idx > 0 ? chapters[idx - 1] : null;
    const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

    const wrap = document.createElement('div');
    wrap.className = 'chapter';

    let html = '<div class="chapter-footer-nav">';
    if (prev) {
      html += '<a class="footer-nav-btn prev' + (prev.available ? '' : ' disabled') + '" href="#' + prev.id + '">' +
        '<span class="fn-label">← Capítulo anterior</span><span class="fn-title">' + prev.title + '</span></a>';
    } else {
      html += '<span></span>';
    }
    if (next) {
      html += '<a class="footer-nav-btn next' + (next.available ? '' : ' disabled') + '" href="#' + next.id + '">' +
        '<span class="fn-label">Próximo capítulo →</span><span class="fn-title">' + next.title + '</span></a>';
    }
    html += '</div>';
    if (chapter.number) {
      html += '<div class="chapter-position">Capítulo ' + chapter.number + ' de ' + TOTAL_CHAPTERS + '</div>';
    }
    wrap.innerHTML = html;
    content.appendChild(wrap);
  }

  // ---------------- checklist persistida ----------------

  function restoreChecklist(content, chapterId) {
    content.querySelectorAll('[data-checklist]').forEach(input => {
      const key = chapterId + ':' + input.dataset.checklist;
      input.checked = !!state.checklist[key];
      input.addEventListener('change', () => {
        state.checklist[key] = input.checked;
        saveState();
      });
    });
  }

  function wireCompleteButton(content, chapterId) {
    const btn = content.querySelector('[data-complete-chapter]');
    if (!btn) return;
    const sync = () => {
      const done = !!state.completed[chapterId];
      btn.classList.toggle('is-done', done);
      btn.textContent = done ? '✓ Capítulo concluído' : 'Marcar capítulo como concluído';
    };
    sync();
    btn.addEventListener('click', () => {
      state.completed[chapterId] = !state.completed[chapterId];
      saveState();
      sync();
      updateProgress();
      renderSidebar();
    });
  }

  // ---------------- busca ----------------

  let searchIndex = [];

  function buildSearchIndex() {
    searchIndex = chapters
      .filter(c => c.available)
      .map(c => ({
        id: c.id,
        title: c.title,
        text: normalize(stripHtml(c.html)),
        rawTitleNorm: normalize(c.title)
      }));
  }

  function performSearch(query) {
    const q = normalize(query.trim());
    const resultsEl = document.getElementById('searchResults');
    if (!q) { resultsEl.hidden = true; resultsEl.innerHTML = ''; return; }

    const matches = [];
    searchIndex.forEach(entry => {
      const titleHit = entry.rawTitleNorm.indexOf(q);
      const textPos = entry.text.indexOf(q);
      if (titleHit !== -1 || textPos !== -1) {
        let snippet = '';
        if (textPos !== -1) {
          const start = Math.max(0, textPos - 40);
          const end = Math.min(entry.text.length, textPos + q.length + 60);
          snippet = (start > 0 ? '…' : '') + entry.text.slice(start, end).trim() + (end < entry.text.length ? '…' : '');
        }
        matches.push({ id: entry.id, title: entry.title, snippet, score: titleHit !== -1 ? 0 : 1 });
      }
    });

    matches.sort((a, b) => a.score - b.score);

    if (!matches.length) {
      resultsEl.innerHTML = '<div class="search-empty">Nenhum resultado para “' + query + '”.</div>';
      resultsEl.hidden = false;
      return;
    }

    resultsEl.innerHTML = matches.slice(0, 8).map(m =>
      '<div class="search-result" data-id="' + m.id + '" data-term="' + encodeURIComponent(query.trim()) + '">' +
        '<div class="search-result-title">' + m.title + '</div>' +
        (m.snippet ? '<div class="search-result-snippet">' + escapeHtml(m.snippet) + '</div>' : '') +
      '</div>'
    ).join('');
    resultsEl.hidden = false;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  }

  function scrollToTerm(content, term) {
    content.scrollTop = 0;
    const q = normalize(term);
    if (!q) return;
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (normalize(node.nodeValue).indexOf(q) !== -1) {
        const el = node.parentElement;
        if (el) {
          el.scrollIntoView({ block: 'center' });
          el.classList.add('term-flash');
          const prevBg = el.style.background;
          el.style.transition = 'background .3s ease';
          el.style.background = 'rgba(255,255,255,.08)';
          setTimeout(() => { el.style.background = prevBg; }, 1200);
        }
        break;
      }
    }
  }

  // ---------------- sidebar toggle / mobile ----------------

  function toggleSidebar(collapse) {
    const app = document.querySelector('.app');
    const willCollapse = typeof collapse === 'boolean' ? collapse : !app.classList.contains('sidebar-collapsed');
    app.classList.toggle('sidebar-collapsed', willCollapse);
    document.getElementById('sidebarExpand').hidden = !willCollapse || window.innerWidth <= 900;
    document.getElementById('sidebarOverlay').hidden = willCollapse || window.innerWidth > 900;
  }

  function closeMobileSidebarIfNeeded() {
    if (window.innerWidth <= 900) toggleSidebar(true);
  }

  // ---------------- roteamento ----------------

  function currentHashId() {
    const h = location.hash.replace('#', '');
    return h || 'intro';
  }

  function onHashChange() {
    renderChapter(currentHashId());
  }

  // ---------------- eventos globais ----------------

  function wireEvents() {
    document.getElementById('sidebarToggle').addEventListener('click', () => toggleSidebar());
    document.getElementById('sidebarExpand').addEventListener('click', () => toggleSidebar(false));
    document.getElementById('mobileMenuBtn').addEventListener('click', () => toggleSidebar(false));
    document.getElementById('sidebarOverlay').addEventListener('click', () => toggleSidebar(true));

    const input = document.getElementById('searchInput');
    input.addEventListener('input', () => performSearch(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { input.value = ''; performSearch(''); input.blur(); }
    });

    document.getElementById('searchResults').addEventListener('click', (e) => {
      const item = e.target.closest('.search-result');
      if (!item) return;
      const id = item.dataset.id;
      const term = decodeURIComponent(item.dataset.term || '');
      document.getElementById('searchResults').hidden = true;
      input.value = '';
      if (currentHashId() === id) {
        renderChapter(id, { scrollToTerm: term });
      } else {
        location.hash = id;
        setTimeout(() => renderChapter(id, { scrollToTerm: term }), 0);
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.sidebar-search')) {
        document.getElementById('searchResults').hidden = true;
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        input.focus();
      }
    });

    // delegação: botões de copiar código dentro do conteúdo
    $content().addEventListener('click', (e) => {
      const btn = e.target.closest('.copy-btn');
      if (!btn) return;
      const block = btn.closest('.code-block');
      const codeEl = block && block.querySelector('code');
      if (!codeEl) return;
      const text = codeEl.textContent;
      navigator.clipboard.writeText(text).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copiado!';
        setTimeout(() => { btn.textContent = original; }, 1400);
      }).catch(() => {});
    });

    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) document.getElementById('sidebarOverlay').hidden = true;
    });
  }

  // ---------------- init ----------------

  function init() {
    loadState();
    wireEvents();
    renderSidebar();
    buildSearchIndex();
    updateProgress();
    renderChapter(currentHashId());

    if (window.innerWidth <= 900) toggleSidebar(true);
  }

  return {
    init,
    registerChapter,
    registerPlaceholder
  };
})();
