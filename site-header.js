/* 京都ハング ライブラリ：共通ヘッダー
 * メニューの追加・変更はこのファイルだけで管理する。
 * 各HTMLページには <header class="header" id="site-header"></header> と
 * <script src="site-header.js" defer></script> を置く。
 */
(function () {
  "use strict";

  const links = [
    ["index.html", "トップ"],
    ["playlists.html", "再生リスト"],
    ["training.html", "練習ガイド"],
    ["area.html", "エリア管理"],
    ["video.html", "動画ガイド"],
    ["feedback.html", "提案フォーム"]
  ];

  const sectionOf = {
    "playlist-save.html": "playlists.html",
    "first-flight.html": "training.html",
    "ground-handling.html": "training.html",
    "maps.html": "training.html",
    "training-aircraft.html": "training.html",
    "skyflow-sizes.html": "training.html",
    "330-setup.html": "training.html",
    "330-setdown.html": "training.html",
    "170-setup.html": "training.html",
    "170-setdown.html": "training.html",
    "radio-vxd1s.html": "training.html",
    "mowing-manual.html": "area.html",
    "mowing-map.html": "area.html",
    "action-camera.html": "video.html",
    "youtube-upload.html": "video.html"
  };

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function render() {
    const header = document.getElementById("site-header");
    if (!header) return;

    const head = createElement("div", "head");
    head.appendChild(createElement("div", "brand", "京都ハング ライブラリ"));
    head.appendChild(createElement("div", "sub", "練習動画とマニュアルをすぐ探せるサイト"));

    const nav = createElement("nav", "nav");
    nav.setAttribute("aria-label", "サイト共通メニュー");
    const page = decodeURIComponent(location.pathname.split("/").pop() || "index.html");
    const active = sectionOf[page] || page;

    for (const [href, label] of links) {
      const anchor = createElement("a", "", label);
      anchor.href = href;
      if (active === href) {
        anchor.classList.add("active");
        anchor.setAttribute("aria-current", page === href ? "page" : "true");
      }
      nav.appendChild(anchor);
    }

    header.replaceChildren(head, nav);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render, { once: true });
  } else {
    render();
  }
})();
