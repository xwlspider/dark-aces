import { STATS, MAX } from "../config/constants.js";
import { esc } from "../utils/dom.js";
import { radarSvg } from "./radar.js";

export const overall = (p) => STATS.reduce((a, [k]) => a + (+p[k] || 0), 0);

export function playerCard(p, isAdmin) {
  const bg = p.photo ? `style="background-image:url('${esc(p.photo)}')"` : "";
  return `<article class="card">
    <div class="ph" ${bg}>${p.photo ? "" : "🏐"}</div><span class="pos">${esc(p.pos || "Jugador")}</span>
    <div class="cb">
      <h3>${esc(p.name)}</h3>
      <div class="char">Personaje que usa: <b>${esc(p.char || "—")}</b></div>
      <div class="rule"></div>${radarSvg(p)}
      <div class="ov"><span class="char">Overall</span><b>${overall(p)}/${STATS.length * MAX}</b></div>
      ${isAdmin ? `<div class="acts"><button class="btn o" data-edit="${esc(p.id)}">Editar</button><button class="btn o" data-del="${esc(p.id)}">Eliminar</button></div>` : ""}
    </div></article>`;
}
