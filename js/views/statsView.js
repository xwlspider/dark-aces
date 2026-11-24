import { playerCard } from "../components/playerCard.js";
import { PAGE_SIZE } from "../config/constants.js";

export function mountStatsView({ root, toolbar, pager, onAdd, onEdit, onDelete }) {
  let page = 0, last = null;
  toolbar.querySelector("button").onclick = onAdd;
  root.addEventListener("click", (e) => {
    const { edit, del } = e.target.dataset;
    if (edit) onEdit(edit);
    if (del) onDelete(del);
  });
  pager.addEventListener("click", (e) => {
    const d = Number(e.target.dataset.go);
    if (d) { page += d; render(last); root.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });

  function render(state) {
    last = state;
    const { players, isAdmin } = state;
    const pages = Math.max(1, Math.ceil(players.length / PAGE_SIZE));
    page = Math.min(page, pages - 1);
    toolbar.classList.toggle("hide", !isAdmin);
    const slice = players.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    root.innerHTML = slice.length ? slice.map((p) => playerCard(p, isAdmin)).join("") : `<div class="empty" style="grid-column:1/-1">Aún no hay jugadores registrados.</div>`;
    pager.classList.toggle("hide", pages < 2);
    pager.innerHTML = `<button class="btn o" data-go="-1" ${page === 0 ? "disabled" : ""}>‹ Anterior</button><span>Página ${page + 1} de ${pages}</span><button class="btn o" data-go="1" ${page >= pages - 1 ? "disabled" : ""}>Siguiente ›</button>`;
  }
  return render;
}
