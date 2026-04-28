import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/7a8eee21-12aa-4bc3-8336-361bab780227/bucket/1fe9f944-08f9-4ee1-9afc-c2ec18fcd079.jpeg";
const SEA_IMG = "https://cdn.poehali.dev/projects/7a8eee21-12aa-4bc3-8336-361bab780227/bucket/71afc66e-b0f9-4629-a838-d12b43027633.jpg";
const SPA_IMG = "https://cdn.poehali.dev/projects/7a8eee21-12aa-4bc3-8336-361bab780227/bucket/6ad4d16e-9102-4a0b-9fac-dee274fe27e4.jpg";
const ROOM_IMG = "https://cdn.poehali.dev/projects/7a8eee21-12aa-4bc3-8336-361bab780227/bucket/ba58beee-df37-4c85-93f3-25cadb336bce.jpg";
const SPA2_IMG = "https://cdn.poehali.dev/projects/7a8eee21-12aa-4bc3-8336-361bab780227/bucket/45d7c892-9841-4384-91c7-3a500499f799.jpeg";
const CEDAR_IMG = "https://cdn.poehali.dev/projects/7a8eee21-12aa-4bc3-8336-361bab780227/bucket/af6886a1-3a29-412f-bd17-b563445278f1.jpg";

// Цвета
const C = {
  teal: "#3A8F7F",
  tealLight: "#6BB8A8",
  tealPale: "#E8F4F1",
  sky: "#A8D5E2",
  skyPale: "#EBF6FA",
  cream: "#F5F2EC",
  stone: "#2C3E38",
  stoneMid: "#4A6560",
  stoneLight: "#8BAF9A",
  gold: "#B89A5E",
  white: "#FFFFFF",
  border: "rgba(58,143,127,0.18)",
  borderLight: "rgba(58,143,127,0.10)",
};

const programs = [
  {
    title: "СПА-перезагрузка: антистресс",
    duration: "3–4 ночи",
    desc: "Три дня у моря, за которые тело вспоминает, что такое расслабление, а голова — тишина. Кедровая бочка снимает напряжение глубже, чем выходные на диване. Галокамера очищает дыхание, а мягкий подводный массаж возвращает лёгкость в спину и плечи. Вы уедете не просто отдохнувшей — вы уедете с энергией, которой не хватало последние месяцы.",
    icon: "Wind",
    color: C.sky,
    colorBg: C.skyPale,
  },
  {
    title: "СПА-перезагрузка: восстановление",
    duration: "7 ночей",
    desc: "Неспешная неделя у моря, где всё подчинено одному — вашему комфорту и восстановлению. Барокамера насыщает клетки кислородом, возвращая бодрость без кофеина. Курс галокамеры и магнитотерапии мягко работает с суставами и дыханием. А механотерапия и подводный массаж убирают скованность, о которой вы уже привыкли не замечать. К концу недели замечаешь: спится лучше, настроение ровнее, и сил до вечера хватает.",
    icon: "Heart",
    color: C.teal,
    colorBg: C.tealPale,
  },
];

const packages = [
  {
    name: "СПА-перезагрузка: антистресс",
    label: "",
    duration: "3–4 ночи",
    price: "25 000 ₽",
    features: [
      "Проживание в номере выбранной категории",
      "Завтраки — шведский стол",
      "Консультация специалиста",
      "Жемчужные ванны × 3",
      "Кедровая бочка × 2",
      "Галокамера × 1 (40 мин)",
      "Магнитотерапия «Мультимаг» × 1",
      "Подводный душ-массаж × 1",
      "Бассейн и тренажёрный зал",
      "Скидка 1 900 ₽ в SEA SPA",
    ],
    highlight: false,
  },
  {
    name: "СПА-перезагрузка: восстановление",
    label: "",
    duration: "7 ночей",
    price: "55 000 ₽",
    features: [
      "Проживание в номере выбранной категории",
      "Завтраки — шведский стол",
      "Консультация специалиста",
      "Жемчужные ванны × 5",
      "Барокамера (оксигенация) × 3",
      "Галокамера × 5",
      "Магнитотерапия «Мультимаг» × 4",
      "Механотерапия «Сераджем» × 4",
      "Подводный душ-массаж × 3",
      "Уход за кожей лица × 2",
      "Бассейн и тренажёрный зал",
      "Скидка 1 900 ₽ в SEA SPA",
    ],
    highlight: true,
  },
];

