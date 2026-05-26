import { useState } from "react";

const C = {
  terra:"#D4855A",terraL:"#F0C4AB",terraD:"#B5673E",terraF:"#FDF0E8",
  cream:"#FAF8F5",sand:"#EDE5D8",sandD:"#D6C9B4",
  sage:"#7A9E85",sageF:"#EBF5EE",forest:"#3D6B4F",
  charcoal:"#2C2C2C",gray:"#6B6560",grayL:"#9B9590",
  white:"#FFFFFF",danger:"#C0392B",dangerF:"#FDECEA",
  info:"#5B8DB8",infoF:"#EBF3FB",
  purple:"#8B7BB5",purpleF:"#F0EDF8",
  gold:"#E8A020",goldF:"#FEF3E0",
  green:"#2ECC71",greenF:"#E8F8EF",
};

const FONTS=`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');`;

const INIT_USERS=[
  {id:1,name:"Jacqueline Márquez",email:"jacqueline@hadrion.cl",password:"admin123",role:"admin",specialty:"Fonoaudióloga",plan:"Pro",status:"active",createdAt:"01/01/2025",avatar:"JM",color:C.terra,lastLogin:"Hoy 08:30"},
  {id:2,name:"Ana García",email:"ana@clinica.cl",password:"123456",role:"profesional",specialty:"Psicopedagoga",plan:"Básico",status:"active",createdAt:"15/03/2025",avatar:"AG",color:C.sage,lastLogin:"Ayer 16:00"},
  {id:3,name:"Carlos Ruiz",email:"carlos@terapia.cl",password:"123456",role:"profesional",specialty:"Fonoaudiólogo",plan:"Pro",status:"pending",createdAt:"20/05/2025",avatar:"CR",color:C.purple,lastLogin:"—"},
  {id:4,name:"Sofía Pinto",email:"sofia@neuro.cl",password:"123456",role:"profesional",specialty:"T.O.",plan:"Básico",status:"inactive",createdAt:"10/04/2025",avatar:"SP",color:C.info,lastLogin:"12/05/2025"},
];

const INIT_PATIENTS=[
  {id:1,name:"Valentina López",age:7,diagnosis:"TEL",sessions:12,nextSession:"Lun 27/05 10:00",avatar:"VL",color:C.terra,phone:"(+54) 9 8765 4321",email:"vlopez@mail.com",guardian:"María López (madre)",notes:"Dificultad en fonemas fricativos. Buena disposición.",goals:["Producción /s/ en posición inicial","Discriminación auditiva de pares mínimos","Comprensión de instrucciones complejas"],status:"active"},
  {id:2,name:"Martín García",age:9,diagnosis:"Dislexia",sessions:8,nextSession:"Mié 29/05 09:00",avatar:"MG",color:C.sage,phone:"(+54) 9 7654 3210",email:"mgarcia@mail.com",guardian:"Pedro García (padre)",notes:"Confusión persistente b/d. Mejora en velocidad lectora.",goals:["Decodificación b/d/p/q","Velocidad lectora 80 ppm","Comprensión lectora nivel 3°"],status:"active"},
  {id:3,name:"Sofía Ramírez",age:6,diagnosis:"TDAH",sessions:15,nextSession:"Jue 30/05 11:00",avatar:"SR",color:C.purple,phone:"(+54) 9 6543 2109",email:"sramirez@mail.com",guardian:"Ana Ramírez (madre)",notes:"Alta dispersión. Responde bien a actividades cortas.",goals:["Atención sostenida 15 min","Autorregulación emocional","Seguimiento de instrucciones secuenciadas"],status:"active"},
  {id:4,name:"Tomás Herrera",age:8,diagnosis:"Disartria",sessions:6,nextSession:"Vie 31/05 10:00",avatar:"TH",color:C.info,phone:"(+54) 9 5432 1098",email:"therrera@mail.com",guardian:"Rosa Herrera (madre)",notes:"Dificultad en articulación. Buena motivación.",goals:["Praxias bucofonatorias","Producción de oclusivas","Inteligibilidad del habla 80%"],status:"active"},
  {id:5,name:"Pedro Salinas",age:3,diagnosis:"TEA",sessions:4,nextSession:"Sin agendar",avatar:"PS",color:C.gold,phone:"(+54) 9 4321 0987",email:"psalinas@mail.com",guardian:"Luis Salinas (padre)",notes:"Primera infancia. Comunicación no verbal predominante.",goals:["Contacto visual sostenido","Comunicación intencional","Juego funcional con objetos"],status:"active"},
];

