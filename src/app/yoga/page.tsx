import type { Metadata } from 'next'
import YogaContent from './YogaContent'

export const metadata: Metadata = {
  title: 'Yoga Sessions | SERVE Padel & Play',
  description: 'Book yoga sessions at SERVE Padel & Play in Umhlanga.',
}

export default function YogaPage() {
  return <YogaContent />
}
