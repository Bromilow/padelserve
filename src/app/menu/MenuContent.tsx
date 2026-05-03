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

const healthy = [
  { name: 'Smashed Avo on Toast', description: 'Smashed avo on toasted linseed + topped with feta', price: 55 },
  { name: 'Granola Bowl', description: 'Plain yoghurt, granola, seasonal fruit + drizzle of honey', price: 75 },
  { name: 'Protein Bowl', description: 'Chicken breast with brown rice, sweetcorn + avo', price: 90 },
  { name: 'Asian Chicken Salad', description: 'A bed of slaw, peanuts + avo, topped with chicken breast + asian dressing', price: 110 },
]

const toasties = [
  { name: 'Cheese + Tomato Toastie', description: '', price: 45 },
  { name: 'Ham + Cheese Toastie', description: '', price: 55 },
  { name: 'Chicken Mayo Toastie', description: '', price: 65 },
  { name: 'Bacon, Egg + Cheese Toastie', description: '', price: 65 },
  { name: 'Breakfast Wrap', description: 'Egg, bacon, cheese, cherry tomato + spring onion', price: 75 },
  { name: 'Chicken Teriyaki Wrap', description: 'Teriyaki chicken, coleslaw + feta', price: 75 },
]

const pizzas = [
  { name: 'The Classic', description: 'Marinara sauce, mozzarella, garlic, cherry tomatoes + parmesan', price: 115, vegetarian: true },
  { name: 'The Reserve', description: 'Marinara sauce, mozzarella, garlic, white + yellow cheddar', price: 125, vegetarian: true },
  { name: 'Sunset Court', description: 'Marinara sauce, mozzarella, garlic, ham + pineapple', price: 135, vegetarian: false },
  { name: 'The Royal', description: 'Marinara sauce, mozzarella, garlic, bacon + mushroom', price: 150, vegetarian: false },
  { name: 'The Serve', description: 'Marinara sauce, mozzarella, garlic, chicken, feta + pepperdews', price: 165, vegetarian: false },
  { name: 'The Grand Slam', description: 'Marinara sauce, mozzarella, garlic, bacon, avo + feta', price: 175, vegetarian: false },
  { name: 'The Monarch', description: 'Marinara sauce, mozzarella, garlic, salami, bacon + pepperoni', price: 185, vegetarian: false },
]

const coffee = [
  { name: 'Americano', short: 35, tall: 40 },
  { name: 'Cappuccino', short: 38, tall: 44 },
  { name: 'Cafe Latte', short: 38, tall: 44 },
  { name: 'Mocha', short: 38, tall: 44 },
  { name: 'Cortado', short: 38, tall: 44 },
  { name: 'Flat White', short: 40, tall: null },
  { name: 'Espresso', short: 29, tall: 32, note: 'single / double' },
]

const notCoffee = [
  { name: 'Red Espresso', short: 41, tall: 47 },
  { name: 'Chai Latte', short: 40, tall: 45 },
  { name: 'Hot Chocolate', short: 42, tall: 47 },
  { name: 'White Chocolate', short: 42, tall: 47 },
  { name: 'Matcha Latte', short: 45, tall: null },
  { name: 'Tea', short: 20, tall: null, note: 'rooibos / five roses' },
  { name: 'Baby Chino', short: 15, tall: null },
]

const cold = [
  { name: 'Coffee Freezo', price: 61 },
  { name: 'Mocha Freezo', price: 61 },
  { name: 'Chocolate Freezo', price: 61 },
  { name: 'Iced Latte', price: 55 },
]

