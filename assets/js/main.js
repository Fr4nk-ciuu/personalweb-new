/* =========================================================
   页面交互逻辑
   包含：主题切换 / 导航 / 打字机 / 数字滚动 / 技能渲染 /
         项目筛选与搜索 / 项目详情弹窗 / 滚动显现
   ========================================================= */

(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------------- 1. 主题切换 ---------------- */
  const root = document.documentElement;
  const saved = localStorage.getItem("cj-theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  root.setAttribute("data-theme", saved || (prefersLight ? "light" : "dark"));

  $("#themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("cj-theme", next);
  });

  /* ---------------- 2. 导航栏 ---------------- */
  const nav = $("#nav");
  const navLinks = $("#navLinks");
  const progress = $("#scrollProgress");
  const toTop = $("#toTop");

  $("#menuBtn").addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") navLinks.classList.remove("open");
  });

  const navAnchors = $$(".nav-links a");
  const sections = navAnchors
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  function onScroll() {
    const y = window.scrollY;

    nav.classList.toggle("scrolled", y > 12);
    toTop.classList.toggle("show", y > 500);

    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = h > 0 ? (y / h) * 100 + "%" : "0%";

    // 当前所在板块高亮
    let current = "";
    sections.forEach((sec) => {
      if (y >= sec.offsetTop - 140) current = sec.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => { onScroll(); ticking = false; });
    }
  }, { passive: true });
  onScroll();

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------------- 3. 首屏打字机 ---------------- */
  const typedEl = $("#typed");
  const phrases = [
    "上海杉达学院 · 计算机科学与技术",
    "Java 后端 / Web 全栈 学习者",
    "把想法，变成能跑起来的东西。",
    "19 岁，正在认真长大。"
  ];
  let pIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const text = phrases[pIdx];
    typedEl.textContent = deleting
      ? text.slice(0, --cIdx)
      : text.slice(0, ++cIdx);

    let delay = deleting ? 45 : 95;

    if (!deleting && cIdx === text.length) {
      delay = 1600;
      deleting = true;
    } else if (deleting && cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      delay = 380;
    }
    setTimeout(type, delay);
  }
  type();

  /* ---------------- 4. 数字滚动 ---------------- */
  function countUp(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const dur = 1300;
    const start = performance.now();

    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.floor(eased * target) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------------- 5. 技能渲染 ---------------- */
  const skillsGrid = $("#skillsGrid");
  (window.SKILLS || []).forEach((group, gi) => {
    const card = document.createElement("div");
    card.className = "skill-card reveal";
    card.dataset.delay = gi * 70;

    card.innerHTML = `
      <div class="skill-card-head">
        <div class="skill-card-ico">${group.icon}</div>
        <div>
          <h4>${group.title}</h4>
          <p>${group.desc}</p>
        </div>
      </div>
      <div class="skill-rows">
        ${group.items.map((it) => `
          <div class="skill-row">
            <div class="skill-row-top">
              <span>${it.name}</span>
              <em>${it.note || it.level + "%"}</em>
            </div>
            <div class="skill-bar"><i data-level="${it.level}"></i></div>
          </div>`).join("")}
      </div>`;
    skillsGrid.appendChild(card);
  });

  /* ---------------- 6. 项目筛选与搜索 ---------------- */
  const grid = $("#projectsGrid");
  const filtersBox = $("#filters");
  const searchInput = $("#projectSearch");
  const emptyTip = $("#emptyTip");
  const projects = window.PROJECTS || [];
  const cats = window.CATEGORIES || [{ key: "all", label: "全部" }];

  let activeCat = "all";
  let keyword = "";

  // 渲染筛选按钮
  cats.forEach((c) => {
    const count = c.key === "all"
      ? projects.length
      : projects.filter((p) => p.category === c.key).length;
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (c.key === "all" ? " active" : "");
    btn.dataset.cat = c.key;
    btn.innerHTML = `${c.label}<small>${count}</small>`;
    btn.addEventListener("click", () => {
      activeCat = c.key;
      $$(".filter-btn").forEach((b) => b.classList.toggle("active", b === btn));
      render();
    });
    filtersBox.appendChild(btn);
  });

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function catLabel(key) {
    const c = cats.find((x) => x.key === key);
    return c ? c.label : "其他";
  }

  function render() {
    const kw = keyword.trim().toLowerCase();
    const list = projects.filter((p) => {
      const okCat = activeCat === "all" || p.category === activeCat;
      const hay = [p.title, p.summary, (p.tech || []).join(" "), p.role || ""]
        .join(" ").toLowerCase();
      return okCat && (!kw || hay.includes(kw));
    });

    grid.innerHTML = "";
    list.forEach((p, i) => {
      const el = document.createElement("article");
      el.className = "project-card";
      el.style.animationDelay = i * 55 + "ms";
      el.innerHTML = `
        <div class="pc-top">
          <div class="pc-ico">${p.icon || "📁"}</div>
          <div class="pc-metas">
            <span class="pc-badge">${catLabel(p.category)}</span>
            <span class="pc-year">${escapeHtml(p.year || "")}</span>
          </div>
        </div>
        <h3 class="pc-title">${escapeHtml(p.title)}</h3>
        <p class="pc-desc">${escapeHtml(p.summary)}</p>
        <div class="pc-tags">${(p.tech || []).slice(0, 4).map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>
        <div class="pc-foot">
          <span>查看详情</span>
          <span class="arrow">→</span>
        </div>`;
      el.addEventListener("click", () => openModal(p));
      grid.appendChild(el);
    });

    emptyTip.hidden = list.length > 0;
  }

  let searchTimer;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    const v = e.target.value;
    searchTimer = setTimeout(() => { keyword = v; render(); }, 180);
  });

  /* ---------------- 7. 项目详情弹窗 ---------------- */
  const modal = $("#modal");
  const modalBody = $("#modalBody");

  function openModal(p) {
    const linkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>`;

    modalBody.innerHTML = `
      <div class="mb-head">
        <div class="mb-ico">${p.icon || "📁"}</div>
        <div>
          <h3>${escapeHtml(p.title)}</h3>
          <div class="mb-sub">${catLabel(p.category)} · ${escapeHtml(p.year || "")}${p.role ? " · " + escapeHtml(p.role) : ""}</div>
        </div>
      </div>

      ${p.intro ? `<div class="mb-section"><h5>项目介绍</h5><p>${escapeHtml(p.intro)}</p></div>` : ""}

      ${(p.highlights && p.highlights.length)
        ? `<div class="mb-section"><h5>我做了什么</h5><ul>${p.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul></div>`
        : ""}

      ${(p.tech && p.tech.length)
        ? `<div class="mb-section"><h5>技术栈</h5><div class="mb-tags">${p.tech.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div></div>`
        : ""}

      <div class="mb-links">
        ${p.github ? `<a class="primary" href="${p.github}" target="_blank" rel="noopener">${linkIcon} 查看源码</a>` : ""}
        ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">${linkIcon} 在线演示</a>` : ""}
        ${(!p.github && !p.demo) ? `<span style="font-size:13.5px;color:var(--muted)">该项目暂未公开仓库或演示地址</span>` : ""}
      </div>`;

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-close", modal).focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* ---------------- 8. 滚动显现 ---------------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add("visible"), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  $$(".reveal").forEach((el) => observer.observe(el));

  // 技能条填充动画
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      $$("i[data-level]", entry.target).forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.level + "%"; }, i * 110);
      });
      barObserver.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  $(".skill-card") && $$(".skill-card").forEach((c) => barObserver.observe(c));

  // 首屏数字
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      $$("b[data-count]", entry.target).forEach(countUp);
      statObserver.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  $(".hero-stats") && statObserver.observe($(".hero-stats"));

  /* ---------------- 9. 杂项 ---------------- */
  $("#year").textContent = new Date().getFullYear();

  // 项目数据是脚本渲染的，先跑一次
  render();
})();
