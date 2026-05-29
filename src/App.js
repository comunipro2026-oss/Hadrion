// ================================================
// HADRION - Plataforma Terapeutica
// (c) 2025 Adriana Soba. Todos los derechos reservados.
// Desarrollado en Uruguay
// comunipro12@gmail.com
// Prohibida su reproduccion sin autorizacion expresa.
// ================================================

import React, { useState } from "react";

const C = {
  terra:"#9B7EBD",terraL:"#D4BCE8",terraD:"#7B5EA7",terraF:"#F5F0FA",
  cream:"#FDF8FF",sand:"#EDE0F5",sandD:"#C9B8E8",
  sage:"#E8719C",sageF:"#FDE8F0",forest:"#C0396B",
  charcoal:"#2C2C2C",gray:"#6B6560",grayL:"#9B9590",
  white:"#FFFFFF",danger:"#C0392B",dangerF:"#FDECEA",
  info:"#5B8DB8",infoF:"#EBF3FB",
  purple:"#8B7BB5",purpleF:"#F0EDF8",
  gold:"#E8A020",goldF:"#FEF3E0",
  green:"#2ECC71",greenF:"#E8F8EF",
};

const FONTS=`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');`;

const INIT_USERS=[
  {id:1,name:"Adriana Soba",email:"comunipro12@gmail.com",password:"admin123",role:"admin",specialty:"Fonoaudiologa",plan:"Pro",status:"active",createdAt:"01/01/2025",avatar:"AS",color:C.terra,lastLogin:"Hoy 08:30"},
  {id:2,name:"Ana Garcia",email:"ana@clinica.cl",password:"123456",role:"profesional",specialty:"Psicopedagoga",plan:"Basico",status:"active",createdAt:"15/03/2025",avatar:"AG",color:C.sage,lastLogin:"Ayer 16:00"},
  {id:3,name:"Carlos Ruiz",email:"carlos@terapia.cl",password:"123456",role:"profesional",specialty:"Fonoaudiologo",plan:"Pro",status:"pending",createdAt:"20/05/2025",avatar:"CR",color:C.purple,lastLogin:"—"},
  {id:4,name:"Sofia Pinto",email:"sofia@neuro.cl",password:"123456",role:"profesional",specialty:"T.O.",plan:"Basico",status:"inactive",createdAt:"10/04/2025",avatar:"SP",color:C.info,lastLogin:"12/05/2025"},
];

const INIT_PATIENTS=[
  {id:1,name:"Valentina Lopez",age:7,diagnosis:"TEL",sessions:12,nextSession:"Lun 27/05 10:00",avatar:"VL",color:C.terra,phone:"(+54) 9 8765 4321",email:"vlopez@mail.com",guardian:"Maria Lopez (madre)",notes:"Dificultad en fonemas fricativos. Buena disposicion.",goals:["Produccion /s/ en posicion inicial","Discriminacion auditiva de pares minimos","Comprension de instrucciones complejas"],status:"active"},
  {id:2,name:"Martin Garcia",age:9,diagnosis:"Dislexia",sessions:8,nextSession:"Mie 29/05 09:00",avatar:"MG",color:C.sage,phone:"(+54) 9 7654 3210",email:"mgarcia@mail.com",guardian:"Pedro Garcia (padre)",notes:"Confusion persistente b/d. Mejora en velocidad lectora.",goals:["Decodificacion b/d/p/q","Velocidad lectora 80 ppm","Comprension lectora nivel 3 grados"],status:"active"},
  {id:3,name:"Sofia Ramirez",age:6,diagnosis:"TDAH",sessions:15,nextSession:"Jue 30/05 11:00",avatar:"SR",color:C.purple,phone:"(+54) 9 6543 2109",email:"sramirez@mail.com",guardian:"Ana Ramirez (madre)",notes:"Alta dispersion. Responde bien a actividades cortas.",goals:["Atencion sostenida 15 min","Autorregulacion emocional","Seguimiento de instrucciones secuenciadas"],status:"active"},
  {id:4,name:"Tomas Herrera",age:8,diagnosis:"Disartria",sessions:6,nextSession:"Vie 31/05 10:00",avatar:"TH",color:C.info,phone:"(+54) 9 5432 1098",email:"therrera@mail.com",guardian:"Rosa Herrera (madre)",notes:"Dificultad en articulacion. Buena motivacion.",goals:["Praxias bucofonatorias","Produccion de oclusivas","Inteligibilidad del habla 80%"],status:"active"},
  {id:5,name:"Pedro Salinas",age:3,diagnosis:"TEA",sessions:4,nextSession:"Sin agendar",avatar:"PS",color:C.gold,phone:"(+54) 9 4321 0987",email:"psalinas@mail.com",guardian:"Luis Salinas (padre)",notes:"Primera infancia. Comunicacion no verbal predominante.",goals:["Contacto visual sostenido","Comunicacion intencional","Juego funcional con objetos"],status:"active"},
];

const INIT_SESSIONS=[
  {id:1,patientId:1,patient:"Valentina Lopez",date:"20/05/2025",objective:"Fonemas fricativos /s/",note:"Logro producir /s/ en posicion inicial con apoyo visual. Muy motivada.",progress:70,activities:["Conciencia fonologica con rimas","Espejo articulatorio"],homework:"Practicar /s/ frente al espejo 5 min diarios",estado:"regulado",atencion:"sostenida",participacion:"buena"},
  {id:2,patientId:2,patient:"Martin Garcia",date:"18/05/2025",objective:"Decodificacion b/d",note:"Mejora en velocidad lectora. Confusion persistente b/d.",progress:55,activities:["Ruleta de silabas","Lectura cronometrada"],homework:"Leer 10 min con adulto cada noche",estado:"cansado",atencion:"fluctuante",participacion:"parcial"},
  {id:3,patientId:3,patient:"Sofia Ramirez",date:"22/05/2025",objective:"Atencion sostenida",note:"Logro mantener atencion 12 min con semaforo. Mejor que sesion anterior.",progress:60,activities:["Semaforo de emociones"],homework:"Juego de memoria 5 min post comida",estado:"hiperactivo",atencion:"dispersa",participacion:"buena"},
];

const INIT_PAYMENTS=[
  {id:1,patientId:1,patient:"Valentina Lopez",amount:15000,type:"Particular",date:"20/05/2025",method:"Transferencia",status:"pagado"},
  {id:2,patientId:2,patient:"Martin Garcia",amount:12000,type:"Obra social",date:"18/05/2025",method:"Efectivo",status:"pagado"},
  {id:3,patientId:3,patient:"Sofia Ramirez",amount:15000,type:"Particular",date:"22/05/2025",method:"Transferencia",status:"pendiente"},
];

const AREAS=[
  {id:"fono",label:"Fonoaudiologia",icon:"🗣️",color:"#9B7EBD"},
  {id:"psico",label:"Psicologia",icon:"🧠",color:"#8B7BB5"},
  {id:"psicoped",label:"Psicopedagogia",icon:"📚",color:"#5B8DB8"},
  {id:"psicomotricidad",label:"Psicomotricidad",icon:"🤸",color:"#2ECC71"},
  {id:"fisio",label:"Fisioterapia",icon:"💪",color:"#E8A020"},
  {id:"to",label:"Terapia Ocupacional",icon:"🖐️",color:"#E8719C"},
  {id:"musico",label:"Musicoterapia",icon:"🎵",color:"#C0392B"},
  {id:"otro",label:"Otra area",icon:"➕",color:"#9B9590"},
];

const INIT_PLAN=[
  {id:1,patientId:1,area:"fono",professional:"Ana Garcia",objectives:["Produccion /s/ en posicion inicial","Discriminacion auditiva"],progress:70,lastUpdate:"20/05/2025",notes:"Avance sostenido. Trabajar /f/ proxima sesion."},
  {id:2,patientId:1,area:"psico",professional:"Carlos Ruiz",objectives:["Regulacion emocional","Tolerancia a la frustracion"],progress:50,lastUpdate:"18/05/2025",notes:"Dificultad en transiciones. Buena respuesta al juego."},
  {id:3,patientId:3,area:"psicomotricidad",professional:"Laura Perez",objectives:["Coordinacion bimanual","Equilibrio dinamico"],progress:60,lastUpdate:"22/05/2025",notes:"Mejora notable en coordinacion. Continuar circuitos."},
  {id:4,patientId:3,area:"fisio",professional:"Roberto Silva",objectives:["Tono muscular","Postura sedente"],progress:45,lastUpdate:"21/05/2025",notes:"Hipotonia leve. Ejercicios de fortalecimiento core."},
];

const PHONEMES=["A","E","I","O","U","B","C","CH","D","F","G","J","L","LL","M","N","N","P","R","RR","S","T","V","Y","Z"];

