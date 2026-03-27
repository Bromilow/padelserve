'use client'

import { useEffect, useRef, ReactNode } from 'react'

type AnimationType = 'fade-up' | 'fade-in' | 'reveal-left' | 'reveal-right' | 'scale-reveal'

interface AnimateInProps {
  children: ReactNode
  className?: string
  animation?: AnimationType
  delay?: number
  threshold?: number
}

export default function AnimateIn({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  threshold = 0.15,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [delay, threshold])

  return (
    <div ref={ref} className={`${animation} ${className}`}>
      {children}
    </div>
  )
}
