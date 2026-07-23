function renderLayout(pageTitle) {
  const app = getApp();
  clearElement(app);

  const layout = document.createElement("div");
  layout.className = "layout";

  const sidebar = createSidebar();
  const page = document.createElement("main");
  page.className = "page";

  const topbar = document.createElement("div");
  topbar.className = "topbar";

  const title = document.createElement("h1");
  title.textContent = pageTitle;

  const userText = document.createElement("span");
  userText.className = "muted";
  userText.textContent = "Librarian";

  topbar.appendChild(title);
  topbar.appendChild(userText);

  const content = document.createElement("div");
  content.className = "content";
  content.id = "pageContent";

  page.appendChild(topbar);
  page.appendChild(content);
  layout.appendChild(sidebar);
  layout.appendChild(page);
  app.appendChild(layout);

  return content;
}

function createSidebar() {
  const sidebar = document.createElement("aside");
  sidebar.className = "sidebar";

  const top = document.createElement("div");
  top.className = "sidebar-top";

  const collapseButton = createButton("=", "icon-button");
  collapseButton.title = "Toggle menu";
  collapseButton.onclick = function () {
    sidebar.classList.toggle("collapsed");
  };

  const title = document.createElement("div");
  title.className = "sidebar-title";
  title.textContent = "Library";

  top.appendChild(collapseButton);
  top.appendChild(title);
  sidebar.appendChild(top);

  addMenuLink(sidebar, "D", "Dashboard", "dashboard.html");
  addMenuLink(sidebar, "B", "Books", "books.html");
  addMenuLink(sidebar, "M", "Members", "members.html");
  addMenuLink(sidebar, "A", "Authors", "authors.html");
  addMenuLink(sidebar, "C", "Categories", "categories.html");

  const logout = createButton("", "logout-button");
  const logoutIcon = document.createElement("span");
  logoutIcon.textContent = "X";
  const logoutText = document.createElement("span");
  logoutText.className = "menu-text";
  logoutText.textContent = "Logout";
  logout.appendChild(logoutIcon);
  logout.appendChild(logoutText);
  logout.onclick = logoutUser;
  sidebar.appendChild(logout);

  return sidebar;
}

function addMenuLink(sidebar, icon, text, href) {
  const link = document.createElement("a");
  link.href = href;
  link.className = "menu-link";

  if (window.location.pathname.indexOf(href) != -1) {
    link.classList.add("active");
  }

  const iconSpan = document.createElement("span");
  iconSpan.textContent = icon;

  const textSpan = document.createElement("span");
  textSpan.className = "menu-text";
  textSpan.textContent = text;

  link.appendChild(iconSpan);
  link.appendChild(textSpan);
  sidebar.appendChild(link);
}