const ACTIVITIES_DB=[
  // ─── LENGUAJE / TEL ───
  {id:1,name:"Rimas y trabalenguas",category:"Lenguaje",target:"TEL",type:"Clinica",age:"3-6",ageGroup:"Preescolar",
   description:"Trabajar conciencia fonologica a traves de rimas y trabalenguas con apoyo visual.",
   materials:"Tarjetas ilustradas con imagenes rimadas, espejo",
   niveles:{
     facil:{titulo:"Rimas simples",instrucciones:"Mostrar dos imagenes (sol/caracol). Preguntar: riman estas palabras? El nino responde SI o NO con gesto o voz.",ejemplos:["sol - caracol","mesa - fresa","pato - zapato"],apoyo:"Apoyo visual total, modelado del adulto"},
     medio:{titulo:"Completar la rima",instrucciones:"Decir el inicio de una rima y pedir que el nino complete: 'En el jardin hay una flor, y tambien hay un...' (color)",ejemplos:["La luna llena / se asoma a la (arena)","El gato gordo / se sento en el (borde)"],apoyo:"Dar 2 opciones para elegir"},
     dificil:{titulo:"Crear rimas propias",instrucciones:"El nino debe crear una oracion que rime con la que dice el adulto. Se puede usar un dado de imagenes.",ejemplos:["Adulto: El nino corre / Nino: y el perro sorre","Crear una rima sobre el clima, animales, colores"],apoyo:"Sin apoyo, produccion espontanea"}
   },printable:true},

  {id:2,name:"Secuencias narrativas",category:"Lenguaje",target:"TEL",type:"Clinica",age:"4-9",ageGroup:"Preescolar/Escolar",
   description:"Ordenar y narrar historias con imagenes secuenciadas para trabajar cohesion y coherencia.",
   materials:"Laminas de 3-6 vinetas impresas, velcro o sobres",
   niveles:{
     facil:{titulo:"Secuencia de 2 imagenes",instrucciones:"Presentar 2 vinetas desordenadas. El nino las ordena y describe que pasa en cada una con una palabra o frase simple.",ejemplos:["Nino triste → nino comiendo → nino sonriendo","Manzana en arbol → caida → comida"],apoyo:"Modelado previo del adulto, lenguaje gestual aceptado"},
     medio:{titulo:"Secuencia de 4 imagenes",instrucciones:"Ordenar 4 vinetas y narrar la historia con oraciones completas. Se puede usar el modelo: Primero... Despues... Luego... Al final...",ejemplos:["Historia del cumpleanos: preparacion, fiesta, torta, regalo","Historia de la manana: despertar, banarse, desayunar, ir al colegio"],apoyo:"Claves de inicio de oracion impresas"},
     dificil:{titulo:"Cuento libre con 6 vinetas",instrucciones:"Ordenar 6 vinetas e inventar el cuento completo con inicio, problema y solucion. Incluir personajes con nombre.",ejemplos:["Historia del dinosaurio perdido","Aventura en el bosque con animales"],apoyo:"Sin apoyo, grabacion del relato para retroalimentacion"}
   },printable:true},

  {id:3,name:"Vocabulario por categorias",category:"Lenguaje",target:"TEL",type:"Clinica",age:"3-8",ageGroup:"Preescolar/Escolar",
   description:"Ampliar y organizar el vocabulario semantico por campos lexicales con imagenes reales.",
   materials:"Tarjetas con imagenes reales (no dibujos), canastos o cajas etiquetadas",
   niveles:{
     facil:{titulo:"Clasificacion basica",instrucciones:"Presentar 6 tarjetas de 2 categorias (ej. animales y frutas). El nino las separa en dos grupos.",ejemplos:["Animales vs frutas","Ropa vs comida","Juguetes vs muebles"],apoyo:"Cajas con simbolo visual de la categoria"},
     medio:{titulo:"Clasificacion multiple",instrucciones:"Clasificar 12 tarjetas en 3-4 categorias. Nombrar cada objeto al ubicarlo. Despues decir otros ejemplos de cada categoria.",ejemplos:["Medios de transporte / animales / alimentos / colores","Cosas del bano / cosas de la cocina / cosas del dormitorio"],apoyo:"Dar 2 ejemplos de cada categoria antes de iniciar"},
     dificil:{titulo:"Definicion funcional",instrucciones:"El nino describe para que sirve cada objeto sin nombrar la categoria. El adulto adivina. Luego invierten roles.",ejemplos:["'Sirve para cortar, tiene filo, es de metal' → cuchillo","Jugar al veo veo semantico: 'Pienso en algo que se usa para...'" ],apoyo:"Sin apoyo visual, solo lenguaje"}
   },printable:true},

  {id:4,name:"Comprension de instrucciones",category:"Lenguaje",target:"TEL",type:"Clinica",age:"3-7",ageGroup:"Preescolar",
   description:"Trabajar comprension y seguimiento de consignas simples, de dos pasos y complejas con objetos reales.",
   materials:"Objetos del consultorio o miniaturas, cajas de colores",
   niveles:{
     facil:{titulo:"Consigna de 1 paso",instrucciones:"Dar una instruccion simple con objeto presente: 'Dame el libro', 'Toca la mesa', 'Abre la caja'.",ejemplos:["Dame el oso","Salta una vez","Cierra los ojos"],apoyo:"Apoyo gestual, maxima proximidad"},
     medio:{titulo:"Consigna de 2 pasos",instrucciones:"Dar dos instrucciones seguidas: 'Toca la silla y despues dame el lapiz'.",ejemplos:["Salta y despues sienta","Toca tu nariz y luego aplaude","Busca el cubo azul y ponlo adentro de la caja"],apoyo:"Repetir si es necesario, reducir velocidad del habla"},
     dificil:{titulo:"Consigna con conceptos relacionales",instrucciones:"Incluir conceptos espaciales, temporales y logicos: 'Antes de sentarte, dame el libro que esta DEBAJO de la mesa'.",ejemplos:["Pon el rojo ARRIBA del azul pero ANTES aplaude","Dame el que NO es cuadrado","El mas grande de todos menos uno"],apoyo:"Sin apoyo, evaluacion de comprension"}
   },printable:true},

  // ─── LECTOESCRITURA / DISLEXIA ───
  {id:5,name:"Conciencia silabica",category:"Lectoescritura",target:"Dislexia",type:"Clinica",age:"5-8",ageGroup:"Preescolar/Escolar",
   description:"Trabajar segmentacion, identificacion y manipulacion silabica con apoyo visual y cinestetico.",
   materials:"Fichas de colores, palmadas, tablero de silabas",
   niveles:{
     facil:{titulo:"Contar silabas con palmadas",instrucciones:"El adulto dice una palabra y el nino da una palmada por silaba. Comenzar con palabras bisilabas de uso frecuente.",ejemplos:["ca-sa (2 palmadas)","me-sa (2 palmadas)","za-pa-to (3 palmadas)"],apoyo:"Adulto modela primero, uso de tablero con casillas"},
     medio:{titulo:"Identificar silaba inicial y final",instrucciones:"El nino identifica con que silaba empieza o termina la palabra. Se puede usar ruleta o cartas.",ejemplos:["Con que silaba empieza PALOMA? PA","Con que silaba termina CORAZON? ON","Agrupar imagenes segun silaba inicial"],apoyo:"Marcador visual para inicio y fin de palabra"},
     dificil:{titulo:"Sustitucion silabica",instrucciones:"Cambiar una silaba de la palabra por otra y decir la nueva palabra: 'MESA si cambio ME por PI... PISA'.",ejemplos:["PATO sin PA = TO; con FU = FUTO","CAMION cambia CA por CA = CAMION, por MA = MAMION","Crear palabras nuevas sustituyendo silabas"],apoyo:"Sin apoyo, nivel metalinguistico"}
   },printable:true},

  {id:6,name:"Discriminacion b/d/p/q",category:"Lectoescritura",target:"Dislexia",type:"Clinica",age:"6-10",ageGroup:"Escolar",
   description:"Trabajar la confusion de letras de espejo b/d/p/q con estrategias multisensoriales.",
   materials:"Tarjetas de letras, cama de arena, letras de lija, espejo",
   niveles:{
     facil:{titulo:"Reconocimiento visual con clave",instrucciones:"Usar el truco del 'cama': b tiene la panza a la derecha (b), d tiene la panza a la izquierda (d). Practicar solo con b y d.",ejemplos:["Trazar b en arena con el dedo","Tocar letra de lija y decir su nombre","Clasificar tarjetas: es b o d?"],apoyo:"Clave visual permanente en el escritorio"},
     medio:{titulo:"Lectura en contexto",instrucciones:"Leer oraciones cortas con muchas b y d. Subrayar con colores distintos: b en azul, d en verde.",ejemplos:["El dado rojo rueda debajo de la cama","La ballena bebe bastante agua del mar","Discriminar en texto impreso"],apoyo:"Texto con fuente grande, regleta lectora"},
     dificil:{titulo:"Escritura diferenciada",instrucciones:"Escribir palabras y oraciones al dictado que incluyan b, d, p, q. Sin apoyo visual de claves.",ejemplos:["Dictado de palabras: barco, dedo, puente, queso","Dictado de oracion: El perro de Pedro bebio agua","Autocorreccion del propio texto"],apoyo:"Autocorreccion con lista de cotejo"}
   },printable:true},

  {id:7,name:"Lectura de velocidad y fluidez",category:"Lectoescritura",target:"Dislexia",type:"Clinica",age:"7-12",ageGroup:"Escolar",
   description:"Mejorar velocidad y fluidez lectora con textos graduados y cronometro.",
   materials:"Textos graduados impresos, cronometro, grafico de progreso",
   niveles:{
     facil:{titulo:"Lectura de silabas y palabras",instrucciones:"Leer listas de silabas (ba, de, pi, co) y palabras monosilabas y bisilabas en 1 minuto. Contar correctas.",ejemplos:["Lista: ma, pe, si, ro, tu, ba, de... (30 silabas)","Lista de palabras: sol, mar, pie, dos, ven, luz...","Graficar cuantas leyo correctamente"],apoyo:"Senalar con dedo o lapiz cada silaba"},
     medio:{titulo:"Lectura de oraciones",instrucciones:"Leer oraciones de 5-8 palabras en voz alta. Medir palabras por minuto. Meta: 60 ppm.",ejemplos:["El nino come una manzana roja","La pelota rueda por el piso del patio","Texto de 100 palabras con cronometro"],apoyo:"Regleta lectora, marcador de linea"},
     dificil:{titulo:"Lectura expresiva de parrafo",instrucciones:"Leer parrafos completos respetando puntuacion y entonacion. Meta: 90-100 ppm con comprension.",ejemplos:["Cuento de 200 palabras con preguntas de comprension","Noticia infantil con vocabulario nuevo","Lectura en voz alta para otro paciente o familiar"],apoyo:"Grabacion para autoevaluacion"}
   },printable:true},

  // ─── ATENCION / TDAH ───
  {id:8,name:"Semaforo de autorregulacion",category:"Regulacion",target:"TDAH",type:"Clinica",age:"4-10",ageGroup:"Preescolar/Escolar",
   description:"Sistema visual de autorregulacion emocional y conductual basado en los colores del semaforo.",
   materials:"Lamina de semaforo grande, tarjetas de emociones, ficha personal",
   niveles:{
     facil:{titulo:"Identificacion de estados",instrucciones:"Mostrar la lamina del semaforo. Explicar: ROJO=parar/enojado, AMARILLO=pensar/nervioso, VERDE=ok/tranquilo. El nino ubica una figura donde esta hoy.",ejemplos:["De que color estas ahora?","Mostrar cara y ubicar en el semaforo","Juego: el adulto actua una emocion y el nino la ubica"],apoyo:"Figuras con caras expresivas, semaforo grande en pared"},
     medio:{titulo:"Estrategias por color",instrucciones:"Para cada color, practicar estrategias: ROJO=respirar 3 veces, AMARILLO=contar hasta 5, VERDE=continuar. Role play de situaciones.",ejemplos:["Situacion: 'No quiero compartir el juguete' → que color? → que hago?","Practicar respiracion de tortuga (inhalar lento, exhalar lento)","Crear tarjetas de estrategias personales"],apoyo:"Tarjetas de estrategias plastificadas"},
     dificil:{titulo:"Uso autonomo y transferencia",instrucciones:"El nino usa el semaforo de forma independiente en sesion y reporta como lo uso en casa o colegio.",ejemplos:["Diario emocional: colorear el semaforo al inicio y fin de sesion","Contar una situacion real donde uso la estrategia","Ensenarselo a un familiar o companero"],apoyo:"App o tarjeta de bolsillo para uso externo"}
   },printable:true},

  {id:9,name:"Juego de atencion sostenida",category:"Atencion",target:"TDAH",type:"Clinica",age:"5-10",ageGroup:"Preescolar/Escolar",
   description:"Actividades graduadas para entrenar el foco y la atencion sostenida con estimulos visuales.",
   materials:"Laminas de busqueda visual, tablero de puntos, cronometro",
   niveles:{
     facil:{titulo:"Buscar y marcar (2 min)",instrucciones:"Presentar una lamina con figuras. El nino debe marcar solo las que se le indica (ej. todos los circulos) en 2 minutos.",ejemplos:["Marcar todos los gatos en una lamina con 10 animales","Tachar la letra A en un renglon de letras","Buscar objetos de color rojo en una imagen"],apoyo:"Lamina simple, pocas distractores, tiempo generoso"},
     medio:{titulo:"Atencion dividida (5 min)",instrucciones:"Tarea con dos variables: marcar circulos grandes Y tachar cuadrados pequenos al mismo tiempo. Aumentar tiempo a 5 min.",ejemplos:["Marcar numeros pares Y rodear los impares","Buscar la figura modelo entre 20 opciones similares","Laberinto con dos caminos a seguir"],apoyo:"Pausas permitidas, retroalimentacion inmediata"},
     dificil:{titulo:"Atencion con distraccion (8 min)",instrucciones:"Realizar tarea de atencion sostenida mientras hay ruido de fondo o estimulos visuales adicionales. 8 minutos.",ejemplos:["Completar serie numerica con musica de fondo","Resolver sopa de letras con elementos moviendose en el margen","Seguir instrucciones verbales mientras observa imagenes"],apoyo:"Autorregistro de errores y tiempo completado"}
   },printable:true},

  // ─── ARTICULACION / DISARTRIA ───
  {id:10,name:"Praxias bucofonatorias",category:"Articulacion",target:"Disartria",type:"Clinica",age:"3-12",ageGroup:"Todos",
   description:"Ejercicios sistematizados de movilidad labial, lingual, mandibular y velar con espejo.",
   materials:"Espejo, lamina de praxias, espejo de mano, cronometro",
   niveles:{
     facil:{titulo:"Praxias estaticas",instrucciones:"Mantener posicion bucal sin movimiento: labios juntos 5 seg, lengua arriba 5 seg, mejillas infladas 5 seg. 3 repeticiones.",ejemplos:["Labios cerrados y apretados","Lengua en el paladar (chasquido)","Sonrisa amplia sostenida","Boca abierta maxima sostenida"],apoyo:"Guia visual de cada posicion, espejo grande"},
     medio:{titulo:"Praxias dinamicas",instrucciones:"Movimientos en secuencia: labios adelante/atras, lengua arriba/abajo/derecha/izquierda, 5 repeticiones cada uno.",ejemplos:["Vibrar labios (motocicleta)","Lengua recorre el paladar de adelante hacia atras","Movimiento circular de lengua por afuera de los dientes","Abrir y cerrar la boca con ritmo"],apoyo:"Ritmo con palmadas, seguir modelo del espejo"},
     dificil:{titulo:"Praxias en velocidad y fonacion",instrucciones:"Realizar las praxias con velocidad creciente y luego agregar sonido (vocalizacion) en cada movimiento.",ejemplos:["Pa-ta-ka repetido 10 veces rapido","Labios juntos y vibracion larga","Secuencia completa en 30 segundos","Praxias con texto: repetir palabras con los fonemas trabajados"],apoyo:"Grabacion de video para comparar progreso"}
   },printable:true},

  // ─── FAMILIA ───
  {id:11,name:"Lectura compartida en familia",category:"Lectoescritura",target:"Dislexia",type:"Familia",age:"5-12",ageGroup:"Escolar",
   description:"Protocolo de lectura compartida para practicar en casa con el adulto referente.",
   materials:"Libro de nivel lector del nino, separador de paginas, hoja de registro",
   niveles:{
     facil:{titulo:"Lectura en voz alta del adulto",instrucciones:"El adulto lee en voz alta mientras el nino sigue con el dedo. Al terminar cada parrafo, el nino cuenta con una palabra de que trato.",ejemplos:["Libro: 'Donde viven los monstruos'","Cuento simple de 5 paginas ilustradas","El adulto senala las palabras mientras lee"],apoyo:"10 minutos diarios, horario fijo"},
     medio:{titulo:"Lectura en pares turnada",instrucciones:"Adulto y nino leen de a turnos: adulto lee un renglon, nino lee el siguiente. Ayudar sin corregir abruptamente.",ejemplos:["Libro: cuentos de Roald Dahl adaptados","Noticias del periodico infantil","Libros de la biblioteca escolar"],apoyo:"Adulto modela el tono y pausas"},
     dificil:{titulo:"Lectura independiente con registro",instrucciones:"El nino lee 10 minutos solo y luego le cuenta al adulto de que se trato. El adulto completa una ficha de seguimiento.",ejemplos:["Saga de libros de interes del nino","Registro: fecha, libro, paginas, resumen en 2 oraciones","Presentar el libro a alguien de la familia"],apoyo:"Ficha simple de registro semanal"}
   },printable:true},

  {id:12,name:"Estimulacion linguistica cotidiana",category:"Lenguaje",target:"TEL",type:"Familia",age:"2-6",ageGroup:"Preescolar",
   description:"Estrategias para que la familia estimule el lenguaje durante las rutinas diarias del hogar.",
   materials:"Guia para familia impresa, imagenes de las rutinas",
   niveles:{
     facil:{titulo:"Expansion y modelado",instrucciones:"Cuando el nino dice algo, el adulto lo repite correctamente y agrega una palabra mas. No corregir directamente, modelar.",ejemplos:["Nino: 'agua' → Adulto: 'quieres agua', 'el agua fria'","Nino: 'nene caio' → Adulto: 'si, el nene se cayo'","Durante el bano: nombrar cada parte del cuerpo"],apoyo:"Tarjeta de recordatorio pegada en la nevera"},
     medio:{titulo:"Comentar y preguntar",instrucciones:"Durante actividades diarias, el adulto comenta lo que hace y hace preguntas abiertas: que ves? que piensas? que paso?",ejemplos:["En el supermercado: 'mira, hay manzanas rojas y verdes cuales quieres?'","Mirando un libro: 'mira el perro, que crees que va a hacer?'","Jugando: 'y ahora que le pasa al muneco?'"],apoyo:"Lista de frases estimulantes para cada rutina"},
     dificil:{titulo:"Narrar y anticipar",instrucciones:"Contar al nino lo que va a pasar antes de hacerlo, y despues pedirle que lo cuente el. Usar vocabulario nuevo intencionalmente.",ejemplos:["Antes de salir: 'vamos a ir al parque, vamos a... que crees que vamos a hacer?'","Al volver: 'contale a papa lo que hicimos hoy'","Introducir 2 palabras nuevas por semana en contexto natural"],apoyo:"Vocabulario semanal sugerido por el profesional"}
   },printable:true},
];

const PHONEME_WORDS={
  "A":["AVION","ARBOL","ARAÑA","ABEJA","AGUILA","ANCLA","ARCO","ARDILLA"],
  "E":["ELEFANTE","ESTRELLA","ESCALERA","ESPEJO","ESCOBA","ENANO","ESCUDO"],
  "I":["IGLESIA","IGUANA","ISLA","IMAN","INSECTO","INDIO"],
  "O":["OSO","OVEJA","OJO","OLLA","ORUGA","ORCA","OBRA"],
  "U":["UVA","UNIFORME","UNICORNIO","URNA","UTENSILIO"],
  "B":["BOCA","BARCO","BICICLETA","BALLENA","BOTA","BURRO","BOLSA"],
  "C":["CASA","CAMA","CONEJO","COCINA","CAMION","CARRO","CABALLO"],
  "CH":["CHOCOLATE","CHUPETE","CHANCHO","CHALECO","CHICLE"],
  "D":["DEDO","DADO","DINOSAURIO","DUENDE","DRAGON","DULCE","DIENTE"],
  "F":["FOCA","FRESA","FLOR","FUEGO","FAMILIA","FLAUTA","FRUTA"],
  "G":["GATO","GLOBO","GALLETA","GORILA","GIRASOL","GUSANO","GUITARRA"],
  "J":["JIRAFA","JUGO","JARDIN","JUGUETE","JABON","JABALI"],
  "L":["LUNA","LAPIZ","LECHE","LIBRO","LORO","LAGARTO","LIMON"],
  "LL":["LLAVE","LLANTA","LLUVIA","LLAMA","LLORAR"],
  "M":["MARIPOSA","MESA","MANZANA","MONO","MOCHILA","MARTILLO","MAGO"],
  "N":["NUBE","NARANJA","NARIZ","NIEVE","NIDO","NUMERO","NUEZ"],
  "P":["PATO","PELOTA","PERRO","PIANO","PUERTA","PALOMA","PULPO"],
  "R":["RATON","ROBOT","ROSA","REGLA","RELOJ","RUEDA","RANA"],
  "RR":["CARRO","PERRO","TIERRA","PIZARRA","BURRO","CERRO","TORRE"],
  "S":["SOL","SILLA","SOPA","SAPO","SEMILLA","SERPIENTE","SOMBRILLA"],
  "T":["TIJERAS","TREN","TORTUGA","TIGRE","TOMATE","TAMBOR","TELEVISION"],
  "V":["VACA","VIOLIN","VENTANA","VESTIDO","VOLCAN","VELERO","VERDURA"],
  "Y":["YOYO","YOGUR","YATE","YERBA","YEGUA"],
  "Z":["ZAPATO","ZORRO","ZANAHORIA","ZEBRA","ZUMO"],
};




const ANAMNESIS=[
  {t:"Antecedentes relevantes",i:"📊",q:["Antecedentes del embarazo, parto o periodo neonatal?","Hitos del desarrollo motor y del habla-lenguaje?","Antecedentes medicos, neurologicos o geneticos?","Antecedentes familiares de dificultades similares?","Historia familiar: composicion, dinamica del hogar?"]},
  {t:"Lenguaje y comunicacion",i:"💬",q:["Comprende consignas simples y complejas?","Presenta dificultades en la expresion verbal?","Como es la inteligibilidad del habla?","Usa lenguaje gestual o sistemas alternativos?"]},
  {t:"Area educativa",i:"📚",q:["Asiste a establecimiento educacional?","Presenta dificultades de aprendizaje?","Recibe apoyos adicionales en el colegio?"]},
  {t:"Area socioemocional",i:"❤️",q:["Como regula sus emociones?","Como son sus interacciones sociales?","Presenta conductas disruptivas o de evitacion?"]},
];

