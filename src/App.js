import { useState } from "react";

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
  {id:1,name:"Jacqueline Marquez",email:"comunipro12@gmail.com",password:"admin123",role:"admin",specialty:"Fonoaudiologa",plan:"Pro",status:"active",createdAt:"01/01/2025",avatar:"JM",color:C.terra,lastLogin:"Hoy 08:30"},
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
  {id:1,name:"Conciencia fonologica con rimas",category:"Lenguaje",target:"TEL",type:"Clinica",age:"4-8",description:"Identificar y producir rimas con imagenes de apoyo visual y auditivo.",materials:"Tarjetas ilustradas, grabador de voz",printable:true},
  {id:2,name:"Ruleta de silabas",category:"Lectoescritura",target:"Dislexia",type:"Clinica",age:"6-10",description:"Combinar silabas para formar palabras conocidas.",materials:"Ruleta imprimible, fichas de silabas",printable:true},
  {id:3,name:"Cuento motor en familia",category:"Lenguaje",target:"TEL",type:"Familia",age:"3-7",description:"Narrar un cuento con movimientos y onomatopeyas.",materials:"Cuento ilustrado",printable:true},
  {id:4,name:"Semaforo de emociones",category:"Regulacion",target:"TDAH",type:"Clinica",age:"5-10",description:"Reconocer y regular estados emocionales con colores.",materials:"Lamina de semaforo, tarjetas",printable:true},
  {id:5,name:"Lectura compartida 10 min",category:"Lectoescritura",target:"Dislexia",type:"Familia",age:"6-12",description:"Lectura en voz alta turno a turno con adulto.",materials:"Libro nivel lector, senalador",printable:false},
  {id:6,name:"Secuencias narrativas",category:"Lenguaje",target:"TEL",type:"Clinica",age:"5-9",description:"Ordenar y contar historias con imagenes secuenciadas.",materials:"Vinetas secuenciadas",printable:true},
  {id:7,name:"Praxias bucofonatorias",category:"Articulacion",target:"Disartria",type:"Clinica",age:"4-12",description:"Ejercicios de movilidad labial, lingual y mandibular.",materials:"Espejo, lamina de praxias",printable:true},
  {id:8,name:"Juego del sonido perdido",category:"Fonologia",target:"TEL",type:"Clinica",age:"4-7",description:"Identificar que sonido falta en una palabra.",materials:"Tarjetas impresas, audio",printable:true},
];

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
        <div className="slogoicon">N</div>
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

function Login({onLogin,users}){
  const [f,setF]=useState({email:"",pass:"",show:false});
  const [err,setErr]=useState("");
  const [forgot,setForgot]=useState(false);
  const login=()=>{
    if(!f.email||!f.pass){setErr("Completa todos los campos.");return;}
    const u=users.find(u=>u.email===f.email&&u.password===f.pass);
    if(!u){setErr("Email o contrasena incorrectos.");return;}
    if(u.status==="inactive"){setErr("Tu cuenta esta inactiva. Contacta al administrador.");return;}
    if(u.status==="pending"){setErr("Tu cuenta esta pendiente de aprobacion.");return;}
    onLogin(u);
  };
  return(
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${C.terraF} 0%,${C.cream} 55%,${C.sageF} 100%)`,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"white",borderRadius:24,padding:"36px 26px",width:"100%",maxWidth:400,boxShadow:"0 8px 40px rgba(0,0,0,.12)"}}>
        <div style={{textAlign:"center",marginBottom:26}}>
          <div style={{width:62,height:62,background:C.terra,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 13px",fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:700,color:"white"}}>N</div>
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
          <div style={{marginTop:18,background:C.terraF,borderRadius:12,padding:"10px 13px",fontSize:11,color:C.terra,textAlign:"center"}}>🧠 Tu consultorio digital, desde Uruguay para el mundo.</div>
          <div style={{marginTop:12,background:C.cream,borderRadius:10,padding:"10px 12px"}}>
            <div style={{fontSize:10,color:C.grayL,fontWeight:700,marginBottom:5,textTransform:"uppercase"}}>Accesos de prueba</div>
            {[{e:"comunipro12@gmail.com",p:"admin123",r:"👑 Admin"},{e:"ana@clinica.cl",p:"123456",r:"Profesional"}].map(d=>(
              <div key={d.e} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${C.sand}`,fontSize:11}}>
                <span style={{color:C.charcoal}}>{d.e}</span><span style={{fontWeight:700,color:C.terra}}>{d.r}</span>
              </div>
            ))}
            <div style={{fontSize:10,color:C.grayL,marginTop:3}}>Pass: admin123 / 123456</div>
          </div>
        </>:<>
          <div style={{fontSize:17,fontWeight:700,color:C.charcoal,marginBottom:6}}>Recuperar acceso</div>
          <div style={{fontSize:13,color:C.grayL,marginBottom:14}}>Ingresa tu email y te enviaremos un enlace de recuperacion.</div>
          <div className="fg"><input className="inp" type="email" placeholder="comunipro12@gmail.com" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/></div>
          <div className="alert alrts">✉️ En produccion real se enviaria email de recuperacion.</div>
          <button className="btn btnp btnfull" onClick={()=>setForgot(false)}>← Volver</button>
        </>}
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

