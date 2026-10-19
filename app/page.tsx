import Image from "next/image";

import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ThemeToggle from "@/components/ThemeToggle";

import {
  getPublicExperiences,
} from "@/lib/content/experiences";

import {
  getHeroContent,
} from "@/lib/content/hero";

import {
  getAboutContent,
} from "@/lib/content/about";

import {
  getPublicSkills,
} from "@/lib/content/skills";

import {
  getContactSettings,
  getGlobalSettings,
} from "@/lib/content/site-settings";


export default async function Home() {

  const [
    hero,
    about,
    skillCategories,
    experiences,
    contactSettings,
    globalSettings,
  ] = await Promise.all([
    getHeroContent(),
    getAboutContent(),
    getPublicSkills(),
    getPublicExperiences(),
    getContactSettings(),
    getGlobalSettings(),
  ]);


  return (
    <main
      className="
        min-h-screen
        bg-[var(--portfolio-bg)]
        text-[var(--portfolio-text)]
        transition-colors
        duration-300
      "
    >

      {/* =====================================================
          NAVBAR
          ===================================================== */}
      <nav
        className="
          fixed top-0 z-50 w-full
          border-b
          border-[var(--portfolio-border)]
          bg-[var(--portfolio-nav-bg)]
          backdrop-blur-xl
          transition-colors
          duration-300
        "
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* LOGO */}
          <div className="text-xl font-bold tracking-wider">
            HG
            <span className="text-[var(--portfolio-accent)]">
              .
            </span>
          </div>


          {/* NAVIGATION DESKTOP */}
          <div className="hidden items-center gap-8 text-sm text-[var(--portfolio-text-secondary)] md:flex">

            <a
              href="#accueil"
              className="transition hover:text-[var(--portfolio-accent)]"
            >
              Accueil
            </a>

            <a
              href="#apropos"
              className="transition hover:text-[var(--portfolio-accent)]"
            >
              À propos
            </a>

            <a
              href="#competences"
              className="transition hover:text-[var(--portfolio-accent)]"
            >
              Compétences
            </a>

            <a
              href="#projets"
              className="transition hover:text-[var(--portfolio-accent)]"
            >
              Projets
            </a>

            <a
              href="#contact"
              className="transition hover:text-[var(--portfolio-accent)]"
            >
              Contact
            </a>

          </div>


          {/* ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3">

            <ThemeToggle />

            <a
              href="#contact"
              className="
                rounded-full
                border
                border-cyan-400/40
                px-4 py-2
                text-sm
                transition
                hover:bg-[var(--portfolio-accent)]
                hover:text-[var(--portfolio-accent-text)]
                sm:px-5
              "
            >
              Me contacter
            </a>

          </div>

        </div>
      </nav>


      {/* =====================================================
          HERO
          ===================================================== */}
      <section
        id="accueil"
        className="
          relative
          flex
          min-h-screen
          items-center
          overflow-hidden
          px-6
          pt-24
        "
      >

        {/* EFFETS LUMINEUX */}
        <div
          className="
            pointer-events-none
            absolute
            left-[10%]
            top-[15%]
            h-72 w-72
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[10%]
            top-[25%]
            h-80 w-80
            rounded-full
            bg-blue-600/10
            blur-3xl
          "
        />


        {/* GRILLE */}
        <div
          className="
            portfolio-grid
            pointer-events-none
            absolute
            inset-0
          "
        />


        {/* CONTENU */}
        <div
          className="
            relative z-10
            mx-auto
            grid
            w-full
            max-w-7xl
            items-center
            gap-16
            md:grid-cols-2
          "
        >

          {/* =================================================
              TEXTE HERO
              ================================================= */}
          <div className="animate-[fadeInUp_0.8s_ease-out]">

            <p
              className="
                mb-5
                text-sm
                font-medium
                uppercase
                tracking-[0.3em]
                text-[var(--portfolio-accent)]
              "
            >
              {hero.eyebrow}
            </p>


            <h1
              className="
                text-4xl
                font-bold
                leading-tight
                tracking-tight
                sm:text-5xl
                md:text-7xl
              "
            >
              {hero.titleLine1}

              <br />

              <span className="text-[var(--portfolio-accent)]">
                {hero.titleAccent}
              </span>
            </h1>


            <p
              className="
                text-sm
                uppercase
                tracking-[0.3em]
                text-[var(--portfolio-accent)]
              "
            >
              {hero.sectionLabel}
            </p>


            <h2 className="mt-3 text-4xl font-bold md:text-5xl">

              {hero.masteryLine1}

              <br />

              <span className="text-[var(--portfolio-accent)]">
                {hero.masteryAccent}
              </span>

            </h2>


            <p
              className="
                mt-6
                max-w-xl
                text-lg
                leading-8
                text-[var(--portfolio-text-secondary)]
              "
            >
              {hero.description}
            </p>


            {/* DOMAINES */}
            <div className="mt-7 flex flex-wrap gap-3">

              {hero.badges.map((badge) => (

                <span
                  key={badge}
                  className="
                    rounded-full
                    border
                    border-[var(--portfolio-border)]
                    bg-[var(--portfolio-surface)]
                    px-4 py-2
                    text-sm
                    text-[var(--portfolio-text-secondary)]
                    backdrop-blur-sm
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:border-cyan-400/40
                    hover:text-[var(--portfolio-accent)]
                  "
                >
                  {badge}
                </span>

              ))}

            </div>


            {/* BOUTONS */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">

              {/* PROJETS */}
              <a
                href="#projets"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--portfolio-accent)]
                  px-7 py-3
                  font-semibold
                  text-[var(--portfolio-accent-text)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:brightness-110
                  hover:shadow-lg
                  hover:shadow-cyan-400/20
                  active:translate-y-0
                "
              >
                {hero.primaryButtonLabel} →
              </a>


              {/* CV */}
              <a
                href="/documents/CV-Hardy-Gates.pdf"
                download
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                  px-7 py-3
                  text-sm
                  font-semibold
                  text-[var(--portfolio-text)]
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-400/50
                  hover:bg-[var(--portfolio-surface-hover)]
                  hover:text-[var(--portfolio-accent)]
                  hover:shadow-lg
                  hover:shadow-cyan-400/10
                  active:translate-y-0
                "
              >
                {hero.secondaryButtonLabel}
              </a>

            </div>

          </div>


          {/* =================================================
              PHOTO DE PROFIL
              ================================================= */}
          <div className="flex justify-center md:justify-end">

            <div className="relative flex flex-col items-center">

              {/* Halo */}
              <div
                className="
                  absolute
                  inset-2
                  rounded-full
                  bg-cyan-400/10
                  blur-2xl
                  md:-inset-8
                  md:animate-pulse
                  md:blur-3xl
                "
              />


              {/* Cercle décoratif desktop */}
              <div
                className="
                  absolute
                  -inset-3
                  hidden
                  rounded-full
                  border
                  border-cyan-400/10
                  md:block
                "
              />


              {/* PHOTO */}
              <div
                className="
                  relative
                  h-64 w-64
                  overflow-hidden
                  rounded-full
                  border
                  border-cyan-400/30
                  shadow-[0_0_45px_rgba(34,211,238,0.12)]
                  transition
                  duration-500
                  hover:border-cyan-400/60

                  sm:h-72
                  sm:w-72

                  md:h-[420px]
                  md:w-[420px]
                  md:shadow-[0_0_80px_rgba(34,211,238,0.15)]
                  md:hover:scale-[1.02]
                  md:hover:shadow-[0_0_100px_rgba(34,211,238,0.25)]
                "
              >
                <Image
                  src="/images/profile/hardy.jpg"
                  alt="Hardy Gates - Ingénieur électronique"
                  fill
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 420px"
                  className="object-cover"
                />
              </div>


              {/* BADGE */}
              {hero.profileBadge && (

                <div
                  className="
                    relative z-10
                    mt-4
                    max-w-[92vw]
                    rounded-full
                    border
                    border-[var(--portfolio-border)]
                    bg-[var(--portfolio-badge-bg)]
                    px-4 py-2
                    text-center
                    text-[10px]
                    font-medium
                    leading-5
                    text-[var(--portfolio-accent)]
                    shadow-xl
                    backdrop-blur-xl

                    sm:text-xs

                    md:absolute
                    md:-bottom-5
                    md:left-1/2
                    md:mt-0
                    md:-translate-x-1/2
                    md:whitespace-nowrap
                    md:px-5
                  "
                >
                  {hero.profileBadge}
                </div>

              )}

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          À PROPOS
          ===================================================== */}
      <section
        id="apropos"
        className="
          border-t
          border-[var(--portfolio-border)]
          px-6
          py-24
        "
      >

        <div className="mx-auto max-w-7xl">

          {/* EN-TÊTE */}
          <div className="max-w-3xl">

            <p
              className="
                text-sm
                uppercase
                tracking-[0.3em]
                text-[var(--portfolio-accent)]
              "
            >
              {about.eyebrow}
            </p>


            <h2 className="mt-3 text-4xl font-bold md:text-5xl">

              {about.titleLine1} {about.titleLine2}

              <br />

              <span className="text-[var(--portfolio-accent)]">
                {about.titleAccent}
              </span>

            </h2>

          </div>


          {/* CONTENU */}
          <div className="mt-14 grid gap-12 md:grid-cols-2">

            {/* PRÉSENTATION */}
            <div>

              <p
                className="
                  text-lg
                  leading-8
                  text-[var(--portfolio-text-secondary)]
                "
              >
                {about.description}
              </p>


              {about.secondaryDescription && (

                <p
                  className="
                    mt-6
                    leading-8
                    text-[var(--portfolio-muted)]
                  "
                >
                  {about.secondaryDescription}
                </p>

              )}


              {about.thirdDescription && (

                <p
                  className="
                    mt-6
                    leading-8
                    text-[var(--portfolio-muted)]
                  "
                >
                  {about.thirdDescription}
                </p>

              )}

            </div>


            {/* INFORMATIONS */}
            <div className="grid gap-4 sm:grid-cols-2">

              {/* CARTE 1 */}
              <div
                className="
                  rounded-2xl
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                  p-6
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-400/40
                  hover:bg-[var(--portfolio-surface-hover)]
                "
              >

                <div className="text-2xl text-[var(--portfolio-accent)]">
                  ⚡
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  Électronique
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-[var(--portfolio-muted)]
                  "
                >
                  Conception et expérimentation autour des circuits et systèmes
                  électroniques.
                </p>

              </div>


              {/* CARTE 2 */}
              <div
                className="
                  rounded-2xl
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                  p-6
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-400/40
                  hover:bg-[var(--portfolio-surface-hover)]
                "
              >

                <div className="text-2xl text-[var(--portfolio-accent)]">
                  ◈
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  Systèmes embarqués
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-[var(--portfolio-muted)]
                  "
                >
                  Microcontrôleurs, capteurs, actionneurs et systèmes intelligents.
                </p>

              </div>


              {/* CARTE 3 */}
              <div
                className="
                  rounded-2xl
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                  p-6
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-400/40
                  hover:bg-[var(--portfolio-surface-hover)]
                "
              >

                <div className="text-2xl text-[var(--portfolio-accent)]">
                  ◎
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  IoT
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-[var(--portfolio-muted)]
                  "
                >
                  Objets connectés, acquisition de données, communication et
                  supervision.
                </p>

              </div>


              {/* CARTE 4 */}
              <div
                className="
                  rounded-2xl
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                  p-6
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-400/40
                  hover:bg-[var(--portfolio-surface-hover)]
                "
              >

                <div className="text-2xl text-[var(--portfolio-accent)]">
                  ⚙
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  Automatisation
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-[var(--portfolio-muted)]
                  "
                >
                  Commande, contrôle et développement de systèmes automatisés.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              CITATION / PHILOSOPHIE
              ================================================= */}
          <div
            className="
              mt-16
              rounded-2xl
              border
              border-cyan-400/10
              bg-cyan-400/[0.03]
              p-8
              md:p-10
            "
          >

            <p
              className="
                text-xl
                font-medium
                leading-8
                text-[var(--portfolio-text-secondary)]
                md:text-2xl
              "
            >
              « Je ne veux pas seulement utiliser la technologie.
              Je veux comprendre comment elle fonctionne,
              la concevoir et créer des solutions avec elle. »
            </p>


            <div
              className="
                mt-5
                h-px
                w-16
                bg-[var(--portfolio-accent)]
              "
            />


            <p
              className="
                mt-4
                text-sm
                uppercase
                tracking-[0.2em]
                text-[var(--portfolio-muted)]
              "
            >
              Engineering mindset
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          COMPÉTENCES
          ===================================================== */}
      <Skills
        categories={skillCategories}
      />


      {/* =====================================================
          PROJETS
          ===================================================== */}
      <Projects />


      {/* =====================================================
          EXPÉRIENCES
          ===================================================== */}
      <Experience
        experiences={experiences}
      />


      {/* =====================================================
          CONTACT
          ===================================================== */}
      <Contact
        settings={contactSettings}
      />


      {/* ================= FOOTER ================= */}
      <footer
        className="
    border-t
    border-[var(--portfolio-border)]
    px-6
    py-12
  "
      >
        <div
          className="
      mx-auto
      flex
      max-w-7xl
      flex-col
      justify-between
      gap-6
      md:flex-row
      md:items-end
    "
        >
          <div>

            <div
              className="
          text-xl
          font-bold
          text-[var(--portfolio-text)]
        "
            >
              {globalSettings.brand}

              <span className="text-[var(--portfolio-accent)]">
                .
              </span>
            </div>

            <p
              className="
          mt-2
          text-sm
          text-[var(--portfolio-muted)]
        "
            >
              {globalSettings.tagline}
            </p>

          </div>

          <p
            className="
        text-sm
        text-[var(--portfolio-muted)]
      "
          >
            {globalSettings.footerCopyright}
          </p>

        </div>
      </footer>

    </main>
  );
}