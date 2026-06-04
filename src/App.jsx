// ================================================
// HADRION - Plataforma Terapeutica
// (c) 2025 Adriana Soba. Todos los derechos reservados.
// Desarrollado en Uruguay — comunipro12@gmail.com
// Prohibida su reproduccion sin autorizacion expresa.
// ================================================

import React, { useState, useEffect } from "react";

// ─── PALETA DE COLORES ───────────────────────────────────────────────────────
const C = {
  terra:"#9B7EBD", terraL:"#D4BCE8", terraD:"#7B5EA7", terraF:"#F5F0FA",
  cream:"#FDF8FF", sand:"#EDE0F5", sandD:"#C9B8E8",
  sage:"#E8719C",  sageF:"#FDE8F0", forest:"#C0396B",
  charcoal:"#2C2C2C", gray:"#6B6560", grayL:"#9B9590",
  white:"#FFFFFF", danger:"#C0392B", dangerF:"#FDECEA",
  info:"#5B8DB8",  infoF:"#EBF3FB",
  purple:"#8B7BB5", purpleF:"#F0EDF8",
  gold:"#E8A020",  goldF:"#FEF3E0",
  green:"#2ECC71", greenF:"#E8F8EF",
};

// ─── FUENTES ─────────────────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');`;

// ─── DATOS INICIALES ─────────────────────────────────────────────────────────
const INIT_USERS = [
  { id:1, name:"Adriana Soba",   email:"comunipro12@gmail.com", password:"admin123",
    role:"admin",         specialty:"Fonoaudiologa",   plan:"Pro",    status:"active",
    createdAt:"01/01/2025", avatar:"AS", color:C.terra,  lastLogin:"Hoy 08:30",
    subscriptionEnd:null, dataExpiresAt:null, trialDays:14 },
  { id:2, name:"Ana Garcia",     email:"ana@clinica.cl",         password:"123456",
    role:"profesional",   specialty:"Psicopedagoga",   plan:"Basico", status:"active",
    createdAt:"15/03/2025", avatar:"AG", color:C.sage,   lastLogin:"Ayer 16:00",
    subscriptionEnd:"2026-07-15", dataExpiresAt:"2026-08-14", trialDays:14 },
  { id:3, name:"Carlos Ruiz",    email:"carlos@terapia.cl",      password:"123456",
    role:"profesional",   specialty:"Fonoaudiologo",   plan:"Pro",    status:"pending",
    createdAt:"20/05/2025", avatar:"CR", color:C.purple, lastLogin:"—" },
  { id:4, name:"Sofia Pinto",    email:"sofia@neuro.cl",          password:"123456",
    role:"profesional",   specialty:"T.O.",             plan:"Basico", status:"inactive",
    createdAt:"10/04/2025", avatar:"SP", color:C.info,   lastLogin:"12/05/2025" },
];

const INIT_PATIENTS = [
  { id:1, name:"Valentina Lopez", age:7,  diagnosis:"TEL",      sessions:12, nextSession:"Lun 27/05 10:00",
    avatar:"VL", color:C.terra,  phone:"(+54) 9 8765 4321", email:"vlopez@mail.com",
    guardian:"Maria Lopez (madre)", notes:"Dificultad en fonemas fricativos. Buena disposicion.",
    goals:["Produccion /s/ en posicion inicial","Discriminacion auditiva de pares minimos","Comprension de instrucciones complejas"], status:"active",
    dependencia:"Particular", tarifaPorSesion:1500, complemento:0, currency:"UYU", asistencias:{} },
  { id:2, name:"Martin Garcia",   age:9,  diagnosis:"Dislexia",  sessions:8,  nextSession:"Mie 29/05 09:00",
    avatar:"MG", color:C.sage,   phone:"(+54) 9 7654 3210", email:"mgarcia@mail.com",
    guardian:"Pedro Garcia (padre)",  notes:"Confusion persistente b/d. Mejora en velocidad lectora.",
    goals:["Decodificacion b/d/p/q","Velocidad lectora 80 ppm","Comprension lectora nivel 3 grados"], status:"active",
    dependencia:"BPS", tarifaPorSesion:800, complemento:200, currency:"UYU", asistencias:{} },
  { id:3, name:"Sofia Ramirez",   age:6,  diagnosis:"TDAH",      sessions:15, nextSession:"Jue 30/05 11:00",
    avatar:"SR", color:C.purple, phone:"(+54) 9 6543 2109", email:"sramirez@mail.com",
    guardian:"Ana Ramirez (madre)", notes:"Alta dispersion. Responde bien a actividades cortas.",
    goals:["Atencion sostenida 15 min","Autorregulacion emocional","Seguimiento de instrucciones secuenciadas"], status:"active", dependencia:"Particular", tarifaPorSesion:1200, complemento:0, currency:"UYU", asistencias:{} },
  { id:4, name:"Tomas Herrera",   age:8,  diagnosis:"Disartria", sessions:6,  nextSession:"Vie 31/05 10:00",
    avatar:"TH", color:C.info,   phone:"(+54) 9 5432 1098", email:"therrera@mail.com",
    guardian:"Rosa Herrera (madre)", notes:"Dificultad en articulacion. Buena motivacion.",
    goals:["Praxias bucofonatorias","Produccion de oclusivas","Inteligibilidad del habla 80%"], status:"active", dependencia:"FONASA", tarifaPorSesion:900, complemento:0, currency:"UYU", asistencias:{} },
  { id:5, name:"Pedro Salinas",   age:3,  diagnosis:"TEA",       sessions:4,  nextSession:"Sin agendar",
    avatar:"PS", color:C.gold,   phone:"(+54) 9 4321 0987", email:"psalinas@mail.com",
    guardian:"Luis Salinas (padre)", notes:"Primera infancia. Comunicacion no verbal predominante.",
    goals:["Contacto visual sostenido","Comunicacion intencional","Juego funcional con objetos"], status:"active", dependencia:"Mutual", tarifaPorSesion:1000, complemento:0, currency:"UYU", asistencias:{} },
];

const INIT_SESSIONS = [
  { id:1, patientId:1, patient:"Valentina Lopez", date:"20/05/2025",
    objective:"Fonemas fricativos /s/", note:"Logro producir /s/ en posicion inicial con apoyo visual. Muy motivada.",
    progress:70, activities:["Conciencia fonologica con rimas","Espejo articulatorio"],
    homework:"Practicar /s/ frente al espejo 5 min diarios",
    estado:"regulado", atencion:"sostenida", participacion:"buena", sensorial:[] },
  { id:2, patientId:2, patient:"Martin Garcia",   date:"18/05/2025",
    objective:"Decodificacion b/d", note:"Mejora en velocidad lectora. Confusion persistente b/d.",
    progress:55, activities:["Ruleta de silabas","Lectura cronometrada"],
    homework:"Leer 10 min con adulto cada noche",
    estado:"cansado", atencion:"fluctuante", participacion:"parcial", sensorial:[] },
  { id:3, patientId:3, patient:"Sofia Ramirez",   date:"22/05/2025",
    objective:"Atencion sostenida", note:"Logro mantener atencion 12 min con semaforo.",
    progress:60, activities:["Semaforo de emociones"],
    homework:"Juego de memoria 5 min post comida",
    estado:"hiperactivo", atencion:"dispersa", participacion:"buena", sensorial:[] },
];

const INIT_PAYMENTS = [
  { id:1, patientId:1, patient:"Valentina Lopez", amount:15000, type:"Particular",  date:"20/05/2025", method:"Transferencia", status:"pagado"   },
  { id:2, patientId:2, patient:"Martin Garcia",   amount:12000, type:"Obra social", date:"18/05/2025", method:"Efectivo",      status:"pagado"   },
  { id:3, patientId:3, patient:"Sofia Ramirez",   amount:15000, type:"Particular",  date:"22/05/2025", method:"Transferencia", status:"pendiente" },
];

const INIT_PLAN = [
  { id:1, patientId:1, area:"fono",           professional:"Ana Garcia",    objectives:["Produccion /s/ en posicion inicial","Discriminacion auditiva"],  progress:70, lastUpdate:"20/05/2025", notes:"Avance sostenido." },
  { id:2, patientId:1, area:"psico",          professional:"Carlos Ruiz",   objectives:["Regulacion emocional","Tolerancia a la frustracion"],             progress:50, lastUpdate:"18/05/2025", notes:"Dificultad en transiciones." },
  { id:3, patientId:3, area:"psicomotricidad",professional:"Laura Perez",   objectives:["Coordinacion bimanual","Equilibrio dinamico"],                    progress:60, lastUpdate:"22/05/2025", notes:"Mejora notable." },
  { id:4, patientId:3, area:"fisio",          professional:"Roberto Silva",  objectives:["Tono muscular","Postura sedente"],                                progress:45, lastUpdate:"21/05/2025", notes:"Hipotonia leve." },
];

// ─── FONEMAS — CORREGIDO: sin duplicados, con Ñ ──────────────────────────────
const PHONEMES = ["A","E","I","O","U","B","C","CH","D","F","G","J","L","LL","M","N","Ñ","P","R","RR","S","T","V","Y","Z"];

// ─── EMOJIS POR FONEMA ────────────────────────────────────────────────────────
const PHONEME_EMOJI = {
  "A": ["✈️","🌳","🕷️","🐝","🦅","⚓","🏹","🐿️"],
  "E": ["🐘","⭐","🪜","🪞","🧹","🧝","🛡️"],
  "I": ["⛪","🦎","🏝️","🧲","🐛","👦"],
  "O": ["🐻","🐑","👁️","🪣","🐛","🐋","🏗️"],
  "U": ["🍇","👔","🦄","🏺","🥄"],
  "B": ["👄","🚢","🚲","🐋","🥾","🫏","👜"],
  "C": ["🏠","🛏️","🐇","🍳","🚛","🚗","🐴"],
  "CH":["🍫","🍬","🐷","🦺","🪬"],
  "D": ["👆","🎲","🦕","🧝","🐉","🍬","🦷"],
  "F": ["🦭","🍓","🌸","🔥","👨‍👩‍👧","🎸","🍎"],
  "G": ["🐱","🎈","🍪","🦍","🌻","🐛","🎸"],
  "J": ["🦒","🧃","🌻","🪆","🧼","🐗"],
  "L": ["🌙","✏️","🥛","📚","🦜","🦎","🍋"],
  "LL":["🗝️","🛞","🌧️","🦙","😢"],
  "M": ["🦋","🪑","🍎","🐒","🎒","🔨","🧙"],
  "N": ["☁️","🍊","👃","❄️","🐦","🔢","🌰"],
  "Ñ": ["🦆","🍍","💅"],
  "P": ["🦆","⚽","🐕","🎹","🚪","🕊️","🐙"],
  "R": ["🐭","🤖","🌹","📏","⌚","🛞","🐸"],
  "RR":["🚗","🐕","🌍","📋","🫏","⛰️","🗼"],
  "S": ["☀️","🪑","🍵","🐸","🌱","🐍","☂️"],
  "T": ["✂️","🚂","🐢","🐯","🍅","🥁","📺"],
  "V": ["🐄","🎻","🪟","👗","🌋","⛵","🥦"],
  "Y": ["🪀","🍦","⛵","🌿","🐎"],
  "Z": ["👟","🦊","🥕","🦓","🍋"],
};

const PHONEME_WORDS = {
  "A": ["AVION","ARBOL","ARAÑA","ABEJA","AGUILA","ANCLA","ARCO","ARDILLA"],
  "E": ["ELEFANTE","ESTRELLA","ESCALERA","ESPEJO","ESCOBA","ENANO","ESCUDO"],
  "I": ["IGLESIA","IGUANA","ISLA","IMAN","INSECTO","INDIO"],
  "O": ["OSO","OVEJA","OJO","OLLA","ORUGA","ORCA","OBRA"],
  "U": ["UVA","UNIFORME","UNICORNIO","URNA","UTENSILIO"],
  "B": ["BOCA","BARCO","BICICLETA","BALLENA","BOTA","BURRO","BOLSA"],
  "C": ["CASA","CAMA","CONEJO","COCINA","CAMION","CARRO","CABALLO"],
  "CH":["CHOCOLATE","CHUPETE","CHANCHO","CHALECO","CHICLE"],
  "D": ["DEDO","DADO","DINOSAURIO","DUENDE","DRAGON","DULCE","DIENTE"],
  "F": ["FOCA","FRESA","FLOR","FUEGO","FAMILIA","FLAUTA","FRUTA"],
  "G": ["GATO","GLOBO","GALLETA","GORILA","GIRASOL","GUSANO","GUITARRA"],
  "J": ["JIRAFA","JUGO","JARDIN","JUGUETE","JABON","JABALI"],
  "L": ["LUNA","LAPIZ","LECHE","LIBRO","LORO","LAGARTO","LIMON"],
  "LL":["LLAVE","LLANTA","LLUVIA","LLAMA","LLORAR"],
  "M": ["MARIPOSA","MESA","MANZANA","MONO","MOCHILA","MARTILLO","MAGO"],
  "N": ["NUBE","NARANJA","NARIZ","NIEVE","NIDO","NUMERO","NUEZ"],
  "Ñ": ["ÑANDU","NIÑO","UÑAS","PIÑA","MUÑECA"],
  "P": ["PATO","PELOTA","PERRO","PIANO","PUERTA","PALOMA","PULPO"],
  "R": ["RATON","ROBOT","ROSA","REGLA","RELOJ","RUEDA","RANA"],
  "RR":["CARRO","PERRO","TIERRA","PIZARRA","BURRO","CERRO","TORRE"],
  "S": ["SOL","SILLA","SOPA","SAPO","SEMILLA","SERPIENTE","SOMBRILLA"],
  "T": ["TIJERAS","TREN","TORTUGA","TIGRE","TOMATE","TAMBOR","TELEVISION"],
  "V": ["VACA","VIOLIN","VENTANA","VESTIDO","VOLCAN","VELERO","VERDURA"],
  "Y": ["YOYO","YOGUR","YATE","YERBA","YEGUA"],
  "Z": ["ZAPATO","ZORRO","ZANAHORIA","ZEBRA","ZUMO"],
};

// ─── ÁREAS COLABORATIVAS ──────────────────────────────────────────────────────
const AREAS = [
  { id:"fono",           label:"Fonoaudiologia",   icon:"🗣️", color:"#9B7EBD" },
  { id:"psico",          label:"Psicologia",        icon:"🧠", color:"#8B7BB5" },
  { id:"psicoped",       label:"Psicopedagogia",    icon:"📚", color:"#5B8DB8" },
  { id:"psicomotricidad",label:"Psicomotricidad",   icon:"🤸", color:"#2ECC71" },
  { id:"fisio",          label:"Fisioterapia",      icon:"💪", color:"#E8A020" },
  { id:"to",             label:"Terapia Ocupacional",icon:"🖐️",color:"#E8719C" },
  { id:"musico",         label:"Musicoterapia",     icon:"🎵", color:"#C0392B" },
  { id:"otro",           label:"Otra area",         icon:"➕", color:"#9B9590" },
];

// ─── BANCO DE ACTIVIDADES ─────────────────────────────────────────────────────
const ACTIVITIES_DB = [
  { id:1, name:"Rimas y trabalenguas", category:"Lenguaje", target:"TEL", type:"Clinica", age:"3-6", ageGroup:"Preescolar",
    description:"Trabajar conciencia fonologica a traves de rimas y trabalenguas con apoyo visual.",
    materials:"Tarjetas ilustradas con imagenes rimadas, espejo",
    niveles:{
      facil:{ titulo:"Rimas simples",
        instrucciones:"Mostrar dos imagenes (sol/caracol). Preguntar: ¿riman estas palabras? El nino responde SI o NO con gesto o voz.",
        ejemplos:["sol - caracol","mesa - fresa","pato - zapato"],
        apoyo:"Apoyo visual total, modelado del adulto" },
      medio:{ titulo:"Completar la rima",
        instrucciones:"Decir el inicio de una rima y pedir que el nino complete: 'En el jardin hay una flor, y tambien hay un...' (color)",
        ejemplos:["La luna llena / se asoma a la (arena)","El gato gordo / se sento en el (borde)"],
        apoyo:"Dar 2 opciones para elegir" },
      dificil:{ titulo:"Crear rimas propias",
        instrucciones:"El nino debe crear una oracion que rime con la que dice el adulto. Se puede usar un dado de imagenes.",
        ejemplos:["Adulto: El nino corre / Nino: y el perro sorre","Crear una rima sobre animales, colores"],
        apoyo:"Sin apoyo, produccion espontanea" },
    }, printable:true },

  { id:2, name:"Secuencias narrativas", category:"Lenguaje", target:"TEL", type:"Clinica", age:"4-9", ageGroup:"Preescolar/Escolar",
    description:"Ordenar y narrar historias con imagenes secuenciadas para trabajar cohesion y coherencia.",
    materials:"Laminas de 3-6 vinetas impresas, velcro o sobres",
    niveles:{
      facil:{ titulo:"Secuencia de 2 imagenes",
        instrucciones:"Presentar 2 vinetas desordenadas. El nino las ordena y describe con una palabra o frase simple.",
        ejemplos:["Nino triste → nino comiendo → nino sonriendo","Manzana en arbol → caida → comida"],
        apoyo:"Modelado previo del adulto, lenguaje gestual aceptado" },
      medio:{ titulo:"Secuencia de 4 imagenes",
        instrucciones:"Ordenar 4 vinetas y narrar con oraciones completas. Usar el modelo: Primero... Despues... Luego... Al final...",
        ejemplos:["Historia del cumpleanos: preparacion, fiesta, torta, regalo","Historia de la manana: despertar, banarse, desayunar, ir al colegio"],
        apoyo:"Claves de inicio de oracion impresas" },
      dificil:{ titulo:"Cuento libre con 6 vinetas",
        instrucciones:"Ordenar 6 vinetas e inventar el cuento completo con inicio, problema y solucion.",
        ejemplos:["Historia del dinosaurio perdido","Aventura en el bosque con animales"],
        apoyo:"Sin apoyo, grabacion del relato para retroalimentacion" },
    }, printable:true },

  { id:3, name:"Vocabulario por categorias", category:"Lenguaje", target:"TEL", type:"Clinica", age:"3-8", ageGroup:"Preescolar/Escolar",
    description:"Ampliar y organizar el vocabulario semantico por campos lexicales con imagenes reales.",
    materials:"Tarjetas con imagenes reales, canastos o cajas etiquetadas",
    niveles:{
      facil:{ titulo:"Clasificacion basica",
        instrucciones:"Presentar 6 tarjetas de 2 categorias. El nino las separa en dos grupos.",
        ejemplos:["Animales vs frutas","Ropa vs comida","Juguetes vs muebles"],
        apoyo:"Cajas con simbolo visual de la categoria" },
      medio:{ titulo:"Clasificacion multiple",
        instrucciones:"Clasificar 12 tarjetas en 3-4 categorias. Nombrar cada objeto al ubicarlo.",
        ejemplos:["Medios de transporte / animales / alimentos","Cosas del bano / cocina / dormitorio"],
        apoyo:"Dar 2 ejemplos de cada categoria antes de iniciar" },
      dificil:{ titulo:"Definicion funcional",
        instrucciones:"El nino describe para que sirve cada objeto sin nombrar la categoria. El adulto adivina.",
        ejemplos:["'Sirve para cortar, tiene filo' → cuchillo","Jugar al veo veo semantico"],
        apoyo:"Sin apoyo visual, solo lenguaje" },
    }, printable:true },

  { id:4, name:"Comprension de instrucciones", category:"Lenguaje", target:"TEL", type:"Clinica", age:"3-7", ageGroup:"Preescolar",
    description:"Trabajar comprension y seguimiento de consignas simples, de dos pasos y complejas.",
    materials:"Objetos del consultorio o miniaturas, cajas de colores",
    niveles:{
      facil:{ titulo:"Consigna de 1 paso",
        instrucciones:"Dar una instruccion simple con objeto presente: 'Dame el libro', 'Toca la mesa'.",
        ejemplos:["Dame el oso","Salta una vez","Cierra los ojos"],
        apoyo:"Apoyo gestual, maxima proximidad" },
      medio:{ titulo:"Consigna de 2 pasos",
        instrucciones:"Dar dos instrucciones seguidas: 'Toca la silla y despues dame el lapiz'.",
        ejemplos:["Salta y despues sientate","Busca el cubo azul y ponlo adentro de la caja"],
        apoyo:"Repetir si es necesario, reducir velocidad del habla" },
      dificil:{ titulo:"Consigna con conceptos relacionales",
        instrucciones:"Incluir conceptos espaciales, temporales y logicos.",
        ejemplos:["Pon el rojo ARRIBA del azul pero ANTES aplaude","Dame el que NO es cuadrado"],
        apoyo:"Sin apoyo, evaluacion de comprension" },
    }, printable:true },

  { id:5, name:"Conciencia silabica", category:"Lectoescritura", target:"Dislexia", type:"Clinica", age:"5-8", ageGroup:"Preescolar/Escolar",
    description:"Trabajar segmentacion, identificacion y manipulacion silabica con apoyo visual y cinestesico.",
    materials:"Fichas de colores, palmadas, tablero de silabas",
    niveles:{
      facil:{ titulo:"Contar silabas con palmadas",
        instrucciones:"El adulto dice una palabra y el nino da una palmada por silaba. Comenzar con bisilabas.",
        ejemplos:["ca-sa (2 palmadas)","me-sa (2 palmadas)","za-pa-to (3 palmadas)"],
        apoyo:"Adulto modela primero, tablero con casillas" },
      medio:{ titulo:"Identificar silaba inicial y final",
        instrucciones:"El nino identifica con que silaba empieza o termina la palabra.",
        ejemplos:["Con que silaba empieza PALOMA? PA","Con que silaba termina CORAZON? ON"],
        apoyo:"Marcador visual para inicio y fin de palabra" },
      dificil:{ titulo:"Sustitucion silabica",
        instrucciones:"Cambiar una silaba de la palabra por otra y decir la nueva: 'MESA si cambio ME por PI... PISA'.",
        ejemplos:["PATO sin PA = TO; con FU = FUTO","CAMION cambia CA por MA = MAMION"],
        apoyo:"Sin apoyo, nivel metalinguistico" },
    }, printable:true },

  { id:6, name:"Discriminacion b/d/p/q", category:"Lectoescritura", target:"Dislexia", type:"Clinica", age:"6-10", ageGroup:"Escolar",
    description:"Trabajar la confusion de letras de espejo b/d/p/q con estrategias multisensoriales.",
    materials:"Tarjetas de letras, cama de arena, letras de lija, espejo",
    niveles:{
      facil:{ titulo:"Reconocimiento visual con clave",
        instrucciones:"Usar el truco del 'cama': b tiene la panza a la derecha, d a la izquierda. Practicar solo b y d.",
        ejemplos:["Trazar b en arena","Tocar letra de lija y decir su nombre","Clasificar tarjetas"],
        apoyo:"Clave visual permanente en el escritorio" },
      medio:{ titulo:"Lectura en contexto",
        instrucciones:"Leer oraciones cortas con muchas b y d. Subrayar con colores distintos.",
        ejemplos:["El dado rojo rueda debajo de la cama","La ballena bebe bastante agua"],
        apoyo:"Texto con fuente grande, regleta lectora" },
      dificil:{ titulo:"Escritura diferenciada",
        instrucciones:"Escribir palabras y oraciones al dictado que incluyan b, d, p, q. Sin apoyo visual.",
        ejemplos:["Dictado: barco, dedo, puente, queso","Dictado de oracion: El perro de Pedro bebio agua"],
        apoyo:"Autocorreccion con lista de cotejo" },
    }, printable:true },

  { id:7, name:"Lectura de velocidad y fluidez", category:"Lectoescritura", target:"Dislexia", type:"Clinica", age:"7-12", ageGroup:"Escolar",
    description:"Mejorar velocidad y fluidez lectora con textos graduados y cronometro.",
    materials:"Textos graduados impresos, cronometro, grafico de progreso",
    niveles:{
      facil:{ titulo:"Lectura de silabas y palabras",
        instrucciones:"Leer listas de silabas y palabras monosilabas en 1 minuto. Contar correctas.",
        ejemplos:["Lista: ma, pe, si, ro, tu, ba...","Lista: sol, mar, pie, dos, ven..."],
        apoyo:"Señalar con dedo o lapiz cada silaba" },
      medio:{ titulo:"Lectura de oraciones",
        instrucciones:"Leer oraciones de 5-8 palabras en voz alta. Medir palabras por minuto. Meta: 60 ppm.",
        ejemplos:["El nino come una manzana roja","La pelota rueda por el piso del patio"],
        apoyo:"Regleta lectora, marcador de linea" },
      dificil:{ titulo:"Lectura expresiva de parrafo",
        instrucciones:"Leer parrafos completos respetando puntuacion y entonacion. Meta: 90-100 ppm.",
        ejemplos:["Cuento de 200 palabras con preguntas de comprension","Noticia infantil con vocabulario nuevo"],
        apoyo:"Grabacion para autoevaluacion" },
    }, printable:true },

  { id:8, name:"Semaforo de autorregulacion", category:"Regulacion", target:"TDAH", type:"Clinica", age:"4-10", ageGroup:"Preescolar/Escolar",
    description:"Sistema visual de autorregulacion emocional basado en los colores del semaforo.",
    materials:"Lamina de semaforo grande, tarjetas de emociones, ficha personal",
    niveles:{
      facil:{ titulo:"Identificacion de estados",
        instrucciones:"Mostrar la lamina. ROJO=parar/enojado, AMARILLO=pensar/nervioso, VERDE=ok/tranquilo. El nino ubica donde esta hoy.",
        ejemplos:["¿De que color estas ahora?","Mostrar cara y ubicar en el semaforo"],
        apoyo:"Figuras con caras expresivas, semaforo grande en pared" },
      medio:{ titulo:"Estrategias por color",
        instrucciones:"Para cada color practicar estrategias: ROJO=respirar 3 veces, AMARILLO=contar hasta 5, VERDE=continuar.",
        ejemplos:["'No quiero compartir el juguete' → ¿que color? → ¿que hago?","Respiracion de tortuga"],
        apoyo:"Tarjetas de estrategias plastificadas" },
      dificil:{ titulo:"Uso autonomo y transferencia",
        instrucciones:"El nino usa el semaforo de forma independiente y reporta como lo uso en casa o colegio.",
        ejemplos:["Diario emocional: colorear al inicio y fin de sesion","Contar situacion real donde uso la estrategia"],
        apoyo:"Tarjeta de bolsillo para uso externo" },
    }, printable:true },

  { id:9, name:"Juego de atencion sostenida", category:"Atencion", target:"TDAH", type:"Clinica", age:"5-10", ageGroup:"Preescolar/Escolar",
    description:"Actividades graduadas para entrenar el foco y la atencion sostenida con estimulos visuales.",
    materials:"Laminas de busqueda visual, tablero de puntos, cronometro",
    niveles:{
      facil:{ titulo:"Buscar y marcar (2 min)",
        instrucciones:"Presentar una lamina con figuras. Marcar solo las indicadas en 2 minutos.",
        ejemplos:["Marcar todos los gatos entre 10 animales","Tachar la letra A en un renglon"],
        apoyo:"Lamina simple, pocos distractores, tiempo generoso" },
      medio:{ titulo:"Atencion dividida (5 min)",
        instrucciones:"Tarea con dos variables: marcar circulos grandes Y tachar cuadrados pequenos. 5 min.",
        ejemplos:["Marcar numeros pares Y rodear los impares","Laberinto con dos caminos"],
        apoyo:"Pausas permitidas, retroalimentacion inmediata" },
      dificil:{ titulo:"Atencion con distraccion (8 min)",
        instrucciones:"Realizar tarea de atencion sostenida mientras hay ruido de fondo. 8 minutos.",
        ejemplos:["Completar serie numerica con musica","Sopa de letras con elementos adicionales"],
        apoyo:"Autorregistro de errores y tiempo completado" },
    }, printable:true },

  { id:10, name:"Praxias bucofonatorias", category:"Articulacion", target:"Disartria", type:"Clinica", age:"3-12", ageGroup:"Todos",
    description:"Ejercicios sistematizados de movilidad labial, lingual, mandibular y velar con espejo.",
    materials:"Espejo, lamina de praxias, espejo de mano, cronometro",
    niveles:{
      facil:{ titulo:"Praxias estaticas",
        instrucciones:"Mantener posicion bucal sin movimiento: labios juntos 5 seg, lengua arriba 5 seg. 3 repeticiones.",
        ejemplos:["Labios cerrados y apretados","Lengua en el paladar (chasquido)","Sonrisa amplia sostenida"],
        apoyo:"Guia visual de cada posicion, espejo grande" },
      medio:{ titulo:"Praxias dinamicas",
        instrucciones:"Movimientos en secuencia: labios adelante/atras, lengua arriba/abajo/derecha/izquierda, 5 reps.",
        ejemplos:["Vibrar labios (motocicleta)","Lengua recorre el paladar","Abrir y cerrar con ritmo"],
        apoyo:"Ritmo con palmadas, seguir modelo del espejo" },
      dificil:{ titulo:"Praxias en velocidad y fonacion",
        instrucciones:"Realizar las praxias con velocidad creciente y agregar sonido en cada movimiento.",
        ejemplos:["Pa-ta-ka repetido 10 veces rapido","Secuencia completa en 30 segundos"],
        apoyo:"Video para comparar progreso" },
    }, printable:true },

  { id:11, name:"Lectura compartida en familia", category:"Lectoescritura", target:"Dislexia", type:"Familia", age:"5-12", ageGroup:"Escolar",
    description:"Protocolo de lectura compartida para practicar en casa con el adulto referente.",
    materials:"Libro de nivel lector del nino, separador de paginas, hoja de registro",
    niveles:{
      facil:{ titulo:"Lectura en voz alta del adulto",
        instrucciones:"El adulto lee en voz alta mientras el nino sigue con el dedo. Al terminar cada parrafo, el nino cuenta de que trato.",
        ejemplos:["Libro de 5 paginas ilustradas","El adulto senala las palabras mientras lee"],
        apoyo:"10 minutos diarios, horario fijo" },
      medio:{ titulo:"Lectura en pares turnada",
        instrucciones:"Adulto y nino leen de a turnos: adulto lee un renglon, nino lee el siguiente.",
        ejemplos:["Cuentos adaptados","Libros de la biblioteca escolar"],
        apoyo:"Adulto modela el tono y pausas" },
      dificil:{ titulo:"Lectura independiente con registro",
        instrucciones:"El nino lee 10 minutos solo y le cuenta al adulto de que se trato.",
        ejemplos:["Saga de libros de interes","Registro: fecha, libro, paginas, resumen"],
        apoyo:"Ficha simple de registro semanal" },
    }, printable:true },

  { id:12, name:"Estimulacion linguistica cotidiana", category:"Lenguaje", target:"TEL", type:"Familia", age:"2-6", ageGroup:"Preescolar",
    description:"Estrategias para que la familia estimule el lenguaje durante las rutinas diarias.",
    materials:"Guia para familia impresa, imagenes de las rutinas",
    niveles:{
      facil:{ titulo:"Expansion y modelado",
        instrucciones:"Cuando el nino dice algo, el adulto lo repite correctamente y agrega una palabra mas.",
        ejemplos:["Nino: 'agua' → Adulto: 'quieres agua'","Durante el bano: nombrar partes del cuerpo"],
        apoyo:"Tarjeta de recordatorio en la nevera" },
      medio:{ titulo:"Comentar y preguntar",
        instrucciones:"Durante actividades diarias el adulto comenta y hace preguntas abiertas.",
        ejemplos:["Supermercado: '¿cuales manzanas quieres?'","Libro: '¿que crees que va a hacer?'"],
        apoyo:"Lista de frases estimulantes por rutina" },
      dificil:{ titulo:"Narrar y anticipar",
        instrucciones:"Contar al nino lo que va a pasar antes de hacerlo, y pedirle que lo cuente el.",
        ejemplos:["Antes de salir: '¿que vamos a hacer en el parque?'","Al volver: 'contale a papa lo que hicimos'"],
        apoyo:"Vocabulario semanal sugerido por el profesional" },
    }, printable:true },
];


// ─── ACTIVIDADES POR ESPECIALIDAD ─────────────────────────────────────────────
// Agrega especialidad a las actividades existentes (fonoaudiología)
const ACTIVITIES_DB_EXTRA = [
  // ─── PSICOLOGÍA ──────────────────────────────────────────────────────────────
  { id:20, name:"Técnica de relajación muscular", category:"Ansiedad", target:"Ansiedad generalizada",
    specialty:["Psicología"], type:"Clinica", age:"8-99", ageGroup:"Escolar/Adulto",
    description:"Relajación muscular progresiva de Jacobson para reducir tensión física y ansiedad.",
    materials:"Colchoneta o silla cómoda, audio guía opcional",
    niveles:{
      facil:{ titulo:"Respiración diafragmática",
        instrucciones:"Inhalar 4 seg por nariz, sostener 2 seg, exhalar 6 seg por boca. 5 repeticiones.",
        ejemplos:["Mano en el pecho, mano en la panza — solo sube la panza","Contar mentalmente para distraer el pensamiento"],
        apoyo:"Guía verbal del profesional, música suave de fondo" },
      medio:{ titulo:"Tensión y relajación por grupos musculares",
        instrucciones:"Tensar cada grupo 5 seg, soltar y notar la diferencia. Manos → brazos → hombros → cara → abdomen → piernas.",
        ejemplos:["Apreta el puño fuerte... ahora soltá... notá la diferencia","Arrugá la cara como limón... relajá"],
        apoyo:"Guía verbal, pausas de 10 seg entre grupos" },
      dificil:{ titulo:"Relajación autógena sin guía",
        instrucciones:"El paciente realiza el recorrido corporal de forma autónoma, registrando sensaciones en un diario.",
        ejemplos:["Práctica diaria 10 min antes de dormir","Uso en situaciones de ansiedad anticipatoria"],
        apoyo:"Solo registros semanales con el terapeuta" },
    }, printable:true },

  { id:21, name:"Reestructuración cognitiva básica", category:"Pensamientos", target:"Depresión/Ansiedad",
    specialty:["Psicología"], type:"Clinica", age:"12-99", ageGroup:"Adolescente/Adulto",
    description:"Identificar y cuestionar pensamientos automáticos negativos con evidencia.",
    materials:"Hoja de registro de pensamientos, lapicera",
    niveles:{
      facil:{ titulo:"Identificar el pensamiento",
        instrucciones:"Situación → ¿qué pensaste? → ¿cómo te sentiste? Registrar sin cuestionar todavía.",
        ejemplos:["Situación: me ignoraron en el trabajo. Pensamiento: no les caigo bien. Emoción: tristeza 70%"],
        apoyo:"Ejemplos del terapeuta, registro conjunto" },
      medio:{ titulo:"Buscar evidencia a favor y en contra",
        instrucciones:"¿Qué evidencia tenés de que ese pensamiento es cierto? ¿Qué evidencia tenés de que NO es cierto?",
        ejemplos:["A favor: no me saludaron. En contra: sí me saludaron ayer, pueden haber tenido un mal día"],
        apoyo:"Preguntas guía del terapeuta" },
      dificil:{ titulo:"Pensamiento alternativo equilibrado",
        instrucciones:"Generar un pensamiento alternativo más realista y medir cómo cambia la emoción.",
        ejemplos:["'Puede haber muchas razones por las que no me saludaron. No tengo datos suficientes.' Emoción: tristeza 30%"],
        apoyo:"Práctica autónoma con registro semanal" },
    }, printable:true },

  { id:22, name:"Técnica de resolución de problemas", category:"Habilidades", target:"TDAH/Ansiedad",
    specialty:["Psicología"], type:"Clinica", age:"10-99", ageGroup:"Escolar/Adulto",
    description:"Metodología paso a paso para abordar problemas de forma sistemática.",
    materials:"Hoja de trabajo, lapicera",
    niveles:{
      facil:{ titulo:"Definir el problema",
        instrucciones:"¿Cuál es el problema exactamente? Escribirlo en una oración concreta. Evitar vagüedades.",
        ejemplos:["Vago: 'tengo problemas en el colegio'. Concreto: 'me olvido de entregar las tareas los viernes'"],
        apoyo:"Apoyo del terapeuta para concretar" },
      medio:{ titulo:"Generar alternativas sin juzgar",
        instrucciones:"Lluvia de ideas de al menos 5 soluciones posibles, sin descartar ninguna todavía.",
        ejemplos:["Alarma los jueves a la noche","Nota en la mochila","Pedirle a un compañero que me recuerde"],
        apoyo:"Terapeuta suma ideas si se tranca" },
      dificil:{ titulo:"Evaluar, elegir e implementar",
        instrucciones:"Pros y contras de cada opción, elegir la mejor, implementarla y revisar en la próxima sesión.",
        ejemplos:["Elegí la alarma. Resultado: funcionó 3 de 5 veces. ¿Qué pasó las otras 2?"],
        apoyo:"Solo seguimiento semanal" },
    }, printable:true },

  { id:23, name:"Exposición gradual a situaciones temidas", category:"Fobias/Ansiedad", target:"Fobia/Ansiedad social",
    specialty:["Psicología"], type:"Clinica", age:"8-99", ageGroup:"Todos",
    description:"Construir jerarquía de situaciones y exponerse gradualmente sin evitar.",
    materials:"Jerarquía de exposición (ver módulo TCC), hoja de registro",
    niveles:{
      facil:{ titulo:"Psicoeducación sobre la ansiedad",
        instrucciones:"Explicar la curva de ansiedad: sube, llega al pico y baja sola si no huimos. Dibujar juntos.",
        ejemplos:["Analogía del extintor: si escapás, el fuego nunca se apaga","La ansiedad no es peligrosa, es incómoda"],
        apoyo:"Material visual, analogías del cotidiano" },
      medio:{ titulo:"Exposición con apoyo",
        instrucciones:"Comenzar por el ítem de ansiedad más baja (20-30/100). Mantenerse hasta que baje a la mitad.",
        ejemplos:["Ansiedad social: saludar al vecino mientras el terapeuta espera afuera"],
        apoyo:"Terapeuta presente o disponible por teléfono" },
      dificil:{ titulo:"Exposición autónoma",
        instrucciones:"El paciente realiza exposiciones solo, registra la ansiedad inicial y final, y lo reporta.",
        ejemplos:["Ir al supermercado solo","Hacer una llamada telefónica","Hablar en clase"],
        apoyo:"Registro y revisión semanal" },
    }, printable:true },

  // ─── PSICOPEDAGOGÍA ───────────────────────────────────────────────────────────
  { id:30, name:"Estrategias de comprensión lectora", category:"Lectura", target:"Dificultades de aprendizaje",
    specialty:["Psicopedagogía"], type:"Clinica", age:"7-14", ageGroup:"Escolar",
    description:"Técnicas para mejorar la comprensión de textos escritos en distintos niveles.",
    materials:"Textos graduados, fichas de comprensión, subrayadores de colores",
    niveles:{
      facil:{ titulo:"Subrayado selectivo",
        instrucciones:"Leer el párrafo y subrayar solo la idea principal. Máximo una oración por párrafo.",
        ejemplos:["Verde: idea principal. Amarillo: palabras clave","¿De qué trata este párrafo en una palabra?"],
        apoyo:"Modelado del adulto, párrafos cortos de 3-4 oraciones" },
      medio:{ titulo:"Mapa de ideas",
        instrucciones:"Leer el texto y construir un mapa con idea central y 3-5 ideas secundarias.",
        ejemplos:["Título en el centro, flechas hacia ideas secundarias","Usar imágenes además de palabras"],
        apoyo:"Estructura del mapa pre-dibujada" },
      dificil:{ titulo:"Resumen propio",
        instrucciones:"Leer el texto, cerrarlo, y escribir un resumen sin mirarlo. Comparar con el original.",
        ejemplos:["Textos de nivel escolar en área de interés del alumno"],
        apoyo:"Solo revisión con rúbrica simple" },
    }, printable:true },

  { id:31, name:"Cálculo mental y operatoria básica", category:"Matemática", target:"Discalculia",
    specialty:["Psicopedagogía"], type:"Clinica", age:"6-12", ageGroup:"Escolar",
    description:"Estrategias concretas y semi-concretas para afianzar el cálculo matemático.",
    materials:"Regletas de Cuisenaire, fichas de puntos, tabla del 100",
    niveles:{
      facil:{ titulo:"Material concreto",
        instrucciones:"Usar regletas, palitos o fichas para representar la operación antes de escribirla.",
        ejemplos:["5+3: poner 5 cubos, agregar 3, contar el total","10-4: poner 10, sacar 4, contar los que quedan"],
        apoyo:"Material siempre visible, operaciones con números al 10" },
      medio:{ titulo:"Dibujo y semi-concreto",
        instrucciones:"Representar la operación con dibujo de puntos o palitos antes de resolverla en abstracto.",
        ejemplos:["12+5: dibujar 12 puntos, agregar 5, contar","Tabla de 100 como apoyo visual"],
        apoyo:"Tabla de 100 disponible" },
      dificil:{ titulo:"Cálculo mental con estrategias",
        instrucciones:"Usar estrategias: descomponer, redondear, usar dobles, complementos al 10.",
        ejemplos:["8+6: 8+2=10, +4=14","19+5: 20+5-1=24"],
        apoyo:"Recordatorio de estrategias plastificado" },
    }, printable:true },

  { id:32, name:"Organización y planificación escolar", category:"Hábitos", target:"TDAH/Dificultades de aprendizaje",
    specialty:["Psicopedagogía"], type:"Clinica", age:"8-16", ageGroup:"Escolar",
    description:"Herramientas para organizar el trabajo escolar y los tiempos de estudio.",
    materials:"Agenda, tablero semanal, carpetas de colores, temporizador",
    niveles:{
      facil:{ titulo:"Agenda visual diaria",
        instrucciones:"Copiar las tareas en la agenda con colores por materia. Marcar al completar.",
        ejemplos:["Rojo: Matemática. Azul: Lengua. Tilde cuando se hace","Foto de la agenda con el celular como respaldo"],
        apoyo:"Adulto revisa la agenda diariamente" },
      medio:{ titulo:"Planificador semanal",
        instrucciones:"Los domingos planificar la semana: qué día se estudia qué, tiempo estimado.",
        ejemplos:["Lunes 30 min Matemática, Martes 20 min Lengua...","Tiempo de estudio ≤ 45 min con descanso"],
        apoyo:"Adulto ayuda a estimar tiempos" },
      dificil:{ titulo:"Autorregulación del estudio",
        instrucciones:"El alumno planifica, estudia con temporizador y evalúa si cumplió. Registra semanalmente.",
        ejemplos:["¿Cuánto planeé? ¿Cuánto hice? ¿Qué me dificultó?"],
        apoyo:"Revisión quincenal con el profesional" },
    }, printable:true },

  // ─── TERAPIA OCUPACIONAL ──────────────────────────────────────────────────────
  { id:40, name:"Integración sensorial — modulación táctil", category:"Sensorial", target:"TEA/Hipersensibilidad",
    specialty:["Terapia Ocupacional"], type:"Clinica", age:"2-12", ageGroup:"Preescolar/Escolar",
    description:"Actividades graduadas para mejorar la tolerancia a estímulos táctiles.",
    materials:"Cajas de texturas, arroz, arena kinética, cremas, pintura dactilar",
    niveles:{
      facil:{ titulo:"Exploración con preferencia",
        instrucciones:"Ofrecer texturas elegidas por el niño. No forzar. Modelar el adulto primero.",
        ejemplos:["Caja de arroz: buscar objetos escondidos","Jugar con agua tibia y esponja blanda"],
        apoyo:"Total control del niño, adulto modela sin presionar" },
      medio:{ titulo:"Exposición gradual controlada",
        instrucciones:"Presentar texturas de menor a mayor intensidad. El niño puede parar cuando quiera.",
        ejemplos:["Arena seca → arena húmeda → barro","Tocar con un dedo → palma → ambas manos"],
        apoyo:"Señal de parada acordada ('stop' o señal con mano)" },
      dificil:{ titulo:"Actividades funcionales con textura",
        instrucciones:"Realizar actividades de vida diaria con texturas variadas: amasar, pintar, moldear.",
        ejemplos:["Amasar masas de diferentes texturas","Pintura dactilar para producir una obra"],
        apoyo:"Actividad significativa elegida por el niño" },
    }, printable:true },

  { id:41, name:"Actividades de vida diaria — vestido", category:"AVD", target:"TEA/Retraso del desarrollo",
    specialty:["Terapia Ocupacional"], type:"Clinica", age:"3-10", ageGroup:"Preescolar/Escolar",
    description:"Secuencia de aprendizaje para vestirse y desvestirse de forma independiente.",
    materials:"Ropa real o tablero de práctica, pictogramas de secuencia",
    niveles:{
      facil:{ titulo:"Desvestirse con mínima ayuda",
        instrucciones:"Empezar por lo más fácil: quitar medias, zapatos. Usar técnica de encadenamiento hacia atrás.",
        ejemplos:["Adulto hace todo menos el último paso: el niño solo quita el pie de la media"],
        apoyo:"Ropa amplia y cómoda, sin botones ni cordones" },
      medio:{ titulo:"Vestirse con apoyo pictográfico",
        instrucciones:"Secuencia visual: bombacha/calzón → remera → pantalón → medias → zapatos. El niño sigue los pictogramas.",
        ejemplos:["Tabla con fotos reales de la secuencia en el cuarto","Velcro en lugar de botones"],
        apoyo:"Pictogramas plastificados en el cuarto" },
      dificil:{ titulo:"Independencia funcional",
        instrucciones:"El niño se viste solo para la escuela con mínima supervisión. Incluye botones simples.",
        ejemplos:["Cronómetro: ¿en cuánto tiempo me puedo vestir?","Lista de cotejo que marca el niño"],
        apoyo:"Solo recordatorio verbal inicial" },
    }, printable:true },

  { id:42, name:"Coordinación visomotora — grafomotricidad", category:"Motricidad fina", target:"Dificultades motoras/escritura",
    specialty:["Terapia Ocupacional","Psicomotricidad"], type:"Clinica", age:"4-10", ageGroup:"Preescolar/Escolar",
    description:"Actividades para mejorar el control del trazo y la coordinación ojo-mano.",
    materials:"Papel, lápices, tijeras, plasticina, pinzas",
    niveles:{
      facil:{ titulo:"Trazado libre y precortado",
        instrucciones:"Trazar líneas rectas, curvas y zigzag. Rasgar papel en tiras. No usar tijera todavía.",
        ejemplos:["Unir puntos con línea","Trazar por dentro de un camino ancho"],
        apoyo:"Lápiz grueso, papel grande, guía física de la mano si necesario" },
      medio:{ titulo:"Corte con tijera y trazados dirigidos",
        instrucciones:"Cortar por línea recta, luego curva. Copiar figuras geométricas simples.",
        ejemplos:["Cortar flecos en papel","Trazar letras en puntos punteados"],
        apoyo:"Tijera de seguridad ergonómica" },
      dificil:{ titulo:"Escritura funcional",
        instrucciones:"Escribir nombre propio, letras de molde y cursiva básica con buena presión y tamaño.",
        ejemplos:["Carta a familiar","Completar ficha con datos personales"],
        apoyo:"Pauta Montessori o cuaderno especial" },
    }, printable:true },

  // ─── PSICOMOTRICIDAD ──────────────────────────────────────────────────────────
  { id:50, name:"Esquema corporal y lateralidad", category:"Corporal", target:"Retraso psicomotor/Dislexia",
    specialty:["Psicomotricidad"], type:"Clinica", age:"3-8", ageGroup:"Preescolar/Escolar",
    description:"Actividades para afianzar el conocimiento del cuerpo y la lateralización.",
    materials:"Espejo grande, pelotas, aros, cinta adhesiva en el suelo",
    niveles:{
      facil:{ titulo:"Reconocimiento de partes del cuerpo",
        instrucciones:"Nombrar y tocar partes del cuerpo frente al espejo. Juego de 'Simón dice'.",
        ejemplos:["Simón dice: tocate la rodilla izquierda","¿Dónde está tu codo? ¿Y el del compañero?"],
        apoyo:"Espejo, movimiento lento, repetición" },
      medio:{ titulo:"Dominancia lateral",
        instrucciones:"Actividades que requieran definir lado dominante: lanzar, patear, cortar. Registrar cuál usa.",
        ejemplos:["Lanzar pelota al aro: ¿qué mano usás?","Patear: ¿qué pie?","Mirar por telescopio: ¿qué ojo?"],
        apoyo:"Sin forzar lateralidad, solo registrar" },
      dificil:{ titulo:"Coordinación cruzada",
        instrucciones:"Actividades que crucen la línea media corporal: mano derecha toca rodilla izquierda.",
        ejemplos:["Marcha cruzada: codo derecho — rodilla izquierda","Lanzar y atrapar con la mano no dominante"],
        apoyo:"Ritmo lento, puede haber música" },
    }, printable:true },

  { id:51, name:"Equilibrio y coordinación dinámica", category:"Motricidad gruesa", target:"Retraso psicomotor",
    specialty:["Psicomotricidad","Terapia Ocupacional"], type:"Clinica", age:"2-8", ageGroup:"Preescolar",
    description:"Circuito de actividades para desarrollar equilibrio estático y dinámico.",
    materials:"Colchonetas, vigas de equilibrio, aros, conos, piscina de pelotas",
    niveles:{
      facil:{ titulo:"Equilibrio estático",
        instrucciones:"Mantenerse en una pierna 5 seg, luego 10 seg. En punta de pies. Con ojos cerrados.",
        ejemplos:["Estatua: no caerse cuando la música para","Flamenco: 5 seg en un pie"],
        apoyo:"Cerca de la pared, adulto cerca" },
      medio:{ titulo:"Equilibrio dinámico",
        instrucciones:"Caminar por viga de equilibrio, saltar en aros, caminar en línea con pie frente a pie.",
        ejemplos:["Circuito: viga → 3 saltos → giro → volver"],
        apoyo:"Adulto a un lado, velocidad lenta" },
      dificil:{ titulo:"Coordinación con objeto",
        instrucciones:"Realizar los mismos circuitos llevando una pelota, lanzando y recibiendo.",
        ejemplos:["Viga de equilibrio con pelota en mano","Correr y patear al arco sin detenerse"],
        apoyo:"Solo observación del profesional" },
    }, printable:true },

  // ─── FISIOTERAPIA ─────────────────────────────────────────────────────────────
  { id:60, name:"Ejercicios de movilidad articular — miembro superior", category:"Movilidad", target:"Rehabilitación",
    specialty:["Fisioterapia"], type:"Clinica", age:"6-99", ageGroup:"Todos",
    description:"Ejercicios activos y pasivos para mantener o recuperar rango articular en hombro, codo y muñeca.",
    materials:"Pelota blanda, bastón de madera, theraband",
    niveles:{
      facil:{ titulo:"Movilización pasiva suave",
        instrucciones:"El profesional moviliza la articulación dentro del rango indoloro. 10 repeticiones, movimiento lento.",
        ejemplos:["Flexo-extensión de muñeca con soporte","Circunducción de hombro asistida"],
        apoyo:"Paciente relajado, temperatura local previa" },
      medio:{ titulo:"Ejercicio activo-asistido",
        instrucciones:"El paciente inicia el movimiento y el profesional lo completa si necesario. 3 series de 10.",
        ejemplos:["Elevación de brazo con bastón","Apertura de dedo contra resistencia suave"],
        apoyo:"Espejo para feedback visual" },
      dificil:{ titulo:"Ejercicio resistido funcional",
        instrucciones:"Movimientos funcionales con resistencia de theraband o peso libre ligero.",
        ejemplos:["Remo con theraband","Prono-supinación con pelota blanda"],
        apoyo:"Corrección postural, 3x15 repeticiones" },
    }, printable:true },

  // ─── MÚSICA TERAPIA ───────────────────────────────────────────────────────────
  { id:70, name:"Improvisación musical libre", category:"Expresión", target:"TEA/Comunicación",
    specialty:["Musicoterapia"], type:"Clinica", age:"2-99", ageGroup:"Todos",
    description:"Uso de instrumentos de percusión para la comunicación no verbal y el vínculo terapéutico.",
    materials:"Tambor, xilofón, maracas, pandero, claves",
    niveles:{
      facil:{ titulo:"Exploración libre de instrumentos",
        instrucciones:"Ofrecer instrumentos sin instrucción. Observar qué elige, cómo lo usa, si hay contacto visual.",
        ejemplos:["Sesión de 20 min de exploración sin consigna","Imitar al paciente para crear diálogo"],
        apoyo:"Sin corrección, máxima permisividad" },
      medio:{ titulo:"Diálogo musical",
        instrucciones:"Terapeuta responde musicalmente lo que hace el paciente. Crear turnos pregunta-respuesta.",
        ejemplos:["Paciente toca fuerte → terapeuta responde suave","Alternancia de turnos en el tambor"],
        apoyo:"Seguir siempre el liderazgo del paciente" },
      dificil:{ titulo:"Canción con significado personal",
        instrucciones:"Crear o adaptar una canción sobre algo significativo para el paciente. Trabajar letra y melodía.",
        ejemplos:["Canción sobre su familia","Adaptar canción conocida con nueva letra"],
        apoyo:"Grabación para llevar a casa" },
    }, printable:true },
];

// Especialidades de cada actividad base (ACTIVITIES_DB ya tiene target para fono)
const SPECIALTY_MAP = {
  "Fonoaudiología":  ["TEL","Dislexia","Disartria","Lenguaje","Lectoescritura","Articulacion","Fonologia"],
  "Psicología":      ["Ansiedad","Depresión","TDAH","Pensamientos","Habilidades","Fobias/Ansiedad"],
  "Psicopedagogía":  ["Dislexia","TDAH","Lectura","Matemática","Hábitos","Dificultades de aprendizaje"],
  "Terapia Ocupacional": ["Sensorial","AVD","Motricidad fina"],
  "Psicomotricidad": ["Corporal","Motricidad gruesa","Motricidad fina"],
  "Fisioterapia":    ["Movilidad","Rehabilitación"],
  "Musicoterapia":   ["Expresión","Comunicación"],
};

// Combinar todas las actividades
const ALL_ACTIVITIES = [
  ...ACTIVITIES_DB.map(a => ({...a, specialty:["Fonoaudiología"]})),
  ...ACTIVITIES_DB_EXTRA
];

// ─── ANAMNESIS ────────────────────────────────────────────────────────────────
const ANAMNESIS = [
  { t:"Antecedentes relevantes", i:"📊", q:["Antecedentes del embarazo, parto o periodo neonatal?","Hitos del desarrollo motor y del habla-lenguaje?","Antecedentes medicos, neurologicos o geneticos?","Antecedentes familiares de dificultades similares?","Historia familiar: composicion, dinamica del hogar?"] },
  { t:"Lenguaje y comunicacion",  i:"💬", q:["Comprende consignas simples y complejas?","Presenta dificultades en la expresion verbal?","Como es la inteligibilidad del habla?","Usa lenguaje gestual o sistemas alternativos?"] },
  { t:"Area educativa",           i:"📚", q:["Asiste a establecimiento educacional?","Presenta dificultades de aprendizaje?","Recibe apoyos adicionales en el colegio?"] },
  { t:"Area socioemocional",      i:"❤️", q:["Como regula sus emociones?","Como son sus interacciones sociales?","Presenta conductas disruptivas o de evitacion?"] },
];

// ─── CSS GLOBAL ───────────────────────────────────────────────────────────────
const CSS = `\n${FONTS}
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
.bn{flex:1;padding:10px 2px;border:none;background:none;cursor:pointer;font-size:9px;font-family:'Plus Jakarta Sans',sans-serif;color:#9B9590;display:flex;flex-direction:column;align-items:center;gap:3px;font-weight:500;transition:color .14s;min-height:56px;justify-content:center;}
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
@media(min-width:600px){.modal{border-radius:20px;max-width:540px;}}
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
.welcome::after{content:'';position:absolute;right:-24px;top:-24px;width:110px;height:110px;border-radius:50%;background:rgba(255,255,255,.09);}
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
.phgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:12px 0;}
@media(min-width:500px){.phgrid{grid-template-columns:repeat(6,1fr);}}
.phbtn{aspect-ratio:1;border-radius:12px;border:2px solid #EDE0F5;background:white;font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:700;cursor:pointer;transition:all .17s;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#2C2C2C;gap:2px;min-height:90px;}
.phbtn:hover{border-color:#9B7EBD;background:#F5F0FA;}
.phbtn.sel{border-color:#9B7EBD;background:#9B7EBD;color:white;}
.roletag{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;}
.radmin{background:#FEF3E0;color:#E8A020;}
.rpro{background:#EBF3FB;color:#5B8DB8;}
.dayl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#9B9590;margin:14px 0 6px;}
.atab{flex:1;padding:9px 6px;border:none;background:transparent;border-radius:9px;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;color:#6B6560;transition:all .15s;min-height:38px;}
.atab.active{background:white;color:#9B7EBD;box-shadow:0 1px 4px rgba(0,0,0,.1);}
.atabrow{display:flex;gap:4px;background:#EDE0F5;border-radius:12px;padding:4px;margin-bottom:16px;}
.qscard{background:white;border-radius:16px;padding:14px;box-shadow:0 1px 8px rgba(0,0,0,.06);margin-bottom:12px;display:flex;align-items:center;gap:12px;cursor:pointer;border:1.5px solid #EDE0F5;transition:border-color .15s;}
.qscard:hover{border-color:#9B7EBD;}
@keyframes fadeUp{from{opacity:0;transform:translateY(13px);}to{opacity:1;transform:translateY(0);}}
.fu{animation:fadeUp .28s ease forwards;}
@media print{.noprint{display:none!important;}body{background:white;}}
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const todayStr = () => new Date().toLocaleDateString("es-UY", { weekday:"long", day:"numeric", month:"long" });
const addMinutes = (timeStr, mins) => {
  const [h, m] = timeStr.split(":").map(Number);
  const total = (h * 60 + m + mins) % (24 * 60); // FIX: overflow 24h
  return `${String(Math.floor(total/60)).padStart(2,"0")}:${String(total%60).padStart(2,"0")}`;
};

// ─── PERSISTENCIA LOCAL ───────────────────────────────────────────────────────
// ─── ID ÚNICO ────────────────────────────────────────────────────────────────
const makeId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
};

const STORAGE_KEY = "hadrion_v5";
const daysUntil = d => {
  if (!d) return null;
  return Math.ceil((new Date(d + "T00:00:00") - new Date()) / (1000 * 60 * 60 * 24));
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch(e) {
    if (e.name === "QuotaExceededError" || e.code === 22) {
      console.warn("Hadrion: localStorage lleno.");
    } else { console.warn("Storage error:", e); }
  }
};
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
};

// ─── COMPONENTES BASE ─────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
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
  { id:"dashboard",  l:"Panel",             i:"🏠", s:"Principal" },
  { id:"agenda",     l:"Agenda",            i:"📅" },
  { id:"patients",   l:"Pacientes",         i:"👥" },
  { id:"payments",   l:"Registro de Pagos", i:"💳" },
  { id:"sessions",   l:"Registros Clinicos",i:"📝" },
  { id:"history",    l:"Historia Clinica",  i:"📋", s:"Clinico" },
  { id:"objectives", l:"Objetivos",         i:"🎯" },
  { id:"activities", l:"Actividades",       i:"✨" },
  { id:"phonology",  l:"Conciencia Fon.",   i:"🔤" },
  { id:"reports",    l:"Reportes",          i:"📊" },
  { id:"plan",       l:"Plan Colaborativo", i:"🤝", s:"Colaborativo" },
  { id:"tea",        l:"TEA / Autismo",      i:"🌈" },
  { id:"asistencias",l:"Asistencias",        i:"📆" },
  { id:"ia",         l:"Asistente IA",       i:"🧠", s:"Herramientas" },
  { id:"psicologia", l:"Psicología",         i:"🧬" },
  { id:"tcc",        l:"TCC",                i:"🔵" },
  { id:"resources",  l:"Recursos",          i:"📚" },
  { id:"organizaciones", l:"Organizaciones",  i:"🏫", s:"Admin", adminOnly:true },
  { id:"liquidacion",    l:"Liquidación",      i:"💰", adminOnly:true },
  { id:"admin",      l:"Administracion",    i:"🔐", adminOnly:true, badge:true },
  { id:"profile",    l:"Mi Perfil",         i:"👤" },
];

// ─── ACCESO POR PLAN ─────────────────────────────────────────────────────────
const isClinica = (user) => ["Clinica","Colegio"].includes(user?.plan) || user?.role === "admin";
const isProOrMore = (user) => ["Pro","Clinica","Colegio"].includes(user?.plan) || user?.role === "admin";

// Nav items filtrados por plan
const NAV_CLINICA_ONLY = ["organizaciones","liquidacion","plan"]; // solo para planes clínica
const NAV_PRO_ONLY = ["ia","psicologia","tcc","reports"]; // requieren al menos Pro

function Sidebar({ active, setActive, user, registerRequests=[] }) {
  return (
    <div className="sidebar">
      <div className="slogo">
        <div className="slogoicon">H</div>
        <div><div className="slogoname">Hadrion</div><div className="slogosub">Plataforma Clinica</div></div>
      </div>
      {NAV.filter(n => {
        if (n.adminOnly && user?.role !== "admin") return false;
        if (NAV_CLINICA_ONLY.includes(n.id) && !isClinica(user)) return false;
        if (NAV_PRO_ONLY.includes(n.id) && !isProOrMore(user)) return false;
        return true;
      }).map(n => (
        <div key={n.id}>
          {n.s && <div className="ssec">{n.s}</div>}
          <div className={`sitem${active === n.id ? " active" : ""}`} onClick={() => setActive(n.id)}>
            <span className="sicon">{n.i}</span>{n.l}
            {n.id === "admin" && (
              registerRequests.filter(r=>r.status==="pendiente").length > 0
                ? <span className="sbadge" style={{background:"#C0392B"}}>{registerRequests.filter(r=>r.status==="pendiente").length}</span>
                : <span className="sbadge">Admin</span>
            )}
          </div>
        </div>
      ))}
      <div className="suser">
        <div style={{ fontSize:13, fontWeight:600, color:C.charcoal }}>{user?.name}</div>
        <div style={{ fontSize:11, color:C.grayL }}>{user?.specialty}</div>
        <span className={`roletag ${user?.role === "admin" ? "radmin" : "rpro"}`} style={{ marginTop:4, display:"inline-flex" }}>
          {user?.role === "admin" ? "👑 Admin" : "Profesional"}
        </span>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ onLogin, users, onRegisterRequest }) {
  const [f, setF]           = useState({ email:"", pass:"", show:false });
  const [err, setErr]       = useState("");
  const [forgot, setForgot] = useState(false);
  const [register, setReg]  = useState(false);
  const [regF, setRegF]     = useState({ name:"", email:"", specialty:"", phone:"", message:"" });
  const [regSent, setRegSent] = useState(false);

  const login = () => {
    if (!f.email || !f.pass) { setErr("Completa todos los campos."); return; }
    const u = users.find(u => u.email === f.email && u.password === f.pass);
    if (!u) { setErr("Email o contrasena incorrectos."); return; }
    if (u.status === "inactive") { setErr("Cuenta inactiva. Contacta al administrador."); return; }
    if (u.status === "pending")  { setErr("Cuenta pendiente de aprobacion. Te contactamos pronto."); return; }
    setErr("");
    onLogin(u);
  };

  const sendRegister = () => {
    if (!regF.name || !regF.email || !regF.specialty) { setErr("Completa nombre, email y especialidad."); return; }
    onRegisterRequest(regF);
    setRegSent(true);
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#FDF0E8 0%,#FAF8F5 55%,#EBF5EE 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"white", borderRadius:24, padding:"36px 26px", width:"100%", maxWidth:400, boxShadow:"0 8px 40px rgba(0,0,0,.12)" }}>
        <div style={{ textAlign:"center", marginBottom:26 }}>
          <div style={{ width:62, height:62, background:C.terra, borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 13px", fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:"white" }}>H</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700, color:C.charcoal }}>Hadrion</div>
          <div style={{ fontSize:13, color:C.grayL, marginTop:3 }}>Plataforma terapeutica — Uruguay</div>
        </div>

        {!forgot ? (
          <>
            <div style={{ fontSize:17, fontWeight:700, color:C.charcoal, marginBottom:14 }}>Iniciar sesion</div>
            <div className="fg"><label className="lbl">Correo electronico</label>
              <input className="inp" type="email" placeholder="tu@email.com" value={f.email} onChange={e => setF({ ...f, email:e.target.value })} />
            </div>
            <div className="fg"><label className="lbl">Contrasena</label>
              <div style={{ position:"relative" }}>
                <input className="inp" type={f.show ? "text" : "password"} placeholder="••••••••"
                  value={f.pass} onChange={e => setF({ ...f, pass:e.target.value })}
                  onKeyDown={e => e.key === "Enter" && login()}
                  style={{ paddingRight:44 }} />
                <button onClick={() => setF({ ...f, show:!f.show })}
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:16, color:C.grayL }}>
                  {f.show ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            {err && <div className="alert alrtd">{err}</div>}
            <button className="btn btnp btnfull" style={{ borderRadius:12 }} onClick={login}>→ Ingresar</button>
            <div style={{ textAlign:"center", marginTop:12, fontSize:12, color:C.grayL }}>
              ¿Olvidaste tu contrasena? <span style={{ color:C.terra, cursor:"pointer", fontWeight:600 }} onClick={() => setForgot(true)}>Recuperar acceso</span>
            </div>
            <div style={{ marginTop:12, textAlign:"center", padding:"10px 0", borderTop:`1px solid ${C.sand}` }}>
              <span style={{ fontSize:12, color:C.grayL }}>¿No tenes cuenta? </span>
              <span style={{ fontSize:12, color:C.terra, cursor:"pointer", fontWeight:700 }} onClick={() => setReg(true)}>Solicitar acceso gratis →</span>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize:17, fontWeight:700, color:C.charcoal, marginBottom:6 }}>Recuperar acceso</div>
            <div style={{ fontSize:13, color:C.grayL, marginBottom:14 }}>Ingresa tu email y te enviamos un enlace de recuperacion.</div>
            <div className="fg"><input className="inp" type="email" placeholder="tu@email.com" value={f.email} onChange={e => setF({ ...f, email:e.target.value })} /></div>
            <div className="alert alrts">✉️ En produccion real se enviaria email de recuperacion.</div>
            <button className="btn btnp btnfull" onClick={() => setForgot(false)}>← Volver</button>
          </>
        )}

        {register && !regSent && (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
            <div style={{ background:"white", borderRadius:20, padding:"28px 22px", width:"100%", maxWidth:400, maxHeight:"90vh", overflowY:"auto" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:C.charcoal, marginBottom:4 }}>Solicitar acceso gratis</div>
              <div style={{ fontSize:13, color:C.grayL, marginBottom:16 }}>14 dias gratis, sin tarjeta. Te contactamos en menos de 24hs.</div>
              <div className="fg"><label className="lbl">Nombre completo *</label><input className="inp" type="text" placeholder="Tu nombre y apellido" value={regF.name} onChange={e => setRegF({ ...regF, name:e.target.value })} /></div>
              <div className="fg"><label className="lbl">Email profesional *</label><input className="inp" type="email" placeholder="tu@email.com" value={regF.email} onChange={e => setRegF({ ...regF, email:e.target.value })} /></div>
              <div className="fg"><label className="lbl">Especialidad *</label>
                <select className="inp" value={regF.specialty} onChange={e => setRegF({ ...regF, specialty:e.target.value })}>
                  <option value="">Selecciona tu especialidad...</option>
                  {["Fonoaudiologa/o","Psicologa/o","Psicopedagoga/o","Psicomotricista","Fisioterapeuta","Terapeuta Ocupacional","Otra"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="fg"><label className="lbl">Telefono (para WhatsApp)</label><input className="inp" type="tel" placeholder="(+598) 9..." value={regF.phone} onChange={e => setRegF({ ...regF, phone:e.target.value })} /></div>
              <div className="fg"><label className="lbl">Mensaje (opcional)</label><textarea className="inp" style={{ minHeight:60 }} placeholder="Contanos sobre tu practica..." value={regF.message} onChange={e => setRegF({ ...regF, message:e.target.value })} /></div>
              {err && <div className="alert alrtd">{err}</div>}
              <button className="btn btnp btnfull" onClick={sendRegister}>🚀 Enviar solicitud</button>
              <button className="btn btng btnfull" onClick={() => { setReg(false); setErr(""); }}>Cancelar</button>
            </div>
          </div>
        )}

        {regSent && (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
            <div style={{ background:"white", borderRadius:20, padding:"36px 26px", width:"100%", maxWidth:380, textAlign:"center" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🎉</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, color:C.charcoal, marginBottom:8 }}>Solicitud enviada</div>
              <div style={{ fontSize:14, color:C.grayL, lineHeight:1.6, marginBottom:20 }}>
                Te contactamos a <strong>{regF.email}</strong> en menos de 24 horas con tu acceso de prueba.
              </div>
              <div style={{ background:"#F5F0FA", borderRadius:12, padding:14, marginBottom:16 }}>
                <div style={{ fontSize:16, color:C.terra, fontWeight:700, marginBottom:4 }}>14 dias gratis</div>
                <div style={{ fontSize:12, color:C.grayL }}>Sin tarjeta — sin compromiso</div>
              </div>
              <button className="btn btnp btnfull" onClick={() => { setRegSent(false); setReg(false); }}>← Volver al inicio</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ user, patients, sessions, payments, setActive, setShowQS, agendaItems }) {
  const total    = payments.filter(p => p.status === "pagado").reduce((a, p) => a + p.amount, 0);
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayCount = agendaItems.filter(a => a.date === todayKey).length;
  // Aviso suscripción
  const diasSub = user?.subscriptionEnd ? daysUntil(user.subscriptionEnd) : null;

  return (
    <div className="fu">
      {diasSub !== null && diasSub >= 0 && diasSub <= 14 && (
        <div style={{background:diasSub<=3?"#FDECEA":diasSub<=7?"#FEF3E0":"#EBF3FB",borderRadius:12,padding:"10px 14px",marginBottom:12,fontSize:13,color:diasSub<=3?"#C0392B":diasSub<=7?"#E8A020":"#5B8DB8",fontWeight:600}}>
          {diasSub===0 ? "🔴 Tu acceso vence hoy — contactá a Adriana para renovar" :
           `${diasSub<=3?"🔴":"⚠️"} Tu acceso vence en ${diasSub} día${diasSub!==1?"s":""} — comunipro12@gmail.com`}
        </div>
      )}
      <div className="welcome">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:12, opacity:.7, marginBottom:3 }}>{cap(todayStr())}</div>
            <div className="wname">Hola, {user.name.split(" ")[0]} 👋</div>
            <div style={{ fontSize:13, opacity:.82, marginTop:3 }}>Bienvenida a tu plataforma clínica</div>
          </div>
          <div style={{background:"rgba(255,255,255,.2)",borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:700,color:"white",flexShrink:0,marginTop:4}}>
            {user.plan || "Básico"}
          </div>
        </div>
        {isClinica(user) && (
          <div style={{marginTop:10,display:"flex",gap:6,flexWrap:"wrap"}}>
            {["👥 Multiusuario","💰 Liquidación","🏫 Organización"].map(f=>(
              <span key={f} style={{background:"rgba(255,255,255,.15)",borderRadius:20,padding:"3px 10px",fontSize:10,color:"rgba(255,255,255,.9)"}}>{f}</span>
            ))}
          </div>
        )}
      </div>
      <div className="sgrid">
        <div className="sc2"><div className="snum">{patients.length}</div><div className="slbl">Pacientes</div></div>
        <div className="sc2"><div className="snum">{sessions.length}</div><div className="slbl">Registros</div></div>
        <div className="sc2"><div className="snum">${(total/1000).toFixed(0)}k</div><div className="slbl">Cobrado</div></div>
        <div className="sc2"><div className="snum">{todayCount}</div><div className="slbl">Hoy</div></div>
      </div>
      <div className="qscard" onClick={() => setShowQS(true)}>
        <div style={{ width:44, height:44, background:C.terraF, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>⚡</div>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, fontSize:14, color:C.charcoal }}>Sesion rapida</div>
          <div style={{ fontSize:12, color:C.grayL }}>Registra sin seleccionar objetivos — agil y directo</div>
        </div>
        <div style={{ fontSize:11, background:C.terraF, color:C.terra, borderRadius:20, padding:"3px 10px", fontWeight:600, flexShrink:0 }}>Uso diario</div>
      </div>
      <div style={{ fontWeight:700, fontSize:14, color:C.charcoal, marginBottom:10 }}>Acceso rapido</div>
      <div className="qg">
        {[{i:"👥",l:"Pacientes",s:"Gestion de casos",t:"patients"},{i:"📅",l:"Agenda",s:"Citas y horarios",t:"agenda"},{i:"📝",l:"Nueva sesion",s:"Con objetivos",t:"sessions"},{i:"💳",l:"Pagos",s:"Cobros",t:"payments"},{i:"🔤",l:"Fonologia",s:"Conciencia fon.",t:"phonology"},{i:"✨",l:"Actividades",s:"Banco terapeutico",t:"activities"},{i:"📊",l:"Reportes",s:"Informes",t:"reports"},{i:"📚",l:"Recursos",s:"Material",t:"resources"}].map(q => (
          <div key={q.t} className="qcard" onClick={() => setActive(q.t)}>
            <div style={{ fontSize:26, marginBottom:6 }}>{q.i}</div>
            <div style={{ fontSize:12, fontWeight:600, color:C.charcoal }}>{q.l}</div>
            <div style={{ fontSize:10, color:C.grayL, marginTop:1 }}>{q.s}</div>
          </div>
        ))}
      </div>
      {patients.length === 0 && (
        <div style={{background:"linear-gradient(135deg,#F5F0FA,#EDE0F5)",borderRadius:18,padding:20,marginBottom:16,border:"2px dashed #D4BCE8"}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:"#7B5EA7",marginBottom:8}}>👋 ¡Bienvenida a Hadrion!</div>
          <div style={{fontSize:13,color:"#6B6560",lineHeight:1.8,marginBottom:12}}>
            Para empezar, te recomendamos estos 3 pasos:
          </div>
          {[
            ["1️⃣","Agregá tu primer paciente","Tocá 'Pacientes' en el menú y luego '+ Nuevo'","patients"],
            ["2️⃣","Registrá una sesión","Después de crear el paciente, usá 'Sesión rápida'","sessions"],
            ["3️⃣","Probá el Asistente IA","Pedile que te genere un informe o plan de trabajo","ia"],
          ].map(([n,t,d,page])=>(
            <div key={n} onClick={()=>setActive(page)}
              style={{display:"flex",gap:12,padding:"10px 14px",background:"white",borderRadius:12,marginBottom:8,cursor:"pointer",border:"1px solid #EDE0F5"}}>
              <div style={{fontSize:20,flexShrink:0}}>{n}</div>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:"#2C2C2C"}}>{t}</div>
                <div style={{fontSize:11,color:"#9B9590"}}>{d}</div>
              </div>
              <div style={{marginLeft:"auto",color:"#9B7EBD",fontSize:16,alignSelf:"center"}}>→</div>
            </div>
          ))}
        </div>
      )}

      <SC title="📅 Citas de hoy" action={<button className="btn btno btnsm" onClick={() => setActive("agenda")}>Ver agenda</button>}>
        {agendaItems.filter(a => a.date === todayKey).length === 0
          ? <div style={{ color:C.grayL, fontSize:12 }}>Sin citas para hoy</div>
          : agendaItems.filter(a => a.date === todayKey).map((a, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:`1px solid ${C.sand}` }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:a.color, flexShrink:0 }} />
              <div style={{ fontWeight:700, fontSize:13, color:C.charcoal, minWidth:46 }}>{a.time}</div>
              <div style={{ flex:1, fontSize:13, color:C.charcoal }}>{a.patient}</div>
              <span className="badge" style={{ background:a.color+"22", color:a.color, fontSize:10 }}>{a.type}</span>
            </div>
          ))
        }
      </SC>
    </div>
  );
}

// ─── AGENDA ───────────────────────────────────────────────────────────────────
function Agenda({ patients, items, setItems }) {
  const [showNew,  setShowNew]  = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [syncingId, setSyncingId] = useState(null);
  const [f, setF] = useState({ patient:"", time:"09:00", type:"Sesion", date:new Date().toISOString().slice(0,10), duration:45 });

  const todayKey    = new Date().toISOString().slice(0, 10);
  const tomorrowKey = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const save = () => {
    if (!f.patient || !f.time) return;
    const p   = patients.find(x => x.name === f.patient);
    const end = addMinutes(f.time, parseInt(f.duration) || 45);
    setItems(prev => [...prev, { id:makeId(), patient:f.patient, time:f.time, end, type:f.type, color:p?.color || C.terra, date:f.date }]);
    setF({ patient:"", time:"09:00", type:"Sesion", date:new Date().toISOString().slice(0,10), duration:45 });
    setShowNew(false);
  };

  // Agregar a Google Calendar (link directo, sin OAuth falso)
  const addToGcal = (item) => {
    setSyncingId(item.id);
    const fmt = s => s.replace(/[-:]/g, "");
    const startDT = `${item.date}T${item.time}:00`;
    const endDT   = `${item.date}T${item.end || addMinutes(item.time, 45)}:00`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&ctz=America%2FMontevideo`
      + `&text=${encodeURIComponent(`Hadrion — ${item.type}: ${item.patient}`)}`
      + `&dates=${fmt(startDT)}/${fmt(endDT)}`
      + `&details=${encodeURIComponent(`Sesion de ${item.type} con ${item.patient}`)}`
      + `&location=${encodeURIComponent("Consultorio")}`;
    window.open(url, "_blank");
    setTimeout(() => setSyncingId(null), 2000);
  };

  const grouped = [
    { label:"Hoy",    key:todayKey },
    { label:"Manana", key:tomorrowKey },
  ];
  const future = items.filter(a => a.date > tomorrowKey).sort((a,b) => a.date.localeCompare(b.date));

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">Agenda</div><div className="ps">Citas, turnos y Google Calendar</div></div>
        <button className="btn btnp btnsm noprint" onClick={() => setShowNew(true)}>+ Nuevo turno</button>
      </div>

      <div className="alert alrti" style={{ display:"flex", alignItems:"center", gap:8 }}>
        📅 Toca el botón <strong>📅 GCal</strong> en cada turno para abrirlo directamente en Google Calendar y recibirlo en tu celular y smartwatch.
      </div>

      {grouped.map(({ label, key }) => (
        <div key={key}>
          <div className="dayl">{label}</div>
          {items.filter(a => a.date === key).length === 0
            ? <div style={{ color:C.grayL, fontSize:12, paddingBottom:8 }}>Sin turnos</div>
            : items.filter(a => a.date === key).sort((a,b) => a.time.localeCompare(b.time)).map(a => (
              <div key={a.id} className="card" style={{ marginBottom:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:9, height:9, borderRadius:"50%", background:a.color, flexShrink:0 }} />
                  <div style={{ fontWeight:700, fontSize:14, color:C.charcoal, minWidth:48 }}>{a.time}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:13 }}>{a.patient}</div>
                    <div style={{ fontSize:11, color:C.grayL }}>{a.type} — hasta {a.end}</div>
                  </div>
                  <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                    <span className="badge" style={{ background:a.color+"22", color:a.color, fontSize:10 }}>{a.type}</span>
                    <button className="btn btnsm" style={{ background:"#4285F4", color:"white", padding:"6px 10px", fontSize:11, borderRadius:8, minHeight:36 }}
                      onClick={() => addToGcal(a)} title="Agregar a Google Calendar">
                      {syncingId === a.id ? "..." : "📅 GCal"}
                    </button>
                    <button style={{background:"#F5F0FA",border:"none",borderRadius:8,padding:"6px 10px",fontSize:11,fontWeight:700,color:"#9B7EBD",cursor:"pointer",minHeight:36}}
                      onClick={()=>setEditItem({...a})} title="Editar cita">✏️</button>
                    <button style={{background:"#FDECEA",border:"none",borderRadius:8,padding:"6px 10px",fontSize:11,fontWeight:700,color:"#C0392B",cursor:"pointer",minHeight:36}}
                      onClick={()=>setItems(prev=>prev.filter(x=>x.id!==a.id))} title="Eliminar cita">🗑️</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      ))}

      {future.length > 0 && (
        <div>
          <div className="dayl">Proximos</div>
          {future.map(a => (
            <div key={a.id} className="card" style={{ marginBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:9, height:9, borderRadius:"50%", background:a.color, flexShrink:0 }} />
                <div style={{ fontWeight:700, fontSize:13, color:C.charcoal, minWidth:80 }}>{a.date} {a.time}</div>
                <div style={{ flex:1, fontSize:13 }}>{a.patient} — {a.type}</div>
                <button className="btn btnsm" style={{ background:"#4285F4", color:"white", fontSize:11, borderRadius:8, minHeight:36 }}
                  onClick={() => addToGcal(a)}>📅 GCal</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editItem && (
        <Modal title="✏️ Editar cita" onClose={() => setEditItem(null)}>
          <div className="fg"><label className="lbl">Paciente</label>
            <select className="inp" value={editItem.patient} onChange={e=>setEditItem({...editItem,patient:e.target.value})}>
              {patients.map(p=><option key={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div className="fg"><label className="lbl">Fecha</label>
              <input type="date" className="inp" value={editItem.date} onChange={e=>setEditItem({...editItem,date:e.target.value})}/>
            </div>
            <div className="fg"><label className="lbl">Hora</label>
              <input type="time" className="inp" value={editItem.time} onChange={e=>setEditItem({...editItem,time:e.target.value})}/>
            </div>
          </div>
          <div className="fg"><label className="lbl">Tipo</label>
            <select className="inp" value={editItem.type} onChange={e=>setEditItem({...editItem,type:e.target.value})}>
              {["Sesion","Evaluacion","Seguimiento","Primera consulta"].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <button className="btn btnp btnfull" onClick={()=>{
            setItems(prev=>prev.map(x=>x.id===editItem.id
              ? {...x, patient:editItem.patient, date:editItem.date, time:editItem.time,
                  type:editItem.type, end:addMinutes(editItem.time,45),
                  color:patients.find(p=>p.name===editItem.patient)?.color||"#9B7EBD"}
              : x));
            setEditItem(null);
          }}>Guardar cambios</button>
          <button className="btn btng btnfull" onClick={()=>setEditItem(null)}>Cancelar</button>
        </Modal>
      )}

      {showNew && (
        <Modal title="Nuevo Turno" onClose={() => setShowNew(false)}>
          <div className="fg"><label className="lbl">Paciente</label>
            <select className="inp" value={f.patient} onChange={e => setF({ ...f, patient:e.target.value })}>
              <option value="">Selecciona...</option>
              {patients.map(p => <option key={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Fecha</label><input type="date" className="inp" value={f.date} onChange={e => setF({ ...f, date:e.target.value })} /></div>
          <div className="fg"><label className="lbl">Hora</label><input type="time" className="inp" value={f.time} onChange={e => setF({ ...f, time:e.target.value })} /></div>
          <div className="fg"><label className="lbl">Duracion (minutos)</label>
            <select className="inp" value={f.duration} onChange={e => setF({ ...f, duration:e.target.value })}>
              {[30,45,60,90].map(d => <option key={d} value={d}>{d} minutos</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Tipo</label>
            <select className="inp" value={f.type} onChange={e => setF({ ...f, type:e.target.value })}>
              {["Sesion","Evaluacion","Seguimiento","Primera consulta"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <button className="btn btnp btnfull" onClick={save}>Guardar turno</button>
          <div className="alert alrti" style={{ marginTop:8, fontSize:11 }}>
            Despues de guardar, toca "📅 GCal" en el turno para abrirlo en Google Calendar automaticamente.
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── PATIENTS ─────────────────────────────────────────────────────────────────
function Patients({ patients, setPatients, setActive, setSelPatId, sessions }) {
  const [sel, setSel]       = useState(null);
  const [editing, setEditing] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [search, setSearch]   = useState("");
  const [editF, setEditF]     = useState({});
  const emptyF = { name:"", age:"", diagnosis:"", phone:"", email:"", guardian:"", notes:"", dependencia:"Particular", tarifaPorSesion:"", complemento:"", currency:"UYU" };
  const [f, setF]             = useState(emptyF);

  const dC = { TEL:C.terra, Dislexia:C.sage, TDAH:C.purple, Disartria:C.info, TEA:C.gold, Otro:C.gray };
  const cols = [C.terra, C.sage, C.purple, C.info, C.gold];

  const filtered = patients.filter(p =>
    p.status !== "archived" &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.diagnosis.toLowerCase().includes(search.toLowerCase()))
  );

  const add = () => {
    if (!f.name || !f.diagnosis) return;
    const init = f.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    setPatients(prev => [...prev, {
      id: makeId(), name:f.name, age:parseInt(f.age)||0, diagnosis:f.diagnosis,
      sessions:0, nextSession:"Sin agendar", avatar:init,
      color: cols[prev.length % cols.length],
      phone:f.phone, email:f.email, guardian:f.guardian, notes:f.notes, goals:[], status:"active",
      dependencia:f.dependencia||"Particular", tarifaPorSesion:parseFloat(f.tarifaPorSesion)||0,
      complemento:parseFloat(f.complemento)||0, currency:f.currency||"UYU", asistencias:{}
    }]);
    setF(emptyF); setShowNew(false);
  };

  const saveEdit = () => {
    setPatients(prev => prev.map(p => p.id === sel.id ? { ...p, ...editF } : p));
    setSel(prev => ({ ...prev, ...editF }));
    setEditing(false);
  };

  const pSessions = sel ? sessions.filter(s => s.patientId === sel.id) : [];

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">Pacientes</div><div className="ps">{filtered.length} activos</div></div>
        <button className="btn btnp btnsm noprint" onClick={() => setShowNew(true)}>+ Nuevo</button>
      </div>
      <input className="inp" placeholder="🔍 Buscar por nombre o diagnóstico..." value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom:12 }} />
      {filtered.map(p => (
        <div key={p.id} className="card" style={{ marginBottom:10, cursor:"pointer" }} onClick={() => { setSel(p); setEditing(false); }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div className="av" style={{ width:48, height:48, background:p.color, fontSize:15 }}>{p.avatar}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:14, color:C.charcoal }}>{p.name}</div>
              <div style={{ fontSize:12, color:C.grayL, marginTop:1 }}>{p.age} años — <span className="badge" style={{ background:(dC[p.diagnosis]||C.gray)+"22", color:dC[p.diagnosis]||C.gray, fontSize:10 }}>{p.diagnosis}</span></div>
              {(p.dependencia||p.tarifaPorSesion>0) && (
                <div style={{display:"flex",gap:5,marginTop:3,flexWrap:"wrap"}}>
                  <span style={{fontSize:10,background:"#F5F0FA",color:"#9B7EBD",borderRadius:5,padding:"1px 6px",fontWeight:700}}>{p.dependencia||"Particular"}</span>
                  {p.tarifaPorSesion>0 && <span style={{fontSize:10,color:"#9B9590"}}>${(p.tarifaPorSesion||0).toLocaleString("es-UY")}/ses{(p.complemento||0)>0?` +$${p.complemento.toLocaleString("es-UY")} compl.`:""}</span>}
                </div>
              )}
              <div style={{ fontSize:11, color:C.grayL, marginTop:2 }}>📅 {p.nextSession}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:C.terra }}>{sessions.filter(s => s.patientId === p.id).length}</div>
              <div style={{ fontSize:10, color:C.grayL }}>sesiones</div>
            </div>
          </div>
        </div>
      ))}

      {sel && !editing && (
        <Modal title="" onClose={() => setSel(null)}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
            <div className="av" style={{ width:54, height:54, background:sel.color, fontSize:18, borderRadius:16 }}>{sel.avatar}</div>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:C.charcoal }}>{sel.name}</div>
              <div style={{ fontSize:12, color:C.grayL }}>{sel.age} años — {sel.diagnosis} — {pSessions.length} sesiones</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:12 }}>
            <button className="btn btng btnsm" onClick={() => { setEditF({ name:sel.name, age:sel.age, diagnosis:sel.diagnosis, phone:sel.phone, email:sel.email, guardian:sel.guardian, notes:sel.notes }); setEditing(true); }}>✏️ Editar</button>
            <button className="btn btng btnsm" onClick={() => { setPatients(prev => prev.map(p => p.id === sel.id ? { ...p, status:"archived" } : p)); setSel(null); }}>📦 Archivar</button>
            <button className="btn btno btnsm" onClick={() => { setSelPatId(sel.id); setActive("history"); setSel(null); }}>📋 Historia</button>
          </div>
          <div className="sep" />
          {[["📞", sel.phone||"—"],["✉️", sel.email||"—"],["👨‍👩‍👧", sel.guardian||"—"]].map(([ic, v]) => (
            <div key={ic} className="hxf"><div className="hxv">{ic} {v}</div></div>
          ))}
          {sel.notes && <div className="hxf"><div className="hxl">Notas</div><div className="hxv">{sel.notes}</div></div>}

          {/* Objetivos editables */}
          <div className="hxf">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div className="hxl">Objetivos terapéuticos</div>
              <button style={{background:"none",border:"none",fontSize:11,color:"#9B7EBD",cursor:"pointer",fontWeight:700,fontFamily:"sans-serif"}}
                onClick={()=>{
                  const nuevo = window.prompt("Nuevo objetivo:");
                  if (nuevo?.trim()) setPatients(prev=>prev.map(p=>p.id===sel.id?{...p,goals:[...(p.goals||[]),nuevo.trim()]}:p));
                }}>+ Agregar</button>
            </div>
            {(sel.goals||[]).length===0 && <div style={{fontSize:12,color:"#9B9590"}}>Sin objetivos registrados</div>}
            {(sel.goals||[]).map((g,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:"#F5F0FA",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#9B7EBD",flexShrink:0}}>{i+1}</div>
                <div style={{flex:1,fontSize:12,color:"#2C2C2C",lineHeight:1.4}}>{g}</div>
                <button style={{background:"none",border:"none",fontSize:16,cursor:"pointer",color:"#C0392B",padding:"0 4px",lineHeight:1}}
                  onClick={()=>setPatients(prev=>prev.map(p=>p.id===sel.id?{...p,goals:(p.goals||[]).filter((_,j)=>j!==i)}:p))}>×</button>
              </div>
            ))}
          </div>

          <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
            <button className="btn btno btnsm noprint" onClick={()=>window.print()}>🖨️ Imprimir ficha</button>
            <button className="btn btnsm noprint" style={{background:"#25D366",color:"white"}}
              onClick={()=>{
                const txt = [`FICHA CLÍNICA — ${sel.name}`,`Diagnóstico: ${sel.diagnosis} | Edad: ${sel.age} años`,sel.guardian?`Tutor: ${sel.guardian}`:"",sel.phone?`Tel: ${sel.phone}`:"",sel.notes?`Notas: ${sel.notes}`:"",
                (sel.goals||[]).length>0?`Objetivos:\n${(sel.goals||[]).map((g,i)=>`${i+1}. ${g}`).join("\n")}`:"","\nHadrion — comunipro12@gmail.com"].filter(Boolean).join("\n");
                const phone = (sel.phone||"").replace(/[^0-9]/g,"");
                window.open(phone?`https://wa.me/${phone}?text=${encodeURIComponent(txt)}`:`https://wa.me/?text=${encodeURIComponent(txt)}`,"_blank");
              }}>💬 WhatsApp</button>
            <button className="btn btnsm noprint" style={{background:"#5B8DB8",color:"white"}}
              onClick={()=>{
                const body = `Ficha de ${sel.name}
Diagnóstico: ${sel.diagnosis}
Edad: ${sel.age} años
${sel.notes||""}
Objetivos: ${(sel.goals||[]).join(", ")}

Hadrion — comunipro12@gmail.com`;
                window.open(`mailto:${sel.email||""}?subject=${encodeURIComponent("Ficha — "+sel.name)}&body=${encodeURIComponent(body)}`);
              }}>✉️ Email</button>
          </div>
        </Modal>
      )}

      {sel && editing && (
        <Modal title="Editar paciente" onClose={() => setEditing(false)}>
          {[["Nombre completo","name","text"],["Edad","age","number"],["Telefono","phone","tel"],["Email","email","email"],["Tutor/Responsable","guardian","text"]].map(([l, k, t]) => (
            <div className="fg" key={k}><label className="lbl">{l}</label>
              <input className="inp" type={t} value={editF[k]||""} onChange={e => setEditF({ ...editF, [k]:e.target.value })} />
            </div>
          ))}
          <div className="fg"><label className="lbl">Diagnostico</label>
            <select className="inp" value={editF.diagnosis||""} onChange={e => setEditF({ ...editF, diagnosis:e.target.value })}>
              {["TEL","Dislexia","TDAH","Disartria","TEA","Discalculia","Tartamudez","Otro"].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Notas</label>
            <textarea className="inp" value={editF.notes||""} onChange={e => setEditF({ ...editF, notes:e.target.value })} />
          </div>
          <button className="btn btnp btnfull" onClick={saveEdit}>Guardar cambios</button>
          <button className="btn btng btnfull" onClick={() => setEditing(false)}>Cancelar</button>
        </Modal>
      )}

      {showNew && (
        <Modal title="Nuevo Paciente" onClose={() => setShowNew(false)}>
          {[["Nombre completo","name","text","Nombre y apellido"],["Edad","age","number","Anos"],["Telefono","phone","tel","(+598) 9..."],["Email","email","email","email@mail.com"],["Tutor/Responsable","guardian","text","Nombre y parentesco"]].map(([l, k, t, ph]) => (
            <div className="fg" key={k}><label className="lbl">{l}</label>
              <input className="inp" type={t} placeholder={ph} value={f[k]} onChange={e => setF({ ...f, [k]:e.target.value })} />
            </div>
          ))}
          <div className="fg"><label className="lbl">Diagnostico</label>
            <select className="inp" value={f.diagnosis} onChange={e => setF({ ...f, diagnosis:e.target.value })}>
              <option value="">Selecciona diagnostico...</option>
              {["TEL","Dislexia","TDAH","Disartria","TEA","Discalculia","Tartamudez","Otro"].map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Notas iniciales</label>
            <textarea className="inp" placeholder="Motivo de consulta..." value={f.notes} onChange={e => setF({ ...f, notes:e.target.value })} />
          </div>
          <div style={{background:"#F5F0FA",borderRadius:12,padding:12,marginBottom:4}}>
            <div style={{fontSize:11,fontWeight:700,color:"#7B5EA7",marginBottom:8,textTransform:"uppercase"}}>💰 Tarifa y cobro</div>
            <div className="fg"><label className="lbl">Dependencia</label>
              <select className="inp" value={f.dependencia} onChange={e=>setF({...f,dependencia:e.target.value})}>
                {["Particular","BPS","FONASA","Mutual","Prepaga","Obra social","Otro"].map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
              <div className="fg"><label className="lbl">Tarifa/ses.</label>
                <input className="inp" type="number" min="0" placeholder="0" value={f.tarifaPorSesion} onChange={e=>setF({...f,tarifaPorSesion:e.target.value})}/>
              </div>
              <div className="fg"><label className="lbl">Complemento</label>
                <input className="inp" type="number" min="0" placeholder="0" value={f.complemento} onChange={e=>setF({...f,complemento:e.target.value})}/>
              </div>
              <div className="fg"><label className="lbl">Moneda</label>
                <select className="inp" value={f.currency} onChange={e=>setF({...f,currency:e.target.value})}>
                  <option value="UYU">UYU</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
          </div>
          <button className="btn btnp btnfull" onClick={add}>Agregar paciente</button>
        </Modal>
      )}
    </div>
  );
}

// ─── PAYMENTS ─────────────────────────────────────────────────────────────────
function Payments({ patients, payments, setPayments }) {
  const [showNew, setShowNew] = useState(false);
  const [f, setF] = useState({ patientId:"", amount:"", type:"Particular", method:"Transferencia", date:new Date().toISOString().slice(0,10), currency:"UYU", notes:"" });

  const total      = payments.filter(p => p.status === "pagado").reduce((a, p) => a + p.amount, 0);
  const particular = payments.filter(p => p.type === "Particular"  && p.status === "pagado").reduce((a, p) => a + p.amount, 0);
  const obra       = payments.filter(p => p.type === "Obra social" && p.status === "pagado").reduce((a, p) => a + p.amount, 0);

  const save = () => {
    if (!f.patientId || !f.amount) return;
    const p = patients.find(x => String(x.id) === String(f.patientId));
    setPayments(prev => [...prev, { id:makeId(), patientId:p?.id||f.patientId, patient:p?.name||"", amount:parseInt(f.amount), currency:f.currency||"UYU", type:f.type, date:f.date, method:f.method, notes:f.notes||"", status:"pagado" }]);
    setF({ patientId:"", amount:"", type:"Particular", method:"Transferencia", date:new Date().toISOString().slice(0,10), currency:"UYU", notes:"" });
    setShowNew(false);
  };

  const month = cap(new Date().toLocaleDateString("es-UY", { month:"long", year:"numeric" }));

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">Registro de Pagos</div><div className="ps">{month}</div></div>
        <button className="btn btnp btnsm noprint" onClick={() => setShowNew(true)}>+ Registrar pago</button>
      </div>
      {[{ l:"Total cobrado", v:total, n:payments.filter(p=>p.status==="pagado").length, ic:"📈", c:C.terra },
        { l:"Particular",   v:particular, n:payments.filter(p=>p.type==="Particular").length, ic:"💰", c:C.purple },
        { l:"Obra social",  v:obra, n:payments.filter(p=>p.type==="Obra social").length, ic:"🏥", c:C.info }].map(r => (
        <div key={r.l} className="card" style={{ marginBottom:10, display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:46, height:46, borderRadius:13, background:r.c+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{r.ic}</div>
          <div>
            <div style={{ fontSize:12, color:C.grayL }}>{r.l}</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:C.charcoal }}>${r.v.toLocaleString("es-UY")}</div>
            <div style={{ fontSize:11, color:C.grayL }}>{r.n} pagos</div>
          </div>
        </div>
      ))}
      <div className="sep" />
      {payments.length === 0
        ? <div style={{ textAlign:"center", padding:"30px 0", color:C.grayL }}><div style={{ fontSize:36 }}>💳</div><div style={{ fontWeight:600 }}>Sin cobros registrados</div></div>
        : payments.map(p => (
          <div key={p.id} className="card" style={{ marginBottom:8 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div><div style={{ fontWeight:600, fontSize:13 }}>{p.patient}</div><div style={{ fontSize:11, color:C.grayL }}>{p.date} — {p.type} — {p.method}</div></div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontWeight:700, fontSize:16 }}>${p.amount.toLocaleString("es-UY")}</div>
                <span className="badge" style={{ background:p.status==="pagado"?C.greenF:C.goldF, color:p.status==="pagado"?C.forest:C.gold, fontSize:10 }}>{p.status}</span>
              </div>
            </div>
          </div>
        ))
      }
      {showNew && (
        <Modal title="Registrar Pago" onClose={() => setShowNew(false)}>
          <div className="fg"><label className="lbl">Paciente</label>
            <select className="inp" value={f.patientId} onChange={e => setF({ ...f, patientId:e.target.value })}>
              <option value="">Selecciona...</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Monto</label><input className="inp" type="number" placeholder="0" value={f.amount} onChange={e => setF({ ...f, amount:e.target.value })} /></div>
          <div className="fg"><label className="lbl">Tipo</label>
            <select className="inp" value={f.type} onChange={e => setF({ ...f, type:e.target.value })}>
              {["Particular","Obra social","Mutual","Prepaga"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Metodo</label>
            <select className="inp" value={f.method} onChange={e => setF({ ...f, method:e.target.value })}>
              {["Transferencia","Efectivo","Tarjeta","MercadoPago"].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Fecha</label><input type="date" className="inp" value={f.date} onChange={e => setF({ ...f, date:e.target.value })} /></div>
          <button className="btn btnp btnfull" onClick={save}>Guardar pago</button>
        </Modal>
      )}
    </div>
  );
}

// ─── SESSIONS ─────────────────────────────────────────────────────────────────
const ECHIPS = ["regulado","cansado","irritable","baja energia","hiperactivo","malestar fisico","buena disposicion"];
const ACHIPS = ["sostenida","fluctuante","dispersa","requiere apoyos"];
const SCHIPS = ["busqueda sensorial","evitacion","sensibilidad auditiva","sensibilidad tactil","necesidad de movimiento"];
const PCHIPS = ["buena","parcial","rechazo inicial","se adapto progresivamente"];

function Sessions({ patients, sessions, setSessions, setPatients }) {
  const [showNew, setShowNew] = useState(false);
  const [f, setF] = useState({ patientId:"", objective:"", note:"", progress:50, activities:"", homework:"", estado:"", atencion:"", participacion:"", sensorial:[] });

  const tog = (k, v) => {
    if (k === "sensorial") setF(p => ({ ...p, sensorial: p.sensorial.includes(v) ? p.sensorial.filter(x => x !== v) : [...p.sensorial, v] }));
    else setF(p => ({ ...p, [k]: p[k] === v ? "" : v }));
  };

  const save = () => {
    if (!f.patientId || !f.note) return;
    const p = patients.find(x => String(x.id) === String(f.patientId));
    if (!p || !f.note) return;
    const newSession = { id:makeId(), patientId:p.id, patient:p?.name||"", date:new Date().toLocaleDateString("es-UY"), ...f, duration:f.duration||45, activities:f.activities ? f.activities.split(",").map(s => s.trim()) : [] };
    setSessions(prev => [newSession, ...prev]);
    // actualizar contador de sesiones del paciente
    setPatients(prev => prev.map(pat => String(pat.id) === String(f.patientId) ? { ...pat, sessions: pat.sessions + 1 } : pat));
    setF({ patientId:"", objective:"", note:"", progress:50, activities:"", homework:"", estado:"", atencion:"", participacion:"", sensorial:[] });
    setShowNew(false);
  };

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">Registros Clinicos</div><div className="ps">Historial de sesiones</div></div>
        <button className="btn btnp btnsm noprint" onClick={() => setShowNew(true)}>+ Registrar</button>
      </div>
      {sessions.length === 0 && (
        <div style={{background:"#F5F0FA",borderRadius:16,padding:24,textAlign:"center",marginBottom:12}}>
          <div style={{fontSize:36,marginBottom:8}}>📝</div>
          <div style={{fontWeight:700,fontSize:15,color:"#7B5EA7",marginBottom:6}}>Sin sesiones registradas</div>
          <div style={{fontSize:13,color:"#9B9590",marginBottom:14}}>Tocá el botón <strong>"+ Registrar"</strong> para documentar tu primera sesión.</div>
          <div style={{fontSize:12,color:"#9B9590"}}>También podés usar <strong>Sesión rápida</strong> desde el Panel para registrar sin completar todos los campos.</div>
        </div>
      )}
      {sessions.map(s => (
        <div key={s.id} className="sc">
          <div className="sch">
            <div><div style={{ fontWeight:700, fontSize:14, color:C.charcoal }}>{s.patient}</div><div style={{ fontSize:11, color:C.grayL }}>{s.date}</div></div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              {s.objective && <span className="badge" style={{ background:C.terraF, color:C.terra, fontSize:10 }}>{s.objective}</span>}
              <div style={{display:"flex",gap:4}}>
                <button className="btn btng btnsm noprint" onClick={() => window.print()} title="Imprimir">🖨️</button>
                <button className="btn btnsm noprint" style={{background:"#25D366",color:"white",padding:"5px 8px",fontSize:10,borderRadius:8}} title="Enviar por WhatsApp"
                  onClick={()=>{
                    const txt = [`SESIÓN — ${s.patient}`,`Fecha: ${s.date}`,s.objective?`Objetivo: ${s.objective}`:"",`\n${s.note}`,s.homework?`
Tarea: ${s.homework}`:"",`\nProgreso: ${s.progress}%`,"\nHadrion — comunipro12@gmail.com"].filter(Boolean).join("\n");
                    const p = patients.find(x=>x.id===s.patientId);
                    const phone = (p?.phone||"").replace(/[^0-9]/g,"");
                    window.open(phone?`https://wa.me/${phone}?text=${encodeURIComponent(txt)}`:`https://wa.me/?text=${encodeURIComponent(txt)}`,"_blank");
                  }}>💬</button>
                <button className="btn btnsm noprint" style={{background:"#5B8DB8",color:"white",padding:"5px 8px",fontSize:10,borderRadius:8}} title="Enviar por Email"
                  onClick={()=>{
                    const p = patients.find(x=>x.id===s.patientId);
                    const body = `Sesión ${s.date} — ${s.patient}
${s.note}
${s.homework?"Tarea: "+s.homework:""}

Hadrion — comunipro12@gmail.com`;
                    window.open(`mailto:${p?.email||""}?subject=${encodeURIComponent("Sesión "+s.date+" — "+s.patient)}&body=${encodeURIComponent(body)}`);
                  }}>✉️</button>
              </div>
            </div>
          </div>
          <div className="scb">
            {s.estado && <div className="hxf"><div className="hxl">Estado — Atencion</div><div className="hxv">{s.estado}{s.atencion ? ` — ${s.atencion}` : ""}</div></div>}
            <div className="hxf"><div className="hxl">📝 Notas clinicas</div><div className="hxv">{s.note}</div></div>
            {s.homework && <div className="hxf"><div className="hxl">🏠 Tarea para casa</div><div className="hxv">{s.homework}</div></div>}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:8 }}>
              <div style={{ fontSize:11, color:C.grayL }}>Progreso</div>
              <div className="prog" style={{ flex:1 }}><div className="progf" style={{ width:`${s.progress}%` }} /></div>
              <span style={{ fontSize:12, fontWeight:700, color:C.terra }}>{s.progress}%</span>
            </div>
          </div>
        </div>
      ))}
      {showNew && (
        <Modal title="Nueva Sesion" onClose={() => setShowNew(false)}>
          <div className="fg"><label className="lbl">Paciente</label>
            <select className="inp" value={f.patientId} onChange={e => setF({ ...f, patientId:e.target.value })}>
              <option value="">Selecciona...</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div style={{ fontWeight:700, fontSize:13, color:C.charcoal, margin:"10px 0 7px" }}>⚡ Fichas clinicas rapidas</div>
          <div style={{ background:C.cream, borderRadius:12, padding:12, marginBottom:12 }}>
            {[["ESTADO GENERAL","estado",ECHIPS],["ATENCION","atencion",ACHIPS],["SENSORIAL","sensorial",SCHIPS],["PARTICIPACION","participacion",PCHIPS]].map(([l, k, chips]) => (
              <div key={k}>
                <div className="lbl" style={{ marginTop:k!=="estado"?8:0, marginBottom:5 }}>{l}</div>
                <div className="chiprow">{chips.map(c => <button key={c} className={`chip${(k==="sensorial"?f.sensorial.includes(c):f[k]===c)?" sel":""}`} onClick={() => tog(k, c)}>{c}</button>)}</div>
              </div>
            ))}
          </div>
          <div className="fg"><label className="lbl">Objetivo trabajado</label><input className="inp" placeholder="Ej: Fonemas fricativos /s/" value={f.objective} onChange={e => setF({ ...f, objective:e.target.value })} /></div>
          <div className="fg"><label className="lbl">Notas clinicas</label><textarea className="inp" placeholder="Observaciones, logros, dificultades..." value={f.note} onChange={e => setF({ ...f, note:e.target.value })} /></div>
          <div className="fg"><label className="lbl">Actividades (separadas por coma)</label><input className="inp" placeholder="Ruleta de silabas, Espejo articulatorio" value={f.activities} onChange={e => setF({ ...f, activities:e.target.value })} /></div>
          <div className="fg"><label className="lbl">Tarea para casa</label><input className="inp" placeholder="Indicaciones para la familia..." value={f.homework} onChange={e => setF({ ...f, homework:e.target.value })} /></div>
          <div className="fg"><label className="lbl">Progreso: {f.progress}%</label>
            <input type="range" style={{ width:"100%", accentColor:C.terra }} min={0} max={100} step={5} value={f.progress} onChange={e => setF({ ...f, progress:parseInt(e.target.value) })} />
            <div className="prog" style={{ marginTop:4 }}><div className="progf" style={{ width:`${f.progress}%` }} /></div>
          </div>
          <button className="btn btnp btnfull" onClick={save}>Guardar sesion</button>
        </Modal>
      )}
    </div>
  );
}

// ─── HISTORY ──────────────────────────────────────────────────────────────────
function History({ patients, sessions, selectedPatientId, setPatients }) {
  const [pid, setPid] = useState(selectedPatientId || "");
  const [ans, setAns] = useState({});
  const [tab, setTab] = useState("anamnesis");
  const [htab, setHtab] = useState("evoluciones");
  const patient = patients.find(p => String(p.id) === String(pid));
  const pSess   = sessions.filter(s => String(s.patientId) === String(pid));
  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Historia Clinica</div><div className="ps">Registro integral del paciente</div></div>
      <div className="fg"><label className="lbl">Selecciona paciente</label>
        <select className="inp" value={pid} onChange={e => setPid(e.target.value)}>
          <option value="">Elige un paciente...</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      {patient && (
        <>
        <div className="atabrow" style={{marginBottom:14}}>
          {[["evoluciones","📝 Evoluciones"],["anamnesis","📋 Anamnesis"],["informe","📄 Informe"]].map(([id,l]) => (
            <button key={id} className={`atab${htab===id?" active":""}`} onClick={()=>setHtab(id)}>{l}</button>
          ))}
        </div>
        </>
      )}
      {patient && htab === "anamnesis" && (
        <div style={{background:"white",borderRadius:16,padding:16,marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:14}}>📋 Anamnesis — {patient.name}</div>
          {[
            ["Motivo de consulta","motivo"],["Antecedentes médicos","antecedentes"],
            ["Historia del desarrollo","desarrollo"],["Conducta en sesión","conducta"],
            ["Observaciones familiares","familia"],["Diagnóstico presuntivo","diagnosticoP"],
          ].map(([label, key]) => (
            <div className="fg" key={key}>
              <label className="lbl">{label}</label>
              <textarea className="inp" style={{minHeight:64}}
                value={patient[key]||""}
                onChange={e => {
                  if (setPatients) setPatients(prev => prev.map(p => p.id===patient.id ? {...p,[key]:e.target.value} : p));
                }}
                placeholder={`Escribí ${label.toLowerCase()}...`}/>
            </div>
          ))}
          <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
            <button className="btn btno btnsm noprint" onClick={()=>window.print()}>🖨️ Imprimir</button>
            <button className="btn btnsm noprint"
              style={{background:"#25D366",color:"white"}}
              onClick={()=>{
                const txt = [
                  `ANAMNESIS — ${patient.name}`,
                  `Fecha: ${new Date().toLocaleDateString("es-UY")}`,
                  `Diagnóstico: ${patient.diagnosis}`,
                  `Edad: ${patient.age} años`,
                  "",
                  patient.motivo ? `MOTIVO DE CONSULTA:
${patient.motivo}` : "",
                  patient.antecedentes ? `ANTECEDENTES:
${patient.antecedentes}` : "",
                  patient.desarrollo ? `DESARROLLO:
${patient.desarrollo}` : "",
                  patient.conducta ? `CONDUCTA EN SESIÓN:
${patient.conducta}` : "",
                  patient.familia ? `OBSERVACIONES FAMILIARES:
${patient.familia}` : "",
                  patient.diagnosticoP ? `DIAGNÓSTICO PRESUNTIVO:
${patient.diagnosticoP}` : "",
                  "",
                  "Hadrion — Plataforma Terapéutica · comunipro12@gmail.com"
                ].filter(Boolean).join("\n");
                const phone = (patient.phone||"").replace(/\D/g,"");
                const url = phone
                  ? `https://wa.me/${phone}?text=${encodeURIComponent(txt)}`
                  : `https://wa.me/?text=${encodeURIComponent(txt)}`;
                window.open(url,"_blank");
              }}>
              💬 WhatsApp
            </button>
            <button className="btn btnsm noprint"
              style={{background:"#5B8DB8",color:"white"}}
              onClick={()=>{
                const txt = [
                  `ANAMNESIS — ${patient.name}`,
                  `Diagnóstico: ${patient.diagnosis} | Edad: ${patient.age} años`,
                  patient.motivo ? `Motivo: ${patient.motivo}` : "",
                  patient.antecedentes ? `Antecedentes: ${patient.antecedentes}` : "",
                  "Hadrion — comunipro12@gmail.com"
                ].filter(Boolean).join("\n");
                window.open(`mailto:${patient.email||""}?subject=${encodeURIComponent("Anamnesis — "+patient.name)}&body=${encodeURIComponent(txt)}`);
              }}>
              ✉️ Email
            </button>
          </div>
        </div>
      )}
      {patient && htab === "informe" && (
        <div style={{background:"white",borderRadius:16,padding:16,marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>📄 Informe formal — {patient.name}</div>
          <div style={{fontSize:12,color:"#9B9590",marginBottom:14}}>Generá un informe para entregar a la familia o institución.</div>
          <div style={{borderTop:"2px solid #9B7EBD",paddingTop:14,fontFamily:"Georgia,serif"}}>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{fontWeight:700,fontSize:16}}>INFORME DE EVALUACIÓN Y SEGUIMIENTO TERAPÉUTICO</div>
              <div style={{fontSize:13,color:"#6B6560",marginTop:4}}>Hadrion — Plataforma Terapéutica · comunipro12@gmail.com</div>
              <div style={{fontSize:12,color:"#9B9590"}}>Fecha: {new Date().toLocaleDateString("es-UY",{day:"numeric",month:"long",year:"numeric"})}</div>
            </div>
            {[
              ["DATOS DEL PACIENTE", `Nombre: ${patient.name}
Edad: ${patient.age} años
Diagnóstico: ${patient.diagnosis}
Sesiones realizadas: ${pSess.length}`],
              ["OBJETIVOS TERAPÉUTICOS", (patient.goals||[]).map((g,i)=>`${i+1}. ${g}`).join("\n") || "Sin objetivos registrados"],
              ["EVOLUCIÓN", pSess.length > 0 ? `Última sesión (${pSess[0]?.date}): ${pSess[0]?.note}` : "Sin sesiones registradas"],
              ["OBSERVACIONES", patient.notes || "Sin observaciones"],
            ].map(([title, content]) => (
              <div key={title} style={{marginBottom:14}}>
                <div style={{fontWeight:700,fontSize:13,borderBottom:"1px solid #EDE0F5",paddingBottom:4,marginBottom:6}}>{title}</div>
                <div style={{fontSize:13,lineHeight:1.7,whiteSpace:"pre-line"}}>{content}</div>
              </div>
            ))}
            <div style={{marginTop:24,display:"flex",justifyContent:"flex-end"}}>
              <div style={{textAlign:"center"}}>
                <div style={{borderTop:"1px solid #2C2C2C",width:200,marginBottom:4}}/>
                <div style={{fontSize:12}}>Firma y sello profesional</div>
                <div style={{fontSize:11,color:"#9B9590",marginTop:2}}>comunipro12@gmail.com</div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"}}>
            <button className="btn btno btnsm noprint" onClick={()=>window.print()}>🖨️ Imprimir</button>
            <button className="btn btnsm noprint"
              style={{background:"#25D366",color:"white"}}
              onClick={()=>{
                const txt = [
                  `INFORME TERAPÉUTICO — ${patient.name}`,
                  `Fecha: ${new Date().toLocaleDateString("es-UY")}`,
                  `Edad: ${patient.age} años | Diagnóstico: ${patient.diagnosis}`,
                  `Sesiones realizadas: ${pSess.length}`,
                  "",
                  "OBJETIVOS:",
                  ...(patient.goals||[]).map((g,i)=>`${i+1}. ${g}`),
                  "",
                  pSess.length>0 ? `ÚLTIMA SESIÓN (${pSess[0]?.date}):
${pSess[0]?.note}` : "",
                  patient.notes ? `OBSERVACIONES:
${patient.notes}` : "",
                  "",
                  "Hadrion — Plataforma Terapéutica · comunipro12@gmail.com"
                ].filter(Boolean).join("\n");
                const phone = (patient.phone||"").replace(/\D/g,"");
                const url = phone
                  ? `https://wa.me/${phone}?text=${encodeURIComponent(txt)}`
                  : `https://wa.me/?text=${encodeURIComponent(txt)}`;
                window.open(url,"_blank");
              }}>
              💬 WhatsApp
            </button>
            <button className="btn btnsm noprint"
              style={{background:"#5B8DB8",color:"white"}}
              onClick={()=>{
                const txt = `Estimada familia de ${patient.name}:

Adjunto informe terapéutico.

Diagnóstico: ${patient.diagnosis}
Sesiones: ${pSess.length}
Objetivos: ${(patient.goals||[]).join(", ")}

Adriana Soba
comunipro12@gmail.com`;
                window.open(`mailto:${patient.email||""}?subject=${encodeURIComponent("Informe terapéutico — "+patient.name)}&body=${encodeURIComponent(txt)}`);
              }}>
              ✉️ Email
            </button>
          </div>
        </div>
      )}
      {patient && htab === "evoluciones" && (
        <>
          <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:14, background:"white", borderRadius:14, padding:13, boxShadow:"0 1px 6px rgba(0,0,0,.05)" }}>
            <div className="av" style={{ width:46, height:46, background:patient.color, fontSize:15 }}>{patient.avatar}</div>
            <div style={{ flex:1 }}><div style={{ fontWeight:700, fontSize:14, color:C.charcoal }}>{patient.name}</div><div style={{ fontSize:12, color:C.grayL }}>{patient.age} años — {patient.diagnosis}</div></div>
            <button className="btn btno btnsm noprint" onClick={() => window.print()}>🖨️ Imprimir</button>
          </div>
          <div className="atabrow">
            {["anamnesis","objetivos","evolucion","informe"].map(t => <button key={t} className={`atab${tab===t?" active":""}`} onClick={() => setTab(t)}>{cap(t)}</button>)}
          </div>
          {tab === "anamnesis" && ANAMNESIS.map((sec, si) => (
            <SC key={si} title={`${sec.i} ${sec.t}`}>
              {sec.q.map((q, qi) => (
                <div key={qi} style={{ marginBottom:10 }}>
                  <div style={{ fontSize:12, color:C.grayL, marginBottom:4 }}>{q}</div>
                  <textarea className="inp" placeholder="Respuesta..." value={ans[`${si}-${qi}`]||""} onChange={e => setAns({ ...ans, [`${si}-${qi}`]:e.target.value })} style={{ minHeight:52, fontSize:12 }} />
                </div>
              ))}
            </SC>
          ))}
          {tab === "objetivos" && (
            <SC title="🎯 Objetivos Terapeuticos">
              {patient.goals?.length > 0 ? patient.goals.map((g, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.sand}` }}>
                  <div style={{ width:22, height:22, borderRadius:6, background:C.terraF, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:C.terra }}>{i+1}</div>
                  <div style={{ fontSize:13, color:C.charcoal }}>{g}</div>
                </div>
              )) : <div style={{ color:C.grayL, fontSize:13 }}>Sin objetivos cargados.</div>}
            </SC>
          )}
          {tab === "evolucion" && (
            <SC title={`📝 Evolucion (${pSess.length} sesiones)`}>
              {pSess.length === 0 ? <div style={{ color:C.grayL, fontSize:13 }}>Sin sesiones.</div> : pSess.map((s, i) => (
                <div key={s.id} style={{ padding:"11px 0", borderBottom:i<pSess.length-1?`1px solid ${C.sand}`:"none" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:12, fontWeight:700, color:C.terra }}>Sesion {pSess.length-i}</span>
                    <span style={{ fontSize:11, color:C.grayL }}>{s.date}</span>
                  </div>
                  {s.objective && <div style={{ fontSize:12, color:C.grayL, marginBottom:3 }}>🎯 {s.objective}</div>}
                  <div style={{ fontSize:13, color:C.charcoal, lineHeight:1.5, margin:"5px 0" }}>{s.note}</div>
                  {s.homework && <div style={{ fontSize:12, color:C.forest }}>🏠 {s.homework}</div>}
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
              <div className="alert alrti">📄 Informe generado con los datos del paciente. Edita antes de imprimir.</div>
              <div className="sc">
                <div className="sch" style={{ background:C.terraF }}>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, fontWeight:700, color:C.charcoal }}>Hadrion — Plataforma Clinica</div>
                    <div style={{ fontSize:12, color:C.grayL }}>Informe Evolutivo — {new Date().toLocaleDateString("es-UY")}</div>
                  </div>
                </div>
                <div className="scb">
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
                    {[["Paciente",patient.name],["Edad",`${patient.age} años`],["Diagnostico",patient.diagnosis],["Sesiones",pSess.length],["Profesional","Adriana Soba"],["Especialidad","Fonoaudiologia"]].map(([l, v]) => (
                      <div key={l} className="hxf"><div className="hxl">{l}</div><div className="hxv">{v}</div></div>
                    ))}
                  </div>
                  {patient.notes && <><div style={{ fontWeight:700, fontSize:13, marginBottom:5 }}>Antecedentes clinicos</div><div style={{ fontSize:13, lineHeight:1.6, background:C.cream, borderRadius:10, padding:10, marginBottom:12 }}>{patient.notes}</div></>}
                  {patient.goals?.length > 0 && <><div style={{ fontWeight:700, fontSize:13, marginBottom:5 }}>Objetivos terapeuticos</div>{patient.goals.map((g, i) => <div key={i} style={{ fontSize:13, padding:"4px 0", borderBottom:`1px solid ${C.sand}` }}>• {g}</div>)}</>}
                  {pSess.length > 0 && <><div style={{ fontWeight:700, fontSize:13, margin:"12px 0 6px" }}>Evolucion terapeutica</div>{pSess.slice(0,3).map((s, i) => (
                    <div key={s.id} style={{ marginBottom:10, padding:10, background:C.cream, borderRadius:10 }}>
                      <div style={{ fontWeight:600, fontSize:12, color:C.terra }}>Sesion {pSess.length-i} — {s.date}</div>
                      <div style={{ fontSize:13, marginTop:3, lineHeight:1.5 }}>{s.note}</div>
                    </div>
                  ))}</>}
                  <div className="sep" />
                  <div style={{ fontSize:12, color:C.grayL }}>Firma: _________________ — Hadrion Plataforma Clinica</div>
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

// ─── ACTIVITIES ───────────────────────────────────────────────────────────────
function Activities({ user }) {
  const [fil, setFil]         = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  const [sel, setSel]         = useState(null);
  const [nivel, setNivel]     = useState("facil");
  const [showAll, setShowAll] = useState(false);
  const tC      = { Clinica:{ bg:C.sageF, c:C.forest }, Familia:{ bg:C.terraF, c:C.terra } };
  const nivelC  = { facil:{ bg:"#E8F8EF", c:"#27AE60" }, medio:{ bg:C.goldF, c:C.gold }, dificil:{ bg:C.dangerF, c:C.danger } };

  // Detectar especialidad del usuario
  const userSpecialty = user?.specialty || "";
  const specKey = Object.keys(SPECIALTY_MAP).find(k => 
    userSpecialty.toLowerCase().includes(k.toLowerCase().split("/")[0].toLowerCase())
  ) || "Fonoaudiología";

  // Ordenar: primero las de la especialidad del usuario, luego el resto
  const sortedActivities = [
    ...ALL_ACTIVITIES.filter(a => a.specialty?.includes(specKey)),
    ...(showAll ? ALL_ACTIVITIES.filter(a => !a.specialty?.includes(specKey)) : [])
  ];

  const filtered = sortedActivities.filter(a => {
    const matchFil   = fil === "all" || a.type === fil || a.target === fil || a.category === fil;
    const matchAge   = ageGroup === "all" || a.ageGroup?.includes(ageGroup);
    return matchFil && matchAge;
  });

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Banco de Actividades</div><div className="ps">Actividades con 3 niveles de dificultad y grupo etario</div></div>
      {/* Banner de especialidad */}
      <div style={{background:"linear-gradient(135deg,#9B7EBD,#7B5EA7)",borderRadius:14,padding:"10px 14px",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.8)"}}>Actividades para</div>
          <div style={{fontWeight:700,fontSize:14,color:"white"}}>{specKey}</div>
        </div>
        <button onClick={()=>setShowAll(s=>!s)}
          style={{background:"rgba(255,255,255,.2)",border:"none",borderRadius:20,padding:"5px 12px",fontSize:11,color:"white",cursor:"pointer",fontFamily:"sans-serif",fontWeight:600}}>
          {showAll ? "Solo mi área" : "Ver todas las especialidades"}
        </button>
      </div>
      <div className="filrow">
        {["all","Clinica","Familia",
          ...new Set(sortedActivities.map(a=>a.category).filter(Boolean))
        ].slice(0,12).map(f => (
          <button key={f} className={`filbtn${fil===f?" active":""}`} onClick={() => setFil(f)}>{f==="all"?"Todas":f}</button>
        ))}
      </div>
      <div style={{ display:"flex", gap:7, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
        <span style={{ fontSize:11, color:C.grayL, alignSelf:"center", fontWeight:600 }}>Edad:</span>
        {["all","Preescolar","Escolar","Todos"].map(g => (
          <button key={g} className={`filbtn${ageGroup===g?" active":""}`} style={{ fontSize:11 }} onClick={() => setAgeGroup(g)}>{g==="all"?"Todas":g}</button>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:10 }}>
        {filtered.map(a => (
          <div key={a.id} className="card" style={{ cursor:"pointer", padding:12 }} onClick={() => { setSel(a); setNivel("facil"); }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span className="badge" style={{ background:tC[a.type]?.bg, color:tC[a.type]?.c, fontSize:10 }}>{a.type}</span>
              {a.printable && <span style={{ fontSize:10, color:C.info }}>🖨️</span>}
            </div>
            <div style={{ fontWeight:700, fontSize:12, color:C.charcoal, marginBottom:3 }}>{a.name}</div>
            <div style={{ fontSize:10, color:C.grayL, marginBottom:4 }}>{a.category} — {a.target} — {a.age} años</div>
            <div style={{ display:"flex", gap:3 }}>
              {["facil","medio","dificil"].map(n => (
                <span key={n} style={{ fontSize:9, padding:"1px 6px", borderRadius:10, background:nivelC[n].bg, color:nivelC[n].c, fontWeight:600 }}>{n}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {sel && (
        <Modal title={sel.name} onClose={() => setSel(null)}>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
            <span className="badge" style={{ background:tC[sel.type]?.bg, color:tC[sel.type]?.c }}>{sel.type}</span>
            <span className="badge" style={{ background:C.terraF, color:C.terra }}>{sel.target}</span>
            <span className="badge" style={{ background:C.sand, color:C.gray }}>{sel.age} años</span>
            <span className="badge" style={{ background:C.infoF, color:C.info }}>{sel.ageGroup}</span>
          </div>
          <div className="hxf"><div className="hxl">📝 Descripcion</div><div className="hxv">{sel.description}</div></div>
          <div className="hxf"><div className="hxl">🧰 Materiales</div><div className="hxv">{sel.materials}</div></div>
          {sel.niveles && (
            <>
              <div style={{ fontWeight:700, fontSize:13, color:C.charcoal, margin:"14px 0 8px" }}>Niveles de dificultad</div>
              <div style={{ display:"flex", gap:6, marginBottom:12 }}>
                {["facil","medio","dificil"].map(n => (
                  <button key={n} className="btn btnsm" style={{ flex:1, justifyContent:"center", background:nivel===n?nivelC[n].bg:"white", color:nivel===n?nivelC[n].c:C.grayL, border:`1.5px solid ${nivel===n?nivelC[n].c:C.sand}`, fontWeight:nivel===n?700:500 }} onClick={() => setNivel(n)}>
                    {n==="facil"?"🟢 Facil":n==="medio"?"🟡 Medio":"🔴 Dificil"}
                  </button>
                ))}
              </div>
              {sel.niveles[nivel] && (
                <div style={{ background:nivelC[nivel].bg, borderRadius:12, padding:14, border:`1.5px solid ${nivelC[nivel].c}22` }}>
                  <div style={{ fontWeight:700, fontSize:13, color:nivelC[nivel].c, marginBottom:8 }}>{sel.niveles[nivel].titulo}</div>
                  <div style={{ fontWeight:600, fontSize:11, color:C.grayL, marginBottom:4, textTransform:"uppercase" }}>Instrucciones</div>
                  <div style={{ fontSize:13, color:C.charcoal, lineHeight:1.6, marginBottom:10 }}>{sel.niveles[nivel].instrucciones}</div>
                  <div style={{ fontWeight:600, fontSize:11, color:C.grayL, marginBottom:4, textTransform:"uppercase" }}>Ejemplos</div>
                  {sel.niveles[nivel].ejemplos.map((e, i) => (
                    <div key={i} style={{ fontSize:12, color:C.charcoal, padding:"4px 0", borderBottom:`1px solid ${nivelC[nivel].c}22` }}>• {e}</div>
                  ))}
                  <div style={{ marginTop:8, fontSize:11, color:nivelC[nivel].c, fontWeight:600 }}>🎯 Apoyo: {sel.niveles[nivel].apoyo}</div>
                </div>
              )}
            </>
          )}
          {sel.printable && <button className="btn btno btnfull noprint" style={{ marginTop:12 }} onClick={() => window.print()}>🖨️ Imprimir actividad</button>}
        </Modal>
      )}
    </div>
  );
}

// ─── PHONOLOGY ────────────────────────────────────────────────────────────────
function JuegosInteractivos({phonemes,phonemeEmoji,phonemeWords,C}){
  const [activo,setActivo]=React.useState(null);
  const [ronda,setRonda]=React.useState([]);
  const [score,setScore]=React.useState(0);
  const [fb,setFb]=React.useState(null);
  const [idx,setIdx]=React.useState(0);
  const speak=txt=>{if(!window.speechSynthesis)return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(txt.toLowerCase());u.lang="es";u.rate=0.8;window.speechSynthesis.speak(u);};
  const sh=arr=>[...arr].sort(()=>Math.random()-0.5);
  const responder=(ph,correcto)=>{
    if(fb)return;
    setFb(correcto?"ok":"mal");
    if(correcto)setScore(s=>s+1);
    setTimeout(()=>{setFb(null);if(idx+1<ronda.length){setIdx(i=>i+1);if(activo==="atrapa")setTimeout(()=>speak(ronda[idx+1]),300);}else setActivo("fin");},900);
  };
  if(activo==="atrapa"&&idx<ronda.length){
    const ops=sh([ronda[idx],...sh(phonemes.filter(p=>p!==ronda[idx])).slice(0,2)]);
    return(<div style={{background:"white",borderRadius:16,padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,alignItems:"center"}}>
        <b style={{fontSize:14}}>🎯 Atrapa el sonido</b>
        <span style={{background:"#F5F0FA",color:"#9B7EBD",padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:700}}>⭐{score} {idx+1}/{ronda.length}</span>
      </div>
      <div style={{background:"#F5F0FA",borderRadius:14,padding:16,textAlign:"center",marginBottom:12}}>
        <div style={{fontSize:12,color:"#9B9590",marginBottom:8}}>Escucha y toca la letra correcta</div>
        <button style={{background:"#9B7EBD",color:"white",border:"none",borderRadius:12,padding:"12px 28px",fontSize:15,fontWeight:700,cursor:"pointer"}} onClick={()=>speak(ronda[idx])}>🔊 Escuchar: {ronda[idx]}</button>
      </div>
      {fb&&<div style={{textAlign:"center",padding:10,borderRadius:12,marginBottom:10,background:fb==="ok"?"#E8F8EF":"#FDECEA",color:fb==="ok"?"#27AE60":"#C0392B",fontWeight:700,fontSize:16}}>{fb==="ok"?"✅ Correcto!":"❌ Incorrecto!"}</div>}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {ops.map((ph,i)=><button key={i} onClick={()=>responder(ph,ph===ronda[idx])} style={{padding:"18px 8px",borderRadius:14,border:"2px solid #EDE0F5",background:"white",fontFamily:"Georgia,serif",fontSize:28,fontWeight:700,cursor:"pointer"}}>{ph}</button>)}
      </div>
      <button style={{marginTop:12,width:"100%",padding:10,borderRadius:10,border:"none",background:"#EDE0F5",cursor:"pointer",fontWeight:600}} onClick={()=>setActivo(null)}>Salir</button>
    </div>);
  }
  if(activo==="donde"&&idx<ronda.length){
    const cp=ronda[idx];
    const wps=sh(phonemes.filter(p=>p!==cp&&phonemeEmoji[p]&&phonemeWords[p])).slice(0,3);
    const opts=sh([{ph:cp,e:(phonemeEmoji[cp]||[])[0]||"📝",w:(phonemeWords[cp]||[])[0]||cp},...wps.map(p=>({ph:p,e:(phonemeEmoji[p]||[])[0]||"📝",w:(phonemeWords[p]||[])[0]||p}))]);
    return(<div style={{background:"white",borderRadius:16,padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12,alignItems:"center"}}>
        <b style={{fontSize:14}}>❓ Donde esta?</b>
        <span style={{background:"#FDE8F0",color:"#E8719C",padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:700}}>⭐{score} {idx+1}/{ronda.length}</span>
      </div>
      {fb&&<div style={{textAlign:"center",padding:10,borderRadius:12,marginBottom:10,background:fb==="ok"?"#E8F8EF":"#FDECEA",color:fb==="ok"?"#27AE60":"#C0392B",fontWeight:700,fontSize:16}}>{fb==="ok"?"✅ Correcto!":"❌ Incorrecto!"}</div>}
      <div style={{background:"#FDE8F0",borderRadius:14,padding:14,textAlign:"center",marginBottom:12}}>
        <div style={{fontSize:12,color:"#9B9590",marginBottom:4}}>Toca la imagen que empieza con</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:64,fontWeight:700,color:"#E8719C",lineHeight:1}}>{cp}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {opts.map((o,i)=><button key={i} onClick={()=>responder(o.ph,o.ph===cp)} style={{padding:"14px 8px",borderRadius:12,border:"2px solid #F9C8DC",background:"white",cursor:"pointer",textAlign:"center"}}>
          <div style={{fontSize:40}}>{o.e}</div>
          <div style={{fontSize:11,fontWeight:700,marginTop:4}}>{o.w}</div>
        </button>)}
      </div>
      <button style={{marginTop:12,width:"100%",padding:10,borderRadius:10,border:"none",background:"#EDE0F5",cursor:"pointer",fontWeight:600}} onClick={()=>setActivo(null)}>Salir</button>
    </div>);
  }
  if(activo==="fin"){
    return(<div style={{background:"white",borderRadius:16,padding:24,textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:12}}>🎉</div>
      <div style={{fontFamily:"Georgia,serif",fontSize:22,fontWeight:700,marginBottom:8}}>Juego terminado!</div>
      <div style={{fontSize:16,color:"#9B9590",marginBottom:16}}>Puntaje: <b style={{color:"#9B7EBD"}}>{score}</b> / {ronda.length}</div>
      <div style={{background:"#F5F0FA",borderRadius:12,padding:12,marginBottom:16}}>{score===ronda.length?"🌟 Perfecto!":score>=ronda.length/2?"👏 Muy bien!":"💪 Segui practicando!"}</div>
      <button style={{background:"#9B7EBD",color:"white",border:"none",borderRadius:12,padding:"12px 24px",fontSize:14,fontWeight:700,cursor:"pointer"}} onClick={()=>setActivo(null)}>Jugar de nuevo</button>
    </div>);
  }
  return(<div>
    {[
      {id:"atrapa",icon:"🎯",name:"Atrapa el sonido",desc:"Escucha el fonema y toca la letra correcta entre 3 opciones",color:"#9B7EBD",
       action:()=>{const ph=sh(phonemes).slice(0,8);setRonda(ph);setIdx(0);setScore(0);setFb(null);setActivo("atrapa");setTimeout(()=>speak(ph[0]),500);}},
      {id:"donde",icon:"❓",name:"Donde esta?",desc:"Ve el fonema y toca la imagen que empieza con ese sonido",color:"#E8719C",
       action:()=>{const ph=sh(phonemes.filter(p=>phonemeEmoji[p]&&phonemeWords[p])).slice(0,6);setRonda(ph);setIdx(0);setScore(0);setFb(null);setActivo("donde");}},
    ].map(j=>(
      <div key={j.id} style={{display:"flex",alignItems:"center",gap:12,padding:14,background:"white",borderRadius:14,marginBottom:10,cursor:"pointer",border:`2px solid ${j.color}33`,boxShadow:"0 2px 8px rgba(0,0,0,.06)"}} onClick={j.action}>
        <div style={{width:52,height:52,borderRadius:14,background:j.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{j.icon}</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:14,color:"#2C2C2C"}}>{j.name}</div>
          <div style={{fontSize:12,color:"#9B9590",marginTop:3}}>{j.desc}</div>
        </div>
        <div style={{background:j.color,color:"white",padding:"8px 16px",borderRadius:10,fontSize:13,fontWeight:700,flexShrink:0}}>Jugar</div>
      </div>
    ))}
  </div>);
}

function Phonology() {
  const [sel, setSel]         = useState(null);
  const [stage, setStage]     = useState("Escucha");
  const [score, setScore]     = useState(0);
  const [fil, setFil]         = useState("Todas");
  const [wordIdx, setWordIdx] = useState(0);
  const [showWords, setShowWords] = useState(false);

  const stages = ["Escucha","Imagen","Letra","Silaba","Segmentacion","Fusion","Manipulacion"];
  const cats   = { Vocales:["A","E","I","O","U"], Consonantes:PHONEMES.filter(p => !["A","E","I","O","U"].includes(p)), Todas:PHONEMES };

  const speak = (ph) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(ph.toLowerCase());
    u.lang = "es"; u.rate = 0.7;
    window.speechSynthesis.speak(u);
  };
  const speakWord = (w) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(w.toLowerCase());
    u.lang = "es"; u.rate = 0.8;
    window.speechSynthesis.speak(u);
  };

  const handle = (ph) => { setSel(ph); speak(ph); setScore(s => s+1); setWordIdx(0); setShowWords(false); };
  const words     = sel ? (PHONEME_WORDS[sel] || []) : [];
  const emojis    = sel ? (PHONEME_EMOJI[sel]  || []) : [];

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Conciencia Fonologica</div><div className="ps">7 etapas — emojis reales — audio integrado</div></div>

      <SC title="Etapa del ejercicio">
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {stages.map(s => <button key={s} className={`filbtn${stage===s?" active":""}`} onClick={() => setStage(s)}>{s}</button>)}
        </div>
      </SC>

      <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap", alignItems:"center" }}>
        {Object.keys(cats).map(c => <button key={c} className={`filbtn${fil===c?" active":""}`} onClick={() => setFil(c)}>{c}</button>)}
        <div style={{ marginLeft:"auto", background:C.terraF, borderRadius:10, padding:"6px 12px", fontSize:13, fontWeight:700, color:C.terra }}>⭐ {score}</div>
      </div>

      {!sel && (
        <div style={{background:"#F5F0FA",borderRadius:14,padding:"14px 16px",marginBottom:12,textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:6}}>👆</div>
          <div style={{fontWeight:700,fontSize:13,color:"#7B5EA7",marginBottom:4}}>Seleccioná un fonema de la grilla</div>
          <div style={{fontSize:12,color:"#9B9590"}}>Tocá cualquier letra o vocal para comenzar el ejercicio de <strong>{stage}</strong></div>
        </div>
      )}

      {sel && (
        <div style={{ background:C.terraF, borderRadius:16, padding:16, marginBottom:12, border:`2px solid ${C.terraL}` }}>
          <div style={{ textAlign:"center", marginBottom:12 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:72, fontWeight:700, color:C.terra, lineHeight:1 }}>{sel}</div>
            <div style={{ fontSize:12, color:C.terraD, marginTop:4 }}>Etapa: {stage}</div>
            <button className="btn btnp btnsm" style={{ marginTop:8 }} onClick={() => speak(sel)}>🔊 Escuchar fonema</button>
          </div>

          {/* Emojis por fonema */}
          {(stage === "Imagen" || stage === "Escucha") && emojis.length > 0 && (
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:C.terraD, marginBottom:8, textTransform:"uppercase", letterSpacing:.5 }}>
                Palabras que empiezan con {sel}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
                {emojis.map((emoji, i) => (
                  <div key={i} style={{ textAlign:"center", cursor:"pointer", background:"white", borderRadius:12, border:`2px solid ${C.terraL}`, width:80, padding:"8px 4px" }}
                    onClick={() => speakWord(words[i] || sel)}>
                    <div style={{ fontSize:36, lineHeight:1.2 }}>{emoji}</div>
                    <div style={{ fontSize:10, fontWeight:800, color:C.terra, marginTop:4, textTransform:"uppercase" }}>{words[i] || ""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {stage === "Letra" && (
            <div style={{background:"white",borderRadius:12,padding:12,marginBottom:10}}>
              <div style={{fontWeight:700,fontSize:13,color:C.terraD,marginBottom:8}}>🔤 Toca la letra correcta</div>
              <div style={{textAlign:"center",marginBottom:12}}>
                <button style={{background:C.terra,color:"white",border:"none",borderRadius:12,padding:"12px 28px",fontSize:14,fontWeight:700,cursor:"pointer"}} onClick={()=>speak(sel)}>🔊 Escuchar sonido</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
                {[sel,...PHONEMES.filter(p=>p!==sel).sort(()=>Math.random()-0.5).slice(0,2)].sort(()=>Math.random()-0.5).map((ph,i)=>(
                  <button key={i} onClick={(e)=>{e.currentTarget.style.background=ph===sel?"#E8F8EF":"#FDECEA";e.currentTarget.style.border=ph===sel?"2px solid #27AE60":"2px solid #C0392B";if(ph===sel)setScore(s=>s+1);}}
                    style={{padding:"16px",borderRadius:14,border:`2px solid ${C.sand}`,background:"white",fontFamily:"Georgia,serif",fontSize:28,fontWeight:700,cursor:"pointer",color:C.charcoal}}>{ph}</button>
                ))}
              </div>
            </div>
          )}

          {stage === "Silaba" && (
            <div style={{background:"white",borderRadius:12,padding:12,marginBottom:10}}>
              <div style={{fontWeight:700,fontSize:13,color:C.terraD,marginBottom:8}}>✂️ Da una palmada por cada silaba</div>
              {words.slice(0,4).map((w,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:10,background:C.terraF,borderRadius:12,marginBottom:8,cursor:"pointer"}} onClick={()=>speakWord(w)}>
                  <div style={{fontSize:28}}>{emojis[i]||"📝"}</div>
                  <div style={{flex:1}}><div style={{fontWeight:700,fontSize:18,color:C.charcoal,letterSpacing:4}}>{w}</div><div style={{fontSize:11,color:C.terra}}>👏 toca para escuchar</div></div>
                </div>
              ))}
            </div>
          )}

          {stage === "Segmentacion" && (
            <div style={{background:"white",borderRadius:12,padding:12,marginBottom:10}}>
              <div style={{fontWeight:700,fontSize:13,color:C.terraD,marginBottom:8}}>🔍 Di cada sonido por separado</div>
              {words.slice(0,3).map((w,i)=>(
                <div key={i} style={{marginBottom:10,background:C.terraF,borderRadius:12,padding:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <div style={{fontSize:28}}>{emojis[i]||"📝"}</div>
                    <div style={{fontFamily:"Georgia,serif",fontSize:20,fontWeight:700,color:C.charcoal,flex:1}}>{w}</div>
                    <button style={{background:"#4285F4",color:"white",border:"none",borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer"}} onClick={()=>speakWord(w)}>🔊</button>
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {w.split("").map((letra,j)=>(
                      <div key={j} style={{width:36,height:36,borderRadius:8,border:`2px solid ${C.terraL}`,background:"white",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Georgia,serif",fontSize:18,fontWeight:700,color:C.terra}}>{letra.toUpperCase()}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {stage === "Fusion" && (
            <div style={{background:"white",borderRadius:12,padding:12,marginBottom:10}}>
              <div style={{fontWeight:700,fontSize:13,color:C.terraD,marginBottom:8}}>🔗 Toca cada letra y adivina la palabra</div>
              {words.slice(0,3).map((w,i)=>(
                <div key={i} style={{marginBottom:10,background:C.terraF,borderRadius:12,padding:12}}>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {w.split("").map((letra,j)=>(
                      <button key={j} style={{minWidth:36,height:36,borderRadius:8,border:`2px solid ${C.terraL}`,background:"white",fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,color:C.terra,cursor:"pointer"}} onClick={()=>speak(letra)}>{letra.toUpperCase()}</button>
                    ))}
                    <button style={{height:36,borderRadius:8,border:"none",background:C.terra,color:"white",padding:"0 14px",fontSize:12,fontWeight:700,cursor:"pointer"}} onClick={()=>speakWord(w)}>🔊 Completa</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {stage === "Manipulacion" && (
            <div style={{background:"white",borderRadius:12,padding:12,marginBottom:10}}>
              <div style={{fontWeight:700,fontSize:13,color:C.terraD,marginBottom:8}}>🔀 Cambia el fonema inicial</div>
              {[["PATO","GATO","G"],["PISO","BISO","B"],["CAMA","TAMA","T"],["LUNA","TUNA","T"]].map(([w1,w2,cambio],i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,background:C.terraF,borderRadius:12,padding:"10px 14px"}}>
                  <button style={{background:"white",border:`2px solid ${C.terraL}`,borderRadius:10,padding:"8px 12px",fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,color:C.terra,cursor:"pointer"}} onClick={()=>speakWord(w1)}>{w1}</button>
                  <div style={{color:C.grayL,fontSize:16}}>→</div>
                  <button style={{background:C.terra,border:"none",borderRadius:10,padding:"8px 12px",fontFamily:"Georgia,serif",fontSize:16,fontWeight:700,color:"white",cursor:"pointer"}} onClick={()=>speakWord(w2)}>{w2}</button>
                  <div style={{fontSize:11,color:C.grayL}}>Cambia por {cambio}</div>
                </div>
              ))}
            </div>
          )}


          {/* Palabra del dia */}
          <div style={{ marginTop:12 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.terraD, textTransform:"uppercase", letterSpacing:.5 }}>Palabras con {sel}</div>
              <button className="btn btnsm" style={{ background:C.terra, color:"white", fontSize:10 }} onClick={() => setShowWords(s => !s)}>
                {showWords ? "Ocultar" : "Ver todas"}
              </button>
            </div>
            {words.length > 0 && (
              <div style={{ display:"flex", alignItems:"center", gap:12, background:"white", borderRadius:12, padding:"10px 14px", marginBottom:8 }}>
                <div style={{ width:50, height:50, borderRadius:12, background:C.terraF, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700, color:C.terra, flexShrink:0 }}>{sel}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, color:C.charcoal }}>{words[wordIdx % words.length]}</div>
                  <div style={{ fontSize:11, color:C.grayL }}>{wordIdx+1} de {words.length}</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <button className="btn btnsm" style={{ background:"#4285F4", color:"white", fontSize:12 }} onClick={() => speakWord(words[wordIdx % words.length])}>🔊</button>
                  <button className="btn btnsm" style={{ background:C.sand, fontSize:12 }} onClick={() => setWordIdx(i => (i+1) % words.length)}>→</button>
                </div>
              </div>
            )}
            {showWords && (
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {words.map((w, i) => (
                  <button key={i} className="chip" style={{ fontSize:11 }} onClick={() => { setWordIdx(i); speakWord(w); }}>
                    {emojis[i] || "📝"} {w}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grilla de fonemas */}
      <div className="phgrid">
        {(cats[fil] || PHONEMES).map(ph => (
          <button key={ph} className={`phbtn${sel===ph?" sel":""}`} onClick={() => handle(ph)}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:700, lineHeight:1 }}>{ph}</div>
            {PHONEME_EMOJI[ph] && <div style={{ fontSize:28, lineHeight:1 }}>{PHONEME_EMOJI[ph][0]}</div>}
          </button>
        ))}
      </div>

      <SC title="🎮 Juegos Fonologicos">
        <JuegosInteractivos phonemes={PHONEMES} phonemeEmoji={PHONEME_EMOJI} phonemeWords={PHONEME_WORDS} C={C}/>
      </SC>
    </div>
  );
}

// ─── REPORTS ──────────────────────────────────────────────────────────────────
function Reports({ patients, sessions, payments }) {
  const [pid, setPid] = useState("");
  const patient = patients.find(p => String(p.id) === String(pid));
  const pSess   = sessions.filter(s => String(s.patientId) === String(pid));
  const totalC  = payments.filter(p => p.status === "pagado").reduce((a, b) => a + b.amount, 0);
  const pendiente = payments.filter(p => p.status === "pendiente").reduce((a,b)=>a+b.amount,0);
  const mesActual = new Date().toLocaleDateString("es-UY",{month:"long",year:"numeric"});

  // Últimas 5 sesiones
  const ultimasSesiones = [...sessions].sort((a,b)=>b.id-a.id).slice(0,5);

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Reportes</div><div className="ps">Estadisticas e informes — {mesActual}</div></div>
      <div className="sgrid">
        <div className="sc2"><div className="snum">{patients.length}</div><div className="slbl">Pacientes</div></div>
        <div className="sc2"><div className="snum">{sessions.length}</div><div className="slbl">Sesiones</div></div>
        <div className="sc2"><div className="snum">${(totalC/1000).toFixed(0)}k</div><div className="slbl">Cobrado</div></div>
        <div className="sc2"><div className="snum">${(pendiente/1000).toFixed(0)}k</div><div className="slbl">Pendiente</div></div>
      </div>

      <SC title="⚙️ Generar informe por paciente">
        <div className="fg"><label className="lbl">Paciente</label>
          <select className="inp" value={pid} onChange={e => setPid(e.target.value)}>
            <option value="">Selecciona...</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        {patient && (
          <>
            <div style={{background:C.terraF,borderRadius:12,padding:12,marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <div className="av" style={{width:38,height:38,background:patient.color,fontSize:13,borderRadius:11}}>{patient.avatar}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:13}}>{patient.name}</div>
                  <div style={{fontSize:11,color:C.grayL}}>{patient.age} años — {patient.diagnosis} — {pSess.length} sesiones</div>
                </div>
              </div>
              {pSess.length > 0 && (
                <div style={{fontSize:12,color:C.charcoal,background:"white",borderRadius:8,padding:"8px 10px"}}>
                  <div style={{fontWeight:600,marginBottom:3}}>Última sesión: {pSess[0]?.date}</div>
                  <div style={{color:C.grayL,lineHeight:1.5}}>{pSess[0]?.note?.slice(0,120)}...</div>
                </div>
              )}
            </div>
            <div className="alert alrts">✅ {pSess.length} sesiones registradas — listo para generar</div>
            <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
              <button className="btn btnp btnsm" onClick={() => window.print()}>🖨️ Evolutivo</button>
              <button className="btn btno btnsm" onClick={() => {
                const w = window.open("","_blank");
                const txt = `INFORME DE DERIVACIÓN
─────────────────────
Paciente: ${patient.name} | Edad: ${patient.age} años
Diagnóstico: ${patient.diagnosis}
Sesiones realizadas: ${pSess.length}

A quien corresponda:

Por medio de la presente, comunico que el/la paciente ${patient.name} se encuentra en tratamiento terapéutico desde la fecha de inicio, habiendo realizado ${pSess.length} sesiones.

${pSess.length>0?`Última evolución (${pSess[0]?.date}): ${pSess[0]?.note}`:""}

Objetivos en trabajo: ${(patient.goals||[]).join(", ")||"Ver historia clínica"}

Se solicita coordinación con el equipo tratante para continuidad del proceso terapéutico.

Profesional: ___________________
comunipro12@gmail.com`;
                w.document.write(`<pre style="font-family:Georgia;font-size:14px;line-height:1.8;max-width:700px;margin:40px auto;white-space:pre-wrap;">${txt}</pre>`);
                w.document.close(); w.print();
              }}>📄 Derivación</button>
              <button className="btn btng btnsm" onClick={() => {
                const w = window.open("","_blank");
                const txt = `Estimada familia de ${patient.name}:

Les escribo para informarles sobre el progreso terapéutico de ${patient.name.split(" ")[0]}.

Durante las ${pSess.length} sesiones realizadas, hemos trabajado en:
${(patient.goals||[]).map(g=>`• ${g}`).join("")||"• Ver historia clínica"}

${pSess.length>0?`En la última sesión (${pSess[0]?.date}): ${pSess[0]?.note}`:""}

Recomendaciones para el hogar:
• Mantener la rutina y los horarios establecidos
• Practicar las actividades indicadas en sesión
• Ante cualquier duda, no duden en contactarme

Quedo a disposición para cualquier consulta.

Un saludo,
comunipro12@gmail.com`;
                w.document.write(`<pre style="font-family:Georgia;font-size:14px;line-height:1.8;max-width:700px;margin:40px auto;white-space:pre-wrap;">${txt}</pre>`);
                w.document.close(); w.print();
              }}>👨‍👩‍👧 Para familias</button>
            </div>
          </>
        )}
        {!patient && <div style={{fontSize:12,color:C.grayL}}>Seleccioná un paciente para generar su informe.</div>}
      </SC>

      <SC title="📝 Últimas sesiones">
        {ultimasSesiones.length === 0
          ? <div style={{fontSize:12,color:C.grayL}}>Sin sesiones registradas.</div>
          : ultimasSesiones.map(s => (
            <div key={s.id} style={{padding:"9px 0",borderBottom:`1px solid ${C.sand}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:13,color:C.charcoal}}>{s.patient}</span>
                <span style={{fontSize:11,color:C.grayL}}>{s.date}</span>
              </div>
              {s.objective && <span className="badge" style={{background:C.terraF,color:C.terra,fontSize:10,marginBottom:3,display:"inline-block"}}>{s.objective}</span>}
              <div style={{fontSize:12,color:C.grayL,lineHeight:1.4}}>{s.note?.slice(0,100)}{s.note?.length>100?"...":""}</div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginTop:5}}>
                <div className="prog" style={{flex:1,height:5}}><div className="progf" style={{width:`${s.progress}%`}}/></div>
                <span style={{fontSize:10,fontWeight:700,color:C.terra}}>{s.progress}%</span>
              </div>
            </div>
          ))
        }
      </SC>

      <SC title="📊 Diagnosticos">
        {patients.length === 0
          ? <div style={{fontSize:12,color:C.grayL}}>Sin pacientes.</div>
          : Object.entries(patients.reduce((a, p) => { a[p.diagnosis]=(a[p.diagnosis]||0)+1; return a; }, {})).map(([d, n]) => (
          <div key={d} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.sand}` }}>
            <div style={{ flex:1, fontWeight:500, fontSize:13 }}>{d}</div>
            <div className="prog" style={{ width:90 }}><div className="progf" style={{ width:`${(n/patients.length)*100}%` }} /></div>
            <div style={{ fontSize:13, fontWeight:700, color:C.terra, minWidth:20 }}>{n}</div>
          </div>
        ))}
      </SC>

      <SC title="💳 Pagos recientes">
        {payments.length === 0
          ? <div style={{fontSize:12,color:C.grayL}}>Sin pagos registrados.</div>
          : payments.slice(0,5).map(p => (
          <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.sand}`}}>
            <div>
              <div style={{fontWeight:600,fontSize:13}}>{p.patient}</div>
              <div style={{fontSize:11,color:C.grayL}}>{p.date} — {p.method}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontWeight:700,fontSize:14}}>${p.amount.toLocaleString("es-UY")}</div>
              <span className="badge" style={{background:p.status==="pagado"?C.greenF:C.goldF,color:p.status==="pagado"?C.forest:C.gold,fontSize:10}}>{p.status}</span>
            </div>
          </div>
        ))}
      </SC>
    </div>
  );
}

// ─── RESOURCES ────────────────────────────────────────────────────────────────
function Resources({ plantillas=[], setPlantillas=()=>{}, documentos=[], setDocumentos=()=>{} }) {
  const [tab, setTab] = useState("plantillas");
  const [selPlantilla, setSelPlantilla] = useState(null);
  const [completando, setCompletando] = useState(null);
  const [editando, setEditando] = useState(null);
  const [nombreNueva, setNombreNueva] = useState("");
  // Panel IA
  const [iaQuery, setIaQuery] = useState("");
  const [iaResult, setIaResult] = useState("");
  const [iaLoading, setIaLoading] = useState(false);

  const askIA = async () => {
    if (!iaQuery.trim()) return;
    setIaLoading(true);
    setIaResult("");
    try {
      const response = await fetch("https://hadrion-ai.comunipro12.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "Sos una asistente IA especializada en terapias de salud y educación (fonoaudiología, psicología, psicopedagogía, etc.). Ayudás a generar documentación clínica profesional en español rioplatense (Uruguay). Respondé de forma directa y útil.",
          messages: [{ role: "user", content: iaQuery }]
        })
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Error ${response.status}`);
      }
      const data = await response.json();
      const content = data.content || (data.error ? null : []);
      if (!content) throw new Error(data.error?.message || "Error de la API");
      const text = content.filter(b => b.type === "text").map(b => b.text).join("\n") || "Sin respuesta.";
      setIaResult(text);
    } catch (err) {
      setIaResult("⚠️ Error al conectar con la IA. Intentá de nuevo.");
    } finally {
      setIaLoading(false);
    }
  };

  // Plantillas base del sistema
  const BASE_PLANTILLAS = [
    { id:"anamnesis", icon:"📋", titulo:"Anamnesis clínica", categoria:"Evaluación",
      contenido:`ANAMNESIS CLÍNICA
─────────────────────────────────────
DATOS DEL PACIENTE
Nombre: _______________________________________________
Fecha de nacimiento: ________________  Edad: _____ años
Diagnóstico: __________________________________________
Tutor/Responsable: ____________________________________
Teléfono: _____________________________________________
Email: ________________________________________________

MOTIVO DE CONSULTA
_______________________________________________________
_______________________________________________________

ANTECEDENTES
Embarazo y parto: _____________________________________
Hitos del desarrollo motor: ___________________________
Hitos del habla-lenguaje: _____________________________
Antecedentes médicos/neurológicos: ____________________
Historia familiar: ____________________________________

OBSERVACIONES INICIALES
_______________________________________________________
_______________________________________________________

Profesional: ___________________  Fecha: ______________
comunipro12@gmail.com` },

    { id:"objetivos_tel", icon:"🎯", titulo:"Objetivos para TEL", categoria:"Lenguaje",
      contenido:`OBJETIVOS TERAPÉUTICOS — TEL
─────────────────────────────────────
Paciente: ____________________________________________
Período: _____________________________________________

OBJETIVOS ACTIVOS:
□ Producción de fonemas en posición inicial
□ Discriminación auditiva de pares mínimos
□ Comprensión de instrucciones de 2 pasos
□ Vocabulario receptivo/expresivo (200+ palabras)
□ Frases de 3-4 palabras con estructura SVO
□ Narración de secuencias de 3 eventos

CRITERIO DE LOGRO: 80% en 3 sesiones consecutivas

Profesional: ___________________  Fecha: ______________` },

    { id:"informe_progreso", icon:"📄", titulo:"Informe de progreso", categoria:"Informes",
      contenido:`INFORME DE PROGRESO TERAPÉUTICO
─────────────────────────────────────
Paciente: ____________________________________________
Período evaluado: ____________________________________
Profesional: ________________________________________

RESUMEN DE LA INTERVENCIÓN:
_______________________________________________________

LOGROS ALCANZADOS:
• ____________________________________________________
• ____________________________________________________
• ____________________________________________________

ÁREAS EN TRABAJO:
• ____________________________________________________
• ____________________________________________________

RECOMENDACIONES PARA EL HOGAR:
1. ___________________________________________________
2. ___________________________________________________
3. ___________________________________________________

PRÓXIMOS OBJETIVOS:
_______________________________________________________

Firma: ___________________
comunipro12@gmail.com` },

    { id:"carta_escuela", icon:"📬", titulo:"Carta para la escuela", categoria:"Derivación",
      contenido:`INFORME PARA ESTABLECIMIENTO EDUCATIVO
─────────────────────────────────────
Lugar y fecha: ________________________________________

Sr./Sra. Director/a:

Me dirijo a usted en mi carácter de profesional especialista
en ______________, para informar que el/la alumno/a
_________________________, que concurre a ________ grado,
se encuentra actualmente en tratamiento desde ____________.

AVANCES OBSERVADOS:
• ____________________________________________________
• ____________________________________________________

ADECUACIONES SOLICITADAS:
• Tiempo adicional en evaluaciones escritas
• Ubicación preferencial en el aula
• ____________________________________________________

Quedo a disposición para ampliar información.

Atentamente,
___________________________________
Matrícula profesional: _______________
Teléfono: ___________________________
comunipro12@gmail.com` },

    { id:"sesion_registro", icon:"📝", titulo:"Registro de sesión", categoria:"Clínico",
      contenido:`REGISTRO DE SESIÓN
─────────────────────────────────────
Paciente: ____________________________________________
Fecha: _________________  Sesión N°: ________________
Duración: ____________  Modalidad: Presencial / Virtual

OBJETIVO TRABAJADO:
_______________________________________________________

ESTADO DEL PACIENTE:
Estado general:  □ Regulado  □ Cansado  □ Hiperactivo
Atención:       □ Sostenida  □ Fluctuante  □ Dispersa
Participación:  □ Buena  □ Parcial  □ Rechazo inicial

ACTIVIDADES REALIZADAS:
1. ___________________________________________________
2. ___________________________________________________

LOGROS:
_______________________________________________________

DIFICULTADES:
_______________________________________________________

TAREA PARA CASA:
_______________________________________________________

Progreso: _______%
Firma: ___________________` },

    { id:"entrevista_familia", icon:"👨‍👩‍👧", titulo:"Entrevista familiar inicial", categoria:"Evaluación",
      contenido:`ENTREVISTA FAMILIAR INICIAL
─────────────────────────────────────
Fecha: ________________  Entrevistador: _______________
Familiar presente: ____________________________________

MOTIVO DE CONSULTA:
_______________________________________________________
_______________________________________________________

¿DESDE CUÁNDO NOTA LAS DIFICULTADES?
_______________________________________________________

¿CÓMO AFECTA EN EL DÍA A DÍA?
□ En casa  □ En la escuela  □ Con amigos  □ Otro: _____
_______________________________________________________

TRATAMIENTOS ANTERIORES:
_______________________________________________________

¿QUÉ ESPERA DE ESTE TRATAMIENTO?
_______________________________________________________

DINÁMICA FAMILIAR:
Con quién vive: _______________________________________
Relación entre hermanos: ______________________________

OBSERVACIONES:
_______________________________________________________

Firma familiar: _______________  Firma prof.: ________` },

    { id:"estrategias_tdah", icon:"💡", titulo:"Estrategias para TDAH", categoria:"TDAH",
      contenido:`ESTRATEGIAS PARA TDAH
─────────────────────────────────────
Paciente: ____________________________________________
Para entregar a: □ Familia  □ Docentes  □ Ambos

PARA EL AULA:
✓ Ubicar cerca del docente y la pizarra
✓ Instrucciones cortas: una consigna a la vez
✓ Dividir tareas largas en pasos numerados
✓ Usar señales visuales: carteles, colores
✓ Tiempo extra en evaluaciones
✓ Permitir movimiento regulado

PARA LA FAMILIA:
✓ Rutinas fijas y predecibles
✓ Espacio de estudio sin distractores
✓ Descansos cada 20 minutos de estudio
✓ Reforzar positivamente los logros
✓ Agenda visual con pictogramas

ESTRATEGIAS DE AUTORREGULACIÓN:
✓ Semáforo de emociones
✓ Respiración: inhalar 4 seg / exhalar 6 seg
✓ Tarjeta de estrategias en el estuche

Profesional: ___________________  Fecha: ______________` },

    { id:"plan_casa", icon:"🏠", titulo:"Actividades en casa", categoria:"Familia",
      contenido:`GUÍA DE ESTIMULACIÓN EN CASA
─────────────────────────────────────
Paciente: ____________________________________________
Semana del: __________________________________________

ACTIVIDADES RECOMENDADAS:
(Solo 5-10 minutos por actividad)

DURANTE EL BAÑO:
□ ___________________________________________________

EN LA COCINA:
□ ___________________________________________________

ANTES DE DORMIR (IMPRESCINDIBLE — 10 min):
□ Leer un cuento en voz alta
□ Preguntar: ¿de qué trató el cuento?

REGLAS DE ORO:
✗ No corregir directamente
✓ Repetir la palabra correctamente y agregar más
✓ Celebrar cada intento

Próxima sesión: _______________________________________
Consultas: comunipro12@gmail.com` },
  ];

  // Combinar plantillas base con las personalizadas del usuario
  const todasPlantillas = [
    ...BASE_PLANTILLAS.map(p => ({...p, esBase:true})),
    ...plantillas
  ];

  const categorias = [...new Set(todasPlantillas.map(p=>p.categoria))];

  const guardarModelo = (plantilla, nuevoContenido, nuevoTitulo) => {
    // Si es base, crea una copia personalizada
    // Si ya es personalizada, la actualiza
    if (plantilla.esBase) {
      const nueva = {
        id: makeId(),
        icon: plantilla.icon,
        titulo: nuevoTitulo || `${plantilla.titulo} (mi versión)`,
        categoria: plantilla.categoria,
        contenido: nuevoContenido,
        esPersonalizada: true,
        fechaCreacion: new Date().toLocaleDateString("es-UY"),
        basadaEn: plantilla.id
      };
      setPlantillas(prev => [...prev, nueva]);
      return nueva;
    } else {
      setPlantillas(prev => prev.map(p => p.id===plantilla.id ? {...p, contenido:nuevoContenido, titulo:nuevoTitulo||p.titulo} : p));
      return {...plantilla, contenido:nuevoContenido};
    }
  };

  const eliminarPersonalizada = (id) => {
    setPlantillas(prev => prev.filter(p => p.id !== id));
  };

  // Documentos guardados filtrados (solo informes, no sesiones)
  const informesGuardados = documentos.filter(d => d.tipo === "plantilla");

  return (
    <div className="fu">
      <div style={{marginBottom:14}}>
        <div className="pt">📚 Recursos</div>
        <div className="ps">Plantillas editables y guardadas como tus modelos</div>
      </div>

      <div className="atabrow">
        {[["plantillas","📋 Plantillas"],["mis_modelos","⭐ Mis modelos"],["guardados","💾 Guardados"]].map(([id,l])=>(
          <button key={id} className={`atab${tab===id?" active":""}`} onClick={()=>setTab(id)}>{l}</button>
        ))}
      </div>

      {/* PANEL IA */}
      <div style={{background:"linear-gradient(135deg,#9B7EBD,#7B5EA7)",borderRadius:16,padding:14,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{fontSize:24}}>🧠</div>
          <div>
            <div style={{fontWeight:700,fontSize:14,color:"white"}}>Pedile un recurso a la IA</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>Actividades, guías, estrategias personalizadas para tu paciente</div>
          </div>
        </div>
        <textarea className="inp" style={{minHeight:64,background:"rgba(255,255,255,.15)",border:"1.5px solid rgba(255,255,255,.3)",color:"white",borderRadius:12,marginBottom:8}}
          placeholder="Ej: Actividad de conciencia fonológica para niño de 5 años con TEL leve..."
          value={iaQuery} onChange={e=>setIaQuery(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();askIA();}}}/>
        <button className="btn btnfull" style={{background:"white",color:"#7B5EA7",fontWeight:700}}
          onClick={askIA} disabled={iaLoading}>
          {iaLoading?"⏳ Generando...":"✨ Generar con IA"}
        </button>
        {iaResult && (
          <div style={{marginTop:12}}>
            <textarea value={iaResult} onChange={e=>setIaResult(e.target.value)}
              style={{width:"100%",minHeight:140,background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",
                borderRadius:12,padding:12,fontSize:12,color:"white",lineHeight:1.7,resize:"vertical",
                fontFamily:"sans-serif",outline:"none"}}/>
            <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
              <button className="btn btnsm" style={{background:"rgba(255,255,255,.2)",color:"white"}}
                onClick={()=>navigator.clipboard?.writeText(iaResult)}>📋 Copiar</button>
              <button className="btn btnsm noprint" style={{background:"rgba(255,255,255,.2)",color:"white"}}
                onClick={()=>{const w=window.open("","_blank");w.document.write(`<pre style="font-family:Georgia;font-size:14px;line-height:1.8;max-width:700px;margin:40px auto;white-space:pre-wrap;">${iaResult}</pre>`);w.document.close();w.print();}}>🖨️ Imprimir</button>
              <button className="btn btnsm noprint" style={{background:"#25D366",color:"white"}}
                onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(iaResult)}`,"_blank")}>💬 WhatsApp</button>
              <button className="btn btnsm" style={{background:"rgba(255,255,255,.2)",color:"white"}}
                onClick={()=>{
                  setDocumentos(prev=>[{id:makeId(),tipo:"plantilla",titulo:"Recurso IA - "+new Date().toLocaleDateString("es-UY"),contenido:iaResult,fecha:new Date().toLocaleDateString("es-UY"),paciente:""},...prev].slice(0,200));
                  alert("✅ Guardado en Guardados");
                }}>💾 Guardar</button>
            </div>
          </div>
        )}
      </div>

      {/* PLANTILLAS BASE */}
      {tab==="plantillas" && (
        <div>
          <div className="alert alrti" style={{marginBottom:12}}>
            Tocá cualquier plantilla para abrirla, editarla y guardarla como tu modelo personal.
          </div>
          {categorias.map(cat => {
            const items = todasPlantillas.filter(p=>p.categoria===cat);
            return (
              <div key={cat} style={{marginBottom:16}}>
                <div style={{fontSize:11,fontWeight:700,color:C.grayL,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>{cat}</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:8}}>
                  {items.map(p=>(
                    <div key={p.id} className="card" style={{cursor:"pointer",padding:12,border:p.esPersonalizada?`2px solid ${C.terra}`:"1px solid #EDE0F5",position:"relative"}}
                      onClick={()=>setCompletando({...p, contenidoEditado:p.contenido, tituloEditado:p.titulo})}>
                      {p.esPersonalizada && <div style={{position:"absolute",top:8,right:8,fontSize:9,background:C.terraF,color:C.terra,borderRadius:10,padding:"1px 6px",fontWeight:700}}>MI MODELO</div>}
                      <div style={{fontSize:24,marginBottom:6}}>{p.icon}</div>
                      <div style={{fontWeight:700,fontSize:12,color:C.charcoal,marginBottom:3}}>{p.titulo}</div>
                      <div style={{fontSize:10,color:C.grayL}}>{p.categoria}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MIS MODELOS */}
      {tab==="mis_modelos" && (
        <div>
          {plantillas.length === 0 ? (
            <div style={{background:"#F5F0FA",borderRadius:16,padding:24,textAlign:"center"}}>
              <div style={{fontSize:36,marginBottom:8}}>⭐</div>
              <div style={{fontWeight:700,fontSize:15,color:C.terra,marginBottom:6}}>Todavía no tenés modelos guardados</div>
              <div style={{fontSize:13,color:C.grayL,marginBottom:14,lineHeight:1.7}}>
                Andá a <strong>Plantillas</strong>, abrí una, modificala a tu gusto<br/>y tocá <strong>"Guardar como mi modelo"</strong>.
              </div>
              <button className="btn btnp btnsm" onClick={()=>setTab("plantillas")}>Ver plantillas →</button>
            </div>
          ) : (
            <div>
              <div style={{fontSize:13,color:C.grayL,marginBottom:12}}>{plantillas.length} modelo{plantillas.length!==1?"s":""} guardado{plantillas.length!==1?"s":""}</div>
              {plantillas.map(p=>(
                <div key={p.id} style={{background:"white",borderRadius:14,padding:14,marginBottom:10,border:`1.5px solid ${C.terraL}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <div style={{fontSize:22}}>{p.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:13}}>{p.titulo}</div>
                      <div style={{fontSize:11,color:C.grayL}}>Guardado el {p.fechaCreacion} · {p.categoria}</div>
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      <button className="btn btnp btnsm" onClick={()=>setCompletando({...p,contenidoEditado:p.contenido,tituloEditado:p.titulo})}>Usar</button>
                      <button className="btn btnd btnsm" onClick={()=>{ if(window.confirm("¿Eliminar este modelo?")) eliminarPersonalizada(p.id); }}>🗑️</button>
                    </div>
                  </div>
                  <div style={{fontSize:11,color:C.grayL,background:C.cream,borderRadius:8,padding:"6px 10px",maxHeight:60,overflow:"hidden",whiteSpace:"pre-wrap",fontFamily:"monospace"}}>
                    {p.contenido.slice(0,200)}...
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* DOCUMENTOS GUARDADOS */}
      {tab==="guardados" && (
        <div>
          {informesGuardados.length === 0 ? (
            <div style={{background:"#F5F0FA",borderRadius:16,padding:24,textAlign:"center"}}>
              <div style={{fontSize:36,marginBottom:8}}>💾</div>
              <div style={{fontWeight:700,fontSize:15,color:C.terra,marginBottom:6}}>Sin documentos guardados</div>
              <div style={{fontSize:13,color:C.grayL}}>Cuando completes una plantilla y toques "Guardar documento", aparece acá.</div>
            </div>
          ) : (
            <div>
              {informesGuardados.sort((a,b)=>b.fecha.localeCompare(a.fecha)).map(d=>(
                <div key={d.id} style={{background:"white",borderRadius:14,padding:14,marginBottom:10,border:"1px solid #EDE0F5"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:13}}>{d.titulo}</div>
                      <div style={{fontSize:11,color:C.grayL}}>{d.fecha} {d.paciente?`· ${d.paciente}`:""}</div>
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      <button className="btn btno btnsm" onClick={()=>setCompletando({icon:"💾",titulo:d.titulo,contenido:d.contenido,contenidoEditado:d.contenido,tituloEditado:d.titulo,esGuardado:true,docId:d.id})}>Abrir</button>
                    </div>
                  </div>
                  <div style={{fontSize:11,color:C.grayL,background:C.cream,borderRadius:8,padding:"6px 10px",maxHeight:50,overflow:"hidden",whiteSpace:"pre-wrap",fontFamily:"monospace"}}>
                    {d.contenido.slice(0,150)}...
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL COMPLETAR/EDITAR PLANTILLA */}
      {completando && (
        <Modal title={`${completando.icon} ${completando.tituloEditado}`} onClose={()=>setCompletando(null)}>
          <div style={{marginBottom:10}}>
            <label className="lbl">Título del documento</label>
            <input className="inp" value={completando.tituloEditado}
              onChange={e=>setCompletando({...completando,tituloEditado:e.target.value})}/>
          </div>
          <div style={{background:C.terraF,borderRadius:10,padding:"8px 12px",marginBottom:10,fontSize:12,color:C.terraD}}>
            ✏️ <strong>Editá el texto</strong> — completá los espacios en blanco, agregá o quitá secciones. El documento queda exactamente como lo escribas.
          </div>
          <textarea
            style={{width:"100%",minHeight:320,background:"white",borderRadius:12,padding:14,
              fontSize:12,lineHeight:1.8,fontFamily:"monospace",
              border:`1.5px solid ${C.sand}`,resize:"vertical",outline:"none"}}
            value={completando.contenidoEditado}
            onChange={e=>setCompletando({...completando,contenidoEditado:e.target.value})}
          />
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>
            <button className="btn btnp btnsm"
              onClick={()=>{
                const doc = {
                  id: completando.docId || makeId(),
                  tipo: "plantilla",
                  titulo: completando.tituloEditado,
                  contenido: completando.contenidoEditado,
                  fecha: new Date().toLocaleDateString("es-UY"),
                  paciente: ""
                };
                if (completando.docId) {
                  setDocumentos(prev => prev.map(d => d.id===completando.docId ? doc : d));
                } else {
                  setDocumentos(prev => [doc, ...prev].slice(0,200));
                }
                alert(`✅ Guardado en "Guardados"`);
                setTab("guardados");
                setCompletando(null);
              }}>
              💾 Guardar documento
            </button>
            <button className="btn btnsm" style={{background:"#25D366",color:"white"}}
              onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(completando.contenidoEditado)}`,"_blank")}>
              💬 WhatsApp
            </button>
            <button className="btn btno btnsm noprint" onClick={()=>{
              const w=window.open("","_blank");
              w.document.write(`<!DOCTYPE html><html><body><pre style="font-family:Georgia,serif;font-size:14px;line-height:1.8;max-width:700px;margin:40px auto;white-space:pre-wrap;">${completando.contenidoEditado}</pre></body></html>`);
              w.document.close(); w.print();
            }}>🖨️ Imprimir</button>
            <button className="btn btnsm" style={{background:C.info,color:"white"}}
              onClick={()=>navigator.clipboard?.writeText(completando.contenidoEditado)}>
              📋 Copiar
            </button>
          </div>

          {/* Guardar como mi modelo */}
          {!completando.esGuardado && (
            <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.sand}`}}>
              <div style={{fontSize:12,color:C.grayL,marginBottom:8}}>
                ¿Querés guardar esta versión editada como <strong>tu modelo personal</strong> para reutilizarla siempre?
              </div>
              <button className="btn btno btnsm" onClick={()=>{
                const guardada = guardarModelo(completando, completando.contenidoEditado, completando.tituloEditado);
                alert(`✅ Guardado como "${guardada.titulo}" en Mis modelos`);
                setCompletando(null);
                setTab("mis_modelos");
              }}>
                ⭐ Guardar como mi modelo
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// ─── PLAN COLABORATIVO ────────────────────────────────────────────────────────
function PlanColaborativo({ patients, users, plan, setPlan }) {
  const [pid, setPid]     = useState("");
  const [showNew, setNew] = useState(false);
  const [f, setF]         = useState({ area:"fono", professional:"", objectives:"", progress:50, notes:"" });

  const patient = patients.find(p => String(p.id) === String(pid));
  const pPlan   = plan.filter(p => String(p.patientId) === String(pid));

  const save = () => {
    if (!pid || !f.professional) return;
    const p = patients.find(x => String(x.id) === String(pid));
    setPlan(prev => [...prev, { id:makeId(), patientId:p?.id||pid, ...f, objectives:f.objectives.split(",").map(o=>o.trim()).filter(Boolean), lastUpdate:new Date().toLocaleDateString("es-UY") }]);
    setF({ area:"fono", professional:"", objectives:"", progress:50, notes:"" });
    setNew(false);
  };

  const areaInfo = id => AREAS.find(a => a.id === id) || { label:id, icon:"📋", color:C.gray };

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">Plan Colaborativo</div><div className="ps">Intervencion multidisciplinaria</div></div>
        {pid && <button className="btn btnp btnsm" onClick={() => setNew(true)}>+ Agregar area</button>}
      </div>
      <div className="fg"><label className="lbl">Selecciona paciente</label>
        <select className="inp" value={pid} onChange={e => setPid(e.target.value)}>
          <option value="">Elige un paciente...</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      {patient && (
        <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:14, background:"white", borderRadius:14, padding:13, boxShadow:"0 1px 6px rgba(0,0,0,.05)" }}>
          <div className="av" style={{ width:46, height:46, background:patient.color, fontSize:15 }}>{patient.avatar}</div>
          <div><div style={{ fontWeight:700, fontSize:14, color:C.charcoal }}>{patient.name}</div><div style={{ fontSize:12, color:C.grayL }}>{patient.age} años — {patient.diagnosis}</div></div>
        </div>
      )}
      {pPlan.length === 0 && pid && <div style={{ color:C.grayL, fontSize:13, textAlign:"center", padding:"20px 0" }}>Sin areas de intervencion registradas.</div>}
      {pPlan.map(p => {
        const a = areaInfo(p.area);
        return (
          <div key={p.id} className="sc" style={{ marginBottom:12 }}>
            <div className="sch">
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:a.color+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{a.icon}</div>
                <div><div style={{ fontWeight:700, fontSize:14, color:C.charcoal }}>{a.label}</div><div style={{ fontSize:11, color:C.grayL }}>{p.professional}</div></div>
              </div>
              <span style={{ fontSize:12, fontWeight:700, color:a.color }}>{p.progress}%</span>
            </div>
            <div className="scb">
              <div className="prog" style={{ marginBottom:10 }}><div className="progf" style={{ width:`${p.progress}%`, background:a.color }} /></div>
              {p.objectives.map((o, i) => <div key={i} style={{ fontSize:12, padding:"4px 0", borderBottom:`1px solid ${C.sand}`, color:C.charcoal }}>• {o}</div>)}
              {p.notes && <div style={{ fontSize:12, color:C.grayL, marginTop:8, fontStyle:"italic" }}>{p.notes}</div>}
              <div style={{ fontSize:10, color:C.grayL, marginTop:6 }}>Actualizado: {p.lastUpdate}</div>
            </div>
          </div>
        );
      })}
      {showNew && (
        <Modal title="Agregar area de intervencion" onClose={() => setNew(false)}>
          <div className="fg"><label className="lbl">Area</label>
            <select className="inp" value={f.area} onChange={e => setF({ ...f, area:e.target.value })}>
              {AREAS.map(a => <option key={a.id} value={a.id}>{a.icon} {a.label}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Profesional responsable</label>
            <input className="inp" placeholder="Nombre del profesional" value={f.professional} onChange={e => setF({ ...f, professional:e.target.value })} />
          </div>
          <div className="fg"><label className="lbl">Objetivos (separados por coma)</label>
            <textarea className="inp" placeholder="Objetivo 1, Objetivo 2..." value={f.objectives} onChange={e => setF({ ...f, objectives:e.target.value })} />
          </div>
          <div className="fg"><label className="lbl">Progreso: {f.progress}%</label>
            <input type="range" style={{ width:"100%", accentColor:C.terra }} min={0} max={100} step={5} value={f.progress} onChange={e => setF({ ...f, progress:parseInt(e.target.value) })} />
          </div>
          <div className="fg"><label className="lbl">Notas</label>
            <textarea className="inp" placeholder="Observaciones del area..." value={f.notes} onChange={e => setF({ ...f, notes:e.target.value })} />
          </div>
          <button className="btn btnp btnfull" onClick={save}>Guardar area</button>
        </Modal>
      )}
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function Admin({ users, setUsers, registerRequests, setRegisterRequests, currentUser, precios=null, setPrecios=null }) {
  const [tab, setTab]   = useState("solicitudes");
  const [showNew, setNew] = useState(false);
  const pendientes      = registerRequests.filter(r => r.status === "pendiente");
  const [f, setF]       = useState({ name:"", email:"", password:"", role:"profesional", specialty:"", plan:"Basico", phone:"", trialDays:"14" });
  const cols            = [C.terra, C.sage, C.purple, C.info, C.gold];

  const add = () => {
    if (!f.name || !f.email || !f.password) return;
    const init = f.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
    const days = parseInt(f.trialDays) || 14;
    const end = new Date(); end.setDate(end.getDate() + days);
    const endStr = end.toISOString().slice(0,10);
    const dataExp = new Date(end); dataExp.setDate(dataExp.getDate() + 30);
    setUsers(prev => [...prev, {
      id:makeId(), name:f.name, email:f.email, password:f.password, role:f.role,
      specialty:f.specialty, plan:f.plan, status:"active",
      createdAt:new Date().toLocaleDateString("es-UY"), avatar:init,
      color:cols[prev.length % cols.length], lastLogin:"—",
      subscriptionEnd:endStr, dataExpiresAt:dataExp.toISOString().slice(0,10), trialDays:days
    }]);
    setF({ name:"", email:"", password:"", role:"profesional", specialty:"", plan:"Basico", phone:"", trialDays:"14" });
    setNew(false);
  };

  const chgStatus = (id, s) => setUsers(prev => prev.map(u => u.id===id ? { ...u, status:s } : u));
  const chgRole   = (id, r) => setUsers(prev => prev.map(u => u.id===id ? { ...u, role:r }   : u));
  const del       = (id)    => { if (id === currentUser?.id) { alert("No puedes eliminar tu propia cuenta."); return; } setUsers(prev => prev.filter(u => u.id !== id)); };

  const sIcon  = { active:"🟢", pending:"🟡", inactive:"⚪" };
  const sLabel = { active:"Activo", pending:"Pendiente", inactive:"Inactivo" };

  const sendWA = () => {
    if (!f.phone) { alert("Ingresa un telefono con codigo de pais para WhatsApp"); return; }
    const phone = f.phone.replace(/\D/g, "");
    const msg = encodeURIComponent(`Hola ${f.name.split(" ")[0]}! Te doy acceso a Hadrion.\n🔗 hadrion.pages.dev\n📧 Email: ${f.email}\n🔑 Contraseña: ${f.password}\nPlan: ${f.plan} — 14 dias de prueba. Cualquier consulta escribime!`);
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  const sendEmail = () => {
    const subject = encodeURIComponent("Acceso a Hadrion — Plataforma Clinica");
    const body    = encodeURIComponent(`Hola ${f.name}!\n\nTe doy acceso a Hadrion, tu plataforma clinica.\n\nURL: https://hadrion.pages.dev\nEmail: ${f.email}\nContraseña: ${f.password}\nPlan: ${f.plan}\n\n14 dias de prueba gratuitos. Cualquier consulta: comunipro12@gmail.com\n\nAdriana Soba`);
    window.open(`mailto:${f.email}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}><span style={{ fontSize:22 }}>🔐</span><div className="pt">Administracion</div></div>
        <div className="ps">Gestion de usuarios, roles y seguridad</div>
      </div>
      <div className="atabrow">
        {[{ k:"solicitudes",l:"📬 Solicitudes" },{ k:"usuarios",l:"👥 Usuarios" },{ k:"precios",l:"💰 Precios" },{ k:"marketing",l:"📢 Marketing" },{ k:"stats",l:"📊 Stats" },{ k:"config",l:"⚙️ Config" }].map(t => (
          <button key={t.k} className={`atab${tab===t.k?" active":""}`} onClick={() => setTab(t.k)}>{t.l}</button>
        ))}
      </div>

      {tab === "solicitudes" && (
        <>
          <div style={{ fontSize:13, color:C.grayL, marginBottom:10 }}>{registerRequests.length} solicitudes — {pendientes.length} pendientes</div>
          {registerRequests.length === 0 && (
            <div style={{ textAlign:"center", padding:"30px 0", color:C.grayL }}>
              <div style={{ fontSize:36 }}>📬</div><div style={{ fontWeight:600 }}>Sin solicitudes aun</div>
            </div>
          )}
          {registerRequests.map(r => (
            <div key={r.id} className="sc" style={{ marginBottom:10 }}>
              <div className="sch">
                <div><div style={{ fontWeight:700, fontSize:14 }}>{r.name}</div><div style={{ fontSize:11, color:C.grayL }}>{r.email} — {r.date}</div></div>
                <span className="badge" style={{ background:r.status==="pendiente"?C.goldF:C.greenF, color:r.status==="pendiente"?C.gold:C.forest }}>{r.status}</span>
              </div>
              <div className="scb">
                <div style={{ fontSize:11, marginBottom:8 }}>Especialidad: <strong>{r.specialty||"—"}</strong> — Tel: <strong>{r.phone||"—"}</strong></div>
                {r.message && <div style={{ fontSize:12, color:C.grayL, fontStyle:"italic", marginBottom:8 }}>"{r.message}"</div>}
                {r.status === "pendiente" && (
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    <button className="btn btnp btnsm" onClick={() => {
                      const init = r.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
                      const dias = 14;
                      const end = new Date(); end.setDate(end.getDate() + dias);
                      const endStr = end.toISOString().slice(0,10);
                      const dataExp = new Date(end); dataExp.setDate(dataExp.getDate() + 30);
                      const pwd = "Hadrion" + Math.floor(1000+Math.random()*9000);
                      const newUser = { id:makeId(), name:r.name, email:r.email, password:pwd, role:"profesional", specialty:r.specialty, plan:"Basico", status:"active", createdAt:new Date().toLocaleDateString("es-UY"), avatar:init, color:cols[users.length%cols.length], lastLogin:"—", subscriptionEnd:endStr, dataExpiresAt:dataExp.toISOString().slice(0,10), trialDays:dias };
                      setUsers(prev => [...prev, newUser]);
                      setRegisterRequests(prev => prev.map(req => req.id===r.id ? { ...req, status:"aprobado" } : req));
                      // Enviar WhatsApp automático
                      const phone = (r.phone||"").replace(/\D/g,"");
                      if (phone) {
                        const msg = encodeURIComponent(`Hola ${r.name.split(" ")[0]}! 🎉 Tu acceso a Hadrion está listo.
🔗 hadrion.pages.dev
📧 Email: ${r.email}
🔑 Contraseña: ${pwd}
Tenés ${dias} días de prueba gratis. ¡Bienvenida!
Cualquier consulta: comunipro12@gmail.com`);
                        window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
                      }
                    }}>✅ Confirmar pago y dar acceso</button>
                    <button className="btn btnd btnsm" onClick={() => setRegisterRequests(prev => prev.map(req => req.id===r.id ? { ...req, status:"rechazado" } : req))}>❌ Rechazar</button>
                  </div>
                )}
                {r.status === "aprobado" && <div className="alert alrts" style={{ marginBottom:0 }}>✅ Usuario creado — envia las credenciales por email o WhatsApp</div>}
              </div>
            </div>
          ))}
        </>
      )}

      {tab === "usuarios" && (
        <>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div style={{ fontSize:13, color:C.grayL }}>{users.length} usuarios</div>
            <button className="btn btnp btnsm" onClick={() => setNew(true)}>+ Dar de alta</button>
          </div>
          {users.map(u => (
            <div key={u.id} className="sc" style={{ marginBottom:10 }}>
              <div className="sch">
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div className="av" style={{ width:42, height:42, background:u.color, fontSize:14, borderRadius:12 }}>{u.avatar}</div>
                  <div><div style={{ fontWeight:700, fontSize:13 }}>{u.name}</div><div style={{ fontSize:11, color:C.grayL }}>{u.email}</div></div>
                </div>
                <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                  <span className={`roletag ${u.role==="admin"?"radmin":"rpro"}`}>{u.role==="admin"?"👑 Admin":"Pro"}</span>
                  <span style={{ fontSize:14 }}>{sIcon[u.status]}</span>
                </div>
              </div>
              <div className="scb">
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:5, marginBottom:10 }}>
                  {[["Especialidad",u.specialty||"—"],["Plan",u.plan],["Estado",sLabel[u.status]],["Ultimo acceso",u.lastLogin]].map(([l,v]) => (
                    <div key={l} style={{ fontSize:11 }}><span style={{ color:C.grayL }}>{l}:</span> <strong>{v}</strong></div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {u.status === "pending"   && <button className="btn btnp btnsm" onClick={() => chgStatus(u.id,"active")}>✅ Aprobar</button>}
                  {u.status === "active"    && <button className="btn btng btnsm" onClick={() => chgStatus(u.id,"inactive")}>⏸️ Suspender</button>}
                  {u.status === "inactive"  && <button className="btn btno btnsm" onClick={() => chgStatus(u.id,"active")}>▶️ Reactivar</button>}
                  {u.role !== "admin"
                    ? <button className="btn btngold btnsm" onClick={() => chgRole(u.id,"admin")}>👑 Hacer admin</button>
                    : u.id !== currentUser?.id && <button className="btn btng btnsm" onClick={() => chgRole(u.id,"profesional")}>↓ Quitar admin</button>
                  }
                  {u.id !== currentUser?.id && <button className="btn btnd btnsm" onClick={() => del(u.id)}>🗑️ Eliminar</button>}
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {tab === "seguridad" && (
        <>
          <SC title="🛡️ Politicas de seguridad">
            {[["Autenticacion","Email + contraseña","✅"],["Control de acceso","Roles admin/profesional (RBAC)","✅"],["Datos","Almacenamiento local cifrado","✅"],["Sesiones","Cierre manual de sesion","✅"],["2FA","Doble factor","🔜"],["Auditoria","Registro de acciones","🔄"]].map(([n,d,s]) => (
              <div key={n} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:`1px solid ${C.sand}` }}>
                <div style={{ flex:1 }}><div style={{ fontWeight:600, fontSize:13 }}>{n}</div><div style={{ fontSize:11, color:C.grayL }}>{d}</div></div>
                <span style={{ fontSize:18 }}>{s}</span>
              </div>
            ))}
          </SC>
          <SC title="📋 Permisos por rol">
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", fontSize:12, borderCollapse:"collapse" }}>
                <thead><tr>{["Funcion","Admin","Profesional"].map(h => <th key={h} style={{ padding:"6px 8px", background:C.cream, color:C.grayL, fontWeight:700, textAlign:"left", borderBottom:`1px solid ${C.sand}` }}>{h}</th>)}</tr></thead>
                <tbody>
                  {[["Registrar sesiones","✅","✅"],["Registrar pagos","✅","✅"],["Ver reportes globales","✅","Propios"],["Gestionar usuarios","✅","❌"],["Cambiar roles","✅","❌"],["Configuracion global","✅","❌"]].map(([fn,...vs]) => (
                    <tr key={fn}><td style={{ padding:"7px 8px", borderBottom:`1px solid ${C.sand}` }}>{fn}</td>{vs.map((v,i) => <td key={i} style={{ padding:"7px 8px", borderBottom:`1px solid ${C.sand}`, color:v==="✅"?C.forest:v==="❌"?C.danger:C.info, fontWeight:600 }}>{v}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SC>
        </>
      )}

      {tab === "stats" && (
        <>
          <div className="sgrid">
            <div className="sc2"><div className="snum">{users.length}</div><div className="slbl">Usuarios</div></div>
            <div className="sc2"><div className="snum">{users.filter(u=>u.status==="active").length}</div><div className="slbl">Activos</div></div>
            <div className="sc2"><div className="snum">{users.filter(u=>u.role==="admin").length}</div><div className="slbl">Admins</div></div>
            <div className="sc2"><div className="snum">{users.filter(u=>u.status==="pending").length}</div><div className="slbl">Pendientes</div></div>
          </div>
          <SC title="📊 Por plan">
            {["Pro","Basico"].map(plan => {
              const n = users.filter(u => u.plan===plan).length;
              return (
                <div key={plan} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.sand}` }}>
                  <div style={{ flex:1, fontWeight:500, fontSize:13 }}>{plan}</div>
                  <div className="prog" style={{ width:90 }}><div className="progf" style={{ width:`${users.length ? (n/users.length)*100 : 0}%` }} /></div>
                  <div style={{ fontWeight:700, color:C.terra, minWidth:20 }}>{n}</div>
                </div>
              );
            })}
          </SC>
        </>
      )}

      {tab === "precios" && precios && (
        <div>
          <div className="alert alrti" style={{marginBottom:12}}>Los precios que configurés acá se muestran en solicitudes, perfil de usuarios y publicaciones de marketing.</div>
          {[
            { key:"basico",  label:"Plan Básico",   icon:"⭐",  maxU:"1 usuario"   },
            { key:"pro",     label:"Plan Pro",      icon:"🌟",  maxU:"3 usuarios"  },
            { key:"clinica", label:"Plan Clínica",  icon:"🏥",  maxU:"10 usuarios" },
            { key:"colegio", label:"Plan Colegio",  icon:"🏫",  maxU:"30 usuarios" },
          ].map(p => (
            <div key={p.key} style={{background:"white",borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 1px 8px rgba(0,0,0,.06)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{fontSize:20}}>{p.icon}</span>
                <div style={{fontWeight:700,fontSize:13}}>{p.label}</div>
                <span style={{fontSize:11,color:"#9B9590",background:"#F5F0FA",borderRadius:20,padding:"2px 8px"}}>{p.maxU}</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div className="fg" style={{marginBottom:0}}>
                  <label className="lbl">UYU / mes</label>
                  <input className="inp" type="number" min="0" value={precios[p.key]||0}
                    onChange={e=>setPrecios({...precios,[p.key]:parseInt(e.target.value)||0})}/>
                </div>
                <div className="fg" style={{marginBottom:0}}>
                  <label className="lbl">USD / mes</label>
                  <input className="inp" type="number" min="0" value={precios[p.key+"USD"]||0}
                    onChange={e=>setPrecios({...precios,[p.key+"USD"]:parseInt(e.target.value)||0})}/>
                </div>
              </div>
            </div>
          ))}
          <div style={{fontWeight:700,fontSize:13,margin:"16px 0 10px"}}>🔗 Links de pago</div>
          {[
            ["💙 MercadoPago — Básico","mpLinkBasico"],
            ["💙 MercadoPago — Pro","mpLinkPro"],
            ["💙 MercadoPago — Clínica","mpLinkClinica"],
            ["🌎 Stripe / PayPal internacional","stripeLink"],
          ].map(([label,key]) => (
            <div className="fg" key={key}>
              <label className="lbl">{label}</label>
              <input className="inp" type="url" placeholder="https://..." value={precios[key]||""}
                onChange={e=>setPrecios({...precios,[key]:e.target.value})}/>
            </div>
          ))}
          <div style={{background:"linear-gradient(135deg,#9B7EBD,#7B5EA7)",borderRadius:14,padding:14,color:"white",marginTop:8}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>Vista previa pública</div>
            {["basico","pro","clinica","colegio"].map((k,i) => (
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,.2)"}}>
                <span style={{fontSize:12}}>{["⭐ Básico","🌟 Pro","🏥 Clínica","🏫 Colegio"][i]}</span>
                <span style={{fontWeight:700,fontSize:12}}>${(precios[k]||0).toLocaleString("es-UY")} UYU / US${precios[k+"USD"]||0}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "marketing" && (
        <div>
          <div className="alert alrti" style={{marginBottom:12}}>
            💡 <strong>Estrategia recomendada:</strong> Publicá contenido de valor y esperá que se contacten. Quien escribe tiene interés real.
          </div>

          <div style={{fontWeight:700,fontSize:14,color:"#2C2C2C",marginBottom:10}}>📱 Publicación para Instagram</div>
          <div style={{background:"white",borderRadius:14,padding:14,marginBottom:14,fontSize:13,lineHeight:1.7,color:"#2C2C2C",border:"1.5px solid #EDE0F5",whiteSpace:"pre-wrap"}}>
{`✨ ¿Sos fonoaudióloga, psicopedagoga o terapeuta y seguís con anotaciones en papel?

Hadrion es la plataforma clínica diseñada para vos 🌸

✅ Registrá sesiones en segundos
✅ Calculá cuánto cobrar por dependencia (BPS, Mutual, Particular...)
✅ Asistencias y liquidación automática
✅ Módulo TEA/Autismo con objetivos por área
✅ IA terapéutica para generar objetivos e informes
✅ Historia clínica digital
✅ Agenda con Google Calendar

📍 Desarrollado en Uruguay para profesionales de habla hispana

👉 Escribime por DM o WhatsApp para conocer los planes
💜 14 días de prueba gratis

#fonoaudiologia #psicopedagogia #terapiaocupacional #autismo #TEA #Uruguay #plataformaclinica #hadrion`}
          </div>
          <button className="btn btno btnsm" onClick={()=>{
            const txt = `✨ ¿Sos fonoaudióloga, psicopedagoga o terapeuta y seguís con anotaciones en papel?

Hadrion es la plataforma clínica diseñada para vos 🌸

✅ Registrá sesiones en segundos
✅ Calculá cuánto cobrar por dependencia (BPS, Mutual, Particular...)
✅ Asistencias y liquidación automática
✅ Módulo TEA/Autismo con objetivos por área
✅ IA terapéutica para generar objetivos e informes
✅ Historia clínica digital
✅ Agenda con Google Calendar

📍 Desarrollado en Uruguay para profesionales de habla hispana

👉 Escribime por DM o WhatsApp para conocer los planes
💜 14 días de prueba gratis

#fonoaudiologia #psicopedagogia #terapiaocupacional #autismo #TEA #Uruguay #plataformaclinica #hadrion`;
            navigator.clipboard?.writeText(txt).catch(()=>{});
          }}>
            📋 Copiar texto
          </button>

          <div style={{fontWeight:700,fontSize:14,color:"#2C2C2C",marginBottom:10,marginTop:16}}>💬 Mensaje para grupos de WhatsApp</div>
          <div style={{background:"white",borderRadius:14,padding:14,marginBottom:14,fontSize:13,lineHeight:1.7,color:"#2C2C2C",border:"1.5px solid #EDE0F5",whiteSpace:"pre-wrap"}}>
{`Hola! Les cuento que lancé Hadrion, una plataforma clínica para terapeutas 🌸

Podés registrar sesiones, calcular cobros por BPS/Mutual/Particular, llevar historia clínica y usar IA para generar objetivos e informes.

Desarrollada en Uruguay, con 14 días de prueba gratis.

Si les interesa, escríbanme 💜`}
          </div>

          <div style={{fontWeight:700,fontSize:14,color:"#2C2C2C",marginBottom:10,marginTop:8}}>🛒 Flujo de venta recomendado</div>
          {[
            ["1","Te contactan por DM o WhatsApp","Respondé rápido, preguntá su especialidad"],
            ["2","Mostrá el valor","Enviá capturas o describí la funcionalidad clave para ellas"],
            ["3","Acordar pago","Compartí tu link de MercadoPago o datos bancarios"],
            ["4","Confirmar pago","Esperá la confirmación antes de dar acceso"],
            ["5","Dar acceso","Usá el panel Admin → Dar de alta → enviá credenciales por WA"],
          ].map(([n,t,d]) => (
            <div key={n} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:"#9B7EBD",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{n}</div>
              <div><div style={{fontWeight:600,fontSize:13}}>{t}</div><div style={{fontSize:11,color:"#9B9590"}}>{d}</div></div>
            </div>
          ))}

          <div style={{fontWeight:700,fontSize:14,color:"#2C2C2C",marginBottom:10,marginTop:16}}>💳 Formas de cobro seguras (Uruguay)</div>
          {[
            ["🥇","MercadoPago","Recomendado — link de pago, sin dar datos personales, ~4% comisión"],
            ["🥈","Transferencia BROU/Itaú","Sin comisión, rastreable, dar solo alias o CBU"],
            ["🥉","RedPagos/Abitab","Para quienes no tienen cuenta bancaria"],
            ["❌","Número personal","No recomendado — usá WhatsApp Business"],
          ].map(([ico,t,d]) => (
            <div key={t} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start",padding:"8px 12px",background:"white",borderRadius:10}}>
              <span style={{fontSize:16}}>{ico}</span>
              <div><div style={{fontWeight:600,fontSize:13}}>{t}</div><div style={{fontSize:11,color:"#9B9590"}}>{d}</div></div>
            </div>
          ))}

          <div style={{background:"linear-gradient(135deg,#9B7EBD,#7B5EA7)",borderRadius:14,padding:"14px 16px",color:"white",marginTop:8}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>💰 Precios actuales</div>
            {[["Plan Básico","1 usuario","basico"],["Plan Pro","3 usuarios + IA","pro"],["Plan Clínica","10 usuarios","clinica"],["Plan Colegio","30 usuarios","colegio"]].map(([p,d,key]) => (
              <div key={p} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,.2)"}}>
                <div><div style={{fontWeight:600,fontSize:12}}>{p}</div><div style={{fontSize:10,opacity:.8}}>{d}</div></div>
                <div style={{fontWeight:700,fontSize:13}}>${(precios?.[key]||0).toLocaleString("es-UY")} UYU/mes</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "config" && (
        <SC title="⚙️ Configuracion">
          {[["Nombre","Hadrion"],["Plan","Pro — Ilimitado"],["Region","Uruguay"],["Idioma","Espanol"],["Zona horaria","GMT-3"],["Contacto","comunipro12@gmail.com"]].map(([l,v]) => (
            <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${C.sand}` }}>
              <span style={{ fontSize:13, color:C.gray }}>{l}</span>
              <span style={{ fontSize:13, fontWeight:600, color:C.charcoal }}>{v}</span>
            </div>
          ))}
        </SC>
      )}

      {showNew && (
        <Modal title="Dar de alta usuario" onClose={() => setNew(false)}>
          {[["Nombre completo","name","text","Nombre y apellido"],["Email profesional","email","email","tu@email.com"],["Contraseña inicial","password","text","Contraseña temporal"],["Especialidad","specialty","text","Fonoaudiologa, Psicopedagoga..."],["Telefono (codigo de pais incluido)","phone","tel","(+598) 9..."]].map(([l,k,t,ph]) => (
            <div className="fg" key={k}><label className="lbl">{l}</label><input className="inp" type={t} placeholder={ph} value={f[k]||""} onChange={e => setF({ ...f, [k]:e.target.value })} /></div>
          ))}
          <div className="fg"><label className="lbl">Rol</label>
            <select className="inp" value={f.role} onChange={e => setF({ ...f, role:e.target.value })}>
              <option value="profesional">Profesional</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="fg"><label className="lbl">Plan</label>
            <select className="inp" value={f.plan} onChange={e => setF({ ...f, plan:e.target.value })}>
              <option value="Basico">Basico</option>
              <option value="Pro">Pro</option>
            </select>
          </div>
          <button className="btn btnp btnfull" onClick={add}>✅ Crear usuario</button>
          <div className="fg">
            <label className="lbl">Días de acceso (prueba)</label>
            <input className="inp" type="number" min="1" max="365" value={f.trialDays||"14"}
              onChange={e => setF({...f, trialDays:e.target.value})}
              placeholder="14"/>
            <div style={{fontSize:11,color:"#9B9590",marginTop:3}}>
              El acceso vence en {f.trialDays||14} días. Los datos se conservan 30 días adicionales.
            </div>
          </div>
          {f.name && f.email && f.password && (
            <div style={{ marginTop:12 }}>
              <div style={{ display:"flex", gap:8 }}>
                <button className="btn btnsm" style={{ background:"#25D366", color:"white", flex:1, justifyContent:"center" }} onClick={sendWA}>
                  📱 WhatsApp
                </button>
                <button className="btn btnsm" style={{ background:C.info, color:"white", flex:1, justifyContent:"center" }} onClick={sendEmail}>
                  ✉️ Email
                </button>
              </div>
              <div className="alert alrti" style={{ marginTop:8, fontSize:11 }}>
                Primero creá el usuario, luego enviá las credenciales por WhatsApp o Email.
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function Profile({ user, onLogout, setUser }) {
  const [ed, setEd]   = useState(false);
  const [pwF, setPwF] = useState({ current:"", newPw:"", confirm:"" });
  const [pwErr, setPwErr] = useState("");
  const [pwOk, setPwOk]   = useState(false);

  const changePw = () => {
    setPwErr(""); setPwOk(false);
    if (!pwF.current || !pwF.newPw || !pwF.confirm) { setPwErr("Completa todos los campos."); return; }
    if (pwF.current !== user.password) { setPwErr("La contraseña actual es incorrecta."); return; }
    if (pwF.newPw !== pwF.confirm)     { setPwErr("Las contraseñas nuevas no coinciden."); return; }
    if (pwF.newPw.length < 6)          { setPwErr("La nueva contraseña debe tener al menos 6 caracteres."); return; }
    setUser(prev => ({ ...prev, password:pwF.newPw }));
    setPwF({ current:"", newPw:"", confirm:"" });
    setPwOk(true);
  };

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Mi Perfil</div><div className="ps">Configuracion de tu cuenta</div></div>
      <div style={{ background:"white", borderRadius:18, padding:20, boxShadow:"0 1px 8px rgba(0,0,0,.06)", marginBottom:14, textAlign:"center" }}>
        <div className="av" style={{ width:68, height:68, background:user.color, fontSize:24, margin:"0 auto 12px", borderRadius:20 }}>{user.avatar}</div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:C.charcoal }}>{user.name}</div>
        <div style={{ fontSize:13, color:C.grayL, marginTop:2 }}>{user.specialty}</div>
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:10 }}>
          <span className={`roletag ${user.role==="admin"?"radmin":"rpro"}`}>{user.role==="admin"?"👑 Admin":"Profesional"}</span>
          <span className="badge" style={{ background:C.goldF, color:C.gold }}>{user.plan}</span>
        </div>
      </div>
      <SC title="📋 Datos" action={<button className="btn btno btnsm" onClick={() => setEd(!ed)}>{ed?"Cancelar":"✏️ Editar"}</button>}>
        {!ed
          ? [["Nombre",user.name],["Email",user.email],["Especialidad",user.specialty],["Rol",user.role==="admin"?"Administrador":"Profesional"],["Plan",user.plan],["Ultimo acceso",user.lastLogin]].map(([l,v]) => (
            <div key={l} className="hxf"><div className="hxl">{l}</div><div className="hxv">{v}</div></div>
          ))
          : <>
            {[["Nombre","name","text"],["Especialidad","specialty","text"],["Email","email","email"]].map(([l,k,t]) => (
              <div className="fg" key={k}><label className="lbl">{l}</label>
                <input className="inp" type={t} defaultValue={user[k]} onChange={e => setUser(prev => ({ ...prev, [k]:e.target.value }))} />
              </div>
            ))}
            <button className="btn btnp btnfull" onClick={() => setEd(false)}>Guardar cambios</button>
          </>
        }
      </SC>
      <SC title="🔒 Cambiar contraseña">
        <div className="fg"><label className="lbl">Contraseña actual</label><input className="inp" type="password" placeholder="••••••••" value={pwF.current} onChange={e => setPwF({ ...pwF, current:e.target.value })} /></div>
        <div className="fg"><label className="lbl">Nueva contraseña</label><input className="inp" type="password" placeholder="Minimo 6 caracteres" value={pwF.newPw} onChange={e => setPwF({ ...pwF, newPw:e.target.value })} /></div>
        <div className="fg"><label className="lbl">Confirmar nueva contraseña</label><input className="inp" type="password" placeholder="Repite la nueva" value={pwF.confirm} onChange={e => setPwF({ ...pwF, confirm:e.target.value })} /></div>
        {pwErr && <div className="alert alrtd">{pwErr}</div>}
        {pwOk  && <div className="alert alrts">✅ Contraseña cambiada correctamente.</div>}
        <button className="btn btno btnfull" onClick={changePw}>Cambiar contraseña</button>
      </SC>
      <button className="btn btnd btnfull" style={{ marginTop:8 }} onClick={onLogout}>🚪 Cerrar sesion</button>
    </div>
  );
}

// ─── ORGANIZACIONES ───────────────────────────────────────────────────────────
const PLANES_ORG_BASE = [
  { id:"basico",   label:"Básico",       maxUsers:1,  color:"#9B7EBD", tipo:"individual",
    features:["Historia clínica","Registro de sesiones","Asistencias y cobros","Conciencia fonológica","TEA/Autismo","Recursos y plantillas"] },
  { id:"pro",      label:"Pro",          maxUsers:1,  color:"#5B8DB8", tipo:"individual",
    features:["Todo el plan Básico","Asistente IA (chat clínico)","Psicología y TCC","Reportes avanzados","Exportar informes"] },
  { id:"clinica",  label:"Clínica",      maxUsers:10, color:"#2ECC71", tipo:"clinica",
    features:["Todo el plan Pro","Hasta 10 usuarios","Organización multiusuario","Liquidación de sueldos","Panel de administración"] },
  { id:"colegio",  label:"Colegio/Centro",maxUsers:30, color:"#E8A020", tipo:"clinica",
    features:["Todo el plan Clínica","Hasta 30 usuarios","Estadísticas del equipo","Soporte prioritario"] },
];

function Organizaciones({ users, setUsers, precios={} }) {
  const PLANES_ORG = PLANES_ORG_BASE.map(p => ({ ...p, precio: precios[p.id] || 0 }));
  const [orgs, setOrgs]     = useState([
    { id:1, nombre:"Clínica Demo", tipo:"Clinica", plan:"clinica", maxUsers:10,
      contacto:"demo@clinica.com", usuarios:[1,2], activa:true, createdAt:"01/01/2025" }
  ]);
  const [showNew, setShowNew] = useState(false);
  const [f, setF]             = useState({ nombre:"", tipo:"Clinica", plan:"pro", contacto:"", telefono:"" });
  const [selOrg, setSelOrg]   = useState(null);

  const tiposOrg = ["Clinica","Escuela","Colegio","Centro terapeutico","Hospital","Otro"];

  const addOrg = () => {
    if (!f.nombre) return;
    const plan = PLANES_ORG.find(p => p.id === f.plan);
    setOrgs(prev => [...prev, {
      id: makeId(), nombre:f.nombre, tipo:f.tipo, plan:f.plan,
      maxUsers: plan?.maxUsers || 3, contacto:f.contacto,
      telefono:f.telefono, usuarios:[], activa:true,
      createdAt:new Date().toLocaleDateString("es-UY")
    }]);
    setF({ nombre:"", tipo:"Clinica", plan:"pro", contacto:"", telefono:"" });
    setShowNew(false);
  };

  const orgUsers = org => users.filter(u => (org.usuarios||[]).includes(u.id));
  const canAddUser = org => orgUsers(org).length < org.maxUsers;

  return (
    <div className="fu">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <div>
          <div className="pt">🏫 Organizaciones</div>
          <div className="ps">Clínicas, escuelas y centros con multiusuario</div>
        </div>
        <button className="btn btnp btnsm" onClick={()=>setShowNew(true)}>+ Nueva org.</button>
      </div>

      {/* Planes disponibles */}
      <div style={{marginBottom:4,fontSize:11,fontWeight:700,color:C.grayL,textTransform:"uppercase",letterSpacing:1}}>Planes individuales</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:12}}>
        {PLANES_ORG.filter(p=>p.tipo==="individual").map(p => (
          <div key={p.id} style={{background:"white",borderRadius:12,padding:"12px 14px",border:`2px solid ${p.color}33`}}>
            <div style={{fontWeight:700,fontSize:13,color:p.color}}>{p.label}</div>
            <div style={{fontSize:10,color:"#9B9590",marginTop:2}}>1 usuario — acceso individual</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#2C2C2C",marginTop:4}}>${p.precio.toLocaleString("es-UY")} UYU/mes</div>
            {p.features && <div style={{marginTop:6}}>{p.features.slice(0,3).map(f=><div key={f} style={{fontSize:9,color:"#9B9590"}}>✓ {f}</div>)}</div>}
          </div>
        ))}
      </div>
      <div style={{marginBottom:4,fontSize:11,fontWeight:700,color:C.grayL,textTransform:"uppercase",letterSpacing:1}}>Planes para clínicas y centros</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:16}}>
        {PLANES_ORG.filter(p=>p.tipo==="clinica").map(p => (
          <div key={p.id} style={{background:"white",borderRadius:12,padding:"12px 14px",border:`2px solid ${p.color}33`}}>
            <div style={{fontWeight:700,fontSize:13,color:p.color}}>{p.label}</div>
            <div style={{fontSize:10,color:"#9B9590",marginTop:2}}>Hasta {p.maxUsers} usuarios — multiusuario</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#2C2C2C",marginTop:4}}>${p.precio.toLocaleString("es-UY")} UYU/mes</div>
            {p.features && <div style={{marginTop:6}}>{p.features.slice(0,3).map(f=><div key={f} style={{fontSize:9,color:"#9B9590"}}>✓ {f}</div>)}</div>}
          </div>
        ))}
      </div>

      {orgs.length === 0 && (
        <div style={{textAlign:"center",padding:"30px 0",color:"#9B9590"}}>
          <div style={{fontSize:36}}>🏫</div>
          <div style={{fontWeight:600}}>Sin organizaciones registradas</div>
        </div>
      )}

      {orgs.map(org => {
        const plan = PLANES_ORG.find(p => p.id === org.plan);
        const miembros = orgUsers(org);
        const pct = miembros.length / org.maxUsers * 100;
        return (
          <div key={org.id} style={{background:"white",borderRadius:18,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.07)",marginBottom:14}}>
            <div style={{padding:"14px 16px",borderBottom:"1px solid #EDE0F5",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <div style={{fontWeight:700,fontSize:14}}>{org.nombre}</div>
                <div style={{fontSize:11,color:"#9B9590",marginTop:2}}>{org.tipo} · Plan {plan?.label} · {org.createdAt}</div>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontSize:10,background:org.activa?"#E8F8EF":"#FDECEA",color:org.activa?"#1a7a3c":"#C0392B",borderRadius:20,padding:"2px 8px",fontWeight:700}}>
                  {org.activa?"Activa":"Inactiva"}
                </span>
                <button onClick={()=>setSelOrg(selOrg?.id===org.id?null:org)}
                  style={{background:"#F5F0FA",border:"none",borderRadius:8,padding:"6px 10px",cursor:"pointer",fontSize:11,fontWeight:700,color:"#9B7EBD"}}>
                  ⚙️
                </button>
              </div>
            </div>
            <div style={{padding:"14px 16px"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{flex:1,background:"#EDE0F5",borderRadius:8,height:7,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:8,background:plan?.color||"#9B7EBD",width:`${Math.min(pct,100)}%`,transition:"width .3s"}}/>
                </div>
                <span style={{fontSize:12,fontWeight:700,color:plan?.color||"#9B7EBD"}}>{miembros.length}/{org.maxUsers}</span>
                <span style={{fontSize:11,color:"#9B9590"}}>usuarios</span>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {miembros.map(u => (
                  <div key={u.id} style={{display:"flex",alignItems:"center",gap:5,background:"#F5F0FA",borderRadius:20,padding:"4px 10px"}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:u.color,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:9,fontWeight:700}}>{u.avatar}</div>
                    <span style={{fontSize:11,fontWeight:500}}>{u.name.split(" ")[0]}</span>
                  </div>
                ))}
                {canAddUser(org) && (
                  <button style={{background:"#EDE0F5",border:"none",borderRadius:20,padding:"4px 10px",fontSize:11,cursor:"pointer",color:"#9B7EBD",fontFamily:"sans-serif"}}
                    onClick={()=>{
                      const available = users.filter(u => !orgs.some(o => (o.usuarios||[]).includes(u.id)));
                      if (available.length === 0) { alert("No hay usuarios disponibles para agregar."); return; }
                      const name = prompt("Email del usuario a agregar:");
                      const u = users.find(x => x.email === name);
                      if (!u) { alert("Usuario no encontrado."); return; }
                      setOrgs(prev => prev.map(o => o.id===org.id ? {...o, usuarios:[...(o.usuarios||[]),u.id]} : o));
                    }}>
                    + Agregar usuario
                  </button>
                )}
              </div>
              {!canAddUser(org) && (
                <div style={{fontSize:11,color:"#E8A020",marginTop:6}}>
                  ⚠️ Límite de usuarios alcanzado. Actualizá el plan para agregar más.
                </div>
              )}
            </div>
          </div>
        );
      })}

      {showNew && (
        <Modal title="Nueva Organización" onClose={()=>setShowNew(false)}>
          <div className="fg"><label className="lbl">Nombre</label>
            <input className="inp" placeholder="Ej: Clínica Los Pinos" value={f.nombre} onChange={e=>setF({...f,nombre:e.target.value})}/>
          </div>
          <div className="fg"><label className="lbl">Tipo</label>
            <select className="inp" value={f.tipo} onChange={e=>setF({...f,tipo:e.target.value})}>
              {tiposOrg.map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Plan</label>
            <select className="inp" value={f.plan} onChange={e=>setF({...f,plan:e.target.value})}>
              {PLANES_ORG.map(p=>(
                <option key={p.id} value={p.id}>{p.label} — hasta {p.maxUsers} usuarios — ${p.precio.toLocaleString("es-UY")} UYU/mes</option>
              ))}
            </select>
          </div>
          <div className="fg"><label className="lbl">Email de contacto</label>
            <input className="inp" type="email" value={f.contacto} onChange={e=>setF({...f,contacto:e.target.value})}/>
          </div>
          <div className="fg"><label className="lbl">Teléfono (WhatsApp)</label>
            <input className="inp" type="tel" placeholder="(+598) 9..." value={f.telefono} onChange={e=>setF({...f,telefono:e.target.value})}/>
          </div>
          <div style={{background:"#F5F0FA",borderRadius:12,padding:12,marginBottom:12}}>
            <div style={{fontSize:11,fontWeight:700,color:"#9B9590",marginBottom:4,textTransform:"uppercase"}}>Resumen del plan seleccionado</div>
            {(() => { const p = PLANES_ORG.find(pl=>pl.id===f.plan);
              return p ? (
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><div style={{fontWeight:700,color:p.color}}>{p.label}</div><div style={{fontSize:12,color:"#9B9590"}}>Hasta {p.maxUsers} usuarios</div></div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:p.color}}>${p.precio.toLocaleString("es-UY")}/mes</div>
                </div>
              ) : null;
            })()}
          </div>
          <button className="btn btnp btnfull" onClick={addOrg}>Crear organización</button>
        </Modal>
      )}

      {selOrg && (
        <Modal title={`⚙️ ${selOrg.nombre}`} onClose={()=>setSelOrg(null)}>
          <div className="alert alrti" style={{marginBottom:12}}>Configuración de la organización</div>
          <div className="fg"><label className="lbl">Nombre</label>
            <input className="inp" value={selOrg.nombre}
              onChange={e=>setSelOrg({...selOrg,nombre:e.target.value})}/>
          </div>
          <div className="fg"><label className="lbl">Plan</label>
            <select className="inp" value={selOrg.plan}
              onChange={e=>{
                const p=PLANES_ORG.find(pl=>pl.id===e.target.value);
                setSelOrg({...selOrg,plan:e.target.value,maxUsers:p?.maxUsers||3});
              }}>
              {PLANES_ORG.map(p=><option key={p.id} value={p.id}>{p.label} — {p.maxUsers} usuarios — ${p.precio.toLocaleString("es-UY")} UYU/mes</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Estado</label>
            <select className="inp" value={selOrg.activa?"activa":"inactiva"}
              onChange={e=>setSelOrg({...selOrg,activa:e.target.value==="activa"})}>
              <option value="activa">Activa</option>
              <option value="inactiva">Inactiva</option>
            </select>
          </div>
          <div className="fg"><label className="lbl">Email de contacto</label>
            <input className="inp" value={selOrg.contacto||""}
              onChange={e=>setSelOrg({...selOrg,contacto:e.target.value})}/>
          </div>
          <button className="btn btnp btnfull" onClick={()=>{
            setOrgs(prev=>prev.map(o=>o.id===selOrg.id?selOrg:o));
            setSelOrg(null);
          }}>Guardar cambios</button>
          <button className="btn btnd btnfull" onClick={()=>{
            if(window.confirm("¿Eliminar esta organización?")) {
              setOrgs(prev=>prev.filter(o=>o.id!==selOrg.id));
              setSelOrg(null);
            }
          }}>🗑️ Eliminar organización</button>
          <button className="btn btng btnfull" onClick={()=>setSelOrg(null)}>Cancelar</button>
        </Modal>
      )}
    </div>
  );
}

// ─── ASISTENCIAS ─────────────────────────────────────────────────────────────
function Asistencias({ patients, setPatients }) {
  const myPats = patients.filter(p => p.status === "active");
  const [mes, setMes] = useState(() => {
    const h = new Date();
    return `${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`;
  });
  const [editTarifa, setEditTarifa] = useState(false);
  const [selPat, setSelPat]         = useState(null);
  const [tarifaF, setTarifaF]       = useState({});

  const cambiarMes = d => {
    const [y,m] = mes.split("-").map(Number);
    const n = new Date(y, m-1+d, 1);
    setMes(`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`);
  };

  const getDiasHabiles = m => {
    const [y,mo] = m.split("-").map(Number);
    const dias = [];
    const total = new Date(y, mo, 0).getDate();
    for (let d = 1; d <= total; d++) {
      const dow = new Date(y, mo-1, d).getDay();
      if (dow !== 0 && dow !== 6) dias.push(`${m}-${String(d).padStart(2,"0")}`);
    }
    return dias;
  };

  const diasHabiles = getDiasHabiles(mes);
  const nomMes = new Date(mes+"-01T12:00:00").toLocaleDateString("es-UY", { month:"long", year:"numeric" });

  const toggleAsis = (patId, dia) => {
    setPatients(prev => prev.map(p => {
      if (p.id !== patId) return p;
      const a = { ...(p.asistencias || {}) };
      if (!a[dia]) a[dia] = "P";
      else if (a[dia] === "P") a[dia] = "F";
      else if (a[dia] === "F") a[dia] = "FJ";
      else delete a[dia];
      return { ...p, asistencias: a };
    }));
  };

  const getColor = v => {
    if (!v)         return { bg:"#F0F0F0", c:"#aaa",    label:"–"  };
    if (v === "P")  return { bg:"#E8F8EF", c:"#1a7a3c", label:"P"  };
    if (v === "F")  return { bg:"#FDECEA", c:"#C0392B", label:"F"  };
    if (v === "FJ") return { bg:"#FEF3E0", c:"#E8A020", label:"FJ" };
    return { bg:"#F0F0F0", c:"#aaa", label:"–" };
  };

  const fmtDep = dep => {
    const colors = { Particular:"#9B7EBD", BPS:"#5B8DB8", FONASA:"#2ECC71", Mutual:"#8B7BB5", Prepaga:"#E8A020", "Obra social":"#E8719C" };
    return colors[dep] || "#9B9590";
  };

  const getRes = p => {
    const a = p.asistencias || {};
    const presentes = diasHabiles.filter(d => a[d] === "P").length;
    const faltas    = diasHabiles.filter(d => a[d] === "F").length;
    const faltasJ   = diasHabiles.filter(d => a[d] === "FJ").length;
    const tarifa = Number(p.tarifaPorSesion) || 0;
    const comp   = Number(p.complemento)     || 0;
    return { presentes, faltas, faltasJ, total: presentes * (tarifa + comp), tarifa, comp };
  };

  const currency = myPats[0]?.currency || "UYU";
  const granTotal = myPats.reduce((s,p) => s + getRes(p).total, 0);

  // Resumen por dependencia
  const deps = [...new Set(myPats.map(p => p.dependencia || "Particular"))];
  const resumenDep = deps.map(dep => {
    const pacs = myPats.filter(p => (p.dependencia || "Particular") === dep);
    return { dep, pacs, total: pacs.reduce((s,p) => s + getRes(p).total, 0) };
  });

  return (
    <div className="fu">
      <div style={{marginBottom:14}}>
        <div className="pt">📆 Asistencias y Cobros</div>
        <div className="ps">Registrá presencias y calculá lo que cobrás este mes</div>
      </div>

      {/* Selector mes */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,background:"white",borderRadius:14,padding:"12px 16px",boxShadow:"0 1px 6px rgba(0,0,0,.05)"}}>
        <button onClick={()=>cambiarMes(-1)} style={{background:"#EDE0F5",border:"none",borderRadius:8,width:34,height:34,cursor:"pointer",fontSize:18,fontWeight:700}}>‹</button>
        <div style={{flex:1,textAlign:"center",fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,textTransform:"capitalize"}}>{nomMes}</div>
        <button onClick={()=>cambiarMes(1)} style={{background:"#EDE0F5",border:"none",borderRadius:8,width:34,height:34,cursor:"pointer",fontSize:18,fontWeight:700}}>›</button>
      </div>

      {/* Leyenda */}
      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
        {[["P","Presente","#E8F8EF","#1a7a3c"],["F","Falta","#FDECEA","#C0392B"],["FJ","Justificada","#FEF3E0","#E8A020"],["–","Sin marcar","#F0F0F0","#aaa"]].map(([l,d,bg,c]) => (
          <div key={l} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#9B9590"}}>
            <div style={{width:22,height:22,borderRadius:5,background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:c}}>{l}</div>
            <span>{d}</span>
          </div>
        ))}
        <span style={{fontSize:11,color:"#9B9590"}}>· Tocá para cambiar</span>
      </div>

      {myPats.length === 0 && <div style={{textAlign:"center",padding:"30px 0",color:"#9B9590"}}>Sin pacientes activos</div>}

      {myPats.map(p => {
        const res = getRes(p);
        const dep = p.dependencia || "Particular";
        const dc  = fmtDep(dep);
        return (
          <div key={p.id} style={{background:"white",borderRadius:18,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.07)",marginBottom:14}}>
            <div style={{padding:"14px 16px",borderBottom:"1px solid #EDE0F5",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:38,height:38,borderRadius:11,background:p.color||"#9B7EBD",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:13}}>
                  {p.avatar||p.name?.slice(0,2).toUpperCase()}
                </div>
                <div>
                  <div style={{fontWeight:700,fontSize:13}}>{p.name}</div>
                  <div style={{display:"flex",gap:5,alignItems:"center",marginTop:2,flexWrap:"wrap"}}>
                    <span style={{fontSize:10,background:dc+"22",color:dc,borderRadius:6,padding:"1px 7px",fontWeight:700}}>{dep}</span>
                    <span style={{fontSize:11,color:"#9B9590"}}>${res.tarifa.toLocaleString("es-UY")}/ses{res.comp>0?` +$${res.comp.toLocaleString("es-UY")} compl.`:""}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => { setSelPat(p); setTarifaF({ dependencia:dep, tarifaPorSesion:p.tarifaPorSesion||0, complemento:p.complemento||0, currency:p.currency||"UYU" }); setEditTarifa(true); }}
                style={{background:"#F5F0FA",border:"none",borderRadius:8,padding:"6px 11px",cursor:"pointer",fontSize:11,fontWeight:700,color:"#9B7EBD"}}>
                ⚙️ Tarifa
              </button>
            </div>
            <div style={{padding:"14px 16px"}}>
              <div style={{overflowX:"auto",marginBottom:10}}>
                <div style={{display:"flex",gap:4,minWidth:"max-content",paddingBottom:4}}>
                  {diasHabiles.map(dia => {
                    const d = new Date(dia+"T12:00:00");
                    const v = (p.asistencias||{})[dia];
                    const {bg,c,label} = getColor(v);
                    return (
                      <button key={dia} onClick={() => toggleAsis(p.id, dia)}
                        style={{width:30,height:38,borderRadius:7,border:`1px solid ${c}44`,background:bg,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1,flexShrink:0}}>
                        <div style={{fontSize:8,color:"#9B9590",lineHeight:1}}>{String(d.getDate()).padStart(2,"0")}</div>
                        <div style={{fontSize:10,fontWeight:700,color:c,lineHeight:1}}>{label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
                {[["Presentes",res.presentes,"#E8F8EF","#1a7a3c"],["Faltas",res.faltas,"#FDECEA","#C0392B"],["Justif.",res.faltasJ,"#FEF3E0","#E8A020"],["A cobrar",`$${res.total.toLocaleString("es-UY")}`,`#F5F0FA`,"#9B7EBD"]].map(([l,v,bg,c]) => (
                  <div key={l} style={{background:bg,borderRadius:10,padding:"8px 6px",textAlign:"center"}}>
                    <div style={{fontSize:13,fontWeight:700,color:c,wordBreak:"break-word"}}>{v}</div>
                    <div style={{fontSize:10,color:c,marginTop:2}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Resumen por dependencia */}
      {myPats.length > 0 && (
        <div style={{marginTop:8}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>📊 Resumen por dependencia</div>
          {resumenDep.map(({dep, pacs, total}) => {
            const dc = fmtDep(dep);
            return (
              <div key={dep} style={{background:"white",borderRadius:14,padding:"12px 16px",marginBottom:8,border:`1.5px solid ${dc}33`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:dc}}/>
                    <span style={{fontWeight:700,fontSize:14,color:dc}}>{dep}</span>
                    <span style={{fontSize:11,color:"#9B9590"}}>({pacs.length} pac.)</span>
                  </div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:dc}}>${total.toLocaleString("es-UY")}</div>
                </div>
                {pacs.map(p => {
                  const r = getRes(p);
                  return (
                    <div key={p.id} style={{padding:"5px 0",borderTop:"1px solid #EDE0F5",fontSize:12}}>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <span style={{fontWeight:600}}>{p.name}</span>
                        <span style={{fontWeight:700,color:dc}}>${r.total.toLocaleString("es-UY")}</span>
                      </div>
                      <div style={{color:"#9B9590",fontSize:11}}>{r.presentes} ses. × ${r.tarifa.toLocaleString("es-UY")}{r.comp>0?` + $${r.comp.toLocaleString("es-UY")} compl.`:""}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div style={{background:"linear-gradient(135deg,#9B7EBD,#7B5EA7)",borderRadius:16,padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.8)",marginBottom:2}}>TOTAL A COBRAR ESTE MES</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.65)"}}>Todas las dependencias</div>
            </div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:"white"}}>${granTotal.toLocaleString("es-UY")} {currency}</div>
          </div>
        </div>
      )}

      {/* Modal editar tarifa */}
      {editTarifa && selPat && (
        <div className="overlay" onClick={() => { setEditTarifa(false); setSelPat(null); }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="xbtn" onClick={() => { setEditTarifa(false); setSelPat(null); }}>✕</button>
            <div className="modalt">⚙️ {selPat.name}</div>
            <div className="alert alrti">Configurá dependencia, tarifa y complemento por sesión.</div>
            <div className="fg">
              <label className="lbl">Dependencia</label>
              <select className="inp" value={tarifaF.dependencia} onChange={e => setTarifaF({...tarifaF, dependencia:e.target.value})}>
                {["Particular","BPS","FONASA","Mutual","Prepaga","Obra social","Otro"].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="fg">
              <label className="lbl">Moneda</label>
              <select className="inp" value={tarifaF.currency} onChange={e => setTarifaF({...tarifaF, currency:e.target.value})}>
                <option value="UYU">UYU</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div className="fg">
                <label className="lbl">Tarifa/sesión</label>
                <input className="inp" type="number" min="0" value={tarifaF.tarifaPorSesion}
                  onChange={e => setTarifaF({...tarifaF, tarifaPorSesion:parseFloat(e.target.value)||0})}/>
              </div>
              <div className="fg">
                <label className="lbl">Complemento</label>
                <input className="inp" type="number" min="0" value={tarifaF.complemento}
                  onChange={e => setTarifaF({...tarifaF, complemento:parseFloat(e.target.value)||0})}/>
              </div>
            </div>
            <div style={{background:"#F5F0FA",borderRadius:12,padding:14,marginBottom:12}}>
              <div style={{fontSize:11,fontWeight:700,color:"#9B9590",marginBottom:8,textTransform:"uppercase"}}>Vista previa</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[
                  ["Tarifa",     `$${(tarifaF.tarifaPorSesion||0).toLocaleString("es-UY")}`],
                  ["Complemento",`$${(tarifaF.complemento||0).toLocaleString("es-UY")}`],
                  ["Total/ses.", `$${((tarifaF.tarifaPorSesion||0)+(tarifaF.complemento||0)).toLocaleString("es-UY")}`],
                  ["12 ses.",    `$${(((tarifaF.tarifaPorSesion||0)+(tarifaF.complemento||0))*12).toLocaleString("es-UY")}`],
                ].map(([l,v]) => (
                  <div key={l} style={{background:"white",borderRadius:8,padding:"8px 10px"}}>
                    <div style={{fontSize:10,color:"#9B9590"}}>{l}</div>
                    <div style={{fontSize:13,fontWeight:700,color:"#9B7EBD"}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <button className="btn btnp btnfull" onClick={() => {
              setPatients(prev => prev.map(p => p.id === selPat.id ? {...p,...tarifaF} : p));
              setEditTarifa(false); setSelPat(null);
            }}>Guardar tarifa</button>
            <button className="btn btng btnfull" onClick={() => { setEditTarifa(false); setSelPat(null); }}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TEA / AUTISMO ────────────────────────────────────────────────────────────
const TEA_OBJETIVOS = [
  { area:"Comunicación social", icon:"💬", color:"#5B8DB8",
    niveles:{
      "1":["Mantener contacto visual 3-5 seg en contexto natural","Responder a su nombre al primer llamado","Señalar para pedir y compartir interés","Usar gestos protodeclarativos (mostrar, dar)","Iniciar interacción con par familiar","Imitar gestos simples con modelo"],
      "2":["Sostener contacto visual en conversación","Iniciar interacción espontánea con adulto","Usar lenguaje funcional para necesidades básicas","Responder preguntas simples Sí/No","Saludar y despedirse con apoyo","Usar 2-3 palabras para comunicar"],
      "3":["Responder a nombre con apoyo físico","Establecer contacto visual ocasional","Tolerar proximidad del adulto","Aceptar juego cara a cara brevemente","Comunicar rechazo de forma funcional","Usar un medio CAA para pedir"],
    }},
  { area:"Juego", icon:"🎮", color:"#9B7EBD",
    niveles:{
      "1":["Juego simbólico espontáneo con objetos","Juego paralelo sostenido 5+ min","Turnos en juego de mesa simple","Juego cooperativo con reglas básicas","Invitar a par al juego","Tolerar cambio de actividad lúdica"],
      "2":["Juego funcional con objetos reales","Juego simbólico con modelo adulto","Turno simple en juego estructurado (2 pers.)","Juego paralelo con tolerancia","Seguir una regla de juego","Imitar juego de otro niño"],
      "3":["Explorar objetos de forma funcional","Tolerar presencia de otro niño","Aceptar juego propuesto por adulto","Participar en actividad sensoriomotriz","Juego de causa-efecto simple","Mantener actividad 2-3 min"],
    }},
  { area:"Regulación sensorial", icon:"🌀", color:"#E8A020",
    niveles:{
      "1":["Identificar y comunicar estado sensorial","Usar herramientas de regulación de forma autónoma","Solicitar pausa en ambiente escolar","Tolerar cambios de rutina con anticipación","Adaptar nivel de activación a la demanda","Transicionar entre ambientes con mínimo apoyo"],
      "2":["Usar herramienta de regulación con señal","Tolerar estímulos táctiles cotidianos","Aceptar cambio de actividad con aviso previo","Identificar sensación de sobreestimulación","Solicitar pausa con apoyo","Reducir conductas sensoriales disruptivas"],
      "3":["Tolerar contacto físico necesario (higiene)","Aceptar estímulos auditivos cotidianos","Permanecer en espacio cerrado sin crisis","Tolerar luz artificial","Aceptar texturas alimenticias básicas","Reducir conductas autoestimulatorias en sesión"],
    }},
  { area:"CAA", icon:"🗣️", color:"#2ECC71",
    niveles:{
      "1":["Construir frases de 4+ elementos con CAA","Comentar espontáneamente con dispositivo","Hacer preguntas con CAA","Narrar evento reciente con apoyo","Rechazar y negociar con CAA","Usar CAA en contexto escolar"],
      "2":["Usar pictogramas para elegir entre 2 opciones","Construir frases SVO con CAA","Hacer pedidos completos con dispositivo","Rechazar con CAA","Responder preguntas básicas con apoyo","Iniciar comunicación con CAA"],
      "3":["Usar 1 símbolo para pedir objeto deseado","Responder a DAME con imagen","Intercambiar imagen por objeto (PECS fase 1-2)","Elegir entre 2 opciones con pictograma","Indicar NO con imagen o gesto","Usar dispositivo para rutina diaria"],
    }},
  { area:"Vida diaria", icon:"🏠", color:"#E8719C",
    niveles:{
      "1":["Seguir rutina visual de forma autónoma","Completar secuencia de higiene independiente","Preparar material escolar solo","Comer variedad de texturas","Vestirse y desvestirse solo","Tolerar cambios de ambiente sin crisis"],
      "2":["Seguir rutina visual con apoyo mínimo","Completar secuencia de higiene con guía verbal","Preparar mochila con lista visual","Comer 5+ alimentos variados","Vestirse con apoyo en pasos difíciles","Aceptar cambio anticipado con pictograma"],
      "3":["Seguir rutina visual de 3 pasos con apoyo","Tolerar higiene básica (lavado de manos, dientes)","Comer alimentos de textura aceptada","Cooperar en vestido","Participar en actividades de casa básicas","Transicionar entre actividades con apoyo físico"],
    }},
  { area:"Conducta", icon:"🎯", color:"#C0392B",
    niveles:{
      "1":["Tolerar frustración moderada sin crisis","Aceptar No con regulación","Esperar turno 2 min","Responder a límites verbales","Transicionar entre actividades sin oposición","Reparar interacción luego de conflicto"],
      "2":["Reducir frecuencia de rabietas a 1/semana","Esperar turno 30-60 seg con apoyo","Aceptar No con regulación parcial","Transicionar con aviso previo","Reducir conducta repetitiva en sesión","Seguir instrucción de 2 pasos"],
      "3":["Reducir conducta autolesiva con plan de intervención","Tolerar demora de 10 seg antes de recibir reforzador","Aceptar redirección física","Esperar turno 10 seg con objeto preferido","Seguir instrucción de 1 paso","Reducir estereotipias que interfieren con aprendizaje"],
    }},
  { area:"Funciones ejecutivas", icon:"🧠", color:"#8B7BB5",
    niveles:{
      "1":["Planificar tarea de 3 pasos de forma autónoma","Inhibir respuesta ante distractor","Flexibilidad ante cambio de plan","Memoria de trabajo para 2-3 elementos","Organizar materiales independientemente","Automonitorear progreso en tarea"],
      "2":["Planificar tarea de 2 pasos con soporte visual","Inhibir respuesta impulsiva con señal","Aceptar cambio de plan con anticipación","Recordar 2 instrucciones consecutivas","Organizar materiales con lista","Reconocer error propio con apoyo"],
      "3":["Completar tarea de 1 paso con apoyo","Inhibir conducta ante señal física","Aceptar cambio con objeto de transición","Recordar 1 instrucción simple","Buscar material necesario con guía","Mantener atención en tarea 3-5 min"],
    }},
];

const ESTRATEGIAS_TEA = [
  { nombre:"TEACCH",              desc:"Estructuración física y visual. Trabajo izquierda a derecha con cestos y cajas.", icon:"📐" },
  { nombre:"ABA",                 desc:"Análisis conductual aplicado. Refuerzo positivo sistemático de conductas objetivo.", icon:"🎯" },
  { nombre:"PECS",                desc:"Sistema de comunicación por intercambio de imágenes. 6 fases progresivas.", icon:"🖼️" },
  { nombre:"Historias Sociales",  desc:"Narrativas personalizadas que explican situaciones sociales y conductas esperadas.", icon:"📖" },
  { nombre:"DIR/Floortime",       desc:"Desarrollo basado en diferencias individuales. Seguir el liderazgo del niño.", icon:"🌱" },
  { nombre:"Integración Sensorial",desc:"Intervención basada en procesamiento sensorial. Actividades de modulación.", icon:"🌀" },
];

function TEAAutismo() {
  const [tab, setTab]     = useState("objetivos");
  const [nivel, setNivel] = useState("1");
  const [selArea, setSelArea] = useState(null);

  const niveles = [
    { n:"1", label:"Nivel 1 — Necesita apoyo",                color:"#E8A020" },
    { n:"2", label:"Nivel 2 — Apoyo sustancial",              color:"#E8719C" },
    { n:"3", label:"Nivel 3 — Apoyo muy sustancial",          color:"#C0392B" },
  ];

  return (
    <div className="fu">
      <div style={{marginBottom:14}}>
        <div className="pt">🌈 TEA / Autismo</div>
        <div className="ps">Objetivos, estrategias y recursos basados en evidencia</div>
      </div>

      <div className="atabrow">
        {[["objetivos","🎯 Objetivos"],["estrategias","🛠 Estrategias"],["recursos","📚 Recursos"]].map(([id,l]) => (
          <button key={id} className={`atab${tab===id?" active":""}`} onClick={()=>setTab(id)}>{l}</button>
        ))}
      </div>

      {tab === "objetivos" && (
        <div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:11,fontWeight:700,color:"#9B9590",textTransform:"uppercase",display:"block",marginBottom:4}}>Nivel DSM-5</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {niveles.map(nv => (
                <button key={nv.n} onClick={()=>setNivel(nv.n)}
                  style={{padding:"7px 12px",borderRadius:20,border:`2px solid ${nivel===nv.n?nv.color:"#EDE0F5"}`,background:nivel===nv.n?nv.color+"22":"white",color:nivel===nv.n?nv.color:"#6B6560",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"sans-serif"}}>
                  Nivel {nv.n}
                </button>
              ))}
            </div>
          </div>
          {TEA_OBJETIVOS.map(a => (
            <div key={a.area} style={{background:"white",borderRadius:18,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.07)",marginBottom:12}}>
              <div style={{padding:"14px 16px",borderBottom:"1px solid #EDE0F5",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}} onClick={()=>setSelArea(selArea===a.area?null:a.area)}>
                <span style={{fontWeight:700,fontSize:14,color:a.color}}>{a.icon} {a.area}</span>
                <span style={{fontSize:12,color:"#9B9590"}}>{selArea===a.area?"▲":"▼"} {(a.niveles?.[nivel]||[]).length} obj.</span>
              </div>
              {selArea === a.area && (
                <div style={{padding:"14px 16px"}}>
                  {(a.niveles?.[nivel] || []).map((obj,i) => (
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"7px 0",borderBottom:i<(a.niveles?.[nivel]||[]).length-1?"1px solid #EDE0F5":"none"}}>
                      <div style={{width:20,height:20,borderRadius:6,background:a.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:a.color,flexShrink:0,marginTop:1}}>{i+1}</div>
                      <div style={{fontSize:13,color:"#2C2C2C",lineHeight:1.4}}>{obj}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "estrategias" && (
        <div>
          {ESTRATEGIAS_TEA.map(e => (
            <div key={e.nombre} style={{background:"white",borderRadius:14,padding:14,marginBottom:10,boxShadow:"0 1px 8px rgba(0,0,0,.06)"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                <div style={{fontSize:24,flexShrink:0}}>{e.icon}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:14,color:"#2C2C2C",marginBottom:4}}>{e.nombre}</div>
                  <div style={{fontSize:13,color:"#6B6560",lineHeight:1.5}}>{e.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "recursos" && (
        <div>
          {[
            { titulo:"Guía DSM-5 TEA", desc:"Criterios diagnósticos y niveles de apoyo.", link:"https://www.psychiatry.org", icon:"📋" },
            { titulo:"TEACCH Program",  desc:"Recursos y formación en estructuración visual.", link:"https://teacch.com", icon:"📐" },
            { titulo:"PECS Pyramid",    desc:"Sistema oficial de comunicación por intercambio.", link:"https://pecsusa.com", icon:"🖼️" },
            { titulo:"Autism Speaks",   desc:"Recursos para familias y profesionales.", link:"https://www.autismspeaks.org", icon:"🌈" },
          ].map(r => (
            <div key={r.titulo} style={{background:"white",borderRadius:14,padding:14,marginBottom:10,cursor:"pointer",boxShadow:"0 1px 8px rgba(0,0,0,.06)"}} onClick={()=>window.open(r.link,"_blank")}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{fontSize:22}}>{r.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:13,color:"#2C2C2C"}}>{r.titulo}</div>
                  <div style={{fontSize:12,color:"#9B9590"}}>{r.desc}</div>
                </div>
                <div style={{fontSize:12,color:"#9B7EBD"}}>→</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MODAL SUSCRIPCIÓN VENCIDA ────────────────────────────────────────────────

function Footer() {
  return (
    <div style={{ textAlign:"center", padding:"14px 20px", fontSize:11, color:"#9B9590", borderTop:"1px solid #EDE0F5", marginTop:"auto" }}>
      <div style={{ fontWeight:700, color:"#7B5EA7", marginBottom:3 }}>Hadrion — Plataforma Terapeutica</div>
      <div>(c) 2025 Adriana Soba. Todos los derechos reservados.</div>
      <div style={{ marginTop:2 }}>Desarrollado en Uruguay · comunipro12@gmail.com</div>
      <div style={{ marginTop:2, fontSize:10 }}>Propiedad intelectual protegida. Prohibida su reproduccion sin autorizacion expresa.</div>
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────

// ═══════════════════════════════════════
// IA TERAPEUTICA - Powered by Groq API
// ═══════════════════════════════════════
// ─── BANCO DE OBJETIVOS ───────────────────────────────────────────────────────
const GOALS_DB = {
  "Fonoaudiología": [
    { area:"Articulación", color:"#5B8DB8", icon:"🗣️", goals:[
      "Producir /s/ en posición inicial en palabras aisladas con 80% de precisión",
      "Producir /r/ vibrante en posición intervocálica en palabras aisladas",
      "Discriminar auditivamente pares mínimos con /p/-/b/ en el 80% de los intentos",
      "Corregir procesos de simplificación fonológica en habla espontánea",
      "Producir grupos consonánticos /pl/, /bl/, /cl/ en sílabas y palabras",
      "Generalizar fonema trabajado a nivel de frase en contexto clínico",
    ]},
    { area:"Lenguaje comprensivo", color:"#9B7EBD", icon:"👂", goals:[
      "Seguir instrucciones de 2 pasos en el 80% de los intentos",
      "Comprender preguntas ¿qué?, ¿quién?, ¿dónde? en cuentos escuchados",
      "Identificar absurdos verbales en oraciones simples",
      "Comprender relaciones causales en textos narrados",
      "Responder preguntas inferenciales sobre texto escuchado",
      "Ejecutar instrucciones con conceptos espaciales (arriba, abajo, adelante)",
    ]},
    { area:"Lenguaje expresivo", color:"#2ECC71", icon:"💬", goals:[
      "Producir frases de 4-5 palabras con estructura sujeto-verbo-objeto",
      "Usar conectores causales (porque, entonces) en narración espontánea",
      "Narrar secuencia de 3 eventos en orden cronológico",
      "Usar morfemas de género y número de forma consistente",
      "Describir objetos con 3 atributos (color, forma, función)",
      "Ampliar vocabulario de categorías semánticas a 20 ítems por categoría",
    ]},
    { area:"Lectoescritura", color:"#E8719C", icon:"📖", goals:[
      "Leer texto de nivel escolar con fluidez de 60+ palabras por minuto",
      "Discriminar letras de grafía similar (b/d, p/q) sin errores",
      "Escribir palabras con grupos consonánticos sin omisiones",
      "Comprender texto leído respondiendo 3 preguntas literales",
      "Segmentar palabras en sílabas de forma autónoma",
      "Identificar idea principal de párrafo corto",
    ]},
    { area:"Conciencia fonológica", color:"#E8A020", icon:"🔤", goals:[
      "Identificar el sonido inicial de palabras con 90% de precisión",
      "Segmentar palabras bisilábicas en sílabas de forma autónoma",
      "Producir rimas con palabras dadas en el 80% de los intentos",
      "Fusionar sílabas para formar palabras de 3 sílabas",
      "Identificar y suprimir sílaba inicial o final de palabra",
      "Manipular fonemas en palabras monosilábicas",
    ]},
    { area:"Comunicación aumentativa", color:"#C0392B", icon:"🗺️", goals:[
      "Usar sistema CAA para hacer pedidos en contexto clínico",
      "Construir frases de 2 elementos con pictogramas",
      "Usar CAA para rechazar de forma funcional",
      "Generalizar uso de CAA a contexto familiar",
      "Ampliar vocabulario en dispositivo CAA a 50+ símbolos",
      "Comentar eventos con CAA en sesión",
    ]},
  ],
  "Psicología": [
    { area:"Regulación emocional", color:"#5B8DB8", icon:"🌡️", goals:[
      "Identificar y nombrar 5 emociones básicas en situaciones ficticias",
      "Aplicar técnica de respiración diafragmática de forma autónoma",
      "Reducir intensidad de ansiedad de 8 a 4 (escala 0-10) en 20 min",
      "Usar al menos 1 estrategia de regulación ante situación estresante",
      "Registrar estado emocional diario durante 4 semanas",
      "Identificar disparadores de ansiedad en situaciones cotidianas",
    ]},
    { area:"Pensamientos y cognición", color:"#9B7EBD", icon:"🧠", goals:[
      "Identificar pensamientos automáticos negativos en 3 situaciones por semana",
      "Aplicar reestructuración cognitiva de forma guiada en sesión",
      "Generar 3 pensamientos alternativos ante evento negativo",
      "Reconocer al menos 2 distorsiones cognitivas propias",
      "Reducir creencia en pensamiento negativo de 90% a 40%",
      "Completar registro ABC de forma autónoma por 4 semanas",
    ]},
    { area:"Conducta y hábitos", color:"#E8A020", icon:"🎯", goals:[
      "Mantener rutina de sueño consistente durante 3 semanas",
      "Reducir conductas evitativas de 5 a 2 por semana",
      "Completar exposición al ítem más bajo de jerarquía",
      "Aumentar actividades placenteras a 3 por semana",
      "Cumplir tarea para el hogar en el 80% de las sesiones",
      "Establecer horario de estudio/trabajo consistente",
    ]},
    { area:"Vínculos y habilidades sociales", color:"#2ECC71", icon:"🤝", goals:[
      "Iniciar conversación con persona conocida 3 veces por semana",
      "Expresar opinión propia en situación de grupo",
      "Establecer límite verbal ante petición excesiva",
      "Sostener conversación de 5 minutos con par",
      "Reducir conductas de sumisión excesiva",
      "Comunicar necesidad emocional a persona de confianza",
    ]},
  ],
  "Psicopedagogía": [
    { area:"Lectura y comprensión", color:"#5B8DB8", icon:"📖", goals:[
      "Leer texto de nivel con fluidez de 80+ palabras por minuto",
      "Identificar idea principal de 3 párrafos consecutivos",
      "Responder preguntas inferenciales con 70% de precisión",
      "Subrayar información relevante de forma autónoma",
      "Construir mapa conceptual a partir de texto leído",
      "Resumir texto en 3-5 oraciones propias",
    ]},
    { area:"Escritura y expresión", color:"#E8719C", icon:"✍️", goals:[
      "Producir texto de 5 oraciones sobre tema dado sin apoyo",
      "Respetar concordancia de género y número en escrito",
      "Organizar ideas en inicio-desarrollo-cierre",
      "Revisar y corregir propio texto escrito",
      "Usar signos de puntuación básicos de forma consistente",
      "Ampliar vocabulario escrito a nivel de edad",
    ]},
    { area:"Matemática", color:"#E8A020", icon:"🔢", goals:[
      "Resolver operaciones básicas de nivel escolar sin apoyo",
      "Resolver problemas de 1 paso con enunciado escrito",
      "Aplicar estrategia de resolución de problemas de 4 pasos",
      "Reconocer valor posicional hasta los miles",
      "Calcular área y perímetro de figuras simples",
      "Interpretar gráficos de barras y torta",
    ]},
    { area:"Aprendizaje y hábitos", color:"#9B7EBD", icon:"🗂️", goals:[
      "Copiar tarea en agenda diariamente durante 4 semanas",
      "Organizar carpetas por materia de forma autónoma",
      "Estudiar usando técnica de repaso espaciado",
      "Mantener atención en tarea por 20 min sin distracción",
      "Completar trabajo escolar antes de actividades recreativas",
      "Buscar ayuda cuando no comprende la consigna",
    ]},
  ],
  "Terapia Ocupacional": [
    { area:"Motricidad fina", color:"#5B8DB8", icon:"✋", goals:[
      "Completar laberinto de 10 cm sin salir del camino",
      "Recortar en línea curva con tijera con precisión del 80%",
      "Copiar figura geométrica compleja sin modelo",
      "Abrochar 5 botones en menos de 2 minutos",
      "Sostener lápiz en trípode dinámico de forma consistente",
      "Escribir nombre propio con tamaño y presión adecuados",
    ]},
    { area:"AVD e independencia", color:"#2ECC71", icon:"🏠", goals:[
      "Vestirse completamente en 10 minutos de forma independiente",
      "Atar cordones de zapatillas sin asistencia",
      "Preparar desayuno simple de 2 elementos",
      "Realizar higiene matutina completa con lista visual",
      "Desplazarse en entorno conocido de forma independiente",
      "Usar transporte escolar de forma autónoma",
    ]},
    { area:"Integración sensorial", color:"#E8A020", icon:"🌀", goals:[
      "Tolerar texturas táctiles cotidianas sin reacción adversa",
      "Permanecer en ambiente ruidoso 20 min con estrategia",
      "Usar herramienta de regulación sensorial de forma autónoma",
      "Reducir conductas de búsqueda sensorial disruptivas",
      "Tolerar cambios de temperatura en actividades de rutina",
      "Participar en actividades físicas variadas sin negativa",
    ]},
  ],
};

function GoalBank({ user }) {
  const [selEspecialidad, setSelEspecialidad] = useState(null);
  const [selArea, setSelArea] = useState(null);
  const [copied, setCopied] = useState(null);
  const [search, setSearch] = useState("");

  const specKey = Object.keys(GOALS_DB).find(k =>
    (user?.specialty||"").toLowerCase().includes(k.toLowerCase().split("/")[0].toLowerCase())
  ) || "Fonoaudiología";

  const activeSpec = selEspecialidad || specKey;
  const areas = GOALS_DB[activeSpec] || [];

  const filtered = selArea
    ? areas.filter(a => a.area === selArea)
    : areas;

  const searchFiltered = search
    ? filtered.map(a => ({...a, goals: a.goals.filter(g => g.toLowerCase().includes(search.toLowerCase()))})).filter(a => a.goals.length > 0)
    : filtered;

  const copyGoal = (goal, i) => {
    navigator.clipboard?.writeText(goal);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="fu">
      <div style={{marginBottom:14}}>
        <div className="pt">🎯 Objetivos Terapéuticos</div>
        <div className="ps">Banco de objetivos por especialidad — tocá para copiar</div>
      </div>

      {/* Selector especialidad */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
        {Object.keys(GOALS_DB).map(k => (
          <button key={k} onClick={()=>{setSelEspecialidad(k);setSelArea(null);}}
            className={`filbtn${activeSpec===k?" active":""}`}>{k}</button>
        ))}
      </div>

      {/* Búsqueda */}
      <input className="inp" style={{marginBottom:12}}
        placeholder="🔍 Buscar objetivo..." value={search}
        onChange={e=>setSearch(e.target.value)}/>

      {/* Filtro de área */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
        <button className={`filbtn${!selArea?" active":""}`} onClick={()=>setSelArea(null)}>Todas las áreas</button>
        {areas.map(a => (
          <button key={a.area} className={`filbtn${selArea===a.area?" active":""}`}
            onClick={()=>setSelArea(selArea===a.area?null:a.area)}>{a.icon} {a.area}</button>
        ))}
      </div>

      {/* Objetivos */}
      {searchFiltered.map(area => (
        <div key={area.area} style={{background:"white",borderRadius:18,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.07)",marginBottom:12}}>
          <div style={{padding:"12px 16px",borderBottom:"1px solid #EDE0F5",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,borderRadius:10,background:area.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{area.icon}</div>
            <div style={{fontWeight:700,fontSize:14,color:area.color}}>{area.area}</div>
            <div style={{marginLeft:"auto",fontSize:11,color:"#9B9590"}}>{area.goals.length} objetivos</div>
          </div>
          <div style={{padding:"10px 16px"}}>
            {area.goals.map((g,i) => {
              const gKey = area.area+i;
              return (
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"8px 0",borderBottom:i<area.goals.length-1?"1px solid #F5F0FA":"none"}}>
                  <div style={{flex:1,fontSize:13,color:"#2C2C2C",lineHeight:1.5}}>{g}</div>
                  <button onClick={()=>copyGoal(g,gKey)}
                    style={{background:copied===gKey?"#E8F8EF":"#F5F0FA",border:"none",borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:700,cursor:"pointer",color:copied===gKey?"#1a7a3c":"#9B7EBD",flexShrink:0,fontFamily:"sans-serif",transition:"all .15s"}}>
                    {copied===gKey?"✅ Copiado":"📋 Copiar"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {searchFiltered.length === 0 && (
        <div style={{textAlign:"center",padding:"32px 0",color:"#9B9590",fontSize:13}}>
          Sin resultados para "{search}"
        </div>
      )}
    </div>
  );
}


// ─── IA CHAT TERAPÉUTICO ──────────────────────────────────────────────────────
function IAAsistente({ patients, C, documentos=[], setDocumentos=()=>{}, chatHistory=null, setChatHistory=null }) {
  const SYSTEM_PROMPT = `Sos una asistente IA especializada en terapias de salud y educación, integrada en la plataforma Hadrion desarrollada por Adriana Soba (fonoaudióloga, Uruguay).

Tu función es ayudar a profesionales terapéuticos (fonoaudiólogos, psicólogos, psicopedagogos, terapeutas ocupacionales, etc.) a generar documentación clínica de alta calidad en español rioplatense.

PODÉS GENERAR:
- Informes de progreso para familias
- Informes de evaluación formal
- Objetivos terapéuticos específicos y medibles
- Planes terapéuticos mensuales
- Cartas para la escuela / instituciones
- Recomendaciones para el hogar
- Anamnesis completas
- Análisis de seguimiento
- Actividades terapéuticas adaptadas al diagnóstico

ESTILO DE ESCRITURA:
- Lenguaje profesional pero comprensible para familias cuando corresponda
- Español rioplatense (vos, vocabulario uruguayo/rioplatense)
- Usar terminología clínica correcta
- Informes formales con estructura clara: datos del paciente, objetivos, evolución, recomendaciones
- Cuando generés un informe formal, incluí encabezado con: nombre del profesional, especialidad, fecha, datos del paciente

IMPORTANTE:
- Basate siempre en los datos del paciente que te provea el profesional
- Si no tenés datos suficientes, generá el documento con espacios marcados como [COMPLETAR]
- Nunca inventés diagnósticos ni datos médicos que no te fueron provistos
- Podés sugerir objetivos basados en el diagnóstico conocido, aclarando que son sugerencias

Respondé de forma útil, concisa y profesional.`;

  const defaultMsg = [{ role:"assistant", content:"¡Hola! Soy tu Asistente IA Terapéutico 🧠\n\nPuedo ayudarte a generar informes, objetivos, planes terapéuticos, cartas para la escuela y más.\n\nPara empezar:\n1. Seleccioná un paciente (opcional)\n2. Tocá \"Cargar datos\" si elegiste uno\n3. Escribí lo que necesitás o usá los accesos rápidos\n\n¿En qué te ayudo hoy?" }];

  const [messages, setMessagesLocal] = React.useState(chatHistory || defaultMsg);
  const setMessages = (v) => {
    const val = typeof v === "function" ? v(messages) : v;
    setMessagesLocal(val);
    if (setChatHistory) setChatHistory(val);
  };
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [selPat, setSelPat] = React.useState("");
  const [especialidad, setEspecialidad] = React.useState("fonoaudióloga");
  const [editIdx, setEditIdx] = React.useState(null);
  const [editText, setEditText] = React.useState("");
  const [error, setError] = React.useState(null);
  const bottomRef = React.useRef(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, loading]);

  const getPatientCtx = (p) => {
    if (!p) return "";
    return `[DATOS DEL PACIENTE]
Nombre: ${p.name} | Edad: ${p.age} años | Diagnóstico: ${p.diagnosis}
Sesiones realizadas: ${p.sessions || 0}
Tutor: ${p.guardian || "no especificado"}
Teléfono: ${p.phone || "no especificado"}
Notas clínicas: ${p.notes || "sin notas"}
Objetivos: ${(p.goals||[]).join(", ") || "no especificados"}
Motivo de consulta: ${p.motivo || "no especificado"}
Antecedentes: ${p.antecedentes || "no especificados"}
Desarrollo: ${p.desarrollo || "no especificado"}
Conducta en sesión: ${p.conducta || "no especificado"}
Diagnóstico presuntivo: ${p.diagnosticoP || "no especificado"}
[FIN DATOS]`;
  };

  const loadPatient = () => {
    const p = patients.find(x => x.name === selPat);
    if (!p) return;
    const ctx = getPatientCtx(p);
    const msg = { role:"user", content:`Cargá estos datos del paciente para el contexto de la consulta:\n\n${ctx}` };
    const resp = { role:"assistant", content:`✅ Datos de **${p.name}** cargados correctamente.\n\nTengo en contexto:\n• Diagnóstico: ${p.diagnosis}\n• Edad: ${p.age} años\n• Sesiones realizadas: ${p.sessions || 0}\n• Objetivos: ${(p.goals||[]).slice(0,2).join(", ")}${(p.goals||[]).length > 2 ? "..." : ""}\n\n¿Qué querés que genere?\n• "Haceme un informe de progreso para la familia"\n• "Generame 6 objetivos terapéuticos"\n• "Redactá un informe de evaluación formal"\n• "Carta para la escuela"` };
    setMessages(prev => [...prev, msg, resp]);
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    setError(null);
    const userMsg = { role:"user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const apiMessages = newMessages
      .filter(m => m.role === "user" || m.role === "assistant")
      .map(m => ({ role: m.role, content: m.content }));

    const systemWithEspecialidad = SYSTEM_PROMPT + `\n\nEl profesional que usa esta sesión es ${especialidad}.`;

    try {
      const response = await fetch("https://hadrion-ai.comunipro12.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemWithEspecialidad,
          messages: apiMessages,
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Error ${response.status}`);
      }

      const data = await response.json();
      const content = data.content || (data.error ? null : []);
      if (!content) throw new Error(data.error?.message || "Error de la API");
      const text = content.filter(b => b.type === "text").map(b => b.text).join("\n") || "Sin respuesta.";

      setMessages(prev => [...prev, { role:"assistant", content: text }]);
    } catch (err) {
      console.error("IA error:", err);
      setError(err.message || "Error al conectar con la IA");
      setMessages(prev => [...prev, {
        role:"assistant",
        content:`⚠️ Error al conectar con la IA: ${err.message || "Error desconocido"}.\n\nIntentá de nuevo en unos segundos.`
      }]);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (i, text) => { setEditIdx(i); setEditText(text); };
  const saveEdit = (i) => {
    setMessages(prev => prev.map((m,idx) => idx===i ? {...m, content:editText} : m));
    setEditIdx(null);
  };

  const clearChat = () => {
    const fresh = [{ role:"assistant", content:"Chat reiniciado 🔄 ¿Con qué empezamos?" }];
    setMessagesLocal(fresh);
    if (setChatHistory) setChatHistory(fresh);
    setSelPat("");
    setError(null);
  };

  const quickPrompts = [
    "Informe de progreso para la familia",
    "6 objetivos terapéuticos",
    "Completar anamnesis",
    "Informe de evaluación formal",
    "Plan terapéutico mensual",
    "Carta para la escuela",
    "Recomendaciones para el hogar",
    "Análisis de seguimiento",
  ];

  return (
    <div className="fu" style={{display:"flex",flexDirection:"column",height:"calc(100vh - 120px)",minHeight:500}}>
      {/* Header */}
      <div style={{marginBottom:10}}>
        <div className="pt">🧠 Asistente IA</div>
        <div className="ps">Chat clínico con memoria — Powered by Claude AI</div>
      <div style={{background:"#F5F0FA",borderRadius:12,padding:"10px 14px",marginBottom:10,fontSize:12,color:"#6B6560",lineHeight:1.6}}>
        💡 <strong>Cómo usarlo:</strong> Seleccioná un paciente → tocá "Cargar datos" → escribí lo que necesitás (ej: <em>"haceme un informe para la familia"</em>) → la IA genera el texto → lo editás y lo enviás.
      </div>
      </div>

      {/* Config bar */}
      <div style={{background:"white",borderRadius:14,padding:12,marginBottom:10,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",boxShadow:"0 1px 6px rgba(0,0,0,.06)"}}>
        <select className="inp" style={{flex:1,minWidth:140,maxWidth:200}} value={especialidad} onChange={e=>setEspecialidad(e.target.value)}>
          {["fonoaudióloga","psicóloga","psicopedagoga","psicomotricista","terapeuta ocupacional","fisioterapeuta"].map(s=><option key={s}>{s}</option>)}
        </select>
        <select className="inp" style={{flex:2,minWidth:160}} value={selPat} onChange={e=>setSelPat(e.target.value)}>
          <option value="">Seleccioná paciente (opcional)</option>
          {patients.filter(p=>p.status==="active").map(p=>(
            <option key={p.id} value={p.name}>{p.name} — {p.age}a — {p.diagnosis}</option>
          ))}
        </select>
        {selPat && (
          <button className="btn btnp btnsm" onClick={loadPatient}>
            📋 Cargar datos
          </button>
        )}
        <button className="btn btng btnsm" onClick={clearChat} title="Reiniciar chat">🗑️</button>
      </div>

      {/* Quick prompts */}
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:6,marginBottom:8}}>
        {quickPrompts.map(p=>(
          <button key={p} onClick={()=>{setInput(p);}}
            style={{padding:"6px 12px",borderRadius:20,border:"1.5px solid #EDE0F5",background:"white",fontSize:11,fontWeight:500,cursor:"pointer",whiteSpace:"nowrap",color:"#6B6560",fontFamily:"sans-serif",flexShrink:0}}>
            {p}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:10,paddingRight:4,marginBottom:10}}>
        {messages.map((m,i) => (
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.role==="user"?"flex-end":"flex-start"}}>
            <div style={{
              maxWidth:"90%",
              background: m.role==="user" ? "linear-gradient(135deg,#9B7EBD,#7B5EA7)" : "white",
              color: m.role==="user" ? "white" : "#2C2C2C",
              borderRadius: m.role==="user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding:"12px 16px",
              fontSize:13,lineHeight:1.7,
              boxShadow:"0 1px 6px rgba(0,0,0,.08)",
              whiteSpace:"pre-wrap",wordBreak:"break-word",
              border: m.role==="assistant" ? "1px solid #EDE0F5" : "none"
            }}>
              {editIdx === i ? (
                <div>
                  <textarea style={{width:"100%",minHeight:120,border:"1px solid #EDE0F5",borderRadius:8,padding:8,fontSize:12,lineHeight:1.6,resize:"vertical",fontFamily:"sans-serif"}}
                    value={editText} onChange={e=>setEditText(e.target.value)}/>
                  <div style={{display:"flex",gap:6,marginTop:6}}>
                    <button className="btn btnp btnsm" onClick={()=>saveEdit(i)}>✅ Guardar</button>
                    <button className="btn btng btnsm" onClick={()=>setEditIdx(null)}>Cancelar</button>
                  </div>
                </div>
              ) : m.content}
            </div>
            {m.role==="assistant" && editIdx !== i && (
              <div style={{display:"flex",gap:6,marginTop:5,flexWrap:"wrap"}}>
                <button onClick={()=>startEdit(i,m.content)}
                  style={{background:"none",border:"1px solid #EDE0F5",borderRadius:8,padding:"4px 10px",fontSize:10,cursor:"pointer",color:"#9B9590",fontFamily:"sans-serif"}}>✏️ Editar</button>
                <button onClick={()=>navigator.clipboard?.writeText(m.content)}
                  style={{background:"none",border:"1px solid #EDE0F5",borderRadius:8,padding:"4px 10px",fontSize:10,cursor:"pointer",color:"#9B9590",fontFamily:"sans-serif"}}>📋 Copiar</button>
                <button onClick={()=>{
                  const w=window.open("","_blank");
                  w.document.write(`<pre style="font-family:Georgia;font-size:14px;line-height:1.8;max-width:700px;margin:40px auto;white-space:pre-wrap;">${m.content}</pre>`);
                  w.document.close(); w.print();
                }}
                  style={{background:"none",border:"1px solid #EDE0F5",borderRadius:8,padding:"4px 10px",fontSize:10,cursor:"pointer",color:"#9B9590",fontFamily:"sans-serif"}}>🖨️ Imprimir</button>
                <button onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(m.content)}`,"_blank")}
                  style={{background:"none",border:"1px solid #25D366",borderRadius:8,padding:"4px 10px",fontSize:10,cursor:"pointer",color:"#25D366",fontFamily:"sans-serif"}}>💬 WA</button>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",background:"white",borderRadius:"18px 18px 18px 4px",border:"1px solid #EDE0F5",maxWidth:"60%",boxShadow:"0 1px 6px rgba(0,0,0,.08)"}}>
            <div style={{display:"flex",gap:4}}>
              {[0,1,2].map(i=>(
                <div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#9B7EBD",animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`}}/>
              ))}
            </div>
            <span style={{fontSize:12,color:"#9B9590"}}>Pensando...</span>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div style={{background:"white",borderRadius:16,padding:10,boxShadow:"0 2px 12px rgba(0,0,0,.08)",border:"1.5px solid #EDE0F5",display:"flex",gap:8,alignItems:"flex-end"}}>
        <textarea
          className="inp"
          style={{flex:1,minHeight:44,maxHeight:120,resize:"none",border:"none",padding:"8px 4px",fontSize:13,lineHeight:1.5,outline:"none"}}
          placeholder="Escribí tu consulta... (Ej: Haceme un informe de progreso para la familia)"
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{ if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); send(); }}}
        />
        <button className="btn btnp" style={{borderRadius:12,padding:"10px 16px",flexShrink:0,alignSelf:"flex-end"}}
          onClick={send} disabled={loading||!input.trim()}>
          {loading ? "⏳" : "→"}
        </button>
      </div>
      <div style={{fontSize:10,color:"#9B9590",textAlign:"center",marginTop:5}}>Enter para enviar · Shift+Enter para nueva línea</div>

      <style>{`
        @keyframes bounce {
          0%,80%,100%{transform:translateY(0);}
          40%{transform:translateY(-6px);}
        }
      `}</style>
    </div>
  );
}

// ─── PSICOLOGÍA ───────────────────────────────────────────────────────────────
const ESCALAS = [
  { id:"beck", nombre:"Inventario de Depresión de Beck (BDI-II)", items:21, rango:"0-63",
    interpretacion:[["0-13","Mínima"],["14-19","Leve"],["20-28","Moderada"],["29-63","Grave"]] },
  { id:"hamilton-a", nombre:"Escala de Ansiedad de Hamilton (HAM-A)", items:14, rango:"0-56",
    interpretacion:[["0-7","Sin ansiedad"],["8-14","Ansiedad leve"],["15-23","Moderada"],["24-56","Grave"]] },
  { id:"conners", nombre:"Escala de Conners para TDAH (padres)", items:27, rango:"0-81",
    interpretacion:[["<60","Normal"],["60-65","Borderline"],["≥65","Clínico"]] },
  { id:"gad7", nombre:"GAD-7 (Ansiedad generalizada)", items:7, rango:"0-21",
    interpretacion:[["0-4","Mínima"],["5-9","Leve"],["10-14","Moderada"],["15-21","Grave"]] },
  { id:"phq9", nombre:"PHQ-9 (Depresión)", items:9, rango:"0-27",
    interpretacion:[["0-4","Mínima"],["5-9","Leve"],["10-14","Moderada"],["15-19","Moderada-grave"],["20-27","Grave"]] },
];

const ENFOQUES_PSICO = ["TCC (Cognitivo-Conductual)","Sistémico-familiar","Gestalt","Psicodinámico","Humanista","ACT (Aceptación y Compromiso)","EMDR","Narrativo"];

const AREAS_PSICO = [
  { id:"ansiedad",   label:"Ansiedad",          icon:"😰", color:"#5B8DB8" },
  { id:"depresion",  label:"Depresión",          icon:"😔", color:"#8B7BB5" },
  { id:"conducta",   label:"Conducta",           icon:"🎯", color:"#C0392B" },
  { id:"regulacion", label:"Regulación emocional",icon:"🌡️", color:"#E8A020" },
  { id:"trauma",     label:"Trauma/Duelo",       icon:"💔", color:"#E8719C" },
  { id:"familia",    label:"Familia/Vínculos",   icon:"👨‍👩‍👧", color:"#2ECC71" },
  { id:"autoestima", label:"Autoestima",         icon:"⭐", color:"#9B7EBD" },
  { id:"social",     label:"Habilidades sociales",icon:"🤝", color:"#5B8DB8" },
];

const PSICOEDUCACION = [
  { t:"Qué es la ansiedad", i:"😰", c:`QUÉ ES LA ANSIEDAD
─────────────────────────────────────
La ansiedad es una respuesta natural del cuerpo ante situaciones percibidas como amenazantes. En pequeñas dosis es útil y adaptativa — nos ayuda a prepararnos y reaccionar.

CUÁNDO SE VUELVE UN PROBLEMA
Se convierte en un trastorno cuando:
• Es desproporcionada al estímulo
• Interfiere con la vida cotidiana
• Es difícil de controlar
• Persiste en el tiempo

SÍNTOMAS FRECUENTES
Físicos: palpitaciones, sudoración, tensión muscular, dificultad respiratoria
Cognitivos: pensamientos catastróficos, anticipación negativa
Conductuales: evitación, hipervigilancia

ESTRATEGIAS DE MANEJO
1. Respiración diafragmática (4-7-8)
2. Técnica de grounding (5-4-3-2-1)
3. Registro de pensamientos automáticos
4. Exposición gradual

Profesional: ___________________
comunipro12@gmail.com` },

  { t:"Regulación emocional", i:"🌡️", c:`REGULACIÓN EMOCIONAL
─────────────────────────────────────
Las emociones son señales, no enemigas. Regularlas no significa suprimirlas sino gestionarlas de forma adaptativa.

CICLO DE LA EMOCIÓN
Estímulo → Interpretación → Emoción → Conducta → Consecuencia

ESTRATEGIAS DE REGULACIÓN
Inmediatas:
• Respiración consciente
• Pausa de 5 segundos
• Distanciamiento físico del estímulo

A mediano plazo:
• Diario emocional
• Identificación de disparadores
• Reestructuración cognitiva

Para niños:
• Termómetro de emociones
• Semáforo emocional
• Rincón de la calma

PARA LA FAMILIA
✓ Validar la emoción antes de corregir la conducta
✓ Nombrar las emociones con el niño/a
✓ Modelar regulación propia

Profesional: ___________________` },

  { t:"Duelo y pérdida", i:"💔", c:`DUELO Y PÉRDIDA
─────────────────────────────────────
El duelo es el proceso natural de adaptación ante una pérdida significativa. No es una enfermedad sino una respuesta humana normal.

TIPOS DE PÉRDIDA
• Muerte de un ser querido
• Separación o divorcio
• Pérdida de salud
• Cambios de vida significativos

FASES (Kübler-Ross)
1. Negación
2. Ira
3. Negociación
4. Depresión
5. Aceptación
(No son lineales ni universales)

DUELO COMPLICADO — señales de alerta
• Más de 12 meses de duelo intenso
• Incapacidad de funcionar
• Ideación suicida
• Negación persistente

PARA ACOMPAÑAR
✓ Presencia sin presión
✓ No forzar el "ya estás bien"
✓ Permitir hablar de la pérdida
✓ Respetar los tiempos

Profesional: ___________________` },

  { t:"Autoestima", i:"⭐", c:`AUTOESTIMA
─────────────────────────────────────
La autoestima es la valoración global que una persona tiene de sí misma. Se construye desde la infancia a través de experiencias, vínculos y mensajes recibidos.

COMPONENTES
• Autoconcepto: cómo me veo
• Autoevaluación: cómo me valoro
• Autoaceptación: cuánto me acepto
• Autorespeto: cómo me trato

SEÑALES DE BAJA AUTOESTIMA
• Autocrítica excesiva
• Dificultad para establecer límites
• Necesidad de aprobación constante
• Miedo al fracaso y la crítica

PARA TRABAJAR EN SESIÓN
• Registro de logros y fortalezas
• Técnica del espejo positivo
• Reestructuración de creencias nucleares
• Afirmaciones realistas (no vacías)

PARA EN CASA
✓ Diario de logros diarios (3 por día)
✓ Identificar el crítico interno
✓ Lista de cualidades propias

Profesional: ___________________` },
];

function Psicologia({ patients, sessions, documentos=[], setDocumentos=()=>{}, datos={registros:[],experimentos:[],jerarquia:[],humor:{}}, setDatos=()=>{} }) {
  const [tab, setTab] = useState("escalas");
  const [selPat, setSelPat] = useState("");
  const [selEscala, setSelEscala] = useState(null);
  const [puntaje, setPuntaje] = useState("");
  const [registros, setRegistros] = useState([]);
  const [planF, setPlanF] = useState({ enfoque:"TCC (Cognitivo-Conductual)", areas:[], objetivo:"", frecuencia:"Semanal", duracion:"50 min", notas:"" });
  const [showPlan, setShowPlan] = useState(false);
  const [selPsico, setSelPsico] = useState(null);
  const [estadoMental, setEstadoMental] = useState({ afecto:"", pensamiento:"", conducta:"", conciencia:"", orientacion:"", memoria:"", juicio:"", notas:"" });
  const [showEstado, setShowEstado] = useState(false);

  const patient = patients.find(p => p.name === selPat);
  const pSess = sessions.filter(s => s.patientId === patient?.id);

  const getInterpretacion = (escala, pts) => {
    const n = parseInt(pts);
    if (isNaN(n)) return "";
    for (const [rango, label] of escala.interpretacion) {
      if (rango.includes("-")) {
        const [min, max] = rango.split("-").map(Number);
        if (n >= min && n <= max) return label;
      } else if (rango.startsWith("<") && n < parseInt(rango.slice(1))) return label;
      else if (rango.startsWith("≥") && n >= parseInt(rango.slice(1))) return label;
    }
    return "";
  };

  const guardarRegistro = () => {
    if (!selEscala || !puntaje || !selPat) return;
    const interp = getInterpretacion(selEscala, puntaje);
    setRegistros(prev => [...prev, {
      id: makeId(), paciente: selPat, escala: selEscala.nombre,
      puntaje, interpretacion: interp,
      fecha: new Date().toLocaleDateString("es-UY")
    }]);
    setPuntaje(""); setSelEscala(null);
  };

  return (
    <div className="fu">
      <div style={{marginBottom:14}}>
        <div className="pt">🧠 Psicología</div>
        <div className="ps">Escalas, plan terapéutico, estado mental y psicoeducación</div>
      </div>

      <div className="atabrow">
        {[["escalas","📊 Escalas"],["plan","📋 Plan terapéutico"],["estado","🔍 Estado mental"],["psicoeducacion","📚 Psicoeducación"]].map(([id,l])=>(
          <button key={id} className={`atab${tab===id?" active":""}`} onClick={()=>setTab(id)}>{l}</button>
        ))}
      </div>

      {/* ESCALAS */}
      {tab === "escalas" && (
        <div>
          <div className="fg">
            <label className="lbl">Paciente</label>
            <select className="inp" value={selPat} onChange={e=>setSelPat(e.target.value)}>
              <option value="">Seleccioná...</option>
              {patients.filter(p=>p.status==="active").map(p=><option key={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr",gap:10,marginBottom:16}}>
            {ESCALAS.map(e=>(
              <div key={e.id} style={{background:"white",borderRadius:14,padding:14,border:`1.5px solid ${selEscala?.id===e.id?"#9B7EBD":"#EDE0F5"}`,cursor:"pointer"}}
                onClick={()=>setSelEscala(selEscala?.id===e.id?null:e)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontWeight:700,fontSize:13}}>{e.nombre}</div>
                  <span style={{fontSize:11,color:"#9B9590"}}>{e.items} ítems · {e.rango}</span>
                </div>
                {selEscala?.id===e.id && (
                  <div style={{marginTop:12}}>
                    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
                      <input className="inp" type="number" placeholder="Puntaje total" value={puntaje}
                        onChange={e=>setPuntaje(e.target.value)} style={{flex:1}}/>
                      {puntaje && (
                        <div style={{background:C.terraF,borderRadius:10,padding:"8px 14px",fontWeight:700,fontSize:13,color:C.terra}}>
                          {getInterpretacion(e, puntaje) || "—"}
                        </div>
                      )}
                    </div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                      {e.interpretacion.map(([r,l])=>(
                        <span key={r} style={{fontSize:10,padding:"3px 8px",borderRadius:20,background:C.sand,color:C.gray}}>{r}: {l}</span>
                      ))}
                    </div>
                    <button className="btn btnp btnsm" onClick={guardarRegistro} disabled={!puntaje||!selPat}>
                      💾 Guardar registro
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {registros.length > 0 && (
            <div>
              <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>📈 Registros guardados</div>
              {registros.map(r=>(
                <div key={r.id} style={{background:"white",borderRadius:12,padding:12,marginBottom:8,border:"1px solid #EDE0F5"}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div>
                      <div style={{fontWeight:600,fontSize:13}}>{r.paciente}</div>
                      <div style={{fontSize:11,color:C.grayL}}>{r.escala}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:C.terra}}>{r.puntaje}</div>
                      <div style={{fontSize:11,color:C.grayL}}>{r.interpretacion} · {r.fecha}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PLAN TERAPÉUTICO */}
      {tab === "plan" && (
        <div>
          <div className="alert alrti" style={{marginBottom:12}}>Diseñá el plan terapéutico psicológico del paciente.</div>
          <div className="fg">
            <label className="lbl">Paciente</label>
            <select className="inp" value={selPat} onChange={e=>setSelPat(e.target.value)}>
              <option value="">Seleccioná...</option>
              {patients.filter(p=>p.status==="active").map(p=><option key={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="fg">
            <label className="lbl">Enfoque terapéutico</label>
            <select className="inp" value={planF.enfoque} onChange={e=>setPlanF({...planF,enfoque:e.target.value})}>
              {ENFOQUES_PSICO.map(e=><option key={e}>{e}</option>)}
            </select>
          </div>
          <div style={{marginBottom:12}}>
            <label className="lbl">Áreas de trabajo</label>
            <div className="chiprow" style={{marginTop:6}}>
              {AREAS_PSICO.map(a=>(
                <button key={a.id} className={`chip${planF.areas.includes(a.id)?" sel":""}`}
                  style={planF.areas.includes(a.id)?{background:a.color+"22",borderColor:a.color,color:a.color}:{}}
                  onClick={()=>setPlanF(p=>({...p,areas:p.areas.includes(a.id)?p.areas.filter(x=>x!==a.id):[...p.areas,a.id]}))}>
                  {a.icon} {a.label}
                </button>
              ))}
            </div>
          </div>
          <div className="fg">
            <label className="lbl">Objetivo principal</label>
            <textarea className="inp" style={{minHeight:64}} placeholder="Objetivo terapéutico central..."
              value={planF.objetivo} onChange={e=>setPlanF({...planF,objetivo:e.target.value})}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            <div className="fg" style={{marginBottom:0}}>
              <label className="lbl">Frecuencia</label>
              <select className="inp" value={planF.frecuencia} onChange={e=>setPlanF({...planF,frecuencia:e.target.value})}>
                {["Semanal","Quincenal","Mensual","2 veces/semana"].map(f=><option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="fg" style={{marginBottom:0}}>
              <label className="lbl">Duración sesión</label>
              <select className="inp" value={planF.duracion} onChange={e=>setPlanF({...planF,duracion:e.target.value})}>
                {["45 min","50 min","60 min","90 min"].map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="fg">
            <label className="lbl">Notas adicionales</label>
            <textarea className="inp" style={{minHeight:52}} value={planF.notas}
              onChange={e=>setPlanF({...planF,notas:e.target.value})}/>
          </div>

          {selPat && (
            <div style={{background:C.terraF,borderRadius:14,padding:14,marginBottom:12}}>
              <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>Vista previa del plan</div>
              <div style={{fontSize:12,lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:"monospace"}}>
{`PLAN TERAPÉUTICO PSICOLÓGICO
──────────────────────────────────
Paciente: ${selPat}
Fecha: ${new Date().toLocaleDateString("es-UY")}
Enfoque: ${planF.enfoque}
Frecuencia: ${planF.frecuencia} · ${planF.duracion}

ÁREAS DE TRABAJO:
${planF.areas.map(id=>AREAS_PSICO.find(a=>a.id===id)).filter(Boolean).map(a=>`• ${a.icon} ${a.label}`).join(", ")||"• Sin áreas seleccionadas"}

OBJETIVO PRINCIPAL:
${planF.objetivo||"No especificado"}

${planF.notas?`NOTAS:
${planF.notas}`:""}

Profesional: ___________________
comunipro12@gmail.com`}
              </div>
              <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
                <button className="btn btno btnsm noprint" onClick={()=>window.print()}>🖨️ Imprimir</button>
                <button className="btn btnsm noprint" style={{background:"#25D366",color:"white"}}
                  onClick={()=>{
                    const txt = `Plan Terapéutico — ${selPat}
Enfoque: ${planF.enfoque}
Áreas: ${planF.areas.map(id=>AREAS_PSICO.find(a=>a.id===id)?.label).join(", ")}
Objetivo: ${planF.objetivo}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`,"_blank");
                  }}>💬 WhatsApp</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ESTADO MENTAL */}
      {tab === "estado" && (
        <div>
          <div className="alert alrti" style={{marginBottom:12}}>Registro de estado mental por sesión.</div>
          <div className="fg">
            <label className="lbl">Paciente</label>
            <select className="inp" value={selPat} onChange={e=>setSelPat(e.target.value)}>
              <option value="">Seleccioná...</option>
              {patients.filter(p=>p.status==="active").map(p=><option key={p.id}>{p.name}</option>)}
            </select>
          </div>
          {[
            ["Afecto","afecto","Eutímico, disfórico, ansioso, lábil, expansivo..."],
            ["Pensamiento","pensamiento","Coherente, tangencial, disgregado, obsesivo..."],
            ["Conducta","conducta","Colaborador, inhibido, agitado, oposicionista..."],
            ["Conciencia","conciencia","Lúcida, obnubilada, confusa..."],
            ["Orientación","orientacion","Orientado en tiempo/espacio/persona..."],
            ["Memoria","memoria","Conservada, alterada en corto/largo plazo..."],
            ["Juicio","juicio","Conservado, alterado, parcialmente conservado..."],
          ].map(([label, key, ph])=>(
            <div className="fg" key={key}>
              <label className="lbl">{label}</label>
              <input className="inp" placeholder={ph} value={estadoMental[key]}
                onChange={e=>setEstadoMental({...estadoMental,[key]:e.target.value})}/>
            </div>
          ))}
          <div className="fg">
            <label className="lbl">Observaciones generales</label>
            <textarea className="inp" style={{minHeight:64}} value={estadoMental.notas}
              onChange={e=>setEstadoMental({...estadoMental,notas:e.target.value})}/>
          </div>
          {selPat && (
            <div style={{background:C.terraF,borderRadius:14,padding:14}}>
              <div style={{fontWeight:700,fontSize:12,marginBottom:8}}>EXAMEN DE ESTADO MENTAL</div>
              <div style={{fontSize:12,lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:"monospace"}}>
{`Paciente: ${selPat}
Fecha: ${new Date().toLocaleDateString("es-UY")}

Afecto: ${estadoMental.afecto||"—"}
Pensamiento: ${estadoMental.pensamiento||"—"}
Conducta: ${estadoMental.conducta||"—"}
Conciencia: ${estadoMental.conciencia||"—"}
Orientación: ${estadoMental.orientacion||"—"}
Memoria: ${estadoMental.memoria||"—"}
Juicio: ${estadoMental.juicio||"—"}

${estadoMental.notas?`Observaciones: ${estadoMental.notas}`:""}

Profesional: ___________________`}
              </div>
              <button className="btn btno btnsm noprint" style={{marginTop:10}} onClick={()=>window.print()}>🖨️ Imprimir</button>
            </div>
          )}
        </div>
      )}

      {/* PSICOEDUCACIÓN */}
      {tab === "psicoeducacion" && (
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:14}}>
            {PSICOEDUCACION.map((p,i)=>(
              <div key={i} className="card" style={{cursor:"pointer",padding:12}} onClick={()=>setSelPsico(selPsico?.t===p.t?null:{...p})}>
                <div style={{fontSize:26,marginBottom:6}}>{p.i}</div>
                <div style={{fontWeight:700,fontSize:12,color:C.charcoal}}>{p.t}</div>
                <div style={{fontSize:10,color:C.info,marginTop:4}}>ver →</div>
              </div>
            ))}
          </div>
          {selPsico && (
            <Modal title={`${selPsico.i} ${selPsico.t}`} onClose={()=>setSelPsico(null)}>
              <div style={{fontSize:11,color:C.grayL,marginBottom:6}}>✏️ Editá antes de imprimir</div>
              <textarea style={{width:"100%",minHeight:280,background:C.cream,borderRadius:12,padding:14,
                fontSize:12,lineHeight:1.8,fontFamily:"monospace",border:`1.5px solid ${C.sand}`,
                resize:"vertical",outline:"none"}}
                value={selPsico.c}
                onChange={e=>setSelPsico({...selPsico,c:e.target.value})}/>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:8}}>
                <button className="btn btnp btnsm" onClick={()=>navigator.clipboard?.writeText(selPsico.c)}>📋 Copiar</button>
                <button className="btn btnsm noprint" style={{background:"#25D366",color:"white"}}
                  onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(selPsico.c)}`,"_blank")}>💬 WhatsApp</button>
                <button className="btn btno btnsm noprint" onClick={()=>window.print()}>🖨️ Imprimir</button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}


// ─── LIQUIDACIÓN DE SUELDOS ───────────────────────────────────────────────────
function Liquidacion({ users, currentUser, configs:configsProp={}, setConfigs:setConfigsProp=()=>{}, asistenciasData={}, setAsistenciasData=()=>{} }) {
  const mesActual = new Date().toISOString().slice(0,7);
  const [mes, setMes] = useState(mesActual);
  // Use persistent configs from props
  const configs = configsProp;
  const setConfigs = setConfigsProp;
  
  // Get config for a user, with defaults
  const getConfig = (uid) => configs[uid] || {
    tarifaSesion: 0,
    complementoMonto: 0,
    complementoPeriodo: "mensual",
    descuentoFalta: 0,
    tipoDescuento: "monto",
    activo: true
  };
  // Use persistent asistencias from props
  const asistencias = asistenciasData;
  const setAsistencias = setAsistenciasData;
  // asistencias[userId][dia] = "P"|"F"|"FJ"|"R" (R=reposición)
  const [selUser, setSelUser] = useState(null);
  const [showLiq, setShowLiq] = useState(false);
  const [editConfig, setEditConfig] = useState(null);

  const cambiarMes = d => {
    const [y,m] = mes.split("-").map(Number);
    const n = new Date(y, m-1+d, 1);
    setMes(`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`);
  };

  const nomMes = new Date(mes+"-01T12:00:00").toLocaleDateString("es-UY",{month:"long",year:"numeric"});

  const getDiasHabiles = m => {
    const [y,mo] = m.split("-").map(Number);
    const dias = [];
    const total = new Date(y,mo,0).getDate();
    for(let d=1;d<=total;d++){
      const dow = new Date(y,mo-1,d).getDay();
      if(dow!==0&&dow!==6) dias.push(`${m}-${String(d).padStart(2,"0")}`);
    }
    return dias;
  };
  const diasHabiles = getDiasHabiles(mes);
  const diasPrimQuincena = diasHabiles.filter(d=>parseInt(d.split("-")[2])<=15);
  const diasSegQuincena  = diasHabiles.filter(d=>parseInt(d.split("-")[2])>15);

  const toggleAsis = (uid, dia) => {
    setAsistencias(prev => {
      const ua = { ...(prev[uid]||{}) };
      if(!ua[dia])       ua[dia]="P";
      else if(ua[dia]==="P")  ua[dia]="F";
      else if(ua[dia]==="F")  ua[dia]="FJ";
      else if(ua[dia]==="FJ") ua[dia]="R";
      else delete ua[dia];
      return { ...prev, [uid]:ua };
    });
  };

  const getColor = v => {
    if(!v)         return {bg:"#F0F0F0",c:"#aaa",label:"–"};
    if(v==="P")    return {bg:"#E8F8EF",c:"#1a7a3c",label:"P"};
    if(v==="F")    return {bg:"#FDECEA",c:"#C0392B",label:"F"};
    if(v==="FJ")   return {bg:"#FEF3E0",c:"#E8A020",label:"FJ"};
    if(v==="R")    return {bg:"#EBF3FB",c:"#5B8DB8",label:"R"};
    return {bg:"#F0F0F0",c:"#aaa",label:"–"};
  };

  const calcLiq = (uid) => {
    const ua   = asistencias[uid] || {};
    const cfg  = getConfig(uid);
    const tarifa = Number(cfg.tarifaSesion)||0;
    const comp   = Number(cfg.complementoMonto)||0;
    const periodo = cfg.complementoPeriodo || "mensual";
    const descMonto = Number(cfg.descuentoFalta)||0;
    const tipoDesc  = cfg.tipoDescuento || "monto";

    const presentes   = diasHabiles.filter(d=>ua[d]==="P").length;
    const faltas      = diasHabiles.filter(d=>ua[d]==="F").length;
    const faltasJ     = diasHabiles.filter(d=>ua[d]==="FJ").length;
    const reposiciones= diasHabiles.filter(d=>ua[d]==="R").length;
    const sesiones    = presentes + reposiciones;

    const brutoSesiones = sesiones * tarifa;

    // Descuento por faltas injustificadas
    // Si es monto: descMonto fijo por cada falta
    // Si es porcentaje: descMonto% del valor de una sesión por cada falta
    let descuento = 0;
    if(tipoDesc==="monto") {
      descuento = faltas * descMonto;
    } else {
      // porcentaje del valor de cada sesión perdida
      descuento = faltas * tarifa * (descMonto / 100);
    }

    // Complemento: comp es siempre el monto MENSUAL total
    // Si es quincenal, se paga en 2 cuotas de comp/2 pero el total mensual es el mismo
    const complementoTotal = comp;
    const complementoCuota = periodo==="quincenal" ? comp/2 : comp;

    const neto = brutoSesiones - descuento + complementoTotal;

    return { presentes, faltas, faltasJ, reposiciones, sesiones,
             brutoSesiones, descuento, complementoTotal, complementoCuota, neto, tarifa, comp, periodo };
  };

  const profes = users.filter(u => u.role !== "admin" || currentUser?.role === "admin");
  const totalNomina = profes.reduce((s,u)=>s+calcLiq(u.id).neto,0);

  const saveConfig = (uid, cfg) => {
    setConfigs(prev=>({...prev,[uid]:cfg}));
    setEditConfig(null);
  };

  return (
    <div className="fu">
      <div style={{marginBottom:14}}>
        <div className="pt">💰 Liquidación de Sueldos</div>
        <div className="ps">Cálculo automático por asistencias, tarifas y complementos</div>
      </div>

      {/* Selector mes */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,background:"white",borderRadius:14,padding:"12px 16px",boxShadow:"0 1px 6px rgba(0,0,0,.05)"}}>
        <button onClick={()=>cambiarMes(-1)} style={{background:"#EDE0F5",border:"none",borderRadius:8,width:34,height:34,cursor:"pointer",fontSize:18,fontWeight:700}}>‹</button>
        <div style={{flex:1,textAlign:"center",fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,textTransform:"capitalize"}}>{nomMes}</div>
        <button onClick={()=>cambiarMes(1)} style={{background:"#EDE0F5",border:"none",borderRadius:8,width:34,height:34,cursor:"pointer",fontSize:18,fontWeight:700}}>›</button>
      </div>

      {/* Leyenda */}
      <div style={{background:"#F5F0FA",borderRadius:12,padding:"10px 14px",marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:12,color:"#7B5EA7",marginBottom:8}}>Tocá cada día para registrar la asistencia del profesional:</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:6}}>
          {[["P","Trabajó","#E8F8EF","#1a7a3c"],["F","Falta injust.","#FDECEA","#C0392B"],["FJ","Falta just.","#FEF3E0","#E8A020"],["R","Reposición","#EBF3FB","#5B8DB8"],["–","Sin marcar","#F0F0F0","#aaa"]].map(([l,d,bg,c])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#6B6560"}}>
              <div style={{width:26,height:26,borderRadius:6,background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:c,border:`1px solid ${c}44`}}>{l}</div>
              <span>{d}</span>
            </div>
          ))}
        </div>
        <div style={{fontSize:11,color:"#9B9590"}}>P y R cuentan como sesión cobrable · F descuenta si hay penalidad configurada · FJ no descuenta</div>
      </div>

      {/* Profesionales */}
      {profes.map(u => {
        const liq = calcLiq(u.id);
        const cfg = configs[u.id] || {};
        const ua  = asistencias[u.id] || {};
        return (
          <div key={u.id} style={{background:"white",borderRadius:18,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,.07)",marginBottom:14}}>
            <div style={{padding:"14px 16px",borderBottom:"1px solid #EDE0F5",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:38,height:38,borderRadius:11,background:u.color||"#9B7EBD",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:13}}>{u.avatar}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:13}}>{u.name}</div>
                  <div style={{fontSize:11,color:"#9B9590"}}>{u.specialty} · {u.plan}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700,color:"#9B7EBD"}}>${liq.neto.toLocaleString("es-UY")}</div>
                <button onClick={()=>setEditConfig({uid:u.id,...getConfig(u.id)})}
                  style={{background:"#F5F0FA",border:"none",borderRadius:8,padding:"6px 10px",cursor:"pointer",fontSize:11,fontWeight:700,color:"#9B7EBD"}}>⚙️</button>
              </div>
            </div>

            {/* Config summary */}
            <div style={{padding:"8px 16px",background:"#FAFAFA",borderBottom:"1px solid #EDE0F5",display:"flex",gap:12,flexWrap:"wrap"}}>
              <span style={{fontSize:11,color:"#9B9590"}}>Tarifa: <b>${(cfg.tarifaSesion||0).toLocaleString("es-UY")}/ses</b></span>
              {(cfg.complementoMonto||0)>0 && <span style={{fontSize:11,color:"#9B9590"}}>Complemento: <b>${(cfg.complementoMonto||0).toLocaleString("es-UY")}/{cfg.complementoPeriodo==="quincenal"?"quinc":"mes"}</b></span>}
              {(cfg.descuentoFalta||0)>0 && <span style={{fontSize:11,color:"#C0392B"}}>Desc/falta: <b>{cfg.tipoDescuento==="porcentaje"?cfg.descuentoFalta+"%":"$"+(cfg.descuentoFalta||0)}</b></span>}
            </div>

            {/* Grilla asistencias */}
            <div style={{padding:"12px 16px"}}>
              <div style={{overflowX:"auto",marginBottom:10}}>
                <div style={{display:"flex",gap:3,minWidth:"max-content",paddingBottom:4}}>
                  {diasHabiles.map(dia=>{
                    const d = new Date(dia+"T12:00:00");
                    const v = ua[dia];
                    const {bg,c,label} = getColor(v);
                    const isQ2 = parseInt(dia.split("-")[2])>15;
                    return (
                      <button key={dia} onClick={()=>toggleAsis(u.id,dia)}
                        style={{width:30,height:38,borderRadius:7,border:`1px solid ${c}44`,background:bg,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1,flexShrink:0,borderTop:isQ2?"2px solid #9B7EBD44":undefined}}>
                        <div style={{fontSize:8,color:"#9B9590",lineHeight:1}}>{String(d.getDate()).padStart(2,"0")}</div>
                        <div style={{fontSize:10,fontWeight:700,color:c,lineHeight:1}}>{label}</div>
                      </button>
                    );
                  })}
                </div>
                <div style={{fontSize:9,color:"#9B9590",marginTop:4}}>La línea azul separa primera y segunda quincena</div>
              </div>

              {/* Resumen */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:10}}>
                {[["Sesiones",liq.sesiones,"#E8F8EF","#1a7a3c"],["Faltas",liq.faltas,"#FDECEA","#C0392B"],["Just.",liq.faltasJ,"#FEF3E0","#E8A020"],["Repos.",liq.reposiciones,"#EBF3FB","#5B8DB8"]].map(([l,v,bg,c])=>(
                  <div key={l} style={{background:bg,borderRadius:10,padding:"8px 6px",textAlign:"center"}}>
                    <div style={{fontSize:14,fontWeight:700,color:c}}>{v}</div>
                    <div style={{fontSize:10,color:c}}>{l}</div>
                  </div>
                ))}
              </div>

              {/* Desglose */}
              <div style={{background:"#F5F0FA",borderRadius:12,padding:12}}>
                <div style={{fontWeight:700,fontSize:12,marginBottom:8}}>Desglose liquidación</div>
                {[
                  [`${liq.sesiones} ses × $${liq.tarifa.toLocaleString("es-UY")}/ses`, liq.brutoSesiones, false],
                  liq.complementoTotal>0 ? [
                    liq.periodo==="quincenal"
                      ? `Complemento quincenal ($${liq.complementoCuota?.toLocaleString("es-UY")} × 2)`
                      : `Complemento mensual`,
                    liq.complementoTotal, false
                  ] : null,
                  liq.descuento>0 ? [`Desc. por ${liq.faltas} falta${liq.faltas!==1?"s":""} injust.`, -liq.descuento, true] : null,
                ].filter(Boolean).map(([label,val,neg])=>(
                  <div key={label} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #EDE0F5",fontSize:12}}>
                    <span style={{color:"#6B6560"}}>{label}</span>
                    <span style={{fontWeight:600,color:neg?"#C0392B":"#2C2C2C"}}>{neg?"-":"+"}${Math.abs(val).toLocaleString("es-UY")}</span>
                  </div>
                ))}
                <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0 0",fontSize:14,fontWeight:700}}>
                  <span>Total a cobrar</span>
                  <span style={{color:"#9B7EBD",fontFamily:"'Cormorant Garamond',serif",fontSize:20}}>${liq.neto.toLocaleString("es-UY")}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Total nómina */}
      {profes.length > 0 && (
        <div style={{background:"linear-gradient(135deg,#9B7EBD,#7B5EA7)",borderRadius:16,padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          <div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.8)"}}>TOTAL NÓMINA</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>{profes.length} profesionales · {nomMes}</div>
          </div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,color:"white"}}>${totalNomina.toLocaleString("es-UY")}</div>
        </div>
      )}

      {/* Botones */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
        <button className="btn btno btnsm noprint" onClick={()=>window.print()}>🖨️ Imprimir liquidación</button>
        <button className="btn btng btnsm" onClick={()=>{
          const txt = profes.map(u=>{
            const l=calcLiq(u.id);
            return `${u.name}: $${l.neto.toLocaleString("es-UY")} (${l.sesiones} ses, ${l.faltas} faltas)`;
          }).join("\n");
          navigator.clipboard?.writeText("Liquidación " + nomMes + "\n" + txt + "\nTotal: $" + totalNomina.toLocaleString("es-UY"));
        }}>📋 Copiar resumen</button>
      </div>

      {/* Modal config profesional */}
      {editConfig && (
        <Modal title={`⚙️ Configurar — ${users.find(u=>u.id===editConfig.uid)?.name}`} onClose={()=>setEditConfig(null)}>
          <div className="alert alrti" style={{marginBottom:12}}>Configurá la tarifa y complemento de este profesional.</div>

          <div className="fg">
            <label className="lbl">Tarifa por sesión ($)</label>
            <input className="inp" type="number" min="0" value={editConfig.tarifaSesion||0}
              onChange={e=>setEditConfig({...editConfig,tarifaSesion:parseFloat(e.target.value)||0})}/>
          </div>

          <div style={{background:"#F5F0FA",borderRadius:12,padding:12,marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:12,color:"#7B5EA7",marginBottom:4,textTransform:"uppercase"}}>Complemento fijo mensual</div>
            <div style={{fontSize:11,color:"#9B9590",marginBottom:10}}>Monto adicional que recibe este profesional por mes, más allá de las sesiones.</div>
            <div className="fg">
              <label className="lbl">¿Cuánto cobra de complemento por mes? ($)</label>
              <input className="inp" type="number" min="0" placeholder="Ej: 700"
                value={editConfig.complementoMonto||0}
                onChange={e=>setEditConfig({...editConfig,complementoMonto:parseFloat(e.target.value)||0})}/>
            </div>
            <div className="fg">
              <label className="lbl">¿Cómo se le paga ese complemento?</label>
              <select className="inp" value={editConfig.complementoPeriodo||"mensual"}
                onChange={e=>setEditConfig({...editConfig,complementoPeriodo:e.target.value})}>
                <option value="mensual">En un solo pago mensual ($700 de una vez)</option>
                <option value="quincenal">En dos cuotas quincenales ($350 + $350)</option>
              </select>
            </div>
            {(editConfig.complementoMonto||0)>0 && (
              <div style={{background:"white",borderRadius:8,padding:"10px 14px",fontSize:12}}>
                <div style={{fontWeight:700,color:"#7B5EA7",marginBottom:4}}>💰 Resumen del complemento:</div>
                <div style={{color:"#6B6560"}}>
                  Total mensual: <strong style={{color:"#9B7EBD"}}>${(editConfig.complementoMonto||0).toLocaleString("es-UY")}</strong>
                  {editConfig.complementoPeriodo==="quincenal" && (
                    <span> → se paga en 2 cuotas de <strong>${((editConfig.complementoMonto||0)/2).toLocaleString("es-UY")}</strong></span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div style={{background:"#FDECEA",borderRadius:12,padding:12,marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:12,color:"#C0392B",marginBottom:10,textTransform:"uppercase"}}>Descuento por falta injustificada</div>
            <div className="fg">
              <label className="lbl">Tipo de descuento</label>
              <select className="inp" value={editConfig.tipoDescuento||"monto"}
                onChange={e=>setEditConfig({...editConfig,tipoDescuento:e.target.value})}>
                <option value="monto">Monto fijo por falta ($)</option>
                <option value="porcentaje">Porcentaje del bruto por falta (%)</option>
              </select>
            </div>
            <div className="fg">
              <label className="lbl">{editConfig.tipoDescuento==="porcentaje"?"Porcentaje (%)":"Monto ($)"}</label>
              <input className="inp" type="number" min="0" value={editConfig.descuentoFalta||0}
                onChange={e=>setEditConfig({...editConfig,descuentoFalta:parseFloat(e.target.value)||0})}/>
            </div>
          </div>

          {/* Preview */}
          {(editConfig.tarifaSesion||0)>0 && (
            <div style={{background:"#F5F0FA",borderRadius:12,padding:12,marginBottom:12}}>
              <div style={{fontWeight:700,fontSize:12,marginBottom:4}}>Vista previa — ejemplo con 20 sesiones, 1 falta:</div>
              <div style={{fontSize:11,color:"#9B9590",marginBottom:8}}>Así quedaría la liquidación del mes</div>
              {(() => {
                const t = editConfig.tarifaSesion||0;
                const c = editConfig.complementoMonto||0;
                const desc = editConfig.descuentoFalta||0;
                const bruto = 20 * t;
                const complemento = c; // siempre mensual total
                const descuento = editConfig.tipoDescuento==="porcentaje" ? (1 * t * desc/100) : (1 * desc);
                const neto = bruto + complemento - descuento;
                return [
                  [`20 sesiones × $${t.toLocaleString("es-UY")}`, bruto, false],
                  c>0 ? [`Complemento mensual${editConfig.complementoPeriodo==="quincenal"?" (2 cuotas de $"+(c/2).toLocaleString("es-UY")+")":""}`, c, false] : null,
                  desc>0 ? [`1 falta injustificada (descuento)`, -descuento, true] : null,
                  ["= Neto del mes", neto, false, true],
                ].filter(Boolean).map(([l,v,neg,bold])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:12,padding:"5px 0",borderTop:bold?"1.5px solid #EDE0F5":"none",marginTop:bold?4:0,paddingTop:bold?8:5}}>
                    <span style={{color:bold?"#2C2C2C":"#6B6560",fontWeight:bold?700:400}}>{l}</span>
                    <span style={{fontWeight:700,color:neg?"#C0392B":bold?"#9B7EBD":"#2C2C2C",fontSize:bold?14:12}}>
                      {neg?"-":""}${Math.abs(v).toLocaleString("es-UY")}
                    </span>
                  </div>
                ));
              })()}
            </div>
          )}

          <button className="btn btnp btnfull" onClick={()=>saveConfig(editConfig.uid, editConfig)}>✅ Guardar configuración</button>
          <button className="btn btng btnfull" onClick={()=>setEditConfig(null)}>Cancelar</button>
        </Modal>
      )}
    </div>
  );
}

// ─── TCC (COGNITIVO-CONDUCTUAL) ───────────────────────────────────────────────
const DISTORSIONES = [
  { id:"todo_nada",    label:"Todo o nada",         desc:"Ver las cosas en blanco y negro, sin términos medios." },
  { id:"catastrofismo",label:"Catastrofismo",        desc:"Exagerar la importancia de eventos negativos." },
  { id:"filtraje",     label:"Filtraje mental",      desc:"Enfocarse solo en los aspectos negativos." },
  { id:"descalificar", label:"Descalificar lo positivo", desc:"Rechazar experiencias positivas como 'no cuentan'." },
  { id:"lectura",      label:"Lectura del pensamiento", desc:"Asumir lo que otros piensan sin evidencia." },
  { id:"adivinar",     label:"Adivinación",          desc:"Predecir resultados negativos como si fueran hechos." },
  { id:"deberia",      label:"Afirmaciones 'debería'", desc:"Reglas rígidas sobre cómo deben ser las cosas." },
  { id:"etiquetado",   label:"Etiquetado",           desc:"Asignarse etiquetas negativas globales ('soy un fracaso')." },
  { id:"personalizacion",label:"Personalización",    desc:"Asumir responsabilidad excesiva por eventos externos." },
];

function TCC({ patients, documentos=[], setDocumentos=()=>{}, datos={registros:[],experimentos:[],jerarquia:[],humor:{}}, setDatos=()=>{} }) {
  const [tab, setTab] = useState("pensamientos");
  const [selPat, setSelPat] = useState("");
  const registros = datos.registros || [];
  const setRegistros = v => setDatos(d => ({...d, registros: typeof v==="function"?v(d.registros||[]):v}));
  const experimentos = datos.experimentos || [];
  const setExperimentos = v => setDatos(d => ({...d, experimentos: typeof v==="function"?v(d.experimentos||[]):v}));
  const jerarquia = datos.jerarquia || [];
  const setJerarquia = v => setDatos(d => ({...d, jerarquia: typeof v==="function"?v(d.jerarquia||[]):v}));
  const humor = datos.humor || {};
  const setHumor = v => setDatos(d => ({...d, humor: typeof v==="function"?v(d.humor||{}):v}));
  const [newReg, setNewReg] = useState({ situacion:"", pensamiento:"", emocion:"", intensidad:50, distorsion:"", alternativa:"", resultadoEmocion:"" });
  const [newExp, setNewExp] = useState({ hipotesis:"", prediccion:"", experimento:"", resultado:"", conclusion:"" });
  const [newJer, setNewJer] = useState({ situacion:"", ansiedad:50, completado:false });
  const [showNewReg, setShowNewReg] = useState(false);
  const [showNewExp, setShowNewExp] = useState(false);

  const diasSemana = ["Lu","Ma","Mi","Ju","Vi","Sa","Do"];
  const semanaActual = Array.from({length:7},(_,i)=>{
    const d = new Date(); d.setDate(d.getDate()-d.getDay()+i+1);
    return d.toISOString().slice(0,10);
  });

  const patRegistros = registros.filter(r=>r.paciente===selPat);
  const patExp       = experimentos.filter(e=>e.paciente===selPat);
  const patJer       = jerarquia.filter(j=>j.paciente===selPat);

  return (
    <div className="fu">
      <div style={{marginBottom:14}}>
        <div className="pt">🔵 TCC — Cognitivo-Conductual</div>
        <div className="ps">Pensamientos, experimentos, exposición y humor</div>
      </div>

      <div className="fg">
        <label className="lbl">Paciente</label>
        <select className="inp" value={selPat} onChange={e=>setSelPat(e.target.value)}>
          <option value="">Seleccioná...</option>
          {patients.filter(p=>p.status==="active").map(p=><option key={p.id}>{p.name}</option>)}
        </select>
      </div>

      <div className="atabrow">
        {[["pensamientos","📝 Pensamientos"],["experimentos","🔬 Experimentos"],["exposicion","📊 Exposición"],["humor","📈 Humor"],["recursos","📚 TCC Recursos"]].map(([id,l])=>(
          <button key={id} className={`atab${tab===id?" active":""}`} onClick={()=>setTab(id)}>{l}</button>
        ))}
      </div>

      {/* REGISTRO DE PENSAMIENTOS */}
      {tab==="pensamientos" && (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:13,color:C.grayL}}>Registro de pensamientos automáticos</div>
            <button className="btn btnp btnsm" onClick={()=>setShowNewReg(true)}>+ Nuevo</button>
          </div>

          {patRegistros.length===0 && <div className="alert alrti">Sin registros aún. Añadí el primero.</div>}

          {patRegistros.map((r,i)=>(
            <div key={i} style={{background:"white",borderRadius:14,padding:14,marginBottom:10,border:"1px solid #EDE0F5"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                <div style={{background:"#FDECEA",borderRadius:8,padding:"8px 10px"}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#C0392B",marginBottom:3}}>SITUACIÓN</div>
                  <div style={{fontSize:12}}>{r.situacion}</div>
                </div>
                <div style={{background:"#FEF3E0",borderRadius:8,padding:"8px 10px"}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#E8A020",marginBottom:3}}>PENSAMIENTO</div>
                  <div style={{fontSize:12}}>{r.pensamiento}</div>
                </div>
                <div style={{background:"#EBF3FB",borderRadius:8,padding:"8px 10px"}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#5B8DB8",marginBottom:3}}>EMOCIÓN · {r.intensidad}%</div>
                  <div style={{fontSize:12}}>{r.emocion}</div>
                </div>
                <div style={{background:"#E8F8EF",borderRadius:8,padding:"8px 10px"}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#1a7a3c",marginBottom:3}}>PENSAMIENTO ALTERNATIVO</div>
                  <div style={{fontSize:12}}>{r.alternativa||"—"}</div>
                </div>
              </div>
              {r.distorsion && (
                <div style={{fontSize:11,color:C.grayL,background:C.cream,borderRadius:8,padding:"6px 10px"}}>
                  🔍 Distorsión: <strong>{DISTORSIONES.find(d=>d.id===r.distorsion)?.label||r.distorsion}</strong>
                </div>
              )}
              {r.resultadoEmocion && (
                <div style={{fontSize:11,color:C.grayL,marginTop:6}}>Emoción resultado: <strong>{r.resultadoEmocion}%</strong></div>
              )}
            </div>
          ))}

          {showNewReg && (
            <Modal title="Registro de pensamiento" onClose={()=>setShowNewReg(false)}>
              {[["Situación","situacion","¿Qué pasó? ¿Dónde? ¿Con quién?"],["Pensamiento automático","pensamiento","¿Qué pasó por tu mente?"],["Emoción","emocion","¿Qué sentiste?"]].map(([l,k,ph])=>(
                <div className="fg" key={k}>
                  <label className="lbl">{l}</label>
                  <input className="inp" placeholder={ph} value={newReg[k]} onChange={e=>setNewReg({...newReg,[k]:e.target.value})}/>
                </div>
              ))}
              <div className="fg">
                <label className="lbl">Intensidad de la emoción: {newReg.intensidad}%</label>
                <input type="range" style={{width:"100%",accentColor:C.terra}} min={0} max={100} step={5}
                  value={newReg.intensidad} onChange={e=>setNewReg({...newReg,intensidad:parseInt(e.target.value)})}/>
              </div>
              <div className="fg">
                <label className="lbl">Distorsión cognitiva</label>
                <select className="inp" value={newReg.distorsion} onChange={e=>setNewReg({...newReg,distorsion:e.target.value})}>
                  <option value="">Seleccioná (opcional)</option>
                  {DISTORSIONES.map(d=><option key={d.id} value={d.id}>{d.label}</option>)}
                </select>
              </div>
              <div className="fg">
                <label className="lbl">Pensamiento alternativo</label>
                <textarea className="inp" style={{minHeight:60}} placeholder="¿Cómo podría verlo de otra manera?"
                  value={newReg.alternativa} onChange={e=>setNewReg({...newReg,alternativa:e.target.value})}/>
              </div>
              <div className="fg">
                <label className="lbl">Emoción después del análisis: {newReg.resultadoEmocion||0}%</label>
                <input type="range" style={{width:"100%",accentColor:"#2ECC71"}} min={0} max={100} step={5}
                  value={newReg.resultadoEmocion||0} onChange={e=>setNewReg({...newReg,resultadoEmocion:parseInt(e.target.value)})}/>
              </div>
              <button className="btn btnp btnfull" onClick={()=>{
                if(!selPat||!newReg.situacion) return;
                setRegistros(prev=>[...prev,{...newReg,paciente:selPat,fecha:new Date().toLocaleDateString("es-UY")}]);
                setNewReg({situacion:"",pensamiento:"",emocion:"",intensidad:50,distorsion:"",alternativa:"",resultadoEmocion:""});
                setShowNewReg(false);
              }}>Guardar registro</button>
            </Modal>
          )}
        </div>
      )}

      {/* EXPERIMENTOS CONDUCTUALES */}
      {tab==="experimentos" && (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:13,color:C.grayL}}>Experimentos para testear creencias</div>
            <button className="btn btnp btnsm" onClick={()=>setShowNewExp(true)}>+ Nuevo</button>
          </div>
          {patExp.length===0 && <div className="alert alrti">Sin experimentos aún.</div>}
          {patExp.map((e,i)=>(
            <div key={i} style={{background:"white",borderRadius:14,padding:14,marginBottom:10,border:"1px solid #EDE0F5"}}>
              <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>🔬 {e.hipotesis}</div>
              {[["Predicción",e.prediccion,"#FEF3E0","#E8A020"],["Experimento",e.experimento,"#EBF3FB","#5B8DB8"],["Resultado",e.resultado,"#E8F8EF","#1a7a3c"],["Conclusión",e.conclusion,"#F5F0FA","#9B7EBD"]].map(([l,v,bg,c])=>v?(
                <div key={l} style={{background:bg,borderRadius:8,padding:"7px 10px",marginBottom:6}}>
                  <div style={{fontSize:10,fontWeight:700,color:c,marginBottom:2}}>{l.toUpperCase()}</div>
                  <div style={{fontSize:12}}>{v}</div>
                </div>
              ):null)}
            </div>
          ))}
          {showNewExp && (
            <Modal title="Experimento conductual" onClose={()=>setShowNewExp(false)}>
              {[["Hipótesis / creencia a testear","hipotesis","Ej: Si hablo en clase, todos se reirán"],["Predicción","prediccion","¿Qué creés que va a pasar?"],["Diseño del experimento","experimento","¿Qué vas a hacer para comprobarlo?"],["Resultado","resultado","¿Qué pasó realmente?"],["Conclusión","conclusion","¿Qué aprendés de esto?"]].map(([l,k,ph])=>(
                <div className="fg" key={k}>
                  <label className="lbl">{l}</label>
                  <textarea className="inp" style={{minHeight:52}} placeholder={ph}
                    value={newExp[k]} onChange={e=>setNewExp({...newExp,[k]:e.target.value})}/>
                </div>
              ))}
              <button className="btn btnp btnfull" onClick={()=>{
                if(!selPat||!newExp.hipotesis) return;
                setExperimentos(prev=>[...prev,{...newExp,paciente:selPat,fecha:new Date().toLocaleDateString("es-UY")}]);
                setNewExp({hipotesis:"",prediccion:"",experimento:"",resultado:"",conclusion:""});
                setShowNewExp(false);
              }}>Guardar experimento</button>
            </Modal>
          )}
        </div>
      )}

      {/* JERARQUÍA DE EXPOSICIÓN */}
      {tab==="exposicion" && (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:13,color:C.grayL}}>Jerarquía de exposición gradual</div>
            <button className="btn btnp btnsm" onClick={()=>{
              if(!selPat||!newJer.situacion) return;
              setJerarquia(prev=>[...prev,{...newJer,paciente:selPat}].sort((a,b)=>a.ansiedad-b.ansiedad));
              setNewJer({situacion:"",ansiedad:50,completado:false});
            }}>+ Agregar</button>
          </div>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            <input className="inp" style={{flex:2}} placeholder="Situación temida..." value={newJer.situacion}
              onChange={e=>setNewJer({...newJer,situacion:e.target.value})}/>
            <div style={{flex:1}}>
              <input type="range" style={{width:"100%",accentColor:C.terra,marginTop:8}} min={0} max={100} step={5}
                value={newJer.ansiedad} onChange={e=>setNewJer({...newJer,ansiedad:parseInt(e.target.value)})}/>
              <div style={{fontSize:10,textAlign:"center",color:C.grayL}}>Ansiedad: {newJer.ansiedad}</div>
            </div>
          </div>
          {patJer.length===0 && <div className="alert alrti">Sin situaciones en la jerarquía aún.</div>}
          {patJer.map((j,i)=>{
            const color = j.ansiedad<30?"#1a7a3c":j.ansiedad<60?"#E8A020":"#C0392B";
            const bg    = j.ansiedad<30?"#E8F8EF":j.ansiedad<60?"#FEF3E0":"#FDECEA";
            return (
              <div key={i} style={{background:j.completado?"#E8F8EF":"white",borderRadius:12,padding:12,marginBottom:8,border:`1px solid ${j.completado?"#1a7a3c":"#EDE0F5"}`,display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:36,borderRadius:10,background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:color,flexShrink:0}}>{j.ansiedad}</div>
                <div style={{flex:1,fontSize:13,color:j.completado?C.grayL:C.charcoal,textDecoration:j.completado?"line-through":"none"}}>{j.situacion}</div>
                <button onClick={()=>setJerarquia(prev=>prev.map((x,xi)=>xi===jerarquia.indexOf(j)?{...x,completado:!x.completado}:x))}
                  style={{background:j.completado?"#E8F8EF":"#F5F0FA",border:"none",borderRadius:8,padding:"6px 10px",cursor:"pointer",fontSize:11,fontWeight:700,color:j.completado?"#1a7a3c":"#9B7EBD"}}>
                  {j.completado?"✅":"○"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* DIARIO DE HUMOR */}
      {tab==="humor" && (
        <div>
          <div style={{marginBottom:10,fontSize:13,color:C.grayL}}>Registro semanal de estado de ánimo (0-10)</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6,marginBottom:14}}>
            {semanaActual.map((dia,i)=>{
              const key = `${selPat||"_"}-${dia}`;
              const val = humor[key]||0;
              const color = val<4?"#C0392B":val<7?"#E8A020":"#1a7a3c";
              return (
                <div key={dia} style={{textAlign:"center"}}>
                  <div style={{fontSize:10,color:C.grayL,marginBottom:4}}>{diasSemana[i]}</div>
                  <div style={{background:val>0?"white":"#F5F0FA",borderRadius:10,padding:"8px 4px",border:`2px solid ${val>0?color:"#EDE0F5"}`}}>
                    <input type="number" min="0" max="10"
                      style={{width:"100%",border:"none",textAlign:"center",fontSize:16,fontWeight:700,color,background:"transparent",outline:"none"}}
                      value={val||""}
                      onChange={e=>{
                        const v=parseInt(e.target.value)||0;
                        setHumor(prev=>({...prev,[key]:Math.min(10,Math.max(0,v))}));
                      }}
                      placeholder="—"/>
                    <div style={{fontSize:8,color:C.grayL,marginTop:2}}>{dia.slice(8)}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{background:"white",borderRadius:14,padding:14,border:"1px solid #EDE0F5"}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>Escala de referencia</div>
            {[[0,3,"Bajo","#FDECEA","#C0392B"],[4,6,"Moderado","#FEF3E0","#E8A020"],[7,10,"Bueno","#E8F8EF","#1a7a3c"]].map(([min,max,l,bg,c])=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <div style={{background:bg,borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700,color:c}}>{min}–{max}</div>
                <span style={{fontSize:12,color:C.grayL}}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECURSOS TCC */}
      {tab==="recursos" && (
        <div>
          <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>🔍 Distorsiones cognitivas</div>
          {DISTORSIONES.map(d=>(
            <div key={d.id} style={{background:"white",borderRadius:12,padding:12,marginBottom:8,border:"1px solid #EDE0F5"}}>
              <div style={{fontWeight:700,fontSize:13,color:C.terra,marginBottom:3}}>{d.label}</div>
              <div style={{fontSize:12,color:C.grayL}}>{d.desc}</div>
            </div>
          ))}
          <div style={{background:C.terraF,borderRadius:14,padding:14,marginTop:4}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>📐 Triángulo cognitivo de Beck</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {[["Yo","Visión negativa de uno mismo","#FDECEA","#C0392B"],["Mundo","Experiencias negativas del entorno","#FEF3E0","#E8A020"],["Futuro","Expectativas negativas","#EBF3FB","#5B8DB8"]].map(([t,d,bg,c])=>(
                <div key={t} style={{background:bg,borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
                  <div style={{fontWeight:700,fontSize:14,color:c,marginBottom:4}}>{t}</div>
                  <div style={{fontSize:10,color:C.grayL,lineHeight:1.4}}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default function HadrionApp() {
  // Cargar desde localStorage o usar datos iniciales
  const stored = loadFromStorage();

  const [users,            setUsersRaw]   = useState(stored?.users            || INIT_USERS);
  const [user,             setUser]       = useState(stored?.user             || null);
  const [active,           setActive]     = useState("dashboard");
  const [patients,         setPatientsRaw]= useState(stored?.patients         || INIT_PATIENTS);
  const [sessions,         setSessionsRaw]= useState(stored?.sessions         || INIT_SESSIONS);
  const [payments,         setPaymentsRaw]= useState(stored?.payments         || INIT_PAYMENTS);
  const [agendaItems,      setAgendaRaw]  = useState(stored?.agendaItems      || [
    { id:1, patient:"Valentina Lopez", time:"09:00", end:"09:45", type:"Sesion",    color:C.terra,  date:"2026-05-28" },
    { id:2, patient:"Martin Garcia",   time:"10:00", end:"10:45", type:"Evaluacion",color:C.sage,   date:"2026-05-28" },
    { id:3, patient:"Sofia Ramirez",   time:"11:30", end:"12:15", type:"Sesion",    color:C.purple, date:"2026-05-28" },
    { id:4, patient:"Tomas Herrera",   time:"09:00", end:"09:45", type:"Sesion",    color:C.info,   date:"2026-05-29" },
  ]);
  const [plan,             setPlanRaw]    = useState(stored?.plan             || INIT_PLAN);
  const [registerRequests, setRegRaw]     = useState(stored?.registerRequests || []);
  const [precios, setPreciosRaw] = useState(stored?.precios || {
    basico:490, pro:1200, clinica:2800, colegio:4500,
    basicoUSD:12, proUSD:30, clinicaUSD:70, colegioUSD:110,
    mpLinkBasico:"", mpLinkPro:"", mpLinkClinica:"", stripeLink:""
  });
  const setPrecios = v => { setPreciosRaw(v); saveToStorage({ users, user, patients, sessions, payments, agendaItems, plan, registerRequests, precios:v, documentos, plantillas, psicoDatos, tccDatos, liqConfigs, liqAsistencias, chatHistory }); };
  // Documentos generados (informes IA guardados)
  const [documentos, setDocumentosRaw] = useState(stored?.documentos || []);
  const setDocumentos = v => { const val=typeof v==="function"?v(documentos):v; setDocumentosRaw(val); saveToStorage({ users, user, patients, sessions, payments, agendaItems, plan, registerRequests, precios, documentos:val, plantillas, psicoDatos, tccDatos, liqConfigs, liqAsistencias, chatHistory }); };
  // Plantillas personalizadas del usuario
  const [plantillas, setPlantillasRaw] = useState(stored?.plantillas || []);
  const setPlantillas = v => { const val=typeof v==="function"?v(plantillas):v; setPlantillasRaw(val); saveToStorage({ users, user, patients, sessions, payments, agendaItems, plan, registerRequests, precios, documentos, plantillas:val, psicoDatos, tccDatos, liqConfigs, liqAsistencias, chatHistory }); };
  // Psicología — registros persistidos
  const [psicoDatos, setPsicoDatosRaw] = useState(stored?.psicoDatos || { registros:[], experimentos:[], jerarquia:[], humor:{} });
  const setPsicoDatos = v => { const val=typeof v==="function"?v(psicoDatos):v; setPsicoDatosRaw(val); persist("psicoDatos",null,val); };
  // TCC — registros persistidos  
  const [tccDatos, setTccDatosRaw] = useState(stored?.tccDatos || { registros:[], experimentos:[], jerarquia:[], humor:{} });
  const setTccDatos = v => { const val=typeof v==="function"?v(tccDatos):v; setTccDatosRaw(val); persist("tccDatos",null,val); };
  // Liquidación — configs y asistencias persistidas
  const [liqConfigs, setLiqConfigsRaw] = useState(stored?.liqConfigs || {});
  const setLiqConfigs = v => { const val=typeof v==="function"?v(liqConfigs):v; setLiqConfigsRaw(val); persist("liqConfigs",null,val); };
  const [liqAsistencias, setLiqAsistenciasRaw] = useState(stored?.liqAsistencias || {});
  const setLiqAsistencias = v => { const val=typeof v==="function"?v(liqAsistencias):v; setLiqAsistenciasRaw(val); persist("liqAsistencias",null,val); };
  // Chat IA — historial persistido
  const [chatHistory, setChatHistoryRaw] = useState(stored?.chatHistory || [
    { role:"assistant", content:"Hola! Soy tu asistente clínico. Podés cargar los datos de un paciente y pedirme informes, objetivos, anamnesis, o lo que necesites. ¿Con qué empezamos?" }
  ]);
  const setChatHistory = v => { const val=typeof v==="function"?v(chatHistory):v; setChatHistoryRaw(val); persist("chatHistory",null,val); };

  const [selPatId,         setSelPatId]   = useState(null);
  const [showQS,           setShowQS]     = useState(false);
  const [qsF,              setQsF]        = useState({ patientId:"", note:"" });
  const [lang,             setLang]       = useState("es");
  const [sessionKicked,    setSessionKicked] = useState(false);

  // ── Sesión única: verificar cada 60s que el token sigue vigente ──
  useEffect(() => {
    if (!user) return;
    const check = setInterval(() => {
      const stored = loadFromStorage();
      if (!stored?.user || stored.user.id !== user.id) { clearInterval(check); setUser(null); return; }
      if (stored.user.sessionToken && user.sessionToken && stored.user.sessionToken !== user.sessionToken) {
        clearInterval(check);
        setSessionKicked(true);
        setTimeout(() => { setUser(null); setSessionKicked(false); }, 4000);
      }
    }, 60000);
    return () => clearInterval(check);
  }, [user]);

  // Wrappers que persisten automáticamente
  const persist = (key, v, val) => {
    try {
      const data = { users, user, patients, sessions, payments, agendaItems, plan,
        registerRequests, precios, documentos, plantillas,
        psicoDatos, tccDatos, liqConfigs, liqAsistencias, chatHistory };
      if (key) data[key] = val;
      saveToStorage(data);
    } catch(e) { console.warn("persist error:", e); }
  };
  const setUsers    = v => { const val=typeof v==="function"?v(users):v;    setUsersRaw(val);    persist("users",v,val); };
  const setPatients = v => { const val=typeof v==="function"?v(patients):v; setPatientsRaw(val); persist("patients",v,val); };
  const setSessions = v => { const val=typeof v==="function"?v(sessions):v; setSessionsRaw(val); persist("sessions",v,val); };
  const setPayments = v => { const val=typeof v==="function"?v(payments):v; setPaymentsRaw(val); persist("payments",v,val); };
  const setAgenda   = v => { const val=typeof v==="function"?v(agendaItems):v; setAgendaRaw(val); persist("agendaItems",v,val); };
  const setPlan     = v => { const val=typeof v==="function"?v(plan):v;     setPlanRaw(val);     persist("plan",v,val); };
  const setReg      = v => { const val=typeof v==="function"?v(registerRequests):v; setRegRaw(val); persist("registerRequests",v,val); };

  const handleRegisterRequest = (form) => {
    setReg(prev => [...prev, { id:makeId(), date:new Date().toLocaleDateString("es-UY"), ...form, status:"pendiente" }]);
  };

  const logout = () => {
    saveToStorage({ users, user:null, patients, sessions, payments, agendaItems, plan, registerRequests,
      precios, documentos, plantillas, psicoDatos, tccDatos, liqConfigs, liqAsistencias, chatHistory });
    setUser(null); setActive("dashboard");
  };

  const saveQS = () => {
    if (!qsF.patientId || !qsF.note) return;
    const p = patients.find(x => String(x.id) === String(qsF.patientId));
    const newSess = { id:makeId(), patientId:p?.id||qsF.patientId, patient:p?.name||"", date:new Date().toLocaleDateString("es-UY"), objective:"Sesion rapida", note:qsF.note, progress:50, activities:[], homework:"", estado:"", atencion:"", participacion:"", sensorial:[] };
    setSessions(prev => [newSess, ...prev]);
    setPatients(prev => prev.map(pat => String(pat.id) === String(qsF.patientId) ? { ...pat, sessions:pat.sessions+1 } : pat));
    setQsF({ patientId:"", note:"" }); setShowQS(false);
  };

  const setUserAndPersist = (u) => {
    const token = makeId();
    const userWithToken = { ...u, sessionToken: token, lastLogin: new Date().toLocaleString("es-UY") };
    // Actualizar token en lista de usuarios
    const updatedUsers = users.map(x => x.id === u.id ? userWithToken : x);
    setUsersRaw(updatedUsers);
    setUser(userWithToken);
    saveToStorage({ users:updatedUsers, user:userWithToken, patients, sessions, payments, agendaItems, plan,
      registerRequests, precios, documentos, plantillas, psicoDatos, tccDatos, liqConfigs, liqAsistencias, chatHistory });
  };

  const pages = {
    dashboard:  <Dashboard  user={user} patients={patients} sessions={sessions} payments={payments} setActive={setActive} setShowQS={setShowQS} agendaItems={agendaItems} />,
    agenda:     <Agenda     patients={patients} items={agendaItems} setItems={setAgenda} />,
    patients:   <Patients   patients={patients} setPatients={setPatients} setActive={setActive} setSelPatId={setSelPatId} sessions={sessions} />,
    payments:   <Payments   patients={patients} payments={payments} setPayments={setPayments} />,
    sessions:   <Sessions   patients={patients} sessions={sessions} setSessions={setSessions} setPatients={setPatients} />,
    history:    <History    patients={patients} sessions={sessions} selectedPatientId={selPatId} setPatients={setPatients} />,
    objectives: <GoalBank user={user}/>,
    activities: <Activities user={user}/>,
    phonology:  <Phonology />,
    reports:    <Reports    patients={patients} sessions={sessions} payments={payments} />,
    plan:       <PlanColaborativo patients={patients} users={users} plan={plan} setPlan={setPlan} />,
    resources:  <Resources plantillas={plantillas} setPlantillas={setPlantillas} documentos={documentos} setDocumentos={setDocumentos}/>,
    tea:        <TEAAutismo />,
    asistencias:<Asistencias patients={patients} setPatients={setPatients} />,
    organizaciones: (user?.role === "admin" || isClinica(user))
      ? <Organizaciones users={users} setUsers={setUsers} precios={precios} />
      : <div className="fu">
          <div style={{background:"linear-gradient(135deg,#F5F0FA,#EDE0F5)",borderRadius:18,padding:28,textAlign:"center",marginTop:20}}>
            <div style={{fontSize:48,marginBottom:12}}>🏫</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#7B5EA7",marginBottom:8}}>Función para Clínicas</div>
            <div style={{fontSize:13,color:"#6B6560",lineHeight:1.7,marginBottom:16}}>La gestión de organizaciones y equipos está disponible en el Plan Clínica o Colegio.</div>
            <a href="https://wa.me/59899926775?text=Hola%20Adriana%2C%20quiero%20actualizar%20al%20Plan%20Clínica" target="_blank" rel="noopener noreferrer"
              style={{display:"inline-block",background:"#25D366",color:"white",borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:13,textDecoration:"none"}}>
              💬 Actualizar plan
            </a>
          </div>
        </div>,
    admin:      user?.role === "admin"
      ? <Admin users={users} setUsers={setUsers} registerRequests={registerRequests} setRegisterRequests={setReg} currentUser={user} precios={precios} setPrecios={setPrecios} />
      : <div className="fu"><div className="alert alrtd">🔐 Solo administradores.</div></div>,
    ia:         <IAAsistente patients={patients} C={C} documentos={documentos} setDocumentos={setDocumentos} chatHistory={chatHistory} setChatHistory={setChatHistory}/>,
    psicologia: <Psicologia patients={patients} sessions={sessions} documentos={documentos} setDocumentos={setDocumentos} datos={psicoDatos} setDatos={setPsicoDatos}/>,
    tcc:        <TCC patients={patients} documentos={documentos} setDocumentos={setDocumentos} datos={tccDatos} setDatos={setTccDatos}/>,
    liquidacion: (user?.role === "admin" || isClinica(user))
      ? <Liquidacion users={users} currentUser={user} configs={liqConfigs} setConfigs={setLiqConfigs} asistenciasData={liqAsistencias} setAsistenciasData={setLiqAsistencias}/>
      : <div className="fu">
          <div style={{background:"linear-gradient(135deg,#F5F0FA,#EDE0F5)",borderRadius:18,padding:28,textAlign:"center",marginTop:20}}>
            <div style={{fontSize:48,marginBottom:12}}>💰</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#7B5EA7",marginBottom:8}}>Liquidación de Sueldos</div>
            <div style={{fontSize:13,color:"#6B6560",lineHeight:1.7,marginBottom:16}}>La liquidación de sueldos del equipo está disponible en el Plan Clínica o Colegio.</div>
            <a href="https://wa.me/59899926775?text=Hola%20Adriana%2C%20quiero%20el%20Plan%20Clínica" target="_blank" rel="noopener noreferrer"
              style={{display:"inline-block",background:"#25D366",color:"white",borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:13,textDecoration:"none"}}>
              💬 Actualizar plan
            </a>
          </div>
        </div>,
    profile:    <Profile user={user} onLogout={logout} setUser={u => { setUser(u); saveToStorage({ users, user:u, patients, sessions, payments, agendaItems, plan, registerRequests }); }} />,
  };

  const bnItems = [
    { id:"dashboard",  l:"Panel",    i:"🏠" },
    { id:"patients",   l:"Pacientes",i:"👥" },
    { id:"asistencias",l:"Cobros",   i:"📆" },
    { id:"ia",         l:"IA",       i:"🧠" },
    { id:user?.role==="admin"?"admin":"profile", l:user?.role==="admin"?"Admin":"Perfil", i:user?.role==="admin"?"🔐":"👤" },
  ];

  if (!user) return (
    <>
      <style>{CSS}</style>
      <Login onLogin={setUserAndPersist} users={users} onRegisterRequest={handleRegisterRequest} />
    </>
  );

  // Modal bloqueante suscripción vencida
  const diasRestantes = user.subscriptionEnd
    ? daysUntil(user.subscriptionEnd)
    : null;
  if (user.role !== "admin" && diasRestantes !== null && diasRestantes < 0) return (
    <>
      <style>{CSS}</style>
      <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#FDF0E8,#FAF8F5)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{background:"white",borderRadius:24,padding:"36px 26px",width:"100%",maxWidth:400,textAlign:"center",boxShadow:"0 8px 40px rgba(0,0,0,.12)"}}>
          <div style={{fontSize:48,marginBottom:12}}>🔒</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:700,color:"#2C2C2C",marginBottom:8}}>Suscripción vencida</div>
          <div style={{fontSize:14,color:"#9B9590",lineHeight:1.6,marginBottom:20}}>
            Tu acceso ha finalizado. Para renovar, contactá a Adriana por WhatsApp.
          </div>
          <a href="https://wa.me/59899926775?text=Hola%20Adriana%2C%20quiero%20renovar%20mi%20suscripci%C3%B3n%20a%20Hadrion"
            target="_blank" rel="noopener noreferrer"
            style={{display:"block",background:"#25D366",color:"white",borderRadius:12,padding:"12px 20px",fontWeight:700,fontSize:14,textDecoration:"none",marginBottom:10}}>
            💬 Renovar por WhatsApp
          </a>
          <button onClick={logout} style={{background:"#EDE0F5",border:"none",borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:13,cursor:"pointer",width:"100%",fontFamily:"sans-serif"}}>← Cerrar sesión</button>
        </div>
      </div>
    </>
  );

  if (sessionKicked) return (
    <>
      <style>{CSS}</style>
      <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#FDF0E8,#FAF8F5)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{background:"white",borderRadius:24,padding:"36px 26px",width:"100%",maxWidth:380,textAlign:"center",boxShadow:"0 8px 40px rgba(0,0,0,.12)"}}>
          <div style={{fontSize:48,marginBottom:12}}>📱</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"#2C2C2C",marginBottom:8}}>Sesión iniciada en otro dispositivo</div>
          <div style={{fontSize:14,color:"#9B9590",lineHeight:1.6}}>Tu sesión fue cerrada porque iniciaste sesión en otro dispositivo. Volvé a ingresar.</div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <Sidebar active={active} setActive={setActive} user={user} registerRequests={registerRequests} />
        <div className="mwrap">
          <div className="tbar">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", paddingBottom:6 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <button onClick={()=>setLang(l=>l==="es"?"en":"es")}
                  style={{padding:"5px 11px",borderRadius:20,border:"1.5px solid #EDE0F5",background:"white",fontWeight:700,fontSize:11,cursor:"pointer",color:"#9B7EBD",fontFamily:"sans-serif",letterSpacing:".5px"}}>
                  {lang==="es"?"EN":"ES"}
                </button>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.charcoal }}>{user.name.split(" ")[0]}</div>
                  <div style={{ fontSize:10, color:C.grayL }}>{user.role==="admin"?"👑 Admin":"Profesional"}</div>
                </div>
                <div onClick={() => setActive("profile")} style={{ width:36, height:36, borderRadius:10, background:user.color, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                  {user.avatar}
                </div>
              </div>
            </div>
          </div>
          <div className="pbody">{pages[active] || pages.dashboard}</div>
          <Footer />
        </div>
        <nav className="bnav noprint">
          {bnItems.map(n => <button key={n.id} className={`bn${active===n.id?" active":""}`} onClick={() => setActive(n.id)}><span className="bnicon">{n.i}</span>{n.l}</button>)}
        </nav>
      </div>

      {showQS && (
        <Modal title="⚡ Sesion rapida" onClose={() => setShowQS(false)}>
          <div className="alert alrti">Registra una sesion agil sin seleccionar objetivos.</div>
          <div className="fg"><label className="lbl">Paciente</label>
            <select className="inp" value={qsF.patientId} onChange={e => setQsF({ ...qsF, patientId:e.target.value })}>
              <option value="">Selecciona...</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Nota rapida</label>
            <textarea className="inp" placeholder="¿Como fue la sesion?" value={qsF.note} onChange={e => setQsF({ ...qsF, note:e.target.value })} />
          </div>
          <button className="btn btnp btnfull" onClick={saveQS}>Guardar sesion rapida</button>
        </Modal>
      )}
    </>
  );
}
