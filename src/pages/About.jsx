import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import drPriyaSharma from '../assets/dr_priya_sharma.png';
import drArjunMehta from '../assets/dr_arjun_mehta.png';
import drRajeshIyer from '../assets/dr_rajesh_iyer.png';

export default function About() {
  useEffect(() => {
    document.title = 'About Us | SmileCare Dental Clinic';
  }, []);

  return (
    <div className="scroll-smooth bg-[#faf8ff] text-[#131b2e]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ─── 1. HERO ─────────────────────────────────── */}
      <section
        className="relative w-full min-h-[480px] md:min-h-[600px] lg:min-h-[716px] flex items-center overflow-hidden"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDY5JfLMrMpy1D8rcODwctVGbrbAd2khaNeRr0xhgNDN8o5_x8K1ourVkhJNfE9dZkL1S-7QKvfTV30NMPVqYOkOgAc_OBu8lRhDH7SswtMTj9HFpRpEXmfR7Oo_KWd1ye_f9UDGCsMAVqbJLbKalrv1F8HueLrKx2kkv5Sm266GTI7U2um_7Jim88-KIKuGfYVHAg_BqYv88JV9Z-cock5166WkylkjzdT5v8_ABK8DiXTPWaT424niTu96xTIs6panjOKbZP3Zik')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(250,248,255,0.92) 0%, rgba(250,248,255,0.6) 60%, transparent 100%)' }} />
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-16 w-full py-16 md:py-24">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(0,104,95,0.1)] text-[#00685f] text-sm font-semibold tracking-[0.05em] mb-6">
              ESTABLISHED IN 2008
            </span>
            <h1 className="font-[Lexend,sans-serif] text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-[#131b2e] mb-6">
              Compassionate Care Meets{' '}
              <span className="text-[#00685f]">Clinical Excellence.</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#3d4947] mb-8 max-w-[480px]">
              We believe a visit to the dentist should be a highlight of your day. Our mission is to combine the latest dental technology with a gentle, patient-first approach.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/services"
                className="inline-block bg-[#00685f] text-white px-8 py-4 rounded-xl text-sm font-semibold tracking-[0.05em] hover:opacity-90 transition-all hover:shadow-lg"
              >
                Our Services
              </Link>
              <button className="border border-[#6d7a77] text-[#131b2e] px-8 py-4 rounded-xl text-sm font-semibold tracking-[0.05em] bg-transparent hover:bg-white transition-all">
                Tour The Clinic
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. OUR STORY ────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#faf8ff]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI5Xvbh2ZGdPCOl_qVQHLPVSbaPYDSFKqXCqeOzvVTSo4hZG8HzTEx0jYt-Tgq3wMqwQiRSVJiqkuWQ9e70zdnT1acvvOYMWueUbysqm0pe2DidSl78XzX1ckDZi78SmVqi4y5NWmGGwTrDqo8HLFxX0lxKAXefSl2VkJ7H6uOAgbvAvY1OnLoOcpEOrZCsCwkIkFSq-GBEvStMn9Vk4OIm8QNjdc39a5fqEMJimPAv5A6HFtScD-8ubCYCTgRoeEpIjUJ3CWWzg4"
                  alt="SmileCare founders"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* floating badge */}
              <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 p-5 md:p-6 bg-[#00685f] text-white rounded-xl shadow-2xl">
                <p className="font-[Lexend,sans-serif] text-xl md:text-2xl font-medium leading-snug">15+</p>
                <p className="text-xs leading-snug opacity-90">Years of Community Trust</p>
              </div>
            </div>
            {/* text */}
            <div className="pt-6 lg:pt-0">
              <h2 className="font-[Lexend,sans-serif] text-2xl md:text-3xl font-semibold leading-tight tracking-tight text-[#131b2e] mb-6">
                Our Journey Towards Modern Dentistry
              </h2>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-[#3d4947]">
                <p>Founded on the principle that oral health is the gateway to overall wellness, SmileCare began as a small family practice with a big vision. We wanted to redefine the dental experience, removing the anxiety traditionally associated with the dentist's chair.</p>
                <p>Over the past decade, we have grown into a multi-specialty center, investing in 3D imaging, laser dentistry, and digital impressions to ensure our patients receive the most precise care available today.</p>
                <p>Today, our commitment remains unchanged: providing a sanctuary where modern science meets human touch.</p>
              </div>
              <div className="mt-8 pt-8 border-t border-[#bcc9c6]">
                <blockquote className="italic text-lg leading-relaxed text-[#131b2e]">
                  "Technology gives us the tools, but empathy gives us the results."
                </blockquote>
                <p className="mt-2 text-sm font-semibold tracking-[0.05em] text-[#00685f]">— Dr. Priya Sharma, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. VALUES ─────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#f2f3ff]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="text-center mb-12">
            <h2 className="font-[Lexend,sans-serif] text-2xl md:text-3xl font-semibold tracking-tight text-[#131b2e] mb-4">
              Values That Drive Us
            </h2>
            <p className="text-base leading-relaxed text-[#3d4947] max-w-[480px] mx-auto">
              Beyond the drills and fillings, our core values guide every interaction we have with our patients.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'biotech', title: 'Unmatched Precision', desc: 'Utilizing digital workflows and microscope-enhanced procedures to ensure every restoration is perfect to the millimeter.' },
              { icon: 'favorite', title: 'Empathetic Care', desc: 'We treat people, not just teeth. Our comfort-focused approach includes warm blankets, noise-canceling headphones, and personalized pacing.' },
              { icon: 'lightbulb', title: 'Constant Innovation', desc: 'Our team attends monthly advanced training seminars to stay at the leading edge of global dental methodologies.' },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 bg-white rounded-3xl shadow-[0_20px_24px_-4px_rgba(19,27,46,0.08)] border border-[rgba(188,201,198,0.3)] hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="w-12 h-12 bg-[rgba(0,104,95,0.1)] rounded-xl flex items-center justify-center text-[#00685f] mb-6">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>
                <h3 className="font-[Lexend,sans-serif] text-xl font-medium text-[#131b2e] mb-3">{item.title}</h3>
                <p className="text-base leading-relaxed text-[#3d4947]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. MEET OUR TEAM ────────────────────────── */}
<<<<<<< HEAD
      <section className="py-16 md:py-20 bg-[#faf8ff]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-12">
            <div>
              <h2 className="font-[Lexend,sans-serif] text-2xl md:text-3xl font-semibold tracking-tight text-[#131b2e] mb-2">Our Elite Medical Team</h2>
              <p className="text-base leading-relaxed text-[#3d4947]">Expertise you can trust, personalities you'll love.</p>
=======
      <section className="section-padding about-section-reveal" style={{ background: '#faf8ff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px', marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 style={{ fontFamily: 'Lexend', fontSize: '32px', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.01em', color: '#131b2e', marginBottom: '8px' }}>Our Elite Medical Team</h2>
            <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.6, color: '#3d4947' }}>Expertise you can trust, personalities you'll love.</p>
          </div>
          <Link to="/services" style={{ color: '#00685f', fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            View All Staff <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </Link>
        </div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {/* Dr. Priya Sharma */}
          <div className="group" style={{ cursor: 'pointer' }}>
            <div style={{ aspectRatio: '3/4', borderRadius: '24px', overflow: 'hidden', marginBottom: '24px', position: 'relative' }}>
              <img
                className="group-hover-scale"
                src={drPriyaSharma}
                alt="Dr. Priya Sharma"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
              <div className="glass-card group-hover-show" style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', padding: '16px', borderRadius: '12px' }}>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', color: '#00685f', margin: 0 }}>Chief Administrator</p>
              </div>
>>>>>>> 4916f63a1ab067a6e691605c68a6f6853b1c1072
            </div>
            <Link to="/services" className="text-[#00685f] text-sm font-semibold tracking-[0.05em] flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
              View All Staff <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
<<<<<<< HEAD
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { src: '/src/assets/dr_priya_sharma.png', alt: 'Dr. Priya Sharma', name: 'Dr. Priya Sharma', role: 'Chief Administrator', desc: 'BDS, AIIMS Delhi. 20+ years of clinical leadership in restorative dentistry.' },
              { src: '/src/assets/dr_arjun_mehta.png', alt: 'Dr. Arjun Mehta', name: 'Dr. Arjun Mehta', role: 'Orthodontist', desc: 'MDS Orthodontics, KEM Mumbai. Specialist in invisible aligners & braces.' },
              { src: '/src/assets/dr_rajesh_iyer.png', alt: 'Dr. Rajesh Iyer', name: 'Dr. Rajesh Iyer', role: 'Cosmetic Dentist', desc: 'MDS Prosthodontics, Manipal. Master of Aesthetic & Smile Reconstruction.' },
            ].map((doc) => (
              <div key={doc.name} className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 relative">
                  <img
                    src={doc.src}
                    alt={doc.alt}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/70 backdrop-blur-md border border-[rgba(226,232,240,0.8)] p-4 rounded-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-sm font-semibold tracking-[0.05em] text-[#00685f]">{doc.role}</p>
                  </div>
                </div>
                <h3 className="font-[Lexend,sans-serif] text-xl font-medium text-[#131b2e] mb-1">{doc.name}</h3>
                <p className="text-base leading-relaxed text-[#3d4947]">{doc.desc}</p>
              </div>
            ))}
=======
          {/* Dr. Arjun Mehta */}
          <div className="group" style={{ cursor: 'pointer' }}>
            <div style={{ aspectRatio: '3/4', borderRadius: '24px', overflow: 'hidden', marginBottom: '24px', position: 'relative' }}>
              <img
                className="group-hover-scale"
                src={drArjunMehta}
                alt="Dr. Arjun Mehta"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
              <div className="glass-card group-hover-show" style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', padding: '16px', borderRadius: '12px' }}>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', color: '#00685f', margin: 0 }}>Orthodontist</p>
              </div>
            </div>
            <h3 style={{ fontFamily: 'Lexend', fontSize: '24px', fontWeight: 500, color: '#131b2e', marginBottom: '4px' }}>Dr. Arjun Mehta</h3>
            <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.6, color: '#3d4947', marginBottom: '12px' }}>MDS Orthodontics, KEM Mumbai. Specialist in invisible aligners & braces.</p>
          </div>
          {/* Dr. Rajesh Iyer */}
          <div className="group" style={{ cursor: 'pointer' }}>
            <div style={{ aspectRatio: '3/4', borderRadius: '24px', overflow: 'hidden', marginBottom: '24px', position: 'relative' }}>
              <img
                className="group-hover-scale"
                src={drRajeshIyer}
                alt="Dr. Rajesh Iyer"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
              <div className="glass-card group-hover-show" style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', padding: '16px', borderRadius: '12px' }}>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', color: '#00685f', margin: 0 }}>Cosmetic Dentist</p>
              </div>
            </div>
            <h3 style={{ fontFamily: 'Lexend', fontSize: '24px', fontWeight: 500, color: '#131b2e', marginBottom: '4px' }}>Dr. Rajesh Iyer</h3>
            <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.6, color: '#3d4947', marginBottom: '12px' }}>MDS Prosthodontics, Manipal. Master of Aesthetic & Smile Reconstruction.</p>
