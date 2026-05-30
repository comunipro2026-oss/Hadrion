import { useState, useEffect, useCallback } from "react";

// ─── PALETA ───────────────────────────────────────────────────────────────────
const C = {
  terra:"#9B7EBD", terraL:"#D4BCE8", terraD:"#7B5EA7", terraF:"#F5F0FA",
  cream:"#FDF8FF", sand:"#EDE0F5", sandD:"#C9B8E8",
  sage:"#E8719C", sageF:"#FDE8F0", forest:"#C0396B",
  charcoal:"#2C2C2C", gray:"#6B6560", grayL:"#9B9590",
  white:"#FFFFFF", danger:"#C0392B", dangerF:"#FDECEA",
  info:"#5B8DB8", infoF:"#EBF3FB",
  purple:"#8B7BB5", purpleF:"#F0EDF8",
  gold:"#E8A020", goldF:"#FEF3E0",
  green:"#2ECC71", greenF:"#E8F8EF",
};

// ─── IDIOMAS ──────────────────────────────────────────────────────────────────
const T = {
  es: {
    dashboard:"Panel", agenda:"Agenda", patients:"Pacientes", payments:"Pagos",
    sessions:"Registros Clínicos", history:"Historia Clínica", objectives:"Objetivos",
    activities:"Actividades", phonology:"Conciencia Fon.", reports:"Reportes",
    plan:"Plan Colaborativo", ia:"Asistente IA", resources:"Recursos",
    admin:"Administración", profile:"Mi Perfil",
    welcome:"Bienvenida a tu plataforma clínica",
    newPatient:"+ Nuevo paciente", save:"Guardar", cancel:"Cancelar",
    logout:"Cerrar sesión", language:"Idioma",
    sessionDuration:"Duración de sesión (minutos)",
    currency:"Moneda", paid:"Pagado", pending:"Pendiente",
    print:"Imprimir", copy:"Copiar texto", generate:"Generar",
    loading:"Generando con IA...", error:"Error de conexión",
    editTemplate:"Editar plantilla", fillTemplate:"Rellenar",
  },
  en: {
    dashboard:"Dashboard", agenda:"Schedule", patients:"Patients", payments:"Payments",
    sessions:"Clinical Records", history:"Clinical History", objectives:"Objectives",
    activities:"Activities", phonology:"Phonological Aw.", reports:"Reports",
    plan:"Collaborative Plan", ia:"AI Assistant", resources:"Resources",
    admin:"Administration", profile:"My Profile",
    welcome:"Welcome to your clinical platform",
    newPatient:"+ New patient", save:"Save", cancel:"Cancel",
    logout:"Log out", language:"Language",
    sessionDuration:"Session duration (minutes)",
    currency:"Currency", paid:"Paid", pending:"Pending",
    print:"Print", copy:"Copy text", generate:"Generate",
    loading:"Generating with AI...", error:"Connection error",
    editTemplate:"Edit template", fillTemplate:"Fill in",
  }
};

// ─── FONEMAS con acentos TTS correctos ───────────────────────────────────────
const PHONEMES = ["A","E","I","O","U","B","C","CH","D","F","G","J","L","LL","M","N","Ñ","P","R","RR","S","T","V","Y","Z"];

const PHONEME_TTS = {
  "A":"a","E":"e","I":"i","O":"o","U":"u",
  "B":"be","C":"ce","CH":"che","D":"de","F":"efe",
  "G":"ge","J":"jota","L":"ele","LL":"elle","M":"eme",
  "N":"ene","Ñ":"eñe","P":"pe","R":"erre","RR":"erre doble",
  "S":"ese","T":"te","V":"uve","Y":"ye","Z":"zeta"
};

const PHONEME_EMOJI = {
  "A":["✈️","🌳","🕷️","🐝","🦅","⚓","🏹","🐿️"],
  "E":["🐘","⭐","🪜","🪞","🧹","🧝","🛡️"],
  "I":["⛪","🦎","🏝️","🧲","🐛","👦"],
  "O":["🐻","🐑","👁️","🪣","🐋","🏗️"],
  "U":["🍇","👔","🦄","🏺","🥄"],
  "B":["👄","🚢","🚲","🐋","🥾","🫏","👜"],
  "C":["🏠","🛏️","🐇","🍳","🚛","🚗","🐴"],
  "CH":["🍫","🍬","🐷","🦺","🪬"],
  "D":["👆","🎲","🦕","🧝","🐉","🍬","🦷"],
  "F":["🦭","🍓","🌸","🔥","👨‍👩‍👧","🎸","🍎"],
  "G":["🐱","🎈","🍪","🦍","🌻","🐛","🎸"],
  "J":["🦒","🧃","🌻","🪆","🧼","🐗"],
  "L":["🌙","✏️","🥛","📚","🦜","🦎","🍋"],
  "LL":["🗝️","🛞","🌧️","🦙","😢"],
  "M":["🦋","🪑","🍎","🐒","🎒","🔨","🧙"],
  "N":["☁️","🍊","👃","❄️","🐦","🔢","🌰"],
  "Ñ":["🦆","🍍","💅","🎶","🌊"],
  "P":["🦆","⚽","🐕","🎹","🚪","🕊️","🐙"],
  "R":["🐭","🤖","🌹","📏","⌚","🛞","🐸"],
  "RR":["🚗","🐕","🌍","📋","🫏","⛰️","🗼"],
  "S":["☀️","🪑","🍵","🐸","🌱","🐍","☂️"],
  "T":["✂️","🚂","🐢","🐯","🍅","🥁","📺"],
  "V":["🐄","🎻","🪟","👗","🌋","⛵","🥦"],
  "Y":["🪀","🍦","⛵","🌿","🐎"],
  "Z":["👟","🦊","🥕","🦓","🍋"],
};

// Palabras CON acentos para TTS correcto
const PHONEME_WORDS = {
  "A":["avión","árbol","araña","abeja","águila","ancla","arco","ardilla"],
  "E":["elefante","estrella","escalera","espejo","escoba","enano","escudo"],
  "I":["iglesia","iguana","isla","imán","insecto","índio"],
  "O":["oso","oveja","ojo","olla","oruga","orca","obra"],
  "U":["uva","uniforme","unicornio","urna","útiles"],
  "B":["boca","barco","bicicleta","ballena","bota","burro","bolsa"],
  "C":["casa","cama","conejo","cocina","camión","carro","caballo"],
  "CH":["chocolate","chupete","chancho","chaleco","chicle"],
  "D":["dedo","dado","dinosaurio","duende","dragón","dulce","diente"],
  "F":["foca","fresa","flor","fuego","familia","flauta","fruta"],
  "G":["gato","globo","galleta","gorila","girasol","gusano","guitarra"],
  "J":["jirafa","jugo","jardín","juguete","jabón","jabalí"],
  "L":["luna","lápiz","leche","libro","loro","lagarto","limón"],
  "LL":["llave","llanta","lluvia","llama","llorar"],
  "M":["mariposa","mesa","manzana","mono","mochila","martillo","mago"],
  "N":["nube","naranja","nariz","nieve","nido","número","nuez"],
  "Ñ":["ñandú","niño","uñas","piña","muñeca"],
  "P":["pato","pelota","perro","piano","puerta","paloma","pulpo"],
  "R":["ratón","robot","rosa","regla","reloj","rueda","rana"],
  "RR":["carro","perro","tierra","pizarra","burro","cerro","torre"],
  "S":["sol","silla","sopa","sapo","semilla","serpiente","sombrilla"],
  "T":["tijeras","tren","tortuga","tigre","tomate","tambor","televisión"],
  "V":["vaca","violín","ventana","vestido","volcán","velero","verdura"],
  "Y":["yoyó","yogur","yate","yerba","yegua"],
  "Z":["zapato","zorro","zanahoria","cebra","zumo"],
};

// ─── MONEDAS ──────────────────────────────────────────────────────────────────
const CURRENCIES = [
  { code:"UYU", symbol:"$U", name:"Pesos uruguayos" },
  { code:"USD", symbol:"US$", name:"Dólares" },
  { code:"ARS", symbol:"$", name:"Pesos argentinos" },
  { code:"CLP", symbol:"$", name:"Pesos chilenos" },
  { code:"BRL", symbol:"R$", name:"Reales" },
  { code:"EUR", symbol:"€", name:"Euros" },
];

// ─── INSTITUCIONES DE PAGO ────────────────────────────────────────────────────
const PAYMENT_INSTITUTIONS = [
  "Particular","Obra social","Mutual","Prepaga","BPS","ASSE","FONASA","NHS","Seguro privado","Otra institución"
];

// ─── PLANTILLAS DE SESIÓN EDITABLES ──────────────────────────────────────────
const SESSION_TEMPLATES = {
  fono: {
    name: "Fonoaudiología",
    fields: [
      { key:"objetivo", label:"Objetivo trabajado", type:"text" },
      { key:"actividades", label:"Actividades realizadas", type:"textarea" },
      { key:"logros", label:"Logros de la sesión", type:"textarea" },
      { key:"dificultades", label:"Dificultades observadas", type:"textarea" },
      { key:"tarea", label:"Tarea para casa", type:"text" },
      { key:"proxima", label:"Plan próxima sesión", type:"text" },
      { key:"observaciones", label:"Observaciones adicionales", type:"textarea" },
    ]
  },
  psico: {
    name: "Psicología / Psicopedagogía",
    fields: [
      { key:"objetivo", label:"Objetivo de la sesión", type:"text" },
      { key:"tecnica", label:"Técnica utilizada", type:"text" },
      { key:"respuesta", label:"Respuesta del paciente", type:"textarea" },
      { key:"regulacion", label:"Regulación emocional observada", type:"text" },
      { key:"tarea", label:"Indicaciones para casa", type:"textarea" },
      { key:"observaciones", label:"Observaciones", type:"textarea" },
    ]
  },
  general: {
    name: "Registro general",
    fields: [
      { key:"objetivo", label:"Objetivo", type:"text" },
      { key:"nota", label:"Notas clínicas", type:"textarea" },
      { key:"progreso", label:"Progreso (%)", type:"number" },
      { key:"tarea", label:"Tarea para casa", type:"text" },
      { key:"proxima", label:"Próxima sesión", type:"text" },
    ]
  }
};

// ─── DATOS INICIALES ──────────────────────────────────────────────────────────
const INIT_USERS = [
  { id:1, name:"Adriana Soba", email:"comunipro12@gmail.com", password:"admin123",
    role:"admin", specialty:"Fonoaudióloga", plan:"Pro", status:"active",
    createdAt:"01/01/2025", avatar:"AS", color:C.terra, lastLogin:"Hoy 08:30" },
];

const INIT_PATIENTS = [
  { id:1, name:"Valentina López", age:7, diagnosis:"TEL", sessions:12,
    nextSession:"Lun 02/06 10:00", avatar:"VL", color:C.terra,
    phone:"(+598) 9 8765 4321", email:"vlopez@mail.com",
    guardian:"María López (madre)", notes:"Dificultad en fonemas fricativos. Buena disposición.",
    goals:["Producción /s/ en posición inicial","Discriminación auditiva de pares mínimos"], status:"active" },
  { id:2, name:"Martín García", age:9, diagnosis:"Dislexia", sessions:8,
    nextSession:"Mié 04/06 09:00", avatar:"MG", color:C.sage,
    phone:"(+598) 9 7654 3210", email:"mgarcia@mail.com",
    guardian:"Pedro García (padre)", notes:"Confusión persistente b/d.",
    goals:["Decodificación b/d/p/q","Velocidad lectora 80 ppm"], status:"active" },
  { id:3, name:"Sofía Ramírez", age:6, diagnosis:"TDAH", sessions:15,
    nextSession:"Jue 05/06 11:00", avatar:"SR", color:C.purple,
    phone:"(+598) 9 6543 2109", email:"sramirez@mail.com",
    guardian:"Ana Ramírez (madre)", notes:"Alta dispersión.",
    goals:["Atención sostenida 15 min","Autorregulación emocional"], status:"active" },
];

const INIT_SESSIONS = [
  { id:1, patientId:1, patient:"Valentina López", date:"20/05/2025",
    objective:"Fonemas fricativos /s/",
    note:"Logró producir /s/ en posición inicial con apoyo visual.",
    progress:70, homework:"Practicar /s/ frente al espejo 5 min diarios",
    estado:"regulado", atencion:"sostenida", participacion:"buena",
    templateData:{} },
];

