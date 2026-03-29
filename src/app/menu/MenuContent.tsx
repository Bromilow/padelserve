'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { asset } from '@/lib/assetPath'

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const els = container.querySelectorAll<HTMLElement>('.fade-up, .fade-in, .reveal-left, .reveal-right')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target) } })
      },
      { threshold: 0.1 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return ref
}

const pizzas = [
  {
    name: 'Margherita',
    description: 'San Marzano tomato, fior di latte, fresh basil, extra virgin olive oil',
    tag: 'Classic',
  },
  {
    name: 'Truffle & Mushroom',
    description: 'Black truffle cream, wild mushrooms, taleggio, thyme, aged parmesan',
    tag: 'Signature',
  },
  {
    name: 'Spicy Calabrese',
    description: 'Nduja, smoked mozzarella, roasted peppers, chilli oil, capers',
    tag: 'Signature',
  },
  {
    name: 'Prosciutto & Rocket',
    description: 'Tomato base, buffalo mozzarella, San Daniele prosciutto, rocket, shaved parmesan',
    tag: 'Popular',
  },
  {
    name: 'Four Cheese',
    description: 'Gorgonzola, taleggio, fior di latte, aged parmesan, honey drizzle',
    tag: 'Classic',
  },
  {
    name: 'Smoky Chicken',
    description: 'Smoked chicken, roasted garlic cream, caramelised onion, fresh herbs, mozzarella',
    tag: 'Popular',
  },
  {
    name: 'Burrata & Tomato',
    description: 'Slow-roasted cherry tomatoes, fresh burrata, basil oil, sea salt, sourdough base',
    tag: 'Seasonal',
  },
  {
    name: 'Lamb & Harissa',
    description: 'Harissa-spiced pulled lamb, feta, olives, roasted red onion, fresh mint',
    tag: 'Signature',
  },
]

const lightBites = [
  { name: 'Burrata & Heirloom Tomato', description: 'Aged balsamic, fresh basil, sea salt, sourdough crostini' },
  { name: 'Arancini', description: 'Truffle & parmesan risotto balls, saffron aioli' },
  { name: 'Caesar Salad', description: 'Cos lettuce, house-made dressing, sourdough croutons, anchovies, parmesan' },
  { name: 'Charcuterie Board', description: 'Cured meats, artisan cheeses, pickles, house focaccia' },
  { name: 'Garlic & Herb Flatbread', description: 'Confit garlic, rosemary butter, flaked sea salt' },
]

const cocktails = [
  { name: 'Court Side Spritz', description: 'Aperol, prosecco, blood orange, fresh mint', type: 'Signature' },
  { name: 'The Rally', description: 'Gin, elderflower, cucumber, lime, soda', type: 'Signature' },
  { name: 'Smoked Negroni', description: 'Campari, sweet vermouth, smoked whisky, orange peel', type: 'Classic' },
  { name: 'Serve Mule', description: 'Vodka, fresh ginger, lime, ginger beer, mint', type: 'Signature' },
  { name: 'Passion & Spice', description: 'Tequila, passionfruit, jalapeño, agave, lime', type: 'Popular' },
  { name: 'Garden Gimlet', description: 'Hendricks gin, basil, cucumber, fresh lime juice', type: 'Classic' },
]

const wine = [
  { name: 'Sauvignon Blanc', description: 'Stellenbosch · Crisp, citrus, grassy notes', type: 'White' },
  { name: 'Chardonnay', description: 'Franschhoek · Buttery, oak, stone fruit', type: 'White' },
  { name: 'Rosé', description: 'Provence-style · Dry, strawberry, watermelon', type: 'Rosé' },
  { name: 'Cabernet Sauvignon', description: 'Stellenbosch · Full-bodied, blackcurrant, cedar', type: 'Red' },
  { name: 'Pinot Noir', description: 'Walker Bay · Elegant, cherry, earthy undertones', type: 'Red' },
  { name: 'Prosecco', description: 'Italy · Light, floral, fine bubbles', type: 'Sparkling' },
]