const smoothies = [
  { name: 'Berry Best', description: 'Blueberry, strawberry, blackberry, banana, yoghurt + dates' },
  { name: 'Tropical Green', description: 'Banana, pineapple, mango, baby spinach + ginger' },
  { name: 'Peanut Oat', description: 'Peanut butter, banana, oats, yoghurt, dates + cinnamon' },
  { name: 'Choc-Nut', description: 'Banana, cocoa powder, peanut butter, dates, coconut milk + cinnamon' },
  { name: 'Peanut Berry', description: 'Blueberry, peanut butter, banana + dates' },
]

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

          {/* Healthy */}
          <section className="section-padding-sm">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
              <div className="mb-12 fade-up">
                <p className="label-overline text-[var(--serve-green)] mb-3">Fresh &amp; Wholesome</p>
                <h2 className="text-display-md text-[var(--serve-dark)] font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  Healthy.
                </h2>
                <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
              </div>
              <div className="max-w-screen-md">
                {healthy.map((item, i) => (
                  <div key={item.name} className="fade-up py-6 border-b" style={{ transitionDelay: `${i * 0.05}s`, borderColor: 'rgba(20,20,20,0.1)' }}>
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--serve-dark)' }}>
                        {item.name}
                      </h3>
                      <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--serve-dark)', flexShrink: 0 }}>
                        R{item.price}
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

          {/* Toasties & Wraps */}
          <section className="bg-[var(--serve-warm)] section-padding-sm">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
              <div className="mb-4 fade-up">
                <p className="label-overline text-[var(--serve-green)] mb-3">Made to Order</p>
                <h2 className="text-display-md text-[var(--serve-dark)] font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  Toasties / Wraps.
                </h2>
                <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
              </div>
              <p className="label-overline fade-up mb-10" style={{ fontSize: '0.6rem', color: 'var(--serve-dark)', opacity: 0.45, letterSpacing: '0.15em' }}>
                Farmhouse white / health linseed bread
              </p>
              <div className="max-w-screen-md">
                {toasties.map((item, i) => (
                  <div key={item.name} className="fade-up py-5 border-b" style={{ transitionDelay: `${i * 0.05}s`, borderColor: 'rgba(20,20,20,0.1)' }}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--serve-dark)', marginBottom: item.description ? '0.25rem' : 0 }}>
                          {item.name}
                        </h3>
                        {item.description && (
                          <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.78rem', color: 'var(--serve-dark)', opacity: 0.6, lineHeight: 1.6 }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--serve-dark)', flexShrink: 0 }}>
                        R{item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pizzas */}
          <section className="section-padding-sm">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
              <div className="mb-12 fade-up">
                <p className="label-overline text-[var(--serve-green)] mb-3">Stone-Baked</p>
                <h2 className="text-display-md text-[var(--serve-dark)] font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  Pizza.
                </h2>
                <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
                {pizzas.map((item, i) => (
                  <div key={item.name} className="fade-up py-6 border-b" style={{ transitionDelay: `${i * 0.05}s`, borderColor: 'rgba(20,20,20,0.1)' }}>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--serve-dark)' }}>
                          {item.name}
                        </h3>
                        {item.vegetarian && (
                          <span style={{ fontSize: '0.55rem', fontFamily: 'var(--font-jost)', color: 'var(--serve-green)', border: '1px solid var(--serve-green)', padding: '1px 5px', letterSpacing: '0.1em', flexShrink: 0 }}>V</span>
                        )}
                      </div>
                      <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--serve-dark)', flexShrink: 0 }}>
                        R{item.price}
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
        </div>
      )}

      {/* ─── DRINKS MENU ─── */}
      {activeTab === 'drinks' && (
        <div className="bg-[var(--serve-cream)]">

          {/* Coffee */}
          <section className="section-padding-sm">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
              <div className="mb-12 fade-up">
                <p className="label-overline text-[var(--serve-green)] mb-3">Specialty</p>
                <h2 className="text-display-md text-[var(--serve-dark)] font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  Coffee.
                </h2>
                <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
              </div>

              {/* Short/Tall header */}
              <div className="max-w-screen-md">
                <div className="flex justify-end gap-8 mb-2 fade-up">
                  <span className="label-overline" style={{ fontSize: '0.6rem', color: 'var(--serve-dark)', opacity: 0.4, letterSpacing: '0.15em', width: '2.5rem', textAlign: 'center' }}>SHORT</span>
                  <span className="label-overline" style={{ fontSize: '0.6rem', color: 'var(--serve-dark)', opacity: 0.4, letterSpacing: '0.15em', width: '2.5rem', textAlign: 'center' }}>TALL</span>
                </div>
                {coffee.map((item, i) => (
                  <div key={item.name} className="fade-up py-5 border-b flex items-center justify-between gap-4" style={{ transitionDelay: `${i * 0.05}s`, borderColor: 'rgba(20,20,20,0.1)' }}>
                    <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--serve-dark)' }}>
                      {item.name}
                      {item.note && <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.7rem', fontWeight: 400, opacity: 0.5, marginLeft: '0.5rem' }}>({item.note})</span>}
                    </h3>
                    <div className="flex gap-8 flex-shrink-0">
                      <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--serve-dark)', width: '2.5rem', textAlign: 'center' }}>
                        {item.short}
                      </span>
                      <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--serve-dark)', opacity: item.tall ? 1 : 0.2, width: '2.5rem', textAlign: 'center' }}>
                        {item.tall ?? '-'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Not Coffee */}
          <section className="bg-[var(--serve-warm)] section-padding-sm">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
              <div className="mb-12 fade-up">
                <p className="label-overline text-[var(--serve-green)] mb-3">Alternatives</p>
                <h2 className="text-display-md text-[var(--serve-dark)] font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  Not Coffee.
                </h2>
                <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
              </div>

              <div className="max-w-screen-md">
                <div className="flex justify-end gap-8 mb-2 fade-up">
                  <span className="label-overline" style={{ fontSize: '0.6rem', color: 'var(--serve-dark)', opacity: 0.4, letterSpacing: '0.15em', width: '2.5rem', textAlign: 'center' }}>SHORT</span>
                  <span className="label-overline" style={{ fontSize: '0.6rem', color: 'var(--serve-dark)', opacity: 0.4, letterSpacing: '0.15em', width: '2.5rem', textAlign: 'center' }}>TALL</span>
                </div>
                {notCoffee.map((item, i) => (
                  <div key={item.name} className="fade-up py-5 border-b flex items-center justify-between gap-4" style={{ transitionDelay: `${i * 0.05}s`, borderColor: 'rgba(20,20,20,0.1)' }}>
                    <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--serve-dark)' }}>
                      {item.name}
                      {item.note && <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.7rem', fontWeight: 400, opacity: 0.5, marginLeft: '0.5rem' }}>({item.note})</span>}
                    </h3>
                    <div className="flex gap-8 flex-shrink-0">
                      <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--serve-dark)', width: '2.5rem', textAlign: 'center' }}>
                        {item.short}
                      </span>
                      <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--serve-dark)', opacity: item.tall ? 1 : 0.2, width: '2.5rem', textAlign: 'center' }}>
                        {item.tall ?? '-'}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="fade-up pt-8 flex flex-col gap-2" style={{ transitionDelay: '0.35s' }}>
                  <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: 'var(--serve-dark)', opacity: 0.5, letterSpacing: '0.05em' }}>
                    <span style={{ fontWeight: 600, opacity: 0.8 }}>Milk alternatives:</span> oat / almond / macadamia &nbsp;+R10
                  </p>
                  <p style={{ fontFamily: 'var(--font-jost)', fontSize: '0.72rem', color: 'var(--serve-dark)', opacity: 0.5, letterSpacing: '0.05em' }}>
                    <span style={{ fontWeight: 600, opacity: 0.8 }}>Flavoured syrups:</span> vanilla / hazelnut / salted caramel &nbsp;+R10
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cold */}
          <section className="section-padding-sm">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
              <div className="mb-4 fade-up">
                <p className="label-overline text-[var(--serve-green)] mb-3">Chilled</p>
                <h2 className="text-display-md text-[var(--serve-dark)] font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  Cold.
                </h2>
                <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
              </div>
              <p className="label-overline fade-up mb-10" style={{ fontSize: '0.6rem', color: 'var(--serve-dark)', opacity: 0.45, letterSpacing: '0.15em' }}>350ml</p>
              <div className="max-w-screen-md">
                {cold.map((item, i) => (
                  <div key={item.name} className="fade-up py-5 border-b flex items-center justify-between gap-4" style={{ transitionDelay: `${i * 0.05}s`, borderColor: 'rgba(20,20,20,0.1)' }}>
                    <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--serve-dark)' }}>
                      {item.name}
                    </h3>
                    <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--serve-dark)', flexShrink: 0 }}>
                      R{item.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Shakes */}
              <div className="mt-16">
                <div className="mb-4 fade-up">
                  <div className="flex items-baseline justify-between max-w-screen-md">
                    <h2 className="text-display-md text-[var(--serve-dark)] font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>
                      Shakes.
                    </h2>
                    <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--serve-dark)' }}>R55</span>
                  </div>
                  <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
                </div>
                <p className="label-overline fade-up mb-2" style={{ fontSize: '0.6rem', color: 'var(--serve-dark)', opacity: 0.45, letterSpacing: '0.15em' }}>350ml</p>
                <p className="fade-up" style={{ fontFamily: 'var(--font-jost)', fontSize: '0.85rem', color: 'var(--serve-dark)', opacity: 0.6 }}>
                  Chocolate / Strawberry / Bubblegum
                </p>
              </div>
            </div>
          </section>

          {/* Smoothies */}
          <section className="bg-[var(--serve-warm)] section-padding-sm">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
              <div className="mb-4 fade-up">
                <p className="label-overline text-[var(--serve-green)] mb-3">Blended Fresh</p>
                <div className="flex items-baseline justify-between max-w-screen-md">
                  <h2 className="text-display-md text-[var(--serve-dark)] font-light" style={{ fontFamily: 'var(--font-cormorant)' }}>
                    Smoothies.
                  </h2>
                  <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--serve-dark)' }}>R80</span>
                </div>
                <div style={{ width: '40px', height: '1px', background: 'var(--serve-amber)', marginTop: '1rem' }} />
              </div>
              <p className="label-overline fade-up mb-10" style={{ fontSize: '0.6rem', color: 'var(--serve-dark)', opacity: 0.45, letterSpacing: '0.15em' }}>500ml</p>
              <div className="max-w-screen-md">
                {smoothies.map((item, i) => (
                  <div key={item.name} className="fade-up py-6 border-b" style={{ transitionDelay: `${i * 0.05}s`, borderColor: 'rgba(20,20,20,0.1)' }}>
                    <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: 500, color: 'var(--serve-dark)', marginBottom: '0.25rem' }}>
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


    </div>
  )
}