const infrastructure = [
  { icon: "Waves", title: "Аквазона", desc: "Бассейн с морской водой и гидромассажем" },
  { icon: "Sparkles", title: "СПА-центр SEA SPA", desc: "Оздоровительные и косметологические процедуры" },
  { icon: "Dumbbell", title: "Тренажёрный зал", desc: "Современное оборудование, групповые занятия" },
  { icon: "Wind", title: "Галокамера", desc: "Спелеотерапия — очищение дыхания и иммунитет" },
  { icon: "Zap", title: "Физиотерапия", desc: "Магнитотерапия, барокамера, механотерапия" },
  { icon: "Utensils", title: "Ресторан", desc: "Завтраки «шведский стол», черноморская кухня" },
];

const reviews = [
  {
    name: "Ольга М.",
    city: "Москва",
    rating: 5,
    text: "Взяла программу «Восстановление» на 7 ночей. Каждый день — новая процедура. Галокамера и барокамера особенно понравились. Уехала другим человеком.",
    program: "СПА: восстановление",
  },
  {
    name: "Сергей К.",
    city: "Краснодар",
    rating: 5,
    text: "Приехал с женой на «Антистресс». Кедровая бочка и жемчужные ванны — это что-то невероятное. Море, горы и полный покой. Рекомендую всем!",
    program: "СПА: антистресс",
  },
  {
    name: "Наталья Р.",
    city: "Ростов-на-Дону",
    rating: 5,
    text: "Бархатные Сезоны — настоящее место силы. Персонал внимательный, процедуры подбираются индивидуально. Уже планируем следующий визит.",
    program: "СПА: восстановление",
  },
];

