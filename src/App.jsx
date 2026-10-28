import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'What We Do', href: '#services' },
  { label: 'Our Story', href: '#story' },
  { label: 'Contact', href: '#contact' },
];

const experienceCards = [
  {
    title: 'Outdoor Escapes & Retreats',
    description: 'Immersive getaways designed for deep rest, meaningful connection and a break from the noise of ordinary life.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Private Celebrations',
    description: 'Intimate, memory-rich gatherings shaped around the people, energy and feeling you want to keep.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Corporate Team Experiences',
    description: 'Purposeful team moments built to spark trust, creativity and genuine connection without the usual stiffness.',
    image:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Parties & Lifestyle Events',
    description: 'Bold social moments with atmosphere, rhythm and a magnetic sense of arrival that feels unmistakably yours.',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
  },
];

const services = [
  'Event Planning',
  'Event Hosting / MC Services',
  'Event Decoration & Styling',
  'Experience Design',
  'Event Coordination & Production',
];

const galleryItems = [
  {
    title: 'Golden Hour Campfire',
    image:
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Night Under the Stars',
    image:
      'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Wild Gathering',
    image:
      'https://images.unsplash.com/photo-1517486800579-125cfac0f0f9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Intimate Installations',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
  },
];

const philosophy = [
  { heading: 'Freedom', content: 'Break the pattern. Make room for movement, play and true presence.' },
  { heading: 'Connection', content: 'Bring people together in ways that feel human, personal and unforgettable.' },
  { heading: 'Adventure', content: 'Turn the ordinary into something immersive, surprising and alive.' },
  { heading: 'Memories', content: 'Design experiences that linger long after the lights go down.' },
];

