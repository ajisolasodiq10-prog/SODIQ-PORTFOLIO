import { useState, useEffect } from "react";
import heroPhoto from "./assets/my-pic.jpg";
// import MYCV from "./public/AJISOLA_CV.docx";
import emailjs from "@emailjs/browser";

// ── Data ──────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About",     href: "#about"        },
  { label: "Skills",    href: "#skills"       },
  { label: "Projects",  href: "#projects"     },
  { label: "Experience",href: "#experience"   },
  { label: "Contact",   href: "#contact"      },
];

const SKILLS = [
  {
    group: "Frontend",
    items: [
      { name: "HTML5 & CSS3",       note: "strong" },
      { name: "Vanilla JavaScript", note: "strong" },
      { name: "React",              note: "learning" },
      { name: "SEO",              note: "learning" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js",        note: "confident" },
      { name: "Express.js",     note: "confident" },
      { name: "REST API Design",note: "confident" },
      { name: "JWT Auth",       note: "confident" },
      { name: "bcrypt",         note: "confident" },
    ],
  },
  {
    group: "Database",
    items: [
      { name: "MongoDB",   note: "confident" },
      { name: "Mongoose",  note: "confident" },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Git & GitHub", note: "confident" },
      { name: "Postman",      note: "confident" },
      { name: "Render",       note: "deployed"  },
      { name: "Vercel",       note: "deployed"  },
    ],
  },
];

const PROJECTS = [
  {
    id: 1,
    badge: "Featured",
    icon:"🏥",
    name: "Hospital Appointment System",
    problem: "Patients waste hours queueing to see a doctor manually.",
    desc: "A digital platform that lets patients book appointments online from the comfort of their homes and gives admins a full dashboard to manage schedules, eliminating the need to queue.",
    features: ["Patient Booking", "Admin Dashboard", "JWT Auth", "Role-Based Access", "Appointment Management"],
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB", "JWT", "bcrypt"],
    liveUrl: "https://hospital-system-rn2h.onrender.com/",
    githubUrl: "https://github.com/ajisolasodiq10-prog",
    deployed: true,
  },
  {
    id: 2,
    badge: "Full Stack",
    icon: "🛍️",
    name: "LuxStore E-Commerce Platform",
    problem: "Small businesses need a complete online store without expensive SaaS platforms.",
    desc: "A production-structured e-commerce application with full product management, cart system, checkout, and a complete admin dashboard for managing products, orders, and users.",
    features: ["Product Search", "Cart & Checkout", "Order Tracking", "Admin Dashboard", "Stock Management"],
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB", "JWT", "bcrypt"],
    liveUrl: "https://luxstore-three.vercel.app/",
    githubUrl: "https://github.com/ajisolasodiq10-prog",
    deployed: true,
  },
];

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <hr className="section-divider" />
        <About />
        <hr className="section-divider" />
        <Skills />
        <hr className="section-divider" />
        <Projects />
        <hr className="section-divider" />
        <Experience />
        <hr className="section-divider" />
        <Testimonials />
        <hr className="section-divider" />
        <Contact />
      </main>
      <hr className="section-divider" />
      <Footer />
    </>
  );
}

const TYPEWRITER_WORDS = [
  "Full Stack Web Developer",
  "Backend Engineer",
  "API Architect",
  "Problem Solver",
];

// ── Typewriter Hook ───────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 2000) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx] || "";
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }, speed / 2);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return words[wordIdx]?.slice(0, charIdx) || "";
}

// ── Nav Component ─────────────────────────────────────────────
function Nav({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav style={{ boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none" }}>
        <div className="nav-logo">
          <span style={{color: "var(--text2)"}}>{""}</span>
          BV
          <span style={{color: "var(--text2)"}}>{" "}</span>
        </div>

        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => { e.preventDefault(); handleNavClick(l.href); }}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{display:"flex", alignItems:"center", gap:"12px"}}>
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === "dark" ? "☀" : "◑"}
          </button>
          <div className="hamburger" onClick={() => setMenuOpen(o => !o)}>
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} onClick={e => { e.preventDefault(); handleNavClick(l.href); }}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}