const gallery = [
  { src: SPA2_IMG, caption: "СПА-ритуалы" },
  { src: SEA_IMG, caption: "Черное море · Сириус" },
  { src: SPA_IMG, caption: "Жемчужные ванны" },
  { src: ROOM_IMG, caption: "Номера отеля" },
  { src: CEDAR_IMG, caption: "Кедровая бочка" },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function Index() {
  const [activeGallery, setActiveGallery] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: C.cream, color: C.stone, minHeight: "100vh" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{
        background: scrolled ? "rgba(245,242,236,0.96)" : "rgba(245,242,236,0)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-cormorant text-2xl font-medium tracking-wide" style={{ color: C.teal }}>
            Бархатные Сезоны
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[["programs", "Программы"], ["packages", "Пакеты"], ["infra", "Инфраструктура"], ["gallery", "Галерея"], ["reviews", "Отзывы"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="font-golos text-sm uppercase tracking-wider transition-colors duration-300"
                style={{ color: C.stoneMid, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em" }}
                onMouseEnter={e => e.currentTarget.style.color = C.teal}
                onMouseLeave={e => e.currentTarget.style.color = C.stoneMid}
              >{label}</button>
            ))}
            <button onClick={() => scrollTo("booking")}
              className="font-golos text-sm px-5 py-2 uppercase tracking-wider transition-all duration-300 cursor-pointer"
              style={{ background: C.teal, color: C.white, border: "none", letterSpacing: "0.1em" }}
              onMouseEnter={e => e.currentTarget.style.background = "#2D7265"}
              onMouseLeave={e => e.currentTarget.style.background = C.teal}
            >Бронировать</button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} style={{ color: C.teal }} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(245,242,236,0.98)", borderTop: `1px solid ${C.border}` }}>
            {[["programs", "Программы"], ["packages", "Пакеты"], ["infra", "Инфраструктура"], ["gallery", "Галерея"], ["reviews", "Отзывы"], ["booking", "Бронировать"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left font-golos text-sm uppercase tracking-wider"
                style={{ color: C.stoneMid, background: "none", border: "none", cursor: "pointer" }}>{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100vh" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})`, transform: "scale(1.04)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(245,242,236,0.15) 0%, rgba(58,143,127,0.25) 40%, rgba(245,242,236,0.85) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(245,242,236,0.95) 100%)" }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="font-golos text-sm uppercase mb-5 animate-fade-in"
            style={{ color: C.teal, letterSpacing: "0.3em", animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
            Город-отель · Сириус, Черное море
          </div>
          <h1 className="font-cormorant font-light mb-5 animate-fade-in"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", lineHeight: 0.95, animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}>
            <span className="shimmer-text">Бархатные Сезоны</span>
          </h1>
          <p className="font-cormorant italic text-xl md:text-2xl mb-10 animate-fade-in"
            style={{ color: C.stoneMid, animationDelay: "0.7s", opacity: 0, animationFillMode: "forwards", fontWeight: 300 }}>
            Оздоровление на берегу Чёрного моря
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "1s", opacity: 0, animationFillMode: "forwards" }}>
            <button onClick={() => scrollTo("programs")}
              className="font-golos px-8 py-4 text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer"
              style={{ background: C.teal, color: C.white, border: "none", letterSpacing: "0.15em" }}
              onMouseEnter={e => e.currentTarget.style.background = "#2D7265"}
              onMouseLeave={e => e.currentTarget.style.background = C.teal}
            >Выбрать программу</button>
            <button onClick={() => scrollTo("gallery")}
              className="font-golos px-8 py-4 text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer"
              style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${C.border}`, color: C.stone, letterSpacing: "0.15em" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.borderColor = C.teal; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = C.border; }}
            >Смотреть галерею</button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <Icon name="ChevronDown" size={24} style={{ color: C.teal, opacity: 0.6 }} />
        </div>
      </section>

      {/* NUMBERS */}
      <section className="py-14 px-6" style={{ background: C.white, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["12+", "лет на рынке"], ["4 000", "гостей в год"], ["96%", "рекомендуют нас"], ["43", "процедуры в меню"]].map(([num, label]) => (
            <Reveal key={label}>
              <div className="font-cormorant text-5xl font-light mb-1" style={{ color: C.teal }}>{num}</div>
              <div className="font-golos text-xs uppercase tracking-widest" style={{ color: C.stoneLight }}>{label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-24 px-6" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <div className="font-golos text-xs uppercase tracking-[0.3em] mb-3" style={{ color: C.teal }}>Wellness Programs</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light" style={{ color: C.stone }}>Программы города-отеля</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <div className="group p-8 cursor-default transition-all duration-400 h-full"
                  style={{ background: p.colorBg, border: `1px solid ${C.border}` }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(58,143,127,0.12)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "none"}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 flex items-center justify-center rounded-full" style={{ background: C.white, border: `1px solid ${C.border}` }}>
                      <Icon name={p.icon} size={20} style={{ color: p.color }} />
                    </div>
                    <div className="font-golos text-xs uppercase tracking-widest" style={{ color: C.stoneLight }}>{p.duration}</div>
                  </div>
                  <h3 className="font-cormorant text-2xl mb-3" style={{ color: C.stone }}>{p.title}</h3>
                  <p className="font-golos text-sm leading-relaxed" style={{ color: C.stoneMid }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="py-24 px-6" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <div className="font-golos text-xs uppercase tracking-[0.3em] mb-3" style={{ color: C.teal }}>Состав пакетов</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light" style={{ color: C.stone }}>Пакеты и услуги</h2>
            <p className="font-golos text-sm mt-3 max-w-xl mx-auto" style={{ color: C.stoneMid }}>
              Каждый пакет включает проживание, оздоровительную программу, питание и доступ к инфраструктуре
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 140}>
                <div className="relative p-8 h-full flex flex-col transition-all duration-400"
                  style={{
                    border: pkg.highlight ? `2px solid ${C.teal}` : `1px solid ${C.border}`,
                    background: pkg.highlight ? C.tealPale : C.white,
                  }}>
                  {pkg.highlight && (
                    <div className="absolute -top-3 left-8 px-4 py-1 font-golos text-xs uppercase tracking-widest"
                      style={{ background: C.teal, color: C.white }}>
                      Расширенный
                    </div>
                  )}
                  <div className="mb-5">
                    <h3 className="font-cormorant text-2xl mb-1" style={{ color: C.stone }}>{pkg.name}</h3>
                    <div className="font-golos text-sm mb-2" style={{ color: C.stoneLight }}>{pkg.duration}</div>
                    <div className="font-cormorant text-3xl font-medium" style={{ color: C.teal }}>{pkg.price}</div>
                  </div>
                  <ul className="flex-1 space-y-2.5 mb-8">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-start gap-3 font-golos text-sm" style={{ color: C.stoneMid }}>
                        <span className="mt-0.5 shrink-0" style={{ color: C.teal }}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo("booking")}
                    className="w-full py-3 font-golos text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer"
                    style={{
                      background: pkg.highlight ? C.teal : "transparent",
                      color: pkg.highlight ? C.white : C.teal,
                      border: pkg.highlight ? "none" : `1px solid ${C.teal}`,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = pkg.highlight ? "#2D7265" : C.tealPale; }}
                    onMouseLeave={e => { e.currentTarget.style.background = pkg.highlight ? C.teal : "transparent"; }}
                  >Выбрать пакет</button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infra" className="py-24 px-6" style={{ background: C.skyPale }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <div className="font-golos text-xs uppercase tracking-[0.3em] mb-3" style={{ color: C.teal }}>Facilities</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light" style={{ color: C.stone }}>Инфраструктура</h2>
            <p className="font-golos text-sm mt-3 max-w-lg mx-auto" style={{ color: C.stoneMid }}>
              Всё необходимое для восстановления — в одном пространстве на берегу моря
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {infrastructure.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="p-7 transition-all duration-300 group"
                  style={{ background: C.white, border: `1px solid ${C.border}` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.teal; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(58,143,127,0.1)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.border; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: C.tealPale }}>
                    <Icon name={item.icon} size={20} style={{ color: C.teal }} />
                  </div>
                  <h3 className="font-cormorant text-xl mb-2" style={{ color: C.stone }}>{item.title}</h3>
                  <p className="font-golos text-sm" style={{ color: C.stoneMid }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <div className="font-golos text-xs uppercase tracking-[0.3em] mb-3" style={{ color: C.teal }}>Gallery</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light" style={{ color: C.stone }}>Галерея</h2>
          </Reveal>
          <div className="w-full overflow-hidden cursor-pointer mb-4 relative group"
            style={{ border: `1px solid ${C.border}`, aspectRatio: "21/9" }}
            onClick={() => setActiveGallery((activeGallery + 1) % gallery.length)}>
            <img src={gallery[activeGallery].src} alt={gallery[activeGallery].caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end p-6"
              style={{ background: "linear-gradient(to top, rgba(44,62,56,0.55) 0%, transparent 50%)" }}>
              <div className="flex items-center justify-between w-full">
                <span className="font-cormorant italic text-2xl text-white">{gallery[activeGallery].caption}</span>
                <span className="font-golos text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.7)" }}>{activeGallery + 1} / {gallery.length}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {gallery.map((g, i) => (
              <div key={i} className="overflow-hidden cursor-pointer relative"
                style={{
                  border: i === activeGallery ? `2px solid ${C.teal}` : `1px solid ${C.border}`,
                  aspectRatio: "1/1",
                  transition: "border-color 0.3s",
                }}
                onClick={() => setActiveGallery(i)}>
                <img src={g.src} alt={g.caption} className="w-full h-full object-cover transition-all duration-500 hover:scale-110" />
                {i !== activeGallery && <div className="absolute inset-0" style={{ background: "rgba(245,242,236,0.35)" }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6" style={{ background: C.white }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <div className="font-golos text-xs uppercase tracking-[0.3em] mb-3" style={{ color: C.teal }}>Guest Reviews</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light" style={{ color: C.stone }}>Отзывы гостей</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 100}>
                <div className="p-8 h-full flex flex-col" style={{ background: C.cream, border: `1px solid ${C.border}` }}>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <span key={j} style={{ color: C.gold }}>★</span>
                    ))}
                  </div>
                  <p className="font-cormorant italic text-lg leading-relaxed flex-1 mb-6" style={{ color: C.stone }}>
                    «{r.text}»
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-golos text-sm font-medium" style={{ color: C.stone }}>{r.name}</div>
                      <div className="font-golos text-xs" style={{ color: C.stoneLight }}>{r.city}</div>
                    </div>
                    <div className="font-golos text-xs uppercase tracking-wider px-3 py-1"
                      style={{ border: `1px solid ${C.teal}`, color: C.teal }}>
                      {r.program}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 px-6" style={{ background: C.tealPale }}>
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-12">
            <div className="font-golos text-xs uppercase tracking-[0.3em] mb-3" style={{ color: C.teal }}>Reservation</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-3" style={{ color: C.stone }}>Бронирование</h2>
            <p className="font-golos text-sm" style={{ color: C.stoneMid }}>
              Оставьте заявку — менеджер свяжется с вами в течение 30 минут
            </p>
          </Reveal>
          <Reveal delay={200}>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-golos text-xs uppercase tracking-widest block mb-2" style={{ color: C.stoneMid }}>Имя</label>
                  <input type="text" placeholder="Ваше имя"
                    className="w-full px-4 py-3 font-golos text-sm outline-none transition-all duration-300"
                    style={{ border: `1px solid ${C.border}`, color: C.stone, background: C.white }}
                    onFocus={e => e.target.style.borderColor = C.teal}
                    onBlur={e => e.target.style.borderColor = C.border} />
                </div>
                <div>
                  <label className="font-golos text-xs uppercase tracking-widest block mb-2" style={{ color: C.stoneMid }}>Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 font-golos text-sm outline-none transition-all duration-300"
                    style={{ border: `1px solid ${C.border}`, color: C.stone, background: C.white }}
                    onFocus={e => e.target.style.borderColor = C.teal}
                    onBlur={e => e.target.style.borderColor = C.border} />
                </div>
              </div>
              <div>
                <label className="font-golos text-xs uppercase tracking-widest block mb-2" style={{ color: C.stoneMid }}>Программа</label>
                <select className="w-full px-4 py-3 font-golos text-sm outline-none"
                  style={{ border: `1px solid ${C.border}`, color: C.stone, background: C.white }}>
                  <option value="">Выберите программу</option>
                  {programs.map(p => <option key={p.title}>{p.title} — {p.duration}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-golos text-xs uppercase tracking-widest block mb-2" style={{ color: C.stoneMid }}>Дата заезда</label>
                  <input type="date"
                    className="w-full px-4 py-3 font-golos text-sm outline-none transition-all duration-300"
                    style={{ border: `1px solid ${C.border}`, color: C.stone, background: C.white }}
                    onFocus={e => e.target.style.borderColor = C.teal}
                    onBlur={e => e.target.style.borderColor = C.border} />
                </div>
                <div>
                  <label className="font-golos text-xs uppercase tracking-widest block mb-2" style={{ color: C.stoneMid }}>Кол-во гостей</label>
                  <select className="w-full px-4 py-3 font-golos text-sm outline-none"
                    style={{ border: `1px solid ${C.border}`, color: C.stone, background: C.white }}>
                    {["1 гость", "2 гостя", "3 гостя", "4 гостя", "5+ гостей"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="font-golos text-xs uppercase tracking-widest block mb-2" style={{ color: C.stoneMid }}>Пожелания</label>
                <textarea rows={3} placeholder="Особые пожелания, вопросы..."
                  className="w-full px-4 py-3 font-golos text-sm outline-none resize-none transition-all duration-300"
                  style={{ border: `1px solid ${C.border}`, color: C.stone, background: C.white }}
                  onFocus={e => e.target.style.borderColor = C.teal}
                  onBlur={e => e.target.style.borderColor = C.border} />
              </div>
              <button type="submit"
                className="w-full py-4 font-golos text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer"
                style={{ background: C.teal, color: C.white, border: "none", fontWeight: 500, letterSpacing: "0.15em" }}
                onMouseEnter={e => e.currentTarget.style.background = "#2D7265"}
                onMouseLeave={e => e.currentTarget.style.background = C.teal}
              >Отправить заявку</button>
              <p className="text-center font-golos text-xs" style={{ color: C.stoneLight }}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6" style={{ background: C.stone, color: C.cream }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-cormorant text-2xl tracking-wide mb-1" style={{ color: C.tealLight }}>Бархатные Сезоны</div>
            <div className="font-golos text-xs uppercase tracking-widest opacity-50">Город-отель · Сириус, Черное море</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            {["+7 (862) 200-00-00", "info@barkhatnye-sezony.ru"].map(c => (
              <span key={c} className="font-golos text-sm opacity-60">{c}</span>
            ))}
          </div>
          <div className="font-golos text-xs opacity-30">© 2026 Бархатные Сезоны. Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
}