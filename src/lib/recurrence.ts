import type { RecurrenceTemplate } from './types'

export interface SessionInput {
  title: string
  instructor: string
  date: string
  start_time: string
  duration_minutes: number
  capacity: number
  is_recurring: boolean
  recurrence_template_id: string
  is_active: boolean
}

export function generateSessionInstances(
  template: RecurrenceTemplate,
  weeksAhead = 8,
  fromDate = new Date()
): SessionInput[] {
  const sessions: SessionInput[] = []
  const start = new Date(fromDate)
  start.setHours(0, 0, 0, 0)

  const endDate = new Date(start)
  endDate.setDate(endDate.getDate() + weeksAhead * 7)

  const daysUntilTarget = (template.day_of_week - start.getDay() + 7) % 7
  const current = new Date(start)
  current.setDate(current.getDate() + daysUntilTarget)

  while (current <= endDate) {
    const year = current.getFullYear()
    const month = String(current.getMonth() + 1).padStart(2, '0')
    const day = String(current.getDate()).padStart(2, '0')
    sessions.push({
      title: template.title,
      instructor: template.instructor,
      date: `${year}-${month}-${day}`,
      start_time: template.start_time,
      duration_minutes: template.duration_minutes,
      capacity: template.capacity,
      is_recurring: true,
      recurrence_template_id: template.id,
      is_active: true,
    })
    current.setDate(current.getDate() + 7)
  }

  return sessions
}
