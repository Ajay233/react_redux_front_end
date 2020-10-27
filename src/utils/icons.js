export const isIconRequired = (name) => {
  switch (name) {
    case "verifyProcess": return true;
    case "verifySuccess": return true;
    case "verifyResend": return true;
    case "permissionRequest": return true;
    case "verifyError": return true;
    default: return false;
  }
}

export const iconPicker = (name) => {
  switch (name) {
    case "verifyProcess": return "mail-sent.png";
    case "verifyResend": return "mail-sent.png";
    case "permissionRequest": return "mail-sent.png";
    case "verifySuccess": return "mail-success.png";
    case "verifyError": return "mail-error.png";
    default: return null;
  }
}
