import Image from "next/image";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#05070a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="text-xl font-bold tracking-wider">
            HG<span className="text-cyan-400">.</span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
            <a href="#accueil" className="transition hover:text-cyan-400">
              Accueil
            </a>

            <a href="#apropos" className="transition hover:text-cyan-400">
              À propos
            </a>

            <a href="#competences" className="transition hover:text-cyan-400">
              Compétences
            </a>

            <a href="#projets" className="transition hover:text-cyan-400">
              Projets
            </a>

            <a href="#contact" className="transition hover:text-cyan-400">
              Contact
            </a>

          </div>

          <a
            href="#contact"
            className="rounded-full border border-cyan-400/40 px-5 py-2 text-sm transition hover:bg-cyan-400 hover:text-black"
          >
            Me contacter
          </a>

        </div>
      </nav>


      {/* HERO */}
      <section
        id="accueil"
        className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
      >
        {/* ================= EFFETS LUMINEUX ================= */}
        <div className="pointer-events-none absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="pointer-events-none absolute right-[10%] top-[25%] h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

        {/* Grille très discrète */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:50px_50px]" />

        {/* ================= CONTENU ================= */}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 md:grid-cols-2">

          {/* ================= TEXTE ================= */}
          <div className="animate-[fadeInUp_0.8s_ease-out]">

            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              Portfolio • Engineering • Technology
            </p>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl">
              Ingénieur
              <br />
              <span className="text-cyan-400">
                Électronique
              </span>
            </h1>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
              Compétences
            </p>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Ce que je
              <br />
              <span className="text-cyan-400">
                maîtrise.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
              Je conçois et développe des systèmes électroniques intelligents,
              des systèmes embarqués et des solutions IoT orientées vers des
              applications concrètes.
            </p>

            {/* ================= DOMAINES ================= */}
            <div className="mt-7 flex flex-wrap gap-3">

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:text-cyan-400">
                Embedded Systems
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:text-cyan-400">
                IoT
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:text-cyan-400">
                Automatisation
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:text-cyan-400">
                Power Electronics
              </span>

            </div>

            {/* ================= BOUTONS ================= */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">

              <a
                href="#projets"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/20 active:translate-y-0"
              >
                Voir mes projets →
              </a>

              <a
                href="/documents/CV-Hardy-Gates.pdf"
                download
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10 active:translate-y-0"
              >
                Télécharger mon CV
              </a>

            </div>

          </div>


          {/* ================= PHOTO DE PROFIL ================= */}
          <div className="flex justify-center md:justify-end">

            <div className="relative flex flex-col items-center">

              {/* Halo lumineux — discret sur mobile */}
              <div className="absolute inset-2 rounded-full bg-cyan-400/10 blur-2xl md:-inset-8 md:blur-3xl md:animate-pulse" />

              {/* Cercle décoratif supplémentaire — uniquement sur ordinateur */}
              <div className="absolute -inset-3 hidden rounded-full border border-cyan-400/10 md:block" />

              {/* PHOTO */}
              <div
                className="
        relative
        h-64 w-64
        overflow-hidden
        rounded-full
        border border-cyan-400/30
        shadow-[0_0_45px_rgba(34,211,238,0.12)]
        transition duration-500
        hover:border-cyan-400/60

        sm:h-72 sm:w-72

        md:h-[420px] md:w-[420px]
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
              <div
                className="
        relative z-10
        mt-4
        max-w-[92vw]
        rounded-full
        border border-white/10
        bg-black/90
        px-4 py-2
        text-center
        text-[10px]
        font-medium
        leading-5
        text-cyan-400
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
                Électronique • Systèmes embarqués • Internet des objets
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* À PROPOS */}
      <section
        id="apropos"
        className="border-t border-white/10 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">

          {/* En-tête */}
          <div className="max-w-3xl">

            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
              À propos de moi
            </p>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Construire. Comprendre.
              <br />
              <span className="text-cyan-400">
                Innover.
              </span>
            </h2>

          </div>


          {/* Contenu */}
          <div className="mt-14 grid gap-12 md:grid-cols-2">

            {/* Présentation */}
            <div>

              <p className="text-lg leading-8 text-gray-300">
                Je suis étudiant en ingénierie électronique, avec un intérêt
                particulier pour les systèmes embarqués, l'IoT, l'automatisation
                et l'électronique de puissance.
              </p>

              <p className="mt-6 leading-8 text-gray-400">
                Ma démarche ne se limite pas aux enseignements académiques.
                J'aime transformer une idée en prototype concret, expérimenter
                avec différents composants, programmer des systèmes et comprendre
                chaque étape qui permet de passer du concept à une solution
                fonctionnelle.
              </p>

              <p className="mt-6 leading-8 text-gray-400">
                À travers mes projets, je cherche à développer une approche
                d'ingénieur basée sur la conception, l'expérimentation, la
                résolution de problèmes et l'amélioration continue.
              </p>

            </div>


            {/* Informations */}
            <div className="grid gap-4 sm:grid-cols-2">

              {/* Carte 1 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">

                <div className="text-2xl text-cyan-400">
                  ⚡
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  Électronique
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Conception et expérimentation autour des circuits et systèmes
                  électroniques.
                </p>

              </div>


              {/* Carte 2 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">

                <div className="text-2xl text-cyan-400">
                  ◈
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  Systèmes embarqués
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Microcontrôleurs, capteurs, actionneurs et systèmes intelligents.
                </p>

              </div>


              {/* Carte 3 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">

                <div className="text-2xl text-cyan-400">
                  ◎
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  IoT
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Objets connectés, acquisition de données, communication et
                  supervision.
                </p>

              </div>


              {/* Carte 4 */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">

                <div className="text-2xl text-cyan-400">
                  ⚙
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  Automatisation
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Commande, contrôle et développement de systèmes automatisés.
                </p>

              </div>

            </div>

          </div>


          {/* Citation / philosophie */}
          <div className="mt-16 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-8 md:p-10">

            <p className="text-xl font-medium leading-8 text-gray-200 md:text-2xl">
              « Je ne veux pas seulement utiliser la technologie.
              Je veux comprendre comment elle fonctionne,
              la concevoir et créer des solutions avec elle. »
            </p>

            <div className="mt-5 h-px w-16 bg-cyan-400" />

            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-gray-500">
              Engineering mindset
            </p>

          </div>

        </div>
      </section>

      <Skills />


      {/* PROJETS - PLACEHOLDER POUR L'INSTANT */}
      <Projects />
      <Experience />
      <Contact />

      {/* FOOTER */}
      <footer
        id="contact"
        className="border-t border-white/10 px-6 py-12"
      >

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">

          <div>
            <div className="text-xl font-bold">
              HG<span className="text-cyan-400">.</span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Electronics • Embedded Systems • IoT • Automation
            </p>
          </div>

          <p className="text-sm text-gray-600">
            © 2026 — Portfolio personnel
          </p>

        </div>

      </footer>

    </main>
  );
}