const nonAlcoholic = [
  { name: 'Yuzu Lemonade', description: 'Yuzu, fresh lemon, honey, soda' },
  { name: 'Watermelon Cooler', description: 'Fresh watermelon, mint, lime, soda' },
  { name: 'Iced Matcha Latte', description: 'Ceremonial matcha, oat milk, honey' },
  { name: 'Espresso Tonic', description: 'Double shot, fever-tree tonic, orange peel' },
  { name: 'Virgin Rally', description: 'Elderflower, cucumber, lime, fresh mint, soda' },
]

const tagColours: Record<string, string> = {
  Signature: 'var(--serve-amber)',
  Popular: 'var(--serve-sage)',
  Classic: 'var(--serve-cream)',
  Seasonal: 'var(--serve-warm)',
}

export default function MenuContent() {
  const ref = useScrollReveal()
  const [activeTab, setActiveTab] = useState<'food' | 'drinks'>('food')

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const els = container.querySelectorAll<HTMLElement>('.fade-up, .fade-in')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target) } })
      },
      { threshold: 0.1 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [activeTab, ref])

  return (
    <div ref={ref}>

      {/* ─── HERO ─── */}
      <section
        className="relative flex items-center justify-center"
        style={{ height: 'calc(80vh + 80px)', minHeight: '640px', paddingTop: '80px' }}
      >
        <Image
          src={asset('/assets/Food.png')}
          alt="Artisan pizza at SERVE"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="video-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="label-overline text-[var(--serve-cream)] opacity-70 mb-6 fade-up in-view">
            Eat &amp; Drink
          </p>
          <h1
            className="text-display-lg text-[var(--serve-cream)] font-light mb-6 fade-up in-view delay-200"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            The Kitchen &amp; <span style={{ fontStyle: 'italic', color: 'var(--serve-amber)' }}>The Bar.</span>
          </h1>
          <p
            className="text-[var(--serve-cream)] fade-up in-view delay-400"
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              opacity: 0.8,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 300,
            }}
          >
            Good food. Great drinks. No rush.
          </p>
        </div>
      </section>


      {/* ─── TABS ─── */}
      <section className="bg-[var(--serve-dark)] sticky top-14 z-30">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 flex gap-0">
          {(['food', 'drinks'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="label-overline py-5 px-8 transition-all duration-300"
              style={{
                color: activeTab === tab ? 'var(--serve-amber)' : 'var(--serve-cream)',
                opacity: activeTab === tab ? 1 : 0.4,
                borderBottom: activeTab === tab ? '2px solid var(--serve-amber)' : '2px solid transparent',
                background: 'none',
                cursor: 'pointer',
                letterSpacing: '0.2em',
              }}
            >
              {tab === 'food' ? 'Food' : 'Drinks'}
            </button>
          ))}
        </div>
      </section>

      {/* ─── FOOD MENU ─── */}
      {activeTab === 'food' && (
        <div className="bg-[var(--serve-cream)]">

          {/* Pizzas */}
          <section className="section-padding-sm">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
              <div className="mb-12 fade-up">
                <p className="label-overline text-[var(--serve-green)] mb-3">Wood-Fired</p>
                <h2
                  className="text-display-md text-[var(--serve-dark)] font-light"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  Pizzas
                </h2>
                <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
                {pizzas.map((item, i) => (
                  <div
                    key={item.name}
                    className="fade-up py-6 border-b border-[var(--serve-dark)] border-opacity-10"
                    style={{ transitionDelay: `${i * 0.05}s`, borderColor: 'rgba(20,20,20,0.1)' }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3
                        style={{
                          fontFamily: 'var(--font-cormorant)',
                          fontSize: '1.35rem',
                          fontWeight: 500,
                          color: 'var(--serve-dark)',
                        }}
                      >
                        {item.name}
                      </h3>
                      <span
                        className="label-overline flex-shrink-0"
                        style={{ fontSize: '0.55rem', color: tagColours[item.tag], letterSpacing: '0.15em' }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-jost)',
                        fontSize: '0.78rem',
                        color: 'var(--serve-dark)',
                        opacity: 0.6,
                        lineHeight: 1.6,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Light Bites */}
          <section className="bg-[var(--serve-warm)] section-padding-sm">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
              <div className="mb-12 fade-up">
                <p className="label-overline text-[var(--serve-green)] mb-3">Small Plates</p>
                <h2
                  className="text-display-md text-[var(--serve-dark)] font-light"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  Light Bites
                </h2>
                <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
              </div>

              <div className="max-w-screen-md">
                {lightBites.map((item, i) => (
                  <div
                    key={item.name}
                    className="fade-up py-6 border-b"
                    style={{ transitionDelay: `${i * 0.05}s`, borderColor: 'rgba(20,20,20,0.1)' }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: '1.35rem',
                        fontWeight: 500,
                        color: 'var(--serve-dark)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-jost)',
                        fontSize: '0.78rem',
                        color: 'var(--serve-dark)',
                        opacity: 0.6,
                        lineHeight: 1.6,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ─── DRINKS MENU ─── */}
      {activeTab === 'drinks' && (
        <div className="bg-[var(--serve-cream)]">

          {/* Cocktails */}
          <section className="section-padding-sm">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
              <div className="mb-12 fade-up">
                <p className="label-overline text-[var(--serve-green)] mb-3">Craft</p>
                <h2
                  className="text-display-md text-[var(--serve-dark)] font-light"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  Cocktails
                </h2>
                <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
                {cocktails.map((item, i) => (
                  <div
                    key={item.name}
                    className="fade-up py-6 border-b"
                    style={{ transitionDelay: `${i * 0.05}s`, borderColor: 'rgba(20,20,20,0.1)' }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--serve-dark)' }}>
                        {item.name}
                      </h3>
                      <span className="label-overline flex-shrink-0" style={{ fontSize: '0.55rem', color: tagColours[item.type] ?? 'var(--serve-sage)', letterSpacing: '0.15em' }}>
                        {item.type}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.78rem', color: 'var(--serve-dark)', opacity: 0.6, lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Wine */}
          <section className="bg-[var(--serve-warm)] section-padding-sm">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
              <div className="mb-12 fade-up">
                <p className="label-overline text-[var(--serve-green)] mb-3">Curated Selection</p>
                <h2
                  className="text-display-md text-[var(--serve-dark)] font-light"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  Wine &amp; Bubbles
                </h2>
                <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 max-w-screen-lg">
                {wine.map((item, i) => (
                  <div
                    key={item.name}
                    className="fade-up py-6 border-b"
                    style={{ transitionDelay: `${i * 0.05}s`, borderColor: 'rgba(20,20,20,0.1)' }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--serve-dark)' }}>
                        {item.name}
                      </h3>
                      <span className="label-overline flex-shrink-0" style={{ fontSize: '0.55rem', color: 'var(--serve-green)', opacity: 0.7, letterSpacing: '0.15em' }}>
                        {item.type}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.78rem', color: 'var(--serve-dark)', opacity: 0.6, lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Non-Alcoholic */}
          <section className="section-padding-sm">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
              <div className="mb-12 fade-up">
                <p className="label-overline text-[var(--serve-green)] mb-3">Zero Proof</p>
                <h2
                  className="text-display-md text-[var(--serve-dark)] font-light"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  Non-Alcoholic
                </h2>
                <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
              </div>

              <div className="max-w-screen-md">
                {nonAlcoholic.map((item, i) => (
                  <div
                    key={item.name}
                    className="fade-up py-6 border-b"
                    style={{ transitionDelay: `${i * 0.05}s`, borderColor: 'rgba(20,20,20,0.1)' }}
                  >
                    <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--serve-dark)', marginBottom: '0.35rem' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.78rem', color: 'var(--serve-dark)', opacity: 0.6, lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ─── BOTTOM CTA ─── */}
      <section className="bg-[var(--serve-green)] section-padding-sm">
        <div className="max-w-screen-md mx-auto px-6 text-center">
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
              color: 'var(--serve-cream)',
              marginBottom: '2rem',
            }}
          >
            Linger a little longer
          </p>
          <p className="label-overline text-[var(--serve-cream)] opacity-50 fade-up delay-100">
            2nd Floor, 185 Ridge Rd · Umhlanga · Open 6am – 10pm Daily
          </p>
        </div>
      </section>

    </div>
  )
}