const CSS=`
${FONTS}
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
.bn{flex:1;padding:10px 2px 8px;border:none;background:none;cursor:pointer;font-size:9px;font-family:'Plus Jakarta Sans',sans-serif;color:#9B9590;display:flex;flex-direction:column;align-items:center;gap:3px;font-weight:500;transition:color .14s;}
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
.btnsm{padding:7px 12px;font-size:11px;border-radius:8px;}
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
.chip{padding:5px 11px;border-radius:20px;border:1.5px solid #EDE0F5;background:white;font-size:12px;font-weight:500;cursor:pointer;color:#6B6560;font-family:'Plus Jakarta Sans',sans-serif;transition:all .13s;}
.chip.sel{background:#F5F0FA;border-color:#9B7EBD;color:#9B7EBD;font-weight:600;}
.chiprow{display:flex;flex-wrap:wrap;gap:6px;margin:5px 0;}
.filrow{display:flex;gap:7px;overflow-x:auto;padding-bottom:4px;margin-bottom:12px;}
.filrow::-webkit-scrollbar{display:none;}
.filbtn{padding:6px 12px;border-radius:20px;border:1.5px solid #EDE0F5;background:white;font-size:12px;font-weight:500;cursor:pointer;white-space:nowrap;color:#6B6560;font-family:'Plus Jakarta Sans',sans-serif;flex-shrink:0;}
.filbtn.active{background:#9B7EBD;color:white;border-color:#9B7EBD;}
.phgrid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:12px 0;}
@media(min-width:500px){.phgrid{grid-template-columns:repeat(6,1fr);}}
.phbtn{aspect-ratio:1;border-radius:12px;border:2px solid #EDE0F5;background:white;font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;cursor:pointer;transition:all .17s;display:flex;align-items:center;justify-content:center;color:#2C2C2C;}
.phbtn:hover{border-color:#9B7EBD;background:#F5F0FA;}
.phbtn.sel{border-color:#9B7EBD;background:#9B7EBD;color:white;}
.roletag{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;}
.radmin{background:#FEF3E0;color:#E8A020;}
.rpro{background:#EBF3FB;color:#5B8DB8;}
.dayl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#9B9590;margin:14px 0 6px;}
.atab{flex:1;padding:8px 6px;border:none;background:transparent;border-radius:9px;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;color:#6B6560;transition:all .15s;}
.atab.active{background:white;color:#9B7EBD;box-shadow:0 1px 4px rgba(0,0,0,.1);}
.atabrow{display:flex;gap:4px;background:#EDE0F5;border-radius:12px;padding:4px;margin-bottom:16px;}
.qscard{background:white;border-radius:16px;padding:14px;box-shadow:0 1px 8px rgba(0,0,0,.06);margin-bottom:12px;display:flex;align-items:center;gap:12px;cursor:pointer;border:1.5px solid #EDE0F5;transition:border-color .15s;}
.qscard:hover{border-color:#9B7EBD;}
@keyframes fadeUp{from{opacity:0;transform:translateY(13px);}to{opacity:1;transform:translateY(0);}}
.fu{animation:fadeUp .28s ease forwards;}
@media print{.noprint{display:none!important;}body{background:white;}}
`;

const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const todayStr=()=>new Date().toLocaleDateString("es-UY",{weekday:"long",day:"numeric",month:"long"});

function Modal({title,onClose,children}){
  return(
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <button className="xbtn" onClick={onClose}>✕</button>
        <div className="modalt">{title}</div>
        {children}
      </div>
    </div>
  );
}

function SC({title,action,children}){
  return(
    <div className="sc">
      <div className="sch"><span style={{fontWeight:700,fontSize:14,color:C.charcoal}}>{title}</span>{action}</div>
      <div className="scb">{children}</div>
    </div>
  );
}

const NAV=[
  {id:"dashboard",l:"Panel",i:"🏠",s:"Principal"},
  {id:"agenda",l:"Agenda",i:"📅"},
  {id:"patients",l:"Pacientes",i:"👥"},
  {id:"payments",l:"Registro de Pagos",i:"💳"},
  {id:"sessions",l:"Registros Clinicos",i:"📝"},
  {id:"history",l:"Historia Clinica",i:"📋",s:"Clinico"},
  {id:"objectives",l:"Objetivos",i:"🎯"},
  {id:"activities",l:"Actividades",i:"✨"},
  {id:"phonology",l:"Conciencia Fon.",i:"🔤"},
  {id:"reports",l:"Reportes",i:"📊"},
  {id:"plan",l:"Plan Colaborativo",i:"🤝",s:"Colaborativo"},
  {id:"resources",l:"Recursos",i:"📚",s:"Herramientas"},
  {id:"admin",l:"Administracion",i:"🔐",s:"Admin",adminOnly:true},
  {id:"profile",l:"Mi Perfil",i:"👤"},
];

function Sidebar({active,setActive,user}){
  return(
    <div className="sidebar">
      <div className="slogo">
        <div className="slogoicon">H</div>
        <div><div className="slogoname">Hadrion</div><div className="slogosub">Plataforma Clinica</div></div>
      </div>
      {NAV.filter(n=>!n.adminOnly||(n.adminOnly&&user?.role==="admin")).map(n=>(
        <div key={n.id}>
          {n.s&&<div className="ssec">{n.s}</div>}
          <div className={`sitem${active===n.id?" active":""}`} onClick={()=>setActive(n.id)}>
            <span className="sicon">{n.i}</span>{n.l}
            {n.id==="admin"&&<span className="sbadge">Admin</span>}
          </div>
        </div>
      ))}
      <div className="suser">
        <div style={{fontSize:13,fontWeight:600,color:C.charcoal}}>{user?.name}</div>
        <div style={{fontSize:11,color:C.grayL}}>{user?.specialty}</div>
        <span className={`roletag ${user?.role==="admin"?"radmin":"rpro"}`} style={{marginTop:4,display:"inline-flex"}}>{user?.role==="admin"?"👑 Admin":"Profesional"}</span>
      </div>
    </div>
  );
}

function Login({onLogin,users,onRegisterRequest}){
  const [f,setF]=useState({email:"",pass:"",show:false});
  const [err,setErr]=useState("");
  const [forgot,setForgot]=useState(false);
  const [register,setRegister]=useState(false);
  const [regF,setRegF]=useState({name:"",email:"",specialty:"",phone:"",message:""});
  const [regSent,setRegSent]=useState(false);

  const login=()=>{
    if(!f.email||!f.pass){setErr("Completa todos los campos.");return;}
    const u=users.find(u=>u.email===f.email&&u.password===f.pass);
    if(!u){setErr("Email o contrasena incorrectos.");return;}
    if(u.status==="inactive"){setErr("Tu cuenta esta inactiva. Contacta al administrador.");return;}
    if(u.status==="pending"){setErr("Tu cuenta esta pendiente de aprobacion. Te contactaremos a la brevedad.");return;}
    onLogin(u);
  };

  const sendRegister=()=>{
    if(!regF.name||!regF.email||!regF.specialty){setErr("Completa nombre, email y especialidad.");return;}
    onRegisterRequest(regF);
    setRegSent(true);
  };
  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#FDF0E8 0%,#FAF8F5 55%,#EBF5EE 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"white",borderRadius:24,padding:"36px 26px",width:"100%",maxWidth:400,boxShadow:"0 8px 40px rgba(0,0,0,.12)"}}>
        <div style={{textAlign:"center",marginBottom:26}}>
          <div style={{width:62,height:62,background:C.terra,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 13px",fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:700,color:"white"}}>H</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,color:C.charcoal}}>Hadrion</div>
          <div style={{fontSize:13,color:C.grayL,marginTop:3}}>Plataforma terapeutica - Uruguay</div>
        </div>
        {!forgot?<>
          <div style={{fontSize:17,fontWeight:700,color:C.charcoal,marginBottom:14}}>Iniciar sesion</div>
          <div className="fg"><label className="lbl">Correo electronico</label><input className="inp" type="email" placeholder="comunipro12@gmail.com" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/></div>
          <div className="fg"><label className="lbl">Contrasena</label>
            <div style={{position:"relative"}}>
              <input className="inp" type={f.show?"text":"password"} placeholder="••••••••" value={f.pass} onChange={e=>setF({...f,pass:e.target.value})} onKeyDown={e=>e.key==="Enter"&&login()} style={{paddingRight:44}}/>
              <button onClick={()=>setF({...f,show:!f.show})} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:C.grayL}}>{f.show?"🙈":"👁️"}</button>
            </div>
          </div>
          {err&&<div className="alert alrtd">{err}</div>}
          <button className="btn btnp btnfull" style={{borderRadius:12}} onClick={login}>→ Ingresar</button>
          <div style={{textAlign:"center",marginTop:12,fontSize:12,color:C.grayL}}>Olvidaste tu contrasena? <span style={{color:C.terra,cursor:"pointer",fontWeight:600}} onClick={()=>setForgot(true)}>Recuperar acceso</span></div>
          <div style={{marginTop:18,background:'#F5F0FA',borderRadius:12,padding:"10px 13px",fontSize:11,color:C.terra,textAlign:"center"}}>🧠 Tu consultorio digital, desde Uruguay para el mundo.</div>
          <div style={{marginTop:12,textAlign:"center",padding:"10px 0",borderTop:`1px solid ${C.sand}`}}>
            <span style={{fontSize:12,color:C.grayL}}>No tenes cuenta? </span>
            <span style={{fontSize:12,color:C.terra,cursor:"pointer",fontWeight:700}} onClick={()=>setRegister(true)}>Solicitar acceso gratis →</span>
          </div>
        </>:<>
          <div style={{fontSize:17,fontWeight:700,color:C.charcoal,marginBottom:6}}>Recuperar acceso</div>
          <div style={{fontSize:13,color:C.grayL,marginBottom:14}}>Ingresa tu email y te enviaremos un enlace de recuperacion.</div>
          <div className="fg"><input className="inp" type="email" placeholder="comunipro12@gmail.com" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/></div>
          <div className="alert alrts">✉️ En produccion real se enviaria email de recuperacion.</div>
          <button className="btn btnp btnfull" onClick={()=>setForgot(false)}>← Volver</button>
        </>}
        {register&&!regSent&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
            <div style={{background:"white",borderRadius:20,padding:"28px 22px",width:"100%",maxWidth:400,maxHeight:"90vh",overflowY:"auto"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:C.charcoal,marginBottom:4}}>Solicitar acceso gratis</div>
              <div style={{fontSize:13,color:C.grayL,marginBottom:16}}>14 dias gratis, sin tarjeta. Te contactamos en menos de 24hs.</div>
              <div className="fg"><label className="lbl">Nombre completo *</label><input className="inp" type="text" placeholder="Tu nombre y apellido" value={regF.name} onChange={e=>setRegF({...regF,name:e.target.value})}/></div>
              <div className="fg"><label className="lbl">Email profesional *</label><input className="inp" type="email" placeholder="tu@email.com" value={regF.email} onChange={e=>setRegF({...regF,email:e.target.value})}/></div>
              <div className="fg"><label className="lbl">Especialidad *</label>
                <select className="inp" value={regF.specialty} onChange={e=>setRegF({...regF,specialty:e.target.value})}>
                  <option value="">Selecciona tu especialidad...</option>
                  {["Fonoaudiologa/o","Psicologa/o","Psicopedagoga/o","Psicomotricista","Fisioterapeuta","Terapeuta Ocupacional","Otra"].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="fg"><label className="lbl">Telefono (opcional)</label><input className="inp" type="tel" placeholder="(+598) 9..." value={regF.phone} onChange={e=>setRegF({...regF,phone:e.target.value})}/></div>
              <div className="fg"><label className="lbl">Mensaje (opcional)</label><textarea className="inp" style={{minHeight:60}} placeholder="Contanos sobre tu practica..." value={regF.message} onChange={e=>setRegF({...regF,message:e.target.value})}/></div>
              {err&&<div className="alert alrtd">{err}</div>}
              <button className="btn btnp btnfull" onClick={sendRegister}>🚀 Enviar solicitud</button>
              <button className="btn btng btnfull" onClick={()=>{setRegister(false);setErr("");}}>Cancelar</button>
              <div style={{fontSize:10,color:C.grayL,marginTop:10,textAlign:"center"}}>(c) 2025 Adriana Soba - comunipro12@gmail.com - Uruguay 🇺🇾</div>
            </div>
          </div>
        )}
        {regSent&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
            <div style={{background:"white",borderRadius:20,padding:"36px 26px",width:"100%",maxWidth:380,textAlign:"center"}}>
              <div style={{fontSize:48,marginBottom:12}}>🎉</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:700,color:C.charcoal,marginBottom:8}}>Solicitud enviada!</div>
              <div style={{fontSize:14,color:C.grayL,lineHeight:1.6,marginBottom:20}}>Gracias por tu interes en Hadrion. Te contactamos a <strong>{regF.email}</strong> en menos de 24 horas con tu acceso de prueba.</div>
              <div style={{background:"#F5F0FA",borderRadius:12,padding:"14px",marginBottom:16}}>
                <div style={{fontSize:16,color:C.terra,fontWeight:700,marginBottom:4}}>14 dias gratis</div>
                <div style={{fontSize:12,color:C.grayL}}>Sin tarjeta de credito - Sin compromiso</div>
              </div>
              <button className="btn btnp btnfull" onClick={()=>{setRegSent(false);setRegister(false);}}>← Volver al inicio</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard({user,patients,sessions,payments,setActive,setShowQS}){
  const total=payments.filter(p=>p.status==="pagado").reduce((a,p)=>a+p.amount,0);
  return(
    <div className="fu">
      <div className="welcome">
        <div style={{fontSize:12,opacity:.7,marginBottom:3}}>{cap(todayStr())}</div>
        <div className="wname">Hola, {user.name.split(" ")[0]} 👋</div>
        <div style={{fontSize:13,opacity:.82,marginTop:3}}>Bienvenida a tu plataforma clinica</div>
      </div>
      <div className="sgrid">
        <div className="sc2"><div className="snum">{patients.length}</div><div className="slbl">Pacientes</div></div>
        <div className="sc2"><div className="snum">{sessions.length}</div><div className="slbl">Registros</div></div>
        <div className="sc2"><div className="snum">${(total/1000).toFixed(0)}k</div><div className="slbl">Cobrado</div></div>
        <div className="sc2"><div className="snum">3</div><div className="slbl">Hoy</div></div>
      </div>
      <div className="qscard" onClick={()=>setShowQS(true)}>
        <div style={{width:44,height:44,background:C.terraF,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>⚡</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:14,color:C.charcoal}}>Sesion rapida</div>
          <div style={{fontSize:12,color:C.grayL}}>Registra sin seleccionar objetivos — agil y directo</div>
        </div>
        <div style={{fontSize:11,background:C.terraF,color:C.terra,borderRadius:20,padding:"3px 10px",fontWeight:600,flexShrink:0}}>Uso diario</div>
      </div>
      <div style={{fontWeight:700,fontSize:14,color:C.charcoal,marginBottom:10}}>Acceso rapido</div>
      <div className="qg">
        {[{i:"👥",l:"Pacientes",s:"Gestion de casos",t:"patients"},{i:"📅",l:"Agenda",s:"Citas y horarios",t:"agenda"},{i:"📝",l:"Nueva sesion",s:"Con objetivos",t:"sessions"},{i:"💳",l:"Pagos",s:"Cobros",t:"payments"},{i:"🔤",l:"Fonologia",s:"Conciencia fon.",t:"phonology"},{i:"✨",l:"Actividades",s:"Banco terapeutico",t:"activities"},{i:"📊",l:"Reportes",s:"Informes",t:"reports"},{i:"📚",l:"Recursos",s:"Material",t:"resources"}].map(q=>(
          <div key={q.t} className="qcard" onClick={()=>setActive(q.t)}>
            <div style={{fontSize:26,marginBottom:6}}>{q.i}</div>
            <div style={{fontSize:12,fontWeight:600,color:C.charcoal}}>{q.l}</div>
            <div style={{fontSize:10,color:C.grayL,marginTop:1}}>{q.s}</div>
          </div>
        ))}
      </div>
      <SC title="📅 Citas de hoy" action={<button className="btn btno btnsm" onClick={()=>setActive("agenda")}>Ver agenda</button>}>
        {[{p:"Valentina Lopez",t:"09:00",tp:"Sesion",c:C.terra},{p:"Martin Garcia",t:"10:00",tp:"Evaluacion",c:C.sage},{p:"Sofia Ramirez",t:"11:30",tp:"Sesion",c:C.purple}].map((a,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:`1px solid ${C.sand}`}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:a.c,flexShrink:0}}/>
            <div style={{fontWeight:700,fontSize:13,color:C.charcoal,minWidth:46}}>{a.t}</div>
            <div style={{flex:1,fontSize:13,color:C.charcoal}}>{a.p}</div>
            <span className="badge" style={{background:a.c+"22",color:a.c,fontSize:10}}>{a.tp}</span>
          </div>
        ))}
      </SC>
    </div>
  );
}

