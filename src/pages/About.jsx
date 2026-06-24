import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  useEffect(() => {
    document.title = 'About Us | SmileCare Dental Clinic';
  }, []);

  return (
    <div
      className="scroll-smooth"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: '#faf8ff',
        color: '#131b2e',
      }}
    >
      {/* ── GOOGLE FONTS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

        .glass-card {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(226,232,240,0.8);
        }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
          vertical-align: middle;
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .btn-hover-glow:hover { box-shadow: 0 0 20px rgba(0,104,95,0.15); }
        .section-padding { padding-top: 80px; padding-bottom: 80px; }

        .about-hero-bg {
          background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDY5JfLMrMpy1D8rcODwctVGbrbAd2khaNeRr0xhgNDN8o5_x8K1ourVkhJNfE9dZkL1S-7QKvfTV30NMPVqYOkOgAc_OBu8lRhDH7SswtMTj9HFpRpEXmfR7Oo_KWd1ye_f9UDGCsMAVqbJLbKalrv1F8HueLrKx2kkv5Sm266GTI7U2um_7Jim88-KIKuGfYVHAg_BqYv88JV9Z-cock5166WkylkjzdT5v8_ABK8DiXTPWaT424niTu96xTIs6panjOKbZP3Zik');
          background-size: cover;
          background-position: center;
        }
        .group:hover .group-hover-scale { transform: scale(1.05); }
        .group:hover .group-hover-show { transform: translateY(0); opacity: 1; }
        .group-hover-scale { transition: transform 0.5s ease; }
        .group-hover-show { transform: translateY(16px); opacity: 0; transition: transform 0.3s ease, opacity 0.3s ease; }

        .about-section-reveal { transition: all 0.7s ease-out; }
      `}</style>

      {/* ─── 1. HERO ─────────────────────────────────── */}
      <section className="about-section-reveal" style={{ position: 'relative', width: '100%', height: '716px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <div className="about-hero-bg" style={{ width: '100%', height: '100%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(250,248,255,0.9) 0%, rgba(250,248,255,0.4) 50%, transparent 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 64px', width: '100%' }}>
          <div style={{ maxWidth: '672px' }}>
            <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '9999px', background: 'rgba(0,104,95,0.1)', color: '#00685f', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '24px', fontFamily: 'Inter' }}>
              ESTABLISHED IN 2008
            </span>
            <h1 style={{ fontFamily: 'Lexend', fontSize: '40px', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#131b2e', marginBottom: '24px' }}>
              Compassionate Care Meets{' '}
              <span style={{ color: '#00685f' }}>Clinical Excellence.</span>
            </h1>
            <p style={{ fontFamily: 'Inter', fontSize: '18px', lineHeight: 1.6, color: '#3d4947', marginBottom: '32px', maxWidth: '480px' }}>
              We believe a visit to the dentist should be a highlight of your day. Our mission is to combine the latest dental technology with a gentle, patient-first approach.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link
                to="/services"
                className="btn-hover-glow"
                style={{ background: '#00685f', color: '#ffffff', padding: '16px 32px', borderRadius: '12px', fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-block' }}
              >
                Our Services
              </Link>
              <button style={{ border: '1px solid #6d7a77', color: '#131b2e', padding: '16px 32px', borderRadius: '12px', fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                Tour The Clinic
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. OUR STORY ────────────────────────────── */}
      <section className="section-padding about-section-reveal" style={{ background: '#faf8ff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            {/* image */}
            <div style={{ position: 'relative' }}>
              <div style={{ aspectRatio: '1/1', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 48px rgba(19,27,46,0.15)' }}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI5Xvbh2ZGdPCOl_qVQHLPVSbaPYDSFKqXCqeOzvVTSo4hZG8HzTEx0jYt-Tgq3wMqwQiRSVJiqkuWQ9e70zdnT1acvvOYMWueUbysqm0pe2DidSl78XzX1ckDZi78SmVqi4y5NWmGGwTrDqo8HLFxX0lxKAXefSl2VkJ7H6uOAgbvAvY1OnLoOcpEOrZCsCwkIkFSq-GBEvStMn9Vk4OIm8QNjdc39a5fqEMJimPAv5A6HFtScD-8ubCYCTgRoeEpIjUJ3CWWzg4"
                  alt="SmileCare founders"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {/* floating badge */}
              <div style={{ position: 'absolute', bottom: '-32px', right: '-32px', padding: '24px', background: '#00685f', color: '#ffffff', borderRadius: '12px', boxShadow: '0 20px 48px rgba(19,27,46,0.2)' }}>
                <p style={{ fontFamily: 'Lexend', fontSize: '24px', fontWeight: 500, lineHeight: 1.4, margin: 0 }}>15+</p>
                <p style={{ fontFamily: 'Inter', fontSize: '12px', lineHeight: 1.4, opacity: 0.9, margin: 0 }}>Years of Community Trust</p>
              </div>
            </div>
            {/* text */}
            <div>
              <h2 style={{ fontFamily: 'Lexend', fontSize: '32px', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.01em', color: '#131b2e', marginBottom: '24px' }}>
                Our Journey Towards Modern Dentistry
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.6, color: '#3d4947' }}>
                <p>Founded on the principle that oral health is the gateway to overall wellness, SmileCare began as a small family practice with a big vision. We wanted to redefine the dental experience, removing the anxiety traditionally associated with the dentist's chair.</p>
                <p>Over the past decade, we have grown into a multi-specialty center, investing in 3D imaging, laser dentistry, and digital impressions to ensure our patients receive the most precise care available today.</p>
                <p>Today, our commitment remains unchanged: providing a sanctuary where modern science meets human touch.</p>
              </div>
              <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #bcc9c6' }}>
                <blockquote style={{ fontStyle: 'italic', fontSize: '18px', lineHeight: 1.6, color: '#131b2e', fontFamily: 'Inter', margin: 0 }}>
                  "Technology gives us the tools, but empathy gives us the results."
                </blockquote>
                <p style={{ marginTop: '8px', fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', color: '#00685f' }}>— Dr. Priya Sharma, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. VALUES (BENTO GRID) ───────────────────── */}
      <section className="section-padding about-section-reveal" style={{ background: '#f2f3ff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px', textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontFamily: 'Lexend', fontSize: '32px', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.01em', color: '#131b2e', marginBottom: '16px' }}>
            Values That Drive Us
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.6, color: '#3d4947', maxWidth: '480px', margin: '0 auto' }}>
            Beyond the drills and fillings, our core values guide every interaction we have with our patients.
          </p>
        </div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {/* Precision */}
            <div style={{ padding: '32px', background: '#ffffff', borderRadius: '24px', boxShadow: '0 20px 24px -4px rgba(19,27,46,0.08)', border: '1px solid rgba(188,201,198,0.3)', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ width: '48px', height: '48px', background: 'rgba(0,104,95,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00685f', marginBottom: '24px' }}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
              </div>
              <h3 style={{ fontFamily: 'Lexend', fontSize: '24px', fontWeight: 500, lineHeight: 1.4, color: '#131b2e', marginBottom: '12px' }}>Unmatched Precision</h3>
              <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.6, color: '#3d4947' }}>Utilizing digital workflows and microscope-enhanced procedures to ensure every restoration is perfect to the millimeter.</p>
            </div>
            {/* Care */}
            <div style={{ padding: '32px', background: '#ffffff', borderRadius: '24px', boxShadow: '0 20px 24px -4px rgba(19,27,46,0.08)', border: '1px solid rgba(188,201,198,0.3)', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ width: '48px', height: '48px', background: 'rgba(0,104,95,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00685f', marginBottom: '24px' }}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </div>
              <h3 style={{ fontFamily: 'Lexend', fontSize: '24px', fontWeight: 500, lineHeight: 1.4, color: '#131b2e', marginBottom: '12px' }}>Empathetic Care</h3>
              <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.6, color: '#3d4947' }}>We treat people, not just teeth. Our comfort-focused approach includes warm blankets, noise-canceling headphones, and personalized pacing.</p>
            </div>
            {/* Innovation */}
            <div style={{ padding: '32px', background: '#ffffff', borderRadius: '24px', boxShadow: '0 20px 24px -4px rgba(19,27,46,0.08)', border: '1px solid rgba(188,201,198,0.3)', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ width: '48px', height: '48px', background: 'rgba(0,104,95,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00685f', marginBottom: '24px' }}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              </div>
              <h3 style={{ fontFamily: 'Lexend', fontSize: '24px', fontWeight: 500, lineHeight: 1.4, color: '#131b2e', marginBottom: '12px' }}>Constant Innovation</h3>
              <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.6, color: '#3d4947' }}>Our team attends monthly advanced training seminars to stay at the leading edge of global dental methodologies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. MEET OUR TEAM ────────────────────────── */}
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
                src="/src/assets/dr_priya_sharma.png"
                alt="Dr. Priya Sharma"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
              <div className="glass-card group-hover-show" style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', padding: '16px', borderRadius: '12px' }}>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', color: '#00685f', margin: 0 }}>Chief Administrator</p>
              </div>
            </div>
            <h3 style={{ fontFamily: 'Lexend', fontSize: '24px', fontWeight: 500, color: '#131b2e', marginBottom: '4px' }}>Dr. Priya Sharma</h3>
            <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.6, color: '#3d4947', marginBottom: '12px' }}>BDS, AIIMS Delhi. 20+ years of clinical leadership in restorative dentistry.</p>
          </div>
          {/* Dr. Arjun Mehta */}
          <div className="group" style={{ cursor: 'pointer' }}>
            <div style={{ aspectRatio: '3/4', borderRadius: '24px', overflow: 'hidden', marginBottom: '24px', position: 'relative' }}>
              <img
                className="group-hover-scale"
                src="/src/assets/dr_arjun_mehta.png"
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
                src="/src/assets/dr_rajesh_iyer.png"
                alt="Dr. Rajesh Iyer"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
              <div className="glass-card group-hover-show" style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', padding: '16px', borderRadius: '12px' }}>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', color: '#00685f', margin: 0 }}>Cosmetic Dentist</p>
              </div>
            </div>
            <h3 style={{ fontFamily: 'Lexend', fontSize: '24px', fontWeight: 500, color: '#131b2e', marginBottom: '4px' }}>Dr. Rajesh Iyer</h3>
            <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.6, color: '#3d4947', marginBottom: '12px' }}>MDS Prosthodontics, Manipal. Master of Aesthetic & Smile Reconstruction.</p>
          </div>
        </div>
      </section>

      {/* ─── 5. FACILITIES (ASYMMETRIC MOSAIC) ──────── */}
      <section className="section-padding about-section-reveal" style={{ background: '#f2f3ff', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '24px', alignItems: 'center' }}>
            {/* text */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontFamily: 'Lexend', fontSize: '32px', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.01em', color: '#131b2e', marginBottom: '24px' }}>
                Advanced Care in a<br />Restorative Environment
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.6, color: '#3d4947', marginBottom: '32px' }}>
                We've designed our clinic to feel less like a hospital and more like a sanctuary. From ergonomic dental chairs to HEPA-grade air filtration, every detail is optimized for your safety and serenity.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: 'check_circle', title: 'Low-Radiation Digital X-Rays', desc: '90% less radiation than traditional films.' },
                  { icon: 'check_circle', title: 'Intraoral Cameras', desc: 'See what the dentist sees in real-time high definition.' },
                  { icon: 'check_circle', title: 'In-Office 3D Printing', desc: 'Same-day surgical guides and temporaries.' },
                ].map(item => (
                  <li key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span className="material-symbols-outlined" style={{ color: '#00685f', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <h4 style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', color: '#131b2e', margin: '0 0 4px' }}>{item.title}</h4>
                      <p style={{ fontFamily: 'Inter', fontSize: '12px', lineHeight: 1.4, color: '#3d4947', margin: 0 }}>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* mosaic images */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/5', boxShadow: '0 4px 16px rgba(19,27,46,0.1)' }}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKje4rIE5gV1DSchBaraLBnx_vdq4qQHEvF1H0jqD0JLSRWA-wUbayst7wTI2aWcCYw3u1kLJkaVUWV7ooPYcLjlQI4g3MI9bpBHn33sCIJEarMN10cybdqyxwM0GRfVN1-t5NZe-SgtFTLwNuWDbC3G2gRVIiQWIK5pED2oGFfZLi2tw6_0PTfBgSlXvvt2tP3Qw2PTBSrfGH9R0WJcxZAInlTJCCvCy4bU2utLP3Rx8YsDuR1NdN8VEtc-8c1YofnhfnhfTCphw"
                    alt="Dental treatment room"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '1/1', boxShadow: '0 4px 16px rgba(19,27,46,0.1)' }}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnEwzEe9ECR0nWa3MeYvZHboWSatvZtRaP5KuwR8T4xZs4FVJRNvuASNBnuykbQJn_toi_yp8g_jOpXwUj7rcgrXkkRmxZZ8Z9__pfIjAUvS2RzN5zoIrmRK3GKtLFoFUYovFbTRp8UbVRGDhaKhPGvK1YfHyUO8jSCRXAnKIaKx_J5tacpHi0LiY_1-OKFryCvOvNLctmCj-km2Lcyo7RzZHW7jl721aRmEMU8Jo38t4VdDaFjtwLt_1G9BSzs3Z90Jz52d6OZ5A"
                    alt="Dental instruments"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div style={{ paddingTop: '32px' }}>
                <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/6', boxShadow: '0 4px 16px rgba(19,27,46,0.1)' }}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuClxMTy-GsOzbxGRzOwXAixOlsPWkJBpJYnkvoMuoc1UFcsT-DeSDmdbo2SYaiz8KE8kcm57z4Df0b-m2Yw1n1iCQYhKrreQB-JbBlPwedY8TfTS8en-ybiu-I2oXIwEJUDZV2ES8w_kMGv-tucnX2pDA8jkiqulJH0pGRskWgXaMoJJg-QN_0P4nU8WfJxFIqjxLsVarSDKr3xk96DFIdVfl8-Jgbpz-Z6LSwNF3yFLcsxCKGoF0AuvTTHgo6Pqt4IEoFsN-KzWQ8"
                    alt="Clinic lobby"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. CERTIFICATIONS & AWARDS ──────────────── */}
      <section className="section-padding about-section-reveal" style={{ background: '#faf8ff', borderTop: '1px solid rgba(188,201,198,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00685f', marginBottom: '16px' }}>
              Recognized Excellence
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: '16px', lineHeight: 1.6, color: '#3d4947' }}>
              Proud members of world-renowned dental associations.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '48px 96px', opacity: 0.6, transition: 'opacity 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
          >
            {[
              { icon: 'verified_user', label: 'ADA Member' },
              { icon: 'military_tech', label: 'Best Clinic 2023' },
              { icon: 'workspace_premium', label: 'ISO 9001 Certified' },
              { icon: 'award_star', label: 'AAACD Accredited' },
              { icon: 'health_and_safety', label: 'Safety Gold Standard' },
            ].map(badge => (
              <div key={badge.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#3d4947', marginBottom: '8px' }}>{badge.icon}</span>
                <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', color: '#131b2e' }}>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────── */}
      <section style={{ background: '#00685f', padding: '80px 64px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Lexend', fontSize: '32px', fontWeight: 600, lineHeight: 1.25, color: '#ffffff', marginBottom: '24px' }}>
          Ready to Experience a Healthier Smile?
        </h2>
        <Link
          to="/booking"
          className="btn-hover-glow"
          style={{ display: 'inline-block', background: '#ffffff', color: '#00685f', padding: '16px 40px', borderRadius: '12px', fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', textDecoration: 'none', transition: 'all 0.2s' }}
        >
          Book an Appointment
        </Link>
      </section>
    </div>
  );
}