const initialForm = {
  name: '',
  emailOrPhone: '',
  eventType: '',
  date: '',
  guestCount: '',
  message: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    const onHashChange = () => {
      setMenuOpen(false);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    if (submitted) setSubmitted(false);
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Please tell us your name.';
    if (!formData.emailOrPhone.trim()) {
      nextErrors.emailOrPhone = 'Please provide an email or phone number.';
    } else if (
      !emailPattern.test(formData.emailOrPhone.trim()) &&
      !/^[+]?[(]?[0-9]{1,4}[)]?[-\s0-9]*$/.test(formData.emailOrPhone.trim())
    ) {
      nextErrors.emailOrPhone = 'Please use a valid email or phone number.';
    }
    if (!formData.eventType.trim()) nextErrors.eventType = 'Please choose an event type.';
    if (!formData.date) nextErrors.date = 'Please select a preferred date.';
    if (!formData.guestCount.trim()) nextErrors.guestCount = 'Please estimate guest count.';
    if (!formData.message.trim()) nextErrors.message = 'Tell us a little about your vision.';

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setFormData(initialForm);
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <a href="#home" className="wordmark" aria-label="Off The Grid home">
            <span className="wordmark-mark">OTG</span>
            <span className="wordmark-text">OFF THE GRID</span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a href="#contact" className="btn btn-primary nav-cta">
              Book Your Experience
            </a>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary mobile-cta" onClick={() => setMenuOpen(false)}>
            Book Your Experience
          </a>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-overlay" aria-hidden="true" />
          <div className="container hero-content">
            <div className="hero-meta">
              <span>Premium experiences</span>
              <span>emotionally immersive</span>
            </div>

            <h1>
              <span>OFF THE GRID.</span>
              <span>OUT OF YOUR HEAD.</span>
              <span>INTO THE MOMENT.</span>
            </h1>

            <p className="hero-copy">
              We don’t just plan events. We create experiences that make you feel alive.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Start Your Inquiry
              </a>
              <a href="#experiences" className="btn btn-secondary">
                Explore Experiences
              </a>
            </div>

            <div className="hero-rail" aria-label="Experience themes">
              <span>Private escapes</span>
              <span>Bold gatherings</span>
              <span>Immersive design</span>
            </div>
          </div>
        </section>

        <section className="intro section-spacing">
          <div className="container intro-grid">
            <div className="intro-copy reveal">
              <p className="eyebrow eyebrow-dark">An escape from routine</p>
              <h2>We design moments that pull you out of the noise and back into yourself.</h2>
            </div>
            <div className="intro-text reveal">
              <p>
                OTG is a reset for the mind, body and spirit. We build experiences that feel like a deep exhale — a way to
                step away from routine, reconnect with what matters, and live a little more vividly.
              </p>
              <p>
                From intimate gatherings to immersive adventures, every detail is shaped to help people recharge, feel freer,
                and leave with something unforgettable in their memory.
              </p>
            </div>
          </div>
        </section>

        <section id="experiences" className="section-spacing">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow eyebrow-dark">Experiences</p>
              <h2>Curated moments designed to feel bigger than a plan.</h2>
            </div>

            <div className="card-grid">
              {experienceCards.map((card, index) => (
                <article key={card.title} className="experience-card reveal" style={{ animationDelay: `${index * 120}ms` }}>
                  <div className="card-image-wrap">
                    <img src={card.image} alt={card.title} loading="lazy" />
                  </div>
                  <div className="card-content">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="services section-spacing">
          <div className="container services-grid">
            <div className="services-copy">
              <p className="eyebrow eyebrow-dark">What We Do</p>
              <h2>We build the feeling. Then we handle the details.</h2>
            </div>

            <div className="service-list">
              {services.map((service, index) => (
                <div key={service} className="service-item reveal">
                  <span className="service-index">0{index + 1}</span>
                  <p>{service}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery section-spacing">
          <div className="container">
            <div className="section-head narrow">
              <p className="eyebrow eyebrow-dark">Illustrative portfolio</p>
              <h2>Sample scenes that capture the OTG mood.</h2>
            </div>

            <div className="gallery-grid">
              {galleryItems.map((item, index) => (
                <figure key={item.title} className={`gallery-item ${index % 2 === 0 ? 'tall' : 'wide'}`}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <figcaption>{item.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="story" className="philosophy section-spacing">
          <div className="container philosophy-wrap">
            <div className="section-head left-align">
              <p className="eyebrow eyebrow-dark">Our Story</p>
              <h2>We believe the best experiences help people feel more alive.</h2>
            </div>

            <div className="philosophy-grid">
              {philosophy.map((item) => (
                <article key={item.heading} className="philosophy-card reveal">
                  <span>{item.heading}</span>
                  <p>{item.content}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="inquiry section-spacing">
          <div className="container inquiry-grid">
            <div className="inquiry-copy">
              <p className="eyebrow eyebrow-dark">Book your experience</p>
              <h2>Tell us what kind of moment you want to create.</h2>
              <p>
                Whether you’re planning a private celebration, a branded team moment, or a full-on escape, we’ll shape an
                experience around the people, energy and feeling you want to leave behind.
              </p>
            </div>

            <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
              <div className="input-row">
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <small id="name-error" className="field-error">{errors.name}</small>}
                </label>

                <label>
                  <span>Email or phone</span>
                  <input
                    type="text"
                    name="emailOrPhone"
                    value={formData.emailOrPhone}
                    onChange={handleInput}
                    aria-invalid={Boolean(errors.emailOrPhone)}
                    aria-describedby={errors.emailOrPhone ? 'emailOrPhone-error' : undefined}
                  />
                  {errors.emailOrPhone && <small id="emailOrPhone-error" className="field-error">{errors.emailOrPhone}</small>}
                </label>
              </div>

              <div className="input-row">
                <label>
                  <span>Event type</span>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInput}
                    aria-invalid={Boolean(errors.eventType)}
                    aria-describedby={errors.eventType ? 'eventType-error' : undefined}
                  >
                    <option value="">Select one</option>
                    <option value="Outdoor retreat">Outdoor retreat</option>
                    <option value="Private celebration">Private celebration</option>
                    <option value="Corporate team experience">Corporate team experience</option>
                    <option value="Party or lifestyle event">Party or lifestyle event</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.eventType && <small id="eventType-error" className="field-error">{errors.eventType}</small>}
                </label>

                <label>
                  <span>Preferred date</span>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInput}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? 'date-error' : undefined}
                  />
                  {errors.date && <small id="date-error" className="field-error">{errors.date}</small>}
                </label>
              </div>

              <label>
                <span>Estimated guest count</span>
                <input
                  type="number"
                  name="guestCount"
                  min="1"
                  value={formData.guestCount}
                  onChange={handleInput}
                  aria-invalid={Boolean(errors.guestCount)}
                  aria-describedby={errors.guestCount ? 'guestCount-error' : undefined}
                />
                {errors.guestCount && <small id="guestCount-error" className="field-error">{errors.guestCount}</small>}
              </label>

              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInput}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <small id="message-error" className="field-error">{errors.message}</small>}
              </label>

              <button type="submit" className="btn btn-primary submit-btn">
                Send Inquiry
              </button>

              {submitted && (
                <p className="form-success" role="status">
                  Thanks! Your inquiry is ready to be sent through your preferred follow-up workflow.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <p className="wordmark wordmark-footer">
              <span className="wordmark-mark">OTG</span>
              <span className="wordmark-text">OFF THE GRID</span>
            </p>
            <p className="brand-message">OFF THE GRID. OUT OF YOUR HEAD. INTO THE MOMENT.</p>
          </div>

          <div>
            <h3>Navigate</h3>
            <ul>
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul>
              <li><a href="#contact">Email available on request</a></li>
              <li><a href="#contact">Phone available on request</a></li>
              <li><span>By inquiry only</span></li>
            </ul>
          </div>

          <div>
            <h3>Social</h3>
            <ul>
              {['Instagram', 'Facebook', 'Pinterest'].map((label) => (
                <li key={label}>
                  <a href="#contact">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
