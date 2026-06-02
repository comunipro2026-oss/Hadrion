// ================================================
// HADRION - Plataforma Terapeutica
// (c) 2025 Adriana Soba. Todos los derechos reservados.
// Desarrollado en Uruguay — comunipro12@gmail.com
// Prohibida su reproduccion sin autorizacion expresa.
// ================================================

import React, { useState, useEffect, useCallback } from "react";

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
  { id:"resources",  l:"Recursos",          i:"📚" },
  { id:"organizaciones", l:"Organizaciones",  i:"🏫", s:"Admin", adminOnly:true },
  { id:"admin",      l:"Administracion",    i:"🔐", adminOnly:true, badge:true },
  { id:"profile",    l:"Mi Perfil",         i:"👤" },
];

function Sidebar({ active, setActive, user, registerRequests=[] }) {
  return (
    <div className="sidebar">
      <div className="slogo">
        <div className="slogoicon">H</div>
        <div><div className="slogoname">Hadrion</div><div className="slogosub">Plataforma Clinica</div></div>
      </div>
      {NAV.filter(n => !n.adminOnly || user?.role === "admin").map(n => (
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
        <div style={{ fontSize:12, opacity:.7, marginBottom:3 }}>{cap(todayStr())}</div>
        <div className="wname">Hola, {user.name.split(" ")[0]} 👋</div>
        <div style={{ fontSize:13, opacity:.82, marginTop:3 }}>Bienvenida a tu plataforma clinica</div>
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
      <input className="inp" placeholder="🔍 Buscar por nombre o diagnostico..." value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom:12 }} />
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
    const p = patients.find(x => x.id === parseInt(f.patientId));
    setPayments(prev => [...prev, { id:makeId(), patientId:parseInt(f.patientId), patient:p?.name||"", amount:parseInt(f.amount), currency:f.currency||"UYU", type:f.type, date:f.date, method:f.method, notes:f.notes||"", status:"pagado" }]);
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
    const p = patients.find(x => x.id === parseInt(f.patientId));
    const patId = parseInt(f.patientId);
    if (!patId || !f.note) return;
    const newSession = { id:makeId(), patientId:patId, patient:p?.name||"", date:new Date().toLocaleDateString("es-UY"), ...f, duration:f.duration||45, activities:f.activities ? f.activities.split(",").map(s => s.trim()) : [] };
    setSessions(prev => [newSession, ...prev]);
    // actualizar contador de sesiones del paciente
    setPatients(prev => prev.map(pat => pat.id === parseInt(f.patientId) ? { ...pat, sessions: pat.sessions + 1 } : pat));
    setF({ patientId:"", objective:"", note:"", progress:50, activities:"", homework:"", estado:"", atencion:"", participacion:"", sensorial:[] });
    setShowNew(false);
  };

  return (
    <div className="fu">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div><div className="pt">Registros Clinicos</div><div className="ps">Historial de sesiones</div></div>
        <button className="btn btnp btnsm noprint" onClick={() => setShowNew(true)}>+ Registrar</button>
      </div>
      {sessions.length === 0 && <div style={{ textAlign:"center", padding:"32px 0", color:C.grayL }}>📝 Sin registros aun</div>}
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
  const patient = patients.find(p => p.id === parseInt(pid));
  const pSess   = sessions.filter(s => s.patientId === parseInt(pid));
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
function Activities() {
  const [fil, setFil]         = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  const [sel, setSel]         = useState(null);
  const [nivel, setNivel]     = useState("facil");
  const tC      = { Clinica:{ bg:C.sageF, c:C.forest }, Familia:{ bg:C.terraF, c:C.terra } };
  const nivelC  = { facil:{ bg:"#E8F8EF", c:"#27AE60" }, medio:{ bg:C.goldF, c:C.gold }, dificil:{ bg:C.dangerF, c:C.danger } };

  const filtered = ACTIVITIES_DB.filter(a => {
    const matchFil   = fil === "all" || a.type === fil || a.target === fil || a.category === fil;
    const matchAge   = ageGroup === "all" || a.ageGroup?.includes(ageGroup);
    return matchFil && matchAge;
  });

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Banco de Actividades</div><div className="ps">Actividades con 3 niveles de dificultad y grupo etario</div></div>
      <div className="filrow">
        {["all","Clinica","Familia","Lenguaje","Lectoescritura","Articulacion","Regulacion","Atencion","TEL","Dislexia","TDAH","Disartria"].map(f => (
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
  const patient = patients.find(p => p.id === parseInt(pid));
  const pSess   = sessions.filter(s => s.patientId === parseInt(pid));
  const totalC  = payments.filter(p => p.status === "pagado").reduce((a, b) => a + b.amount, 0);
  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Reportes</div><div className="ps">Estadisticas e informes</div></div>
      <div className="sgrid">
        <div className="sc2"><div className="snum">{patients.length}</div><div className="slbl">Pacientes</div></div>
        <div className="sc2"><div className="snum">{sessions.length}</div><div className="slbl">Sesiones</div></div>
        <div className="sc2"><div className="snum">${(totalC/1000).toFixed(0)}k</div><div className="slbl">Cobrado</div></div>
        <div className="sc2"><div className="snum">{payments.filter(p => p.status==="pendiente").length}</div><div className="slbl">Pendientes</div></div>
      </div>
      <SC title="⚙️ Generar informe">
        <div className="fg"><label className="lbl">Paciente</label>
          <select className="inp" value={pid} onChange={e => setPid(e.target.value)}>
            <option value="">Selecciona...</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        {patient && (
          <>
            <div className="alert alrts">✅ {pSess.length} sesiones registradas — listo para generar</div>
            <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
              <button className="btn btnp btnsm" onClick={() => window.print()}>🖨️ Evolutivo</button>
              <button className="btn btno btnsm" onClick={() => window.print()}>📄 Derivacion</button>
              <button className="btn btng btnsm" onClick={() => window.print()}>👨‍👩‍👧 Para familias</button>
            </div>
          </>
        )}
      </SC>
      <SC title="📊 Diagnosticos">
        {Object.entries(patients.reduce((a, p) => { a[p.diagnosis]=(a[p.diagnosis]||0)+1; return a; }, {})).map(([d, n]) => (
          <div key={d} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.sand}` }}>
            <div style={{ flex:1, fontWeight:500, fontSize:13 }}>{d}</div>
            <div className="prog" style={{ width:90 }}><div className="progf" style={{ width:`${(n/patients.length)*100}%` }} /></div>
            <div style={{ fontSize:13, fontWeight:700, color:C.terra, minWidth:20 }}>{n}</div>
          </div>
        ))}
      </SC>
    </div>
  );
}

// ─── RESOURCES ────────────────────────────────────────────────────────────────
function Resources() {
  const [sel, setSel] = useState(null);
  const recursos = [
    { i:"📋", t:"Plantilla de anamnesis", d:"Formulario completo de historia clinica inicial", c:"Evaluacion",
      contenido:`PLANTILLA DE ANAMNESIS
──────────────────────────────────────
DATOS DEL PACIENTE
Nombre: _______________________________________________
Fecha de nacimiento: ________________  Edad: _____ años
Diagnostico: __________________________________________
Tutor/Responsable: ____________________________________
Telefono: _____________________________________________
Email: ________________________________________________

MOTIVO DE CONSULTA
_______________________________________________________
_______________________________________________________

ANTECEDENTES
Embarazo y parto: _____________________________________
Hitos del desarrollo motor: ___________________________
Hitos del habla-lenguaje: _____________________________
Antecedentes medicos/neurologicos: ____________________
Historia familiar: ____________________________________

OBSERVACIONES INICIALES
_______________________________________________________
_______________________________________________________

Profesional: ___________________  Fecha: ______________
Hadrion — comunipro12@gmail.com` },

    { i:"🎯", t:"Guia de objetivos TEL", d:"Objetivos terapeuticos por nivel para TEL", c:"Lenguaje",
      contenido:`OBJETIVOS TERAPEUTICOS — TEL
──────────────────────────────────────
NIVEL INICIAL (0-12 meses de intervencion)
□ Comprension de consignas simples (1 paso)
□ Vocabulario basico receptivo/expresivo (50-100 palabras)
□ Emision de palabras aisladas
□ Contacto visual y atencion compartida

NIVEL MEDIO (12-24 meses)
□ Produccion de frases de 2-3 palabras
□ Vocabulario de 200+ palabras
□ Discriminacion auditiva de fonemas
□ Comprension de consignas de 2 pasos

NIVEL AVANZADO (+24 meses)
□ Oraciones completas con estructura SVO
□ Narrativa secuenciada (3-4 vinetas)
□ Conciencia fonologica nivel silabico
□ Comprension de preguntas wh- (quien, donde, que)

Profesional: ___________________  Fecha: ______________
Hadrion — comunipro12@gmail.com` },

    { i:"📊", t:"Escala de progreso", d:"Seguimiento visual del avance por objetivo", c:"Seguimiento",
      contenido:`ESCALA DE PROGRESO TERAPEUTICO
──────────────────────────────────────
Paciente: _____________________________________________
Periodo: _____________________________________________
Profesional: _________________________________________

OBJETIVO 1: ___________________________________________
Progreso: [ ]10% [ ]25% [ ]50% [ ]75% [ ]90% [ ]100%
Logrado: SI / NO   Fecha logro: ________________________
Observaciones: _______________________________________

OBJETIVO 2: ___________________________________________
Progreso: [ ]10% [ ]25% [ ]50% [ ]75% [ ]90% [ ]100%
Logrado: SI / NO   Fecha logro: ________________________
Observaciones: _______________________________________

OBJETIVO 3: ___________________________________________
Progreso: [ ]10% [ ]25% [ ]50% [ ]75% [ ]90% [ ]100%
Logrado: SI / NO   Fecha logro: ________________________
Observaciones: _______________________________________

Firma profesional: __________________ RUT: ____________
Hadrion — comunipro12@gmail.com` },

    { i:"🏠", t:"Guia actividades en casa", d:"Manual para familias con actividades diarias", c:"Familia",
      contenido:`GUIA DE ESTIMULACION EN CASA
──────────────────────────────────────
Queridas familias:
Estas actividades se hacen durante el dia, de forma
natural y divertida. Solo 5-10 minutos por actividad.

DURANTE EL BAÑO
✓ Nombrar partes del cuerpo mientras se banan
✓ Cantar canciones con gestos (cabeza, hombros, pies)
✓ Describir lo que sienten (frio/caliente, suave/aspero)

EN LA COCINA
✓ Nombrar ingredientes, colores y formas
✓ Describir lo que hacemos: "ahora mezclamos..."
✓ Pedir ayuda con instrucciones simples

EN EL AUTO / CAMINANDO
✓ Buscar letras o colores en carteles
✓ Contar objetos de un color
✓ Narrar lo que ven por la ventana

ANTES DE DORMIR (IMPRESCINDIBLE)
✓ Leer un cuento en voz alta 10 minutos
✓ Preguntar: ¿que paso en el cuento?
✓ Nombrar 3 cosas lindas del dia

REGLAS DE ORO
✗ No corregir directamente ("no se dice eso")
✓ Modelar: repetir correctamente y agregar mas
✓ Celebrar cada intento comunicativo
✓ Hablar despacio y con frases cortas

Contacto profesional: comunipro12@gmail.com
Hadrion — Plataforma Terapeutica Uruguay` },

    { i:"🔤", t:"Laminas fonologicas", d:"Guia de fonemas con emojis y palabras clave", c:"Fonologia",
      contenido:`LAMINAS FONOLOGICAS — HADRION
──────────────────────────────────────
Ver la seccion CONCIENCIA FONOLOGICA en la app
para acceder a las laminas interactivas con audio.

FONEMAS Y PALABRAS CLAVE:
/A/ ✈️ AVION  🌳 ARBOL  🐝 ABEJA  🦅 AGUILA
/E/ 🐘 ELEFANTE  ⭐ ESTRELLA  🪞 ESPEJO
/I/ ⛪ IGLESIA  🦎 IGUANA  🏝️ ISLA  🧲 IMAN
/O/ 🐻 OSO  🐑 OVEJA  👁️ OJO  🪣 OLLA
/U/ 🍇 UVA  👔 UNIFORME  🦄 UNICORNIO

/B/ 🚢 BARCO  🚲 BICICLETA  🐋 BALLENA
/C/ 🏠 CASA  🐇 CONEJO  🚛 CAMION
/CH/ 🍫 CHOCOLATE  🐷 CHANCHO
/D/ 🎲 DADO  🦕 DINOSAURIO  🐉 DRAGON
/F/ 🌸 FLOR  🔥 FUEGO  🍓 FRESA
/G/ 🐱 GATO  🎈 GLOBO  🌻 GIRASOL
/L/ 🌙 LUNA  ✏️ LAPIZ  📚 LIBRO
/M/ 🦋 MARIPOSA  🍎 MANZANA  🐒 MONO
/N/ ☁️ NUBE  🍊 NARANJA  ❄️ NIEVE
/P/ 🦆 PATO  ⚽ PELOTA  🚪 PUERTA
/R/ 🌹 ROSA  ⌚ RELOJ  🐸 RANA
/S/ ☀️ SOL  🪑 SILLA  🐸 SAPO
/T/ ✂️ TIJERAS  🚂 TREN  🐢 TORTUGA
/V/ 🐄 VACA  🎻 VIOLIN  ⛵ VELERO
/Z/ 👟 ZAPATO  🦊 ZORRO  🥕 ZANAHORIA

Hadrion — comunipro12@gmail.com` },

    { i:"📝", t:"Registro de sesion", d:"Plantilla editable para documentar sesiones", c:"Administracion",
      contenido:`REGISTRO DE SESION CLINICA
──────────────────────────────────────
Paciente: _____________________________________________
Fecha: _________________  Sesion N°: _________________
Profesional: _________________________________________
Duracion: ___________  Modalidad: Presencial / Virtual

OBJETIVO TRABAJADO HOY
_______________________________________________________

ESTADO DEL PACIENTE
Estado general:  □ Regulado  □ Cansado  □ Hiperactivo
Atencion:       □ Sostenida □ Fluctuante □ Dispersa
Participacion:  □ Buena    □ Parcial   □ Rechazo inicial

ACTIVIDADES REALIZADAS
1. ____________________________________________________
2. ____________________________________________________
3. ____________________________________________________

LOGROS DE LA SESION
_______________________________________________________

DIFICULTADES OBSERVADAS
_______________________________________________________

PROGRESO (0-100%): _____

TAREA PARA CASA
_______________________________________________________

PROXIMA SESION
Fecha: ____________________  Hora: __________________

Firma: ____________________
Hadrion — comunipro12@gmail.com` },

    { i:"📬", t:"Carta para la escuela", d:"Modelo de comunicacion para derivaciones escolares", c:"Derivacion",
      contenido:`INFORME PARA ESTABLECIMIENTO EDUCATIVO
──────────────────────────────────────
Lugar y fecha: ________________________________________

Sr./Sra. Director/a del establecimiento:
___________________________________

Me dirijo a usted en mi caracter de profesional
especialista en ______________, para informar que
el/la alumno/a _________________________, que concurre
a ________ grado/año, se encuentra actualmente en
tratamiento de _________________ desde ______________.

El/la paciente ha mostrado avances en:
• _________________________________________________
• _________________________________________________

Se solicita al equipo docente tener en cuenta las
siguientes adecuaciones:
• _________________________________________________
• _________________________________________________
• Tiempo adicional en evaluaciones escritas
• Ubicacion preferencial en el aula

Quedo a su disposicion para ampliar la informacion
o coordinar una reunion si lo considera necesario.

Atentamente,
___________________________________
Especialidad: __________________________
Matricula profesional N°: _______________
Telefono: _____________________________
Email: ________________________________

Hadrion — comunipro12@gmail.com` },

    { i:"💡", t:"Estrategias TDAH", d:"Guia completa para docentes y familia", c:"TDAH",
      contenido:`ESTRATEGIAS PARA TDAH
──────────────────────────────────────
PARA EL AULA
✓ Ubicar al alumno cerca del docente y de la pizarra
✓ Instrucciones cortas: una sola consigna a la vez
✓ Dividir tareas largas en pasos numerados
✓ Usar senales visuales: carteles, colores, imagenes
✓ Tiempo extra en evaluaciones (50% adicional)
✓ Permitir movimiento: borrar la pizarra, repartir
✓ Uso de organizadores graficos y mapas conceptuales

PARA LA FAMILIA
✓ Rutinas fijas y predecibles (mismo horario siempre)
✓ Espacio de estudio sin distractores (sin TV ni cel)
✓ Descansos cada 20 minutos de estudio
✓ Reforzar positivamente los logros, por pequenos que sean
✓ Agenda visual con pictogramas para anticipar el dia
✓ Pautas de sueno: horario regular, sin pantallas 1h antes

ESTRATEGIAS DE AUTORREGULACION
✓ Semaforo de emociones (ver actividad en la app)
✓ Respiracion consciente: inhalar 4 seg, exhalar 6 seg
✓ Tiempo fuera positivo (no punitivo): 5 min de calma
✓ Termometro del enojo: identificar la escala 1-10
✓ Tarjeta de estrategias en el estuche/mochila

SEÑALES DE ALERTA — CONSULTAR AL PROFESIONAL
! Aumento marcado de la impulsividad
! Dificultades para dormir persistentes
! Baja autoestima o frases de "soy tonto/a"
! Rechazo escolar sostenido

Contacto: comunipro12@gmail.com
Hadrion — Plataforma Terapeutica Uruguay` },
  ];

  return (
    <div className="fu">
      <div style={{ marginBottom:14 }}><div className="pt">Recursos</div><div className="ps">Guias, plantillas y materiales imprimibles</div></div>
      <div className="alert alrti">Toca cualquier recurso para ver el contenido completo e imprimirlo.</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:10 }}>
        {recursos.map((r, i) => (
          <div key={i} className="card" style={{ cursor:"pointer", padding:12 }} onClick={() => setSel(r)}>
            <div style={{ fontSize:26, marginBottom:6 }}>{r.i}</div>
            <div style={{ fontWeight:700, fontSize:12, color:C.charcoal, marginBottom:3 }}>{r.t}</div>
            <div style={{ fontSize:11, color:C.grayL, marginBottom:7 }}>{r.d}</div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span className="badge" style={{ background:C.terraF, color:C.terra, fontSize:10 }}>{r.c}</span>
              <span style={{ fontSize:10, color:C.info }}>ver →</span>
            </div>
          </div>
        ))}
      </div>
      {sel && (
        <Modal title={`${sel.i} ${sel.t}`} onClose={() => setSel(null)}>
          <div style={{ background:C.cream, borderRadius:12, padding:14, marginBottom:12, whiteSpace:"pre-wrap", fontSize:12, color:C.charcoal, lineHeight:1.8, maxHeight:"55vh", overflowY:"auto", fontFamily:"monospace" }}>
            {sel.contenido}
          </div>
          <button className="btn btnp btnfull noprint" onClick={() => window.print()}>🖨️ Imprimir / Guardar PDF</button>
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

  const patient = patients.find(p => p.id === parseInt(pid));
  const pPlan   = plan.filter(p => p.patientId === parseInt(pid));

  const save = () => {
    if (!pid || !f.professional) return;
    setPlan(prev => [...prev, { id:makeId(), patientId:parseInt(pid), ...f, objectives:f.objectives.split(",").map(o=>o.trim()).filter(Boolean), lastUpdate:new Date().toLocaleDateString("es-UY") }]);
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
    const msg = encodeURIComponent(`Hola ${f.name.split(" ")[0]}! Te doy acceso a Hadrion.\n🔗 hadrion.netlify.app\n📧 Email: ${f.email}\n🔑 Contraseña: ${f.password}\nPlan: ${f.plan} — 14 dias de prueba. Cualquier consulta escribime!`);
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  const sendEmail = () => {
    const subject = encodeURIComponent("Acceso a Hadrion — Plataforma Clinica");
    const body    = encodeURIComponent(`Hola ${f.name}!\n\nTe doy acceso a Hadrion, tu plataforma clinica.\n\nURL: https://hadrion.netlify.app\nEmail: ${f.email}\nContraseña: ${f.password}\nPlan: ${f.plan}\n\n14 dias de prueba gratuitos. Cualquier consulta: comunipro12@gmail.com\n\nAdriana Soba`);
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
🔗 hadrion-v4.netlify.app
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
          <button className="btn btno btnsm" onClick={()=>navigator.clipboard?.writeText("✨ ¿Sos fonoaudióloga...").catch(()=>{})}>
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
            <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>💰 Precios sugeridos Uruguay 2025</div>
            {[["Plan Básico","1 usuario","$490 UYU/mes"],["Plan Pro","3 usuarios + IA","$1.200 UYU/mes"],["Plan Clínica","10 usuarios","$2.800 UYU/mes"],["Plan Colegio","30 usuarios","$4.500 UYU/mes"]].map(([p,d,price]) => (
              <div key={p} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,.2)"}}>
                <div><div style={{fontWeight:600,fontSize:12}}>{p}</div><div style={{fontSize:10,opacity:.8}}>{d}</div></div>
                <div style={{fontWeight:700,fontSize:13}}>{price}</div>
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

// ─── FOOTER ───────────────────────────────────────────────────────────────────
// ─── ORGANIZACIONES ───────────────────────────────────────────────────────────
const PLANES_ORG = [
  { id:"basico",   label:"Básico",  maxUsers:1,  precio:490,  color:"#9B7EBD" },
  { id:"pro",      label:"Pro",     maxUsers:3,  precio:1200, color:"#5B8DB8" },
  { id:"clinica",  label:"Clínica", maxUsers:10, precio:2800, color:"#2ECC71" },
  { id:"colegio",  label:"Colegio", maxUsers:30, precio:4500, color:"#E8A020" },
];

function Organizaciones({ users, setUsers }) {
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
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:16}}>
        {PLANES_ORG.map(p => (
          <div key={p.id} style={{background:"white",borderRadius:12,padding:"12px 14px",border:`2px solid ${p.color}33`}}>
            <div style={{fontWeight:700,fontSize:13,color:p.color}}>{p.label}</div>
            <div style={{fontSize:11,color:"#9B9590",marginTop:2}}>Hasta {p.maxUsers} usuario{p.maxUsers>1?"s":""}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:"#2C2C2C",marginTop:4}}>${p.precio.toLocaleString("es-UY")} UYU/mes</div>
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
  { area:"Comunicación social",  icon:"💬", color:"#5B8DB8", items:["Mantener contacto visual 5 seg","Responder a su nombre","Iniciar interacción espontánea","Imitar gestos simples","Señalar para compartir interés","Usar gestos protodeclarativos"] },
  { area:"Juego",                icon:"🎮", color:"#9B7EBD", items:["Juego funcional con objetos","Juego simbólico básico","Juego paralelo con par","Juego cooperativo simple","Turnos en juego estructurado","Imitar juego de otro niño"] },
  { area:"Regulación sensorial", icon:"🌀", color:"#E8A020", items:["Tolerar estímulos táctiles","Adaptar nivel de activación","Usar herramientas de regulación","Identificar estado sensorial","Solicitar pausa","Tolerar cambios de rutina"] },
  { area:"CAA",                  icon:"🗣️", color:"#2ECC71", items:["Usar pictogramas para elegir","Construir frases con CAA","Hacer pedidos con dispositivo","Rechazar con CAA","Comentar con CAA","Responder preguntas básicas"] },
  { area:"Vida diaria",          icon:"🏠", color:"#E8719C", items:["Seguir rutina visual","Completar secuencia de higiene","Preparar material escolar","Tolerar cambios de ambiente","Comer variedad de texturas","Vestirse con apoyo"] },
  { area:"Conducta",             icon:"🎯", color:"#C0392B", items:["Reducir conducta autolesiva","Aumentar tolerancia a frustración","Responder a No","Esperar turno 30 seg","Aceptar límites","Transicionar entre actividades"] },
  { area:"Funciones ejecutivas", icon:"🧠", color:"#8B7BB5", items:["Planificar tarea de 2 pasos","Inhibir respuesta impulsiva","Flexibilidad ante cambio","Memoria de trabajo simple","Organización de materiales","Automonitoreo básico"] },
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
                <span style={{fontSize:12,color:"#9B9590"}}>{selArea===a.area?"▲":"▼"} {a.items.length} obj.</span>
              </div>
              {selArea === a.area && (
                <div style={{padding:"14px 16px"}}>
                  {a.items.map((obj,i) => (
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"7px 0",borderBottom:i<a.items.length-1?"1px solid #EDE0F5":"none"}}>
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
// IA TERAPEUTICA - Powered by Claude API
// ═══════════════════════════════════════
function IAAsistente({patients,C}){
  const [tab,setTab]=React.useState("objetivos");
  const [selPat,setSelPat]=React.useState("");
  const [diagnostico,setDiagnostico]=React.useState("");
  const [edad,setEdad]=React.useState("");
  const [loading,setLoading]=React.useState(false);
  const [result,setResult]=React.useState("");
  const [error,setError]=React.useState("");
  const [librePrompt,setLibrePrompt]=React.useState("");
  // Campos para anamnesis y evaluación
  const [motivo,setMotivo]=React.useState("");
  const [antecedentes,setAntecedentes]=React.useState("");
  const [especialidad,setEspecialidad]=React.useState("fonoaudióloga");

  const callClaude=async(prompt)=>{
    setLoading(true);setResult("");setError("");
    try{
      const res=await fetch("/.netlify/functions/claude",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1500,
          messages:[{role:"user",content:prompt}]
        })
      });
      const data=await res.json();
      if(data.content&&data.content[0])setResult(data.content[0].text);
      else setError("No se pudo obtener respuesta. Intentá de nuevo.");
    }catch(e){setError("Error de conexión. Verificá tu internet.");}
    setLoading(false);
  };

  const getPatientContext=(p)=>{
    if(!p) return "";
    return `Paciente: ${p.name}, ${p.age} años, diagnóstico: ${p.diagnosis}, ${p.sessions} sesiones realizadas. Objetivos: ${(p.goals||[]).join(", ")||"no especificados"}. Notas: ${p.notes||"sin notas"}. Anamnesis: ${p.motivo||""}. Antecedentes: ${p.antecedentes||""}. Desarrollo: ${p.desarrollo||""}.`;
  };

  const generarObjetivos=()=>{
    if(!diagnostico||!edad){setError("Completá diagnóstico y edad.");return;}
    callClaude(`Sos una ${especialidad} experta en Uruguay. Generá 6 objetivos terapéuticos específicos, concretos y medibles para un paciente de ${edad} años con diagnóstico de ${diagnostico}. Para cada objetivo incluí: descripción clara, criterio de logro observable y tiempo estimado. Formato lista numerada. En español, sin asteriscos ni markdown.`);
  };

  const generarPlan=()=>{
    if(!diagnostico||!edad){setError("Completá diagnóstico y edad.");return;}
    callClaude(`Sos una ${especialidad} experta. Creá un plan terapéutico mensual para un paciente de ${edad} años con ${diagnostico}. Incluí: Semana 1, 2, 3 y 4 con actividades específicas, materiales necesarios y estrategias para cada sesión. Al final agregá indicaciones para la familia. En español claro, sin asteriscos ni markdown.`);
  };

  const generarInforme=()=>{
    const p=patients.find(x=>x.name===selPat);
    if(!p){setError("Seleccioná un paciente.");return;}
    callClaude(`Sos una ${especialidad} redactando un informe de progreso para la familia de ${p.name}. ${getPatientContext(p)} Redactá un informe profesional y claro de 4 párrafos: 1) Presentación del paciente y motivo de consulta, 2) Evaluación del progreso actual y logros, 3) Área de trabajo actual y estrategias, 4) Recomendaciones para el hogar y próximos pasos. En español formal, sin asteriscos ni markdown.`);
  };

  const generarEvaluacion=()=>{
    const p=patients.find(x=>x.name===selPat);
    if(!p){setError("Seleccioná un paciente.");return;}
    callClaude(`Sos una ${especialidad} redactando un informe de evaluación diagnóstica formal. Paciente: ${p.name}, ${p.age} años. Motivo de consulta: ${motivo||p.notes||"no especificado"}. Antecedentes: ${antecedentes||p.antecedentes||"no especificados"}. Diagnóstico: ${p.diagnosis}. Redactá un informe de evaluación completo con las secciones: DATOS DEL PACIENTE, MOTIVO DE CONSULTA, ANTECEDENTES, EVALUACIÓN REALIZADA, RESULTADOS, DIAGNÓSTICO, RECOMENDACIONES. En español formal, para entregar a institución educativa o médica.`);
  };

  const completarAnamnesis=()=>{
    const p=patients.find(x=>x.name===selPat);
    if(!p){setError("Seleccioná un paciente.");return;}
    callClaude(`Sos una ${especialidad} completando una anamnesis clínica. Con los datos disponibles del paciente: nombre ${p.name}, ${p.age} años, diagnóstico ${p.diagnosis}, motivo de consulta: ${motivo||"no especificado"}, antecedentes: ${antecedentes||"no especificados"}. Completá y expandí la anamnesis con: 1) Historia del desarrollo comunicativo, 2) Antecedentes familiares relevantes, 3) Antecedentes médicos relevantes, 4) Historia escolar, 5) Conducta durante la evaluación, 6) Observaciones clínicas importantes. Formato estructurado, en español, sin asteriscos ni markdown.`);
  };

  const generarSeguimiento=()=>{
    const p=patients.find(x=>x.name===selPat);
    if(!p){setError("Seleccioná un paciente.");return;}
    callClaude(`Sos una ${especialidad}. Analizá el progreso de ${p.name}, ${p.age} años, diagnóstico ${p.diagnosis}, con ${p.sessions} sesiones realizadas. Objetivos trabajados: ${(p.goals||[]).join(", ")||"no especificados"}. Generá: A) Evaluación del progreso actual, B) Logros alcanzados, C) Dificultades persistentes, D) Próximos pasos recomendados, E) Actividades prioritarias para las próximas 4 semanas. En español claro, sin asteriscos ni markdown.`);
  };

  const generarLibre=()=>{
    if(!librePrompt.trim()){setError("Escribí tu consulta.");return;}
    const ctx = selPat ? `Contexto del paciente: ${getPatientContext(patients.find(x=>x.name===selPat))}` : "";
    callClaude(`Sos una ${especialidad} experta. ${ctx} ${librePrompt}`);
  };

  const tabs=[
    {id:"objetivos",  icon:"🎯", label:"Objetivos"},
    {id:"plan",       icon:"📅", label:"Plan"},
    {id:"evaluacion", icon:"📋", label:"Evaluación"},
    {id:"anamnesis",  icon:"📝", label:"Anamnesis"},
    {id:"informe",    icon:"📄", label:"Informe"},
    {id:"seguimiento",icon:"📊", label:"Seguimiento"},
    {id:"libre",      icon:"💬", label:"Libre"},
  ];

  const PatientSelect = () => (
    <div className="fg">
      <label className="lbl">Paciente</label>
      <select className="inp" value={selPat} onChange={e=>{
        setSelPat(e.target.value);
        const p=patients.find(x=>x.name===e.target.value);
        if(p){ setDiagnostico(p.diagnosis||""); setEdad(String(p.age||"")); setMotivo(p.motivo||""); setAntecedentes(p.antecedentes||""); }
      }}>
        <option value="">Seleccioná un paciente...</option>
        {patients.filter(p=>p.status==="active").map(p=>(
          <option key={p.id} value={p.name}>{p.name} — {p.age} años — {p.diagnosis}</option>
        ))}
      </select>
    </div>
  );

  return(
    <div className="fu">
      <div style={{marginBottom:14}}>
        <div className="pt">💡 Asistente IA</div>
        <div className="ps">Informes, evaluaciones, anamnesis y más con Claude AI</div>
      </div>

      <div style={{background:"linear-gradient(135deg,#9B7EBD,#7B5EA7)",borderRadius:16,padding:14,color:"white",marginBottom:16,display:"flex",gap:12,alignItems:"center"}}>
        <div style={{fontSize:32}}>🧠</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:2}}>Powered by Claude AI</div>
          <div style={{fontSize:11,opacity:.85}}>Asistencia clínica inteligente · Resultado editable antes de enviar</div>
        </div>
      </div>

      {/* Selector de especialidad */}
      <div className="fg">
        <label className="lbl">Tu especialidad</label>
        <select className="inp" value={especialidad} onChange={e=>setEspecialidad(e.target.value)}>
          {["fonoaudióloga","psicopedagoga","psicóloga","psicomotricista","terapeuta ocupacional","fisioterapeuta"].map(s=><option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Tabs scrolleables */}
      <div style={{display:"flex",gap:6,overflowX:"auto",padding:"4px 0",marginBottom:14}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);setResult("");setError("");}}
            style={{padding:"8px 12px",borderRadius:20,border:"none",background:tab===t.id?"#9B7EBD":"#EDE0F5",color:tab===t.id?"white":"#6B6560",fontWeight:700,fontSize:12,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"sans-serif",flexShrink:0}}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* OBJETIVOS */}
      {tab==="objetivos" && (
        <div>
          <div className="fg"><label className="lbl">Diagnóstico</label>
            <input className="inp" placeholder="ej: TEL, Dislexia, TDAH, Disartria, TEA..." value={diagnostico} onChange={e=>setDiagnostico(e.target.value)}/>
          </div>
          <div className="fg"><label className="lbl">Edad</label>
            <input className="inp" type="number" placeholder="años" value={edad} onChange={e=>setEdad(e.target.value)} min="1" max="99"/>
          </div>
          <div className="alert alrti" style={{fontSize:11}}>💡 También podés seleccionar un paciente arriba para autocompletar los datos</div>
          <PatientSelect/>
          <button className="btn btnp btnfull" onClick={generarObjetivos} disabled={loading}>
            {loading?"⏳ Generando...":"🎯 Generar 6 objetivos terapéuticos"}
          </button>
        </div>
      )}

      {/* PLAN */}
      {tab==="plan" && (
        <div>
          <div className="fg"><label className="lbl">Diagnóstico</label>
            <input className="inp" placeholder="ej: TEL, Dislexia..." value={diagnostico} onChange={e=>setDiagnostico(e.target.value)}/>
          </div>
          <div className="fg"><label className="lbl">Edad</label>
            <input className="inp" type="number" placeholder="años" value={edad} onChange={e=>setEdad(e.target.value)} min="1" max="99"/>
          </div>
          <PatientSelect/>
          <button className="btn btnp btnfull" onClick={generarPlan} disabled={loading}>
            {loading?"⏳ Generando...":"📅 Generar plan mensual (4 semanas)"}
          </button>
        </div>
      )}

      {/* EVALUACIÓN */}
      {tab==="evaluacion" && (
        <div>
          <div className="alert alrti" style={{fontSize:11}}>📋 Genera un informe de evaluación diagnóstica formal para entregar a instituciones o médicos.</div>
          <PatientSelect/>
          <div className="fg"><label className="lbl">Motivo de consulta</label>
            <textarea className="inp" style={{minHeight:64}} placeholder="¿Por qué consulta? ¿Qué preocupa a la familia?" value={motivo} onChange={e=>setMotivo(e.target.value)}/>
          </div>
          <div className="fg"><label className="lbl">Antecedentes relevantes</label>
            <textarea className="inp" style={{minHeight:64}} placeholder="Antecedentes médicos, familiares, escolares..." value={antecedentes} onChange={e=>setAntecedentes(e.target.value)}/>
          </div>
          <button className="btn btnp btnfull" onClick={generarEvaluacion} disabled={loading}>
            {loading?"⏳ Generando...":"📋 Generar informe de evaluación"}
          </button>
        </div>
      )}

      {/* ANAMNESIS */}
      {tab==="anamnesis" && (
        <div>
          <div className="alert alrti" style={{fontSize:11}}>📝 Completá los datos que tenés y la IA expande y estructura la anamnesis clínica completa.</div>
          <PatientSelect/>
          <div className="fg"><label className="lbl">Motivo de consulta</label>
            <textarea className="inp" style={{minHeight:64}} placeholder="¿Qué refiere la familia? ¿Cuándo notaron las dificultades?" value={motivo} onChange={e=>setMotivo(e.target.value)}/>
          </div>
          <div className="fg"><label className="lbl">Antecedentes (lo que tenés)</label>
            <textarea className="inp" style={{minHeight:64}} placeholder="Embarazo, parto, hitos del desarrollo, historia médica..." value={antecedentes} onChange={e=>setAntecedentes(e.target.value)}/>
          </div>
          <button className="btn btnp btnfull" onClick={completarAnamnesis} disabled={loading}>
            {loading?"⏳ Completando...":"📝 Completar y estructurar anamnesis"}
          </button>
        </div>
      )}

      {/* INFORME FAMILIA */}
      {tab==="informe" && (
        <div>
          <div className="alert alrti" style={{fontSize:11}}>📄 Informe de progreso claro y positivo para entregar a la familia.</div>
          <PatientSelect/>
          <button className="btn btnp btnfull" onClick={generarInforme} disabled={loading || !selPat}>
            {loading?"⏳ Generando...":"📄 Generar informe para familia"}
          </button>
        </div>
      )}

      {/* SEGUIMIENTO */}
      {tab==="seguimiento" && (
        <div>
          <PatientSelect/>
          <button className="btn btnp btnfull" onClick={generarSeguimiento} disabled={loading || !selPat}>
            {loading?"⏳ Analizando...":"📊 Generar análisis de seguimiento"}
          </button>
        </div>
      )}

      {/* LIBRE */}
      {tab==="libre" && (
        <div>
          <PatientSelect/>
          <div className="fg"><label className="lbl">Tu consulta</label>
            <textarea className="inp" style={{minHeight:100}}
              placeholder="Ej: Generame una actividad para trabajar conciencia fonológica con un niño de 6 años con TEL..."
              value={librePrompt} onChange={e=>setLibrePrompt(e.target.value)}/>
          </div>
          <button className="btn btnp btnfull" onClick={generarLibre} disabled={loading}>
            {loading?"⏳ Procesando...":"💬 Enviar consulta"}
          </button>
        </div>
      )}

      {error&&<div className="alert alrtd" style={{marginTop:10}}>{error}</div>}

      {loading&&(
        <div style={{textAlign:"center",padding:"30px 0"}}>
          <div style={{fontSize:36,marginBottom:12}}>🧠</div>
          <div style={{fontWeight:600,color:C.terra,marginBottom:6}}>Analizando con IA...</div>
          <div style={{fontSize:12,color:C.grayL}}>Esto puede tomar unos segundos</div>
        </div>
      )}

      {result&&(
        <div style={{marginTop:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontWeight:700,fontSize:13,color:C.charcoal}}>Resultado generado por IA</div>
            <button className="btn btnsm btno noprint" onClick={()=>window.print()}>🖨️ Imprimir</button>
          </div>
          <textarea
            className="inp"
            value={result}
            onChange={e=>setResult(e.target.value)}
            style={{minHeight:200,fontSize:13,lineHeight:1.8,background:"#F5F0FA",border:"1.5px solid #D4BCE8",borderRadius:14,padding:16,color:C.charcoal,resize:"vertical"}}
          />
          <div style={{fontSize:11,color:C.grayL,marginTop:2}}>✏️ Podés editar el texto antes de enviarlo o imprimirlo</div>
          <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
            <button className="btn btng btnsm" onClick={()=>navigator.clipboard?.writeText(result).catch(()=>{})}>📋 Copiar</button>
            <button className="btn btnsm noprint" style={{background:"#25D366",color:"white"}}
              onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(result)}`,"_blank")}>💬 WhatsApp</button>
            <button className="btn btnsm noprint" style={{background:"#5B8DB8",color:"white"}}
              onClick={()=>window.open(`mailto:?subject=${encodeURIComponent("Resultado IA — Hadrion")}&body=${encodeURIComponent(result)}`)}>✉️ Email</button>
            <button className="btn btno btnsm noprint" onClick={()=>window.print()}>🖨️ Imprimir</button>
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
  const setPrecios = v => { setPreciosRaw(v); saveToStorage({ users, user, patients, sessions, payments, agendaItems, plan, registerRequests, precios:v }); };
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
  const persist = useCallback((key, val) => {
    saveToStorage({ users, user, patients, sessions, payments, agendaItems, plan, registerRequests, [key]:val });
  }, [users, user, patients, sessions, payments, agendaItems, plan, registerRequests]);

  const setUsers    = v => { setUsersRaw(v);    saveToStorage({ users:typeof v==="function"?v(users):v, user, patients, sessions, payments, agendaItems, plan, registerRequests, precios }); };
  const setPatients = v => { setPatientsRaw(v); saveToStorage({ users, user, patients:typeof v==="function"?v(patients):v, sessions, payments, agendaItems, plan, registerRequests }); };
  const setSessions = v => { setSessionsRaw(v); saveToStorage({ users, user, patients, sessions:typeof v==="function"?v(sessions):v, payments, agendaItems, plan, registerRequests }); };
  const setPayments = v => { setPaymentsRaw(v); saveToStorage({ users, user, patients, sessions, payments:typeof v==="function"?v(payments):v, agendaItems, plan, registerRequests }); };
  const setAgenda   = v => { setAgendaRaw(v);   saveToStorage({ users, user, patients, sessions, payments, agendaItems:typeof v==="function"?v(agendaItems):v, plan, registerRequests }); };
  const setPlan     = v => { setPlanRaw(v);      saveToStorage({ users, user, patients, sessions, payments, agendaItems, plan:typeof v==="function"?v(plan):v, registerRequests }); };
  const setReg      = v => { setRegRaw(v);       saveToStorage({ users, user, patients, sessions, payments, agendaItems, plan, registerRequests:typeof v==="function"?v(registerRequests):v }); };

  const handleRegisterRequest = (form) => {
    setReg(prev => [...prev, { id:makeId(), date:new Date().toLocaleDateString("es-UY"), ...form, status:"pendiente" }]);
  };

  const logout = () => {
    saveToStorage({ users, user:null, patients, sessions, payments, agendaItems, plan, registerRequests });
    setUser(null); setActive("dashboard");
  };

  const saveQS = () => {
    if (!qsF.patientId || !qsF.note) return;
    const p = patients.find(x => x.id === parseInt(qsF.patientId));
    const newSess = { id:makeId(), patientId:parseInt(qsF.patientId), patient:p?.name||"", date:new Date().toLocaleDateString("es-UY"), objective:"Sesion rapida", note:qsF.note, progress:50, activities:[], homework:"", estado:"", atencion:"", participacion:"", sensorial:[] };
    setSessions(prev => [newSess, ...prev]);
    setPatients(prev => prev.map(pat => pat.id === parseInt(qsF.patientId) ? { ...pat, sessions:pat.sessions+1 } : pat));
    setQsF({ patientId:"", note:"" }); setShowQS(false);
  };

  const setUserAndPersist = (u) => {
    const token = makeId();
    const userWithToken = { ...u, sessionToken: token, lastLogin: new Date().toLocaleString("es-UY") };
    // Actualizar token en lista de usuarios
    const updatedUsers = users.map(x => x.id === u.id ? userWithToken : x);
    setUsersRaw(updatedUsers);
    setUser(userWithToken);
    saveToStorage({ users:updatedUsers, user:userWithToken, patients, sessions, payments, agendaItems, plan, registerRequests });
  };

  const pages = {
    dashboard:  <Dashboard  user={user} patients={patients} sessions={sessions} payments={payments} setActive={setActive} setShowQS={setShowQS} agendaItems={agendaItems} />,
    agenda:     <Agenda     patients={patients} items={agendaItems} setItems={setAgenda} />,
    patients:   <Patients   patients={patients} setPatients={setPatients} setActive={setActive} setSelPatId={setSelPatId} sessions={sessions} />,
    payments:   <Payments   patients={patients} payments={payments} setPayments={setPayments} />,
    sessions:   <Sessions   patients={patients} sessions={sessions} setSessions={setSessions} setPatients={setPatients} />,
    history:    <History    patients={patients} sessions={sessions} selectedPatientId={selPatId} setPatients={setPatients} />,
    objectives: <Activities />,
    activities: <Activities />,
    phonology:  <Phonology />,
    reports:    <Reports    patients={patients} sessions={sessions} payments={payments} />,
    plan:       <PlanColaborativo patients={patients} users={users} plan={plan} setPlan={setPlan} />,
    resources:  <Resources />,
    tea:        <TEAAutismo />,
    asistencias:<Asistencias patients={patients} setPatients={setPatients} />,
    organizaciones: user?.role === "admin"
      ? <Organizaciones users={users} setUsers={setUsers} />
      : <div className="fu"><div className="alert alrtd">🔐 Solo administradores.</div></div>,
    admin:      user?.role === "admin"
      ? <Admin users={users} setUsers={setUsers} registerRequests={registerRequests} setRegisterRequests={setReg} currentUser={user} precios={precios} setPrecios={setPrecios} />
      : <div className="fu"><div className="alert alrtd">🔐 Solo administradores.</div></div>,
    ia:         <IAAsistente patients={patients} C={C}/>,
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
