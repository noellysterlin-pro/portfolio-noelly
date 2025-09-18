"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// === Assets ===
const PORTRAIT_URL = "/portrait-noelly.jpg";
const QR_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https://www.linkedin.com/in/sterlin-noelly/";

// === Dev checks ===
function runDevChecks(name: string, arr: unknown[], min = 1) {
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    console.assert(Array.isArray(arr), `${name} doit être un tableau`);
    console.assert(arr.length >= min, `${name} doit contenir au moins ${min} élément(s)`);
  }
}

export default function PortfolioNoelly() {
  const [page, setPage] = useState<number>(0); // 0 = Profil & offres, 1 = Réalisations

  // Slide horizontal
  const slide = {
    enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0 }),
  } as const;
  const direction = page === 0 ? 1 : -1;

  // Vérifs page/toggle
  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
      console.assert(page === 0 || page === 1, `page inattendue: ${page}`);
    }
  }, [page]);

  return (
    <div
      className={[
        "min-h-screen w-full antialiased font-sans",
        // Fond global discret
        "bg-[radial-gradient(1200px_600px_at_10%_0%,#f5f5f5_0%,#ffffff_35%,#ffffff_70%)]",
        "text-[#111827]",
      ].join(" ")}
      style={{ fontFamily: 'Inter, Poppins, ui-sans-serif, system-ui, -apple-system' }}
    >
      {/* Header (foncé, gradient neutre) */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/20">
        <div className="bg-[linear-gradient(180deg,#1a1a1a_0%,#2a2a2a_100%)] text-white border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-white/20">
                <img src={PORTRAIT_URL} alt="Portrait Noelly Sterlin" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-semibold leading-tight uppercase tracking-wide">Noelly Sterlin</p>
                <p className="text-xs text-white/70">Science × Stratégie — Santé, Biotech, Nutrition</p>
              </div>
            </div>
            <nav className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden sm:inline-flex px-3 py-2 text-sm rounded-2xl border border-white/20 hover:bg-white hover:text-[#111827] transition duration-300"
              >
                Contact
              </a>
              <a
                href="https://calendly.com/"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex px-3 py-2 text-sm rounded-2xl bg-[#e11d48] text-white hover:bg-[#111827] border border-transparent hover:border-white/20 transition duration-300"
              >
                Réserver un appel
              </a>
              <button
                onClick={() => setPage(0)}
                className={`px-3 py-2 text-sm rounded-2xl transition duration-300 ${
                  page === 0
                    ? "bg-white text-[#111827]"
                    : "border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                Profil & offres
              </button>
              <button
                onClick={() => setPage(1)}
                className={`px-3 py-2 text-sm rounded-2xl transition duration-300 ${
                  page === 1
                    ? "bg-white text-[#111827]"
                    : "border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                Réalisations
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenu avec slide */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-10 min-h-[80vh]">
          <AnimatePresence custom={direction} mode="wait" initial={false}>
            {page === 0 ? (
              <motion.section
                key="page-1"
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.45 }}
              >
                {/* Hero (foncé) */}
                <section className="grid md:grid-cols-2 gap-8 items-center mb-14 rounded-2xl p-6 md:p-8 text-white bg-[radial-gradient(800px_400px_at_0%_0%,#2a2a2a_0%,#1a1a1a_60%)] shadow-sm">
                  <div className="order-2 md:order-1">
                    <h1 className="text-3xl md:text-4xl font-extrabold leading-tight uppercase tracking-tight">
                      Science × stratégie pour accélérer vos projets santé, biotech & nutrition
                    </h1>
                    <p className="mt-3 text-white/85">
                      J’aide startups et marques à <span className="font-semibold text-white">sécuriser la crédibilité scientifique</span>, <span className="font-semibold text-white">structurer la R&D</span> et <span className="font-semibold text-white">concevoir des lancements viables</span>. MBA Manager Business Unit <em>(en cours 2025–2026)</em> • ex-CNRS/ENS/Urgo • <strong>200+ dossiers techniques</strong>.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href="https://calendly.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-2xl bg-[#e11d48] text-white hover:bg.white/0 hover:text-[#111827] border border-transparent hover:border-[#e11d48] transition duration-300"
                      >
                        Réserver un appel
                      </a>
                      <a
                        href="/plaquette-noelly.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-2xl border border-white/30 text-white hover:bg-white hover:text-[#111827] transition duration-300"
                      >
                        Télécharger la plaquette
                      </a>
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                      <img
                        src={QR_URL}
                        alt="QR LinkedIn Noelly Sterlin"
                        className="h-20 w-20 border border-white/20" // carré pour lisibilité
                      />
                      <div className="text-sm text-white/80">
                        <p>Scanner pour LinkedIn</p>
                        <p className="text-xs">Lyon • Remote FR/EN</p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-3 text-xs text-white/70">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/20">CNRS</span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/20">ENS</span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/20">Urgo</span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 border border-white/20">ABGi</span>
                    </div>
                  </div>
                  <div className="order-1 md:order-2 flex justify-center md:justify-end">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl ring-4 ring-white/10">
                      <img src={PORTRAIT_URL} alt="Portrait Noelly Sterlin" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </section>

                {/* Alternance clair / neutre */}
                <Offers onSeeCases={() => setPage(1)} />
                <About />
                <Education />
                <Contact />
              </motion.section>
            ) : (
              <motion.section
                key="page-2"
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.45 }}
              >
                <Cases />
                <Skills />
                <Contact />
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Toggle mobile */}
      <div className="fixed bottom-4 left-0 right-0 mx-auto w-fit z-50">
        <div className="flex items-center gap-2 rounded-full shadow-lg bg-white border border-[#e5e7eb] px-2 py-2">
          <button
            onClick={() => setPage(0)}
            className={`px-3 py-1.5 text-sm rounded-full transition duration-300 ${
              page === 0 ? "bg-[#111827] text-white" : "hover:bg-[#f5f5f5] text-[#111827]"
            }`}
          >
            Profil
          </button>
          <button
            onClick={() => setPage(1)}
            className={`px-3 py-1.5 text-sm rounded-full transition duration-300 ${
              page === 1 ? "bg-[#111827] text-white" : "hover:bg-[#f5f5f5] text-[#111827]"
            }`}
          >
            Réalisations
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb] py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-xs text-[#6b7280] flex items-center justify-between">
          <p>© {new Date().getFullYear()} Noelly Sterlin — Freelance</p>
          <p>Lyon • Remote FR/EN</p>
        </div>
      </footer>
    </div>
  );
}

// === Sections ===
function Offers({ onSeeCases }: { onSeeCases: () => void }) {
  const cards = [
    {
      title: "Pack 1 – Starter scientifique (400–600 €)",
      bullets: [
        "Mini état de l’art (5–10 pages synthèse) basé sur documents clients",
        "1 fiche ingrédient/mécanisme (efficacité, toxicologie)",
        "3–5 recommandations simples",
      ],
      meta: "Durée 1–2 sem. • Valeur : éviter les erreurs de départ",
      price: "400–600 €",
    },
    {
      title: "Pack 2 – Roadmap R&D express (700–1 000 €)",
      bullets: [
        "Design expérimental préliminaire (objectifs, variables, plan test)",
        "Roadmap 30 jours (Excel/Notion)",
        "1 schéma visuel simplifié pour décideurs",
      ],
      meta: "Durée 2–3 sem. • Valeur : structurer le projet et gagner du temps",
      price: "700–1 000 €",
    },
    {
      title: "Pack 3 – Benchmark & stratégie marché light (1 200–1 500 €)",
      bullets: [
        "Benchmark concurrentiel (5–6 concurrents max)",
        "Mini Business Model Canvas basé sur infos clients",
        "1 proposition de valeur + 1 persona",
        "Recommandations stratégiques (positionnement + scénarios)",
      ],
      meta: "Durée 3–4 sem. • Valeur : valider avant d’engager des ressources",
      price: "1 200–1 500 €",
    },
  ] as const;

  useEffect(() => {
    runDevChecks("Offres packagées", cards as unknown as any[], 3);
    if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
      cards.forEach((c, idx) => {
        console.assert(typeof c.title === 'string' && c.title.length > 0, `Offre[${idx}] titre manquant`);
        console.assert(Array.isArray(c.bullets) && c.bullets.length >= 3, `Offre[${idx}] bullets insuffisants`);
        console.assert(typeof c.price === 'string' && /€/.test(c.price), `Offre[${idx}] prix attendu avec €`);
      });
    }
  }, []);

  return (
    <section className="mb-12 rounded-2xl bg-[#f9fafb] p-6 md:p-8 border border-transparent">
      <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-wide">Offres packagées</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <div
            key={`offer-${i}`}
            className="rounded-2xl border border-[#e5e7eb] bg-white p-5 hover:shadow-md transition duration-300"
          >
            <h3 className="font-semibold text-lg">{c.title}</h3>
            <ul className="mt-3 space-y-1 text-sm text-[#374151] list-disc list-inside">
              {c.bullets.map((b, j) => (
                <li key={`bullet-${i}-${j}`}>{b}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-[#6b7280]">{c.meta}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium">{c.price}</span>
              <a href="#contact" className="text-sm underline underline-offset-4">
                Demander un devis
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={onSeeCases}
          className="px-4 py-2 rounded-2xl border border-[#e5e7eb] bg-white text-[#111827] hover:bg-[#f5f5f5] transition duration-300"
        >
          Voir réalisations →
        </button>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="mb-8 rounded-2xl bg-white p-6 md:p-8 border border-[#e5e7eb]">
      <h2 className="text-xl md:text-2xl font-bold mb-3 uppercase tracking-wide">À propos</h2>
      <div className="max-w-none leading-relaxed">
        <p>
          Avec un parcours en <strong>biologie moléculaire et cellulaire (Bac+5)</strong>, une formation en <strong>management de l’innovation et entrepreneuriat</strong>, et un <em>MBA Manager Business Unit (2025–2026)</em> en cours, j’accompagne les marques, entrepreneurs et entreprises des secteurs santé, biotech et nutrition à transformer leurs idées en projets concrets. Ma force réside dans ma capacité à bâtir des stratégies viables et mesurables en intégrant la rigueur scientifique aux impératifs de développement économique. <strong>Mon objectif : livrer des preuves rapides et actionnables pour sécuriser vos décisions R&D et marché.</strong>
        </p>
      </div>
    </section>
  );
}

function Education() {
  const items = [
    { title: "MBA Manager Business Unit", organisation: "(en cours, 2025–2026)" },
    {
      title: "MSc Innovation & Entrepreneuriat – Management de projets d’innovation",
      organisation: "IRIIG (2023–2024)",
    },
    {
      title: "Master 2 Biologie moléculaire et cellulaire – Biologie de la peau",
      organisation: "Université Lyon 1 (2021–2023)",
    },
    {
      title: "Master 1 Ingénierie de la santé – Génie cellulaire",
      organisation: "Université de Poitiers (2019–2020)",
    },
    {
      title: "Licence Sciences de la vie – Génétique & biologie cellulaire",
      organisation: "Université Lyon 1 (2017–2019)",
    },
  ] as const;

  useEffect(() => {
    runDevChecks("Formations", items as unknown as any[], 3);
    if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
      items.forEach((it, i) => {
        console.assert(typeof (it as any).organisation === 'string', `Education[${i}] champ 'organisation' attendu`);
      });
    }
  }, []);

  return (
    <section className="mb-8 rounded-2xl bg-[#f9fafb] p-6 md:p-8 border border-transparent">
      <h2 className="text-xl md:text-2xl font-bold mb-3 uppercase tracking-wide">Formations</h2>
      <ul className="grid md:grid-cols-2 gap-3">
        {items.map((it, i) => (
          <li key={`edu-${i}`} className="rounded-2xl border border-[#e5e7eb] bg-white p-4">
            <p className="font-medium">{it.title}</p>
            <p className="text-sm text-[#6b7280]">{it.organisation}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Cases() {
  // Scientifiques
  const sci = [
    {
      tag: "ENS & Collège de France",
      title: "PervaSkin — modèle vasculaire sur puce microfluidique",
      context:
        "Culture 2D/3D de cellules endothéliales et mésenchymateuses; micro-fabrication; photolithographie.",
      action:
        "Optimisation des protocoles; conception d’un support de culture microstructuré adapté à la perfusion.",
      result:
        "Modèle de puce microfluidique vascularisée avec vasculogenèse améliorée en hydrogel; support compatible perfusion continue.",
    },
    {
      tag: "CNRS LBTI × Urgo",
      title: "GENESIS CICAT — peau reconstruite 3D (kératinocytes/fibroblastes)",
      context: "Culture 3D et tests de milieux sur kératinocytes et fibroblastes.",
      action: "Mise au point de protocoles; évaluation de la fonctionnalité tissulaire.",
      result:
        "Nouvelles données sur le comportement et la fonctionnalité des kératinocytes modifiés.",
    },
    {
      tag: "ABGi — Conseil R&D (CIR/CII)",
      title: "200+ argumentaires techniques validés",
      context: "États de l’art, audits scientifiques, calcul CIR/CII.",
      action:
        "Rédaction, chiffrage, veille technologique; coordination validation client/administration.",
      result:
        "Financements R&D obtenus pour les clients; traçabilité documentaire.",
    },
  ] as const;

  // Business
  const biz = [
    {
      tag: "Business — Safe (programme SHAKER)",
      title: "Cadrage stratégique & go-to-market",
      context:
        "Projet early-stage santé/bien-être, besoin de structurer l’offre et le modèle.",
      action:
        "Executive summary, Business Model Canvas, business plan, prévisionnel FIZY, personas, parcours client, pitch deck; recommandations priorisées 90 jours.",
      result:
        "Socle décisionnel pour go/no-go et priorisation des segments; alignement offre-marché initial.",
    },
    {
      tag: "Business — ASTACI (start-up pédagogique fictive)",
      title: "Étude de marché & POC",
      context: "Projet en phase d’exploration, incertitudes sur positionnement.",
      action:
        "Benchmark (6 concurrents), BMC, persona, proposition de valeur, POC et pitch stratégique.",
      result:
        "Clarification du positionnement; base chiffrée pour itérations et décision go/no-go.",
    },
    {
      tag: "Business — start-up de bijoux artisanaux",
      title: "Positionnement & pitch court",
      context: "Marque en démarrage, besoin d’un récit clair.",
      action:
        "Executive summary, proposition de valeur, mini pitch deck; présentation au jury.",
      result:
        "Narratif de marque clarifié; messages prêts pour premières prospections.",
    },
  ] as const;

  useEffect(() => {
    runDevChecks("Cas scientifiques", sci as unknown as any[], 3);
    runDevChecks("Cas business", biz as unknown as any[], 3);
    if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
      const tags = biz.map(b => b.tag);
      console.assert(tags.some(t => t.includes("ASTACI (start-up pédagogique fictive)")), "Tag ASTACI attendu");
      console.assert(tags.some(t => t.includes("start-up de bijoux artisanaux")), "Tag bijoux artisanaux attendu");
    }
  }, []);

  return (
    <section className="mb-12 rounded-2xl bg-white p-6 md:p-8 border border-[#e5e7eb]">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide">Réalisations & preuves</h2>
        <a href="#contact" className="text-sm underline underline-offset-4">
          Demander des extraits anonymisés
        </a>
      </div>

      <h3 className="text-sm font-medium text-[#6b7280] mb-2">Scientifiques</h3>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {sci.map((c, i) => (
          <article key={`sci-${i}`} className="rounded-2xl border border-[#e5e7eb] p-5 bg-white hover:shadow-sm transition duration-300">
            <p className="text-xs text-[#6b7280]">{c.tag}</p>
            <h4 className="mt-1 font-semibold">{c.title}</h4>
            <ul className="mt-3 text-sm text-[#374151] space-y-1">
              <li>
                <span className="font-medium">Contexte :</span> {c.context}
              </li>
              <li>
                <span className="font-medium">Action :</span> {c.action}
              </li>
              <li>
                <span className="font-medium">Résultat :</span> {c.result}
              </li>
            </ul>
          </article>
        ))}
      </div>

      <h3 className="text-sm font-medium text-[#6b7280] mb-2">Business</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {biz.map((c, i) => (
          <article key={`biz-${i}`} className="rounded-2xl border border-[#e5e7eb] p-5 bg-white hover:shadow-sm transition duration-300">
            <p className="text-xs text-[#6b7280]">{c.tag}</p>
            <h4 className="mt-1 font-semibold">{c.title}</h4>
            <ul className="mt-3 text-sm text-[#374151] space-y-1">
              <li>
                <span className="font-medium">Contexte :</span> {c.context}
              </li>
              <li>
                <span className="font-medium">Action :</span> {c.action}
              </li>
              <li>
                <span className="font-medium">Résultat :</span> {c.result}
              </li>
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const cats = [
    { name: "Science & veille", items: ["PubMed", "Zotero", "Raindrop"] },
    { name: "Data", items: ["Excel/Sheets", "GraphPad", "ImageJ"] },
    { name: "Orga", items: ["Notion", "Airtable", "ClickUp"] },
    { name: "Com & valorisation", items: ["PowerPoint", "Canva", "Microsoft Word", "LibreOffice", "OpenOffice"] },
    { name: "IA appliquée", items: ["Automatisations doc", "Structuration avancée", "Prompt design"] },
  ] as const;

  return (
    <section className="mb-10 rounded-2xl bg-[#f9fafb] p-6 md:p-8 border border-transparent">
      <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-wide">Compétences & outils (sélection)</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {cats.map((c, i) => (
          <div key={`skill-${i}`} className="rounded-2xl border border-[#e5e7eb] p-5 bg-white hover:shadow-sm transition duration-300">
            <h3 className="font-semibold">{c.name}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {c.items.map((it, j) => (
                <span
                  key={`chip-${i}-${j}`}
                  className="text-xs px-2 py-1 rounded-full border border-[#e5e7eb] bg-[#f5f5f5]"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mb-4 rounded-2xl bg-white p-6 md:p-8 border border-[#e5e7eb]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide">Travaillons ensemble</h2>
          <p className="text-sm text-[#374151]">
            Email :
            <a className="underline underline-offset-4 ml-1" href="mailto:noelly.sterlin.pro@gmail.com">
              noelly.sterlin.pro@gmail.com
            </a>
            
            • LinkedIn :
            <a
              className="underline underline-offset-4 ml-1"
              href="https://www.linkedin.com/in/sterlin-noelly/"
              target="_blank"
              rel="noreferrer"
            >
              /in/sterlin-noelly
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://calendly.com/"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-2xl bg-[#e11d48] text-white hover:bg-[#111827] border border-transparent hover:border-[#e11d48] transition duration-300"
          >
            Réserver un appel
          </a>
        </div>
      </div>
    </section>
  );
}
