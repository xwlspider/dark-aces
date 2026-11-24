import { $ } from "../utils/dom.js";
export const hideSplash = (ms) => setTimeout(() => $("#splash").classList.add("out"), ms);
