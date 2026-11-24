import { STATS, MAX } from "../config/constants.js";
import { esc } from "../utils/dom.js";

export function radarSvg(p) {
  const cx = 150, cy = 130, R = 80, n = STATS.length;
  const pt = (i, v) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v]; };
  let g = "";
  for (let l = 1; l <= 4; l++) g += `<polygon points="${STATS.map((_, i) => pt(i, l / 4).join(",")).join(" ")}" fill="none" stroke="currentColor" opacity=".25"/>`;
  STATS.forEach((_, i) => { const [x, y] = pt(i, 1); g += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="currentColor" opacity=".25"/>`; });
  const poly = STATS.map(([k], i) => pt(i, Math.min(MAX, +p[k] || 0) / MAX).join(",")).join(" ");
  g += `<polygon points="${poly}" fill="currentColor" fill-opacity=".28" stroke="currentColor" stroke-width="2.5"/>`;
  STATS.forEach(([k, label], i) => {
    const [x, y] = pt(i, 1.28), anchor = x < cx - 5 ? "end" : x > cx + 5 ? "start" : "middle";
    g += `<text x="${x}" y="${y + 4}" text-anchor="${anchor}">${label}: ${+p[k] || 0}</text>`;
  });
  return `<svg class="radar" viewBox="0 0 300 260" role="img" aria-label="Radar de ${esc(p.name)}">${g}</svg>`;
}
