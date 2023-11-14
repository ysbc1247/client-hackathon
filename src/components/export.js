export function howProgress(progress) {
  if (progress <= 25) {
    return "danger";
  } else if (progress < 50) {
    return "warning";
  } else if (progress <= 75) {
    return "info";
  } else if (progress <= 99) {
    return "success";
  } else {
    return null;
  }
}
