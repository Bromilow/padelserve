import { describe, it, expect } from 'vitest'
import { generateSessionInstances } from './recurrence'
import type { RecurrenceTemplate } from './types'

const template: RecurrenceTemplate = {
  id: 'tpl-1',
  title: 'Morning Flow',
  instructor: 'Sarah M.',
  day_of_week: 3, // Wednesday
  start_time: '07:00',
  duration_minutes: 60,
  capacity: 15,
  is_active: true,
  created_at: '2026-04-29T00:00:00Z',
}

describe('generateSessionInstances', () => {
  it('generates sessions on the correct day of week', () => {
    // 2026-04-27 is a Monday; target is Wednesday (3)
    const from = new Date('2026-04-27T00:00:00')
    const sessions = generateSessionInstances(template, 2, from)
    sessions.forEach(s => {
      expect(new Date(s.date + 'T00:00:00').getDay()).toBe(3)
    })
  })

  it('generates 8 instances for 8 weeks ahead', () => {
    const from = new Date('2026-04-27T00:00:00')
    const sessions = generateSessionInstances(template, 8, from)
    expect(sessions.length).toBe(8)
  })

  it('first instance is the next target weekday on or after fromDate', () => {
    const from = new Date('2026-04-27T00:00:00') // Monday
    const [first] = generateSessionInstances(template, 1, from)
    expect(first.date).toBe('2026-04-29') // next Wednesday
  })

  it('includes fromDate itself when it matches the target weekday', () => {
    const from = new Date('2026-04-29T00:00:00') // Wednesday
    const [first] = generateSessionInstances(template, 1, from)
    expect(first.date).toBe('2026-04-29')
  })

  it('copies all template fields to each instance', () => {
    const from = new Date('2026-04-27T00:00:00')
    const [first] = generateSessionInstances(template, 1, from)
    expect(first.title).toBe('Morning Flow')
    expect(first.instructor).toBe('Sarah M.')
    expect(first.start_time).toBe('07:00')
    expect(first.duration_minutes).toBe(60)
    expect(first.capacity).toBe(15)
    expect(first.is_recurring).toBe(true)
    expect(first.recurrence_template_id).toBe('tpl-1')
    expect(first.is_active).toBe(true)
  })

  it('spaces sessions exactly 7 days apart', () => {
    const from = new Date('2026-04-27T00:00:00')
    const sessions = generateSessionInstances(template, 4, from)
    for (let i = 1; i < sessions.length; i++) {
      const prev = new Date(sessions[i - 1].date + 'T00:00:00')
      const curr = new Date(sessions[i].date + 'T00:00:00')
      const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
      expect(diffDays).toBe(7)
    }
  })
})
