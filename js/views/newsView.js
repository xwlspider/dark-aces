import { newsCard } from "../components/newsCard.js";
export function mountNewsView({ root, toolbar, onAdd, onDelete }) {
  toolbar.querySelector("button").onclick = onAdd;
  root.addEventListener("click", (e) => { if (e.target.dataset.del) onDelete(e.target.dataset.del); });
  return ({ news, isAdmin }) => {
    toolbar.classList.toggle("hide", !isAdmin);
    const list = [...news].sort((a, b) => (b.date || 0) - (a.date || 0));
    root.innerHTML = list.length ? list.map((n) => newsCard(n, isAdmin)).join("") : `<div class="empty">Sin novedades por ahora. ¡Pronto habrá noticias del equipo!</div>`;
  };
}
