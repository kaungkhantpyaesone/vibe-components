import './LunarPhase.css'

// ─── Moon-phase calculation ────────────────────────────────────────────────────
// Reference new moon: 6 January 2000 18:14 UTC (J2000 epoch)
const REFERENCE_NEW_MOON = new Date('2000-01-06T18:14:00Z')
const SYNODIC_PERIOD = 29.530588861 // days

/** Returns the moon's age in days (0 = new moon, ~14.77 = full moon) */
function getMoonAge(date: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24
  const elapsed = (date.getTime() - REFERENCE_NEW_MOON.getTime()) / msPerDay
  return ((elapsed % SYNODIC_PERIOD) + SYNODIC_PERIOD) % SYNODIC_PERIOD
}

/** Returns illumination fraction 0–1 */
function getIllumination(age: number): number {
  return (1 - Math.cos((age / SYNODIC_PERIOD) * 2 * Math.PI)) / 2
}

// ─── Phase data ────────────────────────────────────────────────────────────────
// Images sourced from NASA's Scientific Visualization Studio (SVS)
// Moon Phases Loop – https://svs.gsfc.nasa.gov/4254/
const SVS_BASE =
  'https://svs.gsfc.nasa.gov/vis/a000000/a004200/a004254'

type PhaseEntry = {
  name: string
  description: string
  src: string
  /** Centre of the phase band in days */
  peak: number
}

const PHASES: PhaseEntry[] = [
  {
    name: 'New Moon',
    description:
      "The Moon is between Earth and the Sun. Its near side faces away from us and is not illuminated, so it is invisible in the night sky.",
    src: `${SVS_BASE}/ph0_new_moon_2k_print.jpg`,
    peak: 0,
  },
  {
    name: 'Waxing Crescent',
    description:
      "A sliver of the Moon\u2019s right side becomes visible as it moves away from the Sun. Each night the crescent grows wider.",
    src: `${SVS_BASE}/ph1_waxing_crescent_2k_print.jpg`,
    peak: SYNODIC_PERIOD * (1 / 8),
  },
  {
    name: 'First Quarter',
    description:
      "Exactly half of the Moon\u2019s near side is illuminated. It rises around noon and sets around midnight, visible in the afternoon and evening sky.",
    src: `${SVS_BASE}/ph2_first_quarter_2k_print.jpg`,
    peak: SYNODIC_PERIOD * (2 / 8),
  },
  {
    name: 'Waxing Gibbous',
    description:
      'More than half of the Moon is lit. The illuminated area continues to grow each night toward full phase.',
    src: `${SVS_BASE}/ph3_waxing_gibbous_2k_print.jpg`,
    peak: SYNODIC_PERIOD * (3 / 8),
  },
  {
    name: 'Full Moon',
    description:
      'The Moon is on the opposite side of Earth from the Sun, so its entire near side is fully illuminated. It rises at sunset and sets at sunrise.',
    src: `${SVS_BASE}/ph4_full_moon_2k_print.jpg`,
    peak: SYNODIC_PERIOD * (4 / 8),
  },
  {
    name: 'Waning Gibbous',
    description:
      'The illuminated area begins to shrink from the left side. The Moon rises after sunset and is still more than half lit.',
    src: `${SVS_BASE}/ph5_waning_gibbous_2k_print.jpg`,
    peak: SYNODIC_PERIOD * (5 / 8),
  },
  {
    name: 'Last Quarter',
    description:
      'The left half of the Moon is now illuminated. It rises around midnight and sets around noon, visible in the early morning sky.',
    src: `${SVS_BASE}/ph6_third_quarter_2k_print.jpg`,
    peak: SYNODIC_PERIOD * (6 / 8),
  },
  {
    name: 'Waning Crescent',
    description:
      "Only a shrinking crescent on the Moon\u2019s left side remains lit. It rises just before dawn and fades as daylight grows.",
    src: `${SVS_BASE}/ph7_waning_crescent_2k_print.jpg`,
    peak: SYNODIC_PERIOD * (7 / 8),
  },
]

function getPhaseIndex(age: number): number {
  // Each phase occupies 1/8 of the synodic period, offset by half a band
  // so "New Moon" is centred on day 0 (and also wraps at ~29.5)
  const bandWidth = SYNODIC_PERIOD / 8
  const shifted = (age + bandWidth / 2) % SYNODIC_PERIOD
  return Math.min(Math.floor(shifted / bandWidth), 7)
}

// ─── Component ─────────────────────────────────────────────────────────────────
export type LunarPhaseProps = {
  /** Date to display the moon phase for. Defaults to the current date/time. */
  date?: Date
}

export function LunarPhase({ date = new Date() }: LunarPhaseProps) {
  const age = getMoonAge(date)
  const phaseIndex = getPhaseIndex(age)
  const illumination = getIllumination(age)
  const phase = PHASES[phaseIndex]

  const illuminationPct = Math.round(illumination * 100)

  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="lunar-phase">
      <div className="lunar-phase__image-wrap">
        <img
          alt={phase.name}
          className="lunar-phase__image"
          loading="lazy"
          src={phase.src}
        />
      </div>

      <div className="lunar-phase__body">
        <div className="lunar-phase__meta">
          <span className="lunar-phase__date">{formattedDate}</span>
          <span className="lunar-phase__illumination">
            {illuminationPct}% illuminated
          </span>
        </div>

        <h2 className="lunar-phase__name">{phase.name}</h2>
        <p className="lunar-phase__desc">{phase.description}</p>

        <div className="lunar-phase__progress" aria-label={`Moon cycle progress: ${Math.round((age / SYNODIC_PERIOD) * 100)}%`}>
          {PHASES.map((p, i) => (
            <button
              aria-current={i === phaseIndex ? 'true' : undefined}
              className={`lunar-phase__pip${i === phaseIndex ? ' lunar-phase__pip--active' : ''}`}
              key={p.name}
              title={p.name}
              type="button"
            >
              <span className="lunar-phase__pip-label">{p.name}</span>
            </button>
          ))}
        </div>

        <p className="lunar-phase__credit">
          Images:{' '}
          <a
            href="https://svs.gsfc.nasa.gov/4254/"
            rel="noopener noreferrer"
            target="_blank"
          >
            NASA Scientific Visualization Studio
          </a>
        </p>
      </div>
    </div>
  )
}
