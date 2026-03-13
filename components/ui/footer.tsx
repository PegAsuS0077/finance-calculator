import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Instagram,
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
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300" style={{ background: "var(--f-blue)" }}>
                <TrendingUp className="h-6 w-6" />
              </div>
              <span className="ml-3 text-xl font-bold tracking-tight" style={{ color: "var(--f-text-heading)" }}>
                Fin<span style={{ color: "var(--f-blue)" }}>Calc</span>
              </span>
            </div>
            <p className="leading-relaxed mb-8" style={{ color: "var(--f-text-muted)", fontSize: "0.9rem" }}>
              Free financial independence calculators for the FIRE movement. No signup, no tracking, no BS.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Instagram, href: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105"
                  style={{ background: "var(--f-card)", border: "1px solid var(--f-border)", color: "var(--f-text-muted)" }}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
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
                { label: "4% Rule", href: "/4-percent-rule-calculator" },
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

          {/* More Tools */}
          <div>
            <h4 className="text-lg font-bold tracking-tight mb-6" style={{ color: "var(--f-text-heading)" }}>More Tools</h4>
            <ul className="space-y-4">
              {[
                { label: "Compound Interest", href: "/compound-interest-calculator" },
                { label: "Investment Growth", href: "/investment-growth-calculator" },
                { label: "Retirement Timeline", href: "/retirement-timeline-calculator" },
                { label: "Lean FIRE", href: "/lean-fire-calculator" },
                { label: "Barista FIRE", href: "/barista-fire-calculator" },
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
                <a href="mailto:hello@fincalc.app" className="transition-colors duration-300 flex items-center group" style={{ color: "var(--f-text-faint)", textDecoration: "none", fontSize: "0.8125rem" }}>
                  <Mail className="w-4 h-4 mr-2" style={{ color: "var(--f-text-faint)" }} />
                  hello@fincalc.app
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
            © {new Date().getFullYear()} FinCalc. For educational purposes only — not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
