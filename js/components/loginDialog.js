import { $ } from "../utils/dom.js";
export function initLoginDialog({ onLogin }) {
  $("#fLogin").addEventListener("submit", async (e) => {
    if (e.submitter?.value !== "go") return;
    try { await onLogin($("#lEmail").value, $("#lPass").value); }
    catch { alert("Credenciales incorrectas"); }
  });
  return { open: () => $("#dlgLogin").showModal() };
}
