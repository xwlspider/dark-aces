import { SPLASH_MS } from "./config/constants.js";
import { $ } from "./utils/dom.js";
import { getState, setState, subscribe } from "./state/store.js";
import { login, logout, onAdminChange } from "./services/auth.service.js";
import { playersService } from "./services/players.service.js";
import { newsService } from "./services/news.service.js";
import { hideSplash } from "./components/splash.js";
import { initPlayerDialog } from "./components/playerDialog.js";
import { initNewsDialog } from "./components/newsDialog.js";
import { initLoginDialog } from "./components/loginDialog.js";
import { mountStatsView } from "./views/statsView.js";
import { mountNewsView } from "./views/newsView.js";

hideSplash(SPLASH_MS);

// Diálogos
const playerDlg = initPlayerDialog({ onSave: (p) => playersService.save(p) });
const newsDlg = initNewsDialog({ onSave: (n) => newsService.save(n) });
const loginDlg = initLoginDialog({ onLogin: login });

// Vistas
const renderStats = mountStatsView({
  root: $("#playerList"), toolbar: $("#playerTools"), pager: $("#playerPager"),
  onAdd: () => playerDlg.open(),
  onEdit: (id) => playerDlg.open(getState().players.find((p) => p.id === id)),
  onDelete: (id) => confirm("¿Eliminar este jugador?") && playersService.remove(id),
});
const renderNews = mountNewsView({
  root: $("#newsList"), toolbar: $("#newsTools"),
  onAdd: () => newsDlg.open(),
  onDelete: (id) => confirm("¿Eliminar novedad?") && newsService.remove(id),
});

// Render reactivo ante cualquier cambio de estado
subscribe((s) => {
  renderStats(s); renderNews(s);
  $("#adminBadge").classList.toggle("hide", !s.isAdmin);
  $("#loginBtn").textContent = s.isAdmin ? "Cerrar sesión" : "🔒 Iniciar sesión";
});

// Datos en vivo + sesión
playersService.subscribe((players) => setState({ players }));
newsService.subscribe((news) => setState({ news }));
onAdminChange((isAdmin) => setState({ isAdmin }));
$("#loginBtn").onclick = () => (getState().isAdmin ? logout() : loginDlg.open());
setState({});
