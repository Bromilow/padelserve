export type UserRole = 'user' | 'admin'
export type BookingStatus = 'confirmed' | 'cancelled'

export interface Profile {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  created_at: string
}

export interface Session {
  id: string
  title: string
  instructor: string
  date: string
  start_time: string
  duration_minutes: number
  capacity: number
  is_recurring: boolean
  recurrence_template_id: string | null
  is_active: boolean
  created_at: string
}

export interface RecurrenceTemplate {
  id: string
  title: string
  instructor: string
  day_of_week: number
  start_time: string
  duration_minutes: number
  capacity: number
  is_active: boolean
  created_at: string
}

export interface Booking {
  id: string
  user_id: string
  session_id: string
  status: BookingStatus
  created_at: string
}

export interface BookingWithSession extends Booking {
  sessions: Session
}

export interface BookingWithProfile extends Booking {
  profiles: Profile
}
