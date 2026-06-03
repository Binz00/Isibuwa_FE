/**
 * components/booking/BookingForm.jsx
 * Complete booking form with react-hook-form + zod validation.
 * Submits as multipart/form-data including payment slip.
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { FileUpload } from './FileUpload'
import { submitBooking } from '../../services/api'

const SRI_LANKAN_DISTRICTS = [
  'Ampara',
  'Anuradhapura',
  'Badulla',
  'Batticaloa',
  'Colombo',
  'Galle',
  'Gampaha',
  'Hambantota',
  'Jaffna',
  'Kalutara',
  'Kandy',
  'Kegalle',
  'Kilinochchi',
  'Kurunegala',
  'Mannar',
  'Matale',
  'Matara',
  'Moneragala',
  'Mullaitivu',
  'Nuwara Eliya',
  'Polonnaruwa',
  'Puttalam',
  'Ratnapura',
  'Trincomalee',
  'Vavuniya'
]

// ── Zod schema ────────────────────────────────────────────────
const bookingSchema = z.object({
  name:  z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Phone must be at least 7 characters').max(20),
  district: z.string().min(2, 'District must be at least 2 characters').max(50),
  payment_reference: z.string().min(3, 'Payment reference must be at least 3 characters').max(50),
})

export function BookingForm() {
  const [file,        setFile]        = useState(null)
  const [fileError,   setFileError]   = useState(null)
  const [status,      setStatus]      = useState('idle') // idle | loading | success | error | full
  const [errorMsg,    setErrorMsg]    = useState('')
  const [bookingId,   setBookingId]   = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(bookingSchema) })

  const onSubmit = async (data) => {
    // Validate file
    if (!file) {
      setFileError({ message: 'Payment slip is required' })
      return
    }
    setFileError(null)
    setStatus('loading')
    setErrorMsg('')

    try {
      const formData = new FormData()
      formData.append('name',              data.name)
      formData.append('email',             data.email)
      formData.append('phone',             data.phone)
      formData.append('district',          data.district)
      formData.append('payment_reference', data.payment_reference)
      formData.append('payment_slip',      file)

      const response = await submitBooking(formData)
      setBookingId(response.data.bookingId)
      setStatus('success')
      reset()
      setFile(null)
    } catch (err) {
      const statusCode = err.response?.status
      const message    = err.response?.data?.error || 'Something went wrong. Please try again.'

      if (statusCode === 409) {
        setStatus('full')
      } else {
        setStatus('error')
        setErrorMsg(message)
      }
    }
  }

  // ── Success state ─────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Booking Submitted!</h3>
        <p className="text-white/60 mb-2 max-w-md mx-auto leading-relaxed">
          Thank you! Your booking #{bookingId} has been received. We'll review your payment slip and email you within 24–48 hours.
        </p>
        <p className="text-white/40 text-sm mb-8">
          Keep an eye on your inbox (including spam).
        </p>
        <Button variant="secondary" onClick={() => setStatus('idle')}>
          Submit Another Booking
        </Button>
      </div>
    )
  }

  // ── Fully booked state ────────────────────────────────────
  if (status === 'full') {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Event Fully Booked</h3>
        <p className="text-white/60 max-w-md mx-auto">
          Unfortunately, all 150 spots have been filled. Follow our social media for future events.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Input
        label="Full Name"
        name="name"
        register={register}
        error={errors.name}
        placeholder="e.g. Binura Senevirathna"
      />
      <Input
        label="Email Address"
        name="email"
        type="email"
        register={register}
        error={errors.email}
        placeholder="you@example.com"
      />
      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        register={register}
        error={errors.phone}
        placeholder="+94 77 123 4567"
      />
      <Select
        label="District"
        name="district"
        register={register}
        error={errors.district}
        placeholder="Select your district"
        options={SRI_LANKAN_DISTRICTS}
      />
      <Input
        label="Payment Reference Number"
        name="payment_reference"
        register={register}
        error={errors.payment_reference}
        placeholder="e.g. TXN1029384"
      />
      <FileUpload onChange={setFile} error={fileError} />

      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {errorMsg}
        </div>
      )}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        loading={status === 'loading'}
        disabled={status === 'loading'}
        className="w-full mt-2"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Booking'}
      </Button>

      <p className="text-center text-xs text-white/30">
        By submitting, you confirm your payment has been made and agree to event terms.
      </p>
    </form>
  )
}
