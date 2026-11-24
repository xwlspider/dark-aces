import { $, uid } from "../utils/dom.js";
export function initNewsDialog({ onSave }) {
  $("#fNews").addEventListener("submit", (e) => {
    if (e.submitter?.value !== "save") return;
    onSave({ id: uid(), title: $("#nTitle").value.trim(), text: $("#nText").value.trim(), date: Date.now() });
  });
  return { open() { $("#nTitle").value = ""; $("#nText").value = ""; $("#dlgNews").showModal(); } };
}
