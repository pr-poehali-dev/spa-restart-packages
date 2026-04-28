import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/7a8eee21-12aa-4bc3-8336-361bab780227/files/9e42c9b7-e70f-4034-9703-7ddfd73b133e.jpg";
const SPA_IMG = "https://cdn.poehali.dev/projects/7a8eee21-12aa-4bc3-8336-361bab780227/files/91a4b364-a6a2-47a4-928a-1b8b34a3dfd9.jpg";
const ROOM_IMG = "https://cdn.poehali.dev/projects/7a8eee21-12aa-4bc3-8336-361bab780227/files/83245ab6-6135-46a8-924a-228711cb9b86.jpg";

const programs = [
  {
    title: "Детокс",
    duration: "5 дней",
    desc: "Полное очищение организма: авторские процедуры, детокс-питание и медитации на рассвете.",
    price: "от 42 000 ₽",
    icon: "Leaf",
  },
  {
    title: "Антистресс",
    duration: "3 дня",
    desc: "Глубокое расслабление через телесные практики, флоатинг и сеансы с психологом.",
    price: "от 28 000 ₽",
    icon: "Wind",
  },
  {
    title: "Восстановление",
    duration: "7 дней",
    desc: "Комплексная программа для возвращения жизненных сил: бальнеология, кинезиотерапия, нутрициология.",
    price: "от 68 000 ₽",
    icon: "Heart",
  },
  {
    title: "Молчание",
    duration: "10 дней",
    desc: "Цифровой детокс и практики тишины. Медитации, йога, работа с телом в полном уединении.",
    price: "от 85 000 ₽",
    icon: "Mountain",
  },
];

const packages = [
  {
    name: "Стандарт",
    label: "",
    price: "14 900 ₽",
    period: "/ ночь",
    features: ["Номер Делюкс с видом на лес", "Завтрак в формате wellness", "Посещение СПА-зоны", "2 групповых занятия в день"],
    highlight: false,
  },
  {
    name: "Премиум",
    label: "Популярный",
    price: "24 900 ₽",
    period: "/ ночь",
    features: ["Сюит с террасой и ванной", "Полный пансион wellness", "Безлимитный СПА", "4 персональные процедуры", "Личный велнес-куратор"],
    highlight: true,
  },
  {
    name: "Вилла",
    label: "",
    price: "48 900 ₽",
    period: "/ ночь",
    features: ["Отдельная вилла 180 м²", "Персональный шеф-повар", "Частный СПА-бассейн", "Неограниченные процедуры", "Консьерж 24/7"],
    highlight: false,
  },
];

const infrastructure = [
  { icon: "Waves", title: "Термальные бассейны", desc: "4 бассейна с природными минеральными водами" },
  { icon: "Flame", title: "Банный комплекс", desc: "Русская, финская, хамам — 8 видов бань" },
  { icon: "Dumbbell", title: "Фитнес-студия", desc: "Оборудование Technogym, зал для йоги и пилатеса" },
  { icon: "Utensils", title: "Ресторан Sílva", desc: "Авторская wellness-кухня с локальными продуктами" },
  { icon: "TreePine", title: "Экотропы", desc: "12 км терренкурных маршрутов в реликтовом лесу" },
  { icon: "Moon", title: "Медитационный сад", desc: "Пространство для практик и созерцания" },
];

const reviews = [
  {
    name: "Анна В.",
    city: "Москва",
    rating: 5,
    text: "Провела здесь 7 дней по программе «Восстановление». Вернулась другим человеком. Персонал невероятный, атмосфера — как в сне.",
    program: "Восстановление",
  },
  {
    name: "Михаил Т.",
    city: "Санкт-Петербург",
    rating: 5,
    text: "Первый раз решился на детокс. Честно — боялся. Но с первого дня почувствовал заботу команды. Уехал лёгким и радостным.",
    program: "Детокс",
  },
  {
    name: "Екатерина Л.",
    city: "Казань",
    rating: 5,
    text: "Приезжаем сюда уже третий раз. Это место стало нашим ритуалом восстановления. Природа, тишина — и ты снова живёшь.",
    program: "Антистресс",
  },
];

