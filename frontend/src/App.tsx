import { FormEvent, useEffect, useMemo, useState } from 'react';

const stats = [
  { label: '+6500 مشروع', tone: 'cyan' },
  { label: '+80 مهندس', tone: 'violet' },
  { label: 'دعم مستمر 24/7', tone: 'accent' },
  { label: 'هدف واحد جاهزية', tone: 'gold' },
];

const caseStudies = [
  {
    title: 'أحمد سايبر أكاديمي',
    description:
      'منصة تعليمية ذكية ومتكاملة تقدم تجارب تدريبية تفاعلية، إدارة محتوى متقدمة، تحليلات احترافية، ونظام حضور متقدم للطلاب والمدربين.',
    features: ['واجهة تعليمية مدارة بالكامل', 'نظام اشتراكات دعم متقدم', 'لوحة تحكم تنفيذية', 'تقارير أداء ذكية'],
  },
  {
    title: 'فواتيري',
    description:
      'منصة فواتير ومحاسبة مبنية على السحابة، تتيح متابعة الإيرادات في الوقت الفعلي، تقارير مصرفية دقيقة، ودعم متعدد لغات وملفات PDF جاهزة للطباعة.',
    features: ['الفواتير التلقائية', 'تقارير مالية لحظية', 'دفع مترابط', 'محفظة أعمال ذكية'],
  },
];

const reviews = [
  { name: 'سارة محمد', role: 'مديرة تسويق', quote: 'أداء ممتاز، وفريق Lunaro فهم احتياجاتنا بشكل عميق ونجح في تحويل الفكرة إلى منصة جاهزة للانتشار.' },
  { name: 'عبد الرحمن', role: 'مالك شركة', quote: 'خلال أسابيع قليلة حصلنا على تجربة مستخدم احترافية وحل فني يبرز قوة العلامة التجارية في السوق.' },
];

const articles = [
  { tag: 'التسويق', title: 'أفضل 7 خدمات التسويق الإلكتروني في مصر', readTime: '7 دقائق' },
  { tag: 'المنتجات', title: 'كيف ترفع معدلات التحويل عبر تجربة المستخدم', readTime: '5 دقائق' },
  { tag: 'الأداء', title: 'أداء الموقع: لماذا يحدد نجاح المشروع؟', readTime: '4 دقائق' },
];

const navLinks = ['الرئيسية', 'من نحن', 'خدماتنا', 'أعمالنا', 'آراء العملاء', 'المدونة', 'اتصل بنا'];

const snippetLines = [
  'const lunaro = {',
  "  vision: 'تحويل الأفكار إلى منتجات تتوسع معنا',",
  "  stack: ['React', 'Node.js', 'Prisma', 'Resend'],",
  "  delivery: 'نظام متكامل من الفكرة إلى التشغيل',",
  '};',
  'export default lunaro;',
];

