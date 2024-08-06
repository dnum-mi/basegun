export function isUserUsingComputer() {
  return window.navigator.userAgent.includes(
    "Macintosh" || "Windows" || "Linux",
  );
}