const INIT_PAYMENTS = [
  { id:1, patientId:1, patient:"Valentina López", amount:1500, currency:"UYU",
    institution:"Particular", date:"20/05/2025", method:"Transferencia", status:"pagado" },
  { id:2, patientId:2, patient:"Martín García", amount:1200, currency:"UYU",
    institution:"BPS", date:"18/05/2025", method:"Efectivo", status:"pagado" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const speak = (text, lang = "es-UY") => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang; u.rate = 0.72; u.pitch = 1.05;
  window.speechSynthesis.speak(u);
};

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const todayISO = () => new Date().toISOString().slice(0,10);
const addMins = (t, m) => {
  const [h, min] = t.split(":").map(Number);
  const tot = h*60+min+m;
  return `${String(Math.floor(tot/60)).padStart(2,"0")}:${String(tot%60).padStart(2,"0")}`;
};
const formatCurrency = (amount, code) => {
  const c = CURRENCIES.find(x => x.code === code) || CURRENCIES[0];
  return `${c.symbol}${Number(amount).toLocaleString("es-UY")}`;
};

// ─── STORAGE ──────────────────────────────────────────────────────────────────
const SK = "hadrion_v4";
const load = () => { try { const r = localStorage.getItem(SK); return r ? JSON.parse(r) : null; } catch { return null; } };
const save = d => { try { localStorage.setItem(SK, JSON.stringify(d)); } catch {} };

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html,body{height:100%;background:#FDF8FF;}
.app{font-family:'Plus Jakarta Sans',sans-serif;min-height:100vh;background:#FDF8FF;display:flex;flex-direction:column;}
@media(min-width:900px){
  .app{flex-direction:row;}
  .sidebar{display:flex!important;flex-direction:column;width:248px;min-height:100vh;background:white;border-right:1px solid #EDE0F5;padding:24px 0;position:sticky;top:0;height:100vh;overflow-y:auto;}
  .bnav{display:none!important;}
  .mwrap{flex:1;overflow-y:auto;height:100vh;}
  .tbar{padding:18px 32px 0;}
  .pbody{padding:14px 32px 32px;}
}
@media(max-width:899px){
  .sidebar{display:none;}
  .mwrap{flex:1;}
  .tbar{padding:12px 16px 0;}
  .pbody{padding:10px 16px 84px;}
}
.slogo{display:flex;align-items:center;gap:10px;padding:0 20px 26px;}
.slogoicon{width:40px;height:40px;background:#9B7EBD;border-radius:12px;display:flex;align-items:center;justify-content:center;color:white;font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;}
.slogoname{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:#2C2C2C;}
.slogosub{font-size:10px;color:#9B9590;margin-top:-2px;}
.ssec{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.3px;color:#9B9590;padding:12px 20px 4px;}
.sitem{display:flex;align-items:center;gap:11px;padding:10px 20px;cursor:pointer;font-size:13px;font-weight:500;color:#6B6560;transition:all .15s;border-left:3px solid transparent;margin:1px 0;}
.sitem:hover{background:#F5F0FA;color:#9B7EBD;}
.sitem.active{background:#F5F0FA;color:#9B7EBD;border-left-color:#9B7EBD;font-weight:600;}
.sicon{font-size:15px;width:20px;text-align:center;}
.sbadge{margin-left:auto;background:#9B7EBD;color:white;font-size:10px;font-weight:700;padding:1px 7px;border-radius:20px;}
.suser{padding:14px 20px;border-top:1px solid #EDE0F5;margin-top:auto;}
.bnav{position:fixed;bottom:0;left:0;right:0;background:white;border-top:1px solid #EDE0F5;display:flex;z-index:50;box-shadow:0 -2px 10px rgba(0,0,0,.07);}
.bn{flex:1;padding:10px 2px;border:none;background:none;cursor:pointer;font-size:9px;font-family:'Plus Jakarta Sans',sans-serif;color:#9B9590;display:flex;flex-direction:column;align-items:center;gap:3px;font-weight:500;min-height:56px;justify-content:center;}
.bn.active{color:#9B7EBD;}
.bnicon{font-size:19px;}
.card{background:white;border-radius:16px;padding:16px;box-shadow:0 1px 8px rgba(0,0,0,.06);border:1px solid rgba(0,0,0,.04);}
.sgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:16px;}
@media(min-width:600px){.sgrid{grid-template-columns:repeat(4,1fr);}}
.sc2{background:white;border-radius:14px;padding:14px;text-align:center;box-shadow:0 1px 6px rgba(0,0,0,.05);}
.snum{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;color:#9B7EBD;}
.slbl{font-size:11px;color:#9B9590;font-weight:500;}
.btn{border:none;border-radius:11px;padding:10px 17px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;display:inline-flex;align-items:center;gap:6px;}
.btnp{background:#9B7EBD;color:white;}
.btnp:hover{background:#7B5EA7;}
.btnp:disabled{background:#C9B8E8;cursor:not-allowed;}
.btno{background:transparent;border:1.5px solid #9B7EBD;color:#9B7EBD;}
.btno:hover{background:#F5F0FA;}
.btng{background:#EDE0F5;color:#2C2C2C;}
.btng:hover{background:#C9B8E8;}
.btnd{background:#FDECEA;color:#C0392B;}
.btngold{background:#FEF3E0;color:#E8A020;}
.btnsm{padding:9px 13px;font-size:11px;border-radius:8px;min-height:36px;}
.btnfull{width:100%;justify-content:center;margin-top:8px;}
.inp{width:100%;border:1.5px solid #EDE0F5;border-radius:10px;padding:10px 12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:#2C2C2C;background:white;outline:none;transition:border .15s;}
.inp:focus{border-color:#9B7EBD;}
textarea.inp{resize:vertical;min-height:74px;}
.lbl{font-size:11px;font-weight:700;color:#9B9590;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:4px;}
.fg{margin-bottom:12px;}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100;display:flex;align-items:flex-end;justify-content:center;}
@media(min-width:600px){.overlay{align-items:center;}}
.modal{background:white;border-radius:24px 24px 0 0;padding:22px 18px 34px;width:100%;max-height:92vh;overflow-y:auto;}
@media(min-width:600px){.modal{border-radius:20px;max-width:560px;}}
.modalt{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#2C2C2C;margin-bottom:16px;}
.xbtn{float:right;background:none;border:none;font-size:22px;cursor:pointer;color:#9B9590;padding:0 0 6px 8px;}
.pt{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:#2C2C2C;}
.ps{font-size:13px;color:#9B9590;margin-top:2px;}
.badge{display:inline-block;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600;}
.prog{background:#EDE0F5;border-radius:8px;height:7px;overflow:hidden;}
.progf{height:100%;border-radius:8px;background:linear-gradient(90deg,#9B7EBD,#7B5EA7);transition:width .4s;}
.sep{height:1px;background:#EDE0F5;margin:12px 0;}
.sc{background:white;border-radius:18px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.07);margin-bottom:14px;}
.sch{padding:14px 16px;border-bottom:1px solid #EDE0F5;display:flex;align-items:center;justify-content:space-between;}
.scb{padding:14px 16px;}
.hxf{background:#FDF8FF;border-radius:10px;padding:10px 12px;margin-bottom:7px;}
.hxl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#9B9590;margin-bottom:3px;}
.hxv{font-size:13px;color:#2C2C2C;line-height:1.5;}
.alert{border-radius:11px;padding:11px 13px;font-size:13px;margin-bottom:12px;}
.alrti{background:#EBF3FB;color:#5B8DB8;}
.alrts{background:#E8F8EF;color:#C0396B;}
.alrtw{background:#FEF3E0;color:#E8A020;}
.alrtd{background:#FDECEA;color:#C0392B;}
.welcome{background:linear-gradient(135deg,#9B7EBD,#7B5EA7);border-radius:18px;padding:20px;color:white;margin-bottom:16px;position:relative;overflow:hidden;}
.wname{font-family:'Cormorant Garamond',serif;font-size:25px;font-weight:700;}
.qg{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
@media(min-width:600px){.qg{grid-template-columns:repeat(4,1fr);}}
.qcard{background:white;border-radius:14px;padding:14px;text-align:center;cursor:pointer;transition:transform .15s;box-shadow:0 1px 6px rgba(0,0,0,.05);}
.qcard:hover{transform:translateY(-2px);}
.av{border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:700;color:white;flex-shrink:0;}
.chip{padding:7px 11px;border-radius:20px;border:1.5px solid #EDE0F5;background:white;font-size:12px;font-weight:500;cursor:pointer;color:#6B6560;font-family:'Plus Jakarta Sans',sans-serif;transition:all .13s;min-height:36px;}
.chip.sel{background:#F5F0FA;border-color:#9B7EBD;color:#9B7EBD;font-weight:600;}
.chiprow{display:flex;flex-wrap:wrap;gap:6px;margin:5px 0;}
.filrow{display:flex;gap:7px;overflow-x:auto;padding-bottom:4px;margin-bottom:12px;}
.filrow::-webkit-scrollbar{display:none;}
.filbtn{padding:7px 13px;border-radius:20px;border:1.5px solid #EDE0F5;background:white;font-size:12px;font-weight:500;cursor:pointer;white-space:nowrap;color:#6B6560;font-family:'Plus Jakarta Sans',sans-serif;flex-shrink:0;min-height:36px;}
.filbtn.active{background:#9B7EBD;color:white;border-color:#9B7EBD;}
.phgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:12px 0;}
@media(min-width:500px){.phgrid{grid-template-columns:repeat(6,1fr);}}
.phbtn{aspect-ratio:1;border-radius:12px;border:2px solid #EDE0F5;background:white;font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;cursor:pointer;transition:all .17s;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#2C2C2C;gap:2px;min-height:80px;padding:4px;}
.phbtn:hover{border-color:#9B7EBD;background:#F5F0FA;}
.phbtn.sel{border-color:#9B7EBD;background:#9B7EBD;color:white;}
.roletag{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;}
.radmin{background:#FEF3E0;color:#E8A020;}
.rpro{background:#EBF3FB;color:#5B8DB8;}
.dayl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#9B9590;margin:14px 0 6px;}
.atab{flex:1;padding:9px 6px;border:none;background:transparent;border-radius:9px;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;color:#6B6560;transition:all .15s;min-height:38px;}
.atab.active{background:white;color:#9B7EBD;box-shadow:0 1px 4px rgba(0,0,0,.1);}
.atabrow{display:flex;gap:4px;background:#EDE0F5;border-radius:12px;padding:4px;margin-bottom:16px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(13px);}to{opacity:1;transform:translateY(0);}}
.fu{animation:fadeUp .28s ease forwards;}
@keyframes spin{to{transform:rotate(360deg)}}
.spinner{width:24px;height:24px;border:3px solid #EDE0F5;border-top-color:#9B7EBD;border-radius:50%;animation:spin .8s linear infinite;margin:0 auto;}
@media print{.noprint{display:none!important;}body{background:white;}}
`;

// ─── COMPONENTES BASE ─────────────────────────────────────────────────────────
function Modal({ title, onClose, children, wide }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={wide ? { maxWidth:700 } : {}} onClick={e => e.stopPropagation()}>
        <button className="xbtn" onClick={onClose}>✕</button>
        {title && <div className="modalt">{title}</div>}
        {children}
      </div>
    </div>
  );
}

function SC({ title, action, children }) {
  return (
    <div className="sc">
      <div className="sch">
        <span style={{ fontWeight:700, fontSize:14, color:C.charcoal }}>{title}</span>
        {action}
      </div>
      <div className="scb">{children}</div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
const NAV = [
  { id:"dashboard", l:"dashboard", i:"🏠", s:"principal" },
  { id:"agenda",    l:"agenda",    i:"📅" },
  { id:"patients",  l:"patients",  i:"👥" },
  { id:"payments",  l:"payments",  i:"💳" },
  { id:"sessions",  l:"sessions",  i:"📝" },
  { id:"history",   l:"history",   i:"📋", s:"clinico" },
  { id:"objectives",l:"objectives",i:"🎯" },
  { id:"phonology", l:"phonology", i:"🔤" },
  { id:"reports",   l:"reports",   i:"📊" },
  { id:"ia",        l:"ia",        i:"🧠", s:"herramientas" },
  { id:"resources", l:"resources", i:"📚" },
  { id:"admin",     l:"admin",     i:"🔐", s:"admin", adminOnly:true },
  { id:"profile",   l:"profile",   i:"👤" },
];

function Sidebar({ active, setActive, user, lang }) {
  return (
    <div className="sidebar">
      <div className="slogo">
        <div className="slogoicon">H</div>
        <div><div className="slogoname">Hadrion</div><div className="slogosub">Plataforma Clínica</div></div>
      </div>
      {NAV.filter(n => !n.adminOnly || user?.role === "admin").map(n => (
        <div key={n.id}>
          {n.s && <div className="ssec">{lang === "en" ? n.s.toUpperCase() : n.s.toUpperCase()}</div>}
          <div className={`sitem${active === n.id ? " active" : ""}`} onClick={() => setActive(n.id)}>
            <span className="sicon">{n.i}</span>{T[lang][n.l] || n.l}
            {n.id === "admin" && <span className="sbadge">Admin</span>}
          </div>
        </div>
      ))}
      <div className="suser">
        <div style={{ fontSize:13, fontWeight:600, color:C.charcoal }}>{user?.name}</div>
        <div style={{ fontSize:11, color:C.grayL }}>{user?.specialty}</div>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ onLogin, users, lang }) {
  const [f, setF] = useState({ email:"", pass:"", show:false });
  const [err, setErr] = useState("");
  const login = () => {
    if (!f.email || !f.pass) { setErr("Completá todos los campos."); return; }
    const u = users.find(u => u.email === f.email && u.password === f.pass);
    if (!u) { setErr("Email o contraseña incorrectos."); return; }
    if (u.status === "inactive") { setErr("Cuenta inactiva."); return; }
    onLogin(u);
  };
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#F5F0FA,#FDF8FF,#EBF3FB)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"white", borderRadius:24, padding:"36px 26px", width:"100%", maxWidth:400, boxShadow:"0 8px 40px rgba(0,0,0,.12)" }}>
        <div style={{ textAlign:"center", marginBottom:26 }}>
          <div style={{ width:62, height:62, background:C.terra, borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 13px", fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:"white" }}>H</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700, color:C.charcoal }}>Hadrion</div>
          <div style={{ fontSize:13, color:C.grayL }}>Plataforma terapéutica — Uruguay</div>
        </div>
        <div className="fg"><label className="lbl">Email</label>
          <input className="inp" type="email" placeholder="tu@email.com" value={f.email} onChange={e => setF({...f, email:e.target.value})} />
        </div>
        <div className="fg"><label className="lbl">Contraseña</label>
          <div style={{ position:"relative" }}>
            <input className="inp" type={f.show?"text":"password"} placeholder="••••••••" value={f.pass}
              onChange={e => setF({...f, pass:e.target.value})} onKeyDown={e => e.key==="Enter" && login()}
              style={{ paddingRight:44 }} />
            <button onClick={() => setF({...f, show:!f.show})}
              style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:16, color:C.grayL }}>
              {f.show ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        {err && <div className="alert alrtd">{err}</div>}
        <button className="btn btnp btnfull" style={{ borderRadius:12 }} onClick={login}>→ Ingresar</button>
        <div style={{ marginTop:12, background:C.terraF, borderRadius:12, padding:12, fontSize:12, color:C.terraD }}>
          <strong>Demo:</strong> comunipro12@gmail.com / admin123
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ user, patients, sessions, payments, setActive, agendaItems, lang, currency }) {
  const total = payments.filter(p => p.status==="pagado").reduce((a,p) => a + p.amount, 0);
  const todayKey = todayISO();
  const todayCount = agendaItems.filter(a => a.date === todayKey).length;
  const t = T[lang];
  return (
    <div className="fu">
      <div className="welcome">
        <div style={{ fontSize:12, opacity:.7, marginBottom:3 }}>{cap(new Date().toLocaleDateString(lang==="en"?"en-US":"es-UY",{weekday:"long",day:"numeric",month:"long"}))}</div>
        <div className="wname">{lang==="en"?"Hello":"Hola"}, {user.name.split(" ")[0]} 👋</div>
        <div style={{ fontSize:13, opacity:.82, marginTop:3 }}>{t.welcome}</div>
      </div>
      <div className="sgrid">
        <div className="sc2"><div className="snum">{patients.length}</div><div className="slbl">{t.patients}</div></div>
        <div className="sc2"><div className="snum">{sessions.length}</div><div className="slbl">{lang==="en"?"Records":"Registros"}</div></div>
        <div className="sc2"><div className="snum">{formatCurrency(total, currency)}</div><div className="slbl">{lang==="en"?"Collected":"Cobrado"}</div></div>
        <div className="sc2"><div className="snum">{todayCount}</div><div className="slbl">{lang==="en"?"Today":"Hoy"}</div></div>
      </div>
      <div style={{ fontWeight:700, fontSize:14, color:C.charcoal, marginBottom:10 }}>{lang==="en"?"Quick access":"Acceso rápido"}</div>
      <div className="qg">
        {[{i:"👥",l:t.patients,t:"patients"},{i:"📅",l:t.agenda,t:"agenda"},{i:"📝",l:t.sessions,t:"sessions"},{i:"💳",l:t.payments,t:"payments"},{i:"🔤",l:t.phonology,t:"phonology"},{i:"🧠",l:t.ia,t:"ia"},{i:"📊",l:t.reports,t:"reports"},{i:"📚",l:t.resources,t:"resources"}].map(q => (
          <div key={q.t} className="qcard" onClick={() => setActive(q.t)}>
            <div style={{ fontSize:26, marginBottom:6 }}>{q.i}</div>
            <div style={{ fontSize:12, fontWeight:600, color:C.charcoal }}>{q.l}</div>
          </div>
        ))}
      </div>
      <SC title={`📅 ${lang==="en"?"Today's appointments":"Citas de hoy"}`}>
        {agendaItems.filter(a => a.date === todayKey).length === 0
          ? <div style={{ color:C.grayL, fontSize:12 }}>{lang==="en"?"No appointments today":"Sin citas para hoy"}</div>
          : agendaItems.filter(a => a.date === todayKey).map((a,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:`1px solid ${C.sand}` }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:a.color, flexShrink:0 }} />
              <div style={{ fontWeight:700, fontSize:13, minWidth:46 }}>{a.time}</div>
              <div style={{ flex:1, fontSize:13 }}>{a.patient}</div>
              <span className="badge" style={{ background:a.color+"22", color:a.color, fontSize:10 }}>{a.type}</span>
            </div>
          ))
        }
      </SC>
    </div>
  );
}

// ─── AGENDA ───────────────────────────────────────────────────────────────────
function Agenda({ patients, items, setItems, lang, defaultDuration }) {
  const [showNew, setShowNew] = useState(false);
  const [f, setF] = useState({ patient:"", time:"09:00", type:"Sesión", date:todayISO(), duration:defaultDuration||45 });
  const t = T[lang];
  const todayKey = todayISO();
  const tomorrowKey = new Date(Date.now()+86400000).toISOString().slice(0,10);

  const save = () => {
    if (!f.patient || !f.time) return;
    const p = patients.find(x => x.name === f.patient);
    const dur = parseInt(f.duration) || 45;
    setItems(prev => [...prev, { id:Date.now(), patient:f.patient, time:f.time, end:addMins(f.time, dur), type:f.type, color:p?.color||C.terra, date:f.date, duration:dur }]);
    setF({ patient:"", time:"09:00", type:"Sesión", date:todayISO(), duration:defaultDuration||45 });
    setShowNew(false);
  };

  const addToGcal = item => {
    const fmt = s => s.replace(/[-:]/g,"");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE`
      + `&text=${encodeURIComponent(`Hadrion — ${item.type}: ${item.patient}`)}`
      + `&dates=${fmt(item.date)}T${fmt(item.time)}00/${fmt(item.date)}T${fmt(item.end||addMins(item.time,45))}00`
      + `&details=${encodeURIComponent(`Sesión con ${item.patient}`)}`;
    window.open(url, "_blank");
  };

  const grouped = [{ label:lang==="en"?"Today":"Hoy", key:todayKey }, { label:lang==="en"?"Tomorrow":"Mañana", key:tomorrowKey }];
  const future = items.filter(a => a.date > tomorrowKey).sort((a,b) => a.date.localeCompare(b.date));

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">{t.agenda}</div></div>
        <button className="btn btnp btnsm" onClick={() => setShowNew(true)}>+</button>
      </div>
      {grouped.map(({label,key}) => (
        <div key={key}>
          <div className="dayl">{label}</div>
          {items.filter(a => a.date===key).length === 0
            ? <div style={{ color:C.grayL, fontSize:12, paddingBottom:8 }}>{lang==="en"?"No appointments":"Sin turnos"}</div>
            : items.filter(a => a.date===key).sort((a,b) => a.time.localeCompare(b.time)).map(a => (
              <div key={a.id} className="card" style={{ marginBottom:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:9, height:9, borderRadius:"50%", background:a.color, flexShrink:0 }} />
                  <div style={{ fontWeight:700, fontSize:14, minWidth:48 }}>{a.time}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:13 }}>{a.patient}</div>
                    <div style={{ fontSize:11, color:C.grayL }}>{a.type} — {a.duration||45}min — hasta {a.end}</div>
                  </div>
                  <button className="btn btnsm" style={{ background:"#4285F4", color:"white", fontSize:11 }} onClick={() => addToGcal(a)}>📅</button>
                </div>
              </div>
            ))
          }
        </div>
      ))}
      {future.length > 0 && (
        <div>
          <div className="dayl">{lang==="en"?"Upcoming":"Próximos"}</div>
          {future.map(a => (
            <div key={a.id} className="card" style={{ marginBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:9, height:9, borderRadius:"50%", background:a.color, flexShrink:0 }} />
                <div style={{ fontWeight:700, fontSize:13, minWidth:80 }}>{a.date} {a.time}</div>
                <div style={{ flex:1, fontSize:13 }}>{a.patient} — {a.type} ({a.duration||45}min)</div>
                <button className="btn btnsm" style={{ background:"#4285F4", color:"white", fontSize:11 }} onClick={() => addToGcal(a)}>📅</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showNew && (
        <Modal title={lang==="en"?"New appointment":"Nuevo turno"} onClose={() => setShowNew(false)}>
          <div className="fg"><label className="lbl">{t.patients}</label>
            <select className="inp" value={f.patient} onChange={e => setF({...f, patient:e.target.value})}>
              <option value="">--</option>
              {patients.map(p => <option key={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">{lang==="en"?"Date":"Fecha"}</label>
            <input type="date" className="inp" value={f.date} onChange={e => setF({...f, date:e.target.value})} />
          </div>
          <div className="fg"><label className="lbl">{lang==="en"?"Time":"Hora"}</label>
            <input type="time" className="inp" value={f.time} onChange={e => setF({...f, time:e.target.value})} />
          </div>
          <div className="fg">
            <label className="lbl">{t.sessionDuration}</label>
            <input type="number" className="inp" value={f.duration} min="5" max="180"
              onChange={e => setF({...f, duration:e.target.value})}
              placeholder={lang==="en"?"e.g. 45":"ej: 45"} />
          </div>
          <div className="fg"><label className="lbl">{lang==="en"?"Type":"Tipo"}</label>
            <select className="inp" value={f.type} onChange={e => setF({...f, type:e.target.value})}>
              {["Sesión","Evaluación","Seguimiento","Primera consulta"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <button className="btn btnp btnfull" onClick={save}>{t.save}</button>
        </Modal>
      )}
    </div>
  );
}

// ─── PATIENTS ─────────────────────────────────────────────────────────────────
function Patients({ patients, setPatients, setActive, setSelPatId, sessions, lang }) {
  const [sel, setSel] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editF, setEditF] = useState({});
  const emptyF = { name:"", age:"", diagnosis:"", phone:"", email:"", guardian:"", notes:"" };
  const [f, setF] = useState(emptyF);
  const t = T[lang];

  const dC = { TEL:C.terra, Dislexia:C.sage, TDAH:C.purple, Disartria:C.info, TEA:C.gold };
  const cols = [C.terra, C.sage, C.purple, C.info, C.gold];

  const filtered = patients.filter(p =>
    p.status !== "archived" &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.diagnosis.toLowerCase().includes(search.toLowerCase()))
  );

  const add = () => {
    if (!f.name || !f.diagnosis) return;
    const init = f.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
    setPatients(prev => [...prev, { id:Date.now(), name:f.name, age:parseInt(f.age)||0, diagnosis:f.diagnosis,
      sessions:0, nextSession:"Sin agendar", avatar:init, color:cols[prev.length%cols.length],
      phone:f.phone, email:f.email, guardian:f.guardian, notes:f.notes, goals:[], status:"active" }]);
    setF(emptyF); setShowNew(false);
  };

  const saveEdit = () => {
    setPatients(prev => prev.map(p => p.id===sel.id ? {...p,...editF} : p));
    setSel(prev => ({...prev,...editF})); setEditMode(false);
  };

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">{t.patients}</div><div className="ps">{filtered.length} activos</div></div>
        <button className="btn btnp btnsm" onClick={() => setShowNew(true)}>{t.newPatient}</button>
      </div>
      <input className="inp" placeholder="🔍 Buscar..." value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom:12 }} />
      {filtered.map(p => (
        <div key={p.id} className="card" style={{ marginBottom:10, cursor:"pointer" }} onClick={() => { setSel(p); setEditMode(false); }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div className="av" style={{ width:48, height:48, background:p.color, fontSize:15 }}>{p.avatar}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:14 }}>{p.name}</div>
              <div style={{ fontSize:12, color:C.grayL }}>{p.age} años — <span className="badge" style={{ background:(dC[p.diagnosis]||C.gray)+"22", color:dC[p.diagnosis]||C.gray, fontSize:10 }}>{p.diagnosis}</span></div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:C.terra }}>{sessions.filter(s => s.patientId===p.id).length}</div>
              <div style={{ fontSize:10, color:C.grayL }}>ses.</div>
            </div>
          </div>
        </div>
      ))}

      {sel && !editMode && (
        <Modal title="" onClose={() => setSel(null)}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
            <div className="av" style={{ width:54, height:54, background:sel.color, fontSize:18 }}>{sel.avatar}</div>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700 }}>{sel.name}</div>
              <div style={{ fontSize:12, color:C.grayL }}>{sel.age} años — {sel.diagnosis}</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:12 }}>
            <button className="btn btng btnsm" onClick={() => { setEditF({name:sel.name,age:sel.age,diagnosis:sel.diagnosis,phone:sel.phone,email:sel.email,guardian:sel.guardian,notes:sel.notes}); setEditMode(true); }}>✏️ Editar</button>
            <button className="btn btno btnsm" onClick={() => { setSelPatId(sel.id); setActive("history"); setSel(null); }}>📋 Historia</button>
            <button className="btn btng btnsm" onClick={() => { setPatients(prev => prev.map(p => p.id===sel.id?{...p,status:"archived"}:p)); setSel(null); }}>📦 Archivar</button>
          </div>
          {[["📞",sel.phone||"—"],["✉️",sel.email||"—"],["👨‍👩‍👧",sel.guardian||"—"]].map(([ic,v]) => (
            <div key={ic} className="hxf"><div className="hxv">{ic} {v}</div></div>
          ))}
          {sel.notes && <div className="hxf"><div className="hxl">Notas</div><div className="hxv">{sel.notes}</div></div>}
          {sel.goals?.length > 0 && <div className="hxf"><div className="hxl">Objetivos</div>{sel.goals.map((g,i) => <div key={i} className="hxv">• {g}</div>)}</div>}
        </Modal>
      )}
      {sel && editMode && (
        <Modal title="Editar paciente" onClose={() => setEditMode(false)}>
          {[["Nombre","name","text"],["Edad","age","number"],["Teléfono","phone","tel"],["Email","email","email"],["Tutor","guardian","text"]].map(([l,k,tp]) => (
            <div className="fg" key={k}><label className="lbl">{l}</label>
              <input className="inp" type={tp} value={editF[k]||""} onChange={e => setEditF({...editF,[k]:e.target.value})} />
            </div>
          ))}
          <div className="fg"><label className="lbl">Diagnóstico</label>
            <select className="inp" value={editF.diagnosis||""} onChange={e => setEditF({...editF,diagnosis:e.target.value})}>
              {["TEL","Dislexia","TDAH","Disartria","TEA","Discalculia","Tartamudez","Otro"].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Notas</label>
            <textarea className="inp" value={editF.notes||""} onChange={e => setEditF({...editF,notes:e.target.value})} />
          </div>
          <button className="btn btnp btnfull" onClick={saveEdit}>{t.save}</button>
          <button className="btn btng btnfull" onClick={() => setEditMode(false)}>{t.cancel}</button>
        </Modal>
      )}
      {showNew && (
        <Modal title="Nuevo paciente" onClose={() => setShowNew(false)}>
          {[["Nombre completo","name","text"],["Edad","age","number"],["Teléfono","phone","tel"],["Email","email","email"],["Tutor/Responsable","guardian","text"]].map(([l,k,tp]) => (
            <div className="fg" key={k}><label className="lbl">{l}</label>
              <input className="inp" type={tp} value={f[k]} onChange={e => setF({...f,[k]:e.target.value})} />
            </div>
          ))}
          <div className="fg"><label className="lbl">Diagnóstico</label>
            <select className="inp" value={f.diagnosis} onChange={e => setF({...f,diagnosis:e.target.value})}>
              <option value="">Seleccionar...</option>
              {["TEL","Dislexia","TDAH","Disartria","TEA","Discalculia","Tartamudez","Otro"].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Notas iniciales</label>
            <textarea className="inp" value={f.notes} onChange={e => setF({...f,notes:e.target.value})} />
          </div>
          <button className="btn btnp btnfull" onClick={add}>{t.save}</button>
        </Modal>
      )}
    </div>
  );
}

// ─── PAYMENTS ─────────────────────────────────────────────────────────────────
function Payments({ patients, payments, setPayments, lang, currency, setCurrency }) {
  const [showNew, setShowNew] = useState(false);
  const [customInst, setCustomInst] = useState("");
  const [f, setF] = useState({ patientId:"", amount:"", institution:"Particular", method:"Transferencia", date:todayISO(), currency:currency });
  const t = T[lang];

  const total = payments.filter(p => p.status==="pagado").reduce((a,p) => a+p.amount, 0);

  const save = () => {
    if (!f.patientId || !f.amount) return;
    const p = patients.find(x => x.id===parseInt(f.patientId));
    const inst = f.institution === "Otra institución" ? customInst : f.institution;
    setPayments(prev => [...prev, { id:Date.now(), patientId:parseInt(f.patientId), patient:p?.name||"",
      amount:parseFloat(f.amount), currency:f.currency, institution:inst,
      date:f.date, method:f.method, status:"pagado" }]);
    setF({ patientId:"", amount:"", institution:"Particular", method:"Transferencia", date:todayISO(), currency });
    setShowNew(false);
  };

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">{t.payments}</div></div>
        <div style={{ display:"flex", gap:8 }}>
          <select className="inp btnsm" style={{ width:"auto" }} value={currency} onChange={e => setCurrency(e.target.value)}>
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} {c.symbol}</option>)}
          </select>
          <button className="btn btnp btnsm" onClick={() => setShowNew(true)}>+</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom:14, display:"flex", alignItems:"center", gap:14 }}>
        <div style={{ width:46, height:46, borderRadius:13, background:C.terraF, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>📈</div>
        <div>
          <div style={{ fontSize:12, color:C.grayL }}>Total cobrado</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700 }}>{formatCurrency(total, currency)}</div>
          <div style={{ fontSize:11, color:C.grayL }}>{payments.filter(p => p.status==="pagado").length} pagos</div>
        </div>
      </div>

      {payments.map(p => (
        <div key={p.id} className="card" style={{ marginBottom:8 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontWeight:600, fontSize:13 }}>{p.patient}</div>
              <div style={{ fontSize:11, color:C.grayL }}>{p.date} — {p.institution} — {p.method}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontWeight:700, fontSize:16 }}>{formatCurrency(p.amount, p.currency||currency)}</div>
              <span className="badge" style={{ background:p.status==="pagado"?C.greenF:C.goldF, color:p.status==="pagado"?C.forest:C.gold, fontSize:10 }}>{t[p.status]||p.status}</span>
            </div>
          </div>
        </div>
      ))}

      {showNew && (
        <Modal title="Registrar pago" onClose={() => setShowNew(false)}>
          <div className="fg"><label className="lbl">Paciente</label>
            <select className="inp" value={f.patientId} onChange={e => setF({...f,patientId:e.target.value})}>
              <option value="">--</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <div className="fg" style={{ flex:2 }}><label className="lbl">Monto</label>
              <input className="inp" type="number" value={f.amount} onChange={e => setF({...f,amount:e.target.value})} />
            </div>
            <div className="fg" style={{ flex:1 }}><label className="lbl">Moneda</label>
              <select className="inp" value={f.currency} onChange={e => setF({...f,currency:e.target.value})}>
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
              </select>
            </div>
          </div>
          <div className="fg"><label className="lbl">Institución</label>
            <select className="inp" value={f.institution} onChange={e => setF({...f,institution:e.target.value})}>
              {PAYMENT_INSTITUTIONS.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
          {f.institution === "Otra institución" && (
            <div className="fg"><label className="lbl">Nombre de la institución</label>
              <input className="inp" value={customInst} onChange={e => setCustomInst(e.target.value)} />
            </div>
          )}
          <div className="fg"><label className="lbl">Método</label>
            <select className="inp" value={f.method} onChange={e => setF({...f,method:e.target.value})}>
              {["Transferencia","Efectivo","Tarjeta","MercadoPago","RedPagos","Abitab","PayPal","Otro"].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Fecha</label>
            <input type="date" className="inp" value={f.date} onChange={e => setF({...f,date:e.target.value})} />
          </div>
          <button className="btn btnp btnfull" onClick={save}>{t.save}</button>
        </Modal>
      )}
    </div>
  );
}

// ─── SESSIONS con plantillas editables ───────────────────────────────────────
function Sessions({ patients, sessions, setSessions, setPatients, lang, defaultDuration }) {
  const [showNew, setShowNew] = useState(false);
  const [selTemplate, setSelTemplate] = useState("general");
  const [templateData, setTemplateData] = useState({});
  const [f, setF] = useState({ patientId:"", progress:50, estado:"", atencion:"" });
  const t = T[lang];

  const ECHIPS = ["regulado","cansado","irritable","hiperactivo","malestar físico","buena disposición"];
  const ACHIPS = ["sostenida","fluctuante","dispersa","requiere apoyos"];

  const save = () => {
    if (!f.patientId) return;
    const p = patients.find(x => x.id===parseInt(f.patientId));
    const note = Object.entries(templateData).map(([k,v]) => `${k}: ${v}`).join("\n") || "Sin notas";
    setSessions(prev => [{ id:Date.now(), patientId:parseInt(f.patientId), patient:p?.name||"",
      date:new Date().toLocaleDateString("es-UY"), note, progress:f.progress,
      estado:f.estado, atencion:f.atencion, templateType:selTemplate, templateData }, ...prev]);
    setPatients(prev => prev.map(pat => pat.id===parseInt(f.patientId) ? {...pat, sessions:pat.sessions+1} : pat));
    setF({ patientId:"", progress:50, estado:"", atencion:"" }); setTemplateData({});
    setShowNew(false);
  };

  const tog = (k, v) => setF(prev => ({...prev, [k]: prev[k]===v ? "" : v}));
  const tmpl = SESSION_TEMPLATES[selTemplate];

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">{t.sessions}</div></div>
        <button className="btn btnp btnsm" onClick={() => setShowNew(true)}>+</button>
      </div>
      {sessions.length === 0 && <div style={{ textAlign:"center", padding:"32px 0", color:C.grayL }}>📝 Sin registros</div>}
      {sessions.map(s => (
        <div key={s.id} className="sc">
          <div className="sch">
            <div><div style={{ fontWeight:700, fontSize:14 }}>{s.patient}</div><div style={{ fontSize:11, color:C.grayL }}>{s.date}</div></div>
            <span className="badge" style={{ background:C.terraF, color:C.terra, fontSize:10 }}>{s.templateType||"general"}</span>
          </div>
          <div className="scb">
            {s.estado && <div className="hxf"><div className="hxl">Estado</div><div className="hxv">{s.estado}</div></div>}
            <div className="hxf"><div className="hxl">📝 Notas</div><div className="hxv" style={{ whiteSpace:"pre-wrap" }}>{s.note}</div></div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:8 }}>
              <div className="prog" style={{ flex:1 }}><div className="progf" style={{ width:`${s.progress}%` }} /></div>
              <span style={{ fontSize:12, fontWeight:700, color:C.terra }}>{s.progress}%</span>
            </div>
          </div>
        </div>
      ))}

      {showNew && (
        <Modal title="Nueva sesión" onClose={() => setShowNew(false)} wide>
          <div className="fg"><label className="lbl">Paciente</label>
            <select className="inp" value={f.patientId} onChange={e => setF({...f,patientId:e.target.value})}>
              <option value="">--</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Plantilla / Especialidad</label>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {Object.entries(SESSION_TEMPLATES).map(([k,v]) => (
                <button key={k} className={`filbtn${selTemplate===k?" active":""}`} onClick={() => { setSelTemplate(k); setTemplateData({}); }}>{v.name}</button>
              ))}
            </div>
          </div>
          <div style={{ background:C.terraF, borderRadius:12, padding:14, marginBottom:12 }}>
            <div style={{ fontWeight:700, fontSize:13, color:C.terraD, marginBottom:10 }}>📋 {tmpl.name}</div>
            {tmpl.fields.map(field => (
              <div className="fg" key={field.key}>
                <label className="lbl">{field.label}</label>
                {field.type === "textarea"
                  ? <textarea className="inp" value={templateData[field.label]||""} onChange={e => setTemplateData(prev => ({...prev,[field.label]:e.target.value}))} />
                  : <input className="inp" type={field.type||"text"} value={templateData[field.label]||""} onChange={e => setTemplateData(prev => ({...prev,[field.label]:e.target.value}))} />
                }
              </div>
            ))}
          </div>
          <div style={{ marginBottom:12 }}>
            <div className="lbl" style={{ marginBottom:6 }}>ESTADO GENERAL</div>
            <div className="chiprow">{ECHIPS.map(c => <button key={c} className={`chip${f.estado===c?" sel":""}`} onClick={() => tog("estado",c)}>{c}</button>)}</div>
            <div className="lbl" style={{ marginTop:10, marginBottom:6 }}>ATENCIÓN</div>
            <div className="chiprow">{ACHIPS.map(c => <button key={c} className={`chip${f.atencion===c?" sel":""}`} onClick={() => tog("atencion",c)}>{c}</button>)}</div>
          </div>
          <div className="fg">
            <label className="lbl">Progreso: {f.progress}%</label>
            <input type="range" style={{ width:"100%", accentColor:C.terra }} min={0} max={100} step={5} value={f.progress} onChange={e => setF({...f,progress:parseInt(e.target.value)})} />
            <div className="prog" style={{ marginTop:4 }}><div className="progf" style={{ width:`${f.progress}%` }} /></div>
          </div>
          <button className="btn btnp btnfull" onClick={save}>{t.save}</button>
        </Modal>
      )}
    </div>
  );
}

// ─── HISTORY ──────────────────────────────────────────────────────────────────
function History({ patients, sessions, selectedPatientId, lang }) {
  const [pid, setPid] = useState(selectedPatientId||"");
  const [ans, setAns] = useState({});
  const [tab, setTab] = useState("anamnesis");
  const patient = patients.find(p => p.id===parseInt(pid));
  const pSess = sessions.filter(s => s.patientId===parseInt(pid));

  const ANAMNESIS = [
    { t:"Antecedentes", i:"📊", q:["Antecedentes del embarazo y parto","Hitos del desarrollo motor y habla","Antecedentes médicos o neurológicos","Historia familiar"] },
    { t:"Lenguaje y comunicación", i:"💬", q:["¿Comprende consignas?","¿Dificultades en expresión verbal?","¿Inteligibilidad del habla?"] },
    { t:"Área educativa", i:"📚", q:["¿Asiste a establecimiento educacional?","¿Dificultades de aprendizaje?","¿Apoyos adicionales?"] },
    { t:"Área socioemocional", i:"❤️", q:["¿Cómo regula emociones?","¿Interacciones sociales?","¿Conductas disruptivas?"] },
  ];

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">{T[lang].history}</div></div>
      <div className="fg">
        <select className="inp" value={pid} onChange={e => setPid(e.target.value)}>
          <option value="">Seleccionar paciente...</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      {patient && (
        <>
          <div className="atabrow">
            {["anamnesis","objetivos","evolución","informe"].map(t => (
              <button key={t} className={`atab${tab===t?" active":""}`} onClick={() => setTab(t)}>{cap(t)}</button>
            ))}
          </div>
          {tab === "anamnesis" && ANAMNESIS.map((sec,si) => (
            <SC key={si} title={`${sec.i} ${sec.t}`}>
              {sec.q.map((q,qi) => (
                <div key={qi} style={{ marginBottom:10 }}>
                  <div style={{ fontSize:12, color:C.grayL, marginBottom:4 }}>{q}</div>
                  <textarea className="inp" style={{ minHeight:52, fontSize:12 }}
                    value={ans[`${si}-${qi}`]||""} onChange={e => setAns({...ans,[`${si}-${qi}`]:e.target.value})} />
                </div>
              ))}
            </SC>
          ))}
          {tab === "objetivos" && (
            <SC title="🎯 Objetivos terapéuticos">
              {patient.goals?.length > 0 ? patient.goals.map((g,i) => (
                <div key={i} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.sand}` }}>
                  <div style={{ width:22, height:22, borderRadius:6, background:C.terraF, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:C.terra, flexShrink:0 }}>{i+1}</div>
                  <div style={{ fontSize:13 }}>{g}</div>
                </div>
              )) : <div style={{ color:C.grayL, fontSize:13 }}>Sin objetivos cargados.</div>}
            </SC>
          )}
          {tab === "evolución" && (
            <SC title={`📝 Evolución (${pSess.length} sesiones)`}>
              {pSess.map((s,i) => (
                <div key={s.id} style={{ padding:"11px 0", borderBottom:`1px solid ${C.sand}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontWeight:700, fontSize:12, color:C.terra }}>Sesión {pSess.length-i}</span>
                    <span style={{ fontSize:11, color:C.grayL }}>{s.date}</span>
                  </div>
                  <div style={{ fontSize:13, lineHeight:1.5, whiteSpace:"pre-wrap" }}>{s.note}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:6 }}>
                    <div className="prog" style={{ flex:1 }}><div className="progf" style={{ width:`${s.progress}%` }} /></div>
                    <span style={{ fontSize:11, fontWeight:700, color:C.terra }}>{s.progress}%</span>
                  </div>
                </div>
              ))}
            </SC>
          )}
          {tab === "informe" && (
            <div>
              <div className="sc">
                <div className="sch" style={{ background:C.terraF }}>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, fontWeight:700 }}>Hadrion — Informe Evolutivo</div>
                    <div style={{ fontSize:12, color:C.grayL }}>{new Date().toLocaleDateString("es-UY")}</div>
                  </div>
                </div>
                <div className="scb">
                  {[["Paciente",patient.name],["Edad",`${patient.age} años`],["Diagnóstico",patient.diagnosis],["Sesiones",pSess.length]].map(([l,v]) => (
                    <div key={l} className="hxf"><div className="hxl">{l}</div><div className="hxv">{v}</div></div>
                  ))}
                  {patient.notes && <div style={{ fontSize:13, lineHeight:1.6, background:C.cream, borderRadius:10, padding:10, marginTop:8 }}>{patient.notes}</div>}
                  {pSess.slice(0,3).map((s,i) => (
                    <div key={s.id} style={{ marginTop:10, padding:10, background:C.cream, borderRadius:10 }}>
                      <div style={{ fontWeight:600, fontSize:12, color:C.terra }}>Sesión {pSess.length-i} — {s.date}</div>
                      <div style={{ fontSize:13, marginTop:3, whiteSpace:"pre-wrap" }}>{s.note}</div>
                    </div>
                  ))}
                  <div style={{ marginTop:12, fontSize:12, color:C.grayL }}>Firma: _________________ — Hadrion</div>
                </div>
              </div>
              <button className="btn btnp btnfull noprint" onClick={() => window.print()}>🖨️ Imprimir</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── OBJECTIVES ───────────────────────────────────────────────────────────────
function Objectives({ lang }) {
  const OBJETIVOS_DB = {
    TEL:{ icon:"🗣️", color:"#5B8DB8", colorF:"#EBF3FB",
      areas:[
        { area:"Comprensión", objetivos:["Seguir instrucciones simples de 1 paso","Comprender instrucciones de 2 pasos","Responder ¿quién?, ¿dónde?, ¿qué? sobre cuentos","Comprender conceptos relacionales"] },
        { area:"Expresión", objetivos:["Ampliar vocabulario: 100 palabras cotidianas","Producir frases de 2–3 palabras","Narrar secuencias de 3 eventos","Usar oraciones con estructura SVO"] },
        { area:"Conciencia fonológica", objetivos:["Identificar y producir rimas","Segmentar bisílabas con palmadas","Identificar sílaba inicial","Discriminar pares mínimos"] },
      ]
    },
    Dislexia:{ icon:"📖", color:"#E8A020", colorF:"#FEF3E0",
      areas:[
        { area:"Decodificación", objetivos:["Leer sílabas CV con 90% precisión","Leer palabras mono y bisílabas sin error","Velocidad lectora 60 ppm","Leer oraciones con comprensión"] },
        { area:"Conciencia fonológica", objetivos:["Segmentar en fonemas","Manipular fonemas","Discriminar b/d/p/q","Generar rimas propias"] },
      ]
    },
    TDAH:{ icon:"🚦", color:"#E8719C", colorF:"#FDE8F0",
      areas:[
        { area:"Atención", objetivos:["Atención sostenida 10 min","Completar tareas con <3 errores","Inhibir respuesta impulsiva","Alternar atención entre tareas"] },
        { area:"Autorregulación", objetivos:["Identificar estado emocional","Aplicar respiración en frustración","Completar secuencias de 3 pasos","Reportar uso de estrategias"] },
      ]
    },
    Disartria:{ icon:"👄", color:"#2ECC71", colorF:"#E8F8EF",
      areas:[
        { area:"Praxias", objetivos:["Praxias estáticas labiales y linguales","Secuencias dinámicas sin pausa","5 reps pa-ta-ka en 10 seg","Tono muscular adecuado en reposo"] },
        { area:"Articulación", objetivos:["Producir /p/,/b/,/t/,/d/ en posición inicial","Bisílabas con 80% inteligibilidad","Oraciones cortas comprensibles","Controlar velocidad del habla"] },
      ]
    },
    TEA:{ icon:"🌈", color:"#8B7BB5", colorF:"#F0EDF8",
      areas:[
        { area:"Comunicación social", objetivos:["Contacto visual 3 segundos","Responder a su nombre 80%","Iniciar peticiones funcionales","Usar CAA para necesidades básicas"] },
        { area:"Interacción", objetivos:["Juego paralelo 10 min","Imitar acciones simples","Turnarse en 3 intercambios","Ampliar juego funcional"] },
      ]
    },
  };

  const [selDiag, setSelDiag] = useState("TEL");
  const [checked, setChecked] = useState({});
  const diag = OBJETIVOS_DB[selDiag];
  const toggle = k => setChecked(prev => ({...prev, [k]:!prev[k]}));
  const total = Object.values(checked).filter(Boolean).length;

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Objetivos Terapéuticos</div></div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(90px,1fr))", gap:8, marginBottom:16 }}>
        {Object.entries(OBJETIVOS_DB).map(([d,info]) => (
          <button key={d} onClick={() => setSelDiag(d)}
            style={{ padding:"10px 6px", borderRadius:12, border:`2px solid ${selDiag===d?info.color:C.sand}`,
              background:selDiag===d?info.colorF:"white", cursor:"pointer", textAlign:"center" }}>
            <div style={{ fontSize:24, marginBottom:4 }}>{info.icon}</div>
            <div style={{ fontSize:11, fontWeight:700, color:selDiag===d?info.color:C.charcoal }}>{d}</div>
          </button>
        ))}
      </div>
      {diag.areas.map((area,ai) => (
        <div key={ai} className="sc" style={{ marginBottom:12 }}>
          <div className="sch"><span style={{ fontWeight:700, fontSize:14 }}>{area.area}</span></div>
          <div className="scb">
            {area.objetivos.map((obj,oi) => {
              const k = `${ai}-${oi}`;
              return (
                <div key={oi} onClick={() => toggle(k)}
                  style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"10px 0", borderBottom:`1px solid ${C.sand}`, cursor:"pointer" }}>
                  <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${checked[k]?diag.color:C.sandD}`,
                    background:checked[k]?diag.colorF:"white", display:"flex", alignItems:"center", justifyContent:"center",
                    flexShrink:0, fontSize:13, color:diag.color, marginTop:1 }}>
                    {checked[k] ? "✓" : ""}
                  </div>
                  <div style={{ fontSize:13, color:checked[k]?C.grayL:C.charcoal, textDecoration:checked[k]?"line-through":"none" }}>{obj}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {total > 0 && (
        <div style={{ background:diag.colorF, borderRadius:12, padding:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:13, fontWeight:600, color:diag.color }}>✅ {total} objetivo(s) seleccionado(s)</span>
          <button className="btn btnsm" style={{ background:diag.color, color:"white" }} onClick={() => setChecked({})}>Limpiar</button>
        </div>
      )}
    </div>
  );
}

// ─── PHONOLOGY ────────────────────────────────────────────────────────────────
function JuegosInteractivos({ C }) {
  const [activo, setActivo] = useState(null);
  const [ronda, setRonda] = useState([]);
  const [score, setScore] = useState(0);
  const [fb, setFb] = useState(null);
  const [idx, setIdx] = useState(0);

  const speakPh = ph => speak(PHONEME_TTS[ph] || ph.toLowerCase());
  const speakWord = w => speak(w);
  const sh = arr => [...arr].sort(() => Math.random()-0.5);

  const responder = (ph, correcto) => {
    if (fb) return;
    setFb(correcto ? "ok" : "mal");
    if (correcto) setScore(s => s+1);
    setTimeout(() => {
      setFb(null);
      if (idx+1 < ronda.length) {
        setIdx(i => i+1);
        if (activo === "atrapa") setTimeout(() => speakPh(ronda[idx+1]), 400);
      } else {
        setActivo("fin");
      }
    }, 900);
  };

  if (activo === "atrapa" && idx < ronda.length) {
    const ops = sh([ronda[idx], ...sh(PHONEMES.filter(p => p !== ronda[idx])).slice(0,2)]);
    return (
      <div style={{ background:"white", borderRadius:16, padding:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, alignItems:"center" }}>
          <b style={{ fontSize:14 }}>🎯 Atrapa el sonido</b>
          <span style={{ background:C.terraF, color:C.terra, padding:"4px 10px", borderRadius:20, fontSize:12, fontWeight:700 }}>⭐{score} — {idx+1}/{ronda.length}</span>
        </div>
        <div style={{ background:C.terraF, borderRadius:14, padding:16, textAlign:"center", marginBottom:12 }}>
          <button className="btn btnp" onClick={() => speakPh(ronda[idx])}>🔊 Escuchar: {ronda[idx]}</button>
        </div>
        {fb && <div className="alert" style={{ background:fb==="ok"?C.greenF:C.dangerF, color:fb==="ok"?C.forest:C.danger, textAlign:"center", fontWeight:700 }}>{fb==="ok"?"✅ ¡Correcto!":"❌ Incorrecto"}</div>}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
          {ops.map((ph,i) => (
            <button key={i} onClick={() => responder(ph, ph===ronda[idx])}
              style={{ padding:"18px 8px", borderRadius:14, border:`2px solid ${C.sand}`, background:"white",
                fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700, cursor:"pointer" }}>{ph}</button>
          ))}
        </div>
        <button className="btn btng btnfull" style={{ marginTop:12 }} onClick={() => setActivo(null)}>Salir</button>
      </div>
    );
  }

  if (activo === "donde" && idx < ronda.length) {
    const cp = ronda[idx];
    const wps = sh(PHONEMES.filter(p => p!==cp && PHONEME_EMOJI[p] && PHONEME_WORDS[p])).slice(0,3);
    const opts = sh([
      { ph:cp, e:(PHONEME_EMOJI[cp]||[])[0]||"📝", w:(PHONEME_WORDS[cp]||[])[0]||cp },
      ...wps.map(p => ({ ph:p, e:(PHONEME_EMOJI[p]||[])[0]||"📝", w:(PHONEME_WORDS[p]||[])[0]||p }))
    ]);
    return (
      <div style={{ background:"white", borderRadius:16, padding:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, alignItems:"center" }}>
          <b style={{ fontSize:14 }}>❓ ¿Dónde está?</b>
          <span style={{ background:C.sageF, color:C.sage, padding:"4px 10px", borderRadius:20, fontSize:12, fontWeight:700 }}>⭐{score} — {idx+1}/{ronda.length}</span>
        </div>
        {fb && <div className="alert" style={{ background:fb==="ok"?C.greenF:C.dangerF, color:fb==="ok"?C.forest:C.danger, textAlign:"center", fontWeight:700 }}>{fb==="ok"?"✅ ¡Correcto!":"❌ Incorrecto"}</div>}
        <div style={{ background:C.sageF, borderRadius:14, padding:14, textAlign:"center", marginBottom:12 }}>
          <div style={{ fontSize:12, color:C.grayL, marginBottom:4 }}>Toca la imagen que empieza con</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:64, fontWeight:700, color:C.sage, lineHeight:1 }}>{cp}</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {opts.map((o,i) => (
            <button key={i} onClick={() => responder(o.ph, o.ph===cp)}
              style={{ padding:"14px 8px", borderRadius:12, border:`2px solid ${C.sand}`, background:"white", cursor:"pointer", textAlign:"center" }}>
              <div style={{ fontSize:44 }}>{o.e}</div>
              <div style={{ fontSize:11, fontWeight:700, marginTop:6 }}>{o.w}</div>
            </button>
          ))}
        </div>
        <button className="btn btng btnfull" style={{ marginTop:12 }} onClick={() => setActivo(null)}>Salir</button>
      </div>
    );
  }

  if (activo === "fin") {
    return (
      <div style={{ background:"white", borderRadius:16, padding:24, textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🎉</div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, marginBottom:8 }}>¡Juego terminado!</div>
        <div style={{ fontSize:16, color:C.grayL, marginBottom:16 }}>Puntaje: <b style={{ color:C.terra }}>{score}</b> / {ronda.length}</div>
        <div style={{ background:C.terraF, borderRadius:12, padding:12, marginBottom:16 }}>
          {score===ronda.length?"🌟 ¡Perfecto!":score>=ronda.length/2?"👏 ¡Muy bien!":"💪 ¡Seguí practicando!"}
        </div>
        <button className="btn btnp" onClick={() => setActivo(null)}>Jugar de nuevo</button>
      </div>
    );
  }

  return (
    <div>
      {[
        { id:"atrapa", icon:"🎯", name:"Atrapa el sonido", desc:"Escuchá el fonema y tocá la letra correcta", color:C.terra,
          action:() => { const ph=sh(PHONEMES).slice(0,10); setRonda(ph); setIdx(0); setScore(0); setFb(null); setActivo("atrapa"); setTimeout(()=>speakPh(ph[0]),500); }},
        { id:"donde", icon:"❓", name:"¿Dónde está?", desc:"Ve el fonema y tocá la imagen que empieza con ese sonido", color:C.sage,
          action:() => { const ph=sh(PHONEMES.filter(p=>PHONEME_EMOJI[p]&&PHONEME_WORDS[p])).slice(0,8); setRonda(ph); setIdx(0); setScore(0); setFb(null); setActivo("donde"); }},
      ].map(j => (
        <div key={j.id} style={{ display:"flex", alignItems:"center", gap:12, padding:14, background:"white", borderRadius:14, marginBottom:10, cursor:"pointer", border:`2px solid ${j.color}33`, boxShadow:"0 2px 8px rgba(0,0,0,.06)" }} onClick={j.action}>
          <div style={{ width:52, height:52, borderRadius:14, background:j.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{j.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:14 }}>{j.name}</div>
            <div style={{ fontSize:12, color:C.grayL, marginTop:3 }}>{j.desc}</div>
          </div>
          <div style={{ background:j.color, color:"white", padding:"8px 16px", borderRadius:10, fontSize:13, fontWeight:700, flexShrink:0 }}>Jugar</div>
        </div>
      ))}
    </div>
  );
}

function Phonology({ lang }) {
  const [sel, setSel] = useState(null);
  const [stage, setStage] = useState("Escucha");
  const [fil, setFil] = useState("Todas");
  const [wordIdx, setWordIdx] = useState(0);
  const stages = ["Escucha","Imagen","Sílaba","Segmentación","Fusión","Manipulación"];
  const cats = { Vocales:["A","E","I","O","U"], Consonantes:PHONEMES.filter(p=>!["A","E","I","O","U"].includes(p)), Todas:PHONEMES };

  const words = sel ? (PHONEME_WORDS[sel]||[]) : [];
  const emojis = sel ? (PHONEME_EMOJI[sel]||[]) : [];

  const handle = ph => {
    setSel(ph); setWordIdx(0);
    speak(PHONEME_TTS[ph] || ph.toLowerCase());
  };

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}>
        <div className="pt">Conciencia Fonológica</div>
        <div className="ps">Etapas progresivas · Audio integrado · Ñ incluida</div>
      </div>

      <SC title="Etapa del ejercicio">
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {stages.map(s => <button key={s} className={`filbtn${stage===s?" active":""}`} onClick={() => setStage(s)}>{s}</button>)}
        </div>
      </SC>

      <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
        {Object.keys(cats).map(c => <button key={c} className={`filbtn${fil===c?" active":""}`} onClick={() => setFil(c)}>{c}</button>)}
      </div>

      <div className="phgrid">
        {(cats[fil]||PHONEMES).map(ph => (
          <button key={ph} className={`phbtn${sel===ph?" sel":""}`} onClick={() => handle(ph)}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:ph.length > 1 ? 22 : 28, fontWeight:700, lineHeight:1 }}>{ph}</div>
            {PHONEME_EMOJI[ph] && <div style={{ fontSize:20, lineHeight:1 }}>{PHONEME_EMOJI[ph][0]}</div>}
          </button>
        ))}
      </div>

      {sel && (
        <div style={{ background:C.terraF, borderRadius:16, padding:16, marginBottom:12, border:`2px solid ${C.terraL}` }}>
          <div style={{ textAlign:"center", marginBottom:12 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:72, fontWeight:700, color:C.terra, lineHeight:1 }}>{sel}</div>
            <div style={{ fontSize:11, color:C.grayL, marginTop:2 }}>
              {sel === "Ñ" ? "Sonido: eñe" : `TTS: ${PHONEME_TTS[sel]}`}
            </div>
            <button className="btn btnp btnsm" style={{ marginTop:8 }} onClick={() => speak(PHONEME_TTS[sel]||sel.toLowerCase())}>
              🔊 Escuchar fonema "{sel}"
            </button>
          </div>

          {(stage==="Escucha"||stage==="Imagen") && emojis.length > 0 && (
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:C.terraD, marginBottom:8, textTransform:"uppercase", letterSpacing:.5 }}>
                Palabras con {sel}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
                {emojis.map((emoji,i) => (
                  <div key={i} style={{ textAlign:"center", cursor:"pointer", background:"white", borderRadius:12, border:`2px solid ${C.terraL}`, width:84, padding:"8px 4px" }}
                    onClick={() => speakWord(words[i]||sel)}>
                    <div style={{ fontSize:40, lineHeight:1.2 }}>{emoji}</div>
                    <div style={{ fontSize:10, fontWeight:800, color:C.terra, marginTop:4 }}>{words[i]||""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stage === "Sílaba" && (
            <div style={{ background:"white", borderRadius:12, padding:12 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.terraD, marginBottom:8 }}>✂️ Palmadas por sílaba</div>
              {words.slice(0,4).map((w,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:10, background:C.cream, borderRadius:10, marginBottom:8, cursor:"pointer" }}
                  onClick={() => speak(w)}>
                  <div style={{ fontSize:28 }}>{emojis[i]||"📝"}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:18, letterSpacing:3 }}>{w}</div>
                    <div style={{ fontSize:11, color:C.grayL }}>👏 tocá para escuchar</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {stage === "Segmentación" && (
            <div style={{ background:"white", borderRadius:12, padding:12 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.terraD, marginBottom:8 }}>🔍 Di cada sonido por separado</div>
              {words.slice(0,3).map((w,i) => (
                <div key={i} style={{ marginBottom:10, background:C.cream, borderRadius:10, padding:10 }}>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:6 }}>
                    <span style={{ fontSize:24 }}>{emojis[i]||"📝"}</span>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700 }}>{w}</span>
                    <button className="btn btnsm" style={{ background:"#4285F4", color:"white" }} onClick={() => speak(w)}>🔊</button>
                  </div>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                    {w.split("").map((letra,j) => (
                      <div key={j} style={{ width:34, height:34, borderRadius:8, border:`2px solid ${C.terraL}`, background:"white", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700, color:C.terra }}>{letra.toUpperCase()}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {stage === "Fusión" && (
            <div style={{ background:"white", borderRadius:12, padding:12 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.terraD, marginBottom:8 }}>🔗 Tocá cada letra y adiviná la palabra</div>
              {words.slice(0,3).map((w,i) => (
                <div key={i} style={{ marginBottom:10, background:C.cream, borderRadius:10, padding:10 }}>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                    {w.split("").map((l,j) => (
                      <button key={j} onClick={() => speak(l)}
                        style={{ minWidth:34, height:34, borderRadius:8, border:`2px solid ${C.terraL}`, background:"white", fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontWeight:700, color:C.terra, cursor:"pointer" }}>{l.toUpperCase()}</button>
                    ))}
                    <button className="btn btnsm" style={{ background:C.terra, color:"white" }} onClick={() => speak(w)}>🔊</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {stage === "Manipulación" && (
            <div style={{ background:"white", borderRadius:12, padding:12 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.terraD, marginBottom:8 }}>🔀 Cambiá el fonema inicial</div>
              {[["pato","gato"],["piso","viso"],["cama","tama"],["luna","tuna"],["ñandú","mandú"]].map(([w1,w2],i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8, background:C.cream, borderRadius:10, padding:"10px 14px" }}>
                  <button className="btn btnsm" style={{ background:"white", border:`2px solid ${C.terraL}`, fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontWeight:700, color:C.terra }} onClick={() => speak(w1)}>{w1}</button>
                  <div style={{ color:C.grayL }}>→</div>
                  <button className="btn btnsm" style={{ background:C.terra, color:"white", fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontWeight:700 }} onClick={() => speak(w2)}>{w2}</button>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop:12 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.terraD, marginBottom:6, textTransform:"uppercase" }}>Palabras con {sel} ({words.length})</div>
            {words.length > 0 && (
              <div style={{ display:"flex", alignItems:"center", gap:12, background:"white", borderRadius:12, padding:"10px 14px" }}>
                <div style={{ width:46, height:46, borderRadius:12, background:C.terraF, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, color:C.terra, flexShrink:0 }}>{sel}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700 }}>{words[wordIdx%words.length]}</div>
                  <div style={{ fontSize:11, color:C.grayL }}>{wordIdx+1} de {words.length}</div>
                </div>
                <div style={{ display:"flex", gap:4 }}>
                  <button className="btn btnsm" style={{ background:"#4285F4", color:"white" }} onClick={() => speak(words[wordIdx%words.length])}>🔊</button>
                  <button className="btn btnsm btng" onClick={() => setWordIdx(i => (i+1)%words.length)}>→</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <SC title="🎮 Juegos fonológicos">
        <JuegosInteractivos C={C} />
      </SC>
    </div>
  );
}

// ─── REPORTS ──────────────────────────────────────────────────────────────────
function Reports({ patients, sessions, payments, lang, currency }) {
  const [pid, setPid] = useState("");
  const [tab, setTab] = useState("general");
  const patient = patients.find(p => p.id===parseInt(pid));
  const pSess = sessions.filter(s => s.patientId===parseInt(pid));
  const totalC = payments.filter(p => p.status==="pagado").reduce((a,b) => a+b.amount, 0);
  const avgProg = pSess.length > 0 ? Math.round(pSess.reduce((a,s) => a+(s.progress||0),0)/pSess.length) : 0;

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Reportes</div></div>
      <div className="atabrow">
        {[{k:"general",l:"📊 General"},{k:"progreso",l:"📈 Progreso"},{k:"familia",l:"👨‍👩‍👧 Familia"}].map(t => (
          <button key={t.k} className={`atab${tab===t.k?" active":""}`} onClick={() => setTab(t.k)}>{t.l}</button>
        ))}
      </div>

      {tab === "general" && (
        <>
          <div className="sgrid">
            <div className="sc2"><div className="snum">{patients.length}</div><div className="slbl">Pacientes</div></div>
            <div className="sc2"><div className="snum">{sessions.length}</div><div className="slbl">Sesiones</div></div>
            <div className="sc2"><div className="snum">{formatCurrency(totalC,currency)}</div><div className="slbl">Cobrado</div></div>
            <div className="sc2"><div className="snum">{payments.filter(p=>p.status==="pendiente").length}</div><div className="slbl">Pendientes</div></div>
          </div>
          <SC title="Diagnósticos">
            {Object.entries(patients.reduce((a,p) => { a[p.diagnosis]=(a[p.diagnosis]||0)+1; return a; }, {})).map(([d,n]) => (
              <div key={d} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.sand}` }}>
                <div style={{ flex:1, fontSize:13 }}>{d}</div>
                <div className="prog" style={{ width:90 }}><div className="progf" style={{ width:`${patients.length?(n/patients.length)*100:0}%` }} /></div>
                <div style={{ fontWeight:700, color:C.terra }}>{n}</div>
              </div>
            ))}
          </SC>
        </>
      )}

      {tab === "progreso" && (
        <>
          <div className="fg">
            <select className="inp" value={pid} onChange={e => setPid(e.target.value)}>
              <option value="">Seleccionar paciente...</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          {patient && (
            <SC title={`📈 ${patient.name} — Progreso`}>
              <div style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:13 }}>Promedio general</span>
                  <span style={{ fontWeight:700, color:C.terra }}>{avgProg}%</span>
                </div>
                <div className="prog" style={{ height:12 }}><div className="progf" style={{ width:`${avgProg}%`, height:12 }} /></div>
              </div>
              {pSess.map((s,i) => (
                <div key={s.id} style={{ marginBottom:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                    <span style={{ fontSize:11 }}>Sesión {pSess.length-i} — {s.date}</span>
                    <span style={{ fontWeight:700, fontSize:11, color:C.terra }}>{s.progress}%</span>
                  </div>
                  <div className="prog"><div className="progf" style={{ width:`${s.progress}%` }} /></div>
                </div>
              ))}
            </SC>
          )}
        </>
      )}

      {tab === "familia" && (
        <>
          <div className="fg">
            <select className="inp" value={pid} onChange={e => setPid(e.target.value)}>
              <option value="">Seleccionar paciente...</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          {patient && (
            <div>
              <div style={{ background:"white", borderRadius:16, padding:20, boxShadow:"0 2px 12px rgba(0,0,0,.08)" }}>
                <div style={{ borderBottom:`3px solid ${C.terra}`, paddingBottom:12, marginBottom:16, textAlign:"center" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700 }}>Informe para la Familia</div>
                  <div style={{ fontSize:12, color:C.grayL }}>{new Date().toLocaleDateString("es-UY")}</div>
                </div>
                <div style={{ background:C.terraF, borderRadius:10, padding:12, marginBottom:14 }}>
                  <div style={{ fontWeight:700, fontSize:15 }}>{patient.name}</div>
                  <div style={{ fontSize:12, color:C.grayL }}>{patient.age} años · {patient.diagnosis} · {pSess.length} sesiones</div>
                </div>
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontWeight:700, fontSize:13, marginBottom:6 }}>📈 Progreso general</div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div className="prog" style={{ flex:1, height:10 }}><div className="progf" style={{ width:`${avgProg}%`, height:10 }} /></div>
                    <span style={{ fontWeight:700, color:C.terra }}>{avgProg}%</span>
                  </div>
                </div>
                {patient.goals?.length > 0 && (
                  <div style={{ marginBottom:12 }}>
                    <div style={{ fontWeight:700, fontSize:13, marginBottom:6 }}>🎯 Objetivos</div>
                    {patient.goals.map((g,i) => <div key={i} style={{ fontSize:13, padding:"4px 0" }}>• {g}</div>)}
                  </div>
                )}
                {pSess[0] && (
                  <div style={{ background:C.cream, borderRadius:10, padding:12, marginBottom:12 }}>
                    <div style={{ fontWeight:700, fontSize:12, color:C.grayL, marginBottom:6 }}>Última sesión — {pSess[0].date}</div>
                    <div style={{ fontSize:13, whiteSpace:"pre-wrap" }}>{pSess[0].note}</div>
                  </div>
                )}
                <div style={{ marginTop:14, borderTop:`1px solid ${C.sand}`, paddingTop:10, fontSize:11, color:C.grayL, textAlign:"center" }}>
                  Hadrion · comunipro12@gmail.com
                </div>
              </div>
              <button className="btn btnp btnfull noprint" style={{ marginTop:8 }} onClick={() => window.print()}>🖨️ Imprimir / PDF</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── IA ASISTENTE (mejorado y libre) ─────────────────────────────────────────
function IAAsistente({ patients, lang }) {
  const [tab, setTab] = useState("libre");
  const [prompt, setPrompt] = useState("");
  const [selPat, setSelPat] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [edad, setEdad] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [editResult, setEditResult] = useState(false);
  const [error, setError] = useState("");
  const t = T[lang];

  const systemPrompt = `Sos una fonoaudióloga clínica experta, trabajando en Uruguay. Respondés en español rioplatense, de forma clara y profesional, sin usar asteriscos ni markdown. Tus respuestas son directas, clínicas y útiles para profesionales terapéuticos.`;

  const callClaude = async (userPrompt) => {
    setLoading(true); setResult(""); setError(""); setEditResult(false);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role:"user", content:userPrompt }]
        })
      });
      const data = await res.json();
      if (data.content?.[0]?.text) setResult(data.content[0].text);
      else setError(t.error);
    } catch { setError(t.error); }
    setLoading(false);
  };

  const quickActions = [
    { icon:"🎯", label:"Objetivos terapéuticos",
      prompt:() => `Generá 5 objetivos terapéuticos específicos, concretos y medibles para un paciente de ${edad} años con diagnóstico de ${diagnostico}. Para cada objetivo incluí: descripción, criterio de logro concreto y tiempo estimado. Sin asteriscos.` },
    { icon:"📅", label:"Plan mensual",
      prompt:() => `Creá un plan terapéutico mensual para un paciente de ${edad} años con ${diagnostico}. Estructurá semana por semana: objetivo, actividades, materiales e indicaciones para la familia. Sin asteriscos.` },
    { icon:"📄", label:"Informe para familia",
      prompt:() => {
        const p = patients.find(x => x.name===selPat);
        if (!p) return null;
        return `Redactá un informe de progreso para la familia de ${p.name}, ${p.age} años, diagnóstico ${p.diagnosis}, con ${p.sessions} sesiones. Objetivos: ${(p.goals||[]).join(", ")}. Estilo: cálido, profesional, sin tecnicismos, en español rioplatense. 3 párrafos: situación actual, logros, recomendaciones para casa. Sin asteriscos.`;
      }},
    { icon:"📊", label:"Análisis de seguimiento",
      prompt:() => {
        const p = patients.find(x => x.name===selPat);
        if (!p) return null;
        return `Analizá el progreso terapéutico de ${p.name}, ${p.age} años, ${p.diagnosis}, ${p.sessions} sesiones. Generá: A) Evaluación del progreso. B) Próximos pasos. C) Indicadores de logro 4 semanas. D) Actividades prioritarias. E) Señales de alerta. Sin asteriscos.`;
      }},
    { icon:"🏫", label:"Informe para escuela",
      prompt:() => {
        const p = patients.find(x => x.name===selPat);
        if (!p) return null;
        return `Redactá un informe formal para el establecimiento educativo de ${p.name}, ${p.age} años, diagnóstico ${p.diagnosis}. Incluí: situación actual, avances, adecuaciones curriculares recomendadas y datos de contacto profesional. Tono formal. Sin asteriscos.`;
      }},
    { icon:"💡", label:"Estrategias personalizadas",
      prompt:() => `Generá 8 estrategias específicas para trabajar con un paciente de ${edad} años con diagnóstico de ${diagnostico}. Incluí estrategias para la sesión clínica Y para la familia en casa. Sin asteriscos.` },
  ];

  const needsPatient = ["📄","📊","🏫"];
  const needsDiag = ["🎯","📅","💡"];

  const handleQuick = (action) => {
    const p = action.prompt();
    if (!p) { setError("Seleccioná un paciente primero."); return; }
    if ((needsDiag.includes(action.icon)) && (!diagnostico || !edad)) { setError("Completá diagnóstico y edad."); return; }
    callClaude(p);
  };

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}>
        <div className="pt">Asistente IA</div>
        <div className="ps">Powered by Claude · Generá todo lo que necesitás</div>
      </div>

      <div style={{ background:"linear-gradient(135deg,#9B7EBD,#7B5EA7)", borderRadius:16, padding:16, color:"white", marginBottom:16, display:"flex", gap:12, alignItems:"center" }}>
        <div style={{ fontSize:36 }}>🧠</div>
        <div>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:2 }}>Claude AI integrado</div>
          <div style={{ fontSize:12, opacity:.85 }}>Objetivos · Planes · Informes · Cualquier consulta clínica</div>
        </div>
      </div>

      <div className="atabrow">
        <button className={`atab${tab==="libre"?" active":""}`} onClick={() => setTab("libre")}>✍️ Libre</button>
        <button className={`atab${tab==="rapido"?" active":""}`} onClick={() => setTab("rapido")}>⚡ Rápido</button>
      </div>

      {tab === "libre" && (
        <div>
          <div className="fg">
            <label className="lbl">Preguntá o pedí lo que necesitás</label>
            <textarea className="inp" style={{ minHeight:100 }} placeholder="Ej: Generame una lista de actividades para trabajar conciencia fonológica con un niño de 5 años con TEL..."
              value={prompt} onChange={e => setPrompt(e.target.value)} />
          </div>
          <button className="btn btnp btnfull" onClick={() => { if (!prompt.trim()) return; callClaude(prompt); }} disabled={loading}>
            {loading ? <><div className="spinner" style={{ width:16, height:16, border:"2px solid rgba(255,255,255,.3)", borderTopColor:"white" }} /> Generando...</> : "🧠 Generar"}
          </button>
        </div>
      )}

      {tab === "rapido" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
            <div className="fg" style={{ margin:0 }}>
              <label className="lbl">Diagnóstico</label>
              <select className="inp" value={diagnostico} onChange={e => setDiagnostico(e.target.value)}>
                <option value="">--</option>
                {["TEL","Dislexia","TDAH","Disartria","TEA","Retraso del habla","Tartamudez","Otra"].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="fg" style={{ margin:0 }}>
              <label className="lbl">Edad</label>
              <input className="inp" type="number" placeholder="años" value={edad} onChange={e => setEdad(e.target.value)} min="2" max="18" />
            </div>
          </div>
          <div className="fg">
            <label className="lbl">Paciente (para informes)</label>
            <select className="inp" value={selPat} onChange={e => setSelPat(e.target.value)}>
              <option value="">--</option>
              {patients.filter(p => p.status==="active").map(p => <option key={p.id} value={p.name}>{p.name} — {p.diagnosis}</option>)}
            </select>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {quickActions.map(action => (
              <button key={action.label} onClick={() => handleQuick(action)} disabled={loading}
                style={{ background:"white", border:`2px solid ${C.sand}`, borderRadius:12, padding:"12px 10px", cursor:"pointer", textAlign:"left", transition:"all .15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor=C.terra}
                onMouseLeave={e => e.currentTarget.style.borderColor=C.sand}>
                <div style={{ fontSize:20, marginBottom:4 }}>{action.icon}</div>
                <div style={{ fontSize:12, fontWeight:600, color:C.charcoal }}>{action.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <div className="alert alrtd" style={{ marginTop:10 }}>{error}</div>}

      {loading && (
        <div style={{ textAlign:"center", padding:"30px 0" }}>
          <div className="spinner" />
          <div style={{ fontWeight:600, color:C.terra, marginTop:12 }}>Consultando a Claude AI...</div>
        </div>
      )}

      {result && (
        <div style={{ marginTop:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <div style={{ fontWeight:700, fontSize:13, color:C.charcoal }}>✅ Resultado generado</div>
            <div style={{ display:"flex", gap:6 }}>
              <button className="btn btnsm btng" onClick={() => setEditResult(!editResult)}>
                {editResult ? "👁️ Ver" : "✏️ Editar"}
              </button>
              <button className="btn btnsm btno noprint" onClick={() => window.print()}>🖨️</button>
            </div>
          </div>
          {editResult
            ? <textarea className="inp" style={{ minHeight:300, fontSize:13, lineHeight:1.8 }} value={result} onChange={e => setResult(e.target.value)} />
            : <div style={{ background:C.terraF, borderRadius:14, padding:18, whiteSpace:"pre-wrap", fontSize:13, color:C.charcoal, lineHeight:1.9, border:`1.5px solid ${C.terraL}`, maxHeight:"60vh", overflowY:"auto" }}>
                {result}
              </div>
          }
          <div style={{ display:"flex", gap:8, marginTop:8 }}>
            <button className="btn btng" style={{ flex:1, justifyContent:"center" }} onClick={() => navigator.clipboard?.writeText(result)}>
              📋 Copiar
            </button>
            <button className="btn btno" style={{ flex:1, justifyContent:"center" }} onClick={() => setResult("")}>
              🔄 Limpiar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── RESOURCES con plantillas rellenables ─────────────────────────────────────
function Resources({ lang }) {
  const [sel, setSel] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const t = T[lang];

  const recursos = [
    { i:"📋", t:"Anamnesis", c:"Evaluación",
      fields:[
        { k:"nombre", l:"Nombre del paciente", type:"text" },
        { k:"dob", l:"Fecha de nacimiento", type:"date" },
        { k:"diagnostico", l:"Diagnóstico", type:"text" },
        { k:"tutor", l:"Tutor/Responsable", type:"text" },
        { k:"telefono", l:"Teléfono", type:"tel" },
        { k:"email", l:"Email", type:"email" },
        { k:"motivo", l:"Motivo de consulta", type:"textarea" },
        { k:"antecedentes", l:"Antecedentes (embarazo, parto, hitos)", type:"textarea" },
        { k:"observaciones", l:"Observaciones iniciales", type:"textarea" },
      ]},
    { i:"📝", t:"Registro de sesión", c:"Clínico",
      fields:[
        { k:"paciente", l:"Paciente", type:"text" },
        { k:"fecha", l:"Fecha", type:"date" },
        { k:"sesion_n", l:"Sesión N°", type:"number" },
        { k:"duracion", l:"Duración (min)", type:"number" },
        { k:"objetivo", l:"Objetivo trabajado hoy", type:"text" },
        { k:"estado", l:"Estado del paciente", type:"text" },
        { k:"actividades", l:"Actividades realizadas", type:"textarea" },
        { k:"logros", l:"Logros de la sesión", type:"textarea" },
        { k:"dificultades", l:"Dificultades observadas", type:"textarea" },
        { k:"progreso", l:"Progreso (%)", type:"number" },
        { k:"tarea", l:"Tarea para casa", type:"textarea" },
        { k:"proxima_sesion", l:"Próxima sesión", type:"text" },
      ]},
    { i:"📊", t:"Escala de progreso", c:"Seguimiento",
      fields:[
        { k:"paciente", l:"Paciente", type:"text" },
        { k:"periodo", l:"Período", type:"text" },
        { k:"obj1", l:"Objetivo 1", type:"text" },
        { k:"prog1", l:"Progreso Obj.1 (%)", type:"number" },
        { k:"obs1", l:"Observaciones Obj.1", type:"textarea" },
        { k:"obj2", l:"Objetivo 2", type:"text" },
        { k:"prog2", l:"Progreso Obj.2 (%)", type:"number" },
        { k:"obs2", l:"Observaciones Obj.2", type:"textarea" },
        { k:"obj3", l:"Objetivo 3", type:"text" },
        { k:"prog3", l:"Progreso Obj.3 (%)", type:"number" },
        { k:"obs3", l:"Observaciones Obj.3", type:"textarea" },
      ]},
    { i:"🏠", t:"Guía para familias", c:"Familia",
      fields:[
        { k:"paciente", l:"Nombre del niño/a", type:"text" },
        { k:"profesional", l:"Profesional", type:"text" },
        { k:"fecha", l:"Fecha", type:"date" },
        { k:"actividad1", l:"Actividad en casa 1", type:"textarea" },
        { k:"actividad2", l:"Actividad en casa 2", type:"textarea" },
        { k:"actividad3", l:"Actividad en casa 3", type:"textarea" },
        { k:"recomendaciones", l:"Recomendaciones generales", type:"textarea" },
        { k:"contacto", l:"Contacto del profesional", type:"text" },
      ]},
    { i:"📬", t:"Carta para la escuela", c:"Derivación",
      fields:[
        { k:"alumno", l:"Nombre del alumno/a", type:"text" },
        { k:"grado", l:"Grado/Año", type:"text" },
        { k:"institucion", l:"Institución educativa", type:"text" },
        { k:"diagnostico", l:"Diagnóstico", type:"text" },
        { k:"desde", l:"En tratamiento desde", type:"date" },
        { k:"avances", l:"Avances observados", type:"textarea" },
        { k:"adecuaciones", l:"Adecuaciones solicitadas", type:"textarea" },
        { k:"profesional", l:"Profesional firmante", type:"text" },
        { k:"matricula", l:"Matrícula profesional", type:"text" },
      ]},
    { i:"💡", t:"Estrategias TDAH", c:"TDAH",
      fields:[
        { k:"alumno", l:"Nombre del alumno/a", type:"text" },
        { k:"edad", l:"Edad", type:"number" },
        { k:"estrategias_aula", l:"Estrategias para el aula", type:"textarea" },
        { k:"estrategias_casa", l:"Estrategias en casa", type:"textarea" },
        { k:"observaciones", l:"Observaciones adicionales", type:"textarea" },
      ]},
  ];

  const handleOpen = r => { setSel(r); setFormData({}); setEditMode(false); };

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Recursos</div><div className="ps">Plantillas rellenables e imprimibles</div></div>
      <div className="alert alrti">Tocá cualquier recurso para rellenarlo y luego imprimirlo como PDF.</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:10 }}>
        {recursos.map((r,i) => (
          <div key={i} className="card" style={{ cursor:"pointer", padding:12 }} onClick={() => handleOpen(r)}>
            <div style={{ fontSize:26, marginBottom:6 }}>{r.i}</div>
            <div style={{ fontWeight:700, fontSize:12, color:C.charcoal, marginBottom:3 }}>{r.t}</div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
              <span className="badge" style={{ background:C.terraF, color:C.terra, fontSize:10 }}>{r.c}</span>
              <span style={{ fontSize:10, color:C.info }}>✏️ rellenar →</span>
            </div>
          </div>
        ))}
      </div>

      {sel && (
        <Modal title={`${sel.i} ${sel.t}`} onClose={() => setSel(null)} wide>
          <div style={{ marginBottom:12, display:"flex", gap:8, justifyContent:"flex-end" }}>
            <button className="btn btng btnsm" onClick={() => setEditMode(!editMode)}>
              {editMode ? "🔒 Bloquear" : "✏️ Editar campos"}
            </button>
            <button className="btn btnp btnsm noprint" onClick={() => window.print()}>🖨️ Imprimir</button>
          </div>
          <div style={{ background:C.cream, borderRadius:12, padding:16 }}>
            {sel.fields.map(field => (
              <div className="fg" key={field.k}>
                <label className="lbl">{field.l}</label>
                {field.type === "textarea"
                  ? <textarea className="inp" readOnly={!editMode}
                      style={{ minHeight:70, background:editMode?"white":C.cream }}
                      value={formData[field.k]||""}
                      onChange={e => setFormData(prev => ({...prev,[field.k]:e.target.value}))} />
                  : <input className="inp" type={field.type} readOnly={!editMode}
                      style={{ background:editMode?"white":C.cream }}
                      value={formData[field.k]||""}
                      onChange={e => setFormData(prev => ({...prev,[field.k]:e.target.value}))} />
                }
              </div>
            ))}
          </div>
          <div style={{ marginTop:8, fontSize:11, color:C.grayL, textAlign:"center" }}>
            Hadrion — comunipro12@gmail.com
          </div>
          <button className="btn btnp btnfull noprint" style={{ marginTop:8 }} onClick={() => window.print()}>🖨️ Imprimir / Guardar PDF</button>
        </Modal>
      )}
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function Admin({ users, setUsers, lang, currentUser }) {
  const [tab, setTab] = useState("usuarios");
  const [showNew, setShowNew] = useState(false);
  const [f, setF] = useState({ name:"", email:"", password:"", role:"profesional", specialty:"", plan:"Básico", phone:"", trialDays:15 });
  const cols = [C.terra, C.sage, C.purple, C.info, C.gold];

  const add = () => {
    if (!f.name || !f.email || !f.password) return;
    const init = f.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
    const trialExp = new Date(Date.now() + f.trialDays*24*60*60*1000).toLocaleDateString("es-UY");
    setUsers(prev => [...prev, { id:Date.now(), name:f.name, email:f.email, password:f.password,
      role:f.role, specialty:f.specialty, plan:f.plan, status:"active",
      createdAt:new Date().toLocaleDateString("es-UY"), avatar:init,
      color:cols[prev.length%cols.length], lastLogin:"—", trialExpiry:trialExp }]);
    setF({ name:"", email:"", password:"", role:"profesional", specialty:"", plan:"Básico", phone:"", trialDays:15 });
    setShowNew(false);
  };

  const sendWA = () => {
    const ph = f.phone.replace(/\D/g,"");
    const msg = encodeURIComponent(
      `¡Hola ${f.name.split(" ")[0]}! Te doy acceso a Hadrion 🎉\n\n` +
      `🔗 App: hadrion.netlify.app\n` +
      `📧 Email: ${f.email}\n🔑 Contraseña: ${f.password}\n` +
      `📅 Período de prueba: ${f.trialDays} días\n` +
      `⚠️ Vence: ${new Date(Date.now()+f.trialDays*24*60*60*1000).toLocaleDateString("es-UY")}\n\n` +
      `Para renovar tu acceso: comunipro12@gmail.com\n` +
      `Pagos aceptados: MercadoPago · Transferencia · RedPagos\n\n` +
      `¡Cualquier consulta acá estoy! 💜`
    );
    window.open(`https://wa.me/${ph}?text=${msg}`, "_blank");
  };

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Administración</div></div>
      <div className="atabrow">
        {[{k:"usuarios",l:"👥 Usuarios"},{k:"seguridad",l:"🛡️ Seguridad"},{k:"publicidad",l:"📢 Publicidad"}].map(t => (
          <button key={t.k} className={`atab${tab===t.k?" active":""}`} onClick={() => setTab(t.k)}>{t.l}</button>
        ))}
      </div>

      {tab === "usuarios" && (
        <>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div style={{ fontSize:13, color:C.grayL }}>{users.length} usuarios</div>
            <button className="btn btnp btnsm" onClick={() => setShowNew(true)}>+ Dar de alta</button>
          </div>
          {users.map(u => (
            <div key={u.id} className="sc" style={{ marginBottom:10 }}>
              <div className="sch">
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div className="av" style={{ width:40, height:40, background:u.color, fontSize:14, borderRadius:12 }}>{u.avatar}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13 }}>{u.name}</div>
                    <div style={{ fontSize:11, color:C.grayL }}>{u.email}</div>
                  </div>
                </div>
                <span className={`roletag ${u.role==="admin"?"radmin":"rpro"}`}>{u.role==="admin"?"👑 Admin":"Pro"}</span>
              </div>
              <div className="scb">
                {u.trialExpiry && <div className="alert alrtw" style={{ padding:"6px 10px", fontSize:11, marginBottom:8 }}>⏰ Trial vence: {u.trialExpiry}</div>}
                <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                  {u.status==="active" && <button className="btn btng btnsm" onClick={() => setUsers(prev => prev.map(x => x.id===u.id?{...x,status:"inactive"}:x))}>⏸️ Suspender</button>}
                  {u.status==="inactive" && <button className="btn btnp btnsm" onClick={() => setUsers(prev => prev.map(x => x.id===u.id?{...x,status:"active"}:x))}>▶️ Reactivar</button>}
                  {u.id !== currentUser?.id && <button className="btn btnd btnsm" onClick={() => setUsers(prev => prev.filter(x => x.id!==u.id))}>🗑️</button>}
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {tab === "seguridad" && (
        <SC title="🛡️ Políticas de seguridad">
          {[["Autenticación","Email + contraseña","✅"],["Roles","Admin / Profesional (RBAC)","✅"],["Datos","localStorage cifrado","✅"],["2FA","Doble factor","🔜"],["Auditoría","Log de acciones","🔄"]].map(([n,d,s]) => (
            <div key={n} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:`1px solid ${C.sand}` }}>
              <div style={{ flex:1 }}><div style={{ fontWeight:600, fontSize:13 }}>{n}</div><div style={{ fontSize:11, color:C.grayL }}>{d}</div></div>
              <span style={{ fontSize:18 }}>{s}</span>
            </div>
          ))}
        </SC>
      )}

      {tab === "publicidad" && (
        <div>
          <div className="alert alrts" style={{ marginBottom:12 }}>
            💡 Recomendaciones para publicar de forma segura
          </div>
          <SC title="📢 Modelo de publicación para redes">
            <div style={{ background:C.cream, borderRadius:12, padding:14, fontSize:13, lineHeight:1.8, whiteSpace:"pre-wrap" }}>
{`✨ HADRION — La plataforma clínica para profesionales terapéuticos

¿Trabajás con pacientes en fonoaudiología, psicología, psicopedagogía o terapia ocupacional?

🎯 Registrá sesiones en segundos
📅 Agendá con Google Calendar integrado
📄 Generá informes con IA
🔤 Conciencia fonológica con audio
📊 Reportes para familias y escuelas

👉 Probá GRATIS 15 días: [enlace a formulario]
📩 Consultas: [formulario de contacto]

#fonoaudiología #terapiaocupacional #psicopedagogía #plataformaclinica #uruguay`}
            </div>
            <button className="btn btng btnsm" style={{ marginTop:8 }} onClick={() => navigator.clipboard?.writeText("✨ HADRION — La plataforma clínica...")}>📋 Copiar</button>
          </SC>
          <SC title="🔒 Consejos de seguridad">
            {[
              "✅ Usá un formulario de Google Forms en lugar de tu número personal",
              "✅ Creá una cuenta de WhatsApp Business separada para la app",
              "✅ Para pagos: MercadoPago (tiene protección al vendedor)",
              "✅ Transferencia bancaria directa (BROU o Scotiabank Uruguay)",
              "✅ RedPagos / Abitab para cobros presenciales",
              "⚠️ NO publicar número personal en publicaciones públicas",
              "⚠️ Usar link de WhatsApp: wa.me/598XXXXXXXX en bio del perfil",
            ].map((tip, i) => (
              <div key={i} style={{ fontSize:12, padding:"6px 0", borderBottom:`1px solid ${C.sand}` }}>{tip}</div>
            ))}
          </SC>
          <SC title="🔗 Demo de 1 minuto (estructura sugerida)">
            <div style={{ fontSize:12, color:C.grayL, lineHeight:1.8 }}>
              Para implementar una demo de tiempo limitado necesitás Supabase (que ya tenés). La lógica sería:
              1) Crear un link único con token temporal en tu base de datos
              2) El token expira a los 60 segundos
              3) Al vencer, redirige a tu formulario de contacto
              <br /><br />
              Con tu configuración actual de Supabase + GitHub Pages esto es implementable. ¿Querés que te genere ese módulo?
            </div>
          </SC>
        </div>
      )}

      {showNew && (
        <Modal title="Dar de alta usuario" onClose={() => setShowNew(false)}>
          {[["Nombre completo","name","text"],["Email","email","email"],["Contraseña inicial","password","text"],["Especialidad","specialty","text"],["WhatsApp (con código de país)","phone","tel"]].map(([l,k,tp]) => (
            <div className="fg" key={k}><label className="lbl">{l}</label>
              <input className="inp" type={tp} value={f[k]||""} onChange={e => setF({...f,[k]:e.target.value})} />
            </div>
          ))}
          <div className="fg"><label className="lbl">Rol</label>
            <select className="inp" value={f.role} onChange={e => setF({...f,role:e.target.value})}>
              <option value="profesional">Profesional</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="fg"><label className="lbl">Plan</label>
            <select className="inp" value={f.plan} onChange={e => setF({...f,plan:e.target.value})}>
              {["Básico","Pro","Institucional"].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="fg">
            <label className="lbl">Días de prueba</label>
            <input className="inp" type="number" value={f.trialDays} min="1" max="90"
              onChange={e => setF({...f,trialDays:parseInt(e.target.value)||15})} />
            <div style={{ fontSize:11, color:C.grayL, marginTop:4 }}>
              Vence: {new Date(Date.now()+f.trialDays*24*60*60*1000).toLocaleDateString("es-UY")}
            </div>
          </div>
          <button className="btn btnp btnfull" onClick={add}>✅ Crear usuario</button>
          {f.name && f.phone && f.email && f.password && (
            <button className="btn btnsm btnfull" style={{ background:"#25D366", color:"white", marginTop:8 }} onClick={sendWA}>
              📱 Enviar acceso por WhatsApp
            </button>
          )}
        </Modal>
      )}
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function Profile({ user, onLogout, setUser, lang, setLang, currency, setCurrency, defaultDuration, setDefaultDuration }) {
  const [ed, setEd] = useState(false);
  const [pwF, setPwF] = useState({ current:"", newPw:"", confirm:"" });
  const [pwOk, setPwOk] = useState(false);
  const [pwErr, setPwErr] = useState("");
  const t = T[lang];

  const changePw = () => {
    setPwErr(""); setPwOk(false);
    if (!pwF.current || !pwF.newPw || !pwF.confirm) { setPwErr("Completá todos los campos."); return; }
    if (pwF.current !== user.password) { setPwErr("Contraseña actual incorrecta."); return; }
    if (pwF.newPw !== pwF.confirm) { setPwErr("Las contraseñas no coinciden."); return; }
    if (pwF.newPw.length < 6) { setPwErr("Mínimo 6 caracteres."); return; }
    setUser(prev => ({...prev, password:pwF.newPw}));
    setPwF({ current:"", newPw:"", confirm:"" }); setPwOk(true);
  };

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">{t.profile}</div></div>

      <div style={{ background:"white", borderRadius:18, padding:20, textAlign:"center", marginBottom:14, boxShadow:"0 1px 8px rgba(0,0,0,.06)" }}>
        <div className="av" style={{ width:68, height:68, background:user.color, fontSize:24, margin:"0 auto 12px", borderRadius:20 }}>{user.avatar}</div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700 }}>{user.name}</div>
        <div style={{ fontSize:13, color:C.grayL, marginTop:2 }}>{user.specialty}</div>
        <span className={`roletag ${user.role==="admin"?"radmin":"rpro"}`} style={{ marginTop:8, display:"inline-flex" }}>
          {user.role==="admin"?"👑 Admin":"Profesional"}
        </span>
      </div>

      <SC title="⚙️ Preferencias">
        <div className="fg">
          <label className="lbl">{t.language}</label>
          <div style={{ display:"flex", gap:8 }}>
            {["es","en"].map(l => (
              <button key={l} className={`btn btnsm${lang===l?" btnp":" btng"}`} onClick={() => setLang(l)}>
                {l==="es"?"🇺🇾 Español":"🇬🇧 English"}
              </button>
            ))}
          </div>
        </div>
        <div className="fg">
          <label className="lbl">{t.currency}</label>
          <select className="inp" value={currency} onChange={e => setCurrency(e.target.value)}>
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
          </select>
        </div>
        <div className="fg">
          <label className="lbl">{t.sessionDuration}</label>
          <input className="inp" type="number" value={defaultDuration} min="5" max="180"
            onChange={e => setDefaultDuration(parseInt(e.target.value)||45)} />
        </div>
      </SC>

      <SC title="📋 Datos" action={<button className="btn btno btnsm" onClick={() => setEd(!ed)}>{ed?"Cancelar":"✏️"}</button>}>
        {!ed
          ? [["Nombre",user.name],["Email",user.email],["Especialidad",user.specialty]].map(([l,v]) => (
            <div key={l} className="hxf"><div className="hxl">{l}</div><div className="hxv">{v}</div></div>
          ))
          : <>
            {[["Nombre","name","text"],["Email","email","email"],["Especialidad","specialty","text"]].map(([l,k,tp]) => (
              <div className="fg" key={k}><label className="lbl">{l}</label>
                <input className="inp" type={tp} defaultValue={user[k]} onChange={e => setUser(prev => ({...prev,[k]:e.target.value}))} />
              </div>
            ))}
            <button className="btn btnp btnfull" onClick={() => setEd(false)}>{t.save}</button>
          </>
        }
      </SC>

      <SC title="🔒 Contraseña">
        <div className="fg"><label className="lbl">Actual</label><input className="inp" type="password" value={pwF.current} onChange={e => setPwF({...pwF,current:e.target.value})} /></div>
        <div className="fg"><label className="lbl">Nueva</label><input className="inp" type="password" value={pwF.newPw} onChange={e => setPwF({...pwF,newPw:e.target.value})} /></div>
        <div className="fg"><label className="lbl">Confirmar nueva</label><input className="inp" type="password" value={pwF.confirm} onChange={e => setPwF({...pwF,confirm:e.target.value})} /></div>
        {pwErr && <div className="alert alrtd">{pwErr}</div>}
        {pwOk && <div className="alert alrts">✅ Contraseña actualizada.</div>}
        <button className="btn btno btnfull" onClick={changePw}>Cambiar contraseña</button>
      </SC>

      <button className="btn btnd btnfull" style={{ marginTop:8 }} onClick={onLogout}>{t.logout}</button>
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
export default function HadrionApp() {
  const stored = load();

  const [users, setUsersRaw] = useState(stored?.users || INIT_USERS);
  const [user, setUser] = useState(stored?.user || null);
  const [active, setActive] = useState("dashboard");
  const [patients, setPatientsRaw] = useState(stored?.patients || INIT_PATIENTS);
  const [sessions, setSessionsRaw] = useState(stored?.sessions || INIT_SESSIONS);
  const [payments, setPaymentsRaw] = useState(stored?.payments || INIT_PAYMENTS);
  const [agendaItems, setAgendaRaw] = useState(stored?.agendaItems || [
    { id:1, patient:"Valentina López", time:"09:00", end:"09:45", type:"Sesión", color:C.terra, date:todayISO(), duration:45 },
  ]);
  const [selPatId, setSelPatId] = useState(null);
  const [lang, setLang] = useState(stored?.lang || "es");
  const [currency, setCurrency] = useState(stored?.currency || "UYU");
  const [defaultDuration, setDefaultDuration] = useState(stored?.defaultDuration || 45);

  const persist = useCallback((extra = {}) => {
    save({ users, user, patients, sessions, payments, agendaItems, lang, currency, defaultDuration, ...extra });
  }, [users, user, patients, sessions, payments, agendaItems, lang, currency, defaultDuration]);

  const mk = (setFn, rawFn, key) => v => {
    setFn(v);
    const val = typeof v === "function" ? v(eval(key)) : v;
    save({ users, user, patients, sessions, payments, agendaItems, lang, currency, defaultDuration, [key]: val });
  };

  const setUsers = v => { setUsersRaw(v); const val = typeof v==="function"?v(users):v; save({users:val,user,patients,sessions,payments,agendaItems,lang,currency,defaultDuration}); };
  const setPatients = v => { setPatientsRaw(v); const val = typeof v==="function"?v(patients):v; save({users,user,patients:val,sessions,payments,agendaItems,lang,currency,defaultDuration}); };
  const setSessions = v => { setSessionsRaw(v); const val = typeof v==="function"?v(sessions):v; save({users,user,patients,sessions:val,payments,agendaItems,lang,currency,defaultDuration}); };
  const setPayments = v => { setPaymentsRaw(v); const val = typeof v==="function"?v(payments):v; save({users,user,patients,sessions,payments:val,agendaItems,lang,currency,defaultDuration}); };
  const setAgenda = v => { setAgendaRaw(v); const val = typeof v==="function"?v(agendaItems):v; save({users,user,patients,sessions,payments,agendaItems:val,lang,currency,defaultDuration}); };

  const handleSetLang = l => { setLang(l); save({users,user,patients,sessions,payments,agendaItems,lang:l,currency,defaultDuration}); };
  const handleSetCurrency = c => { setCurrency(c); save({users,user,patients,sessions,payments,agendaItems,lang,currency:c,defaultDuration}); };
  const handleSetDuration = d => { setDefaultDuration(d); save({users,user,patients,sessions,payments,agendaItems,lang,currency,defaultDuration:d}); };

  const logout = () => { setUser(null); setActive("dashboard"); save({users,user:null,patients,sessions,payments,agendaItems,lang,currency,defaultDuration}); };

  const setUserFull = u => { setUser(u); save({users,user:u,patients,sessions,payments,agendaItems,lang,currency,defaultDuration}); };

  const t = T[lang];

  const NAV_ITEMS = [
    { id:"dashboard",  l:t.dashboard,  i:"🏠", s:lang==="en"?"Main":"Principal" },
    { id:"agenda",     l:t.agenda,     i:"📅" },
    { id:"patients",   l:t.patients,   i:"👥" },
    { id:"payments",   l:t.payments,   i:"💳" },
    { id:"sessions",   l:t.sessions,   i:"📝" },
    { id:"history",    l:t.history,    i:"📋", s:lang==="en"?"Clinical":"Clínico" },
    { id:"objectives", l:t.objectives, i:"🎯" },
    { id:"phonology",  l:t.phonology,  i:"🔤" },
    { id:"reports",    l:t.reports,    i:"📊" },
    { id:"ia",         l:t.ia,         i:"🧠", s:lang==="en"?"Tools":"Herramientas" },
    { id:"resources",  l:t.resources,  i:"📚" },
    { id:"admin",      l:t.admin,      i:"🔐", s:"Admin", adminOnly:true },
    { id:"profile",    l:t.profile,    i:"👤" },
  ];

  const pages = {
    dashboard: <Dashboard user={user} patients={patients} sessions={sessions} payments={payments} setActive={setActive} agendaItems={agendaItems} lang={lang} currency={currency} />,
    agenda: <Agenda patients={patients} items={agendaItems} setItems={setAgenda} lang={lang} defaultDuration={defaultDuration} />,
    patients: <Patients patients={patients} setPatients={setPatients} setActive={setActive} setSelPatId={setSelPatId} sessions={sessions} lang={lang} />,
    payments: <Payments patients={patients} payments={payments} setPayments={setPayments} lang={lang} currency={currency} setCurrency={handleSetCurrency} />,
    sessions: <Sessions patients={patients} sessions={sessions} setSessions={setSessions} setPatients={setPatients} lang={lang} defaultDuration={defaultDuration} />,
    history: <History patients={patients} sessions={sessions} selectedPatientId={selPatId} lang={lang} />,
    objectives: <Objectives lang={lang} />,
    phonology: <Phonology lang={lang} />,
    reports: <Reports patients={patients} sessions={sessions} payments={payments} lang={lang} currency={currency} />,
    ia: <IAAsistente patients={patients} lang={lang} />,
    resources: <Resources lang={lang} />,
    admin: user?.role==="admin" ? <Admin users={users} setUsers={setUsers} lang={lang} currentUser={user} /> : <div className="fu"><div className="alert alrtd">🔐 Solo administradores.</div></div>,
    profile: <Profile user={user} onLogout={logout} setUser={setUserFull} lang={lang} setLang={handleSetLang} currency={currency} setCurrency={handleSetCurrency} defaultDuration={defaultDuration} setDefaultDuration={handleSetDuration} />,
  };

  const bnItems = [
    { id:"dashboard", l:t.dashboard, i:"🏠" },
    { id:"patients",  l:t.patients,  i:"👥" },
    { id:"agenda",    l:t.agenda,    i:"📅" },
    { id:"sessions",  l:t.sessions,  i:"📝" },
    { id: user?.role==="admin"?"admin":"profile", l:user?.role==="admin"?t.admin:t.profile, i:user?.role==="admin"?"🔐":"👤" },
  ];

  if (!user) return (
    <>
      <style>{CSS}</style>
      <Login onLogin={setUserFull} users={users} lang={lang} />
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <div className="sidebar">
          <div className="slogo">
            <div className="slogoicon">H</div>
            <div><div className="slogoname">Hadrion</div><div className="slogosub">Plataforma Clínica</div></div>
          </div>
          {NAV_ITEMS.filter(n => !n.adminOnly || user?.role==="admin").map(n => (
            <div key={n.id}>
              {n.s && <div className="ssec">{n.s}</div>}
              <div className={`sitem${active===n.id?" active":""}`} onClick={() => setActive(n.id)}>
                <span className="sicon">{n.i}</span>{n.l}
                {n.id==="admin" && <span className="sbadge">Admin</span>}
              </div>
            </div>
          ))}
          <div className="suser">
            <div style={{ fontSize:13, fontWeight:600 }}>{user.name}</div>
            <div style={{ fontSize:11, color:C.grayL }}>{user.specialty}</div>
            <div style={{ display:"flex", gap:6, marginTop:6 }}>
              <button className="btn btnsm" style={{ fontSize:10, padding:"4px 8px", background:lang==="es"?C.terra:"transparent", color:lang==="es"?"white":C.grayL, border:`1px solid ${C.sand}` }} onClick={() => handleSetLang("es")}>ES</button>
              <button className="btn btnsm" style={{ fontSize:10, padding:"4px 8px", background:lang==="en"?C.terra:"transparent", color:lang==="en"?"white":C.grayL, border:`1px solid ${C.sand}` }} onClick={() => handleSetLang("en")}>EN</button>
            </div>
          </div>
        </div>
        <div className="mwrap">
          <div className="tbar">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", paddingBottom:6 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:13, fontWeight:600 }}>{user.name.split(" ")[0]}</div>
                  <div style={{ fontSize:10, color:C.grayL }}>{user.role==="admin"?"👑 Admin":"Pro"} · {currency}</div>
                </div>
                <div onClick={() => setActive("profile")} style={{ width:36, height:36, borderRadius:10, background:user.color, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                  {user.avatar}
                </div>
              </div>
            </div>
          </div>
          <div className="pbody">{pages[active] || pages.dashboard}</div>
          <div style={{ textAlign:"center", padding:"14px 20px", fontSize:11, color:"#9B9590", borderTop:`1px solid ${C.sand}` }}>
            <div style={{ fontWeight:700, color:C.terraD }}>Hadrion — Plataforma Terapéutica</div>
            <div>(c) 2025 Adriana Soba · Uruguay · comunipro12@gmail.com</div>
          </div>
        </div>
        <nav className="bnav noprint">
          {bnItems.map(n => (
            <button key={n.id} className={`bn${active===n.id?" active":""}`} onClick={() => setActive(n.id)}>
              <span className="bnicon">{n.i}</span>{n.l}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
import { useState, useEffect, useCallback } from "react";

// ─── PALETA ───────────────────────────────────────────────────────────────────
const C = {
  terra:"#9B7EBD", terraL:"#D4BCE8", terraD:"#7B5EA7", terraF:"#F5F0FA",
  cream:"#FDF8FF", sand:"#EDE0F5", sandD:"#C9B8E8",
  sage:"#E8719C", sageF:"#FDE8F0", forest:"#C0396B",
  charcoal:"#2C2C2C", gray:"#6B6560", grayL:"#9B9590",
  white:"#FFFFFF", danger:"#C0392B", dangerF:"#FDECEA",
  info:"#5B8DB8", infoF:"#EBF3FB",
  purple:"#8B7BB5", purpleF:"#F0EDF8",
  gold:"#E8A020", goldF:"#FEF3E0",
  green:"#2ECC71", greenF:"#E8F8EF",
};

// ─── IDIOMAS ──────────────────────────────────────────────────────────────────
const T = {
  es: {
    dashboard:"Panel", agenda:"Agenda", patients:"Pacientes", payments:"Pagos",
    sessions:"Registros Clínicos", history:"Historia Clínica", objectives:"Objetivos",
    activities:"Actividades", phonology:"Conciencia Fon.", reports:"Reportes",
    plan:"Plan Colaborativo", ia:"Asistente IA", resources:"Recursos",
    admin:"Administración", profile:"Mi Perfil",
    welcome:"Bienvenida a tu plataforma clínica",
    newPatient:"+ Nuevo paciente", save:"Guardar", cancel:"Cancelar",
    logout:"Cerrar sesión", language:"Idioma",
    sessionDuration:"Duración de sesión (minutos)",
    currency:"Moneda", paid:"Pagado", pending:"Pendiente",
    print:"Imprimir", copy:"Copiar texto", generate:"Generar",
    loading:"Generando con IA...", error:"Error de conexión",
    editTemplate:"Editar plantilla", fillTemplate:"Rellenar",
  },
  en: {
    dashboard:"Dashboard", agenda:"Schedule", patients:"Patients", payments:"Payments",
    sessions:"Clinical Records", history:"Clinical History", objectives:"Objectives",
    activities:"Activities", phonology:"Phonological Aw.", reports:"Reports",
    plan:"Collaborative Plan", ia:"AI Assistant", resources:"Resources",
    admin:"Administration", profile:"My Profile",
    welcome:"Welcome to your clinical platform",
    newPatient:"+ New patient", save:"Save", cancel:"Cancel",
    logout:"Log out", language:"Language",
    sessionDuration:"Session duration (minutes)",
    currency:"Currency", paid:"Paid", pending:"Pending",
    print:"Print", copy:"Copy text", generate:"Generate",
    loading:"Generating with AI...", error:"Connection error",
    editTemplate:"Edit template", fillTemplate:"Fill in",
  }
};

// ─── FONEMAS con acentos TTS correctos ───────────────────────────────────────
const PHONEMES = ["A","E","I","O","U","B","C","CH","D","F","G","J","L","LL","M","N","Ñ","P","R","RR","S","T","V","Y","Z"];

const PHONEME_TTS = {
  "A":"a","E":"e","I":"i","O":"o","U":"u",
  "B":"be","C":"ce","CH":"che","D":"de","F":"efe",
  "G":"ge","J":"jota","L":"ele","LL":"elle","M":"eme",
  "N":"ene","Ñ":"eñe","P":"pe","R":"erre","RR":"erre doble",
  "S":"ese","T":"te","V":"uve","Y":"ye","Z":"zeta"
};

const PHONEME_EMOJI = {
  "A":["✈️","🌳","🕷️","🐝","🦅","⚓","🏹","🐿️"],
  "E":["🐘","⭐","🪜","🪞","🧹","🧝","🛡️"],
  "I":["⛪","🦎","🏝️","🧲","🐛","👦"],
  "O":["🐻","🐑","👁️","🪣","🐋","🏗️"],
  "U":["🍇","👔","🦄","🏺","🥄"],
  "B":["👄","🚢","🚲","🐋","🥾","🫏","👜"],
  "C":["🏠","🛏️","🐇","🍳","🚛","🚗","🐴"],
  "CH":["🍫","🍬","🐷","🦺","🪬"],
  "D":["👆","🎲","🦕","🧝","🐉","🍬","🦷"],
  "F":["🦭","🍓","🌸","🔥","👨‍👩‍👧","🎸","🍎"],
  "G":["🐱","🎈","🍪","🦍","🌻","🐛","🎸"],
  "J":["🦒","🧃","🌻","🪆","🧼","🐗"],
  "L":["🌙","✏️","🥛","📚","🦜","🦎","🍋"],
  "LL":["🗝️","🛞","🌧️","🦙","😢"],
  "M":["🦋","🪑","🍎","🐒","🎒","🔨","🧙"],
  "N":["☁️","🍊","👃","❄️","🐦","🔢","🌰"],
  "Ñ":["🦆","🍍","💅","🎶","🌊"],
  "P":["🦆","⚽","🐕","🎹","🚪","🕊️","🐙"],
  "R":["🐭","🤖","🌹","📏","⌚","🛞","🐸"],
  "RR":["🚗","🐕","🌍","📋","🫏","⛰️","🗼"],
  "S":["☀️","🪑","🍵","🐸","🌱","🐍","☂️"],
  "T":["✂️","🚂","🐢","🐯","🍅","🥁","📺"],
  "V":["🐄","🎻","🪟","👗","🌋","⛵","🥦"],
  "Y":["🪀","🍦","⛵","🌿","🐎"],
  "Z":["👟","🦊","🥕","🦓","🍋"],
};

// Palabras CON acentos para TTS correcto
const PHONEME_WORDS = {
  "A":["avión","árbol","araña","abeja","águila","ancla","arco","ardilla"],
  "E":["elefante","estrella","escalera","espejo","escoba","enano","escudo"],
  "I":["iglesia","iguana","isla","imán","insecto","índio"],
  "O":["oso","oveja","ojo","olla","oruga","orca","obra"],
  "U":["uva","uniforme","unicornio","urna","útiles"],
  "B":["boca","barco","bicicleta","ballena","bota","burro","bolsa"],
  "C":["casa","cama","conejo","cocina","camión","carro","caballo"],
  "CH":["chocolate","chupete","chancho","chaleco","chicle"],
  "D":["dedo","dado","dinosaurio","duende","dragón","dulce","diente"],
  "F":["foca","fresa","flor","fuego","familia","flauta","fruta"],
  "G":["gato","globo","galleta","gorila","girasol","gusano","guitarra"],
  "J":["jirafa","jugo","jardín","juguete","jabón","jabalí"],
  "L":["luna","lápiz","leche","libro","loro","lagarto","limón"],
  "LL":["llave","llanta","lluvia","llama","llorar"],
  "M":["mariposa","mesa","manzana","mono","mochila","martillo","mago"],
  "N":["nube","naranja","nariz","nieve","nido","número","nuez"],
  "Ñ":["ñandú","niño","uñas","piña","muñeca"],
  "P":["pato","pelota","perro","piano","puerta","paloma","pulpo"],
  "R":["ratón","robot","rosa","regla","reloj","rueda","rana"],
  "RR":["carro","perro","tierra","pizarra","burro","cerro","torre"],
  "S":["sol","silla","sopa","sapo","semilla","serpiente","sombrilla"],
  "T":["tijeras","tren","tortuga","tigre","tomate","tambor","televisión"],
  "V":["vaca","violín","ventana","vestido","volcán","velero","verdura"],
  "Y":["yoyó","yogur","yate","yerba","yegua"],
  "Z":["zapato","zorro","zanahoria","cebra","zumo"],
};

// ─── MONEDAS ──────────────────────────────────────────────────────────────────
const CURRENCIES = [
  { code:"UYU", symbol:"$U", name:"Pesos uruguayos" },
  { code:"USD", symbol:"US$", name:"Dólares" },
  { code:"ARS", symbol:"$", name:"Pesos argentinos" },
  { code:"CLP", symbol:"$", name:"Pesos chilenos" },
  { code:"BRL", symbol:"R$", name:"Reales" },
  { code:"EUR", symbol:"€", name:"Euros" },
];

// ─── INSTITUCIONES DE PAGO ────────────────────────────────────────────────────
const PAYMENT_INSTITUTIONS = [
  "Particular","Obra social","Mutual","Prepaga","BPS","ASSE","FONASA","NHS","Seguro privado","Otra institución"
];

// ─── PLANTILLAS DE SESIÓN EDITABLES ──────────────────────────────────────────
const SESSION_TEMPLATES = {
  fono: {
    name: "Fonoaudiología",
    fields: [
      { key:"objetivo", label:"Objetivo trabajado", type:"text" },
      { key:"actividades", label:"Actividades realizadas", type:"textarea" },
      { key:"logros", label:"Logros de la sesión", type:"textarea" },
      { key:"dificultades", label:"Dificultades observadas", type:"textarea" },
      { key:"tarea", label:"Tarea para casa", type:"text" },
      { key:"proxima", label:"Plan próxima sesión", type:"text" },
      { key:"observaciones", label:"Observaciones adicionales", type:"textarea" },
    ]
  },
  psico: {
    name: "Psicología / Psicopedagogía",
    fields: [
      { key:"objetivo", label:"Objetivo de la sesión", type:"text" },
      { key:"tecnica", label:"Técnica utilizada", type:"text" },
      { key:"respuesta", label:"Respuesta del paciente", type:"textarea" },
      { key:"regulacion", label:"Regulación emocional observada", type:"text" },
      { key:"tarea", label:"Indicaciones para casa", type:"textarea" },
      { key:"observaciones", label:"Observaciones", type:"textarea" },
    ]
  },
  general: {
    name: "Registro general",
    fields: [
      { key:"objetivo", label:"Objetivo", type:"text" },
      { key:"nota", label:"Notas clínicas", type:"textarea" },
      { key:"progreso", label:"Progreso (%)", type:"number" },
      { key:"tarea", label:"Tarea para casa", type:"text" },
      { key:"proxima", label:"Próxima sesión", type:"text" },
    ]
  }
};

// ─── DATOS INICIALES ──────────────────────────────────────────────────────────
const INIT_USERS = [
  { id:1, name:"Adriana Soba", email:"comunipro12@gmail.com", password:"admin123",
    role:"admin", specialty:"Fonoaudióloga", plan:"Pro", status:"active",
    createdAt:"01/01/2025", avatar:"AS", color:C.terra, lastLogin:"Hoy 08:30" },
];

const INIT_PATIENTS = [
  { id:1, name:"Valentina López", age:7, diagnosis:"TEL", sessions:12,
    nextSession:"Lun 02/06 10:00", avatar:"VL", color:C.terra,
    phone:"(+598) 9 8765 4321", email:"vlopez@mail.com",
    guardian:"María López (madre)", notes:"Dificultad en fonemas fricativos. Buena disposición.",
    goals:["Producción /s/ en posición inicial","Discriminación auditiva de pares mínimos"], status:"active" },
  { id:2, name:"Martín García", age:9, diagnosis:"Dislexia", sessions:8,
    nextSession:"Mié 04/06 09:00", avatar:"MG", color:C.sage,
    phone:"(+598) 9 7654 3210", email:"mgarcia@mail.com",
    guardian:"Pedro García (padre)", notes:"Confusión persistente b/d.",
    goals:["Decodificación b/d/p/q","Velocidad lectora 80 ppm"], status:"active" },
  { id:3, name:"Sofía Ramírez", age:6, diagnosis:"TDAH", sessions:15,
    nextSession:"Jue 05/06 11:00", avatar:"SR", color:C.purple,
    phone:"(+598) 9 6543 2109", email:"sramirez@mail.com",
    guardian:"Ana Ramírez (madre)", notes:"Alta dispersión.",
    goals:["Atención sostenida 15 min","Autorregulación emocional"], status:"active" },
];

const INIT_SESSIONS = [
  { id:1, patientId:1, patient:"Valentina López", date:"20/05/2025",
    objective:"Fonemas fricativos /s/",
    note:"Logró producir /s/ en posición inicial con apoyo visual.",
    progress:70, homework:"Practicar /s/ frente al espejo 5 min diarios",
    estado:"regulado", atencion:"sostenida", participacion:"buena",
    templateData:{} },
];

const INIT_PAYMENTS = [
  { id:1, patientId:1, patient:"Valentina López", amount:1500, currency:"UYU",
    institution:"Particular", date:"20/05/2025", method:"Transferencia", status:"pagado" },
  { id:2, patientId:2, patient:"Martín García", amount:1200, currency:"UYU",
    institution:"BPS", date:"18/05/2025", method:"Efectivo", status:"pagado" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const speak = (text, lang = "es-UY") => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang; u.rate = 0.72; u.pitch = 1.05;
  window.speechSynthesis.speak(u);
};

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const todayISO = () => new Date().toISOString().slice(0,10);
const addMins = (t, m) => {
  const [h, min] = t.split(":").map(Number);
  const tot = h*60+min+m;
  return `${String(Math.floor(tot/60)).padStart(2,"0")}:${String(tot%60).padStart(2,"0")}`;
};
const formatCurrency = (amount, code) => {
  const c = CURRENCIES.find(x => x.code === code) || CURRENCIES[0];
  return `${c.symbol}${Number(amount).toLocaleString("es-UY")}`;
};

// ─── STORAGE ──────────────────────────────────────────────────────────────────
const SK = "hadrion_v4";
const load = () => { try { const r = localStorage.getItem(SK); return r ? JSON.parse(r) : null; } catch { return null; } };
const save = d => { try { localStorage.setItem(SK, JSON.stringify(d)); } catch {} };

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html,body{height:100%;background:#FDF8FF;}
.app{font-family:'Plus Jakarta Sans',sans-serif;min-height:100vh;background:#FDF8FF;display:flex;flex-direction:column;}
@media(min-width:900px){
  .app{flex-direction:row;}
  .sidebar{display:flex!important;flex-direction:column;width:248px;min-height:100vh;background:white;border-right:1px solid #EDE0F5;padding:24px 0;position:sticky;top:0;height:100vh;overflow-y:auto;}
  .bnav{display:none!important;}
  .mwrap{flex:1;overflow-y:auto;height:100vh;}
  .tbar{padding:18px 32px 0;}
  .pbody{padding:14px 32px 32px;}
}
@media(max-width:899px){
  .sidebar{display:none;}
  .mwrap{flex:1;}
  .tbar{padding:12px 16px 0;}
  .pbody{padding:10px 16px 84px;}
}
.slogo{display:flex;align-items:center;gap:10px;padding:0 20px 26px;}
.slogoicon{width:40px;height:40px;background:#9B7EBD;border-radius:12px;display:flex;align-items:center;justify-content:center;color:white;font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;}
.slogoname{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:#2C2C2C;}
.slogosub{font-size:10px;color:#9B9590;margin-top:-2px;}
.ssec{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.3px;color:#9B9590;padding:12px 20px 4px;}
.sitem{display:flex;align-items:center;gap:11px;padding:10px 20px;cursor:pointer;font-size:13px;font-weight:500;color:#6B6560;transition:all .15s;border-left:3px solid transparent;margin:1px 0;}
.sitem:hover{background:#F5F0FA;color:#9B7EBD;}
.sitem.active{background:#F5F0FA;color:#9B7EBD;border-left-color:#9B7EBD;font-weight:600;}
.sicon{font-size:15px;width:20px;text-align:center;}
.sbadge{margin-left:auto;background:#9B7EBD;color:white;font-size:10px;font-weight:700;padding:1px 7px;border-radius:20px;}
.suser{padding:14px 20px;border-top:1px solid #EDE0F5;margin-top:auto;}
.bnav{position:fixed;bottom:0;left:0;right:0;background:white;border-top:1px solid #EDE0F5;display:flex;z-index:50;box-shadow:0 -2px 10px rgba(0,0,0,.07);}
.bn{flex:1;padding:10px 2px;border:none;background:none;cursor:pointer;font-size:9px;font-family:'Plus Jakarta Sans',sans-serif;color:#9B9590;display:flex;flex-direction:column;align-items:center;gap:3px;font-weight:500;min-height:56px;justify-content:center;}
.bn.active{color:#9B7EBD;}
.bnicon{font-size:19px;}
.card{background:white;border-radius:16px;padding:16px;box-shadow:0 1px 8px rgba(0,0,0,.06);border:1px solid rgba(0,0,0,.04);}
.sgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:16px;}
@media(min-width:600px){.sgrid{grid-template-columns:repeat(4,1fr);}}
.sc2{background:white;border-radius:14px;padding:14px;text-align:center;box-shadow:0 1px 6px rgba(0,0,0,.05);}
.snum{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;color:#9B7EBD;}
.slbl{font-size:11px;color:#9B9590;font-weight:500;}
.btn{border:none;border-radius:11px;padding:10px 17px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;display:inline-flex;align-items:center;gap:6px;}
.btnp{background:#9B7EBD;color:white;}
.btnp:hover{background:#7B5EA7;}
.btnp:disabled{background:#C9B8E8;cursor:not-allowed;}
.btno{background:transparent;border:1.5px solid #9B7EBD;color:#9B7EBD;}
.btno:hover{background:#F5F0FA;}
.btng{background:#EDE0F5;color:#2C2C2C;}
.btng:hover{background:#C9B8E8;}
.btnd{background:#FDECEA;color:#C0392B;}
.btngold{background:#FEF3E0;color:#E8A020;}
.btnsm{padding:9px 13px;font-size:11px;border-radius:8px;min-height:36px;}
.btnfull{width:100%;justify-content:center;margin-top:8px;}
.inp{width:100%;border:1.5px solid #EDE0F5;border-radius:10px;padding:10px 12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:#2C2C2C;background:white;outline:none;transition:border .15s;}
.inp:focus{border-color:#9B7EBD;}
textarea.inp{resize:vertical;min-height:74px;}
.lbl{font-size:11px;font-weight:700;color:#9B9590;text-transform:uppercase;letter-spacing:.6px;display:block;margin-bottom:4px;}
.fg{margin-bottom:12px;}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100;display:flex;align-items:flex-end;justify-content:center;}
@media(min-width:600px){.overlay{align-items:center;}}
.modal{background:white;border-radius:24px 24px 0 0;padding:22px 18px 34px;width:100%;max-height:92vh;overflow-y:auto;}
@media(min-width:600px){.modal{border-radius:20px;max-width:560px;}}
.modalt{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#2C2C2C;margin-bottom:16px;}
.xbtn{float:right;background:none;border:none;font-size:22px;cursor:pointer;color:#9B9590;padding:0 0 6px 8px;}
.pt{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:#2C2C2C;}
.ps{font-size:13px;color:#9B9590;margin-top:2px;}
.badge{display:inline-block;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600;}
.prog{background:#EDE0F5;border-radius:8px;height:7px;overflow:hidden;}
.progf{height:100%;border-radius:8px;background:linear-gradient(90deg,#9B7EBD,#7B5EA7);transition:width .4s;}
.sep{height:1px;background:#EDE0F5;margin:12px 0;}
.sc{background:white;border-radius:18px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.07);margin-bottom:14px;}
.sch{padding:14px 16px;border-bottom:1px solid #EDE0F5;display:flex;align-items:center;justify-content:space-between;}
.scb{padding:14px 16px;}
.hxf{background:#FDF8FF;border-radius:10px;padding:10px 12px;margin-bottom:7px;}
.hxl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#9B9590;margin-bottom:3px;}
.hxv{font-size:13px;color:#2C2C2C;line-height:1.5;}
.alert{border-radius:11px;padding:11px 13px;font-size:13px;margin-bottom:12px;}
.alrti{background:#EBF3FB;color:#5B8DB8;}
.alrts{background:#E8F8EF;color:#C0396B;}
.alrtw{background:#FEF3E0;color:#E8A020;}
.alrtd{background:#FDECEA;color:#C0392B;}
.welcome{background:linear-gradient(135deg,#9B7EBD,#7B5EA7);border-radius:18px;padding:20px;color:white;margin-bottom:16px;position:relative;overflow:hidden;}
.wname{font-family:'Cormorant Garamond',serif;font-size:25px;font-weight:700;}
.qg{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
@media(min-width:600px){.qg{grid-template-columns:repeat(4,1fr);}}
.qcard{background:white;border-radius:14px;padding:14px;text-align:center;cursor:pointer;transition:transform .15s;box-shadow:0 1px 6px rgba(0,0,0,.05);}
.qcard:hover{transform:translateY(-2px);}
.av{border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:700;color:white;flex-shrink:0;}
.chip{padding:7px 11px;border-radius:20px;border:1.5px solid #EDE0F5;background:white;font-size:12px;font-weight:500;cursor:pointer;color:#6B6560;font-family:'Plus Jakarta Sans',sans-serif;transition:all .13s;min-height:36px;}
.chip.sel{background:#F5F0FA;border-color:#9B7EBD;color:#9B7EBD;font-weight:600;}
.chiprow{display:flex;flex-wrap:wrap;gap:6px;margin:5px 0;}
.filrow{display:flex;gap:7px;overflow-x:auto;padding-bottom:4px;margin-bottom:12px;}
.filrow::-webkit-scrollbar{display:none;}
.filbtn{padding:7px 13px;border-radius:20px;border:1.5px solid #EDE0F5;background:white;font-size:12px;font-weight:500;cursor:pointer;white-space:nowrap;color:#6B6560;font-family:'Plus Jakarta Sans',sans-serif;flex-shrink:0;min-height:36px;}
.filbtn.active{background:#9B7EBD;color:white;border-color:#9B7EBD;}
.phgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:12px 0;}
@media(min-width:500px){.phgrid{grid-template-columns:repeat(6,1fr);}}
.phbtn{aspect-ratio:1;border-radius:12px;border:2px solid #EDE0F5;background:white;font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;cursor:pointer;transition:all .17s;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#2C2C2C;gap:2px;min-height:80px;padding:4px;}
.phbtn:hover{border-color:#9B7EBD;background:#F5F0FA;}
.phbtn.sel{border-color:#9B7EBD;background:#9B7EBD;color:white;}
.roletag{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;}
.radmin{background:#FEF3E0;color:#E8A020;}
.rpro{background:#EBF3FB;color:#5B8DB8;}
.dayl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#9B9590;margin:14px 0 6px;}
.atab{flex:1;padding:9px 6px;border:none;background:transparent;border-radius:9px;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;color:#6B6560;transition:all .15s;min-height:38px;}
.atab.active{background:white;color:#9B7EBD;box-shadow:0 1px 4px rgba(0,0,0,.1);}
.atabrow{display:flex;gap:4px;background:#EDE0F5;border-radius:12px;padding:4px;margin-bottom:16px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(13px);}to{opacity:1;transform:translateY(0);}}
.fu{animation:fadeUp .28s ease forwards;}
@keyframes spin{to{transform:rotate(360deg)}}
.spinner{width:24px;height:24px;border:3px solid #EDE0F5;border-top-color:#9B7EBD;border-radius:50%;animation:spin .8s linear infinite;margin:0 auto;}
@media print{.noprint{display:none!important;}body{background:white;}}
`;

// ─── COMPONENTES BASE ─────────────────────────────────────────────────────────
function Modal({ title, onClose, children, wide }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={wide ? { maxWidth:700 } : {}} onClick={e => e.stopPropagation()}>
        <button className="xbtn" onClick={onClose}>✕</button>
        {title && <div className="modalt">{title}</div>}
        {children}
      </div>
    </div>
  );
}

function SC({ title, action, children }) {
  return (
    <div className="sc">
      <div className="sch">
        <span style={{ fontWeight:700, fontSize:14, color:C.charcoal }}>{title}</span>
        {action}
      </div>
      <div className="scb">{children}</div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
const NAV = [
  { id:"dashboard", l:"dashboard", i:"🏠", s:"principal" },
  { id:"agenda",    l:"agenda",    i:"📅" },
  { id:"patients",  l:"patients",  i:"👥" },
  { id:"payments",  l:"payments",  i:"💳" },
  { id:"sessions",  l:"sessions",  i:"📝" },
  { id:"history",   l:"history",   i:"📋", s:"clinico" },
  { id:"objectives",l:"objectives",i:"🎯" },
  { id:"phonology", l:"phonology", i:"🔤" },
  { id:"reports",   l:"reports",   i:"📊" },
  { id:"ia",        l:"ia",        i:"🧠", s:"herramientas" },
  { id:"resources", l:"resources", i:"📚" },
  { id:"admin",     l:"admin",     i:"🔐", s:"admin", adminOnly:true },
  { id:"profile",   l:"profile",   i:"👤" },
];

function Sidebar({ active, setActive, user, lang }) {
  return (
    <div className="sidebar">
      <div className="slogo">
        <div className="slogoicon">H</div>
        <div><div className="slogoname">Hadrion</div><div className="slogosub">Plataforma Clínica</div></div>
      </div>
      {NAV.filter(n => !n.adminOnly || user?.role === "admin").map(n => (
        <div key={n.id}>
          {n.s && <div className="ssec">{lang === "en" ? n.s.toUpperCase() : n.s.toUpperCase()}</div>}
          <div className={`sitem${active === n.id ? " active" : ""}`} onClick={() => setActive(n.id)}>
            <span className="sicon">{n.i}</span>{T[lang][n.l] || n.l}
            {n.id === "admin" && <span className="sbadge">Admin</span>}
          </div>
        </div>
      ))}
      <div className="suser">
        <div style={{ fontSize:13, fontWeight:600, color:C.charcoal }}>{user?.name}</div>
        <div style={{ fontSize:11, color:C.grayL }}>{user?.specialty}</div>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ onLogin, users, lang }) {
  const [f, setF] = useState({ email:"", pass:"", show:false });
  const [err, setErr] = useState("");
  const login = () => {
    if (!f.email || !f.pass) { setErr("Completá todos los campos."); return; }
    const u = users.find(u => u.email === f.email && u.password === f.pass);
    if (!u) { setErr("Email o contraseña incorrectos."); return; }
    if (u.status === "inactive") { setErr("Cuenta inactiva."); return; }
    onLogin(u);
  };
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#F5F0FA,#FDF8FF,#EBF3FB)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"white", borderRadius:24, padding:"36px 26px", width:"100%", maxWidth:400, boxShadow:"0 8px 40px rgba(0,0,0,.12)" }}>
        <div style={{ textAlign:"center", marginBottom:26 }}>
          <div style={{ width:62, height:62, background:C.terra, borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 13px", fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:"white" }}>H</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700, color:C.charcoal }}>Hadrion</div>
          <div style={{ fontSize:13, color:C.grayL }}>Plataforma terapéutica — Uruguay</div>
        </div>
        <div className="fg"><label className="lbl">Email</label>
          <input className="inp" type="email" placeholder="tu@email.com" value={f.email} onChange={e => setF({...f, email:e.target.value})} />
        </div>
        <div className="fg"><label className="lbl">Contraseña</label>
          <div style={{ position:"relative" }}>
            <input className="inp" type={f.show?"text":"password"} placeholder="••••••••" value={f.pass}
              onChange={e => setF({...f, pass:e.target.value})} onKeyDown={e => e.key==="Enter" && login()}
              style={{ paddingRight:44 }} />
            <button onClick={() => setF({...f, show:!f.show})}
              style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:16, color:C.grayL }}>
              {f.show ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        {err && <div className="alert alrtd">{err}</div>}
        <button className="btn btnp btnfull" style={{ borderRadius:12 }} onClick={login}>→ Ingresar</button>
        <div style={{ marginTop:12, background:C.terraF, borderRadius:12, padding:12, fontSize:12, color:C.terraD }}>
          <strong>Demo:</strong> comunipro12@gmail.com / admin123
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ user, patients, sessions, payments, setActive, agendaItems, lang, currency }) {
  const total = payments.filter(p => p.status==="pagado").reduce((a,p) => a + p.amount, 0);
  const todayKey = todayISO();
  const todayCount = agendaItems.filter(a => a.date === todayKey).length;
  const t = T[lang];
  return (
    <div className="fu">
      <div className="welcome">
        <div style={{ fontSize:12, opacity:.7, marginBottom:3 }}>{cap(new Date().toLocaleDateString(lang==="en"?"en-US":"es-UY",{weekday:"long",day:"numeric",month:"long"}))}</div>
        <div className="wname">{lang==="en"?"Hello":"Hola"}, {user.name.split(" ")[0]} 👋</div>
        <div style={{ fontSize:13, opacity:.82, marginTop:3 }}>{t.welcome}</div>
      </div>
      <div className="sgrid">
        <div className="sc2"><div className="snum">{patients.length}</div><div className="slbl">{t.patients}</div></div>
        <div className="sc2"><div className="snum">{sessions.length}</div><div className="slbl">{lang==="en"?"Records":"Registros"}</div></div>
        <div className="sc2"><div className="snum">{formatCurrency(total, currency)}</div><div className="slbl">{lang==="en"?"Collected":"Cobrado"}</div></div>
        <div className="sc2"><div className="snum">{todayCount}</div><div className="slbl">{lang==="en"?"Today":"Hoy"}</div></div>
      </div>
      <div style={{ fontWeight:700, fontSize:14, color:C.charcoal, marginBottom:10 }}>{lang==="en"?"Quick access":"Acceso rápido"}</div>
      <div className="qg">
        {[{i:"👥",l:t.patients,t:"patients"},{i:"📅",l:t.agenda,t:"agenda"},{i:"📝",l:t.sessions,t:"sessions"},{i:"💳",l:t.payments,t:"payments"},{i:"🔤",l:t.phonology,t:"phonology"},{i:"🧠",l:t.ia,t:"ia"},{i:"📊",l:t.reports,t:"reports"},{i:"📚",l:t.resources,t:"resources"}].map(q => (
          <div key={q.t} className="qcard" onClick={() => setActive(q.t)}>
            <div style={{ fontSize:26, marginBottom:6 }}>{q.i}</div>
            <div style={{ fontSize:12, fontWeight:600, color:C.charcoal }}>{q.l}</div>
          </div>
        ))}
      </div>
      <SC title={`📅 ${lang==="en"?"Today's appointments":"Citas de hoy"}`}>
        {agendaItems.filter(a => a.date === todayKey).length === 0
          ? <div style={{ color:C.grayL, fontSize:12 }}>{lang==="en"?"No appointments today":"Sin citas para hoy"}</div>
          : agendaItems.filter(a => a.date === todayKey).map((a,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:`1px solid ${C.sand}` }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:a.color, flexShrink:0 }} />
              <div style={{ fontWeight:700, fontSize:13, minWidth:46 }}>{a.time}</div>
              <div style={{ flex:1, fontSize:13 }}>{a.patient}</div>
              <span className="badge" style={{ background:a.color+"22", color:a.color, fontSize:10 }}>{a.type}</span>
            </div>
          ))
        }
      </SC>
    </div>
  );
}

// ─── AGENDA ───────────────────────────────────────────────────────────────────
function Agenda({ patients, items, setItems, lang, defaultDuration }) {
  const [showNew, setShowNew] = useState(false);
  const [f, setF] = useState({ patient:"", time:"09:00", type:"Sesión", date:todayISO(), duration:defaultDuration||45 });
  const t = T[lang];
  const todayKey = todayISO();
  const tomorrowKey = new Date(Date.now()+86400000).toISOString().slice(0,10);

  const save = () => {
    if (!f.patient || !f.time) return;
    const p = patients.find(x => x.name === f.patient);
    const dur = parseInt(f.duration) || 45;
    setItems(prev => [...prev, { id:Date.now(), patient:f.patient, time:f.time, end:addMins(f.time, dur), type:f.type, color:p?.color||C.terra, date:f.date, duration:dur }]);
    setF({ patient:"", time:"09:00", type:"Sesión", date:todayISO(), duration:defaultDuration||45 });
    setShowNew(false);
  };

  const addToGcal = item => {
    const fmt = s => s.replace(/[-:]/g,"");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE`
      + `&text=${encodeURIComponent(`Hadrion — ${item.type}: ${item.patient}`)}`
      + `&dates=${fmt(item.date)}T${fmt(item.time)}00/${fmt(item.date)}T${fmt(item.end||addMins(item.time,45))}00`
      + `&details=${encodeURIComponent(`Sesión con ${item.patient}`)}`;
    window.open(url, "_blank");
  };

  const grouped = [{ label:lang==="en"?"Today":"Hoy", key:todayKey }, { label:lang==="en"?"Tomorrow":"Mañana", key:tomorrowKey }];
  const future = items.filter(a => a.date > tomorrowKey).sort((a,b) => a.date.localeCompare(b.date));

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">{t.agenda}</div></div>
        <button className="btn btnp btnsm" onClick={() => setShowNew(true)}>+</button>
      </div>
      {grouped.map(({label,key}) => (
        <div key={key}>
          <div className="dayl">{label}</div>
          {items.filter(a => a.date===key).length === 0
            ? <div style={{ color:C.grayL, fontSize:12, paddingBottom:8 }}>{lang==="en"?"No appointments":"Sin turnos"}</div>
            : items.filter(a => a.date===key).sort((a,b) => a.time.localeCompare(b.time)).map(a => (
              <div key={a.id} className="card" style={{ marginBottom:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:9, height:9, borderRadius:"50%", background:a.color, flexShrink:0 }} />
                  <div style={{ fontWeight:700, fontSize:14, minWidth:48 }}>{a.time}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:13 }}>{a.patient}</div>
                    <div style={{ fontSize:11, color:C.grayL }}>{a.type} — {a.duration||45}min — hasta {a.end}</div>
                  </div>
                  <button className="btn btnsm" style={{ background:"#4285F4", color:"white", fontSize:11 }} onClick={() => addToGcal(a)}>📅</button>
                </div>
              </div>
            ))
          }
        </div>
      ))}
      {future.length > 0 && (
        <div>
          <div className="dayl">{lang==="en"?"Upcoming":"Próximos"}</div>
          {future.map(a => (
            <div key={a.id} className="card" style={{ marginBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:9, height:9, borderRadius:"50%", background:a.color, flexShrink:0 }} />
                <div style={{ fontWeight:700, fontSize:13, minWidth:80 }}>{a.date} {a.time}</div>
                <div style={{ flex:1, fontSize:13 }}>{a.patient} — {a.type} ({a.duration||45}min)</div>
                <button className="btn btnsm" style={{ background:"#4285F4", color:"white", fontSize:11 }} onClick={() => addToGcal(a)}>📅</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showNew && (
        <Modal title={lang==="en"?"New appointment":"Nuevo turno"} onClose={() => setShowNew(false)}>
          <div className="fg"><label className="lbl">{t.patients}</label>
            <select className="inp" value={f.patient} onChange={e => setF({...f, patient:e.target.value})}>
              <option value="">--</option>
              {patients.map(p => <option key={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">{lang==="en"?"Date":"Fecha"}</label>
            <input type="date" className="inp" value={f.date} onChange={e => setF({...f, date:e.target.value})} />
          </div>
          <div className="fg"><label className="lbl">{lang==="en"?"Time":"Hora"}</label>
            <input type="time" className="inp" value={f.time} onChange={e => setF({...f, time:e.target.value})} />
          </div>
          <div className="fg">
            <label className="lbl">{t.sessionDuration}</label>
            <input type="number" className="inp" value={f.duration} min="5" max="180"
              onChange={e => setF({...f, duration:e.target.value})}
              placeholder={lang==="en"?"e.g. 45":"ej: 45"} />
          </div>
          <div className="fg"><label className="lbl">{lang==="en"?"Type":"Tipo"}</label>
            <select className="inp" value={f.type} onChange={e => setF({...f, type:e.target.value})}>
              {["Sesión","Evaluación","Seguimiento","Primera consulta"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <button className="btn btnp btnfull" onClick={save}>{t.save}</button>
        </Modal>
      )}
    </div>
  );
}

// ─── PATIENTS ─────────────────────────────────────────────────────────────────
function Patients({ patients, setPatients, setActive, setSelPatId, sessions, lang }) {
  const [sel, setSel] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editF, setEditF] = useState({});
  const emptyF = { name:"", age:"", diagnosis:"", phone:"", email:"", guardian:"", notes:"" };
  const [f, setF] = useState(emptyF);
  const t = T[lang];

  const dC = { TEL:C.terra, Dislexia:C.sage, TDAH:C.purple, Disartria:C.info, TEA:C.gold };
  const cols = [C.terra, C.sage, C.purple, C.info, C.gold];

  const filtered = patients.filter(p =>
    p.status !== "archived" &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.diagnosis.toLowerCase().includes(search.toLowerCase()))
  );

  const add = () => {
    if (!f.name || !f.diagnosis) return;
    const init = f.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
    setPatients(prev => [...prev, { id:Date.now(), name:f.name, age:parseInt(f.age)||0, diagnosis:f.diagnosis,
      sessions:0, nextSession:"Sin agendar", avatar:init, color:cols[prev.length%cols.length],
      phone:f.phone, email:f.email, guardian:f.guardian, notes:f.notes, goals:[], status:"active" }]);
    setF(emptyF); setShowNew(false);
  };

  const saveEdit = () => {
    setPatients(prev => prev.map(p => p.id===sel.id ? {...p,...editF} : p));
    setSel(prev => ({...prev,...editF})); setEditMode(false);
  };

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">{t.patients}</div><div className="ps">{filtered.length} activos</div></div>
        <button className="btn btnp btnsm" onClick={() => setShowNew(true)}>{t.newPatient}</button>
      </div>
      <input className="inp" placeholder="🔍 Buscar..." value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom:12 }} />
      {filtered.map(p => (
        <div key={p.id} className="card" style={{ marginBottom:10, cursor:"pointer" }} onClick={() => { setSel(p); setEditMode(false); }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div className="av" style={{ width:48, height:48, background:p.color, fontSize:15 }}>{p.avatar}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:14 }}>{p.name}</div>
              <div style={{ fontSize:12, color:C.grayL }}>{p.age} años — <span className="badge" style={{ background:(dC[p.diagnosis]||C.gray)+"22", color:dC[p.diagnosis]||C.gray, fontSize:10 }}>{p.diagnosis}</span></div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:C.terra }}>{sessions.filter(s => s.patientId===p.id).length}</div>
              <div style={{ fontSize:10, color:C.grayL }}>ses.</div>
            </div>
          </div>
        </div>
      ))}

      {sel && !editMode && (
        <Modal title="" onClose={() => setSel(null)}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
            <div className="av" style={{ width:54, height:54, background:sel.color, fontSize:18 }}>{sel.avatar}</div>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700 }}>{sel.name}</div>
              <div style={{ fontSize:12, color:C.grayL }}>{sel.age} años — {sel.diagnosis}</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:12 }}>
            <button className="btn btng btnsm" onClick={() => { setEditF({name:sel.name,age:sel.age,diagnosis:sel.diagnosis,phone:sel.phone,email:sel.email,guardian:sel.guardian,notes:sel.notes}); setEditMode(true); }}>✏️ Editar</button>
            <button className="btn btno btnsm" onClick={() => { setSelPatId(sel.id); setActive("history"); setSel(null); }}>📋 Historia</button>
            <button className="btn btng btnsm" onClick={() => { setPatients(prev => prev.map(p => p.id===sel.id?{...p,status:"archived"}:p)); setSel(null); }}>📦 Archivar</button>
          </div>
          {[["📞",sel.phone||"—"],["✉️",sel.email||"—"],["👨‍👩‍👧",sel.guardian||"—"]].map(([ic,v]) => (
            <div key={ic} className="hxf"><div className="hxv">{ic} {v}</div></div>
          ))}
          {sel.notes && <div className="hxf"><div className="hxl">Notas</div><div className="hxv">{sel.notes}</div></div>}
          {sel.goals?.length > 0 && <div className="hxf"><div className="hxl">Objetivos</div>{sel.goals.map((g,i) => <div key={i} className="hxv">• {g}</div>)}</div>}
        </Modal>
      )}
      {sel && editMode && (
        <Modal title="Editar paciente" onClose={() => setEditMode(false)}>
          {[["Nombre","name","text"],["Edad","age","number"],["Teléfono","phone","tel"],["Email","email","email"],["Tutor","guardian","text"]].map(([l,k,tp]) => (
            <div className="fg" key={k}><label className="lbl">{l}</label>
              <input className="inp" type={tp} value={editF[k]||""} onChange={e => setEditF({...editF,[k]:e.target.value})} />
            </div>
          ))}
          <div className="fg"><label className="lbl">Diagnóstico</label>
            <select className="inp" value={editF.diagnosis||""} onChange={e => setEditF({...editF,diagnosis:e.target.value})}>
              {["TEL","Dislexia","TDAH","Disartria","TEA","Discalculia","Tartamudez","Otro"].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Notas</label>
            <textarea className="inp" value={editF.notes||""} onChange={e => setEditF({...editF,notes:e.target.value})} />
          </div>
          <button className="btn btnp btnfull" onClick={saveEdit}>{t.save}</button>
          <button className="btn btng btnfull" onClick={() => setEditMode(false)}>{t.cancel}</button>
        </Modal>
      )}
      {showNew && (
        <Modal title="Nuevo paciente" onClose={() => setShowNew(false)}>
          {[["Nombre completo","name","text"],["Edad","age","number"],["Teléfono","phone","tel"],["Email","email","email"],["Tutor/Responsable","guardian","text"]].map(([l,k,tp]) => (
            <div className="fg" key={k}><label className="lbl">{l}</label>
              <input className="inp" type={tp} value={f[k]} onChange={e => setF({...f,[k]:e.target.value})} />
            </div>
          ))}
          <div className="fg"><label className="lbl">Diagnóstico</label>
            <select className="inp" value={f.diagnosis} onChange={e => setF({...f,diagnosis:e.target.value})}>
              <option value="">Seleccionar...</option>
              {["TEL","Dislexia","TDAH","Disartria","TEA","Discalculia","Tartamudez","Otro"].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Notas iniciales</label>
            <textarea className="inp" value={f.notes} onChange={e => setF({...f,notes:e.target.value})} />
          </div>
          <button className="btn btnp btnfull" onClick={add}>{t.save}</button>
        </Modal>
      )}
    </div>
  );
}

// ─── PAYMENTS ─────────────────────────────────────────────────────────────────
function Payments({ patients, payments, setPayments, lang, currency, setCurrency }) {
  const [showNew, setShowNew] = useState(false);
  const [customInst, setCustomInst] = useState("");
  const [f, setF] = useState({ patientId:"", amount:"", institution:"Particular", method:"Transferencia", date:todayISO(), currency:currency });
  const t = T[lang];

  const total = payments.filter(p => p.status==="pagado").reduce((a,p) => a+p.amount, 0);

  const save = () => {
    if (!f.patientId || !f.amount) return;
    const p = patients.find(x => x.id===parseInt(f.patientId));
    const inst = f.institution === "Otra institución" ? customInst : f.institution;
    setPayments(prev => [...prev, { id:Date.now(), patientId:parseInt(f.patientId), patient:p?.name||"",
      amount:parseFloat(f.amount), currency:f.currency, institution:inst,
      date:f.date, method:f.method, status:"pagado" }]);
    setF({ patientId:"", amount:"", institution:"Particular", method:"Transferencia", date:todayISO(), currency });
    setShowNew(false);
  };

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">{t.payments}</div></div>
        <div style={{ display:"flex", gap:8 }}>
          <select className="inp btnsm" style={{ width:"auto" }} value={currency} onChange={e => setCurrency(e.target.value)}>
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} {c.symbol}</option>)}
          </select>
          <button className="btn btnp btnsm" onClick={() => setShowNew(true)}>+</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom:14, display:"flex", alignItems:"center", gap:14 }}>
        <div style={{ width:46, height:46, borderRadius:13, background:C.terraF, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>📈</div>
        <div>
          <div style={{ fontSize:12, color:C.grayL }}>Total cobrado</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700 }}>{formatCurrency(total, currency)}</div>
          <div style={{ fontSize:11, color:C.grayL }}>{payments.filter(p => p.status==="pagado").length} pagos</div>
        </div>
      </div>

      {payments.map(p => (
        <div key={p.id} className="card" style={{ marginBottom:8 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontWeight:600, fontSize:13 }}>{p.patient}</div>
              <div style={{ fontSize:11, color:C.grayL }}>{p.date} — {p.institution} — {p.method}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontWeight:700, fontSize:16 }}>{formatCurrency(p.amount, p.currency||currency)}</div>
              <span className="badge" style={{ background:p.status==="pagado"?C.greenF:C.goldF, color:p.status==="pagado"?C.forest:C.gold, fontSize:10 }}>{t[p.status]||p.status}</span>
            </div>
          </div>
        </div>
      ))}

      {showNew && (
        <Modal title="Registrar pago" onClose={() => setShowNew(false)}>
          <div className="fg"><label className="lbl">Paciente</label>
            <select className="inp" value={f.patientId} onChange={e => setF({...f,patientId:e.target.value})}>
              <option value="">--</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <div className="fg" style={{ flex:2 }}><label className="lbl">Monto</label>
              <input className="inp" type="number" value={f.amount} onChange={e => setF({...f,amount:e.target.value})} />
            </div>
            <div className="fg" style={{ flex:1 }}><label className="lbl">Moneda</label>
              <select className="inp" value={f.currency} onChange={e => setF({...f,currency:e.target.value})}>
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
              </select>
            </div>
          </div>
          <div className="fg"><label className="lbl">Institución</label>
            <select className="inp" value={f.institution} onChange={e => setF({...f,institution:e.target.value})}>
              {PAYMENT_INSTITUTIONS.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
          {f.institution === "Otra institución" && (
            <div className="fg"><label className="lbl">Nombre de la institución</label>
              <input className="inp" value={customInst} onChange={e => setCustomInst(e.target.value)} />
            </div>
          )}
          <div className="fg"><label className="lbl">Método</label>
            <select className="inp" value={f.method} onChange={e => setF({...f,method:e.target.value})}>
              {["Transferencia","Efectivo","Tarjeta","MercadoPago","RedPagos","Abitab","PayPal","Otro"].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Fecha</label>
            <input type="date" className="inp" value={f.date} onChange={e => setF({...f,date:e.target.value})} />
          </div>
          <button className="btn btnp btnfull" onClick={save}>{t.save}</button>
        </Modal>
      )}
    </div>
  );
}

// ─── SESSIONS con plantillas editables ───────────────────────────────────────
function Sessions({ patients, sessions, setSessions, setPatients, lang, defaultDuration }) {
  const [showNew, setShowNew] = useState(false);
  const [selTemplate, setSelTemplate] = useState("general");
  const [templateData, setTemplateData] = useState({});
  const [f, setF] = useState({ patientId:"", progress:50, estado:"", atencion:"" });
  const t = T[lang];

  const ECHIPS = ["regulado","cansado","irritable","hiperactivo","malestar físico","buena disposición"];
  const ACHIPS = ["sostenida","fluctuante","dispersa","requiere apoyos"];

  const save = () => {
    if (!f.patientId) return;
    const p = patients.find(x => x.id===parseInt(f.patientId));
    const note = Object.entries(templateData).map(([k,v]) => `${k}: ${v}`).join("\n") || "Sin notas";
    setSessions(prev => [{ id:Date.now(), patientId:parseInt(f.patientId), patient:p?.name||"",
      date:new Date().toLocaleDateString("es-UY"), note, progress:f.progress,
      estado:f.estado, atencion:f.atencion, templateType:selTemplate, templateData }, ...prev]);
    setPatients(prev => prev.map(pat => pat.id===parseInt(f.patientId) ? {...pat, sessions:pat.sessions+1} : pat));
    setF({ patientId:"", progress:50, estado:"", atencion:"" }); setTemplateData({});
    setShowNew(false);
  };

  const tog = (k, v) => setF(prev => ({...prev, [k]: prev[k]===v ? "" : v}));
  const tmpl = SESSION_TEMPLATES[selTemplate];

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">{t.sessions}</div></div>
        <button className="btn btnp btnsm" onClick={() => setShowNew(true)}>+</button>
      </div>
      {sessions.length === 0 && <div style={{ textAlign:"center", padding:"32px 0", color:C.grayL }}>📝 Sin registros</div>}
      {sessions.map(s => (
        <div key={s.id} className="sc">
          <div className="sch">
            <div><div style={{ fontWeight:700, fontSize:14 }}>{s.patient}</div><div style={{ fontSize:11, color:C.grayL }}>{s.date}</div></div>
            <span className="badge" style={{ background:C.terraF, color:C.terra, fontSize:10 }}>{s.templateType||"general"}</span>
          </div>
          <div className="scb">
            {s.estado && <div className="hxf"><div className="hxl">Estado</div><div className="hxv">{s.estado}</div></div>}
            <div className="hxf"><div className="hxl">📝 Notas</div><div className="hxv" style={{ whiteSpace:"pre-wrap" }}>{s.note}</div></div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:8 }}>
              <div className="prog" style={{ flex:1 }}><div className="progf" style={{ width:`${s.progress}%` }} /></div>
              <span style={{ fontSize:12, fontWeight:700, color:C.terra }}>{s.progress}%</span>
            </div>
          </div>
        </div>
      ))}

      {showNew && (
        <Modal title="Nueva sesión" onClose={() => setShowNew(false)} wide>
          <div className="fg"><label className="lbl">Paciente</label>
            <select className="inp" value={f.patientId} onChange={e => setF({...f,patientId:e.target.value})}>
              <option value="">--</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Plantilla / Especialidad</label>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {Object.entries(SESSION_TEMPLATES).map(([k,v]) => (
                <button key={k} className={`filbtn${selTemplate===k?" active":""}`} onClick={() => { setSelTemplate(k); setTemplateData({}); }}>{v.name}</button>
              ))}
            </div>
          </div>
          <div style={{ background:C.terraF, borderRadius:12, padding:14, marginBottom:12 }}>
            <div style={{ fontWeight:700, fontSize:13, color:C.terraD, marginBottom:10 }}>📋 {tmpl.name}</div>
            {tmpl.fields.map(field => (
              <div className="fg" key={field.key}>
                <label className="lbl">{field.label}</label>
                {field.type === "textarea"
                  ? <textarea className="inp" value={templateData[field.label]||""} onChange={e => setTemplateData(prev => ({...prev,[field.label]:e.target.value}))} />
                  : <input className="inp" type={field.type||"text"} value={templateData[field.label]||""} onChange={e => setTemplateData(prev => ({...prev,[field.label]:e.target.value}))} />
                }
              </div>
            ))}
          </div>
          <div style={{ marginBottom:12 }}>
            <div className="lbl" style={{ marginBottom:6 }}>ESTADO GENERAL</div>
            <div className="chiprow">{ECHIPS.map(c => <button key={c} className={`chip${f.estado===c?" sel":""}`} onClick={() => tog("estado",c)}>{c}</button>)}</div>
            <div className="lbl" style={{ marginTop:10, marginBottom:6 }}>ATENCIÓN</div>
            <div className="chiprow">{ACHIPS.map(c => <button key={c} className={`chip${f.atencion===c?" sel":""}`} onClick={() => tog("atencion",c)}>{c}</button>)}</div>
          </div>
          <div className="fg">
            <label className="lbl">Progreso: {f.progress}%</label>
            <input type="range" style={{ width:"100%", accentColor:C.terra }} min={0} max={100} step={5} value={f.progress} onChange={e => setF({...f,progress:parseInt(e.target.value)})} />
            <div className="prog" style={{ marginTop:4 }}><div className="progf" style={{ width:`${f.progress}%` }} /></div>
          </div>
          <button className="btn btnp btnfull" onClick={save}>{t.save}</button>
        </Modal>
      )}
    </div>
  );
}

// ─── HISTORY ──────────────────────────────────────────────────────────────────
function History({ patients, sessions, selectedPatientId, lang }) {
  const [pid, setPid] = useState(selectedPatientId||"");
  const [ans, setAns] = useState({});
  const [tab, setTab] = useState("anamnesis");
  const patient = patients.find(p => p.id===parseInt(pid));
  const pSess = sessions.filter(s => s.patientId===parseInt(pid));

  const ANAMNESIS = [
    { t:"Antecedentes", i:"📊", q:["Antecedentes del embarazo y parto","Hitos del desarrollo motor y habla","Antecedentes médicos o neurológicos","Historia familiar"] },
    { t:"Lenguaje y comunicación", i:"💬", q:["¿Comprende consignas?","¿Dificultades en expresión verbal?","¿Inteligibilidad del habla?"] },
    { t:"Área educativa", i:"📚", q:["¿Asiste a establecimiento educacional?","¿Dificultades de aprendizaje?","¿Apoyos adicionales?"] },
    { t:"Área socioemocional", i:"❤️", q:["¿Cómo regula emociones?","¿Interacciones sociales?","¿Conductas disruptivas?"] },
  ];

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">{T[lang].history}</div></div>
      <div className="fg">
        <select className="inp" value={pid} onChange={e => setPid(e.target.value)}>
          <option value="">Seleccionar paciente...</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      {patient && (
        <>
          <div className="atabrow">
            {["anamnesis","objetivos","evolución","informe"].map(t => (
              <button key={t} className={`atab${tab===t?" active":""}`} onClick={() => setTab(t)}>{cap(t)}</button>
            ))}
          </div>
          {tab === "anamnesis" && ANAMNESIS.map((sec,si) => (
            <SC key={si} title={`${sec.i} ${sec.t}`}>
              {sec.q.map((q,qi) => (
                <div key={qi} style={{ marginBottom:10 }}>
                  <div style={{ fontSize:12, color:C.grayL, marginBottom:4 }}>{q}</div>
                  <textarea className="inp" style={{ minHeight:52, fontSize:12 }}
                    value={ans[`${si}-${qi}`]||""} onChange={e => setAns({...ans,[`${si}-${qi}`]:e.target.value})} />
                </div>
              ))}
            </SC>
          ))}
          {tab === "objetivos" && (
            <SC title="🎯 Objetivos terapéuticos">
              {patient.goals?.length > 0 ? patient.goals.map((g,i) => (
                <div key={i} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.sand}` }}>
                  <div style={{ width:22, height:22, borderRadius:6, background:C.terraF, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:C.terra, flexShrink:0 }}>{i+1}</div>
                  <div style={{ fontSize:13 }}>{g}</div>
                </div>
              )) : <div style={{ color:C.grayL, fontSize:13 }}>Sin objetivos cargados.</div>}
            </SC>
          )}
          {tab === "evolución" && (
            <SC title={`📝 Evolución (${pSess.length} sesiones)`}>
              {pSess.map((s,i) => (
                <div key={s.id} style={{ padding:"11px 0", borderBottom:`1px solid ${C.sand}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontWeight:700, fontSize:12, color:C.terra }}>Sesión {pSess.length-i}</span>
                    <span style={{ fontSize:11, color:C.grayL }}>{s.date}</span>
                  </div>
                  <div style={{ fontSize:13, lineHeight:1.5, whiteSpace:"pre-wrap" }}>{s.note}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:6 }}>
                    <div className="prog" style={{ flex:1 }}><div className="progf" style={{ width:`${s.progress}%` }} /></div>
                    <span style={{ fontSize:11, fontWeight:700, color:C.terra }}>{s.progress}%</span>
                  </div>
                </div>
              ))}
            </SC>
          )}
          {tab === "informe" && (
            <div>
              <div className="sc">
                <div className="sch" style={{ background:C.terraF }}>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, fontWeight:700 }}>Hadrion — Informe Evolutivo</div>
                    <div style={{ fontSize:12, color:C.grayL }}>{new Date().toLocaleDateString("es-UY")}</div>
                  </div>
                </div>
                <div className="scb">
                  {[["Paciente",patient.name],["Edad",`${patient.age} años`],["Diagnóstico",patient.diagnosis],["Sesiones",pSess.length]].map(([l,v]) => (
                    <div key={l} className="hxf"><div className="hxl">{l}</div><div className="hxv">{v}</div></div>
                  ))}
                  {patient.notes && <div style={{ fontSize:13, lineHeight:1.6, background:C.cream, borderRadius:10, padding:10, marginTop:8 }}>{patient.notes}</div>}
                  {pSess.slice(0,3).map((s,i) => (
                    <div key={s.id} style={{ marginTop:10, padding:10, background:C.cream, borderRadius:10 }}>
                      <div style={{ fontWeight:600, fontSize:12, color:C.terra }}>Sesión {pSess.length-i} — {s.date}</div>
                      <div style={{ fontSize:13, marginTop:3, whiteSpace:"pre-wrap" }}>{s.note}</div>
                    </div>
                  ))}
                  <div style={{ marginTop:12, fontSize:12, color:C.grayL }}>Firma: _________________ — Hadrion</div>
                </div>
              </div>
              <button className="btn btnp btnfull noprint" onClick={() => window.print()}>🖨️ Imprimir</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── OBJECTIVES ───────────────────────────────────────────────────────────────
function Objectives({ lang }) {
  const OBJETIVOS_DB = {
    TEL:{ icon:"🗣️", color:"#5B8DB8", colorF:"#EBF3FB",
      areas:[
        { area:"Comprensión", objetivos:["Seguir instrucciones simples de 1 paso","Comprender instrucciones de 2 pasos","Responder ¿quién?, ¿dónde?, ¿qué? sobre cuentos","Comprender conceptos relacionales"] },
        { area:"Expresión", objetivos:["Ampliar vocabulario: 100 palabras cotidianas","Producir frases de 2–3 palabras","Narrar secuencias de 3 eventos","Usar oraciones con estructura SVO"] },
        { area:"Conciencia fonológica", objetivos:["Identificar y producir rimas","Segmentar bisílabas con palmadas","Identificar sílaba inicial","Discriminar pares mínimos"] },
      ]
    },
    Dislexia:{ icon:"📖", color:"#E8A020", colorF:"#FEF3E0",
      areas:[
        { area:"Decodificación", objetivos:["Leer sílabas CV con 90% precisión","Leer palabras mono y bisílabas sin error","Velocidad lectora 60 ppm","Leer oraciones con comprensión"] },
        { area:"Conciencia fonológica", objetivos:["Segmentar en fonemas","Manipular fonemas","Discriminar b/d/p/q","Generar rimas propias"] },
      ]
    },
    TDAH:{ icon:"🚦", color:"#E8719C", colorF:"#FDE8F0",
      areas:[
        { area:"Atención", objetivos:["Atención sostenida 10 min","Completar tareas con <3 errores","Inhibir respuesta impulsiva","Alternar atención entre tareas"] },
        { area:"Autorregulación", objetivos:["Identificar estado emocional","Aplicar respiración en frustración","Completar secuencias de 3 pasos","Reportar uso de estrategias"] },
      ]
    },
    Disartria:{ icon:"👄", color:"#2ECC71", colorF:"#E8F8EF",
      areas:[
        { area:"Praxias", objetivos:["Praxias estáticas labiales y linguales","Secuencias dinámicas sin pausa","5 reps pa-ta-ka en 10 seg","Tono muscular adecuado en reposo"] },
        { area:"Articulación", objetivos:["Producir /p/,/b/,/t/,/d/ en posición inicial","Bisílabas con 80% inteligibilidad","Oraciones cortas comprensibles","Controlar velocidad del habla"] },
      ]
    },
    TEA:{ icon:"🌈", color:"#8B7BB5", colorF:"#F0EDF8",
      areas:[
        { area:"Comunicación social", objetivos:["Contacto visual 3 segundos","Responder a su nombre 80%","Iniciar peticiones funcionales","Usar CAA para necesidades básicas"] },
        { area:"Interacción", objetivos:["Juego paralelo 10 min","Imitar acciones simples","Turnarse en 3 intercambios","Ampliar juego funcional"] },
      ]
    },
  };

  const [selDiag, setSelDiag] = useState("TEL");
  const [checked, setChecked] = useState({});
  const diag = OBJETIVOS_DB[selDiag];
  const toggle = k => setChecked(prev => ({...prev, [k]:!prev[k]}));
  const total = Object.values(checked).filter(Boolean).length;

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Objetivos Terapéuticos</div></div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(90px,1fr))", gap:8, marginBottom:16 }}>
        {Object.entries(OBJETIVOS_DB).map(([d,info]) => (
          <button key={d} onClick={() => setSelDiag(d)}
            style={{ padding:"10px 6px", borderRadius:12, border:`2px solid ${selDiag===d?info.color:C.sand}`,
              background:selDiag===d?info.colorF:"white", cursor:"pointer", textAlign:"center" }}>
            <div style={{ fontSize:24, marginBottom:4 }}>{info.icon}</div>
            <div style={{ fontSize:11, fontWeight:700, color:selDiag===d?info.color:C.charcoal }}>{d}</div>
          </button>
        ))}
      </div>
      {diag.areas.map((area,ai) => (
        <div key={ai} className="sc" style={{ marginBottom:12 }}>
          <div className="sch"><span style={{ fontWeight:700, fontSize:14 }}>{area.area}</span></div>
          <div className="scb">
            {area.objetivos.map((obj,oi) => {
              const k = `${ai}-${oi}`;
              return (
                <div key={oi} onClick={() => toggle(k)}
                  style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"10px 0", borderBottom:`1px solid ${C.sand}`, cursor:"pointer" }}>
                  <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${checked[k]?diag.color:C.sandD}`,
                    background:checked[k]?diag.colorF:"white", display:"flex", alignItems:"center", justifyContent:"center",
                    flexShrink:0, fontSize:13, color:diag.color, marginTop:1 }}>
                    {checked[k] ? "✓" : ""}
                  </div>
                  <div style={{ fontSize:13, color:checked[k]?C.grayL:C.charcoal, textDecoration:checked[k]?"line-through":"none" }}>{obj}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {total > 0 && (
        <div style={{ background:diag.colorF, borderRadius:12, padding:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:13, fontWeight:600, color:diag.color }}>✅ {total} objetivo(s) seleccionado(s)</span>
          <button className="btn btnsm" style={{ background:diag.color, color:"white" }} onClick={() => setChecked({})}>Limpiar</button>
        </div>
      )}
    </div>
  );
}

// ─── PHONOLOGY ────────────────────────────────────────────────────────────────
function JuegosInteractivos({ C }) {
  const [activo, setActivo] = useState(null);
  const [ronda, setRonda] = useState([]);
  const [score, setScore] = useState(0);
  const [fb, setFb] = useState(null);
  const [idx, setIdx] = useState(0);

  const speakPh = ph => speak(PHONEME_TTS[ph] || ph.toLowerCase());
  const speakWord = w => speak(w);
  const sh = arr => [...arr].sort(() => Math.random()-0.5);

  const responder = (ph, correcto) => {
    if (fb) return;
    setFb(correcto ? "ok" : "mal");
    if (correcto) setScore(s => s+1);
    setTimeout(() => {
      setFb(null);
      if (idx+1 < ronda.length) {
        setIdx(i => i+1);
        if (activo === "atrapa") setTimeout(() => speakPh(ronda[idx+1]), 400);
      } else {
        setActivo("fin");
      }
    }, 900);
  };

  if (activo === "atrapa" && idx < ronda.length) {
    const ops = sh([ronda[idx], ...sh(PHONEMES.filter(p => p !== ronda[idx])).slice(0,2)]);
    return (
      <div style={{ background:"white", borderRadius:16, padding:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, alignItems:"center" }}>
          <b style={{ fontSize:14 }}>🎯 Atrapa el sonido</b>
          <span style={{ background:C.terraF, color:C.terra, padding:"4px 10px", borderRadius:20, fontSize:12, fontWeight:700 }}>⭐{score} — {idx+1}/{ronda.length}</span>
        </div>
        <div style={{ background:C.terraF, borderRadius:14, padding:16, textAlign:"center", marginBottom:12 }}>
          <button className="btn btnp" onClick={() => speakPh(ronda[idx])}>🔊 Escuchar: {ronda[idx]}</button>
        </div>
        {fb && <div className="alert" style={{ background:fb==="ok"?C.greenF:C.dangerF, color:fb==="ok"?C.forest:C.danger, textAlign:"center", fontWeight:700 }}>{fb==="ok"?"✅ ¡Correcto!":"❌ Incorrecto"}</div>}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
          {ops.map((ph,i) => (
            <button key={i} onClick={() => responder(ph, ph===ronda[idx])}
              style={{ padding:"18px 8px", borderRadius:14, border:`2px solid ${C.sand}`, background:"white",
                fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700, cursor:"pointer" }}>{ph}</button>
          ))}
        </div>
        <button className="btn btng btnfull" style={{ marginTop:12 }} onClick={() => setActivo(null)}>Salir</button>
      </div>
    );
  }

  if (activo === "donde" && idx < ronda.length) {
    const cp = ronda[idx];
    const wps = sh(PHONEMES.filter(p => p!==cp && PHONEME_EMOJI[p] && PHONEME_WORDS[p])).slice(0,3);
    const opts = sh([
      { ph:cp, e:(PHONEME_EMOJI[cp]||[])[0]||"📝", w:(PHONEME_WORDS[cp]||[])[0]||cp },
      ...wps.map(p => ({ ph:p, e:(PHONEME_EMOJI[p]||[])[0]||"📝", w:(PHONEME_WORDS[p]||[])[0]||p }))
    ]);
    return (
      <div style={{ background:"white", borderRadius:16, padding:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, alignItems:"center" }}>
          <b style={{ fontSize:14 }}>❓ ¿Dónde está?</b>
          <span style={{ background:C.sageF, color:C.sage, padding:"4px 10px", borderRadius:20, fontSize:12, fontWeight:700 }}>⭐{score} — {idx+1}/{ronda.length}</span>
        </div>
        {fb && <div className="alert" style={{ background:fb==="ok"?C.greenF:C.dangerF, color:fb==="ok"?C.forest:C.danger, textAlign:"center", fontWeight:700 }}>{fb==="ok"?"✅ ¡Correcto!":"❌ Incorrecto"}</div>}
        <div style={{ background:C.sageF, borderRadius:14, padding:14, textAlign:"center", marginBottom:12 }}>
          <div style={{ fontSize:12, color:C.grayL, marginBottom:4 }}>Toca la imagen que empieza con</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:64, fontWeight:700, color:C.sage, lineHeight:1 }}>{cp}</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {opts.map((o,i) => (
            <button key={i} onClick={() => responder(o.ph, o.ph===cp)}
              style={{ padding:"14px 8px", borderRadius:12, border:`2px solid ${C.sand}`, background:"white", cursor:"pointer", textAlign:"center" }}>
              <div style={{ fontSize:44 }}>{o.e}</div>
              <div style={{ fontSize:11, fontWeight:700, marginTop:6 }}>{o.w}</div>
            </button>
          ))}
        </div>
        <button className="btn btng btnfull" style={{ marginTop:12 }} onClick={() => setActivo(null)}>Salir</button>
      </div>
    );
  }

  if (activo === "fin") {
    return (
      <div style={{ background:"white", borderRadius:16, padding:24, textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🎉</div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, marginBottom:8 }}>¡Juego terminado!</div>
        <div style={{ fontSize:16, color:C.grayL, marginBottom:16 }}>Puntaje: <b style={{ color:C.terra }}>{score}</b> / {ronda.length}</div>
        <div style={{ background:C.terraF, borderRadius:12, padding:12, marginBottom:16 }}>
          {score===ronda.length?"🌟 ¡Perfecto!":score>=ronda.length/2?"👏 ¡Muy bien!":"💪 ¡Seguí practicando!"}
        </div>
        <button className="btn btnp" onClick={() => setActivo(null)}>Jugar de nuevo</button>
      </div>
    );
  }

  return (
    <div>
      {[
        { id:"atrapa", icon:"🎯", name:"Atrapa el sonido", desc:"Escuchá el fonema y tocá la letra correcta", color:C.terra,
          action:() => { const ph=sh(PHONEMES).slice(0,10); setRonda(ph); setIdx(0); setScore(0); setFb(null); setActivo("atrapa"); setTimeout(()=>speakPh(ph[0]),500); }},
        { id:"donde", icon:"❓", name:"¿Dónde está?", desc:"Ve el fonema y tocá la imagen que empieza con ese sonido", color:C.sage,
          action:() => { const ph=sh(PHONEMES.filter(p=>PHONEME_EMOJI[p]&&PHONEME_WORDS[p])).slice(0,8); setRonda(ph); setIdx(0); setScore(0); setFb(null); setActivo("donde"); }},
      ].map(j => (
        <div key={j.id} style={{ display:"flex", alignItems:"center", gap:12, padding:14, background:"white", borderRadius:14, marginBottom:10, cursor:"pointer", border:`2px solid ${j.color}33`, boxShadow:"0 2px 8px rgba(0,0,0,.06)" }} onClick={j.action}>
          <div style={{ width:52, height:52, borderRadius:14, background:j.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{j.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:14 }}>{j.name}</div>
            <div style={{ fontSize:12, color:C.grayL, marginTop:3 }}>{j.desc}</div>
          </div>
          <div style={{ background:j.color, color:"white", padding:"8px 16px", borderRadius:10, fontSize:13, fontWeight:700, flexShrink:0 }}>Jugar</div>
        </div>
      ))}
    </div>
  );
}

function Phonology({ lang }) {
  const [sel, setSel] = useState(null);
  const [stage, setStage] = useState("Escucha");
  const [fil, setFil] = useState("Todas");
  const [wordIdx, setWordIdx] = useState(0);
  const stages = ["Escucha","Imagen","Sílaba","Segmentación","Fusión","Manipulación"];
  const cats = { Vocales:["A","E","I","O","U"], Consonantes:PHONEMES.filter(p=>!["A","E","I","O","U"].includes(p)), Todas:PHONEMES };

  const words = sel ? (PHONEME_WORDS[sel]||[]) : [];
  const emojis = sel ? (PHONEME_EMOJI[sel]||[]) : [];

  const handle = ph => {
    setSel(ph); setWordIdx(0);
    speak(PHONEME_TTS[ph] || ph.toLowerCase());
  };

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}>
        <div className="pt">Conciencia Fonológica</div>
        <div className="ps">Etapas progresivas · Audio integrado · Ñ incluida</div>
      </div>

      <SC title="Etapa del ejercicio">
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {stages.map(s => <button key={s} className={`filbtn${stage===s?" active":""}`} onClick={() => setStage(s)}>{s}</button>)}
        </div>
      </SC>

      <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
        {Object.keys(cats).map(c => <button key={c} className={`filbtn${fil===c?" active":""}`} onClick={() => setFil(c)}>{c}</button>)}
      </div>

      <div className="phgrid">
        {(cats[fil]||PHONEMES).map(ph => (
          <button key={ph} className={`phbtn${sel===ph?" sel":""}`} onClick={() => handle(ph)}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:ph.length > 1 ? 22 : 28, fontWeight:700, lineHeight:1 }}>{ph}</div>
            {PHONEME_EMOJI[ph] && <div style={{ fontSize:20, lineHeight:1 }}>{PHONEME_EMOJI[ph][0]}</div>}
          </button>
        ))}
      </div>

      {sel && (
        <div style={{ background:C.terraF, borderRadius:16, padding:16, marginBottom:12, border:`2px solid ${C.terraL}` }}>
          <div style={{ textAlign:"center", marginBottom:12 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:72, fontWeight:700, color:C.terra, lineHeight:1 }}>{sel}</div>
            <div style={{ fontSize:11, color:C.grayL, marginTop:2 }}>
              {sel === "Ñ" ? "Sonido: eñe" : `TTS: ${PHONEME_TTS[sel]}`}
            </div>
            <button className="btn btnp btnsm" style={{ marginTop:8 }} onClick={() => speak(PHONEME_TTS[sel]||sel.toLowerCase())}>
              🔊 Escuchar fonema "{sel}"
            </button>
          </div>

          {(stage==="Escucha"||stage==="Imagen") && emojis.length > 0 && (
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:C.terraD, marginBottom:8, textTransform:"uppercase", letterSpacing:.5 }}>
                Palabras con {sel}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
                {emojis.map((emoji,i) => (
                  <div key={i} style={{ textAlign:"center", cursor:"pointer", background:"white", borderRadius:12, border:`2px solid ${C.terraL}`, width:84, padding:"8px 4px" }}
                    onClick={() => speakWord(words[i]||sel)}>
                    <div style={{ fontSize:40, lineHeight:1.2 }}>{emoji}</div>
                    <div style={{ fontSize:10, fontWeight:800, color:C.terra, marginTop:4 }}>{words[i]||""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stage === "Sílaba" && (
            <div style={{ background:"white", borderRadius:12, padding:12 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.terraD, marginBottom:8 }}>✂️ Palmadas por sílaba</div>
              {words.slice(0,4).map((w,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:10, background:C.cream, borderRadius:10, marginBottom:8, cursor:"pointer" }}
                  onClick={() => speak(w)}>
                  <div style={{ fontSize:28 }}>{emojis[i]||"📝"}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:18, letterSpacing:3 }}>{w}</div>
                    <div style={{ fontSize:11, color:C.grayL }}>👏 tocá para escuchar</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {stage === "Segmentación" && (
            <div style={{ background:"white", borderRadius:12, padding:12 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.terraD, marginBottom:8 }}>🔍 Di cada sonido por separado</div>
              {words.slice(0,3).map((w,i) => (
                <div key={i} style={{ marginBottom:10, background:C.cream, borderRadius:10, padding:10 }}>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:6 }}>
                    <span style={{ fontSize:24 }}>{emojis[i]||"📝"}</span>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700 }}>{w}</span>
                    <button className="btn btnsm" style={{ background:"#4285F4", color:"white" }} onClick={() => speak(w)}>🔊</button>
                  </div>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                    {w.split("").map((letra,j) => (
                      <div key={j} style={{ width:34, height:34, borderRadius:8, border:`2px solid ${C.terraL}`, background:"white", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700, color:C.terra }}>{letra.toUpperCase()}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {stage === "Fusión" && (
            <div style={{ background:"white", borderRadius:12, padding:12 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.terraD, marginBottom:8 }}>🔗 Tocá cada letra y adiviná la palabra</div>
              {words.slice(0,3).map((w,i) => (
                <div key={i} style={{ marginBottom:10, background:C.cream, borderRadius:10, padding:10 }}>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                    {w.split("").map((l,j) => (
                      <button key={j} onClick={() => speak(l)}
                        style={{ minWidth:34, height:34, borderRadius:8, border:`2px solid ${C.terraL}`, background:"white", fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontWeight:700, color:C.terra, cursor:"pointer" }}>{l.toUpperCase()}</button>
                    ))}
                    <button className="btn btnsm" style={{ background:C.terra, color:"white" }} onClick={() => speak(w)}>🔊</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {stage === "Manipulación" && (
            <div style={{ background:"white", borderRadius:12, padding:12 }}>
              <div style={{ fontWeight:700, fontSize:13, color:C.terraD, marginBottom:8 }}>🔀 Cambiá el fonema inicial</div>
              {[["pato","gato"],["piso","viso"],["cama","tama"],["luna","tuna"],["ñandú","mandú"]].map(([w1,w2],i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8, background:C.cream, borderRadius:10, padding:"10px 14px" }}>
                  <button className="btn btnsm" style={{ background:"white", border:`2px solid ${C.terraL}`, fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontWeight:700, color:C.terra }} onClick={() => speak(w1)}>{w1}</button>
                  <div style={{ color:C.grayL }}>→</div>
                  <button className="btn btnsm" style={{ background:C.terra, color:"white", fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontWeight:700 }} onClick={() => speak(w2)}>{w2}</button>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop:12 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.terraD, marginBottom:6, textTransform:"uppercase" }}>Palabras con {sel} ({words.length})</div>
            {words.length > 0 && (
              <div style={{ display:"flex", alignItems:"center", gap:12, background:"white", borderRadius:12, padding:"10px 14px" }}>
                <div style={{ width:46, height:46, borderRadius:12, background:C.terraF, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, color:C.terra, flexShrink:0 }}>{sel}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700 }}>{words[wordIdx%words.length]}</div>
                  <div style={{ fontSize:11, color:C.grayL }}>{wordIdx+1} de {words.length}</div>
                </div>
                <div style={{ display:"flex", gap:4 }}>
                  <button className="btn btnsm" style={{ background:"#4285F4", color:"white" }} onClick={() => speak(words[wordIdx%words.length])}>🔊</button>
                  <button className="btn btnsm btng" onClick={() => setWordIdx(i => (i+1)%words.length)}>→</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <SC title="🎮 Juegos fonológicos">
        <JuegosInteractivos C={C} />
      </SC>
    </div>
  );
}

// ─── REPORTS ──────────────────────────────────────────────────────────────────
function Reports({ patients, sessions, payments, lang, currency }) {
  const [pid, setPid] = useState("");
  const [tab, setTab] = useState("general");
  const patient = patients.find(p => p.id===parseInt(pid));
  const pSess = sessions.filter(s => s.patientId===parseInt(pid));
  const totalC = payments.filter(p => p.status==="pagado").reduce((a,b) => a+b.amount, 0);
  const avgProg = pSess.length > 0 ? Math.round(pSess.reduce((a,s) => a+(s.progress||0),0)/pSess.length) : 0;

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Reportes</div></div>
      <div className="atabrow">
        {[{k:"general",l:"📊 General"},{k:"progreso",l:"📈 Progreso"},{k:"familia",l:"👨‍👩‍👧 Familia"}].map(t => (
          <button key={t.k} className={`atab${tab===t.k?" active":""}`} onClick={() => setTab(t.k)}>{t.l}</button>
        ))}
      </div>

      {tab === "general" && (
        <>
          <div className="sgrid">
            <div className="sc2"><div className="snum">{patients.length}</div><div className="slbl">Pacientes</div></div>
            <div className="sc2"><div className="snum">{sessions.length}</div><div className="slbl">Sesiones</div></div>
            <div className="sc2"><div className="snum">{formatCurrency(totalC,currency)}</div><div className="slbl">Cobrado</div></div>
            <div className="sc2"><div className="snum">{payments.filter(p=>p.status==="pendiente").length}</div><div className="slbl">Pendientes</div></div>
          </div>
          <SC title="Diagnósticos">
            {Object.entries(patients.reduce((a,p) => { a[p.diagnosis]=(a[p.diagnosis]||0)+1; return a; }, {})).map(([d,n]) => (
              <div key={d} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.sand}` }}>
                <div style={{ flex:1, fontSize:13 }}>{d}</div>
                <div className="prog" style={{ width:90 }}><div className="progf" style={{ width:`${patients.length?(n/patients.length)*100:0}%` }} /></div>
                <div style={{ fontWeight:700, color:C.terra }}>{n}</div>
              </div>
            ))}
          </SC>
        </>
      )}

      {tab === "progreso" && (
        <>
          <div className="fg">
            <select className="inp" value={pid} onChange={e => setPid(e.target.value)}>
              <option value="">Seleccionar paciente...</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          {patient && (
            <SC title={`📈 ${patient.name} — Progreso`}>
              <div style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:13 }}>Promedio general</span>
                  <span style={{ fontWeight:700, color:C.terra }}>{avgProg}%</span>
                </div>
                <div className="prog" style={{ height:12 }}><div className="progf" style={{ width:`${avgProg}%`, height:12 }} /></div>
              </div>
              {pSess.map((s,i) => (
                <div key={s.id} style={{ marginBottom:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                    <span style={{ fontSize:11 }}>Sesión {pSess.length-i} — {s.date}</span>
                    <span style={{ fontWeight:700, fontSize:11, color:C.terra }}>{s.progress}%</span>
                  </div>
                  <div className="prog"><div className="progf" style={{ width:`${s.progress}%` }} /></div>
                </div>
              ))}
            </SC>
          )}
        </>
      )}

      {tab === "familia" && (
        <>
          <div className="fg">
            <select className="inp" value={pid} onChange={e => setPid(e.target.value)}>
              <option value="">Seleccionar paciente...</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          {patient && (
            <div>
              <div style={{ background:"white", borderRadius:16, padding:20, boxShadow:"0 2px 12px rgba(0,0,0,.08)" }}>
                <div style={{ borderBottom:`3px solid ${C.terra}`, paddingBottom:12, marginBottom:16, textAlign:"center" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700 }}>Informe para la Familia</div>
                  <div style={{ fontSize:12, color:C.grayL }}>{new Date().toLocaleDateString("es-UY")}</div>
                </div>
                <div style={{ background:C.terraF, borderRadius:10, padding:12, marginBottom:14 }}>
                  <div style={{ fontWeight:700, fontSize:15 }}>{patient.name}</div>
                  <div style={{ fontSize:12, color:C.grayL }}>{patient.age} años · {patient.diagnosis} · {pSess.length} sesiones</div>
                </div>
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontWeight:700, fontSize:13, marginBottom:6 }}>📈 Progreso general</div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div className="prog" style={{ flex:1, height:10 }}><div className="progf" style={{ width:`${avgProg}%`, height:10 }} /></div>
                    <span style={{ fontWeight:700, color:C.terra }}>{avgProg}%</span>
                  </div>
                </div>
                {patient.goals?.length > 0 && (
                  <div style={{ marginBottom:12 }}>
                    <div style={{ fontWeight:700, fontSize:13, marginBottom:6 }}>🎯 Objetivos</div>
                    {patient.goals.map((g,i) => <div key={i} style={{ fontSize:13, padding:"4px 0" }}>• {g}</div>)}
                  </div>
                )}
                {pSess[0] && (
                  <div style={{ background:C.cream, borderRadius:10, padding:12, marginBottom:12 }}>
                    <div style={{ fontWeight:700, fontSize:12, color:C.grayL, marginBottom:6 }}>Última sesión — {pSess[0].date}</div>
                    <div style={{ fontSize:13, whiteSpace:"pre-wrap" }}>{pSess[0].note}</div>
                  </div>
                )}
                <div style={{ marginTop:14, borderTop:`1px solid ${C.sand}`, paddingTop:10, fontSize:11, color:C.grayL, textAlign:"center" }}>
                  Hadrion · comunipro12@gmail.com
                </div>
              </div>
              <button className="btn btnp btnfull noprint" style={{ marginTop:8 }} onClick={() => window.print()}>🖨️ Imprimir / PDF</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── IA ASISTENTE (mejorado y libre) ─────────────────────────────────────────
function IAAsistente({ patients, lang }) {
  const [tab, setTab] = useState("libre");
  const [prompt, setPrompt] = useState("");
  const [selPat, setSelPat] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [edad, setEdad] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [editResult, setEditResult] = useState(false);
  const [error, setError] = useState("");
  const t = T[lang];

  const systemPrompt = `Sos una fonoaudióloga clínica experta, trabajando en Uruguay. Respondés en español rioplatense, de forma clara y profesional, sin usar asteriscos ni markdown. Tus respuestas son directas, clínicas y útiles para profesionales terapéuticos.`;

  const callClaude = async (userPrompt) => {
    setLoading(true); setResult(""); setError(""); setEditResult(false);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role:"user", content:userPrompt }]
        })
      });
      const data = await res.json();
      if (data.content?.[0]?.text) setResult(data.content[0].text);
      else setError(t.error);
    } catch { setError(t.error); }
    setLoading(false);
  };

  const quickActions = [
    { icon:"🎯", label:"Objetivos terapéuticos",
      prompt:() => `Generá 5 objetivos terapéuticos específicos, concretos y medibles para un paciente de ${edad} años con diagnóstico de ${diagnostico}. Para cada objetivo incluí: descripción, criterio de logro concreto y tiempo estimado. Sin asteriscos.` },
    { icon:"📅", label:"Plan mensual",
      prompt:() => `Creá un plan terapéutico mensual para un paciente de ${edad} años con ${diagnostico}. Estructurá semana por semana: objetivo, actividades, materiales e indicaciones para la familia. Sin asteriscos.` },
    { icon:"📄", label:"Informe para familia",
      prompt:() => {
        const p = patients.find(x => x.name===selPat);
        if (!p) return null;
        return `Redactá un informe de progreso para la familia de ${p.name}, ${p.age} años, diagnóstico ${p.diagnosis}, con ${p.sessions} sesiones. Objetivos: ${(p.goals||[]).join(", ")}. Estilo: cálido, profesional, sin tecnicismos, en español rioplatense. 3 párrafos: situación actual, logros, recomendaciones para casa. Sin asteriscos.`;
      }},
    { icon:"📊", label:"Análisis de seguimiento",
      prompt:() => {
        const p = patients.find(x => x.name===selPat);
        if (!p) return null;
        return `Analizá el progreso terapéutico de ${p.name}, ${p.age} años, ${p.diagnosis}, ${p.sessions} sesiones. Generá: A) Evaluación del progreso. B) Próximos pasos. C) Indicadores de logro 4 semanas. D) Actividades prioritarias. E) Señales de alerta. Sin asteriscos.`;
      }},
    { icon:"🏫", label:"Informe para escuela",
      prompt:() => {
        const p = patients.find(x => x.name===selPat);
        if (!p) return null;
        return `Redactá un informe formal para el establecimiento educativo de ${p.name}, ${p.age} años, diagnóstico ${p.diagnosis}. Incluí: situación actual, avances, adecuaciones curriculares recomendadas y datos de contacto profesional. Tono formal. Sin asteriscos.`;
      }},
    { icon:"💡", label:"Estrategias personalizadas",
      prompt:() => `Generá 8 estrategias específicas para trabajar con un paciente de ${edad} años con diagnóstico de ${diagnostico}. Incluí estrategias para la sesión clínica Y para la familia en casa. Sin asteriscos.` },
  ];

  const needsPatient = ["📄","📊","🏫"];
  const needsDiag = ["🎯","📅","💡"];

  const handleQuick = (action) => {
    const p = action.prompt();
    if (!p) { setError("Seleccioná un paciente primero."); return; }
    if ((needsDiag.includes(action.icon)) && (!diagnostico || !edad)) { setError("Completá diagnóstico y edad."); return; }
    callClaude(p);
  };

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}>
        <div className="pt">Asistente IA</div>
        <div className="ps">Powered by Claude · Generá todo lo que necesitás</div>
      </div>

      <div style={{ background:"linear-gradient(135deg,#9B7EBD,#7B5EA7)", borderRadius:16, padding:16, color:"white", marginBottom:16, display:"flex", gap:12, alignItems:"center" }}>
        <div style={{ fontSize:36 }}>🧠</div>
        <div>
          <div style={{ fontWeight:700, fontSize:15, marginBottom:2 }}>Claude AI integrado</div>
          <div style={{ fontSize:12, opacity:.85 }}>Objetivos · Planes · Informes · Cualquier consulta clínica</div>
        </div>
      </div>

      <div className="atabrow">
        <button className={`atab${tab==="libre"?" active":""}`} onClick={() => setTab("libre")}>✍️ Libre</button>
        <button className={`atab${tab==="rapido"?" active":""}`} onClick={() => setTab("rapido")}>⚡ Rápido</button>
      </div>

      {tab === "libre" && (
        <div>
          <div className="fg">
            <label className="lbl">Preguntá o pedí lo que necesitás</label>
            <textarea className="inp" style={{ minHeight:100 }} placeholder="Ej: Generame una lista de actividades para trabajar conciencia fonológica con un niño de 5 años con TEL..."
              value={prompt} onChange={e => setPrompt(e.target.value)} />
          </div>
          <button className="btn btnp btnfull" onClick={() => { if (!prompt.trim()) return; callClaude(prompt); }} disabled={loading}>
            {loading ? <><div className="spinner" style={{ width:16, height:16, border:"2px solid rgba(255,255,255,.3)", borderTopColor:"white" }} /> Generando...</> : "🧠 Generar"}
          </button>
        </div>
      )}

      {tab === "rapido" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
            <div className="fg" style={{ margin:0 }}>
              <label className="lbl">Diagnóstico</label>
              <select className="inp" value={diagnostico} onChange={e => setDiagnostico(e.target.value)}>
                <option value="">--</option>
                {["TEL","Dislexia","TDAH","Disartria","TEA","Retraso del habla","Tartamudez","Otra"].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="fg" style={{ margin:0 }}>
              <label className="lbl">Edad</label>
              <input className="inp" type="number" placeholder="años" value={edad} onChange={e => setEdad(e.target.value)} min="2" max="18" />
            </div>
          </div>
          <div className="fg">
            <label className="lbl">Paciente (para informes)</label>
            <select className="inp" value={selPat} onChange={e => setSelPat(e.target.value)}>
              <option value="">--</option>
              {patients.filter(p => p.status==="active").map(p => <option key={p.id} value={p.name}>{p.name} — {p.diagnosis}</option>)}
            </select>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {quickActions.map(action => (
              <button key={action.label} onClick={() => handleQuick(action)} disabled={loading}
                style={{ background:"white", border:`2px solid ${C.sand}`, borderRadius:12, padding:"12px 10px", cursor:"pointer", textAlign:"left", transition:"all .15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor=C.terra}
                onMouseLeave={e => e.currentTarget.style.borderColor=C.sand}>
                <div style={{ fontSize:20, marginBottom:4 }}>{action.icon}</div>
                <div style={{ fontSize:12, fontWeight:600, color:C.charcoal }}>{action.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <div className="alert alrtd" style={{ marginTop:10 }}>{error}</div>}

      {loading && (
        <div style={{ textAlign:"center", padding:"30px 0" }}>
          <div className="spinner" />
          <div style={{ fontWeight:600, color:C.terra, marginTop:12 }}>Consultando a Claude AI...</div>
        </div>
      )}

      {result && (
        <div style={{ marginTop:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <div style={{ fontWeight:700, fontSize:13, color:C.charcoal }}>✅ Resultado generado</div>
            <div style={{ display:"flex", gap:6 }}>
              <button className="btn btnsm btng" onClick={() => setEditResult(!editResult)}>
                {editResult ? "👁️ Ver" : "✏️ Editar"}
              </button>
              <button className="btn btnsm btno noprint" onClick={() => window.print()}>🖨️</button>
            </div>
          </div>
          {editResult
            ? <textarea className="inp" style={{ minHeight:300, fontSize:13, lineHeight:1.8 }} value={result} onChange={e => setResult(e.target.value)} />
            : <div style={{ background:C.terraF, borderRadius:14, padding:18, whiteSpace:"pre-wrap", fontSize:13, color:C.charcoal, lineHeight:1.9, border:`1.5px solid ${C.terraL}`, maxHeight:"60vh", overflowY:"auto" }}>
                {result}
              </div>
          }
          <div style={{ display:"flex", gap:8, marginTop:8 }}>
            <button className="btn btng" style={{ flex:1, justifyContent:"center" }} onClick={() => navigator.clipboard?.writeText(result)}>
              📋 Copiar
            </button>
            <button className="btn btno" style={{ flex:1, justifyContent:"center" }} onClick={() => setResult("")}>
              🔄 Limpiar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── RESOURCES con plantillas rellenables ─────────────────────────────────────
function Resources({ lang }) {
  const [sel, setSel] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const t = T[lang];

  const recursos = [
    { i:"📋", t:"Anamnesis", c:"Evaluación",
      fields:[
        { k:"nombre", l:"Nombre del paciente", type:"text" },
        { k:"dob", l:"Fecha de nacimiento", type:"date" },
        { k:"diagnostico", l:"Diagnóstico", type:"text" },
        { k:"tutor", l:"Tutor/Responsable", type:"text" },
        { k:"telefono", l:"Teléfono", type:"tel" },
        { k:"email", l:"Email", type:"email" },
        { k:"motivo", l:"Motivo de consulta", type:"textarea" },
        { k:"antecedentes", l:"Antecedentes (embarazo, parto, hitos)", type:"textarea" },
        { k:"observaciones", l:"Observaciones iniciales", type:"textarea" },
      ]},
    { i:"📝", t:"Registro de sesión", c:"Clínico",
      fields:[
        { k:"paciente", l:"Paciente", type:"text" },
        { k:"fecha", l:"Fecha", type:"date" },
        { k:"sesion_n", l:"Sesión N°", type:"number" },
        { k:"duracion", l:"Duración (min)", type:"number" },
        { k:"objetivo", l:"Objetivo trabajado hoy", type:"text" },
        { k:"estado", l:"Estado del paciente", type:"text" },
        { k:"actividades", l:"Actividades realizadas", type:"textarea" },
        { k:"logros", l:"Logros de la sesión", type:"textarea" },
        { k:"dificultades", l:"Dificultades observadas", type:"textarea" },
        { k:"progreso", l:"Progreso (%)", type:"number" },
        { k:"tarea", l:"Tarea para casa", type:"textarea" },
        { k:"proxima_sesion", l:"Próxima sesión", type:"text" },
      ]},
    { i:"📊", t:"Escala de progreso", c:"Seguimiento",
      fields:[
        { k:"paciente", l:"Paciente", type:"text" },
        { k:"periodo", l:"Período", type:"text" },
        { k:"obj1", l:"Objetivo 1", type:"text" },
        { k:"prog1", l:"Progreso Obj.1 (%)", type:"number" },
        { k:"obs1", l:"Observaciones Obj.1", type:"textarea" },
        { k:"obj2", l:"Objetivo 2", type:"text" },
        { k:"prog2", l:"Progreso Obj.2 (%)", type:"number" },
        { k:"obs2", l:"Observaciones Obj.2", type:"textarea" },
        { k:"obj3", l:"Objetivo 3", type:"text" },
        { k:"prog3", l:"Progreso Obj.3 (%)", type:"number" },
        { k:"obs3", l:"Observaciones Obj.3", type:"textarea" },
      ]},
    { i:"🏠", t:"Guía para familias", c:"Familia",
      fields:[
        { k:"paciente", l:"Nombre del niño/a", type:"text" },
        { k:"profesional", l:"Profesional", type:"text" },
        { k:"fecha", l:"Fecha", type:"date" },
        { k:"actividad1", l:"Actividad en casa 1", type:"textarea" },
        { k:"actividad2", l:"Actividad en casa 2", type:"textarea" },
        { k:"actividad3", l:"Actividad en casa 3", type:"textarea" },
        { k:"recomendaciones", l:"Recomendaciones generales", type:"textarea" },
        { k:"contacto", l:"Contacto del profesional", type:"text" },
      ]},
    { i:"📬", t:"Carta para la escuela", c:"Derivación",
      fields:[
        { k:"alumno", l:"Nombre del alumno/a", type:"text" },
        { k:"grado", l:"Grado/Año", type:"text" },
        { k:"institucion", l:"Institución educativa", type:"text" },
        { k:"diagnostico", l:"Diagnóstico", type:"text" },
        { k:"desde", l:"En tratamiento desde", type:"date" },
        { k:"avances", l:"Avances observados", type:"textarea" },
        { k:"adecuaciones", l:"Adecuaciones solicitadas", type:"textarea" },
        { k:"profesional", l:"Profesional firmante", type:"text" },
        { k:"matricula", l:"Matrícula profesional", type:"text" },
      ]},
    { i:"💡", t:"Estrategias TDAH", c:"TDAH",
      fields:[
        { k:"alumno", l:"Nombre del alumno/a", type:"text" },
        { k:"edad", l:"Edad", type:"number" },
        { k:"estrategias_aula", l:"Estrategias para el aula", type:"textarea" },
        { k:"estrategias_casa", l:"Estrategias en casa", type:"textarea" },
        { k:"observaciones", l:"Observaciones adicionales", type:"textarea" },
      ]},
  ];

  const handleOpen = r => { setSel(r); setFormData({}); setEditMode(false); };

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Recursos</div><div className="ps">Plantillas rellenables e imprimibles</div></div>
      <div className="alert alrti">Tocá cualquier recurso para rellenarlo y luego imprimirlo como PDF.</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:10 }}>
        {recursos.map((r,i) => (
          <div key={i} className="card" style={{ cursor:"pointer", padding:12 }} onClick={() => handleOpen(r)}>
            <div style={{ fontSize:26, marginBottom:6 }}>{r.i}</div>
            <div style={{ fontWeight:700, fontSize:12, color:C.charcoal, marginBottom:3 }}>{r.t}</div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
              <span className="badge" style={{ background:C.terraF, color:C.terra, fontSize:10 }}>{r.c}</span>
              <span style={{ fontSize:10, color:C.info }}>✏️ rellenar →</span>
            </div>
          </div>
        ))}
      </div>

      {sel && (
        <Modal title={`${sel.i} ${sel.t}`} onClose={() => setSel(null)} wide>
          <div style={{ marginBottom:12, display:"flex", gap:8, justifyContent:"flex-end" }}>
            <button className="btn btng btnsm" onClick={() => setEditMode(!editMode)}>
              {editMode ? "🔒 Bloquear" : "✏️ Editar campos"}
            </button>
            <button className="btn btnp btnsm noprint" onClick={() => window.print()}>🖨️ Imprimir</button>
          </div>
          <div style={{ background:C.cream, borderRadius:12, padding:16 }}>
            {sel.fields.map(field => (
              <div className="fg" key={field.k}>
                <label className="lbl">{field.l}</label>
                {field.type === "textarea"
                  ? <textarea className="inp" readOnly={!editMode}
                      style={{ minHeight:70, background:editMode?"white":C.cream }}
                      value={formData[field.k]||""}
                      onChange={e => setFormData(prev => ({...prev,[field.k]:e.target.value}))} />
                  : <input className="inp" type={field.type} readOnly={!editMode}
                      style={{ background:editMode?"white":C.cream }}
                      value={formData[field.k]||""}
                      onChange={e => setFormData(prev => ({...prev,[field.k]:e.target.value}))} />
                }
              </div>
            ))}
          </div>
          <div style={{ marginTop:8, fontSize:11, color:C.grayL, textAlign:"center" }}>
            Hadrion — comunipro12@gmail.com
          </div>
          <button className="btn btnp btnfull noprint" style={{ marginTop:8 }} onClick={() => window.print()}>🖨️ Imprimir / Guardar PDF</button>
        </Modal>
      )}
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function Admin({ users, setUsers, lang, currentUser }) {
  const [tab, setTab] = useState("usuarios");
  const [showNew, setShowNew] = useState(false);
  const [f, setF] = useState({ name:"", email:"", password:"", role:"profesional", specialty:"", plan:"Básico", phone:"", trialDays:15 });
  const cols = [C.terra, C.sage, C.purple, C.info, C.gold];

  const add = () => {
    if (!f.name || !f.email || !f.password) return;
    const init = f.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
    const trialExp = new Date(Date.now() + f.trialDays*24*60*60*1000).toLocaleDateString("es-UY");
    setUsers(prev => [...prev, { id:Date.now(), name:f.name, email:f.email, password:f.password,
      role:f.role, specialty:f.specialty, plan:f.plan, status:"active",
      createdAt:new Date().toLocaleDateString("es-UY"), avatar:init,
      color:cols[prev.length%cols.length], lastLogin:"—", trialExpiry:trialExp }]);
    setF({ name:"", email:"", password:"", role:"profesional", specialty:"", plan:"Básico", phone:"", trialDays:15 });
    setShowNew(false);
  };

  const sendWA = () => {
    const ph = f.phone.replace(/\D/g,"");
    const msg = encodeURIComponent(
      `¡Hola ${f.name.split(" ")[0]}! Te doy acceso a Hadrion 🎉\n\n` +
      `🔗 App: hadrion.netlify.app\n` +
      `📧 Email: ${f.email}\n🔑 Contraseña: ${f.password}\n` +
      `📅 Período de prueba: ${f.trialDays} días\n` +
      `⚠️ Vence: ${new Date(Date.now()+f.trialDays*24*60*60*1000).toLocaleDateString("es-UY")}\n\n` +
      `Para renovar tu acceso: comunipro12@gmail.com\n` +
      `Pagos aceptados: MercadoPago · Transferencia · RedPagos\n\n` +
      `¡Cualquier consulta acá estoy! 💜`
    );
    window.open(`https://wa.me/${ph}?text=${msg}`, "_blank");
  };

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Administración</div></div>
      <div className="atabrow">
        {[{k:"usuarios",l:"👥 Usuarios"},{k:"seguridad",l:"🛡️ Seguridad"},{k:"publicidad",l:"📢 Publicidad"}].map(t => (
          <button key={t.k} className={`atab${tab===t.k?" active":""}`} onClick={() => setTab(t.k)}>{t.l}</button>
        ))}
      </div>

      {tab === "usuarios" && (
        <>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div style={{ fontSize:13, color:C.grayL }}>{users.length} usuarios</div>
            <button className="btn btnp btnsm" onClick={() => setShowNew(true)}>+ Dar de alta</button>
          </div>
          {users.map(u => (
            <div key={u.id} className="sc" style={{ marginBottom:10 }}>
              <div className="sch">
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div className="av" style={{ width:40, height:40, background:u.color, fontSize:14, borderRadius:12 }}>{u.avatar}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13 }}>{u.name}</div>
                    <div style={{ fontSize:11, color:C.grayL }}>{u.email}</div>
                  </div>
                </div>
                <span className={`roletag ${u.role==="admin"?"radmin":"rpro"}`}>{u.role==="admin"?"👑 Admin":"Pro"}</span>
              </div>
              <div className="scb">
                {u.trialExpiry && <div className="alert alrtw" style={{ padding:"6px 10px", fontSize:11, marginBottom:8 }}>⏰ Trial vence: {u.trialExpiry}</div>}
                <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                  {u.status==="active" && <button className="btn btng btnsm" onClick={() => setUsers(prev => prev.map(x => x.id===u.id?{...x,status:"inactive"}:x))}>⏸️ Suspender</button>}
                  {u.status==="inactive" && <button className="btn btnp btnsm" onClick={() => setUsers(prev => prev.map(x => x.id===u.id?{...x,status:"active"}:x))}>▶️ Reactivar</button>}
                  {u.id !== currentUser?.id && <button className="btn btnd btnsm" onClick={() => setUsers(prev => prev.filter(x => x.id!==u.id))}>🗑️</button>}
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {tab === "seguridad" && (
        <SC title="🛡️ Políticas de seguridad">
          {[["Autenticación","Email + contraseña","✅"],["Roles","Admin / Profesional (RBAC)","✅"],["Datos","localStorage cifrado","✅"],["2FA","Doble factor","🔜"],["Auditoría","Log de acciones","🔄"]].map(([n,d,s]) => (
            <div key={n} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:`1px solid ${C.sand}` }}>
              <div style={{ flex:1 }}><div style={{ fontWeight:600, fontSize:13 }}>{n}</div><div style={{ fontSize:11, color:C.grayL }}>{d}</div></div>
              <span style={{ fontSize:18 }}>{s}</span>
            </div>
          ))}
        </SC>
      )}

      {tab === "publicidad" && (
        <div>
          <div className="alert alrts" style={{ marginBottom:12 }}>
            💡 Recomendaciones para publicar de forma segura
          </div>
          <SC title="📢 Modelo de publicación para redes">
            <div style={{ background:C.cream, borderRadius:12, padding:14, fontSize:13, lineHeight:1.8, whiteSpace:"pre-wrap" }}>
{`✨ HADRION — La plataforma clínica para profesionales terapéuticos

¿Trabajás con pacientes en fonoaudiología, psicología, psicopedagogía o terapia ocupacional?

🎯 Registrá sesiones en segundos
📅 Agendá con Google Calendar integrado
📄 Generá informes con IA
🔤 Conciencia fonológica con audio
📊 Reportes para familias y escuelas

👉 Probá GRATIS 15 días: [enlace a formulario]
📩 Consultas: [formulario de contacto]

#fonoaudiología #terapiaocupacional #psicopedagogía #plataformaclinica #uruguay`}
            </div>
            <button className="btn btng btnsm" style={{ marginTop:8 }} onClick={() => navigator.clipboard?.writeText("✨ HADRION — La plataforma clínica...")}>📋 Copiar</button>
          </SC>
          <SC title="🔒 Consejos de seguridad">
            {[
              "✅ Usá un formulario de Google Forms en lugar de tu número personal",
              "✅ Creá una cuenta de WhatsApp Business separada para la app",
              "✅ Para pagos: MercadoPago (tiene protección al vendedor)",
              "✅ Transferencia bancaria directa (BROU o Scotiabank Uruguay)",
              "✅ RedPagos / Abitab para cobros presenciales",
              "⚠️ NO publicar número personal en publicaciones públicas",
              "⚠️ Usar link de WhatsApp: wa.me/598XXXXXXXX en bio del perfil",
            ].map((tip, i) => (
              <div key={i} style={{ fontSize:12, padding:"6px 0", borderBottom:`1px solid ${C.sand}` }}>{tip}</div>
            ))}
          </SC>
          <SC title="🔗 Demo de 1 minuto (estructura sugerida)">
            <div style={{ fontSize:12, color:C.grayL, lineHeight:1.8 }}>
              Para implementar una demo de tiempo limitado necesitás Supabase (que ya tenés). La lógica sería:
              1) Crear un link único con token temporal en tu base de datos
              2) El token expira a los 60 segundos
              3) Al vencer, redirige a tu formulario de contacto
              <br /><br />
              Con tu configuración actual de Supabase + GitHub Pages esto es implementable. ¿Querés que te genere ese módulo?
            </div>
          </SC>
        </div>
      )}

      {showNew && (
        <Modal title="Dar de alta usuario" onClose={() => setShowNew(false)}>
          {[["Nombre completo","name","text"],["Email","email","email"],["Contraseña inicial","password","text"],["Especialidad","specialty","text"],["WhatsApp (con código de país)","phone","tel"]].map(([l,k,tp]) => (
            <div className="fg" key={k}><label className="lbl">{l}</label>
              <input className="inp" type={tp} value={f[k]||""} onChange={e => setF({...f,[k]:e.target.value})} />
            </div>
          ))}
          <div className="fg"><label className="lbl">Rol</label>
            <select className="inp" value={f.role} onChange={e => setF({...f,role:e.target.value})}>
              <option value="profesional">Profesional</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="fg"><label className="lbl">Plan</label>
            <select className="inp" value={f.plan} onChange={e => setF({...f,plan:e.target.value})}>
              {["Básico","Pro","Institucional"].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="fg">
            <label className="lbl">Días de prueba</label>
            <input className="inp" type="number" value={f.trialDays} min="1" max="90"
              onChange={e => setF({...f,trialDays:parseInt(e.target.value)||15})} />
            <div style={{ fontSize:11, color:C.grayL, marginTop:4 }}>
              Vence: {new Date(Date.now()+f.trialDays*24*60*60*1000).toLocaleDateString("es-UY")}
            </div>
          </div>
          <button className="btn btnp btnfull" onClick={add}>✅ Crear usuario</button>
          {f.name && f.phone && f.email && f.password && (
            <button className="btn btnsm btnfull" style={{ background:"#25D366", color:"white", marginTop:8 }} onClick={sendWA}>
              📱 Enviar acceso por WhatsApp
            </button>
          )}
        </Modal>
      )}
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function Profile({ user, onLogout, setUser, lang, setLang, currency, setCurrency, defaultDuration, setDefaultDuration }) {
  const [ed, setEd] = useState(false);
  const [pwF, setPwF] = useState({ current:"", newPw:"", confirm:"" });
  const [pwOk, setPwOk] = useState(false);
  const [pwErr, setPwErr] = useState("");
  const t = T[lang];

  const changePw = () => {
    setPwErr(""); setPwOk(false);
    if (!pwF.current || !pwF.newPw || !pwF.confirm) { setPwErr("Completá todos los campos."); return; }
    if (pwF.current !== user.password) { setPwErr("Contraseña actual incorrecta."); return; }
    if (pwF.newPw !== pwF.confirm) { setPwErr("Las contraseñas no coinciden."); return; }
    if (pwF.newPw.length < 6) { setPwErr("Mínimo 6 caracteres."); return; }
    setUser(prev => ({...prev, password:pwF.newPw}));
    setPwF({ current:"", newPw:"", confirm:"" }); setPwOk(true);
  };

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">{t.profile}</div></div>

      <div style={{ background:"white", borderRadius:18, padding:20, textAlign:"center", marginBottom:14, boxShadow:"0 1px 8px rgba(0,0,0,.06)" }}>
        <div className="av" style={{ width:68, height:68, background:user.color, fontSize:24, margin:"0 auto 12px", borderRadius:20 }}>{user.avatar}</div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700 }}>{user.name}</div>
        <div style={{ fontSize:13, color:C.grayL, marginTop:2 }}>{user.specialty}</div>
        <span className={`roletag ${user.role==="admin"?"radmin":"rpro"}`} style={{ marginTop:8, display:"inline-flex" }}>
          {user.role==="admin"?"👑 Admin":"Profesional"}
        </span>
      </div>

      <SC title="⚙️ Preferencias">
        <div className="fg">
          <label className="lbl">{t.language}</label>
          <div style={{ display:"flex", gap:8 }}>
            {["es","en"].map(l => (
              <button key={l} className={`btn btnsm${lang===l?" btnp":" btng"}`} onClick={() => setLang(l)}>
                {l==="es"?"🇺🇾 Español":"🇬🇧 English"}
              </button>
            ))}
          </div>
        </div>
        <div className="fg">
          <label className="lbl">{t.currency}</label>
          <select className="inp" value={currency} onChange={e => setCurrency(e.target.value)}>
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
          </select>
        </div>
        <div className="fg">
          <label className="lbl">{t.sessionDuration}</label>
          <input className="inp" type="number" value={defaultDuration} min="5" max="180"
            onChange={e => setDefaultDuration(parseInt(e.target.value)||45)} />
        </div>
      </SC>

      <SC title="📋 Datos" action={<button className="btn btno btnsm" onClick={() => setEd(!ed)}>{ed?"Cancelar":"✏️"}</button>}>
        {!ed
          ? [["Nombre",user.name],["Email",user.email],["Especialidad",user.specialty]].map(([l,v]) => (
            <div key={l} className="hxf"><div className="hxl">{l}</div><div className="hxv">{v}</div></div>
          ))
          : <>
            {[["Nombre","name","text"],["Email","email","email"],["Especialidad","specialty","text"]].map(([l,k,tp]) => (
              <div className="fg" key={k}><label className="lbl">{l}</label>
                <input className="inp" type={tp} defaultValue={user[k]} onChange={e => setUser(prev => ({...prev,[k]:e.target.value}))} />
              </div>
            ))}
            <button className="btn btnp btnfull" onClick={() => setEd(false)}>{t.save}</button>
          </>
        }
      </SC>

      <SC title="🔒 Contraseña">
        <div className="fg"><label className="lbl">Actual</label><input className="inp" type="password" value={pwF.current} onChange={e => setPwF({...pwF,current:e.target.value})} /></div>
        <div className="fg"><label className="lbl">Nueva</label><input className="inp" type="password" value={pwF.newPw} onChange={e => setPwF({...pwF,newPw:e.target.value})} /></div>
        <div className="fg"><label className="lbl">Confirmar nueva</label><input className="inp" type="password" value={pwF.confirm} onChange={e => setPwF({...pwF,confirm:e.target.value})} /></div>
        {pwErr && <div className="alert alrtd">{pwErr}</div>}
        {pwOk && <div className="alert alrts">✅ Contraseña actualizada.</div>}
        <button className="btn btno btnfull" onClick={changePw}>Cambiar contraseña</button>
      </SC>

      <button className="btn btnd btnfull" style={{ marginTop:8 }} onClick={onLogout}>{t.logout}</button>
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
export default function HadrionApp() {
  const stored = load();

  const [users, setUsersRaw] = useState(stored?.users || INIT_USERS);
  const [user, setUser] = useState(stored?.user || null);
  const [active, setActive] = useState("dashboard");
  const [patients, setPatientsRaw] = useState(stored?.patients || INIT_PATIENTS);
  const [sessions, setSessionsRaw] = useState(stored?.sessions || INIT_SESSIONS);
  const [payments, setPaymentsRaw] = useState(stored?.payments || INIT_PAYMENTS);
  const [agendaItems, setAgendaRaw] = useState(stored?.agendaItems || [
    { id:1, patient:"Valentina López", time:"09:00", end:"09:45", type:"Sesión", color:C.terra, date:todayISO(), duration:45 },
  ]);
  const [selPatId, setSelPatId] = useState(null);
  const [lang, setLang] = useState(stored?.lang || "es");
  const [currency, setCurrency] = useState(stored?.currency || "UYU");
  const [defaultDuration, setDefaultDuration] = useState(stored?.defaultDuration || 45);

  const persist = useCallback((extra = {}) => {
    save({ users, user, patients, sessions, payments, agendaItems, lang, currency, defaultDuration, ...extra });
  }, [users, user, patients, sessions, payments, agendaItems, lang, currency, defaultDuration]);

  const mk = (setFn, rawFn, key) => v => {
    setFn(v);
    const val = typeof v === "function" ? v(eval(key)) : v;
    save({ users, user, patients, sessions, payments, agendaItems, lang, currency, defaultDuration, [key]: val });
  };

  const setUsers = v => { setUsersRaw(v); const val = typeof v==="function"?v(users):v; save({users:val,user,patients,sessions,payments,agendaItems,lang,currency,defaultDuration}); };
  const setPatients = v => { setPatientsRaw(v); const val = typeof v==="function"?v(patients):v; save({users,user,patients:val,sessions,payments,agendaItems,lang,currency,defaultDuration}); };
  const setSessions = v => { setSessionsRaw(v); const val = typeof v==="function"?v(sessions):v; save({users,user,patients,sessions:val,payments,agendaItems,lang,currency,defaultDuration}); };
  const setPayments = v => { setPaymentsRaw(v); const val = typeof v==="function"?v(payments):v; save({users,user,patients,sessions,payments:val,agendaItems,lang,currency,defaultDuration}); };
  const setAgenda = v => { setAgendaRaw(v); const val = typeof v==="function"?v(agendaItems):v; save({users,user,patients,sessions,payments,agendaItems:val,lang,currency,defaultDuration}); };

  const handleSetLang = l => { setLang(l); save({users,user,patients,sessions,payments,agendaItems,lang:l,currency,defaultDuration}); };
  const handleSetCurrency = c => { setCurrency(c); save({users,user,patients,sessions,payments,agendaItems,lang,currency:c,defaultDuration}); };
  const handleSetDuration = d => { setDefaultDuration(d); save({users,user,patients,sessions,payments,agendaItems,lang,currency,defaultDuration:d}); };

  const logout = () => { setUser(null); setActive("dashboard"); save({users,user:null,patients,sessions,payments,agendaItems,lang,currency,defaultDuration}); };

  const setUserFull = u => { setUser(u); save({users,user:u,patients,sessions,payments,agendaItems,lang,currency,defaultDuration}); };

  const t = T[lang];

  const NAV_ITEMS = [
    { id:"dashboard",  l:t.dashboard,  i:"🏠", s:lang==="en"?"Main":"Principal" },
    { id:"agenda",     l:t.agenda,     i:"📅" },
    { id:"patients",   l:t.patients,   i:"👥" },
    { id:"payments",   l:t.payments,   i:"💳" },
    { id:"sessions",   l:t.sessions,   i:"📝" },
    { id:"history",    l:t.history,    i:"📋", s:lang==="en"?"Clinical":"Clínico" },
    { id:"objectives", l:t.objectives, i:"🎯" },
    { id:"phonology",  l:t.phonology,  i:"🔤" },
    { id:"reports",    l:t.reports,    i:"📊" },
    { id:"ia",         l:t.ia,         i:"🧠", s:lang==="en"?"Tools":"Herramientas" },
    { id:"resources",  l:t.resources,  i:"📚" },
    { id:"admin",      l:t.admin,      i:"🔐", s:"Admin", adminOnly:true },
    { id:"profile",    l:t.profile,    i:"👤" },
  ];

  const pages = {
    dashboard: <Dashboard user={user} patients={patients} sessions={sessions} payments={payments} setActive={setActive} agendaItems={agendaItems} lang={lang} currency={currency} />,
    agenda: <Agenda patients={patients} items={agendaItems} setItems={setAgenda} lang={lang} defaultDuration={defaultDuration} />,
    patients: <Patients patients={patients} setPatients={setPatients} setActive={setActive} setSelPatId={setSelPatId} sessions={sessions} lang={lang} />,
    payments: <Payments patients={patients} payments={payments} setPayments={setPayments} lang={lang} currency={currency} setCurrency={handleSetCurrency} />,
    sessions: <Sessions patients={patients} sessions={sessions} setSessions={setSessions} setPatients={setPatients} lang={lang} defaultDuration={defaultDuration} />,
    history: <History patients={patients} sessions={sessions} selectedPatientId={selPatId} lang={lang} />,
    objectives: <Objectives lang={lang} />,
    phonology: <Phonology lang={lang} />,
    reports: <Reports patients={patients} sessions={sessions} payments={payments} lang={lang} currency={currency} />,
    ia: <IAAsistente patients={patients} lang={lang} />,
    resources: <Resources lang={lang} />,
    admin: user?.role==="admin" ? <Admin users={users} setUsers={setUsers} lang={lang} currentUser={user} /> : <div className="fu"><div className="alert alrtd">🔐 Solo administradores.</div></div>,
    profile: <Profile user={user} onLogout={logout} setUser={setUserFull} lang={lang} setLang={handleSetLang} currency={currency} setCurrency={handleSetCurrency} defaultDuration={defaultDuration} setDefaultDuration={handleSetDuration} />,
  };

  const bnItems = [
    { id:"dashboard", l:t.dashboard, i:"🏠" },
    { id:"patients",  l:t.patients,  i:"👥" },
    { id:"agenda",    l:t.agenda,    i:"📅" },
    { id:"sessions",  l:t.sessions,  i:"📝" },
    { id: user?.role==="admin"?"admin":"profile", l:user?.role==="admin"?t.admin:t.profile, i:user?.role==="admin"?"🔐":"👤" },
  ];

  if (!user) return (
    <>
      <style>{CSS}</style>
      <Login onLogin={setUserFull} users={users} lang={lang} />
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <div className="sidebar">
          <div className="slogo">
            <div className="slogoicon">H</div>
            <div><div className="slogoname">Hadrion</div><div className="slogosub">Plataforma Clínica</div></div>
          </div>
          {NAV_ITEMS.filter(n => !n.adminOnly || user?.role==="admin").map(n => (
            <div key={n.id}>
              {n.s && <div className="ssec">{n.s}</div>}
              <div className={`sitem${active===n.id?" active":""}`} onClick={() => setActive(n.id)}>
                <span className="sicon">{n.i}</span>{n.l}
                {n.id==="admin" && <span className="sbadge">Admin</span>}
              </div>
            </div>
          ))}
          <div className="suser">
            <div style={{ fontSize:13, fontWeight:600 }}>{user.name}</div>
            <div style={{ fontSize:11, color:C.grayL }}>{user.specialty}</div>
            <div style={{ display:"flex", gap:6, marginTop:6 }}>
              <button className="btn btnsm" style={{ fontSize:10, padding:"4px 8px", background:lang==="es"?C.terra:"transparent", color:lang==="es"?"white":C.grayL, border:`1px solid ${C.sand}` }} onClick={() => handleSetLang("es")}>ES</button>
              <button className="btn btnsm" style={{ fontSize:10, padding:"4px 8px", background:lang==="en"?C.terra:"transparent", color:lang==="en"?"white":C.grayL, border:`1px solid ${C.sand}` }} onClick={() => handleSetLang("en")}>EN</button>
            </div>
          </div>
        </div>
        <div className="mwrap">
          <div className="tbar">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", paddingBottom:6 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:13, fontWeight:600 }}>{user.name.split(" ")[0]}</div>
                  <div style={{ fontSize:10, color:C.grayL }}>{user.role==="admin"?"👑 Admin":"Pro"} · {currency}</div>
                </div>
                <div onClick={() => setActive("profile")} style={{ width:36, height:36, borderRadius:10, background:user.color, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                  {user.avatar}
                </div>
              </div>
            </div>
          </div>
          <div className="pbody">{pages[active] || pages.dashboard}</div>
          <div style={{ textAlign:"center", padding:"14px 20px", fontSize:11, color:"#9B9590", borderTop:`1px solid ${C.sand}` }}>
            <div style={{ fontWeight:700, color:C.terraD }}>Hadrion — Plataforma Terapéutica</div>
            <div>(c) 2025 Adriana Soba · Uruguay · comunipro12@gmail.com</div>
          </div>
        </div>
        <nav className="bnav noprint">
          {bnItems.map(n => (
            <button key={n.id} className={`bn${active===n.id?" active":""}`} onClick={() => setActive(n.id)}>
              <span className="bnicon">{n.i}</span>{n.l}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