export default function App() {
  const [typedSnippet, setTypedSnippet] = useState('');
  const [cursor, setCursor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('عايز اعرف تفاصيل مشروعي 🤔');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    scope: '',
  });

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let frame = 0;

    const tick = () => {
      const currentLine = snippetLines[lineIndex] ?? '';
      if (frame % 2 === 0) {
        setTypedSnippet((prev) => {
          const next = `${prev}${currentLine[charIndex] ?? ''}`;
          return next;
        });
      }

      charIndex += 1;
      if (charIndex >= currentLine.length + 8) {
        charIndex = 0;
        lineIndex = (lineIndex + 1) % snippetLines.length;
        setTypedSnippet((prev) => `${prev}\n`);
      }
      frame += 1;
    };

    const interval = window.setInterval(tick, 80);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCursor((prev) => (prev === '|' ? ' ' : '|'));
    }, 500);
    return () => window.clearInterval(interval);
  }, []);

  const orbitIcons = useMemo(
    () => [
      { icon: '🚀', left: '8%', top: '12%' },
      { icon: '🛰️', left: '78%', top: '20%' },
      { icon: '✦', left: '12%', top: '68%' },
      { icon: '⚡', left: '72%', top: '72%' },
    ],
    [],
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormMessage('...جارٍ تجهيز رسالتك');

    await new Promise((resolve) => window.setTimeout(resolve, 800));

    setFormMessage('أهلاً بك! فريقنا هيرد عليك خلال دقائق ⚡');
    setContactForm({ name: '', email: '', phone: '', budget: '', scope: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="page-shell">
      <div className="bg-grid" />
      <div className="cursor-glow" />
      {orbitIcons.map((item, index) => (
        <span key={index} className="floating-icon" style={{ left: item.left, top: item.top }}>
          {item.icon}
        </span>
      ))}

      <header className="topbar">
        <div className="brand-tag">
          <div className="brand-mark">L</div>
          <div>
            <span className="brand-name">Lunaro</span>
            <small>لونارو</small>
          </div>
        </div>

        <nav className="nav" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => (
            <a href="#" key={link}>
              {link}
            </a>
          ))}
        </nav>

        <button className="cta-button">طلب عرض سعر</button>
      </header>

      <main className="container">
        <section className="hero-grid">
          <div className="snippet-panel glass-panel">
            <div className="panel-label">// Lunaro-Platform Snippet</div>
            <pre className="snippet-code" aria-live="polite">
              {typedSnippet}
              <span className="cursor">{cursor}</span>
            </pre>
          </div>

          <div className="hero-copy">
            <span className="eyebrow">منذ 2016 • حلول رقمية حقيقية</span>
            <h1>نصمم لك حلولاً برمجية متكاملة تُسرّع نمو أعمالك وتزيد مبيعاتك</h1>
            <p>
              نطور أنظمة متكاملة، مواقع قوية، ومنصات إدارية متقدمة ترتبط مباشرة بأهدافك التسويقية والمالية والتشغيلية.
            </p>
            <div className="hero-actions">
              <button className="primary">طلب استشارة لمشروعك مجاناً</button>
              <button className="secondary">Download Our Profile</button>
            </div>
            <div className="mini-meters">
              <div>
                <strong>98%</strong>
                <span>رضا العملاء</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>دعم فني</span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="section-heading">
            <span className="eyebrow">من نحن</span>
            <h2>نظام عمل متكامل قوامه الخبرة والسرعة والتنفيذ</h2>
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className={`stat-card ${stat.tone}`}>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="work-section">
          <div className="section-heading">
            <span className="eyebrow">أعمالنا</span>
            <h2>مشاريع تركز على النتائج</h2>
          </div>
          <div className="portfolio-grid">
            {caseStudies.map((item) => (
              <article key={item.title} className="portfolio-card glass-panel">
                <div className="card-topline">
                  <span className="status-dot" />
                  <span>Case Study</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="reviews-section">
          <div className="section-heading">
            <span className="eyebrow">آراء العملاء</span>
            <h2>العملاء يثقون في جودة التنفيذ</h2>
          </div>

          <div className="reviews-layout">
            <div className="reviews-list">
              {reviews.map((review) => (
                <article key={review.name} className="review-item glass-panel">
                  <div className="avatar">{review.name.slice(0, 2)}</div>
                  <div>
                    <h3>{review.name}</h3>
                    <small>{review.role}</small>
                    <p>{review.quote}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="video-card glass-panel">
              <div className="video-head">
                <span className="live-pill">Live</span>
                <span>Review Session</span>
              </div>
              <div className="video-preview">
                <button className="play-button">▶</button>
              </div>
              <div className="video-meta">
                <strong>أحمد منصور</strong>
                <span>مراجعة فيديو حية عن تجربة المنصة</span>
              </div>
            </div>
          </div>
        </section>

        <section className="blog-section">
          <div className="section-heading">
            <span className="eyebrow">المدونة</span>
            <h2>محتوى تقني يضيف قيمة</h2>
          </div>

          <div className="blog-grid">
            {articles.map((article) => (
              <article key={article.title} className="blog-card glass-panel">
                <span className="badge">{article.tag}</span>
                <h3>{article.title}</h3>
                <div className="blog-meta">
                  <span>{article.readTime}</span>
                  <a href="#">اقرأ المزيد</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section">
          <div className="form-panel glass-panel">
            <div className="form-copy">
              <span className="eyebrow">اتصل بنا</span>
              <h2>ساعدنا في بناء مشروعك القادم</h2>
              <p>{formMessage}</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="field-grid">
                <label>
                  الاسم
                  <input value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} placeholder="اسمك الكامل" />
                </label>
                <label>
                  البريد الإلكتروني
                  <input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder="name@email.com" />
                </label>
                <label>
                  الهاتف
                  <input value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} placeholder="+966..." />
                </label>
                <label>
                  ميزانية المشروع
                  <input value={contactForm.budget} onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })} placeholder="مثلاً 15,000 ر.س" />
                </label>
              </div>

              <label>
                نطاق المشروع
                <textarea value={contactForm.scope} onChange={(e) => setContactForm({ ...contactForm, scope: e.target.value })} placeholder="اكتب تفاصيل مشروعك" rows={5} />
              </label>

              <button type="submit" className="primary" disabled={isSubmitting}>
                {isSubmitting ? 'جاري الإرسال...' : 'أرسل طلبك'}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
