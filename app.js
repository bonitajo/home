(() => {
  "use strict";
  const icons = {
    form: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h3"/>',
    folder: '<path d="M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7h18"/><path d="M12 10v7m-3-3 3 3 3-3"/>',
    book: '<path d="M12 5v15M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Z"/>',
    note: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    play: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 6 3-6 3Z"/>',
    shield: '<path d="m12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5Z"/><path d="m8 11 3 3 5-5"/>'
  };
  document.querySelectorAll("[data-icon]").forEach(el => {
    el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (icons[el.dataset.icon] || "") + '</svg>';
  });
  const labels = {registration:"지메일 등록하기",materials:"자료실 열기",googleBlog:"블로그 바로가기",naverBlog:"블로그 바로가기",youtube:"강의 보러 가기"};
  const links = window.CLASS_CONFIG?.links || {};
  document.querySelectorAll("[data-service]").forEach(card => {
    const key = card.dataset.service;
    const value = links[key];
    if (typeof value !== "string" || !value.trim()) return;
    let url;
    try { url = new URL(value); } catch { return; }
    if (url.protocol !== "https:" || url.username || url.password) return;
    const link = document.createElement("a");
    link.className = "action link";
    link.href = url.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", card.querySelector("h3").textContent + " — " + labels[key] + " (새 탭)");
    link.append(document.createTextNode(labels[key]));
    const arrow = document.createElement("span");
    arrow.textContent = "↗";
    arrow.setAttribute("aria-hidden","true");
    link.append(arrow);
    card.querySelector(".action").replaceWith(link);
  });
})();
