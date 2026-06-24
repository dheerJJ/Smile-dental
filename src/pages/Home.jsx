import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Counter({ target }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    let timer = null;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const end = parseInt(target, 10);
          const duration = 2000;
          const step = end > 100 ? Math.ceil(end / 100) : 1;

          timer = setInterval(() => {
            setCount((prev) => {
              if (prev + step >= end) {
                clearInterval(timer);
                return end;
              }
              return prev + step;
            });
          }, 16);

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [target]);

  return (
    <div ref={elementRef} className="font-headline-xl text-headline-xl text-primary mb-2 text-glow">
      {count.toLocaleString()}{parseInt(target, 10) >= 100 ? '+' : ''}
    </div>
  );
}

function RevealOnScroll({ children, delayClass = '' }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className={`reveal ${delayClass}`}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-surface text-on-surface select-none overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-12">
          <RevealOnScroll>
            <span className="inline-block px-4 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-full font-label-md text-label-md mb-6 shadow-sm">
              WORLD-CLASS DENTISTRY
            </span>
            <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight mb-6">
              Crafting Confident Smiles with <span className="text-primary italic">Precision &amp; Care</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
              Experience world-class dental treatments in a calming environment. Modern technology meets compassionate care for your entire family.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="bg-primary text-on-primary px-8 py-4 rounded-medical font-label-md text-label-md hover:bg-primary-container hover:shadow-lg transition-all duration-300 transform active:scale-95"
              >
                Book Appointment
              </Link>
              <a
                href="tel:+91800SMILE"
                className="border-2 border-secondary text-secondary px-8 py-4 rounded-medical font-label-md text-label-md hover:bg-secondary-fixed transition-all duration-300 flex items-center gap-2 transform active:scale-95"
              >
                <span className="material-symbols-outlined">call</span>
                Call Now
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayClass="delay-200">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Professional friendly female dentist smiling in clinic"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtf5PT4r0evp0jzTiM0gpkm-BNmndogrwvqqfGHomTJZrPmFjsPVOWFikUspH9dXBggzAsiOaqpvAfr7DZU59pgS7hiOVsDpMPGw6Hvzx_Hy30JjVCpVfKvkgi4csYolBaL1Q8cUFFyOaHNmBxWzU9i3jRIeWJQtvyGKfzhg8KFBEwaituZQPr4Ye1emiNnqRfGI8jFaFwUAevzwioHzK1oAZWs3K99HYH6eZejIzhDOcxxbVMc1E6XDO0EijH7sn1b6lKgA6Z5tM"
                />
                <div className="absolute bottom-8 left-8 right-8 glass-card p-6 rounded-card shadow-lg flex items-center gap-4 border border-white/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Certified Expertise</p>
                    <p className="font-caption text-caption text-on-surface-variant">Top-rated dental professionals in the city.</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
        {/* Decorative Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low -z-10 rounded-l-[100px] hidden lg:block"></div>
      </header>

      {/* Statistics Section */}
      <section className="py-section-gap bg-surface border-y border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="text-center p-10 bg-white rounded-card shadow-[0px_20px_24px_-4px_rgba(19,27,46,0.04)] border border-outline-variant/30">
                <Counter target="15000" />
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Happy Patients</p>
              </div>
              <div className="text-center p-10 bg-white rounded-card shadow-[0px_20px_24px_-4px_rgba(19,27,46,0.04)] border border-outline-variant/30">
                <Counter target="20" />
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Years Experience</p>
              </div>
              <div className="text-center p-10 bg-white rounded-card shadow-[0px_20px_24px_-4px_rgba(19,27,46,0.04)] border border-outline-variant/30">
                <Counter target="50000" />
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Treatments Done</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-section-gap bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Comprehensive Dental Solutions</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                From routine checkups to complex aesthetic restorations, we provide a full range of services using the latest medical technology.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayClass="delay-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {/* Service 1 */}
              <div className="group bg-white p-8 rounded-card border border-outline-variant/20 hover:border-primary/40 hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-primary/10 rounded-medical flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">health_and_safety</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Teeth Cleaning</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Professional scaling and polishing to keep your gums healthy and your smile bright.</p>
                <Link to="/services" className="text-primary font-label-md text-label-md flex items-center gap-2 group-hover:gap-4 transition-all">
                  Learn More <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
              {/* Service 2 */}
              <div className="group bg-white p-8 rounded-card border border-outline-variant/20 hover:border-primary/40 hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-primary/10 rounded-medical flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">biotech</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Root Canal</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Painless endodontic therapy to save natural teeth and relieve intense pain.</p>
                <Link to="/services" className="text-primary font-label-md text-label-md flex items-center gap-2 group-hover:gap-4 transition-all">
                  Learn More <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
              {/* Service 3 */}
              <div className="group bg-white p-8 rounded-card border border-outline-variant/20 hover:border-primary/40 hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-primary/10 rounded-medical flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">dentistry</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Dental Implants</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Permanent, natural-looking tooth replacements that restore full functionality.</p>
                <Link to="/services" className="text-primary font-label-md text-label-md flex items-center gap-2 group-hover:gap-4 transition-all">
                  Learn More <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
              {/* Service 4 */}
              <div className="group bg-white p-8 rounded-card border border-outline-variant/20 hover:border-primary/40 hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-primary/10 rounded-medical flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">orthopedics</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Braces &amp; Aligners</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Traditional and invisible options to straighten teeth and improve jaw alignment.</p>
                <Link to="/services" className="text-primary font-label-md text-label-md flex items-center gap-2 group-hover:gap-4 transition-all">
                  Learn More <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
              {/* Service 5 */}
              <div className="group bg-white p-8 rounded-card border border-outline-variant/20 hover:border-primary/40 hover:shadow-xl transition-all duration-500">
                <div className="w-16 h-16 bg-primary/10 rounded-medical flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">auto_awesome</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Teeth Whitening</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Advanced laser whitening procedures for immediate, long-lasting brightness.</p>
                <Link to="/services" className="text-primary font-label-md text-label-md flex items-center gap-2 group-hover:gap-4 transition-all">
                  Learn More <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
              {/* More Services CTA */}
              <Link
                to="/services"
                className="bg-primary flex flex-col items-center justify-center p-8 rounded-card text-center text-on-primary hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 active:scale-98"
              >
                <h3 className="font-headline-md text-headline-md mb-2">And much more...</h3>
                <p className="font-body-md text-body-md opacity-80 mb-6">Explore our full range of 20+ specialized dental treatments.</p>
                <span className="material-symbols-outlined text-[48px]">clinical_notes</span>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-section-gap bg-surface overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <RevealOnScroll>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Why SmileCare is the Preferred Choice</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-10">We believe in a patient-first approach, combining clinical excellence with an environment that makes you feel at home.</p>
                <div className="space-y-6">
                  <div className="flex gap-6 p-6 rounded-card bg-white shadow-sm hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary flex-shrink-0">
                      <span className="material-symbols-outlined">groups</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface mb-1">Experienced Dentists</h4>
                      <p className="font-caption text-caption text-on-surface-variant">Our team has over 20 years of combined clinical experience.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 p-6 rounded-card bg-white shadow-sm hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary flex-shrink-0">
                      <span className="material-symbols-outlined">precision_manufacturing</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface mb-1">Modern Equipment</h4>
                      <p className="font-caption text-caption text-on-surface-variant">We use 3D imaging and laser technology for painless procedures.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 p-6 rounded-card bg-white shadow-sm hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary flex-shrink-0">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface-variant mb-1">Affordable Care</h4>
                      <p className="font-caption text-caption text-on-surface-variant">Flexible payment plans and insurance support for all patients.</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            <div className="lg:w-1/2 relative">
              <RevealOnScroll delayClass="delay-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-12">
                    <div className="rounded-card overflow-hidden h-64 shadow-md">
                      <img
                        className="w-full h-full object-cover"
                        alt="High tech dental operatory"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi5TpYnRHDtYYGXAzLzPkumn5f1aHFY2ZKMESs7SZQNRdWfZkmr46qJTmnRXy9D2nUXROq-q6k3awMzobwCh0WJX434Q05-Nf7qiEmgMPKMCtC2lAxF13iaPIR4b8x3-ZoI7QoYlEwFlTxTGLvCDOIJ8hkVK0rXZk30-NyDC5HxPva70Sc95IhRbPHJMdJXymaHQtsEowuEveoRBBCCIHB3XeFBpeNxWfEszNKGagQP9if7gkvl8IElwkwaUL0i0jncpdHxm9eHhI"
                      />
                    </div>
                    <div className="bg-primary p-8 rounded-card text-on-primary shadow-lg">
                      <p className="font-headline-md text-headline-md">24/7</p>
                      <p className="font-caption text-caption opacity-80">Emergency Support</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-secondary-container p-8 rounded-card text-on-secondary-container shadow-lg">
                      <p className="font-headline-md text-headline-md">5.0</p>
                      <div className="flex text-on-secondary-container mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                        ))}
                      </div>
                      <p className="font-caption text-caption">Google Rating</p>
                    </div>
                    <div className="rounded-card overflow-hidden h-80 shadow-md">
                      <img
                        className="w-full h-full object-cover"
                        alt="Dental clinic waiting area"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuANaUx_Th12slr_fA9cdQ6Pleow6hfgjy9eKbTXR-V_nl_jdZK3eYrB3ofB1RzUXeIP83YxJUogIbIUFueFWnGniyXrtU9g3_Re7VaElH6aS_Maee1POyrPyi_EoVjjfhB_HNwSrRizVDFPtaNt5KCHncM88sv2DEjjmtnp9503cb0Pw0tkhWeGioSQxZQctIPQi8c0a0suqMJvMtop5vnNyxFATDb8dDCYF8TuIXnWcYXBB3GpjK-g8fbByX4Q-RLqZ5M2QhlYteo"
                      />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="py-section-gap bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">What Our Patients Say</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Real stories from individuals who transformed their smiles and confidence with us.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayClass="delay-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 rounded-card shadow-sm border border-outline-variant/10">
                <div className="flex gap-1 text-primary mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md italic text-on-surface mb-8">
                  "I had a fear of dentists for years, but the team here made me feel so comfortable. The dental implant procedure was completely painless!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/20">
                    <img
                      className="w-full h-full object-cover"
                      alt="James Wilson"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCymrEGsuIedMH8cMcwi7GuD7Ghtr8Rr43usO3Hy-QYtJO8eshdhjBibYgkqkV5Dxjs2zReTrKcJevGOulW-hD67kYW3Ci3A4hQ-vJmvpqmZxe-OdnQr3SQRHFvsLnKgcaj0ukN2CkHfbExjsoUdaRJMdpn4rsYGYhyEDMr9H1guXf3eJRAtoFUUHdLM6SUqxVbdsSmSMYpJkrgyR1jfrlg0ysLL_wSKvAJdjsrlw0qj2DRA4xL7TB8IUsgtwYrsjtucy7rqMgZN2U"
                    />
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">James Wilson</p>
                    <p className="font-caption text-caption text-on-surface-variant">Business Consultant</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-white p-8 rounded-card shadow-sm border border-outline-variant/10">
                <div className="flex gap-1 text-primary mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md italic text-on-surface mb-8">
                  "Best cleaning experience ever. The hygienists are incredibly gentle and the technology they use is absolutely state-of-the-art."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/20">
                    <img
                      className="w-full h-full object-cover"
                      alt="Sarah Jenkins"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5ZZTNLYpa_wWrveZxcgqznw_dxqVSRcQz_mCb4MzvE4-55QgdFDbLcSuuxLSn5LhaRr5zBUd8A36IwJLi2zeVC9ixEOYWcDtOWeMPR8eo7gfyYhjQf7ZeSUdS5ioAwtN8W9oKDIuD7Iau9f7vQeK9aefLsxecfME2ExpTPJplqbjZTu_ROxbPs6t4wSWyofRzN72MmMzJXDupjGPhsn4DroaqmT0m6wk0HarpBs9bH2LWTMDIMQWOdip671NhHj3ubPK6EN_fpIk"
                    />
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">Sarah Jenkins</p>
                    <p className="font-caption text-caption text-on-surface-variant">Creative Director</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-white p-8 rounded-card shadow-sm border border-outline-variant/10">
                <div className="flex gap-1 text-primary mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md italic text-on-surface mb-8">
                  "SmileCare fixed my alignment issues in just 6 months. I've never been more confident about my smile. Highly recommend to everyone!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/20">
                    <img
                      className="w-full h-full object-cover"
                      alt="David Chen"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpT1UPWHO9BbQt3oTlkJWCTzyTZFgX5w37fj7g3AQK78XUg8NmvTq43YPb3WG-KZ-4cbxerA1IKi8fgS2kiMQQ6Jo_aDPdNo0a1QSkZz0CCqaSBqzt-PEO8BopKWc28GPNdVswD04JCbfaY0xCJ4FIeyndxPSXDszBMoB_4OCFDMeh9tVR-OmlDKI3-dlDLlSQbKOkIeqgahkt9ECnXNYl_RhVcgVn2kail7BvSp46iYlel4GGCOZQXuRT7c5Fmwx5DIX4f5fN_mI"
                    />
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">David Chen</p>
                    <p className="font-caption text-caption text-on-surface-variant">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Appointment CTA Banner */}
      <section className="py-section-gap">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <RevealOnScroll>
            <div className="relative rounded-[32px] overflow-hidden p-12 lg:p-20 flex flex-col items-center text-center shadow-xl">
              {/* Background Image with Blur */}
              <div className="absolute inset-0 -z-10">
                <img
                  className="w-full h-full object-cover"
                  alt="Luxury dental clinic reception area"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAypiH_fervE5f2WfYkaAuGptUC6-VwHFvCU1wK8QTAWi64_uwNamSXIDDBg7Yb4pPFWAmM1WmhhqyhmiiLu-jAJa9U_-texEiG4IEhrrBtQhCC9g06Msdiu_C8-Qx8CMhJzcQ3DN77puSdQdI-3ZOnwBF6HRL5hST6rij_fuztPk1bYcat8EljCFmCsJlMZ74tn0d4CREI7cCz0YCWk8WMnJ0e53S40wfdEy0teB7sKIajzqLoPODlVNf3hAaS_6QUnCRzwxC9DUs"
                />
                <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
              </div>
              <div className="relative z-10 glass-card p-10 lg:p-16 rounded-[24px] max-w-3xl border border-white/20 shadow-2xl">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Ready for Your Perfect Smile?</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
                  Schedule your consultation today and take the first step towards a healthier, brighter smile. We are accepting new patients!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/booking"
                    className="bg-primary text-on-primary px-10 py-4 rounded-medical font-label-md text-label-md hover:bg-primary-container hover:shadow-xl transition-all transform active:scale-95"
                  >
                    Book Appointment Online
                  </Link>
                  <Link
                    to="/services"
                    className="bg-white text-primary border border-primary/20 px-10 py-4 rounded-medical font-label-md text-label-md hover:bg-surface-container-low transition-all transform active:scale-95"
                  >
                    View Pricing Plans
                  </Link>
                </div>
                <div className="mt-8 flex items-center justify-center gap-2 text-on-surface-variant font-caption text-caption">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  Available: Mon - Sat, 9:00 AM - 8:00 PM
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
