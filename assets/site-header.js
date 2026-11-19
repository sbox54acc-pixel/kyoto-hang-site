/* 京都ハング ライブラリ：共通ヘッダー
 * メニューの追加・変更はこのファイルだけで管理する。
 * 各HTMLページには <header class="header" id="site-header"></header> と
 * <script src="site-header.js" defer></script> を置く。
 */
(function () {
  "use strict";

  const siteRoot = new URL("../", document.currentScript.src).pathname;
  const links = [
    ["index.html", "トップ"],
    ["video/playlists.html", "再生リスト"],
    ["training/index.html", "練習ガイド"],
    ["area/area-management.html", "エリア管理"],
    ["video/index.html", "動画ガイド"],
    ["feedback.html", "提案フォーム"]
  ];

  const sectionOf = {
    "video/playlist-save.html": "video/playlists.html",
    "training/first-flight.html": "training/index.html",
    "training/ground-handling.html": "training/index.html",
    "area/landing-map.html": "training/index.html",
    "training/training-gliders.html": "training/index.html",
    "training/plateau-preparation.html": "training/index.html",
    "manuals/preflight-check.html": "training/index.html",
    "training/weather-guide.html": "training/index.html",
    "training/tow-rope-setup.html": "training/index.html",
    "manuals/glider-setup-guide.html": "training/index.html",
    "training/skyfloater-sizes.html": "training/index.html",
    "manuals/330-setup.html": "training/index.html",
    "manuals/330-setdown.html": "training/index.html",
    "manuals/170-setup.html": "training/index.html",
    "manuals/170-setdown.html": "training/index.html",
    "manuals/radio-vxd1s.html": "training/index.html",
    "area/mowing-manual.html": "area/area-management.html",
    "area/mowing-map.html": "area/area-management.html",
    "video/action-camera.html": "video/index.html",
    "video/youtube-upload.html": "video/index.html"
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
    const page = decodeURIComponent(location.pathname.startsWith(siteRoot) ? (location.pathname.slice(siteRoot.length) || "index.html") : "index.html");
    const active = sectionOf[page] || page;

    for (const [href, label] of links) {
      const anchor = createElement("a", "", label);
      anchor.href = siteRoot + href;
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
  // Cloudflare Web Analytics (all pages load this shared script).
  // This tracks page usage without altering page titles or noindex directives.
  const analytics = document.createElement("script");
  analytics.type = "module";
  analytics.src = "https://static.cloudflareinsights.com/beacon.min.js";
  analytics.setAttribute("data-cf-beacon", '{"token":"40c061d02ec04e1f8d9ef7ba183302f8"}');
  document.head.appendChild(analytics);

})();