// ── Hero Component ────────────────────────────────────────────
function Hero() {
  const typed = useTypewriter(TYPEWRITER_WORDS, 75, 2200);

  return (
    <section id="home">
      <div className="hero-inner">
        {/* Left */}
        <div>
          <div className="hero-tag fade-up-1">
            Available for freelance work
          </div>
          <div className="hero-tag fade-up-1">
            Available for remote job opportunities
          </div>

          <h1 className="hero-name fade-up-2">
            Ajisola<br />
            <span className="accent">Sodiq.</span>
          </h1>

          <p className="hero-title fade-up-3">
            {typed}<span className="cursor" />
          </p>

          <p className="hero-desc fade-up-4">
            I build complete web applications from clean responsive interfaces
            to secure, scalable backends to solve digital problems. Every project ships with real authentication,
            real data, and real deployment.
          </p>

          <div className="hero-btns fade-up-5">
            <a href="#projects" className="btn-primary" onClick={e => { e.preventDefault(); document.querySelector("#projects").scrollIntoView({behavior:"smooth"}); }}>
              View Projects ↓
            </a>
            <a href="#contact" className="btn-outline" onClick={e => { e.preventDefault(); document.querySelector("#contact").scrollIntoView({behavior:"smooth"}); }}>
              Hire Me
            </a>
            <a
              href="https://wa.me/2348123218575"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{borderColor:"#25d366", color:"#000"}}
            >
              💬 WhatsApp
            </a>
          </div>

          <div className="stack-row fade-up-5">
            <span className="stack-label">Stack:</span>
            {["Node.js","Express","MongoDB","JWT","React"].map(s => (
              <span key={s} className="stack-tag">{s}</span>
            ))}
          </div>
        </div>

        {/* Right — Photo */}
        <div className="hero-photo-wrap fade-up-3">
          <img
            src={heroPhoto}
            alt="Ajisola Sodiq"
            className="hero-photo"
          />
          <div className="hero-photo-badge">
            <div className="num">1+</div>
            <div className="label">Years building</div>
          </div>
          <div className="hero-photo-badge2">
            {" fullStack: true "}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── About Component ───────────────────────────────────────────
function About() {
  return (
    <section id="about">
      <div className="section-label">01. About</div>
      <h2 className="section-title">Who I Am</h2>
      <p className="section-sub">
        Self-taught, project-driven, and focused on building things that actually work.
      </p>

      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm <strong>Ajisola Sodiq</strong>, a self-taught Full Stack Developer with
             <strong>1+ year</strong> of hands-on experience building web applications
            from scratch — no bootcamp, no shortcuts.
          </p>
          <p>
            I work across the full stack: designing interfaces with HTML, CSS, and JavaScript
            on the frontend, and building secure, structured backends with <strong>Node.js,
            Express, MongoDB, and JWT authentication</strong>.
          </p>
          <p>
            I don't just write code. I build systems that work in productionto sovling real problems, with proper
            authentication, role-based access control, clean API design, and real deployment.
            Currently expanding into <strong>React</strong> to build faster, more dynamic frontends.
          </p>
          <p>
            I'm open to working with clients globally on any industry that needs reliable
            web solutions built the right way.
          </p>
          <div style={{marginTop: "24px"}}>
            <a
              href="/AJISOLA_CV.docx"
              className="btn-outline"
              style={{fontSize:"0.78rem"}}
              onClick={e => e.preventDefault()}
              title="AJISOLA CV"
            >
              📄 Download CV <span style={{fontSize:"0.6rem", color:"var(--text3)", marginLeft:"4px"}}></span>
            </a>
          </div>
        </div>

        {/* Terminal */}
        <div className="terminal">
          <div className="terminal-bar">
            <div className="terminal-dot red" />
            <div className="terminal-dot yellow" />
            <div className="terminal-dot green" />
            <span style={{marginLeft:"8px", fontSize:"0.65rem", color:"var(--text3)", fontFamily:"Space Mono"}}>about Me</span>
          </div>
          <div className="terminal-body">
            <div><span className="t-comment"> *Ajisola Sodiq*</span></div>
            <div><span className="t-key">name</span>: <span className="t-str">"Ajisola Sodiq"</span></div>
            <div><span className="t-key">role</span>: <span className="t-str">"Full Stack Developer"</span></div>
            <div><span className="t-key">experience</span>: <span className="t-val">"~1 year"</span></div>
            <div><span className="t-key">location</span>: <span className="t-str">"Nigeria 🇳🇬"</span></div>
            <div><span className="t-key">available</span>: <span className="t-val">true</span></div>
            <div><span className="t-key">openTo</span>: <span className="t-str">"Remote / Freelance"</span></div>
            <div><span className="t-key">learning</span>: </div>
            <div>&nbsp;&nbsp;<span className="t-str">"React"</span></div>
            <div>&nbsp;&nbsp;<span className="t-str">"Advanced Patterns"</span></div>
            <div></div>
            <div><span className="t-key">contact</span>: <span className="t-str">"ajisolasodiq10@gmail.com"</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Skills Component ─────────────────────────────────────────-
function Skills() {
  return (
    <section id="skills">
      <div className="section-label">02. Skills</div>
      <h2 className="section-title">Things I Work With</h2>
      <p className="section-sub">
        Only tools I can actually defend, no fake inflation.
      </p>

      <div className="skills-grid">
        {SKILLS.map(group => (
          <div className="skill-group" key={group.group}>
            <div className="skill-group-label">{group.group}</div>
            {group.items.map(item => (
              <div className="skill-item" key={item.name}>
                <div className="skill-dot" />
                {item.name}
                <span className="skill-note">{item.note}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Projects Component ───────────────────────────────────────-
function Projects() {
  return (
    <section id="projects">
      <div className="section-label">03. Projects</div>
      <h2 className="section-title">Things I've Built</h2>
      <p className="section-sub">
        Real applications, real backends, real deployment.
        Not tutorials, original solutions to real problems.
      </p>

      <div className="projects-list">
        {PROJECTS.map(project => (
          <div
            key={project.id}
            className={`project-card ${project.badge === "Featured" ? "featured" : ""}`}
          >
            <div className="project-visual">
              <div className="project-icon">{project.icon}</div>
              <div className="project-number">0{project.id}</div>
            </div>

            <div className="project-info">
              <div className="project-badge">
                {project.deployed
                  ? <span style={{color:"var(--green)"}}>● LIVE</span>
                  : <span style={{color:"var(--text3)"}}>● LOCAL</span>
                }
                &nbsp;{project.badge}
              </div>

              <h3 className="project-name">{project.name}</h3>
              <p className="project-problem">Problem: {project.problem}</p>
              <p className="project-desc">{project.desc}</p>

              <div className="project-features">
                {project.features.map(f => (
                  <span key={f} className="feature-tag">{f}</span>
                ))}
              </div>

              <div className="project-stack">
                {project.stack.map(s => (
                  <span key={s} className="stack-chip">{s}</span>
                ))}
              </div>

              <div className="project-links">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-link primary">
                    ↗ Live Demo
                  </a>
                )}
                {project.liveUrl === "#" && (
                  <span className="proj-link primary" style={{opacity:0.6, cursor:"default"}}>
                    ↗ Live Demo
                  </span>
                )}
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="proj-link">
                  ⌥ GitHub
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Placeholder for next project */}
        <div className="coming-soon-card">
          <div style={{fontSize:"2rem", marginBottom:"12px", opacity:0.3}}>⚡</div>
          <p>Next project in progress — React frontend</p>
          <p style={{marginTop:"4px", opacity:0.6}}>Coming soon</p>
        </div>
      </div>
    </section>
  );
}

// ── Experience Component ──────────────────────────────────────
function Experience() {
  return (
    <section id="experience">
      <div className="section-label">04. Experience</div>
      <h2 className="section-title">How I've Grown</h2>
      <p className="section-sub">
        Self-taught and project-driven, every line of experience earned by building real things.
      </p>

      <div className="exp-card">
        <div className="exp-line">
          <div className="exp-dot" />
          <div className="exp-track" />
        </div>
        <div>
          <div className="exp-role">Self-Taught Full Stack Developer</div>
          <div className="exp-org">Independent — Remote</div>
          <div className="exp-period">2023 — Present · ~2 years</div>
          <ul className="exp-points">
            <li>Built and deployed full-stack web applications independently from scratch</li>
            <li>Designed and implemented secure REST APIs with JWT authentication and role-based access control</li>
            <li>Developed a Hospital Appointment System eliminating patient queueing, deployed on Render</li>
            <li>Built a production-structured e-commerce platform with admin dashboard, cart, and order management</li>
            <li>Worked across the full stack: UI design, server logic, database design, and deployment</li>
            <li>Currently expanding into React to build faster, component-driven frontends</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials Component ────────────────────────────────────
function Testimonials() {
  return (
    <section id="testimonials">
      <div className="section-label">05. Testimonials</div>
      <h2 className="section-title">What People Say</h2>
      <p className="section-sub">
        Feedback from people I've worked with and built for.
      </p>

      <div className="testimonials-grid">
        {[1, 2, 3].map(i => (
          <div key={i} className="testimonial-card placeholder-testimonial">
            <div style={{fontSize:"2rem", opacity:0.2}}>💬</div>
            <p>Testimonial</p>
            <p style={{opacity:0.5}}>Add your client feedback here</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Contact Component ─────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "success" | "error"

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const sendEmail = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }

    if (emailjs && typeof emailjs.send === "function") {
      emailjs
        .send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
        .then(() => {
          setStatus("success");
          setForm({ name: "", email: "", message: "" });
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
        });

      return;
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    const opened = window.open(`mailto:ajisolasodiq10@gmail.com?subject=${subject}&body=${body}`);

    if (opened) {
      opened.focus?.();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  const CONTACT_LINKS = [
    { icon: "✉", label: "Email", val: "ajisolasodiq10@gmail.com", href: "mailto:ajisolasodiq10@gmail.com" },
    { icon: "💬", label: "WhatsApp", val: "+234 812 321 8575", href: "https://wa.me/2348123218575", style: { borderColor: "rgba(205, 37, 211, 0.3)" } },
    { icon: "⌥", label: "GitHub", val: "ajisolasodiq10-prog", href: "https://github.com/ajisolasodiq10-prog" },
    { icon: "in", label: "LinkedIn", val: "Sodiq Ajisola", href: "https://www.linkedin.com/in/sodiq-ajisola-b0b7433ba", style: { fontFamily: "Georgia, serif", fontWeight: "bold" } },
  ];

  return (
    <section id="contact">
      <div className="section-label">06. Contact</div>
      <h2 className="section-title">Let's Work Together</h2>
      <p className="section-sub">Have a project in mind? Let's talk. I'm available for freelance work globally.</p>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>
            Whether you need a full web application, a REST API, or want to discuss a project, I'm open. Response time is usually within 24 hours.
          </p>

          <div className="contact-links">
            {CONTACT_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="contact-link"
                style={l.style || {}}
              >
                <div className="contact-link-icon">{l.icon}</div>
                <div>
                  <div className="contact-link-label">{l.label}</div>
                  <div className="contact-link-val">{l.val}</div>
                </div>
                <span style={{ marginLeft: "auto", color: "var(--text3)", fontSize: "0.8rem" }}>→</span>
              </a>
            ))}
          </div>
        </div>

        <form className="contact-form" onSubmit={sendEmail}>
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea name="message" rows={5} value={form.message} onChange={handleChange} placeholder="Tell me about your project…" />
          </div>

          <div className={`form-status ${status === "success" ? "success" : status === "error" ? "error" : ""}`}>
            {status === "success" && "✓ Message sent! I'll get back to you shortly."}
            {status === "error" && "✕ Please fill in all fields before sending."}
          </div>

          <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
            Send Message →
          </button>
        </form>
      </div>
    </section>
  );
}

// ── Footer Component ──────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <p>
        {" "}· Built by Ajisola Sodiq
      </p>
      <p>
        <a href="mailto:ajisolasodiq10@gmail.com">ajisolasodiq10@gmail.com</a>
      </p>
    </footer>
  );
}