const GCAL_CLIENT_ID="725031200149-7dt4dnn33i01e8f4gtjhvma2d8hao24f.apps.googleusercontent.com";
const GCAL_SCOPE="https://www.googleapis.com/auth/calendar.events";

function Agenda({patients}){
  const [items,setItems]=useState([
    {id:1,patient:"Valentina Lopez",time:"09:00",end:"09:45",type:"Sesion",day:"Hoy",color:C.terra,date:"2026-05-28"},
    {id:2,patient:"Martin Garcia",time:"10:00",end:"10:45",type:"Evaluacion",day:"Hoy",color:C.sage,date:"2026-05-28"},
    {id:3,patient:"Sofia Ramirez",time:"11:30",end:"12:15",type:"Sesion",day:"Hoy",color:C.purple,date:"2026-05-28"},
    {id:4,patient:"Tomas Herrera",time:"09:00",end:"09:45",type:"Sesion",day:"Manana",color:C.info,date:"2026-05-29"},
  ]);
  const [showNew,setShowNew]=useState(false);
  const [f,setF]=useState({patient:"",time:"",type:"Sesion",day:"Hoy",date:new Date().toISOString().slice(0,10)});
  const [gcalStatus,setGcalStatus]=useState("disconnected"); // disconnected | connecting | connected
  const [gcalMsg,setGcalMsg]=useState("");
  const [syncingId,setSyncingId]=useState(null);

  const save=()=>{
    if(!f.patient||!f.time)return;
    const p=patients.find(x=>x.name===f.patient);
    setItems([...items,{id:Date.now(),patient:f.patient,time:f.time,end:f.time,type:f.type,day:f.day,color:p?.color||C.terra,date:f.date}]);
    setF({patient:"",time:"",type:"Sesion",day:"Hoy",date:new Date().toISOString().slice(0,10)});
    setShowNew(false);
  };

  const connectGoogle=()=>{
    setGcalStatus("connecting");
    setGcalMsg("");
    try {
      const authUrl=`https://accounts.google.com/o/oauth2/v2/auth?client_id=${GCAL_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=token&scope=${encodeURIComponent(GCAL_SCOPE)}&prompt=consent`;
      const popup=window.open(authUrl,"gcal_auth","width=500,height=600,scrollbars=yes");
      const timer=setInterval(()=>{
        try{
          if(popup.closed){
            clearInterval(timer);
            setGcalStatus("connected");
            setGcalMsg("Conectado a Google Calendar");
          }
        }catch(e){}
      },500);
    } catch(e){
      setGcalStatus("disconnected");
      setGcalMsg("Error al conectar. Intentalo de nuevo.");
    }
  };

  const addToGcal=(item)=>{
    setSyncingId(item.id);
    const dateStr=item.date||new Date().toISOString().slice(0,10);
    const startDT=`${dateStr}T${item.time}:00`;
    const endDT=`${dateStr}T${item.end||item.time}:00`;
    const gcalUrl=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Hadrion - ${item.type}: ${item.patient}`)}&dates=${startDT.replace(/[-:]/g,"")}/${endDT.replace(/[-:]/g,"")}&details=${encodeURIComponent(`Sesion de ${item.type} con ${item.patient} - Hadrion Plataforma Terapeutica`)}&location=Consultorio`;
    window.open(gcalUrl,"_blank");
    setTimeout(()=>setSyncingId(null),2000);
  };

  const addAllToGcal=()=>{
    const gcalUrl=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Ver agenda Hadrion")}&details=${encodeURIComponent("Abre Hadrion para ver todos tus turnos: hadrion.netlify.app")}`;
    window.open(gcalUrl,"_blank");
  };

  return(
    <div className="fu">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <div><div className="pt">Agenda</div><div className="ps">Citas, turnos y Google Calendar</div></div>
        <button className="btn btnp btnsm noprint" onClick={()=>setShowNew(true)}>+ Nuevo turno</button>
      </div>

      {/* Google Calendar Panel */}
      <div className="sc" style={{marginBottom:14}}>
        <div className="sch">
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:8,background:"#4285F4",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>📅</div>
            <div>
              <div style={{fontWeight:700,fontSize:13,color:C.charcoal}}>Google Calendar</div>
              <div style={{fontSize:11,color:gcalStatus==="connected"?C.forest:C.grayL}}>
                {gcalStatus==="connected"?"✅ Conectado - turnos sincronizados":gcalStatus==="connecting"?"🔄 Conectando...":"⚪ No conectado"}
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:6}}>
            {gcalStatus!=="connected"
              ? <button className="btn btnsm" style={{background:"#4285F4",color:"white"}} onClick={connectGoogle}>Conectar</button>
              : <button className="btn btnsm" style={{background:"#34A853",color:"white"}} onClick={addAllToGcal}>Sincronizar todo</button>
            }
          </div>
        </div>
        {gcalMsg&&<div className="scb" style={{padding:"10px 16px",fontSize:12,color:C.forest}}>{gcalMsg}</div>}
        <div className="scb" style={{paddingTop:0}}>
          <div className="alert alrti" style={{marginBottom:0,fontSize:11}}>
            📱 Los eventos se agregan a tu Google Calendar y aparecen automaticamente en tu smartwatch con notificaciones.
          </div>
        </div>
      </div>

      {["Hoy","Manana"].map(day=>(
        <div key={day}>
          <div className="dayl">{day}</div>
          {items.filter(a=>a.day===day).map(a=>(
            <div key={a.id} className="card" style={{marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:9,height:9,borderRadius:"50%",background:a.color,flexShrink:0}}/>
                <div style={{fontWeight:700,fontSize:14,color:C.charcoal,minWidth:48}}>{a.time}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:13}}>{a.patient}</div>
                  <div style={{fontSize:11,color:C.grayL}}>{a.type} - hasta {a.end}</div>
                </div>
                <div style={{display:"flex",gap:5,alignItems:"center"}}>
                  <span className="badge" style={{background:a.color+"22",color:a.color,fontSize:10}}>{a.type}</span>
                  <button
                    className="btn btnsm"
                    style={{background:"#4285F4",color:"white",padding:"4px 8px",fontSize:10,borderRadius:6}}
                    onClick={()=>addToGcal(a)}
                    title="Agregar a Google Calendar"
                  >
                    {syncingId===a.id?"...":"📅"}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.filter(a=>a.day===day).length===0&&<div style={{color:C.grayL,fontSize:12,padding:"4px 0 8px"}}>Sin turnos</div>}
        </div>
      ))}

      {showNew&&(
        <Modal title="Nuevo Turno" onClose={()=>setShowNew(false)}>
          <div className="fg"><label className="lbl">Paciente</label>
            <select className="inp" value={f.patient} onChange={e=>setF({...f,patient:e.target.value})}>
              <option value="">Selecciona...</option>
              {patients.map(p=><option key={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Fecha</label><input type="date" className="inp" value={f.date} onChange={e=>setF({...f,date:e.target.value})}/></div>
          <div className="fg"><label className="lbl">Hora</label><input type="time" className="inp" value={f.time} onChange={e=>setF({...f,time:e.target.value})}/></div>
          <div className="fg"><label className="lbl">Tipo</label>
            <select className="inp" value={f.type} onChange={e=>setF({...f,type:e.target.value})}>
              {["Sesion","Evaluacion","Seguimiento","Primera consulta"].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Dia</label>
            <select className="inp" value={f.day} onChange={e=>setF({...f,day:e.target.value})}>
              {["Hoy","Manana"].map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
          <button className="btn btnp btnfull" onClick={save}>Guardar turno</button>
          <div className="alert alrti" style={{marginTop:8,fontSize:11}}>
            Despues de guardar, toca el icono 📅 del turno para agregarlo a Google Calendar y recibir notificacion en tu smartwatch.
          </div>
        </Modal>
      )}
    </div>
  );
}

function Patients({patients,setPatients,setActive,setSelPatId,sessions}){
  const [sel,setSel]=useState(null);
  const [showNew,setShowNew]=useState(false);
  const [search,setSearch]=useState("");
  const [f,setF]=useState({name:"",age:"",diagnosis:"",phone:"",email:"",guardian:"",notes:""});
  const dC={TEL:C.terra,Dislexia:C.sage,TDAH:C.purple,Disartria:C.info,TEA:C.gold,Otro:C.gray};
  const filtered=patients.filter(p=>p.status!=="archived"&&(p.name.toLowerCase().includes(search.toLowerCase())||p.diagnosis.toLowerCase().includes(search.toLowerCase())));
  const add=()=>{
    if(!f.name||!f.diagnosis)return;
    const init=f.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
    const cols=[C.terra,C.sage,C.purple,C.info,C.gold];
    setPatients([...patients,{id:Date.now(),name:f.name,age:parseInt(f.age)||0,diagnosis:f.diagnosis,sessions:0,nextSession:"Sin agendar",avatar:init,color:cols[patients.length%cols.length],phone:f.phone,email:f.email,guardian:f.guardian,notes:f.notes,goals:[],status:"active"}]);
    setF({name:"",age:"",diagnosis:"",phone:"",email:"",guardian:"",notes:""});setShowNew(false);
  };
  const pSessions=sel?sessions.filter(s=>s.patientId===sel.id):[];
  return(
    <div className="fu">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <div><div className="pt">Pacientes</div><div className="ps">{filtered.length} activos</div></div>
        <button className="btn btnp btnsm noprint" onClick={()=>setShowNew(true)}>+ Nuevo</button>
      </div>
      <input className="inp" placeholder="🔍 Buscar por nombre o diagnostico..." value={search} onChange={e=>setSearch(e.target.value)} style={{marginBottom:12}}/>
      {filtered.map(p=>(
        <div key={p.id} className="card" style={{marginBottom:10,cursor:"pointer"}} onClick={()=>setSel(p)}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div className="av" style={{width:48,height:48,background:p.color,fontSize:15}}>{p.avatar}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14,color:C.charcoal}}>{p.name}</div>
              <div style={{fontSize:12,color:C.grayL,marginTop:1}}>{p.age} anos - <span className="badge" style={{background:(dC[p.diagnosis]||C.gray)+"22",color:dC[p.diagnosis]||C.gray,fontSize:10}}>{p.diagnosis}</span></div>
              <div style={{fontSize:11,color:C.grayL,marginTop:2}}>📅 {p.nextSession}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:C.terra}}>{p.sessions}</div>
              <div style={{fontSize:10,color:C.grayL}}>sesiones</div>
            </div>
          </div>
        </div>
      ))}
      {sel&&(
        <Modal title="" onClose={()=>setSel(null)}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
            <div className="av" style={{width:54,height:54,background:sel.color,fontSize:18,borderRadius:16}}>{sel.avatar}</div>
            <div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:C.charcoal}}>{sel.name}</div>
              <div style={{fontSize:12,color:C.grayL}}>{sel.age} anos - {sel.diagnosis} - {sel.sessions} sesiones</div>
            </div>
          </div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:12}}>
            <button className="btn btng btnsm">✏️ Editar</button>
            <button className="btn btng btnsm" onClick={()=>{setPatients(patients.map(p=>p.id===sel.id?{...p,status:"archived"}:p));setSel(null);}}>📦 Archivar</button>
            <button className="btn btno btnsm" onClick={()=>{setSelPatId(sel.id);setActive("history");setSel(null);}}>📋 Historia</button>
            <button className="btn btnp btnsm">⚡ Nueva sesion</button>
          </div>
          <div style={{fontSize:12,color:C.grayL,marginBottom:10}}>📊 {pSessions.length} registros - 🎯 0 activos - ✅ 0 logrados</div>
          <div className="sep"/>
          {[["📞",sel.phone||"—"],["✉️",sel.email||"—"],["👨‍👩‍👧",sel.guardian||"—"]].map(([i,v])=>(
            <div key={i} className="hxf"><div className="hxv">{i} {v}</div></div>
          ))}
          {sel.notes&&<div className="hxf"><div className="hxl">Notas</div><div className="hxv">{sel.notes}</div></div>}
          {sel.goals?.length>0&&<div className="hxf"><div className="hxl">Objetivos</div>{sel.goals.map((g,i)=><div key={i} className="hxv">• {g}</div>)}</div>}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
            {[{l:"Anamnesis",i:"📋"},{l:"Registros",i:"📝",n:pSessions.length},{l:"Plan Terapeutico",i:"🎯"},{l:"Sugerencias",i:"💡"},{l:"Informe",i:"📄"},{l:"Linea de Tiempo",i:"⏱️"}].map(t=>(
              <div key={t.l} style={{background:C.cream,borderRadius:10,padding:"10px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontSize:12,fontWeight:500,color:C.charcoal}}>
                {t.i} {t.l}{t.n!=null&&<span style={{marginLeft:"auto",fontSize:10,color:C.grayL}}>({t.n})</span>}
              </div>
            ))}
          </div>
          <button className="btn btno btnfull noprint" style={{marginTop:10}} onClick={()=>window.print()}>🖨️ Imprimir ficha</button>
        </Modal>
      )}
      {showNew&&(
        <Modal title="Nuevo Paciente" onClose={()=>setShowNew(false)}>
          {[["Nombre completo","name","text","Nombre y apellido"],["Edad","age","number","Anos"],["Telefono","phone","tel","(+54) 9..."],["Email","email","email","email@mail.com"],["Tutor/Responsable","guardian","text","Nombre y parentesco"]].map(([l,k,t,ph])=>(
            <div className="fg" key={k}><label className="lbl">{l}</label><input className="inp" type={t} placeholder={ph} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}/></div>
          ))}
          <div className="fg"><label className="lbl">Diagnostico</label>
            <select className="inp" value={f.diagnosis} onChange={e=>setF({...f,diagnosis:e.target.value})}>
              <option value="">Selecciona diagnostico...</option>
              {["TEL","Dislexia","TDAH","Disartria","TEA","Discalculia","Tartamudez","Otro"].map(d=><option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Notas iniciales</label><textarea className="inp" placeholder="Motivo de consulta..." value={f.notes} onChange={e=>setF({...f,notes:e.target.value})}/></div>
          <button className="btn btnp btnfull" onClick={add}>Agregar paciente</button>
        </Modal>
      )}
    </div>
  );
}

