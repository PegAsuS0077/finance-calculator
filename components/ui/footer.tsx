import React from 'react';
import Link from 'next/link';
import {
  Mail,
  MapPin
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative pt-32 pb-12 overflow-hidden" style={{ background: "var(--f-page)" }}>
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 max-w-7xl mx-auto">

          {/* Brand */}
          <div className="group">
            <div className="flex items-center mb-8">
              <svg width="48" height="48" viewBox="0 0 64 64" fill="none" aria-hidden className="group-hover:scale-105 transition-transform duration-300" style={{ flexShrink: 0 }}>
                <defs>
                  <linearGradient id="fbg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0f0c29"/>
                    <stop offset="100%" stopColor="#302b63"/>
                  </linearGradient>
                  <linearGradient id="fline" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24"/>
                    <stop offset="100%" stopColor="#f59e0b"/>
                  </linearGradient>
                  <linearGradient id="ffill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35"/>
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="14" fill="url(#fbg)"/>
                <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1"/>
                <polygon points="10,46 20,38 30,40 40,28 54,16 54,46" fill="url(#ffill)"/>
                <polyline points="10,46 20,38 30,40 40,28 54,16" stroke="url(#fline)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <circle cx="54" cy="16" r="3" fill="#fbbf24"/>
                <line x1="10" y1="50" x2="54" y2="50" stroke="white" strokeOpacity="0.12" strokeWidth="1"/>
              </svg>
              <span className="ml-3 text-xl font-bold tracking-tight" style={{ color: "var(--f-text-heading)" }}>
                Freedom<span style={{ color: "var(--f-blue)" }}>Calc</span>
              </span>
            </div>
            <p className="leading-relaxed" style={{ color: "var(--f-text-muted)", fontSize: "0.9rem" }}>
              Free financial independence calculators for the FIRE movement. No signup, no tracking, no BS.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="text-lg font-bold tracking-tight mb-6" style={{ color: "var(--f-text-heading)" }}>Calculators</h4>
            <ul className="space-y-4">
              {[
                { label: "FIRE Calculator", href: "/fire-calculator" },
                { label: "FIRE Number", href: "/fire-number-calculator" },
                { label: "Coast FIRE", href: "/coast-fire-calculator" },
                { label: "Savings Rate", href: "/savings-rate-calculator" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors duration-300 flex items-center group" style={{ color: "var(--f-text-faint)", textDecoration: "none", fontSize: "0.8125rem" }}>
                    <span className="w-1.5 h-1.5 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "var(--f-blue)" }}></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold tracking-tight mb-6" style={{ color: "var(--f-text-heading)" }}>Resources</h4>
            <ul className="space-y-4">
              {[
                { label: "Blog", href: "/blog" },
                { label: "What is FIRE?", href: "/blog/what-is-fire" },
                { label: "The 4% Rule", href: "/blog/4-percent-rule-explained" },
                { label: "Savings Rate Guide", href: "/blog/savings-rate-and-retirement" },
                { label: "Coast FIRE Explained", href: "/blog/coast-fire-explained" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors duration-300 flex items-center group" style={{ color: "var(--f-text-faint)", textDecoration: "none", fontSize: "0.8125rem" }}>
                    <span className="w-1.5 h-1.5 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "var(--f-blue)" }}></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold tracking-tight mb-6" style={{ color: "var(--f-text-heading)" }}>Company</h4>
            <ul className="space-y-4">
              <li className="flex items-center" style={{ color: "var(--f-text-faint)", fontSize: "0.8125rem" }}>
                <MapPin className="w-4 h-4 mr-2" style={{ color: "var(--f-text-faint)" }} />
                Free &amp; open to everyone
              </li>
              <li>
                <a href="mailto:contact@freedomcalc.dev" className="transition-colors duration-300 flex items-center group" style={{ color: "var(--f-text-faint)", textDecoration: "none", fontSize: "0.8125rem" }}>
                  <Mail className="w-4 h-4 mr-2" style={{ color: "var(--f-text-faint)" }} />
                  contact@freedomcalc.dev
                </a>
              </li>
              {[
                { label: "About", href: "/about" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors duration-300 flex items-center group" style={{ color: "var(--f-text-faint)", textDecoration: "none", fontSize: "0.8125rem" }}>
                    <span className="w-1.5 h-1.5 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "var(--f-blue)" }}></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 text-center" style={{ borderTop: "1px solid var(--f-border)" }}>
          <p style={{ color: "var(--f-text-faint)", fontSize: "0.75rem" }}>
            © {new Date().getFullYear()} FreedomCalc. For educational purposes only — not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
