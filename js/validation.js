function isRequired(value) {
  return value.trim() != "";
}

function hasMinimumLength(value, length) {
  return value.trim().length >= length;
}

function hasMaximumLength(value, length) {
  return value.trim().length <= length;
}

function isPositiveNumber(value) {
  return Number(value) > 0;
}

function isEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value);
}

function isPhone(value) {
  const pattern = /^[0-9]{10}$/;
  return pattern.test(value);
}

function isDuplicateName(items, field, name, editId) {
  for (let i = 0; i < items.length; i++) {
    if (
      items[i][field].toLowerCase() == name.toLowerCase() &&
      items[i].id != editId
    ) {
      return true;
    }
  }
  return false;
}