const INIT_SESSIONS=[
  {id:1,patientId:1,patient:"Valentina López",date:"20/05/2025",objective:"Fonemas fricativos /s/",note:"Logró producir /s/ en posición inicial con apoyo visual. Muy motivada.",progress:70,activities:["Conciencia fonológica con rimas","Espejo articulatorio"],homework:"Practicar /s/ frente al espejo 5 min diarios",estado:"regulado",atencion:"sostenida",participacion:"buena"},
  {id:2,patientId:2,patient:"Martín García",date:"18/05/2025",objective:"Decodificación b/d",note:"Mejora en velocidad lectora. Confusión persistente b/d.",progress:55,activities:["Ruleta de sílabas","Lectura cronometrada"],homework:"Leer 10 min con adulto cada noche",estado:"cansado",atencion:"fluctuante",participacion:"parcial"},
  {id:3,patientId:3,patient:"Sofía Ramírez",date:"22/05/2025",objective:"Atención sostenida",note:"Logró mantener atención 12 min con semáforo. Mejor que sesión anterior.",progress:60,activities:["Semáforo de emociones"],homework:"Juego de memoria 5 min post comida",estado:"hiperactivo",atencion:"dispersa",participacion:"buena"},
];

const INIT_PAYMENTS=[
  {id:1,patientId:1,patient:"Valentina López",amount:15000,type:"Particular",date:"20/05/2025",method:"Transferencia",status:"pagado"},
  {id:2,patientId:2,patient:"Martín García",amount:12000,type:"Obra social",date:"18/05/2025",method:"Efectivo",status:"pagado"},
  {id:3,patientId:3,patient:"Sofía Ramírez",amount:15000,type:"Particular",date:"22/05/2025",method:"Transferencia",status:"pendiente"},
];

const PHONEMES=["A","E","I","O","U","B","C","CH","D","F","G","J","L","LL","M","N","Ñ","P","R","RR","S","T","V","Y","Z"];

const ACTIVITIES_DB=[
  {id:1,name:"Conciencia fonológica con rimas",category:"Lenguaje",target:"TEL",type:"Clínica",age:"4-8",description:"Identificar y producir rimas con imágenes de apoyo visual y auditivo.",materials:"Tarjetas ilustradas, grabador de voz",printable:true},
  {id:2,name:"Ruleta de sílabas",category:"Lectoescritura",target:"Dislexia",type:"Clínica",age:"6-10",description:"Combinar sílabas para formar palabras conocidas.",materials:"Ruleta imprimible, fichas de sílabas",printable:true},
  {id:3,name:"Cuento motor en familia",category:"Lenguaje",target:"TEL",type:"Familia",age:"3-7",description:"Narrar un cuento con movimientos y onomatopeyas.",materials:"Cuento ilustrado",printable:true},
  {id:4,name:"Semáforo de emociones",category:"Regulación",target:"TDAH",type:"Clínica",age:"5-10",description:"Reconocer y regular estados emocionales con colores.",materials:"Lámina de semáforo, tarjetas",printable:true},
  {id:5,name:"Lectura compartida 10 min",category:"Lectoescritura",target:"Dislexia",type:"Familia",age:"6-12",description:"Lectura en voz alta turno a turno con adulto.",materials:"Libro nivel lector, señalador",printable:false},
  {id:6,name:"Secuencias narrativas",category:"Lenguaje",target:"TEL",type:"Clínica",age:"5-9",description:"Ordenar y contar historias con imágenes secuenciadas.",materials:"Viñetas secuenciadas",printable:true},
  {id:7,name:"Praxias bucofonatorias",category:"Articulación",target:"Disartria",type:"Clínica",age:"4-12",description:"Ejercicios de movilidad labial, lingual y mandibular.",materials:"Espejo, lámina de praxias",printable:true},
  {id:8,name:"Juego del sonido perdido",category:"Fonología",target:"TEL",type:"Clínica",age:"4-7",description:"Identificar qué sonido falta en una palabra.",materials:"Tarjetas impresas, audio",printable:true},
];

