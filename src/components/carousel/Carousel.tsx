import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import './Carousel.css'

export type CarouselProps = {
  children: ReactNode[]
  interval?: number
}

const RADIUS = 10
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function Carousel({ children, interval = 10_000 }: CarouselProps) {
  const count = children.length
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const startRef = useRef(Date.now())
  const rafRef = useRef(0)

  useEffect(() => {
    startRef.current = Date.now()
    setProgress(0)

    const tick = () => {
      const elapsed = Date.now() - startRef.current
      const p = Math.min(elapsed / interval, 1)
      setProgress(p)
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setActiveIndex((prev) => (prev + 1) % count)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [activeIndex, interval, count])

  return (
    <div aria-roledescription="carousel" className="carousel">
      <div className="carousel__viewport">
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {children.map((child, i) => (
            <div
              aria-hidden={i !== activeIndex}
              aria-label={`Slide ${i + 1} of ${count}`}
              aria-roledescription="slide"
              className="carousel__slide"
              key={i}
              role="group"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <div aria-label="Carousel navigation" className="carousel__dots" role="tablist">
        {children.map((_, i) => (
          <button
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === activeIndex}
            className={`carousel__dot${i === activeIndex ? ' carousel__dot--active' : ''}`}
            key={i}
            onClick={() => setActiveIndex(i)}
            role="tab"
            type="button"
          >
            {i === activeIndex && (
              <svg
                aria-hidden="true"
                className="carousel__ring"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle className="carousel__ring-track" cx="12" cy="12" r={RADIUS} />
                <circle
                  className="carousel__ring-fill"
                  cx="12"
                  cy="12"
                  r={RADIUS}
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