const gallery = [
  { src: HERO_IMG, caption: "Территория курорта" },
  { src: SPA_IMG, caption: "СПА-процедуры" },
  { src: ROOM_IMG, caption: "Номера и виллы" },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
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
    <div className="min-h-screen noise-overlay" style={{ background: "#100E0C", color: "#EDE8DF" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(16,14,12,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,169,110,0.15)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-cormorant text-2xl font-light tracking-[0.15em] text-gold">
            СИЛЬВА
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[["programs", "Программы"], ["packages", "Пакеты"], ["infra", "Инфраструктура"], ["gallery", "Галерея"], ["reviews", "Отзывы"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-golos text-sm tracking-widest uppercase transition-colors duration-300"
                style={{ color: "#EDE8DF99", letterSpacing: "0.12em", background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
                onMouseLeave={e => (e.currentTarget.style.color = "#EDE8DF99")}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("booking")}
              className="font-golos text-sm px-5 py-2 tracking-widest uppercase transition-all duration-300 cursor-pointer"
              style={{ background: "transparent", border: "1px solid #C9A96E", color: "#C9A96E", letterSpacing: "0.1em" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#C9A96E"; e.currentTarget.style.color = "#100E0C"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C9A96E"; }}
            >
              Бронировать
            </button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} className="text-gold" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(16,14,12,0.98)" }}>
            {[["programs", "Программы"], ["packages", "Пакеты"], ["infra", "Инфраструктура"], ["gallery", "Галерея"], ["reviews", "Отзывы"], ["booking", "Бронировать"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left font-golos text-sm uppercase tracking-widest" style={{ color: "#EDE8DF", opacity: 0.7, background: "none", border: "none", cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})`, transform: "scale(1.05)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,14,12,0.3) 0%, rgba(16,14,12,0.55) 50%, rgba(16,14,12,0.9) 100%)" }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div
            className="font-golos text-sm uppercase mb-6 animate-fade-in"
            style={{ color: "#C9A96E", letterSpacing: "0.35em", animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
          >
            Велнес-курорт · Алтай
          </div>
          <h1
            className="font-cormorant font-light mb-6 animate-fade-in"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              animationDelay: "0.4s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <span className="shimmer-text">Сильва</span>
          </h1>
          <p
            className="font-cormorant italic text-xl md:text-2xl mb-10 animate-fade-in"
            style={{ color: "#EDE8DFcc", animationDelay: "0.7s", opacity: 0, animationFillMode: "forwards", fontWeight: 300 }}
          >
            Место, где тело вспоминает покой
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "1s", opacity: 0, animationFillMode: "forwards" }}
          >
            <button
              onClick={() => scrollTo("programs")}
              className="font-golos px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer"
              style={{ background: "#C9A96E", color: "#100E0C", letterSpacing: "0.15em", border: "none" }}
              onMouseEnter={e => e.currentTarget.style.background = "#E8C98A"}
              onMouseLeave={e => e.currentTarget.style.background = "#C9A96E"}
            >
              Выбрать программу
            </button>
            <button
              onClick={() => scrollTo("gallery")}
              className="font-golos px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer"
              style={{ background: "transparent", border: "1px solid rgba(237,232,223,0.4)", color: "#EDE8DF", letterSpacing: "0.15em" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#C9A96E"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(237,232,223,0.4)"}
            >
              Смотреть галерею
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <Icon name="ChevronDown" size={24} className="text-gold opacity-60" />
        </div>
      </section>

      {/* NUMBERS */}
      <section className="py-16 px-6" style={{ borderTop: "1px solid rgba(201,169,110,0.15)", borderBottom: "1px solid rgba(201,169,110,0.15)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["12+", "лет на рынке"], ["4 000", "гостей в год"], ["96%", "рекомендуют нас"], ["43", "процедуры в меню"]].map(([num, label]) => (
            <RevealSection key={label}>
              <div className="font-cormorant text-5xl font-light text-gold mb-1">{num}</div>
              <div className="font-golos text-xs uppercase tracking-widest opacity-50">{label}</div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealSection className="text-center mb-16">
            <div className="font-golos text-xs uppercase tracking-[0.3em] text-gold mb-4">Wellness Programs</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light">Программы курорта</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((p, i) => (
              <RevealSection key={p.title} delay={i * 100}>
                <div
                  className="group relative p-8 cursor-pointer transition-all duration-500 overflow-hidden"
                  style={{ border: "1px solid rgba(201,169,110,0.2)", background: "rgba(255,255,255,0.02)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,169,110,0.6)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(201,169,110,0.05)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,169,110,0.2)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"; }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 flex items-center justify-center" style={{ border: "1px solid rgba(201,169,110,0.3)" }}>
                      <Icon name={p.icon} size={20} className="text-gold" />
                    </div>
                    <span className="font-golos text-xs uppercase tracking-widest opacity-50">{p.duration}</span>
                  </div>
                  <h3 className="font-cormorant text-3xl font-light mb-3">{p.title}</h3>
                  <p className="font-golos text-sm leading-relaxed mb-6" style={{ color: "#EDE8DF99" }}>{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-cormorant text-xl text-gold">{p.price}</span>
                    <span className="font-golos text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-gold">Подробнее →</span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="py-24 px-6" style={{ background: "rgba(45,106,90,0.08)" }}>
        <div className="max-w-7xl mx-auto">
          <RevealSection className="text-center mb-16">
            <div className="font-golos text-xs uppercase tracking-[0.3em] text-gold mb-4">Packages & Suites</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light">Пакеты и размещение</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <RevealSection key={pkg.name} delay={i * 120}>
                <div
                  className="relative p-8 h-full flex flex-col transition-all duration-500"
                  style={{ border: pkg.highlight ? "1px solid #C9A96E" : "1px solid rgba(201,169,110,0.2)", background: pkg.highlight ? "rgba(201,169,110,0.07)" : "rgba(255,255,255,0.02)" }}
                >
                  {pkg.label && (
                    <div className="absolute -top-3 left-8 px-4 py-1 font-golos text-xs uppercase tracking-widest" style={{ background: "#C9A96E", color: "#100E0C" }}>
                      {pkg.label}
                    </div>
                  )}
                  <div className="mb-6">
                    <div className="font-golos text-xs uppercase tracking-widest opacity-50 mb-2">{pkg.name}</div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-cormorant text-4xl text-gold">{pkg.price}</span>
                      <span className="font-golos text-sm opacity-40">{pkg.period}</span>
                    </div>
                  </div>
                  <ul className="flex-1 space-y-3 mb-8">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-start gap-3 font-golos text-sm" style={{ color: "#EDE8DFcc" }}>
                        <span className="mt-1 text-gold">—</span>{f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollTo("booking")}
                    className="w-full py-3 font-golos text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer"
                    style={{ background: pkg.highlight ? "#C9A96E" : "transparent", color: pkg.highlight ? "#100E0C" : "#C9A96E", border: pkg.highlight ? "none" : "1px solid rgba(201,169,110,0.5)" }}
                    onMouseEnter={e => { if (!pkg.highlight) e.currentTarget.style.background = "rgba(201,169,110,0.1)"; }}
                    onMouseLeave={e => { if (!pkg.highlight) e.currentTarget.style.background = "transparent"; }}
                  >
                    Выбрать
                  </button>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infra" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealSection className="text-center mb-16">
            <div className="font-golos text-xs uppercase tracking-[0.3em] text-gold mb-4">Facilities</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light">Инфраструктура</h2>
            <p className="font-golos text-sm mt-4 max-w-lg mx-auto" style={{ color: "#EDE8DF80" }}>
              Всё необходимое для полного восстановления — в одном пространстве
            </p>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: "1px solid rgba(201,169,110,0.15)" }}>
            {infrastructure.map((item, i) => (
              <RevealSection key={item.title} delay={i * 80}>
                <div
                  className="p-8 transition-all duration-300 group cursor-default"
                  style={{ borderRight: "1px solid rgba(201,169,110,0.15)", borderBottom: "1px solid rgba(201,169,110,0.15)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(201,169,110,0.05)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
                >
                  <div className="mb-4 transition-transform duration-300 group-hover:scale-110 origin-left">
                    <Icon name={item.icon} size={28} className="text-gold opacity-80" />
                  </div>
                  <h3 className="font-cormorant text-xl mb-2">{item.title}</h3>
                  <p className="font-golos text-sm" style={{ color: "#EDE8DF66" }}>{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6" style={{ background: "rgba(45,106,90,0.06)" }}>
        <div className="max-w-7xl mx-auto">
          <RevealSection className="text-center mb-12">
            <div className="font-golos text-xs uppercase tracking-[0.3em] text-gold mb-4">Gallery</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light">Галерея</h2>
          </RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div
              className="lg:col-span-2 overflow-hidden cursor-pointer"
              style={{ border: "1px solid rgba(201,169,110,0.2)", aspectRatio: "16/9" }}
              onClick={() => setActiveGallery((activeGallery + 1) % gallery.length)}
            >
              <img
                src={gallery[activeGallery].src}
                alt={gallery[activeGallery].caption}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-4">
              {gallery.map((g, i) => (
                <div
                  key={i}
                  className="flex-1 overflow-hidden cursor-pointer relative"
                  style={{ border: i === activeGallery ? "1px solid #C9A96E" : "1px solid rgba(201,169,110,0.15)", minHeight: "100px" }}
                  onClick={() => setActiveGallery(i)}
                >
                  <img src={g.src} alt={g.caption} className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
                  {i === activeGallery && (
                    <div className="absolute inset-0 flex items-end p-3" style={{ background: "linear-gradient(to top, rgba(16,14,12,0.8), transparent)" }}>
                      <span className="font-golos text-xs uppercase tracking-widest text-gold">{g.caption}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <RevealSection className="text-center mt-8">
            <div className="font-cormorant italic text-xl" style={{ color: "#EDE8DF60" }}>
              {gallery[activeGallery].caption}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealSection className="text-center mb-16">
            <div className="font-golos text-xs uppercase tracking-[0.3em] text-gold mb-4">Guest Reviews</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light">Отзывы гостей</h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <RevealSection key={r.name} delay={i * 100}>
                <div
                  className="p-8 h-full flex flex-col"
                  style={{ border: "1px solid rgba(201,169,110,0.15)", background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <span key={j} className="text-gold text-sm">★</span>
                    ))}
                  </div>
                  <p className="font-cormorant italic text-lg leading-relaxed flex-1 mb-6" style={{ color: "#EDE8DFcc" }}>
                    «{r.text}»
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-golos text-sm font-medium">{r.name}</div>
                      <div className="font-golos text-xs opacity-40">{r.city}</div>
                    </div>
                    <div className="font-golos text-xs uppercase tracking-wider px-3 py-1" style={{ border: "1px solid rgba(201,169,110,0.3)", color: "#C9A96E" }}>
                      {r.program}
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 px-6" style={{ background: "linear-gradient(160deg, #100E0C 0%, #1A3D34 50%, #100E0C 100%)" }}>
        <div className="max-w-2xl mx-auto">
          <RevealSection className="text-center mb-12">
            <div className="font-golos text-xs uppercase tracking-[0.3em] text-gold mb-4">Reservation</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-4">Бронирование</h2>
            <p className="font-golos text-sm" style={{ color: "#EDE8DF66" }}>
              Оставьте заявку — менеджер свяжется с вами в течение 30 минут
            </p>
          </RevealSection>
          <RevealSection delay={200}>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-golos text-xs uppercase tracking-widest opacity-50 block mb-2">Имя</label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3 font-golos text-sm bg-transparent outline-none transition-all duration-300"
                    style={{ border: "1px solid rgba(201,169,110,0.25)", color: "#EDE8DF" }}
                    onFocus={e => e.target.style.borderColor = "#C9A96E"}
                    onBlur={e => e.target.style.borderColor = "rgba(201,169,110,0.25)"}
                  />
                </div>
                <div>
                  <label className="font-golos text-xs uppercase tracking-widest opacity-50 block mb-2">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 font-golos text-sm bg-transparent outline-none transition-all duration-300"
                    style={{ border: "1px solid rgba(201,169,110,0.25)", color: "#EDE8DF" }}
                    onFocus={e => e.target.style.borderColor = "#C9A96E"}
                    onBlur={e => e.target.style.borderColor = "rgba(201,169,110,0.25)"}
                  />
                </div>
              </div>
              <div>
                <label className="font-golos text-xs uppercase tracking-widest opacity-50 block mb-2">Программа</label>
                <select
                  className="w-full px-4 py-3 font-golos text-sm outline-none transition-all duration-300"
                  style={{ border: "1px solid rgba(201,169,110,0.25)", color: "#EDE8DF", background: "#1A1510" }}
                >
                  <option value="">Выберите программу</option>
                  {programs.map(p => <option key={p.title}>{p.title} — {p.duration}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-golos text-xs uppercase tracking-widest opacity-50 block mb-2">Дата заезда</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 font-golos text-sm bg-transparent outline-none transition-all duration-300"
                    style={{ border: "1px solid rgba(201,169,110,0.25)", color: "#EDE8DF", colorScheme: "dark" }}
                    onFocus={e => e.target.style.borderColor = "#C9A96E"}
                    onBlur={e => e.target.style.borderColor = "rgba(201,169,110,0.25)"}
                  />
                </div>
                <div>
                  <label className="font-golos text-xs uppercase tracking-widest opacity-50 block mb-2">Кол-во гостей</label>
                  <select
                    className="w-full px-4 py-3 font-golos text-sm outline-none transition-all duration-300"
                    style={{ border: "1px solid rgba(201,169,110,0.25)", color: "#EDE8DF", background: "#1A1510" }}
                  >
                    {["1 гость", "2 гостя", "3 гостя", "4 гостя", "5+ гостей"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="font-golos text-xs uppercase tracking-widest opacity-50 block mb-2">Пожелания</label>
                <textarea
                  rows={3}
                  placeholder="Особые пожелания, вопросы..."
                  className="w-full px-4 py-3 font-golos text-sm bg-transparent outline-none resize-none transition-all duration-300"
                  style={{ border: "1px solid rgba(201,169,110,0.25)", color: "#EDE8DF" }}
                  onFocus={e => e.target.style.borderColor = "#C9A96E"}
                  onBlur={e => e.target.style.borderColor = "rgba(201,169,110,0.25)"}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 font-golos text-sm uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
                style={{ background: "#C9A96E", color: "#100E0C", fontWeight: 500, border: "none" }}
                onMouseEnter={e => e.currentTarget.style.background = "#E8C98A"}
                onMouseLeave={e => e.currentTarget.style.background = "#C9A96E"}
              >
                Отправить заявку
              </button>
              <p className="text-center font-golos text-xs opacity-30">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          </RevealSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid rgba(201,169,110,0.15)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-cormorant text-2xl text-gold tracking-widest mb-1">СИЛЬВА</div>
            <div className="font-golos text-xs opacity-30 uppercase tracking-widest">Велнес-курорт · Алтай</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            {["+7 (385) 222-00-00", "info@silva-resort.ru"].map(c => (
              <span key={c} className="font-golos text-sm opacity-50">{c}</span>
            ))}
          </div>
          <div className="font-golos text-xs opacity-25">© 2026 Сильва. Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
}