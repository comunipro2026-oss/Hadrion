import { access, readFile } from "node:fs/promises";

const app = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const manifest = JSON.parse(await readFile(new URL("../public/manifest.json", import.meta.url), "utf8"));
const errors = [];

if (app.includes('password:"admin123"') || app.includes("password:'admin123'")) {
  errors.push("La contraseña administrativa de demostración sigue en el bundle público.");
}
if (app.includes("typeof x.id === \"number\"") && app.includes("x.password === f.pass")) {
  errors.push("El inicio de sesión conserva un acceso local inseguro.");
}
for (const icon of manifest.icons || []) {
  const path = icon.src.replace(/^\//, "");
  try { await access(new URL(`../public/${path}`, import.meta.url)); }
  catch { errors.push(`El manifiesto referencia un archivo inexistente: ${icon.src}`); }
}

if (errors.length) {
  console.error(errors.map(error => `✗ ${error}`).join("\n"));
  process.exit(1);
}

console.log("✓ Hadrion: controles básicos de seguridad y PWA superados.");
