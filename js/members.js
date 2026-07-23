let allMembers = [];
let visibleMembers = [];
let memberPage = 1;
let memberRows = 5;
let memberSearch = "";

if (protectPage()) {
  setupStorage().then(function () {
    allMembers = getMembers();
    renderMembersPage();
  });
}

function renderMembersPage() {
  const content = renderLayout("Members");
  const card = document.createElement("div");
  card.className = "card";

  card.appendChild(createMemberToolbar());

  const total = document.createElement("p");
  total.id = "totalMembers";
  total.className = "muted";

  const tableWrap = document.createElement("div");
  tableWrap.className = "table-wrap";
  const table = createTable(["ID", "Member ID", "Name", "Mobile", "Email", "Type", "Status", "Action"]);
  table.id = "membersTable";
  tableWrap.appendChild(table);

  const empty = document.createElement("div");
  empty.id = "emptyMembers";
  empty.className = "empty-state";
  empty.textContent = "No Records Found";

  const pagination = document.createElement("div");
  pagination.id = "memberPagination";
  pagination.className = "pagination";

  card.appendChild(total);
  card.appendChild(tableWrap);
  card.appendChild(empty);
  card.appendChild(pagination);
  content.appendChild(card);
  applyMemberFilters();
}

function createMemberToolbar() {
  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";

  const search = document.createElement("input");
  search.placeholder = "Search name, mobile, email";
  search.onkeyup = debounce(function () {
    memberSearch = search.value.toLowerCase();
    memberPage = 1;
    applyMemberFilters();
  }, 300);

  const status = createMemberSelect("memberStatus", "All Status", ["Active", "Inactive"]);
  const type = createMemberSelect("memberType", "All Types", ["Student", "Faculty"]);
  const sort = createMemberSelect("memberSort", "Sort By", ["Name", "Email", "Status"]);
  const rows = createMemberSelect("memberRows", "Rows", ["5", "10", "15"]);

  status.onchange = resetMemberPage;
  type.onchange = resetMemberPage;
  sort.onchange = resetMemberPage;
  rows.onchange = function () {
    memberRows = Number(rows.value);
    resetMemberPage();
  };

  const buttonRow = document.createElement("div");
  buttonRow.className = "button-row";
  const reset = createButton("Reset", "btn-light");
  reset.onclick = function () {
    search.value = "";
    status.value = "";
    type.value = "";
    sort.value = "";
    rows.value = "5";
    memberRows = 5;
    memberSearch = "";
    resetMemberPage();
  };

  buttonRow.appendChild(reset);
  buttonRow.appendChild(createLink("Register Member", "add-members.html", "btn-primary"));

  toolbar.appendChild(search);
  toolbar.appendChild(status);
  toolbar.appendChild(type);
  toolbar.appendChild(sort);
  toolbar.appendChild(rows);
  toolbar.appendChild(buttonRow);
  return toolbar;
}

function createMemberSelect(id, firstText, values) {
  const select = document.createElement("select");
  select.id = id;
  const first = document.createElement("option");
  first.value = "";
  first.textContent = firstText;
  select.appendChild(first);

  for (let i = 0; i < values.length; i++) {
    const option = document.createElement("option");
    option.value = values[i];
    option.textContent = values[i];
    select.appendChild(option);
  }

  return select;
}

function resetMemberPage() {
  memberPage = 1;
  applyMemberFilters();
}

function applyMemberFilters() {
  visibleMembers = [];
  const status = document.getElementById("memberStatus").value;
  const type = document.getElementById("memberType").value;
  const sortValue = document.getElementById("memberSort").value;

  for (let i = 0; i < allMembers.length; i++) {
    const member = allMembers[i];
    const matchSearch =
      member.memberName.toLowerCase().indexOf(memberSearch) != -1 ||
      member.mobile.indexOf(memberSearch) != -1 ||
      member.email.toLowerCase().indexOf(memberSearch) != -1;

    if (!matchSearch) {
      continue;
    }
    if (status != "" && member.status != status) {
      continue;
    }
    if (type != "" && member.membershipType != type) {
      continue;
    }

    visibleMembers.push(member);
  }

  if (sortValue == "Email") {
    sortItems(visibleMembers, "email");
  } else if (sortValue == "Status") {
    sortItems(visibleMembers, "status");
  } else {
    sortItems(visibleMembers, "memberName");
  }

  renderMemberRows();
}