function Payments({patients,payments,setPayments}){
  const [showNew,setShowNew]=useState(false);
  const [f,setF]=useState({patientId:"",amount:"",type:"Particular",method:"Transferencia",date:new Date().toISOString().slice(0,10)});
  const total=payments.filter(p=>p.status==="pagado").reduce((a,p)=>a+p.amount,0);
  const particular=payments.filter(p=>p.type==="Particular"&&p.status==="pagado").reduce((a,p)=>a+p.amount,0);
  const obra=payments.filter(p=>p.type==="Obra social"&&p.status==="pagado").reduce((a,p)=>a+p.amount,0);
  const save=()=>{
    if(!f.patientId||!f.amount)return;
    const p=patients.find(x=>x.id===parseInt(f.patientId));
    setPayments([...payments,{id:Date.now(),patientId:parseInt(f.patientId),patient:p?.name||"",amount:parseInt(f.amount),type:f.type,date:f.date,method:f.method,status:"pagado"}]);
    setF({patientId:"",amount:"",type:"Particular",method:"Transferencia",date:new Date().toISOString().slice(0,10)});setShowNew(false);
  };
  const month=cap(new Date().toLocaleDateString("es-UY",{month:"long",year:"numeric"}));
  return(
    <div className="fu">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <div><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:20}}>💳</span><div className="pt">Registro de Pagos</div></div><div className="ps">{month} - Cobros registrados</div></div>
        <button className="btn btnp btnsm noprint" onClick={()=>setShowNew(true)}>+ Registrar pago</button>
      </div>
      {[{l:"Total cobrado",v:total,n:payments.filter(p=>p.status==="pagado").length,ic:"📈",c:C.terra},{l:"Particular",v:particular,n:payments.filter(p=>p.type==="Particular").length,ic:"💰",c:C.purple},{l:"Obra social",v:obra,n:payments.filter(p=>p.type==="Obra social").length,ic:"🏥",c:C.info}].map(r=>(
        <div key={r.l} className="card" style={{marginBottom:10,display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:46,height:46,borderRadius:13,background:r.c+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{r.ic}</div>
          <div><div style={{fontSize:12,color:C.grayL}}>{r.l}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:700,color:C.charcoal}}>${r.v.toLocaleString("es-UY")}</div><div style={{fontSize:11,color:C.grayL}}>{r.n} pagos</div></div>
        </div>
      ))}
      <div className="sep"/>
      {payments.length===0?<div style={{textAlign:"center",padding:"30px 0",color:C.grayL}}><div style={{fontSize:36,marginBottom:8}}>💳</div><div style={{fontWeight:600}}>Sin cobros registrados</div></div>:payments.map(p=>(
        <div key={p.id} className="card" style={{marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div><div style={{fontWeight:600,fontSize:13,color:C.charcoal}}>{p.patient}</div><div style={{fontSize:11,color:C.grayL}}>{p.date} - {p.type} - {p.method}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontWeight:700,fontSize:16,color:C.charcoal}}>${p.amount.toLocaleString("es-UY")}</div><span className="badge" style={{background:p.status==="pagado"?C.greenF:C.goldF,color:p.status==="pagado"?C.forest:C.gold,fontSize:10}}>{p.status}</span></div>
          </div>
        </div>
      ))}
      {showNew&&(
        <Modal title="Registrar Pago" onClose={()=>setShowNew(false)}>
          <div className="fg"><label className="lbl">Paciente</label>
            <select className="inp" value={f.patientId} onChange={e=>setF({...f,patientId:e.target.value})}>
              <option value="">Selecciona...</option>
              {patients.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Monto</label><input className="inp" type="number" placeholder="0" value={f.amount} onChange={e=>setF({...f,amount:e.target.value})}/></div>
          <div className="fg"><label className="lbl">Tipo</label>
            <select className="inp" value={f.type} onChange={e=>setF({...f,type:e.target.value})}>
              {["Particular","Obra social","Mutual","Prepaga"].map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Metodo</label>
            <select className="inp" value={f.method} onChange={e=>setF({...f,method:e.target.value})}>
              {["Transferencia","Efectivo","Tarjeta","MercadoPago"].map(m=><option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Fecha</label><input type="date" className="inp" value={f.date} onChange={e=>setF({...f,date:e.target.value})}/></div>
          <button className="btn btnp btnfull" onClick={save}>Guardar pago</button>
        </Modal>
      )}
    </div>
  );
}

const ECHIPS=["regulado","cansado","irritable","baja energia","hiperactivo","malestar fisico","buena disposicion"];
const ACHIPS=["sostenida","fluctuante","dispersa","requiere apoyos"];
const SCHIPS=["busqueda sensorial","evitacion","sensibilidad auditiva","sensibilidad tactil","necesidad de movimiento"];
const PCHIPS=["buena","parcial","rechazo inicial","se adapto progresivamente"];

function Sessions({patients,sessions,setSessions}){
  const [showNew,setShowNew]=useState(false);
  const [f,setF]=useState({patientId:"",objective:"",note:"",progress:50,activities:"",homework:"",estado:"",atencion:"",participacion:"",sensorial:[]});
  const tog=(k,v)=>{
    if(k==="sensorial")setF(p=>({...p,sensorial:p.sensorial.includes(v)?p.sensorial.filter(x=>x!==v):[...p.sensorial,v]}));
    else setF(p=>({...p,[k]:p[k]===v?"":v}));
  };
  const save=()=>{
    if(!f.patientId||!f.note)return;
    const p=patients.find(x=>x.id===parseInt(f.patientId));
    setSessions([{id:Date.now(),patientId:parseInt(f.patientId),patient:p?.name||"",date:new Date().toLocaleDateString("es-UY"),...f,activities:f.activities?f.activities.split(",").map(s=>s.trim()):[]},  ...sessions]);
    setF({patientId:"",objective:"",note:"",progress:50,activities:"",homework:"",estado:"",atencion:"",participacion:"",sensorial:[]});setShowNew(false);
  };
  return(
    <div className="fu">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <div><div className="pt">Registros Clinicos</div><div className="ps">Historial de sesiones</div></div>
        <button className="btn btnp btnsm noprint" onClick={()=>setShowNew(true)}>+ Registrar</button>
      </div>
      {sessions.length===0&&<div style={{textAlign:"center",padding:"32px 0",color:C.grayL}}>📝 Sin registros aun</div>}
      {sessions.map(s=>(
        <div key={s.id} className="sc">
          <div className="sch">
            <div><div style={{fontWeight:700,fontSize:14,color:C.charcoal}}>{s.patient}</div><div style={{fontSize:11,color:C.grayL}}>{s.date}</div></div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              {s.objective&&<span className="badge" style={{background:C.terraF,color:C.terra,fontSize:10}}>{s.objective}</span>}
              <button className="btn btng btnsm noprint" onClick={()=>window.print()}>🖨️</button>
            </div>
          </div>
          <div className="scb">
            {s.estado&&<div className="hxf"><div className="hxl">Estado - Atencion</div><div className="hxv">{s.estado}{s.atencion?` - ${s.atencion}`:""}</div></div>}
            <div className="hxf"><div className="hxl">📝 Notas clinicas</div><div className="hxv">{s.note}</div></div>
            {s.homework&&<div className="hxf"><div className="hxl">🏠 Tarea para casa</div><div className="hxv">{s.homework}</div></div>}
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8}}>
              <div style={{fontSize:11,color:C.grayL}}>Progreso</div>
              <div className="prog" style={{flex:1}}><div className="progf" style={{width:`${s.progress}%`}}/></div>
              <span style={{fontSize:12,fontWeight:700,color:C.terra}}>{s.progress}%</span>
            </div>
          </div>
        </div>
      ))}
      {showNew&&(
        <Modal title="Nueva Sesion" onClose={()=>setShowNew(false)}>
          <div className="fg"><label className="lbl">Paciente</label>
            <select className="inp" value={f.patientId} onChange={e=>setF({...f,patientId:e.target.value})}>
              <option value="">Selecciona...</option>
              {patients.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div style={{fontWeight:700,fontSize:13,color:C.charcoal,margin:"10px 0 7px"}}>⚡ Fichas clinicas rapidas</div>
          <div style={{background:C.cream,borderRadius:12,padding:12,marginBottom:12}}>
            {[["ESTADO GENERAL","estado",ECHIPS],["ATENCION","atencion",ACHIPS],["SENSORIAL","sensorial",SCHIPS],["PARTICIPACION","participacion",PCHIPS]].map(([l,k,chips])=>(
              <div key={k}>
                <div className="lbl" style={{marginTop:k!=="estado"?8:0,marginBottom:5}}>{l}</div>
                <div className="chiprow">{chips.map(c=><button key={c} className={`chip${(k==="sensorial"?f.sensorial.includes(c):f[k]===c)?" sel":""}`} onClick={()=>tog(k,c)}>{c}</button>)}</div>
              </div>
            ))}
          </div>
          <div className="fg"><label className="lbl">Objetivo trabajado</label><input className="inp" placeholder="Ej: Fonemas fricativos /s/" value={f.objective} onChange={e=>setF({...f,objective:e.target.value})}/></div>
          <div className="fg"><label className="lbl">Notas clinicas</label><textarea className="inp" placeholder="Observaciones, logros, dificultades..." value={f.note} onChange={e=>setF({...f,note:e.target.value})}/></div>
          <div className="fg"><label className="lbl">Actividades (por coma)</label><input className="inp" placeholder="Ruleta de silabas, Espejo articulatorio" value={f.activities} onChange={e=>setF({...f,activities:e.target.value})}/></div>
          <div className="fg"><label className="lbl">Tarea para casa</label><input className="inp" placeholder="Indicaciones para la familia..." value={f.homework} onChange={e=>setF({...f,homework:e.target.value})}/></div>
          <div className="fg"><label className="lbl">Progreso: {f.progress}%</label>
            <input type="range" style={{width:"100%",accentColor:C.terra}} min={0} max={100} step={5} value={f.progress} onChange={e=>setF({...f,progress:parseInt(e.target.value)})}/>
            <div className="prog" style={{marginTop:4}}><div className="progf" style={{width:`${f.progress}%`}}/></div>
          </div>
          <button className="btn btnp btnfull" onClick={save}>Guardar sesion</button>
        </Modal>
      )}
    </div>
  );
}

function History({patients,sessions,selectedPatientId}){
  const [pid,setPid]=useState(selectedPatientId||"");
  const [ans,setAns]=useState({});
  const [tab,setTab]=useState("anamnesis");
  const patient=patients.find(p=>p.id===parseInt(pid));
  const pSess=sessions.filter(s=>s.patientId===parseInt(pid));
  return(
    <div className="fu">
      <div style={{marginBottom:14}}><div className="pt">Historia Clinica</div><div className="ps">Registro integral del paciente</div></div>
      <div className="fg"><label className="lbl">Selecciona paciente</label>
        <select className="inp" value={pid} onChange={e=>setPid(e.target.value)}>
          <option value="">Elige un paciente...</option>
          {patients.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      {patient&&(
        <>
          <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:14,background:"white",borderRadius:14,padding:13,boxShadow:"0 1px 6px rgba(0,0,0,.05)"}}>
            <div className="av" style={{width:46,height:46,background:patient.color,fontSize:15}}>{patient.avatar}</div>
            <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14,color:C.charcoal}}>{patient.name}</div><div style={{fontSize:12,color:C.grayL}}>{patient.age} anos - {patient.diagnosis}</div></div>
            <button className="btn btno btnsm noprint" onClick={()=>window.print()}>🖨️ Imprimir</button>
          </div>
          <div className="atabrow">
            {["anamnesis","objetivos","evolucion","informe"].map(t=><button key={t} className={`atab${tab===t?" active":""}`} onClick={()=>setTab(t)}>{cap(t)}</button>)}
          </div>
          {tab==="anamnesis"&&ANAMNESIS.map((sec,si)=>(
            <SC key={si} title={`${sec.i} ${sec.t}`}>
              {sec.q.map((q,qi)=>(
                <div key={qi} style={{marginBottom:10}}>
                  <div style={{fontSize:12,color:C.grayL,marginBottom:4}}>{q}</div>
                  <textarea className="inp" placeholder="Respuesta..." value={ans[`${si}-${qi}`]||""} onChange={e=>setAns({...ans,[`${si}-${qi}`]:e.target.value})} style={{minHeight:52,fontSize:12}}/>
                </div>
              ))}
            </SC>
          ))}
          {tab==="objetivos"&&(
            <SC title="🎯 Objetivos Terapeuticos">
              {patient.goals?.length>0?patient.goals.map((g,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.sand}`}}>
                  <div style={{width:22,height:22,borderRadius:6,background:C.terraF,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.terra}}>{i+1}</div>
                  <div style={{fontSize:13,color:C.charcoal}}>{g}</div>
                </div>
              )):<div style={{color:C.grayL,fontSize:13}}>Sin objetivos cargados.</div>}
            </SC>
          )}
          {tab==="evolucion"&&(
            <SC title={`📝 Evolucion (${pSess.length} sesiones)`}>
              {pSess.length===0?<div style={{color:C.grayL,fontSize:13}}>Sin sesiones.</div>:pSess.map((s,i)=>(
                <div key={s.id} style={{padding:"11px 0",borderBottom:i<pSess.length-1?`1px solid ${C.sand}`:"none"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:12,fontWeight:700,color:C.terra}}>Sesion {pSess.length-i}</span>
                    <span style={{fontSize:11,color:C.grayL}}>{s.date}</span>
                  </div>
                  {s.objective&&<div style={{fontSize:12,color:C.grayL,marginBottom:3}}>🎯 {s.objective}</div>}
                  {s.estado&&<div style={{fontSize:11,color:C.grayL}}>Estado: {s.estado}{s.atencion?` - ${s.atencion}`:""}</div>}
                  <div style={{fontSize:13,color:C.charcoal,lineHeight:1.5,margin:"5px 0"}}>{s.note}</div>
                  {s.homework&&<div style={{fontSize:12,color:C.forest}}>🏠 {s.homework}</div>}
                  <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
                    <div className="prog" style={{flex:1}}><div className="progf" style={{width:`${s.progress}%`}}/></div>
                    <span style={{fontSize:11,fontWeight:700,color:C.terra}}>{s.progress}%</span>
                  </div>
                </div>
              ))}
            </SC>
          )}
          {tab==="informe"&&(
            <div>
              <div className="alert alrti">📄 Informe generado con los datos del paciente. Edita antes de imprimir.</div>
              <div className="sc">
                <div className="sch" style={{background:C.terraF}}>
                  <div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontWeight:700,color:C.charcoal}}>Hadrion - Plataforma Clinica</div>
                    <div style={{fontSize:12,color:C.grayL}}>Informe Evolutivo — {new Date().toLocaleDateString("es-UY")}</div>
                  </div>
                </div>
                <div className="scb">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                    {[["Paciente",patient.name],["Edad",`${patient.age} anos`],["Diagnostico",patient.diagnosis],["Sesiones",patient.sessions],["Profesional","Adriana Soba"],["Especialidad","Fonoaudiologia"]].map(([l,v])=>(
                      <div key={l} className="hxf"><div className="hxl">{l}</div><div className="hxv">{v}</div></div>
                    ))}
                  </div>
                  {patient.notes&&<div style={{fontWeight:700,fontSize:13,marginBottom:5}}>Antecedentes clinicos</div>}
                  {patient.notes&&<div style={{fontSize:13,color:C.charcoal,lineHeight:1.6,background:C.cream,borderRadius:10,padding:10,marginBottom:12}}>{patient.notes}</div>}
                  {patient.goals?.length>0&&<><div style={{fontWeight:700,fontSize:13,marginBottom:5}}>Objetivos terapeuticos</div>{patient.goals.map((g,i)=><div key={i} style={{fontSize:13,padding:"4px 0",borderBottom:`1px solid ${C.sand}`}}>• {g}</div>)}</>}
                  {pSess.length>0&&<><div style={{fontWeight:700,fontSize:13,margin:"12px 0 6px"}}>Evolucion terapeutica</div>{pSess.slice(0,3).map((s,i)=>(
                    <div key={s.id} style={{marginBottom:10,padding:10,background:C.cream,borderRadius:10}}>
                      <div style={{fontWeight:600,fontSize:12,color:C.terra}}>Sesion {pSess.length-i} - {s.date}</div>
                      <div style={{fontSize:13,marginTop:3,lineHeight:1.5}}>{s.note}</div>
                    </div>
                  ))}</>}
                  <div className="sep"/>
                  <div style={{fontSize:12,color:C.grayL}}>Firma: _________________ - RUT: _________________ - Hadrion</div>
                </div>
              </div>
              <button className="btn btnp btnfull noprint" style={{marginTop:8}} onClick={()=>window.print()}>🖨️ Imprimir / PDF</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Activities(){
  const [fil,setFil]=useState("all");
  const [ageGroup,setAgeGroup]=useState("all");
  const [sel,setSel]=useState(null);
  const [nivel,setNivel]=useState("facil");
  const tC={Clinica:{bg:C.sageF,c:C.forest},Familia:{bg:C.terraF,c:C.terra}};
  const nivelC={facil:{bg:"#E8F8EF",c:"#27AE60"},medio:{bg:C.goldF,c:C.gold},dificil:{bg:C.dangerF,c:C.danger}};

  const filtered=ACTIVITIES_DB.filter(a=>{
    const matchFil=fil==="all"||a.type===fil||a.target===fil||a.category===fil;
    const matchAge=ageGroup==="all"||a.ageGroup?.includes(ageGroup);
    return matchFil&&matchAge;
  });

  return(
    <div className="fu">
      <div style={{marginBottom:14}}><div className="pt">Banco de Actividades</div><div className="ps">Actividades reales con niveles de dificultad y grupo etario</div></div>

      <div className="filrow">
        {["all","Clinica","Familia","Lenguaje","Lectoescritura","Articulacion","Regulacion","Atencion","TEL","Dislexia","TDAH","Disartria"].map(f=>(
          <button key={f} className={`filbtn${fil===f?" active":""}`} onClick={()=>setFil(f)}>{f==="all"?"Todas":f}</button>
        ))}
      </div>

      <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}>
        <span style={{fontSize:11,color:C.grayL,alignSelf:"center",fontWeight:600}}>Edad:</span>
        {["all","Preescolar","Escolar","Todos"].map(g=>(
          <button key={g} className={`filbtn${ageGroup===g?" active":""}`} style={{fontSize:11}} onClick={()=>setAgeGroup(g)}>{g==="all"?"Todas las edades":g}</button>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {filtered.map(a=>(
          <div key={a.id} className="card" style={{cursor:"pointer",padding:12}} onClick={()=>{setSel(a);setNivel("facil");}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span className="badge" style={{background:tC[a.type]?.bg,color:tC[a.type]?.c,fontSize:10}}>{a.type}</span>
              {a.printable&&<span style={{fontSize:10,color:C.info}}>🖨️</span>}
            </div>
            <div style={{fontWeight:700,fontSize:12,color:C.charcoal,marginBottom:3}}>{a.name}</div>
            <div style={{fontSize:10,color:C.grayL,marginBottom:4}}>{a.category} - {a.target} - {a.age} anos</div>
            <div style={{display:"flex",gap:3}}>
              {["facil","medio","dificil"].map(n=>(
                <span key={n} style={{fontSize:9,padding:"1px 6px",borderRadius:10,background:nivelC[n].bg,color:nivelC[n].c,fontWeight:600}}>{n}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {sel&&(
        <Modal title={sel.name} onClose={()=>setSel(null)}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
            <span className="badge" style={{background:tC[sel.type]?.bg,color:tC[sel.type]?.c}}>{sel.type}</span>
            <span className="badge" style={{background:C.terraF,color:C.terra}}>{sel.target}</span>
            <span className="badge" style={{background:C.sand,color:C.gray}}>{sel.age} anos</span>
            <span className="badge" style={{background:C.infoF,color:C.info}}>{sel.ageGroup}</span>
          </div>
          <div className="hxf"><div className="hxl">📝 Descripcion general</div><div className="hxv">{sel.description}</div></div>
          <div className="hxf"><div className="hxl">🧰 Materiales</div><div className="hxv">{sel.materials}</div></div>

          {sel.niveles&&<>
            <div style={{fontWeight:700,fontSize:13,color:C.charcoal,margin:"14px 0 8px"}}>Niveles de dificultad</div>
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              {["facil","medio","dificil"].map(n=>(
                <button key={n} className="btn btnsm" style={{flex:1,justifyContent:"center",background:nivel===n?nivelC[n].bg:"white",color:nivel===n?nivelC[n].c:C.grayL,border:`1.5px solid ${nivel===n?nivelC[n].c:C.sand}`,fontWeight:nivel===n?700:500}} onClick={()=>setNivel(n)}>
                  {n==="facil"?"🟢 Facil":n==="medio"?"🟡 Medio":"🔴 Dificil"}
                </button>
              ))}
            </div>

            {sel.niveles[nivel]&&<>
              <div style={{background:nivelC[nivel].bg,borderRadius:12,padding:14,border:`1.5px solid ${nivelC[nivel].c}22`}}>
                <div style={{fontWeight:700,fontSize:13,color:nivelC[nivel].c,marginBottom:8}}>{sel.niveles[nivel].titulo}</div>
                <div style={{fontWeight:600,fontSize:11,color:C.grayL,marginBottom:4,textTransform:"uppercase",letterSpacing:.5}}>Instrucciones</div>
                <div style={{fontSize:13,color:C.charcoal,lineHeight:1.6,marginBottom:10}}>{sel.niveles[nivel].instrucciones}</div>
                <div style={{fontWeight:600,fontSize:11,color:C.grayL,marginBottom:4,textTransform:"uppercase",letterSpacing:.5}}>Ejemplos</div>
                {sel.niveles[nivel].ejemplos.map((e,i)=>(
                  <div key={i} style={{fontSize:12,color:C.charcoal,padding:"4px 0",borderBottom:`1px solid ${nivelC[nivel].c}22`}}>• {e}</div>
                ))}
                <div style={{marginTop:8,fontSize:11,color:nivelC[nivel].c,fontWeight:600}}>🎯 Apoyo sugerido: {sel.niveles[nivel].apoyo}</div>
              </div>
            </>}
          </>}

          {sel.printable&&<button className="btn btno btnfull noprint" style={{marginTop:12}} onClick={()=>window.print()}>🖨️ Imprimir actividad completa</button>}
        </Modal>
      )}
    </div>
  );
}

const PHONEME_EMOJI={
  "A":["avion","arbol","arana","abeja","aguila"],
  "E":["elefante","estrella","escalera","espejo","escoba"],
  "I":["isla","iguana","igle sia","iman"],
  "O":["oso","oveja","olla","oruga"],
  "U":["uva","uniforme","unicornio"],
  "B":["barco","bicicleta","ballena","bota"],
  "C":["casa","cama","conejo","carro"],
  "CH":["chocolate","chancho","chaleco"],
  "D":["dedo","dado","dinosaurio"],
  "F":["foca","fresa","flor","fuego"],
  "G":["gato","globo","galleta","gorila"],
  "J":["jirafa","jardin","jabon"],
  "L":["luna","lapiz","leche","libro"],
  "LL":["llave","llanta","lluvia"],
  "M":["mariposa","mesa","manzana","mono"],
  "N":["nube","naranja","nariz","nieve"],
  "N":["nandu","pina","unas"],
  "P":["pato","pelota","perro","piano"],
  "R":["raton","robot","rosa","reloj"],
  "RR":["carro","perro","tierra","pizarra"],
  "S":["sol","silla","sapo","sopa"],
  "T":["tijeras","tren","tortuga","tigre"],
  "V":["vaca","violin","ventana"],
  "Y":["yoyo","yogur","yate"],
  "Z":["zapato","zorro","zanahoria"],
};

function Phonology(){
  const [sel,setSel]=useState(null);
  const [stage,setStage]=useState("Escucha");
  const [score,setScore]=useState(0);
  const [fil,setFil]=useState("Todas");
  const [wordIdx,setWordIdx]=useState(0);
  const [showWords,setShowWords]=useState(false);

  const stages=["Escucha","Imagen","Letra","Silaba","Segmentacion","Fusion","Manipulacion"];
  const cats={Vocales:["A","E","I","O","U"],Consonantes:PHONEMES.filter(p=>!["A","E","I","O","U"].includes(p)),Todas:PHONEMES};
  const speak=ph=>{
    if(window.speechSynthesis){
      const u=new SpeechSynthesisUtterance(ph.toLowerCase());
      u.lang="es-UY";u.rate=0.7;
      window.speechSynthesis.speak(u);
    }
  };
  const speakWord=w=>{
    if(window.speechSynthesis){
      const u=new SpeechSynthesisUtterance(w.toLowerCase());
      u.lang="es-UY";u.rate=0.8;
      window.speechSynthesis.speak(u);
    }
  };
  const handle=ph=>{setSel(ph);speak(ph);setScore(s=>s+1);setWordIdx(0);setShowWords(false);};
  const words=sel?PHONEME_WORDS[sel]||[]:[];
  const emojiWords=sel?PHONEME_EMOJI[sel]||[]:[];

  // Imagenes reales por palabra usando Pixabay (busqueda en espanol)
  // Usar Unsplash para imagenes reales
  const getImgUrl=(word)=>"https://source.unsplash.com/80x80/?" + word;

  return(
    <div className="fu">
      <div style={{marginBottom:14}}><div className="pt">Conciencia Fonologica</div><div className="ps">7 niveles progresivos - palabras reales con imagenes</div></div>

      <SC title="Etapa del ejercicio">
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {stages.map(s=><button key={s} className={`filbtn${stage===s?" active":""}`} onClick={()=>setStage(s)}>{s}</button>)}
        </div>
      </SC>

      <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
        {Object.keys(cats).map(c=><button key={c} className={`filbtn${fil===c?" active":""}`} onClick={()=>setFil(c)}>{c}</button>)}
        <div style={{marginLeft:"auto",background:C.terraF,borderRadius:10,padding:"6px 12px",fontSize:13,fontWeight:700,color:C.terra}}>⭐ {score}</div>
      </div>

      {/* Fonema seleccionado */}
      {sel&&(
        <div style={{background:C.terraF,borderRadius:16,padding:"16px",marginBottom:12,border:`2px solid ${C.terraL}`}}>
          {/* Letra grande */}
          <div style={{textAlign:"center",marginBottom:12}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:72,fontWeight:700,color:C.terra,lineHeight:1}}>{sel}</div>
            <div style={{fontSize:12,color:C.terraD,marginTop:4}}>Etapa: {stage}</div>
            <button className="btn btnp btnsm" style={{marginTop:8}} onClick={()=>speak(sel)}>🔊 Escuchar fonema</button>
          </div>

          {/* Imagenes reales por palabra */}
          {(stage==="Imagen"||stage==="Escucha")&&emojiWords.length>0&&(
            <div>
              <div style={{fontSize:11,fontWeight:700,color:C.terraD,marginBottom:8,textTransform:"uppercase",letterSpacing:.5}}>Palabras que empiezan con {sel}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
                {emojiWords.map((w,i)=>(
                  <div key={i} style={{textAlign:"center",cursor:"pointer",background:"white",borderRadius:12,overflow:"hidden",border:"2px solid "+C.terraL,width:80}} onClick={()=>speakWord(w)}>
                    <img src={getImgUrl(w)} alt={w} style={{width:80,height:70,objectFit:"cover",display:"block"}} onError={e=>{e.target.style.display="none";}}/>
                    <div style={{fontSize:10,fontWeight:800,color:C.terra,padding:"4px 2px",textTransform:"uppercase"}}>{w}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Palabras con ese fonema */}
          <div style={{marginTop:12}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <div style={{fontSize:11,fontWeight:700,color:C.terraD,textTransform:"uppercase",letterSpacing:.5}}>Palabras con {sel}</div>
              <button className="btn btnsm" style={{background:C.terra,color:"white",fontSize:10}} onClick={()=>setShowWords(!showWords)}>{showWords?"Ocultar":"Ver todas"}</button>
            </div>

            {/* Palabra del dia - grande */}
            {words.length>0&&(
              <div style={{display:"flex",alignItems:"center",gap:12,background:"white",borderRadius:12,padding:"10px 14px",marginBottom:8}}>
                <div style={{width:50,height:50,borderRadius:12,background:C.terraF,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,color:C.terra,flexShrink:0}}>{sel}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:700,color:C.charcoal}}>{words[wordIdx%words.length]}</div>
                  <div style={{fontSize:11,color:C.grayL}}>{wordIdx+1} de {words.length}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  <button className="btn btnsm" style={{background:"#4285F4",color:"white",fontSize:12}} onClick={()=>speakWord(words[wordIdx%words.length])}>🔊</button>
                  <button className="btn btnsm" style={{background:C.sand,fontSize:12}} onClick={()=>setWordIdx(i=>(i+1)%words.length)}>→</button>
                </div>
              </div>
            )}

            {/* Lista de todas las palabras */}
            {showWords&&(
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {words.map((w,i)=>(
                  <button key={i} className="chip" style={{fontSize:11}} onClick={()=>{setWordIdx(i);speakWord(w);}}>{emojis[i]||"📝"} {w}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grilla de fonemas */}
      <div className="phgrid">
        {(cats[fil]||PHONEMES).map(ph=>(
          <button key={ph} className={`phbtn${sel===ph?" sel":""}`} onClick={()=>handle(ph)}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:700}}>{ph}</div>
            {PHONEME_EMOJI[ph]&&<div style={{fontSize:11,lineHeight:1}}>{PHONEME_EMOJI[ph][0]}</div>}
          </button>
        ))}
      </div>

      <SC title="🎮 Juegos Fonologicos">
        {[
          ["🎯","Atrapa el sonido","Toca el fonema que escuchas entre 3 opciones. El adulto pronuncia, el nino toca la letra correcta."],
          ["❓","Donde esta?","Mostrar 4 emojis/imagenes. El nino toca la que empieza con el fonema indicado."],
          ["🃏","Parejas de sonido","Unir cada letra con su imagen correspondiente. Nivel basico: 4 pares. Nivel avanzado: 8 pares."],
          ["✂️","Segmentacion","El nino separa silabas de la palabra mostrada usando palmadas o fichas de color."],
          ["🔀","Manipulacion","Cambiar el fonema inicial de una palabra para crear una nueva: PATO → GATO → MATO → DATO."],
        ].map(([i,n,d])=>(
          <div key={n} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:`1px solid ${C.sand}`}}>
            <div style={{fontSize:22,flexShrink:0}}>{i}</div>
            <div><div style={{fontWeight:600,fontSize:13,color:C.charcoal}}>{n}</div><div style={{fontSize:11,color:C.grayL}}>{d}</div></div>
          </div>
        ))}
      </SC>
    </div>
  );
}

function Reports({patients,sessions,payments}){
  const [pid,setPid]=useState("");
  const patient=patients.find(p=>p.id===parseInt(pid));
  const pSess=sessions.filter(s=>s.patientId===parseInt(pid));
  const totalC=payments.filter(p=>p.status==="pagado").reduce((a,b)=>a+b.amount,0);
  return(
    <div className="fu">
      <div style={{marginBottom:14}}><div className="pt">Reportes</div><div className="ps">Estadisticas e informes</div></div>
      <div className="sgrid">
        <div className="sc2"><div className="snum">{patients.length}</div><div className="slbl">Pacientes</div></div>
        <div className="sc2"><div className="snum">{sessions.length}</div><div className="slbl">Sesiones</div></div>
        <div className="sc2"><div className="snum">${(totalC/1000).toFixed(0)}k</div><div className="slbl">Cobrado</div></div>
        <div className="sc2"><div className="snum">{payments.filter(p=>p.status==="pendiente").length}</div><div className="slbl">Pendientes</div></div>
      </div>
      <SC title="⚙️ Generar informe">
        <div className="fg"><label className="lbl">Paciente</label>
          <select className="inp" value={pid} onChange={e=>setPid(e.target.value)}>
            <option value="">Selecciona...</option>
            {patients.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        {patient&&<>
          <div className="alert alrts">✅ {pSess.length} sesiones registradas — listo para generar</div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            <button className="btn btnp btnsm" onClick={()=>window.print()}>🖨️ Evolutivo</button>
            <button className="btn btno btnsm" onClick={()=>window.print()}>📄 Derivacion</button>
            <button className="btn btng btnsm" onClick={()=>window.print()}>👨‍👩‍👧 Para familias</button>
          </div>
        </>}
      </SC>
      <SC title="📊 Diagnosticos">
        {Object.entries(patients.reduce((a,p)=>{a[p.diagnosis]=(a[p.diagnosis]||0)+1;return a},{})).map(([d,n])=>(
          <div key={d} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.sand}`}}>
            <div style={{flex:1,fontWeight:500,fontSize:13}}>{d}</div>
            <div className="prog" style={{width:90}}><div className="progf" style={{width:`${(n/patients.length)*100}%`}}/></div>
            <div style={{fontSize:13,fontWeight:700,color:C.terra,minWidth:20}}>{n}</div>
          </div>
        ))}
      </SC>
    </div>
  );
}

