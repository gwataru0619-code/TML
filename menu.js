// すべてのページで共通利用するハンバーガーメニュー設定です。
const MENU_VERSION = "20260424-6";

// ホームから移動できるページをここで一元管理します。
const MENU_ITEMS = [
  { href: `index.html?v=${MENU_VERSION}`, label: "ホーム" },
  { href: `glossary.html?v=${MENU_VERSION}`, label: "用語集" },
  { href: `timeline.html?v=${MENU_VERSION}`, label: "年表" },
  { href: `works.html?v=${MENU_VERSION}`, label: "作品ライブラリ" },
  { href: `characters.html?v=${MENU_VERSION}`, label: "キャラクター一覧" }
];

// 現在ページ名（index.html など）を取得する関数です。
function getCurrentPageName() {
  const fileName = window.location.pathname.split("/").pop();
  return fileName || "index.html";
}

// ハンバーガーメニュー本体を生成して、bodyの先頭に挿入します。
function createHamburgerMenu() {
  const currentPageName = getCurrentPageName();
  const wrapper = document.createElement("div");
  wrapper.className = "hamburger-wrapper";

  wrapper.innerHTML = `
    <button class="hamburger-button" type="button" aria-expanded="false" aria-controls="global-nav-panel">
      <span class="hamburger-icon" aria-hidden="true"></span>
      <span class="hamburger-label">メニュー</span>
    </button>
    <nav id="global-nav-panel" class="global-nav-panel" hidden>
      <p class="global-nav-title">ページ移動</p>
      <ul class="global-nav-list"></ul>
    </nav>
  `;

  const menuButton = wrapper.querySelector(".hamburger-button");
  const navPanel = wrapper.querySelector(".global-nav-panel");
  const navList = wrapper.querySelector(".global-nav-list");

  MENU_ITEMS.forEach((item) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    // 現在ページは視覚的に分かるように強調します。
    if (item.href.startsWith(currentPageName)) {
      link.classList.add("is-current");
    }
    listItem.appendChild(link);
    navList.appendChild(listItem);
  });

  // ボタンを押すたびにメニューを開閉します。
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    navPanel.hidden = isExpanded;
  });

  // メニューの外側を押したときは閉じるようにします。
  document.addEventListener("click", (event) => {
    if (!wrapper.contains(event.target)) {
      menuButton.setAttribute("aria-expanded", "false");
      navPanel.hidden = true;
    }
  });

  document.body.prepend(wrapper);
}

// HTMLの読み込み完了後にメニューを生成します。
document.addEventListener("DOMContentLoaded", createHamburgerMenu);