const ANAMNESIS=[
  {t:"Antecedentes relevantes",i:"📊",q:["¿Antecedentes del embarazo, parto o período neonatal?","¿Hitos del desarrollo motor y del habla-lenguaje?","¿Antecedentes médicos, neurológicos o genéticos?","¿Antecedentes familiares de dificultades similares?","¿Historia familiar: composición, dinámica del hogar?"]},
  {t:"Lenguaje y comunicación",i:"💬",q:["¿Comprende consignas simples y complejas?","¿Presenta dificultades en la expresión verbal?","¿Cómo es la inteligibilidad del habla?","¿Usa lenguaje gestual o sistemas alternativos?"]},
  {t:"Área educativa",i:"📚",q:["¿Asiste a establecimiento educacional?","¿Presenta dificultades de aprendizaje?","¿Recibe apoyos adicionales en el colegio?"]},
  {t:"Área socioemocional",i:"❤️",q:["¿Cómo regula sus emociones?","¿Cómo son sus interacciones sociales?","¿Presenta conductas disruptivas o de evitación?"]},
];

const CSS=`
${FONTS}
*{box-sizing:border-box;margin:0;padding:0;}
html,body{height:100%;background:#FAF8F5;}
.app{font-family:'Plus Jakarta Sans',sans-serif;min-height:100vh;background:#FAF8F5;display:flex;flex-direction:column;}
@media(min-width:900px){
  .app{flex-direction:row;}
  .sidebar{display:flex!important;flex-direction:column;width:248px;min-height:100vh;background:white;border-right:1px solid #EDE5D8;padding:24px 0;position:sticky;top:0;height:100vh;overflow-y:auto;}
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
.slogoicon{width:40px;height:40px;background:#D4855A;border-radius:12px;display:flex;align-items:center;justify-content:center;color:white;font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;}
.slogoname{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:#2C2C2C;}
.slogosub{font-size:10px;color:#9B9590;margin-top:-2px;}
.ssec{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.3px;color:#9B9590;padding:12px 20px 4px;}
.sitem{display:flex;align-items:center;gap:11px;padding:10px 20px;cursor:pointer;font-size:13px;font-weight:500;color:#6B6560;transition:all .15s;border-left:3px solid transparent;margin:1px 0;}
.sitem:hover{background:#FDF0E8;color:#D4855A;}
.sitem.active{background:#FDF0E8;color:#D4855A;border-left-color:#D4855A;font-weight:600;}
.sicon{font-size:15px;width:20px;text-align:center;}
.sbadge{margin-left:auto;background:#D4855A;color:white;font-size:10px;font-weight:700;padding:1px 7px;border-radius:20px;}
.suser{padding:14px 20px;border-top:1px solid #EDE5D8;margin-top:auto;}
.bnav{position:fixed;bottom:0;left:0;right:0;background:white;border-top:1px solid #EDE5D8;display:flex;z-index:50;box-shadow:0 -2px 10px rgba(0,0,0,.07);}
.bn{flex:1;padding:10px 2px 8px;border:none;background:none;cursor:pointer;font-size:9px;font-family:'Plus Jakarta Sans',sans-serif;color:#9B9590;display:flex;flex-direction:column;align-items:center;gap:3px;font-weight:500;transition:color .14s;}
.bn.active{color:#D4855A;}
.bnicon{font-size:19px;}
.card{background:white;border-radius:16px;padding:16px;box-shadow:0 1px 8px rgba(0,0,0,.06);border:1px solid rgba(0,0,0,.04);}
.sgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:16px;}
@media(min-width:600px){.sgrid{grid-template-columns:repeat(4,1fr);}}
.sc2{background:white;border-radius:14px;padding:14px;text-align:center;box-shadow:0 1px 6px rgba(0,0,0,.05);}
.snum{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;color:#D4855A;}
.slbl{font-size:11px;color:#9B9590;font-weight:500;}
.btn{border:none;border-radius:11px;padding:10px 17px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;display:inline-flex;align-items:center;gap:6px;}
.btnp{background:#D4855A;color:white;}
.btnp:hover{background:#B5673E;}
.btno{background:transparent;border:1.5px solid #D4855A;color:#D4855A;}
.btno:hover{background:#FDF0E8;}
.btng{background:#EDE5D8;color:#2C2C2C;}
.btng:hover{background:#D6C9B4;}
.btnd{background:#FDECEA;color:#C0392B;}
.btngold{background:#FEF3E0;color:#E8A020;}
.btnsm{padding:7px 12px;font-size:11px;border-radius:8px;}
.btnfull{width:100%;justify-content:center;margin-top:8px;}
.inp{width:100%;border:1.5px solid #EDE5D8;border-radius:10px;padding:10px 12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:#2C2C2C;background:white;outline:none;transition:border .15s;}
.inp:focus{border-color:#D4855A;}
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
.prog{background:#EDE5D8;border-radius:8px;height:7px;overflow:hidden;}
.progf{height:100%;border-radius:8px;background:linear-gradient(90deg,#D4855A,#B5673E);transition:width .4s;}
.sep{height:1px;background:#EDE5D8;margin:12px 0;}
.sc{background:white;border-radius:18px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.07);margin-bottom:14px;}
.sch{padding:14px 16px;border-bottom:1px solid #EDE5D8;display:flex;align-items:center;justify-content:space-between;}
.scb{padding:14px 16px;}
.hxf{background:#FAF8F5;border-radius:10px;padding:10px 12px;margin-bottom:7px;}
.hxl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#9B9590;margin-bottom:3px;}
.hxv{font-size:13px;color:#2C2C2C;line-height:1.5;}
.alert{border-radius:11px;padding:11px 13px;font-size:13px;margin-bottom:12px;}
.alrti{background:#EBF3FB;color:#5B8DB8;}
.alrts{background:#E8F8EF;color:#3D6B4F;}
.alrtw{background:#FEF3E0;color:#E8A020;}
.alrtd{background:#FDECEA;color:#C0392B;}
.welcome{background:linear-gradient(135deg,#D4855A,#B5673E);border-radius:18px;padding:20px;color:white;margin-bottom:16px;position:relative;overflow:hidden;}
.welcome::after{content:'';position:absolute;right:-24px;top:-24px;width:110px;height:110px;border-radius:50%;background:rgba(255,255,255,.09);}
.wname{font-family:'Cormorant Garamond',serif;font-size:25px;font-weight:700;}
.qg{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
@media(min-width:600px){.qg{grid-template-columns:repeat(4,1fr);}}
.qcard{background:white;border-radius:14px;padding:14px;text-align:center;cursor:pointer;transition:transform .15s;box-shadow:0 1px 6px rgba(0,0,0,.05);}
.qcard:hover{transform:translateY(-2px);}
.av{border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:700;color:white;flex-shrink:0;}
.chip{padding:5px 11px;border-radius:20px;border:1.5px solid #EDE5D8;background:white;font-size:12px;font-weight:500;cursor:pointer;color:#6B6560;font-family:'Plus Jakarta Sans',sans-serif;transition:all .13s;}
.chip.sel{background:#FDF0E8;border-color:#D4855A;color:#D4855A;font-weight:600;}
.chiprow{display:flex;flex-wrap:wrap;gap:6px;margin:5px 0;}
.filrow{display:flex;gap:7px;overflow-x:auto;padding-bottom:4px;margin-bottom:12px;}
.filrow::-webkit-scrollbar{display:none;}
.filbtn{padding:6px 12px;border-radius:20px;border:1.5px solid #EDE5D8;background:white;font-size:12px;font-weight:500;cursor:pointer;white-space:nowrap;color:#6B6560;font-family:'Plus Jakarta Sans',sans-serif;flex-shrink:0;}
.filbtn.active{background:#D4855A;color:white;border-color:#D4855A;}
.phgrid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:12px 0;}
@media(min-width:500px){.phgrid{grid-template-columns:repeat(6,1fr);}}
.phbtn{aspect-ratio:1;border-radius:12px;border:2px solid #EDE5D8;background:white;font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;cursor:pointer;transition:all .17s;display:flex;align-items:center;justify-content:center;color:#2C2C2C;}
.phbtn:hover{border-color:#D4855A;background:#FDF0E8;}
.phbtn.sel{border-color:#D4855A;background:#D4855A;color:white;}
.roletag{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;}
.radmin{background:#FEF3E0;color:#E8A020;}
.rpro{background:#EBF3FB;color:#5B8DB8;}
.dayl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#9B9590;margin:14px 0 6px;}
.atab{flex:1;padding:8px 6px;border:none;background:transparent;border-radius:9px;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:600;cursor:pointer;color:#6B6560;transition:all .15s;}
.atab.active{background:white;color:#D4855A;box-shadow:0 1px 4px rgba(0,0,0,.1);}
.atabrow{display:flex;gap:4px;background:#EDE5D8;border-radius:12px;padding:4px;margin-bottom:16px;}
.qscard{background:white;border-radius:16px;padding:14px;box-shadow:0 1px 8px rgba(0,0,0,.06);margin-bottom:12px;display:flex;align-items:center;gap:12px;cursor:pointer;border:1.5px solid #EDE5D8;transition:border-color .15s;}
.qscard:hover{border-color:#D4855A;}
@keyframes fadeUp{from{opacity:0;transform:translateY(13px);}to{opacity:1;transform:translateY(0);}}
.fu{animation:fadeUp .28s ease forwards;}
@media print{.noprint{display:none!important;}body{background:white;}}
`;

