const state = { players: [], news: [], isAdmin: false };
const listeners = new Set();
export const getState = () => state;
export const setState = (patch) => { Object.assign(state, patch); listeners.forEach((f) => f(state)); };
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