function renderMemberRows() {
  const table = document.getElementById("membersTable");
  const tbody = table.querySelector("tbody");
  clearElement(tbody);

  const pageItems = paginate(visibleMembers, memberPage, memberRows);

  for (let i = 0; i < pageItems.length; i++) {
    const member = pageItems[i];
    const row = document.createElement("tr");

    addMemberCell(row, member.id);
    addMemberCell(row, member.memberCode || formatMemberCode(member.id));
    addMemberCell(row, member.memberName);
    addMemberCell(row, member.mobile);
    addMemberCell(row, member.email);
    addMemberCell(row, member.membershipType);

    const statusCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = member.status == "Active" ? "badge success" : "badge danger";
    badge.textContent = member.status;
    statusCell.appendChild(badge);
    row.appendChild(statusCell);

    const actionCell = document.createElement("td");
    actionCell.appendChild(createMemberActions(member));
    row.appendChild(actionCell);
    tbody.appendChild(row);
  }

  document.getElementById("totalMembers").textContent = "Total Members: " + visibleMembers.length;
  document.getElementById("emptyMembers").style.display = visibleMembers.length == 0 ? "block" : "none";
  table.style.display = visibleMembers.length == 0 ? "none" : "table";
  renderMemberPagination();
}

function addMemberCell(row, text) {
  const cell = document.createElement("td");
  cell.textContent = text == undefined ? "-" : text;
  row.appendChild(cell);
}

function createMemberActions(member) {
  const actions = document.createElement("div");
  actions.className = "actions";

  actions.appendChild(createLink("View", "member-details.html?id=" + member.id, "btn-light btn-small"));
  actions.appendChild(createLink("Edit", "edit-member.html?id=" + member.id, "btn-warning btn-small"));

  const toggle = createButton(member.status == "Active" ? "Deactivate" : "Activate", "btn-light btn-small");
  toggle.onclick = function () {
    toggleMemberStatus(member.id);
  };
  actions.appendChild(toggle);

  const remove = createButton("Delete", "btn-danger btn-small");
  remove.onclick = function () {
    handleDeleteMember(member.id);
  };
  actions.appendChild(remove);

  return actions;
}

function toggleMemberStatus(id) {
  const members = getMembers();

  for (let i = 0; i < members.length; i++) {
    if (members[i].id == id) {
      members[i].status = members[i].status == "Active" ? "Inactive" : "Active";
      break;
    }
  }

  saveMembers(members);
  allMembers = getMembers();
  applyMemberFilters();
  showToast("Member status updated", "success");
}

function handleDeleteMember(id) {
  if (memberHasBorrowedBooks(id)) {
    showToast("Cannot delete member with borrowed books", "error");
    return;
  }

  if (showConfirm("Delete this member?")) {
    deleteMemberById(id);
    allMembers = getMembers();
    applyMemberFilters();
    showToast("Member deleted successfully", "success");
  }
}

function renderMemberPagination() {
  const pagination = document.getElementById("memberPagination");
  clearElement(pagination);

  const totalPages = Math.ceil(visibleMembers.length / memberRows);
  const left = document.createElement("div");
  const right = document.createElement("div");
  right.className = "page-buttons";
  left.textContent = "Page " + memberPage + " of " + (totalPages == 0 ? 1 : totalPages);

  const prev = createButton("Previous", "btn-light");
  prev.disabled = memberPage == 1;
  prev.onclick = function () {
    memberPage--;
    renderMemberRows();
  };
  right.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createButton(String(i), memberPage == i ? "btn-primary" : "btn-light");
    pageButton.onclick = function () {
      memberPage = i;
      renderMemberRows();
    };
    right.appendChild(pageButton);
  }

  const next = createButton("Next", "btn-light");
  next.disabled = memberPage >= totalPages;
  next.onclick = function () {
    memberPage++;
    renderMemberRows();
  };
  right.appendChild(next);

  pagination.appendChild(left);
  pagination.appendChild(right);
}
