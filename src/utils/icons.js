export function isIconRequired(name){
  switch (name) {
    case "verifyProcess": return true; break;
    case "verifySuccess": return true; break;
    case "verifyError": return true; break;
    default: return false; break;
  }
}

export function iconPicker(name){
  switch (name) {
    case "verifyProcess": return "mail-sent.png"; break;
    case "verifySuccess": return "mail-success.png"; break;
    case "verifyError": return "mail-error.png"; break;
    default: return null; break;
  }
}
