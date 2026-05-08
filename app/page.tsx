"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, Activity, ChevronRight, ArrowUpRight, 
  Zap, Layers, Target, Eye, User, Mail, Phone, 
  Gavel, Scale, Briefcase, Award, CheckCircle2, 
  MapPin, Camera, Info, Fingerprint, X 
} from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({ 
    nombre: '', 
    empresa: '', 
    email: '', 
    telefono: '', 
    mensaje: '' 
  });
  const [selectedInfo, setSelectedInfo] = useState<any>(null);
  const [status, setStatus] = useState("");

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    { 
      tag: "DERECHO", 
      t: "Blindaje Legal", 
      d: "Reducción de exposición legal organizacional.", 
      icon: Scale,
      ext: "El Blindaje Legal consiste en la creación de una coraza jurídica para la empresa. Realizamos diagnósticos de contratos, revisión de cumplimiento laboral y protección de activos para evitar litigios costosos antes de que ocurran."
    },
    { 
      tag: "ESTÁNDAR", 
      t: "Gestión ISO", 
      d: "ISO 31000 y administración de riesgo SIAR.", 
      icon: Layers,
      ext: "Implementamos sistemas de gestión basados en normas internacionales. Esto garantiza que su empresa hable el lenguaje global de la industria, optimizando procesos y reduciendo la incertidumbre operativa."
    },
    { 
      tag: "RIESGOS", 
      t: "Compliance", 
      d: "Sistemas de prevención SARLAFT y PTEE.", 
      icon: ShieldCheck,
      ext: "Diseñamos modelos robustos para prevenir el lavado de activos y la corrupción. Como Oficiales de Cumplimiento, aseguramos que su organización cumpla con todas las exigencias de los entes de control."
    },
    { 
      tag: "TECNOLOGÍA", 
      t: "Formación VR", 
      d: "SST y PESV con REALIDAD VIRTUAL 360°.", 
      icon: Camera,
      ext: "Cambiamos las charlas aburridas por experiencias inmersivas. Sus empleados vivirán situaciones de riesgo reales en un entorno seguro de 360 grados, aumentando la retención de seguridad."
    }
  ];

  const galleryItems = [
    {
      img: "/Inmersión_VR.jpeg",
      t: "Inmersión VR 360°",
      tag: "TECNOLOGÍA",
      ext: "Capacitación disruptiva mediante Realidad Virtual para la detección de riesgos en tiempo real."
    },
    {
      img: "/Auditoría_SST.jpeg",
      t: "Auditoría en Campo",
      tag: "GESTIÓN",
      ext: "Inspecciones técnicas de seguridad bajo estándares internacionales ISO."
    },
    {
      img: "/Capacitación_Empresarial.jpeg",
      t: "Consultoría Estratégica",
      tag: "CAPACITACIÓN",
      ext: "Acompañamiento a juntas directivas en gestión integral del riesgo corporativo."
    }
  ];

  // --- LÓGICA DE WHATSAPP CORREGIDA CON EL NÚMERO REAL ---
  const handleWhatsApp = (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    
    // NÚMERO CORREGIDO SEGÚN TU CONFIRMACIÓN: 57 + 3183398969
    const miNumero = "573183398969"; 
    const textoBase = customMsg || `Hola Juan Londoño, mi nombre es ${formData.nombre || 'un interesado'}. Requiero un diagnóstico de riesgos para la empresa ${formData.empresa || ''}.`;
    
    // Formato de API que abre directamente la aplicación
    const url = `https://api.whatsapp.com/send?phone=${miNumero}&text=${encodeURIComponent(textoBase)}`;
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmail = async () => {
    if (!formData.nombre || !formData.email || !formData.mensaje) {
        alert("Por favor completa Nombre, Email y Mensaje.");
        return;
    }
    setStatus("Enviando...");
    try {
      const response = await fetch("https://formspree.io/f/xvzlwkqg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            _subject: `Solicitud de: ${formData.nombre} - ${formData.empresa}`,
            Nombre: formData.nombre,
            Empresa: formData.empresa,
            Email_Cliente: formData.email,
            Telefono: formData.telefono,
            Mensaje: formData.mensaje
        })
      });
      if (response.ok) {
        setStatus("¡MENSAJE ENVIADO CON ÉXITO!");
        setFormData({ nombre: '', empresa: '', email: '', telefono: '', mensaje: '' });
      } else {
        setStatus("Error al enviar.");
      }
    } catch (error) {
      setStatus("Error de conexión.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFCFB] text-black antialiased font-sans selection:bg-[#C5A059] selection:text-white overflow-x-hidden text-left">
      
      {/* MODAL */}
      {selectedInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={() => setSelectedInfo(null)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[30px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 text-left">
            <button onClick={() => setSelectedInfo(null)} className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors"><X size={20} /></button>
            <div className="p-8">
              <span className="text-[9px] font-black text-[#C5A059] uppercase tracking-[0.3em] italic mb-2 block">{selectedInfo.tag}</span>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4 text-black">{selectedInfo.t}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed mb-6 font-medium">{selectedInfo.ext}</p>
              <button onClick={() => handleWhatsApp(undefined, `Deseo información técnica sobre: ${selectedInfo.t}`)}
                className="bg-black text-[#C5A059] px-6 py-3 rounded-full font-black uppercase text-[9px] tracking-widest hover:bg-[#C5A059] hover:text-black transition-all">
                Consultar vía WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#C5A059]/10 px-6 py-2 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="relative w-10 h-10 overflow-hidden rounded-full border border-[#C5A059]/30 shadow-md">
            <Image src="/logo.jpeg" alt="Logo" fill sizes="40px" className="object-cover" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-black text-sm uppercase tracking-tighter leading-none text-black">Juan Londoño</span>
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">Derecho & Gestión Estratégica de Riesgos</span>
          </div>
        </div>
        <div className="hidden lg:flex gap-6 text-[9px] uppercase tracking-widest font-black items-center text-zinc-500">
          <button onClick={() => scrollTo('quienes-somos')} className="hover:text-[#C5A059]">Quién Soy</button>
          <button onClick={() => scrollTo('filosofia')} className="hover:text-[#C5A059]">Filosofía</button>
          <button onClick={() => scrollTo('servicios')} className="hover:text-[#C5A059]">Soluciones</button>
          <button onClick={() => scrollTo('galeria')} className="hover:text-[#C5A059]">Galería</button>
          <button onClick={() => scrollTo('contacto')} className="bg-black text-[#C5A059] px-4 py-1.5 border border-[#C5A059] rounded-full text-[8px] font-black uppercase">DIAGNÓSTICO</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-8 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center border-b border-zinc-100 text-left text-black">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-zinc-900 text-[#C5A059] rounded-sm mb-4 border border-[#C5A059]/20 shadow-lg text-black">
            <Scale size={10} />
            <span className="text-[8px] uppercase tracking-[0.4em] font-black italic">Abogado & Especialista</span>
          </div>
          <h1 className="text-5xl md:text-[85px] font-black leading-[0.85] tracking-tighter mb-6 uppercase italic text-black">
            BLINDAJE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8E6E37] via-[#C5A059] to-[#8E6E37]">JURÍDICO</span>
          </h1>
          <p className="text-sm font-bold leading-tight text-zinc-600 uppercase max-w-md border-l-4 border-[#C5A059] pl-4">
            Transformamos vulnerabilidades en fortalezas mediante auditoría estratégica y gestión de cumplimiento SIAR / SARLAFT.
          </p>
        </div>
        <div className="hidden lg:block relative text-left">
          <div className="p-6 bg-zinc-50 rounded-[30px] border border-[#C5A059]/20 shadow-xl text-black">
            <Fingerprint size={120} className="absolute -right-8 -bottom-8 opacity-5 text-[#C5A059]" />
            <h3 className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#C5A059] mb-4 italic">Certificaciones</h3>
            <div className="space-y-3 relative z-10 font-black uppercase text-[10px] tracking-widest italic text-left">
              <div className="flex items-center gap-3 text-zinc-800"><CheckCircle2 size={14} className="text-[#C5A059]"/> Oficial de Cumplimiento</div>
              <div className="flex items-center gap-3 text-zinc-800"><CheckCircle2 size={14} className="text-[#C5A059]"/> Auditor SIAR Certificado</div>
              <div className="flex items-center gap-3 text-zinc-800"><CheckCircle2 size={14} className="text-[#C5A059]"/> Especialista en SST</div>
              <div className="flex items-center gap-3 text-zinc-800"><CheckCircle2 size={14} className="text-[#C5A059]"/> Especialista en Gerencia de Proyectos / Riesgos</div>
              <div className="flex items-center gap-3 text-zinc-800"><CheckCircle2 size={14} className="text-[#C5A059]"/> Magíster en SST</div>
            </div>
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section id="quienes-somos" className="py-12 px-6 max-w-7xl mx-auto text-left">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-[9px] font-black uppercase tracking-[0.6em] text-[#C5A059] italic flex items-center gap-2"><Info size={12}/> Trayectoria</h2>
            <p className="text-[14px] font-bold leading-snug text-zinc-800 uppercase tracking-tight text-left">
              Abogado | Candidato a Doctor en Derecho, Magíster en SST, Especialista en Gerencia de Riesgos, Especialista en Gerencia de Proyectos, Auditor SIAR y Oficial de Cumplimiento.
            </p>
          </div>
          <div className="relative h-[300px] bg-zinc-50 rounded-[30px] overflow-hidden border-2 border-white shadow-xl text-left">
             <Image src="/Consultoría_Directa1.jpeg" alt="Juan Londoño" fill sizes="500px" className="object-contain" priority />
          </div>
        </div>
      </section>

      {/* FILOSOFÍA: MISIÓN Y VISIÓN */}
      <section id="filosofia" className="py-12 px-6 bg-zinc-50 border-y border-[#C5A059]/10 text-black text-left">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 text-left">
          <div className="space-y-3 border-l border-[#C5A059]/30 pl-6 text-left text-black">
            <Target size={24} className="text-[#C5A059]" />
            <h2 className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A059] italic">Misión</h2>
            <p className="text-[12px] font-bold italic tracking-tight uppercase leading-relaxed text-zinc-700">Proteger el valor empresarial mediante la integración estratégica de conocimiento jurídico, gestión del riesgo y cumplimiento normativo.</p>
          </div>
          <div className="space-y-3 border-l border-[#C5A059]/30 pl-6 text-left text-black">
            <Eye size={24} className="text-[#C5A059]" />
            <h2 className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C5A059] italic">Visión</h2>
            <p className="text-[12px] font-bold italic tracking-tight uppercase leading-relaxed text-zinc-700">Ser el referente técnico nacional en la integración del derecho corporativo con la ingeniería de riesgos y blindaje jurídico.</p>
          </div>
        </div>
      </section>

      {/* PORTAFOLIO INTERACTIVO */}
      <section id="servicios" className="py-10 px-6 max-w-7xl mx-auto text-left text-black">
        <h2 className="text-[9px] font-black uppercase tracking-[0.6em] text-[#C5A059] mb-8 italic text-left">Soluciones (Clic para ampliar)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {services.map((item, i) => (
            <div key={i} onClick={() => setSelectedInfo(item)} className="bg-white p-6 border border-zinc-100 rounded-[24px] hover:border-[#C5A059] transition-all group cursor-pointer h-full flex flex-col shadow-sm hover:shadow-md text-left text-black">
              <div className="mb-4 text-[#C5A059] group-hover:scale-110 transition-transform"><item.icon size={24} /></div>
              <span className="text-[8px] font-black text-[#C5A059] block mb-1 tracking-widest italic uppercase text-left">{item.tag}</span>
              <h3 className="text-base font-black uppercase mb-2 tracking-tighter italic text-black leading-tight text-left">{item.t}</h3>
              <p className="text-[9px] leading-relaxed text-zinc-400 font-bold uppercase text-left">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="py-10 px-6 max-w-7xl mx-auto text-left border-t border-zinc-100 text-black">
        <h2 className="text-[9px] font-black uppercase tracking-[0.6em] text-[#C5A059] mb-8 italic text-left">Evidencia en Campo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-auto md:h-[350px] text-left">
           {galleryItems.map((item, i) => (
             <div key={i} onClick={() => setSelectedInfo(item)} className="relative rounded-[24px] overflow-hidden border border-[#C5A059]/10 shadow-lg group h-[250px] md:h-full cursor-pointer text-left">
                <Image src={item.img} alt={item.t} fill sizes="400px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-left">
                  <h4 className="text-white font-black uppercase italic tracking-tighter text-lg mb-1 text-left">{item.t}</h4>
                  <p className="text-[#C5A059] text-[8px] font-bold uppercase tracking-widest text-left">Ver detalle técnico</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* CONTACTO CON MAPA PROFESIONAL */}
      <section id="contacto" className="py-12 px-6 bg-zinc-50 border-t border-[#C5A059]/10 text-black text-left">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 text-left">
          <div className="space-y-6 text-left">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-[#C5A059] text-left">Medellín</h2>
            <div className="w-full h-64 bg-white rounded-[20px] border border-[#C5A059]/20 overflow-hidden shadow-inner grayscale hover:grayscale-0 transition-all duration-700 text-left">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126916.7407383451!2d-75.65125211993433!3d6.244198821312384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428dfc80fad05%3A0x42137cfcc6b53b56!2sMedell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1715196942000!5m2!1ses!2sco" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy">
              </iframe>
            </div>
            {status && <p className="text-[10px] font-black uppercase text-[#C5A059] bg-black p-2 inline-block italic text-left">{status}</p>}
          </div>

          <form className="space-y-4 text-left" onSubmit={handleWhatsApp}>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <input required value={formData.nombre} type="text" placeholder="SU NOMBRE" className="w-full bg-white border border-[#C5A059]/10 px-4 py-3 rounded-xl font-black uppercase text-[9px] focus:border-[#C5A059] outline-none text-left" 
                onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
              <input required value={formData.empresa} type="text" placeholder="EMPRESA" className="w-full bg-white border border-[#C5A059]/10 px-4 py-3 rounded-xl font-black uppercase text-[9px] focus:border-[#C5A059] outline-none text-left" 
                onChange={(e) => setFormData({...formData, empresa: e.target.value})} />
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-left">
              <input required value={formData.email} type="email" placeholder="CORREO ELECTRÓNICO" className="w-full bg-white border border-[#C5A059]/10 px-4 py-3 rounded-xl font-black uppercase text-[9px] focus:border-[#C5A059] outline-none text-left" 
                onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <input required value={formData.telefono} type="tel" placeholder="TELÉFONO / WHATSAPP" className="w-full bg-white border border-[#C5A059]/10 px-4 py-3 rounded-xl font-black uppercase text-[9px] focus:border-[#C5A059] outline-none text-left" 
                onChange={(e) => setFormData({...formData, telefono: e.target.value})} />
            </div>

            <textarea required value={formData.mensaje} placeholder="REQUERIMIENTO TÉCNICO" className="w-full bg-white border border-[#C5A059]/10 px-4 py-3 rounded-xl font-black uppercase text-[9px] focus:border-[#C5A059] outline-none resize-none text-left" rows={2} 
              onChange={(e) => setFormData({...formData, mensaje: e.target.value})}></textarea>
            
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <button type="submit" className="w-full bg-[#25D366] text-white py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#128C7E] transition-all shadow-lg flex items-center justify-center gap-2 text-left">
                <Phone size={14}/> WHATSAPP DIRECTO
              </button>
              <button type="button" onClick={handleEmail} className="w-full bg-black text-[#C5A059] py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-lg flex items-center justify-center gap-2 text-left">
                <Mail size={14}/> ENVIAR POR EMAIL
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="py-8 px-6 bg-white border-t border-zinc-100 flex justify-between items-center text-left text-black">
          <div className="flex items-center gap-3 text-left">
            <div className="font-black text-2xl tracking-tighter italic uppercase text-[#C5A059] text-left text-black">JL</div>
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-300 italic text-left">© 2026 Juan Londoño | Medellín</p>
          </div>
          <button onClick={() => handleWhatsApp()} className="hover:text-[#C5A059] transition-colors flex items-center gap-2 text-[9px] font-black uppercase italic text-black font-bold text-left"><Phone size={14}/> WhatsApp</button>
      </footer>
    </main>
  );
}