>>>>>>> 4916f63a1ab067a6e691605c68a6f6853b1c1072
          </div>
        </div>
      </section>

      {/* ─── 5. FACILITIES ─────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#f2f3ff] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* text */}
            <div>
              <h2 className="font-[Lexend,sans-serif] text-2xl md:text-3xl font-semibold tracking-tight text-[#131b2e] mb-6">
                Advanced Care in a<br />Restorative Environment
              </h2>
              <p className="text-base leading-relaxed text-[#3d4947] mb-8">
                We've designed our clinic to feel less like a hospital and more like a sanctuary. From ergonomic dental chairs to HEPA-grade air filtration, every detail is optimized for your safety and serenity.
              </p>
              <ul className="flex flex-col gap-4">
                {[
                  { icon: 'check_circle', title: 'Low-Radiation Digital X-Rays', desc: '90% less radiation than traditional films.' },
                  { icon: 'check_circle', title: 'Intraoral Cameras', desc: 'See what the dentist sees in real-time high definition.' },
                  { icon: 'check_circle', title: 'In-Office 3D Printing', desc: 'Same-day surgical guides and temporaries.' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#00685f] shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <h4 className="text-sm font-semibold tracking-[0.05em] text-[#131b2e] mb-1">{item.title}</h4>
                      <p className="text-xs leading-snug text-[#3d4947]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* mosaic images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-md">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKje4rIE5gV1DSchBaraLBnx_vdq4qQHEvF1H0jqD0JLSRWA-wUbayst7wTI2aWcCYw3u1kLJkaVUWV7ooPYcLjlQI4g3MI9bpBHn33sCIJEarMN10cybdqyxwM0GRfVN1-t5NZe-SgtFTLwNuWDbC3G2gRVIiQWIK5pED2oGFfZLi2tw6_0PTfBgSlXvvt2tP3Qw2PTBSrfGH9R0WJcxZAInlTJCCvCy4bU2utLP3Rx8YsDuR1NdN8VEtc-8c1YofnhfnhfTCphw"
                    alt="Dental treatment room"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden aspect-square shadow-md">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnEwzEe9ECR0nWa3MeYvZHboWSatvZtRaP5KuwR8T4xZs4FVJRNvuASNBnuykbQJn_toi_yp8g_jOpXwUj7rcgrXkkRmxZZ8Z9__pfIjAUvS2RzN5zoIrmRK3GKtLFoFUYovFbTRp8UbVRGDhaKhPGvK1YfHyUO8jSCRXAnKIaKx_J5tacpHi0LiY_1-OKFryCvOvNLctmCj-km2Lcyo7RzZHW7jl721aRmEMU8Jo38t4VdDaFjtwLt_1G9BSzs3Z90Jz52d6OZ5A"
                    alt="Dental instruments"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="pt-8">
                <div className="rounded-3xl overflow-hidden aspect-[4/6] shadow-md">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuClxMTy-GsOzbxGRzOwXAixOlsPWkJBpJYnkvoMuoc1UFcsT-DeSDmdbo2SYaiz8KE8kcm57z4Df0b-m2Yw1n1iCQYhKrreQB-JbBlPwedY8TfTS8en-ybiu-I2oXIwEJUDZV2ES8w_kMGv-tucnX2pDA8jkiqulJH0pGRskWgXaMoJJg-QN_0P4nU8WfJxFIqjxLsVarSDKr3xk96DFIdVfl8-Jgbpz-Z6LSwNF3yFLcsxCKGoF0AuvTTHgo6Pqt4IEoFsN-KzWQ8"
                    alt="Clinic lobby"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. CERTIFICATIONS & AWARDS ────────────── */}
      <section className="py-16 md:py-20 bg-[#faf8ff] border-t border-[rgba(188,201,198,0.1)]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#00685f] mb-4">Recognized Excellence</h2>
            <p className="text-base leading-relaxed text-[#3d4947]">Proud members of world-renowned dental associations.</p>
          </div>
          <div
            className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            {[
              { icon: 'verified_user', label: 'ADA Member' },
              { icon: 'military_tech', label: 'Best Clinic 2023' },
              { icon: 'workspace_premium', label: 'ISO 9001 Certified' },
              { icon: 'award_star', label: 'AAACD Accredited' },
              { icon: 'health_and_safety', label: 'Safety Gold Standard' },
            ].map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-5xl text-[#3d4947]">{badge.icon}</span>
                <span className="text-sm font-semibold tracking-[0.05em] text-[#131b2e]">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────── */}
      <section className="bg-[#00685f] py-16 md:py-20 px-5 md:px-16 text-center">
        <h2 className="font-[Lexend,sans-serif] text-2xl md:text-3xl font-semibold text-white mb-6">
          Ready to Experience a Healthier Smile?
        </h2>
        <Link
          to="/booking"
          className="inline-block bg-white text-[#00685f] px-10 py-4 rounded-xl text-sm font-semibold tracking-[0.05em] hover:bg-[#f2f3ff] hover:shadow-lg transition-all"
        >
          Book an Appointment
        </Link>
      </section>
    </div>
  );
}
