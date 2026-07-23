if (protectPage()) {
  setupStorage().then(function () {
    renderMemberDetails();
  });
}

function renderMemberDetails() {
  const content = renderLayout("Member Details");
  const memberId = getQueryNumber("id");
  const member = findMemberById(memberId);
  const card = document.createElement("div");
  card.className = "card";

  if (member == null) {
    card.appendChild(createElementWithText("p", "Member not found"));
    card.appendChild(createLink("Back", "members.html", "btn-light"));
    content.appendChild(card);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "details-grid";

  addMemberDetail(grid, "Member ID", member.memberCode || formatMemberCode(member.id));
  addMemberDetail(grid, "Name", member.memberName);
  addMemberDetail(grid, "Mobile", member.mobile);
  addMemberDetail(grid, "Email", member.email);
  addMemberDetail(grid, "Address", member.address);
  addMemberDetail(grid, "Membership Type", member.membershipType);
  addMemberDetail(grid, "Status", member.status);

  const actions = document.createElement("div");
  actions.className = "form-actions";
  actions.appendChild(createLink("Edit", "edit-member.html?id=" + member.id, "btn-warning"));
  actions.appendChild(createLink("Back", "members.html", "btn-light"));

  card.appendChild(grid);
  card.appendChild(actions);
  content.appendChild(card);
}

function addMemberDetail(parent, label, value) {
  const box = document.createElement("div");
  box.className = "detail-box";

  const strong = document.createElement("strong");
  strong.textContent = label;

  const text = document.createElement("span");
  text.textContent = value == undefined || value == "" ? "-" : value;

  box.appendChild(strong);
  box.appendChild(text);
  parent.appendChild(box);
}

function formatMemberCode(id) {
  let textId = String(id);

  while (textId.length < 3) {
    textId = "0" + textId;
  }

  return "MEM" + textId;
}