function Agenda({patients}){
  const [items,setItems]=useState([
    {id:1,patient:"Valentina Lopez",time:"09:00",end:"09:45",type:"Sesion",day:"Hoy",color:C.terra},
    {id:2,patient:"Martin Garcia",time:"10:00",end:"10:45",type:"Evaluacion",day:"Hoy",color:C.sage},
    {id:3,patient:"Sofia Ramirez",time:"11:30",end:"12:15",type:"Sesion",day:"Hoy",color:C.purple},
    {id:4,patient:"Tomas Herrera",time:"09:00",end:"09:45",type:"Sesion",day:"Manana",color:C.info},
  ]);
  const [showNew,setShowNew]=useState(false);
  const [f,setF]=useState({patient:"",time:"",type:"Sesion",day:"Hoy"});
  const save=()=>{
    if(!f.patient||!f.time)return;
    const p=patients.find(x=>x.name===f.patient);
    setItems([...items,{id:Date.now(),patient:f.patient,time:f.time,end:f.time,type:f.type,day:f.day,color:p?.color||C.terra}]);
    setF({patient:"",time:"",type:"Sesion",day:"Hoy"});setShowNew(false);
  };
  return(
    <div className="fu">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <div><div className="pt">Agenda</div><div className="ps">Citas y turnos</div></div>
        <button className="btn btnp btnsm noprint" onClick={()=>setShowNew(true)}>+ Nuevo turno</button>
      </div>
      {["Hoy","Manana"].map(day=>(
        <div key={day}>
          <div className="dayl">{day}</div>
          {items.filter(a=>a.day===day).map(a=>(
            <div key={a.id} className="card" style={{marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:9,height:9,borderRadius:"50%",background:a.color,flexShrink:0}}/>
                <div style={{fontWeight:700,fontSize:14,color:C.charcoal,minWidth:48}}>{a.time}</div>
                <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{a.patient}</div><div style={{fontSize:11,color:C.grayL}}>{a.type} - hasta {a.end}</div></div>
                <span className="badge" style={{background:a.color+"22",color:a.color,fontSize:10}}>{a.type}</span>
              </div>
            </div>
          ))}
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
                    {[["Paciente",patient.name],["Edad",`${patient.age} anos`],["Diagnostico",patient.diagnosis],["Sesiones",patient.sessions],["Profesional","Jacqueline Marquez"],["Especialidad","Fonoaudiologia"]].map(([l,v])=>(
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
  const [sel,setSel]=useState(null);
  const tC={Clinica:{bg:C.sageF,c:C.forest},Familia:{bg:C.terraF,c:C.terra}};
  const filtered=ACTIVITIES_DB.filter(a=>fil==="all"||a.type===fil||a.target===fil||a.category===fil);
  return(
    <div className="fu">
      <div style={{marginBottom:14}}><div className="pt">Banco de Actividades</div><div className="ps">Recursos terapeuticos listos para usar</div></div>
      <div className="filrow">{["all","Clinica","Familia","Lenguaje","Lectoescritura","Fonologia","Articulacion","Regulacion","TEL","Dislexia","TDAH","Disartria"].map(f=>(
        <button key={f} className={`filbtn${fil===f?" active":""}`} onClick={()=>setFil(f)}>{f==="all"?"Todas":f}</button>
      ))}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {filtered.map(a=>(
          <div key={a.id} className="card" style={{cursor:"pointer",padding:12}} onClick={()=>setSel(a)}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span className="badge" style={{background:tC[a.type]?.bg,color:tC[a.type]?.c,fontSize:10}}>{a.type}</span>
              {a.printable&&<span style={{fontSize:10,color:C.info}}>🖨️</span>}
            </div>
            <div style={{fontWeight:700,fontSize:12,color:C.charcoal,marginBottom:3}}>{a.name}</div>
            <div style={{fontSize:11,color:C.grayL}}>{a.category} - {a.target}</div>
          </div>
        ))}
      </div>
      {sel&&(
        <Modal title={sel.name} onClose={()=>setSel(null)}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
            <span className="badge" style={{background:tC[sel.type]?.bg,color:tC[sel.type]?.c}}>{sel.type}</span>
            <span className="badge" style={{background:C.terraF,color:C.terra}}>{sel.target}</span>
            <span className="badge" style={{background:C.sand,color:C.gray}}>{sel.age} anos</span>
          </div>
          <div className="hxf"><div className="hxl">📝 Descripcion</div><div className="hxv">{sel.description}</div></div>
          <div className="hxf"><div className="hxl">🧰 Materiales</div><div className="hxv">{sel.materials}</div></div>
          {sel.printable&&<button className="btn btno btnfull noprint" onClick={()=>window.print()}>🖨️ Imprimir actividad</button>}
        </Modal>
      )}
    </div>
  );
}

function Phonology(){
  const [sel,setSel]=useState(null);
  const [stage,setStage]=useState("Escucha");
  const [score,setScore]=useState(0);
  const [fil,setFil]=useState("Todas");
  const stages=["Escucha","Imagen","Letra","Silaba","Segmentacion","Fusion","Manipulacion"];
  const cats={Vocales:["A","E","I","O","U"],Consonantes:PHONEMES.filter(p=>!["A","E","I","O","U"].includes(p)),Todas:PHONEMES};
  const speak=ph=>{if(window.speechSynthesis){const u=new SpeechSynthesisUtterance(ph.toLowerCase());u.lang="es-UY";u.rate=0.7;window.speechSynthesis.speak(u);}};
  const handle=ph=>{setSel(ph);speak(ph);setScore(s=>s+1);};
  return(
    <div className="fu">
      <div style={{marginBottom:14}}><div className="pt">Conciencia Fonologica</div><div className="ps">7 niveles progresivos con audio</div></div>
      <SC title="Etapa del ejercicio">
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{stages.map(s=><button key={s} className={`filbtn${stage===s?" active":""}`} onClick={()=>setStage(s)}>{s}</button>)}</div>
      </SC>
      <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
        {Object.keys(cats).map(c=><button key={c} className={`filbtn${fil===c?" active":""}`} onClick={()=>setFil(c)}>{c}</button>)}
        <div style={{marginLeft:"auto",background:C.terraF,borderRadius:10,padding:"6px 12px",fontSize:13,fontWeight:700,color:C.terra}}>⭐ {score}</div>
      </div>
      {sel&&(
        <div style={{background:C.terraF,borderRadius:16,padding:"18px",textAlign:"center",marginBottom:12,border:`2px solid ${C.terraL}`}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:80,fontWeight:700,color:C.terra,lineHeight:1}}>{sel}</div>
          <div style={{fontSize:13,color:C.terraD,marginTop:5}}>Etapa: {stage}</div>
          <button className="btn btnp" style={{marginTop:10}} onClick={()=>speak(sel)}>🔊 Escuchar</button>
        </div>
      )}
      <div className="phgrid">{(cats[fil]||PHONEMES).map(ph=><button key={ph} className={`phbtn${sel===ph?" sel":""}`} onClick={()=>handle(ph)}>{ph}</button>)}</div>
      <SC title="🎮 Juegos Fonologicos">
        {[["🎯","Atrapa el sonido","Identifica el fonema entre 3 opciones"],["❓","Donde esta?","Encontra la imagen que empieza con ese sonido"],["🃏","Parejas","Unir fonemas con sus imagenes"]].map(([i,n,d])=>(
          <div key={n} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:`1px solid ${C.sand}`}}>
            <div style={{fontSize:22}}>{i}</div>
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
  const items=[{i:"📋",t:"Plantilla de anamnesis",d:"Formulario completo inicial",c:"Evaluacion"},{i:"🎯",t:"Guia de objetivos TEL",d:"Objetivos por nivel TEL",c:"Lenguaje"},{i:"📊",t:"Escala de progreso",d:"Seguimiento visual del avance",c:"Seguimiento"},{i:"🏠",t:"Guia actividades en casa",d:"Manual para familias",c:"Familia"},{i:"🔤",t:"Laminas fonologicas",d:"Imagenes por fonema",c:"Fonologia"},{i:"📝",t:"Registro de sesion",d:"Plantilla editable",c:"Administracion"},{i:"📬",t:"Carta para escuela",d:"Modelo de comunicacion",c:"Derivacion"},{i:"💡",t:"Estrategias TDAH",d:"Recomendaciones docentes",c:"TDAH"}];
  return(
    <div className="fu">
      <div style={{marginBottom:14}}><div className="pt">Recursos</div><div className="ps">Guias, plantillas y materiales</div></div>
      <div className="alert alrti">💡 Todos imprimibles o exportables en PDF.</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {items.map((r,i)=>(
          <div key={i} className="card" style={{cursor:"pointer",padding:12}} onClick={()=>window.print()}>
            <div style={{fontSize:26,marginBottom:6}}>{r.i}</div>
            <div style={{fontWeight:700,fontSize:12,color:C.charcoal,marginBottom:3}}>{r.t}</div>
            <div style={{fontSize:11,color:C.grayL,marginBottom:7}}>{r.d}</div>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <span className="badge" style={{background:C.terraF,color:C.terra,fontSize:10}}>{r.c}</span>
              <span style={{fontSize:10,color:C.info}}>🖨️</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanColaborativo({patients,users,plan,setPlan}){
  const [pid,setPid]=useState("");
  const [showNew,setShowNew]=useState(false);
  const [showArea,setShowArea]=useState(null);
  const [f,setF]=useState({area:"fono",professional:"",objectives:"",notes:"",progress:50});
  const patient=patients.find(p=>p.id===parseInt(pid));
  const pPlan=plan.filter(p=>p.patientId===parseInt(pid));

  const save=()=>{
    if(!pid||!f.professional)return;
    setPlan([...plan,{id:Date.now(),patientId:parseInt(pid),area:f.area,professional:f.professional,objectives:f.objectives?f.objectives.split(",").map(s=>s.trim()):[],progress:f.progress,lastUpdate:new Date().toLocaleDateString("es-UY"),notes:f.notes}]);
    setF({area:"fono",professional:"",objectives:"",notes:"",progress:50});
    setShowNew(false);
  };

  const getArea=(id)=>AREAS.find(a=>a.id===id)||AREAS[0];

  return(
    <div className="fu">
      <div style={{marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:22}}>🤝</span>
          <div className="pt">Plan Colaborativo</div>
        </div>
        <div className="ps">Objetivos por area - trabajo en equipo terapeutico</div>
      </div>

      <div className="alert alrti" style={{marginBottom:14}}>
        💡 Cada profesional registra sus objetivos y progreso. Todo el equipo ve el avance completo del paciente.
      </div>

      <div className="fg">
        <label className="lbl">Selecciona paciente</label>
        <select className="inp" value={pid} onChange={e=>setPid(e.target.value)}>
          <option value="">Elige un paciente...</option>
          {patients.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {patient&&(
        <>
          <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:14,background:"white",borderRadius:14,padding:13,boxShadow:"0 1px 6px rgba(0,0,0,.05)"}}>
            <div className="av" style={{width:46,height:46,background:patient.color,fontSize:15}}>{patient.avatar}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14,color:C.charcoal}}>{patient.name}</div>
              <div style={{fontSize:12,color:C.grayL}}>{patient.age} anos - {patient.diagnosis}</div>
            </div>
            <button className="btn btnp btnsm noprint" onClick={()=>setShowNew(true)}>+ Agregar area</button>
          </div>

          {/* Areas disponibles */}
          <div style={{fontWeight:700,fontSize:13,color:C.charcoal,marginBottom:10}}>Areas terapeuticas</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            {AREAS.filter(a=>a.id!=="otro").map(area=>{
              const aData=pPlan.find(p=>p.area===area.id);
              return(
                <div key={area.id} className="card" style={{padding:12,cursor:"pointer",borderLeft:`3px solid ${aData?area.color:C.sand}`}} onClick={()=>aData&&setShowArea(aData)}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                    <span style={{fontSize:20}}>{area.icon}</span>
                    <div style={{fontWeight:600,fontSize:12,color:C.charcoal}}>{area.label}</div>
                  </div>
                  {aData?(
                    <>
                      <div style={{fontSize:11,color:C.grayL,marginBottom:5}}>{aData.professional}</div>
                      <div className="prog"><div className="progf" style={{width:`${aData.progress}%`}}/></div>
                      <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                        <span style={{fontSize:10,color:C.grayL}}>{aData.lastUpdate}</span>
                        <span style={{fontSize:10,fontWeight:700,color:area.color}}>{aData.progress}%</span>
                      </div>
                    </>
                  ):(
                    <div style={{fontSize:11,color:C.grayL}}>Sin asignar - toca para agregar</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Timeline colaborativo */}
          {pPlan.length>0&&(
            <SC title="📋 Ultimas actualizaciones del equipo">
              {pPlan.sort((a,b)=>b.id-a.id).map((p,i)=>{
                const area=getArea(p.area);
                return(
                  <div key={p.id} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:i<pPlan.length-1?`1px solid ${C.sand}`:"none"}}>
                    <div style={{width:36,height:36,borderRadius:10,background:area.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{area.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:13,color:C.charcoal}}>{area.label}</div>
                      <div style={{fontSize:11,color:C.grayL}}>{p.professional} - {p.lastUpdate}</div>
                      <div style={{fontSize:12,color:C.charcoal,marginTop:4,lineHeight:1.4}}>{p.notes}</div>
                      {p.objectives?.length>0&&(
                        <div style={{marginTop:5}}>
                          {p.objectives.map((o,i)=><div key={i} style={{fontSize:11,color:C.grayL}}>- {o}</div>)}
                        </div>
                      )}
                      <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
                        <div className="prog" style={{flex:1}}><div className="progf" style={{width:`${p.progress}%`,background:area.color}}/></div>
                        <span style={{fontSize:11,fontWeight:700,color:area.color}}>{p.progress}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </SC>
          )}

          {pPlan.length===0&&(
            <div style={{textAlign:"center",padding:"30px 0",color:C.grayL}}>
              <div style={{fontSize:36,marginBottom:8}}>🤝</div>
              <div style={{fontWeight:600}}>Sin areas asignadas aun</div>
              <div style={{fontSize:12,marginTop:4}}>Agrega las areas terapeuticas que trabajan con este paciente</div>
              <button className="btn btnp" style={{marginTop:12}} onClick={()=>setShowNew(true)}>+ Agregar primera area</button>
            </div>
          )}
        </>
      )}

      {/* Modal nueva area */}
      {showNew&&(
        <Modal title="Agregar area terapeutica" onClose={()=>setShowNew(false)}>
          <div className="alert alrtw">Cada profesional agrega sus objetivos y progreso para este paciente.</div>
          <div className="fg">
            <label className="lbl">Area terapeutica</label>
            <select className="inp" value={f.area} onChange={e=>setF({...f,area:e.target.value})}>
              {AREAS.map(a=><option key={a.id} value={a.id}>{a.icon} {a.label}</option>)}
            </select>
          </div>
          <div className="fg">
            <label className="lbl">Profesional responsable</label>
            <select className="inp" value={f.professional} onChange={e=>setF({...f,professional:e.target.value})}>
              <option value="">Selecciona profesional...</option>
              {users.filter(u=>u.status==="active").map(u=><option key={u.id}>{u.name} - {u.specialty}</option>)}
              <option value="Externo">Profesional externo</option>
            </select>
          </div>
          <div className="fg">
            <label className="lbl">Objetivos (separados por coma)</label>
            <textarea className="inp" placeholder="Obj 1, Obj 2, Obj 3..." value={f.objectives} onChange={e=>setF({...f,objectives:e.target.value})}/>
          </div>
          <div className="fg">
            <label className="lbl">Notas iniciales</label>
            <textarea className="inp" placeholder="Observaciones, estrategias, acuerdos..." value={f.notes} onChange={e=>setF({...f,notes:e.target.value})}/>
          </div>
          <div className="fg">
            <label className="lbl">Progreso inicial: {f.progress}%</label>
            <input type="range" style={{width:"100%",accentColor:C.terra}} min={0} max={100} step={5} value={f.progress} onChange={e=>setF({...f,progress:parseInt(e.target.value)})}/>
            <div className="prog" style={{marginTop:4}}><div className="progf" style={{width:`${f.progress}%`}}/></div>
          </div>
          <button className="btn btnp btnfull" onClick={save}>Guardar area</button>
        </Modal>
      )}

      {/* Modal detalle area */}
      {showArea&&(
        <Modal title={`${getArea(showArea.area).icon} ${getArea(showArea.area).label}`} onClose={()=>setShowArea(null)}>
          <div className="hxf"><div className="hxl">Profesional</div><div className="hxv">{showArea.professional}</div></div>
          <div className="hxf"><div className="hxl">Ultima actualizacion</div><div className="hxv">{showArea.lastUpdate}</div></div>
          <div className="hxf"><div className="hxl">Objetivos</div>{showArea.objectives?.map((o,i)=><div key={i} className="hxv">- {o}</div>)}</div>
          <div className="hxf"><div className="hxl">Notas clinicas</div><div className="hxv">{showArea.notes}</div></div>
          <div style={{marginTop:8}}>
            <label className="lbl">Progreso: {showArea.progress}%</label>
            <div className="prog"><div className="progf" style={{width:`${showArea.progress}%`,background:getArea(showArea.area).color}}/></div>
          </div>
          <button className="btn btno btnfull noprint" onClick={()=>window.print()}>🖨️ Imprimir</button>
        </Modal>
      )}
    </div>
  );
}

function Admin({users,setUsers}){
  const [tab,setTab]=useState("usuarios");
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
        {[{k:"usuarios",l:"👥 Usuarios"},{k:"seguridad",l:"🛡️ Seguridad"},{k:"stats",l:"📊 Stats"},{k:"config",l:"⚙️ Config"}].map(t=>(
          <button key={t.k} className={`atab${tab===t.k?" active":""}`} onClick={()=>setTab(t.k)}>{t.l}</button>
        ))}
      </div>
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
          <div className="alert alrtw">📧 En produccion se envia email de bienvenida con credenciales.</div>
          {[["Nombre completo","name","text","Nombre y apellido"],["Email","email","email","profesional@mail.com"],["Contrasena inicial","password","text","Contrasena temporal"],["Especialidad","specialty","text","Fonoaudiologa, Psicopedagoga..."]].map(([l,k,t,ph])=>(
            <div className="fg" key={k}><label className="lbl">{l}</label><input className="inp" type={t} placeholder={ph} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}/></div>
          ))}
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
    admin:user?.role==="admin"?<Admin users={users} setUsers={setUsers}/>:<div className="fu"><div className="alert alrtd">🔐 Solo administradores.</div></div>,
    profile:<Profile user={user} onLogout={logout}/>,
  };
  const bnItems=[
    {id:"dashboard",l:"Panel",i:"🏠"},
    {id:"patients",l:"Pacientes",i:"👥"},
    {id:"agenda",l:"Agenda",i:"📅"},
    {id:"sessions",l:"Clinico",i:"📝"},
    {id:user?.role==="admin"?"admin":"profile",l:user?.role==="admin"?"Admin":"Perfil",i:user?.role==="admin"?"🔐":"👤"},
  ];
  if(!user)return(<><style>{CSS}</style><Login onLogin={setUser} users={users}/></>);
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
