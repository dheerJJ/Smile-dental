import React from 'react';
import { Link } from 'react-router-dom';

const SERVICES_DATA = [
  {
    title: 'Dental Checkup',
    icon: 'health_and_safety',
    description: 'Comprehensive screening to maintain peak oral health and catch potential issues early.',
    features: ['Digital X-ray imaging', 'Oral cancer screening'],
  },
  {
    title: 'Teeth Cleaning',
    icon: 'cleaning_services',
    description: 'Professional scaling and polishing for a refreshingly clean and plaque-free smile.',
    features: ['Plaque & tartar removal', 'High-gloss polishing'],
  },
  {
    title: 'Root Canal',
    icon: 'biotech',
    description: 'Painless endodontic therapy designed to save your natural teeth from infection.',
    features: ['Minimally invasive approach', 'Advanced local anesthesia'],
  },
  {
    title: 'Dental Implants',
    icon: 'rebase_edit',
    description: 'Permanent, biocompatible solutions to replace missing teeth with natural look and feel.',
    features: ['Titanium base integration', 'Custom-fitted crowns'],
  },
  {
    title: 'Orthodontics',
    icon: 'grid_view',
    description: 'Precision alignment for teeth and jaws to improve both function and facial aesthetics.',
    features: ['Self-ligating braces', 'Bite correction therapy'],
  },
  {
    title: 'Invisalign',
    icon: 'visibility_off',
    description: 'Straighten your teeth discreetly with virtually invisible clear custom aligners.',
    features: ['Removable for easy hygiene', '3D treatment planning'],
  },
  {
    title: 'Teeth Whitening',
    icon: 'flare',
    description: 'Brighten your smile by several shades with our safe, high-potency whitening system.',
    features: ['In-office professional laser', 'Custom take-home kits'],
  },
  {
    title: 'Veneers',
    icon: 'layers',
    description: 'Ultra-thin porcelain shells designed to correct chips, gaps, and permanent staining.',
    features: ['Natural translucency match', 'Stain-resistant porcelain'],
  },
  {
    title: 'Smile Makeover',
    icon: 'auto_fix_high',
    description: 'A holistic combination of cosmetic treatments for a complete dental transformation.',
    features: ['Digital Smile Design preview', 'Phased treatment plans'],
  },
  {
    title: 'Emergency Care',
    icon: 'emergency',
    description: 'Priority same-day appointments for urgent pain relief and trauma management.',
    features: ['Immediate pain management', 'Trauma-first response'],
    isEmergency: true,
  },
];

export default function Services() {
  return (
    <div className="bg-background text-on-background font-body-md">
      {/* Hero / Header Section */}
      <header className="pt-16 pb-12 bg-surface-container-low border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <nav aria-label="Breadcrumb" className="flex mb-6 text-on-surface-variant opacity-70">
            <ol className="flex items-center space-x-2 font-caption text-caption">
              <li>
                <Link className="hover:text-primary transition-colors" to="/">Home</Link>
              </li>
              <li>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </li>
              <li className="font-semibold text-primary">Services</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-4">Our Premium Dental Services</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Experience world-class dental care combining advanced clinical technology with an empathetic approach to your comfort. Our specialists offer a comprehensive suite of treatments tailored to your unique smile journey.
            </p>
          </div>
        </div>
      </header>

      {/* Services Grid Canvas */}
      <main className="py-section-gap">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {SERVICES_DATA.map((service, idx) => (
              <article
                key={idx}
                className={`service-card group bg-surface-container-lowest p-8 rounded-[24px] border border-outline-variant/30 shadow-[0px_20px_24px_-4px_rgba(19,27,46,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  service.isEmergency ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                }`}>
                  <span className="material-symbols-outlined text-[32px]">{service.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3">{service.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 font-caption text-on-surface-variant">
                      <span className={`material-symbols-outlined text-[18px] ${
                        service.isEmergency ? 'text-error' : 'text-primary'
                      }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {service.isEmergency ? (
                  <a
                    href="tel:+91800SMILE"
                    className="inline-flex items-center gap-1 font-label-md hover:underline text-error"
                  >
                    Call Now <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                ) : (
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-1 font-label-md hover:underline text-primary"
                  >
                    Learn More <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