const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const todayStr=()=>new Date().toLocaleDateString("es-CL",{weekday:"long",day:"numeric",month:"long"});

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
  {id:"sessions",l:"Registros Clínicos",i:"📝"},
  {id:"history",l:"Historia Clínica",i:"📋",s:"Clínico"},
  {id:"objectives",l:"Objetivos",i:"🎯"},
  {id:"activities",l:"Actividades",i:"✨"},
  {id:"phonology",l:"Conciencia Fon.",i:"🔤"},
  {id:"reports",l:"Reportes",i:"📊"},
  {id:"resources",l:"Recursos",i:"📚",s:"Herramientas"},
  {id:"admin",l:"Administración",i:"🔐",s:"Admin",adminOnly:true},
  {id:"profile",l:"Mi Perfil",i:"👤"},
];

function Sidebar({active,setActive,user}){
  return(
    <div className="sidebar">
      <div className="slogo">
        <div className="slogoicon">N</div>
        <div><div className="slogoname">Hadrion</div><div className="slogosub">Plataforma Clínica</div></div>
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
    if(!f.email||!f.pass){setErr("Completá todos los campos.");return;}
    const u=users.find(u=>u.email===f.email&&u.password===f.pass);
    if(!u){setErr("Email o contraseña incorrectos.");return;}
    if(u.status==="inactive"){setErr("Tu cuenta está inactiva. Contactá al administrador.");return;}
    if(u.status==="pending"){setErr("Tu cuenta está pendiente de aprobación.")
