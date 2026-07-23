let editingMemberId = 0;

if (protectPage()) {
  setupStorage().then(function () {
    editingMemberId = getQueryNumber("id");
    renderMemberForm();
  });
}

function renderMemberForm() {
  const title = editingMemberId > 0 ? "Edit Member" : "Register Member";
  const content = renderLayout(title);
  const card = document.createElement("div");
  card.className = "card";

  const form = document.createElement("div");
  form.className = "form-grid";

  form.appendChild(createField("Name", "text", "memberName", "Enter member name"));
  form.appendChild(createField("Mobile", "text", "mobile", "Enter 10 digit mobile"));
  form.appendChild(createField("Email", "email", "email", "Enter email"));
  form.appendChild(createField("Address", "text", "address", "Enter address"));
  form.appendChild(createSelectField("Membership Type", "membershipType", ["", "Student", "Faculty"]));
  form.appendChild(createSelectField("Status", "status", ["Active", "Inactive"]));

  const message = document.createElement("p");
  message.className = "message";

  const actions = document.createElement("div");
  actions.className = "form-actions";

  const save = createButton(editingMemberId > 0 ? "Update Member" : "Save Member", "btn-primary");
  save.onclick = function () {
    saveMemberForm(message, save);
  };

  actions.appendChild(save);
  actions.appendChild(createLink("Back", "members.html", "btn-light"));

  card.appendChild(form);
  card.appendChild(message);
  card.appendChild(actions);
  content.appendChild(card);

  if (editingMemberId > 0) {
    fillMemberForm();
  }
}

function fillMemberForm() {
  const member = findMemberById(editingMemberId);

  if (member == null) {
    showToast("Member not found", "error");
    window.location.href = "members.html";
    return;
  }

  document.getElementById("memberName").value = member.memberName;
  document.getElementById("mobile").value = member.mobile;
  document.getElementById("email").value = member.email;
  document.getElementById("address").value = member.address || "";
  document.getElementById("membershipType").value = member.membershipType || "";
  document.getElementById("status").value = member.status;
}

function saveMemberForm(message, button) {
  if (!validateMemberForm()) {
    showMessage(message, "Please fix the errors", "error");
    return;
  }

  button.disabled = true;
  button.textContent = "Saving...";

  setTimeout(function () {
    if (editingMemberId > 0) {
      updateMember();
      showMessage(message, "Member updated successfully", "success");
    } else {
      addMember();
      showMessage(message, "Member registered successfully", "success");
    }

    setTimeout(function () {
      window.location.href = "members.html";
    }, 800);
  }, 400);
}

function validateMemberForm() {
  let isValid = true;
  const name = document.getElementById("memberName").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const membershipType = document.getElementById("membershipType").value;

  if (!isRequired(name)) {
    showFieldError("memberName", "Name is required");
    isValid = false;
  } else if (!hasMinimumLength(name, 3)) {
    showFieldError("memberName", "Name must have at least 3 letters");
    isValid = false;
  } else {
    showFieldSuccess("memberName");
  }

  if (!isPhone(mobile)) {
    showFieldError("mobile", "Enter a valid 10 digit phone number");
    isValid = false;
  } else if (isDuplicateName(getMembers(), "mobile", mobile, editingMemberId)) {
    showFieldError("mobile", "Mobile number already exists");
    isValid = false;
  } else {
    showFieldSuccess("mobile");
  }

  if (!isEmail(email)) {
    showFieldError("email", "Enter a valid email address");
    isValid = false;
  } else if (isDuplicateName(getMembers(), "email", email, editingMemberId)) {
    showFieldError("email", "Email already exists");
    isValid = false;
  } else {
    showFieldSuccess("email");
  }

  if (!isRequired(address)) {
    showFieldError("address", "Address is required");
    isValid = false;
  } else {
    showFieldSuccess("address");
  }

  if (membershipType == "") {
    showFieldError("membershipType", "Membership type is required");
    isValid = false;
  } else {
    showFieldSuccess("membershipType");
  }

  return isValid;
}

function addMember() {
  const members = getMembers();
  const member = {
    id: getNextId(members),
    memberCode: getNextMemberCode(members),
    memberName: document.getElementById("memberName").value.trim(),
    mobile: document.getElementById("mobile").value.trim(),
    email: document.getElementById("email").value.trim(),
    address: document.getElementById("address").value.trim(),
    membershipType: document.getElementById("membershipType").value,
    status: document.getElementById("status").value
  };

  members.push(member);
  saveMembers(members);
}

function updateMember() {
  const members = getMembers();

  for (let i = 0; i < members.length; i++) {
    if (members[i].id == editingMemberId) {
      members[i].memberName = document.getElementById("memberName").value.trim();
      members[i].mobile = document.getElementById("mobile").value.trim();
      members[i].email = document.getElementById("email").value.trim();
      members[i].address = document.getElementById("address").value.trim();
      members[i].membershipType = document.getElementById("membershipType").value;
      members[i].status = document.getElementById("status").value;
      break;
    }
  }

  saveMembers(members);
}
