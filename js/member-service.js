function findMemberById(id) {
  const members = getMembers();

  for (let i = 0; i < members.length; i++) {
    if (members[i].id == id) {
      return members[i];
    }
  }
  return null;
}
function memberHasBorrowedBooks(memberId) {
  const books = getBooks();

  for (let i = 0; i < books.length; i++) {
    if (books[i].borrowedBy == memberId) {
      return true;
    }
  }

  return false;
}

function deleteMemberById(id) {
  const members = getMembers();

  for (let i = 0; i < members.length; i++) {
    if (members[i].id == id) {
      members.splice(i, 1);
      saveMembers(members);
      return true;
    }
  }

  return false;
}

function getNextMemberCode(members) {
  const nextId = getNextId(members);
  return formatMemberCode(nextId);
}

function formatMemberCode(id) {
  let textId = String(id);

  while (textId.length < 3) {
    textId = "0" + textId;
  }

  return "MEM" + textId;
}
