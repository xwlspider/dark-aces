export const $ = (s, r = document) => r.querySelector(s);
export const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