function Resources(){
  const [sel,setSel]=useState(null);
  const recursos=[
    {i:"📋",t:"Plantilla de anamnesis",d:"Formulario completo de historia clinica inicial",c:"Evaluacion",contenido:`PLANTILLA DE ANAMNESIS\n\nDATOS DEL PACIENTE\nNombre: _______________\nFecha de nacimiento: _______________\nEdad: _____ Diagnostico: _______________\nTutor/Responsable: _______________\nTelefono: _______________\n\nMOTIVO DE CONSULTA\n________________________________\n________________________________\n\nANTECEDENTES\n- Embarazo y parto: _______________\n- Hitos del desarrollo: _______________\n- Antecedentes medicos: _______________\n- Historia familiar: _______________\n\nOBSERVACIONES\n________________________________`},
    {i:"🎯",t:"Guia de objetivos TEL",d:"Objetivos terapeuticos por nivel para TEL",c:"Lenguaje",contenido:`OBJETIVOS TERAPEUTICOS - TEL\n\nNIVEL INICIAL\n- Comprension de consignas simples\n- Vocabulario basico (50-100 palabras)\n- Emision de palabras aisladas\n\nNIVEL MEDIO\n- Produccion de frases de 2-3 palabras\n- Vocabulario de 200+ palabras\n- Discriminacion auditiva de fonemas\n\nNIVEL AVANZADO\n- Oraciones completas con estructura SVO\n- Narrativa secuenciada\n- Conciencia fonologica\n\nHadrion - hadrion.netlify.app`},
    {i:"📊",t:"Escala de progreso",d:"Herramienta de seguimiento visual del avance",c:"Seguimiento",contenido:`ESCALA DE PROGRESO TERAPEUTICO\n\nPaciente: _______________\nPeriodo: _______________\n\nOBJETIVO 1: _______________\nProgreso: [ ]10% [ ]25% [ ]50% [ ]75% [ ]100%\nObservaciones: _______________\n\nOBJETIVO 2: _______________\nProgreso: [ ]10% [ ]25% [ ]50% [ ]75% [ ]100%\nObservaciones: _______________\n\nOBJETIVO 3: _______________\nProgreso: [ ]10% [ ]25% [ ]50% [ ]75% [ ]100%\nObservaciones: _______________\n\nFirma del profesional: _______________\nHadrion - hadrion.netlify.app`},
    {i:"🏠",t:"Guia actividades en casa",d:"Manual para familias con actividades diarias",c:"Familia",contenido:`GUIA DE ESTIMULACION EN CASA\n\nQUERIDAS FAMILIAS:\nEstas actividades son para hacer durante el dia, de forma natural y divertida.\n\nDURANTE EL BANO\n- Nombrar partes del cuerpo\n- Cantar canciones con gestos\n\nEN LA COCINA\n- Nombrar ingredientes y colores\n- Describir lo que hacemos\n\nEN EL AUTO\n- Buscar letras en carteles\n- Contar objetos de un color\n\nANTES DE DORMIR\n- Leer un cuento de 5 minutos\n- Preguntar: que paso en el cuento?\n\nContacto: comunipro12@gmail.com\nHadrion - hadrion.netlify.app`},
    {i:"🔤",t:"Laminas fonologicas",d:"Imagenes clasificadas por fonema",c:"Fonologia",contenido:`LAMINAS FONOLOGICAS\n\nVer seccion Conciencia Fonologica en la app para acceder a las laminas interactivas con audio.\n\nPara laminas imprimibles visitar:\nhadrion.netlify.app/laminas.html\n\nContenido disponible:\n- Fonema /A/: Avion, Arbol, Araña, Abeja\n- Fonema /S/: Sol, Silla, Sopa, Sapo\n- Fonema /M/: Mariposa, Mesa, Manzana\n- Fonema /P/: Pato, Pelota, Perro, Piano\n- Y todos los fonemas del castellano\n\nHadrion - hadrion.netlify.app`},
    {i:"📝",t:"Registro de sesion",d:"Plantilla editable para documentar sesiones",c:"Administracion",contenido:`REGISTRO DE SESION\n\nPaciente: _______________\nFecha: _______________\nSesion N: _____\nProfesional: _______________\n\nOBJETIVO TRABAJADO\n________________________________\n\nACTIVIDADES REALIZADAS\n1. _______________\n2. _______________\n3. _______________\n\nOBSERVACIONES\n________________________________\n________________________________\n\nPROGRESO (0-100%): _____\n\nTAREA PARA CASA\n________________________________\n\nPROXIMA SESION\nFecha: _______________ Hora: _______________\n\nFirma: _______________\nHadrion - hadrion.netlify.app`},
    {i:"📬",t:"Carta para escuela",d:"Modelo de comunicacion para derivaciones",c:"Derivacion",contenido:`INFORME PARA ESTABLECIMIENTO EDUCATIVO\n\nFecha: _______________\n\nSr/Sra Director/a:\n\nMe dirijo a usted para informar que el/la alumno/a _______________,\nque concurre a _____________ grado, se encuentra actualmente en\ntratamiento de _____________ desde _______________.\n\nSe sugiere:\n- _______________\n- _______________\n- _______________\n\nQuedo a su disposicion para ampliar informacion.\n\nAtentamente,\n_______________\nMatricula N: _______________\nTelefono: _______________\nEmail: _______________\n\nHadrion - hadrion.netlify.app`},
    {i:"💡",t:"Estrategias TDAH",d:"Recomendaciones para docentes y familia",c:"TDAH",contenido:`ESTRATEGIAS PARA TDAH\n\nPARA EL AULA\n- Ubicar al alumno cerca del docente\n- Dar instrucciones cortas y claras\n- Dividir tareas largas en pasos\n- Usar senales visuales de apoyo\n- Dar tiempo extra en evaluaciones\n\nPARA LA FAMILIA\n- Rutinas fijas y predecibles\n- Espacio de estudio sin distractores\n- Descansos cada 20 minutos\n- Reforzar positivamente los logros\n- Usar agenda visual con pictogramas\n\nESTRATEGIAS DE AUTORREGULACION\n- Semaforo de emociones\n- Respiracion consciente\n- Tiempo fuera positivo\n\nContacto: comunipro12@gmail.com\nHadrion - hadrion.netlify.app`},
  ];
  return(
    <div className="fu">
      <div style={{marginBottom:14}}><div className="pt">Recursos</div><div className="ps">Guias, plantillas y materiales</div></div>
      <div className="alert alrti">Toca cualquier recurso para ver el contenido completo e imprimirlo.</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {recursos.map((r,i)=>(
          <div key={i} className="card" style={{cursor:"pointer",padding:12}} onClick={()=>setSel(r)}>
            <div style={{fontSize:26,marginBottom:6}}>{r.i}</div>
            <div style={{fontWeight:700,fontSize:12,color:C.charcoal,marginBottom:3}}>{r.t}</div>
            <div style={{fontSize:11,color:C.grayL,marginBottom:7}}>{r.d}</div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <span className="badge" style={{background:C.terraF,color:C.terra,fontSize:10}}>{r.c}</span>
              <span style={{fontSize:10,color:C.info}}>ver contenido</span>
            </div>
          </div>
        ))}
      </div>
      {sel&&(
        <div className="overlay" onClick={()=>setSel(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <button className="xbtn" onClick={()=>setSel(null)}>x</button>
            <div className="modalt">{sel.i} {sel.t}</div>
            <div style={{background:C.cream,borderRadius:12,padding:14,marginBottom:12,whiteSpace:"pre-wrap",fontSize:12,color:C.charcoal,lineHeight:1.7,maxHeight:"50vh",overflowY:"auto"}}>{sel.contenido.replace(/\\n/g,"\n")}</div>
            <button className="btn btnp btnfull noprint" onClick={()=>window.print()}>Imprimir / PDF</button>
          </div>
        </div>
      )}
    </div>
  );
}


function Admin({users,setUsers,registerRequests,setRegisterRequests}){
  const [tab,setTab]=useState("solicitudes");
  const pendientes=registerRequests.filter(r=>r.status==="pendiente");
  const [showNew,setShowNew]=useState(false);
  const [f,setF]=useState({name:"",email:"",password:"",role:"profesional",specialty:"",plan:"Basico"});
  const add=()=>{
    if(!f.name||!f.email||!f.password)return;
    const init=f.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
    const cols=[C.terra,C.sage,C.purple,C.info,C.gold];
    setUsers([...users,{id:Date.now(),name:f.name,email:f.email,password:f.password,role:f.role,specialty:f.specialty,plan:f.plan,status:"active",createdAt:new Date().toLocaleDateString("es-UY"),avatar:init,color:cols[users.length%cols.length],lastLogin:"—"}]);
    setF({name:"",email:"",password:"",role:"profesional",specialty:"",plan:"Basico"});setShowNew(false);
  };
  const chgStatus=(id,s)=>setUsers(users.map(u=>u.id===id?{...u,status:s}:u));
  const chgRole=(id,r)=>setUsers(users.map(u=>u.id===id?{...u,role:r}:u));
  const del=(id)=>setUsers(users.filter(u=>u.id!==id));
  const sIcon={active:"🟢",pending:"🟡",inactive:"⚪"};
  const sLabel={active:"Activo",pending:"Pendiente",inactive:"Inactivo"};
  return(
    <div className="fu">
      <div style={{marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:22}}>🔐</span><div className="pt">Administracion</div></div>
        <div className="ps">Gestion de usuarios, roles y seguridad</div>
      </div>
      <div className="atabrow">
        {[{k:"solicitudes",l:"📬 Solicitudes"},{k:"usuarios",l:"👥 Usuarios"},{k:"seguridad",l:"🛡️ Seguridad"},{k:"stats",l:"📊 Stats"},{k:"config",l:"⚙️ Config"}].map(t=>(
          <button key={t.k} className={`atab${tab===t.k?" active":""}`} onClick={()=>setTab(t.k)}>{t.l}</button>
        ))}
      </div>
      {tab==="solicitudes"&&(
        <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:13,color:C.grayL}}>{registerRequests.length} solicitudes recibidas - {pendientes.length} pendientes</div>
          </div>
          {registerRequests.length===0&&(
            <div style={{textAlign:"center",padding:"30px 0",color:C.grayL}}>
              <div style={{fontSize:36,marginBottom:8}}>📬</div>
              <div style={{fontWeight:600}}>Sin solicitudes aun</div>
              <div style={{fontSize:12,marginTop:4}}>Cuando alguien solicite acceso desde el formulario aparecera aqui</div>
            </div>
          )}
          {registerRequests.map((r,i)=>(
            <div key={r.id} className="sc" style={{marginBottom:10}}>
              <div className="sch">
                <div>
                  <div style={{fontWeight:700,fontSize:14,color:C.charcoal}}>{r.name}</div>
                  <div style={{fontSize:11,color:C.grayL}}>{r.email} - {r.date}</div>
                </div>
                <span className="badge" style={{background:r.status==="pendiente"?C.goldF:C.greenF,color:r.status==="pendiente"?C.gold:C.forest}}>{r.status}</span>
              </div>
              <div className="scb">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
                  {[["Especialidad",r.specialty||"—"],["Telefono",r.phone||"—"]].map(([l,v])=>(
                    <div key={l} style={{fontSize:11}}><span style={{color:C.grayL}}>{l}:</span> <span style={{fontWeight:600,color:C.charcoal}}>{v}</span></div>
                  ))}
                  {r.message&&<div style={{gridColumn:"1/-1",fontSize:12,color:C.grayL,fontStyle:"italic"}}>"{r.message}"</div>}
                </div>
                {r.status==="pendiente"&&(
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    <button className="btn btnp btnsm" onClick={()=>{
                      const init=r.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
                      const cols=[C.terra,C.sage,C.purple,C.info,C.gold];
                      const newUser={id:Date.now(),name:r.name,email:r.email,password:"hadrion123",role:"profesional",specialty:r.specialty,plan:"Basico",status:"active",createdAt:new Date().toLocaleDateString("es-UY"),avatar:init,color:cols[users.length%cols.length],lastLogin:"—"};
                      setUsers([...users,newUser]);
                      setRegisterRequests(registerRequests.map(req=>req.id===r.id?{...req,status:"aprobado"}:req));
                    }}>✅ Aprobar y crear usuario</button>
                    <button className="btn btnd btnsm" onClick={()=>setRegisterRequests(registerRequests.map(req=>req.id===r.id?{...req,status:"rechazado"}:req))}>❌ Rechazar</button>
                  </div>
                )}
                {r.status==="aprobado"&&(
                  <div className="alert alrts" style={{marginBottom:0}}>✅ Usuario creado - Contrasena inicial: hadrion123 - Enviala por email a {r.email}</div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
      {tab==="usuarios"&&(
        <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:13,color:C.grayL}}>{users.length} usuarios registrados</div>
            <button className="btn btnp btnsm" onClick={()=>setShowNew(true)}>+ Dar de alta</button>
          </div>
          <div className="alert alrtw">👑 Sos administrador. Gestionas usuarios, roles y accesos.</div>
          {users.map(u=>(
            <div key={u.id} className="sc" style={{marginBottom:10}}>
              <div className="sch">
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div className="av" style={{width:42,height:42,background:u.color,fontSize:14,borderRadius:12}}>{u.avatar}</div>
                  <div><div style={{fontWeight:700,fontSize:13,color:C.charcoal}}>{u.name}</div><div style={{fontSize:11,color:C.grayL}}>{u.email}</div></div>
                </div>
                <div style={{display:"flex",gap:5,alignItems:"center"}}>
                  <span className={`roletag ${u.role==="admin"?"radmin":"rpro"}`}>{u.role==="admin"?"👑 Admin":"Pro"}</span>
                  <span style={{fontSize:14}}>{sIcon[u.status]}</span>
                </div>
              </div>
              <div className="scb">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:10}}>
                  {[["Especialidad",u.specialty||"—"],["Plan",u.plan],["Estado",sLabel[u.status]],["Ultimo acceso",u.lastLogin],["Alta",u.createdAt]].map(([l,v])=>(
                    <div key={l} style={{fontSize:11}}><span style={{color:C.grayL}}>{l}:</span> <span style={{fontWeight:600,color:C.charcoal}}>{v}</span></div>
                  ))}
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {u.status==="pending"&&<button className="btn btnp btnsm" onClick={()=>chgStatus(u.id,"active")}>✅ Aprobar</button>}
                  {u.status==="active"&&<button className="btn btng btnsm" onClick={()=>chgStatus(u.id,"inactive")}>⏸️ Suspender</button>}
                  {u.status==="inactive"&&<button className="btn btno btnsm" onClick={()=>chgStatus(u.id,"active")}>▶️ Reactivar</button>}
                  {u.role!=="admin"?<button className="btn btngold btnsm" onClick={()=>chgRole(u.id,"admin")}>👑 Hacer admin</button>:<button className="btn btng btnsm" onClick={()=>chgRole(u.id,"profesional")}>↓ Quitar admin</button>}
                  <button className="btn btnd btnsm" onClick={()=>del(u.id)}>🗑️ Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      {tab==="seguridad"&&(
        <>
          <SC title="🛡️ Politicas de seguridad">
            {[["Autenticacion","Email + contrasena","✅"],["Sesiones","Cierre por inactividad","✅"],["Datos","Encriptacion en transito","✅"],["Roles","Control de acceso RBAC","✅"],["Auditoria","Registro de acciones","🔄"],["2FA","Dos factores","🔜"]].map(([n,d,s])=>(
              <div key={n} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${C.sand}`}}>
                <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,color:C.charcoal}}>{n}</div><div style={{fontSize:11,color:C.grayL}}>{d}</div></div>
                <span style={{fontSize:18}}>{s}</span>
              </div>
            ))}
          </SC>
          <SC title="📋 Permisos por rol">
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",fontSize:12,borderCollapse:"collapse"}}>
                <thead><tr>{["Funcion","Admin","Profesional"].map(h=><th key={h} style={{padding:"6px 8px",background:C.cream,color:C.grayL,fontWeight:700,textAlign:"left",borderBottom:`1px solid ${C.sand}`}}>{h}</th>)}</tr></thead>
                <tbody>
                  {[["Ver todos los pacientes","✅","Solo propios"],["Registrar sesiones","✅","✅"],["Registrar pagos","✅","✅"],["Ver reportes globales","✅","Propios"],["Gestionar usuarios","✅","❌"],["Cambiar roles","✅","❌"],["Dar de alta usuarios","✅","❌"],["Configuracion global","✅","❌"]].map(([fn,...vs])=>(
                    <tr key={fn}><td style={{padding:"7px 8px",borderBottom:`1px solid ${C.sand}`,color:C.charcoal}}>{fn}</td>{vs.map((v,i)=><td key={i} style={{padding:"7px 8px",borderBottom:`1px solid ${C.sand}`,color:v==="✅"?C.forest:v==="❌"?C.danger:C.info,fontWeight:600}}>{v}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SC>
        </>
      )}
      {tab==="stats"&&(
        <>
          <div className="sgrid">
            <div className="sc2"><div className="snum">{users.length}</div><div className="slbl">Usuarios</div></div>
            <div className="sc2"><div className="snum">{users.filter(u=>u.status==="active").length}</div><div className="slbl">Activos</div></div>
            <div className="sc2"><div className="snum">{users.filter(u=>u.role==="admin").length}</div><div className="slbl">Admins</div></div>
            <div className="sc2"><div className="snum">{users.filter(u=>u.status==="pending").length}</div><div className="slbl">Pendientes</div></div>
          </div>
          <SC title="📊 Por plan">
            {["Pro","Basico"].map(plan=>{const n=users.filter(u=>u.plan===plan).length;return(
              <div key={plan} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${C.sand}`}}>
                <div style={{flex:1,fontWeight:500,fontSize:13}}>{plan}</div>
                <div className="prog" style={{width:90}}><div className="progf" style={{width:`${(n/users.length)*100}%`}}/></div>
                <div style={{fontWeight:700,color:C.terra,minWidth:20}}>{n}</div>
              </div>
            );})}
          </SC>
        </>
      )}
      {tab==="config"&&(
        <SC title="⚙️ Configuracion">
          {[["Nombre","Hadrion"],["Plan","Pro — Ilimitado"],["Region","Uruguay"],["Idioma","Espanol"],["Zona horaria","GMT-3"]].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.sand}`}}>
              <span style={{fontSize:13,color:C.gray}}>{l}</span>
              <span style={{fontSize:13,fontWeight:600,color:C.charcoal}}>{v}</span>
            </div>
          ))}
          <div className="alert alrti" style={{marginTop:12}}>⚙️ En produccion permite editar configuracion global.</div>
        </SC>
      )}
      {showNew&&(
        <Modal title="Dar de alta usuario" onClose={()=>setShowNew(false)}>
          <div className="alert alrtw">📧 Completa los datos y luego envia las credenciales por WhatsApp o email.</div>
          {[["Nombre completo","name","text","Nombre y apellido"],["Email","email","email","profesional@mail.com"],["Contrasena inicial","password","text","Contrasena temporal"],["Especialidad","specialty","text","Fonoaudiologa, Psicopedagoga..."]].map(([l,k,t,ph])=>(
            <div className="fg" key={k}><label className="lbl">{l}</label><input className="inp" type={t} placeholder={ph} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}/></div>
          ))}
          <div className="fg"><label className="lbl">Telefono (para WhatsApp)</label><input className="inp" type="tel" placeholder="(+598) 9..." value={f.phone||""} onChange={e=>setF({...f,phone:e.target.value})}/></div>
          <div className="fg"><label className="lbl">Rol</label>
            <select className="inp" value={f.role} onChange={e=>setF({...f,role:e.target.value})}>
              <option value="profesional">Profesional</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div className="fg"><label className="lbl">Plan</label>
            <select className="inp" value={f.plan} onChange={e=>setF({...f,plan:e.target.value})}>
              <option value="Basico">Basico</option>
              <option value="Pro">Pro</option>
            </select>
          </div>
          <button className="btn btnp btnfull" onClick={add}>✅ Crear usuario</button>
          {f.name&&f.email&&f.password&&(
            <div style={{marginTop:12}}>
              <div style={{fontSize:11,color:C.grayL,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>Enviar credenciales</div>
              <div style={{background:C.cream,borderRadius:10,padding:"10px 12px",marginBottom:8,fontSize:12,color:C.charcoal,lineHeight:1.6}}>
                <div style={{fontWeight:600,marginBottom:4}}>Mensaje a enviar:</div>
                Hola {f.name.split(" ")[0]}! Te doy acceso a Hadrion, tu plataforma clinica.<br/>
                🔗 hadrion.netlify.app<br/>
                📧 Email: {f.email}<br/>
                🔑 Contrasena: {f.password}<br/>
                Plan: {f.plan} | 14 dias de prueba incluidos.<br/>
                Cualquier consulta escribime. Bienvenida/o!
              </div>
              <div style={{display:"flex",gap:8}}>
                <button className="btn btnsm" style={{background:"#25D366",color:"white",flex:1,justifyContent:"center"}} onClick={()=>{
                  const msg=encodeURIComponent(`Hola ${f.name.split(" ")[0]}! Te doy acceso a Hadrion, tu plataforma clinica.\n🔗 hadrion.netlify.app\n📧 Email: ${f.email}\n🔑 Contrasena: ${f.password}\nPlan: ${f.plan} - 14 dias de prueba incluidos.\nCualquier consulta escribime!`);
                  const phone=f.phone?f.phone.replace(/\D/g,""):"";
                  window.open(`https://wa.me/${phone}?text=${msg}`,"_blank");
                }}>
                  📱 Enviar por WhatsApp
                </button>
                <button className="btn btnsm" style={{background:C.info,color:"white",flex:1,justifyContent:"center"}} onClick={()=>{
                  const subject=encodeURIComponent("Acceso a Hadrion - Plataforma Clinica");
                  const body=encodeURIComponent(`Hola ${f.name}!\n\nTe doy acceso a Hadrion, tu plataforma clinica terapeutica.\n\nDatos de acceso:\nURL: https://hadrion.netlify.app\nEmail: ${f.email}\nContrasena: ${f.password}\nPlan: ${f.plan}\n\nTenes 14 dias de prueba gratuitos incluidos.\n\nCualquier consulta escribime a comunipro12@gmail.com\n\nBienvenida/o!\nAdriana Soba`);
                  window.open(`mailto:${f.email}?subject=${subject}&body=${body}`);
                }}>
                  ✉️ Enviar por Email
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

function Profile({user,onLogout}){
  const [ed,setEd]=useState(false);
  return(
    <div className="fu">
      <div style={{marginBottom:14}}><div className="pt">Mi Perfil</div><div className="ps">Configuracion de tu cuenta</div></div>
      <div style={{background:"white",borderRadius:18,padding:20,boxShadow:"0 1px 8px rgba(0,0,0,.06)",marginBottom:14,textAlign:"center"}}>
        <div className="av" style={{width:68,height:68,background:user.color,fontSize:24,margin:"0 auto 12px",borderRadius:20}}>{user.avatar}</div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:C.charcoal}}>{user.name}</div>
        <div style={{fontSize:13,color:C.grayL,marginTop:2}}>{user.specialty}</div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:10}}>
          <span className={`roletag ${user.role==="admin"?"radmin":"rpro"}`}>{user.role==="admin"?"👑 Admin":"Profesional"}</span>
          <span className="badge" style={{background:C.goldF,color:C.gold}}>{user.plan}</span>
        </div>
      </div>
      <SC title="📋 Datos" action={<button className="btn btno btnsm" onClick={()=>setEd(!ed)}>{ed?"Cancelar":"✏️ Editar"}</button>}>
        {!ed?[["Nombre",user.name],["Email",user.email],["Especialidad",user.specialty],["Rol",user.role==="admin"?"Administrador":"Profesional"],["Plan",user.plan],["Ultimo acceso",user.lastLogin],["Desde",user.createdAt]].map(([l,v])=>(
          <div key={l} className="hxf"><div className="hxl">{l}</div><div className="hxv">{v}</div></div>
        )):<>
          {[["Nombre","name","text"],["Especialidad","specialty","text"],["Email","email","email"]].map(([l,k,t])=>(
            <div className="fg" key={k}><label className="lbl">{l}</label><input className="inp" type={t} defaultValue={user[k]}/></div>
          ))}
          <button className="btn btnp btnfull" onClick={()=>setEd(false)}>Guardar cambios</button>
        </>}
      </SC>
      <SC title="🔒 Seguridad">
        <div className="fg"><label className="lbl">Nueva contrasena</label><input className="inp" type="password" placeholder="Nueva contrasena"/></div>
        <div className="fg"><label className="lbl">Confirmar</label><input className="inp" type="password" placeholder="Confirmar"/></div>
        <button className="btn btno btnfull">Cambiar contrasena</button>
      </SC>
      <button className="btn btnd btnfull" style={{marginTop:8}} onClick={onLogout}>🚪 Cerrar sesion</button>
    </div>
  );
}


function Footer(){
  const showInfo=(msg)=>alert(msg);
  return(
    <div style={{textAlign:"center",padding:"16px 20px",fontSize:11,color:"#9B9590",borderTop:"1px solid #EDE0F5",marginTop:"auto"}}>
      <div style={{fontWeight:700,color:"#7B5EA7",marginBottom:4}}>Hadrion - Plataforma Terapeutica</div>
      <div>(c) 2025 Adriana Soba. Todos los derechos reservados.</div>
      <div style={{marginTop:3}}>Desarrollado y disenado en Uruguay</div>
      <div style={{marginTop:3}}>Propiedad intelectual protegida.</div>
      <div style={{marginTop:3}}>Prohibida su reproduccion total o parcial sin autorizacion expresa.</div>
      <div style={{marginTop:6,fontSize:10}}>
        <span style={{cursor:"pointer",color:"#9B7EBD"}} onClick={()=>showInfo("Terminos de Uso - Hadrion. Prohibido copiar, redistribuir o usar comercialmente sin licencia. Contacto: comunipro12@gmail.com")}>Terminos de uso</span>
        {" | "}
        <span style={{cursor:"pointer",color:"#9B7EBD"}} onClick={()=>showInfo("Privacidad - Hadrion protege los datos de profesionales y pacientes. No compartimos informacion con terceros. Contacto: comunipro12@gmail.com")}>Privacidad</span>
        {" | "}
        <span style={{cursor:"pointer",color:"#9B7EBD"}} onClick={()=>showInfo("Contacto - Hadrion Plataforma Terapeutica. Adriana Soba. comunipro12@gmail.com. Uruguay.")}>Contacto</span>
      </div>
    </div>
  );
}


export default function HadrionApp(){
  const [users,setUsers]=useState(INIT_USERS);
  const [user,setUser]=useState(null);
  const [active,setActive]=useState("dashboard");
  const [patients,setPatients]=useState(INIT_PATIENTS);
  const [sessions,setSessions]=useState(INIT_SESSIONS);
  const [payments,setPayments]=useState(INIT_PAYMENTS);
  const [selPatId,setSelPatId]=useState(null);
  const [plan,setPlan]=useState(INIT_PLAN);
  const [showQS,setShowQS]=useState(false);
  const [registerRequests,setRegisterRequests]=useState([]);

  const handleRegisterRequest=(form)=>{
    setRegisterRequests(prev=>[...prev,{id:Date.now(),date:new Date().toLocaleDateString("es-UY"),...form,status:"pendiente"}]);
  };
  const [qsF,setQsF]=useState({patientId:"",note:""});
  const logout=()=>{setUser(null);setActive("dashboard");};
  const saveQS=()=>{
    if(!qsF.patientId||!qsF.note)return;
    const p=patients.find(x=>x.id===parseInt(qsF.patientId));
    setSessions([{id:Date.now(),patientId:parseInt(qsF.patientId),patient:p?.name||"",date:new Date().toLocaleDateString("es-UY"),objective:"Sesion rapida",note:qsF.note,progress:50,activities:[],homework:"",estado:"",atencion:"",participacion:"",sensorial:[]},...sessions]);
    setQsF({patientId:"",note:""});setShowQS(false);
  };
  const pages={
    dashboard:<Dashboard user={user} patients={patients} sessions={sessions} payments={payments} setActive={setActive} setShowQS={setShowQS}/>,
    agenda:<Agenda patients={patients}/>,
    patients:<Patients patients={patients} setPatients={setPatients} setActive={setActive} setSelPatId={setSelPatId} sessions={sessions}/>,
    payments:<Payments patients={patients} payments={payments} setPayments={setPayments}/>,
    sessions:<Sessions patients={patients} sessions={sessions} setSessions={setSessions}/>,
    history:<History patients={patients} sessions={sessions} selectedPatientId={selPatId}/>,
    objectives:<Activities/>,
    activities:<Activities/>,
    phonology:<Phonology/>,
    reports:<Reports patients={patients} sessions={sessions} payments={payments}/>,
    plan:<PlanColaborativo patients={patients} users={users} plan={plan} setPlan={setPlan}/>,
    resources:<Resources/>,
    admin:user?.role==="admin"?<Admin users={users} setUsers={setUsers} registerRequests={registerRequests} setRegisterRequests={setRegisterRequests}/>:<div className="fu"><div className="alert alrtd">🔐 Solo administradores.</div></div>,
    profile:<Profile user={user} onLogout={logout}/>,
  };
  const bnItems=[
    {id:"dashboard",l:"Panel",i:"🏠"},
    {id:"patients",l:"Pacientes",i:"👥"},
    {id:"agenda",l:"Agenda",i:"📅"},
    {id:"sessions",l:"Clinico",i:"📝"},
    {id:user?.role==="admin"?"admin":"profile",l:user?.role==="admin"?"Admin":"Perfil",i:user?.role==="admin"?"🔐":"👤"},
  ];
  if(!user)return(<><style>{CSS}</style><Login onLogin={setUser} users={users} onRegisterRequest={handleRegisterRequest}/></>);
  return(
    <>
      <style>{CSS}</style>
      <div className="app">
        <Sidebar active={active} setActive={setActive} user={user}/>
        <div className="mwrap">
          <div className="tbar">
            <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",paddingBottom:6}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:600,color:C.charcoal}}>{user.name.split(" ")[0]}</div><div style={{fontSize:10,color:C.grayL}}>{user.role==="admin"?"👑 Admin":"Profesional"}</div></div>
                <div onClick={()=>setActive("profile")} style={{width:36,height:36,borderRadius:10,background:user.color,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:700,fontSize:13,cursor:"pointer"}}>{user.avatar}</div>
              </div>
            </div>
          </div>
          <div className="pbody">{pages[active]||pages.dashboard}</div>
          <Footer/>
        </div>
        <nav className="bnav noprint">
          {bnItems.map(n=><button key={n.id} className={`bn${active===n.id?" active":""}`} onClick={()=>setActive(n.id)}><span className="bnicon">{n.i}</span>{n.l}</button>)}
        </nav>
      </div>
      {showQS&&(
        <Modal title="⚡ Sesion rapida" onClose={()=>setShowQS(false)}>
          <div className="alert alrti">Registra una sesion agil sin seleccionar objetivos.</div>
          <div className="fg"><label className="lbl">Paciente</label>
            <select className="inp" value={qsF.patientId} onChange={e=>setQsF({...qsF,patientId:e.target.value})}>
              <option value="">Selecciona...</option>
              {patients.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="fg"><label className="lbl">Nota rapida</label><textarea className="inp" placeholder="Como fue la sesion?" value={qsF.note} onChange={e=>setQsF({...qsF,note:e.target.value})}/></div>
          <button className="btn btnp btnfull" onClick={saveQS}>Guardar sesion rapida</button>
        </Modal>
      )}
    </>
  );
}
