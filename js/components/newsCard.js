import { esc } from "../utils/dom.js";
export const newsCard = (n, isAdmin) => `<article class="news">
  <small>${new Date(n.date || Date.now()).toLocaleDateString("es")}</small><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p>
  ${isAdmin ? `<div class="acts"><button class="btn o" data-del="${esc(n.id)}">Eliminar</button></div>` : ""}</article>`;
