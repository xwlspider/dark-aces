import { $, uid } from "../utils/dom.js";
import { STATS, MAX, POSITIONS } from "../config/constants.js";
import { shrinkImage } from "../utils/image.js";

export function initPlayerDialog({ onSave }) {
  const dlg = $("#dlgPlayer"), form = $("#fPlayer");
  let current = null;
  $("#pPos").innerHTML = POSITIONS.map((p) => `<option>${p}</option>`).join("");
  $("#statInputs").innerHTML = STATS.map(([k, l]) => `<div><label>${l}</label><input type="number" min="0" max="${MAX}" id="s_${k}" value="0"></div>`).join("");

  form.addEventListener("submit", async (e) => {
    if (e.submitter?.value !== "save") return;
    const p = { ...current, name: $("#pName").value.trim(), char: $("#pChar").value.trim(), pos: $("#pPos").value };
    STATS.forEach(([k]) => (p[k] = Math.max(0, Math.min(MAX, +$("#s_" + k).value || 0))));
    const file = $("#pFile").files[0];
    try { if (file) p.photo = await shrinkImage(file); await onSave(p); }
    catch (err) { alert("No se pudo guardar: " + (err.message || err)); }
  });

  return {
    open(player) {
      current = player || { id: uid() };
      $("#dpTitle").textContent = player ? "Editar jugador" : "Nuevo jugador";
      $("#pName").value = current.name || ""; $("#pChar").value = current.char || "";
      $("#pPos").value = current.pos || POSITIONS[0]; $("#pFile").value = "";
      STATS.forEach(([k]) => ($("#s_" + k).value = current[k] ?? 0));
      dlg.showModal();
    },
  };
}
