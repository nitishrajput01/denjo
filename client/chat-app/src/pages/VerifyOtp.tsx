import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useLocation, useNavigate } from 'react-router'
import { message } from 'antd'
import { Logo } from '../components/ui/Logo'
import { RegisterIllustration } from '../components/ui/RegisterIllustration'
import './VerifyOtp.css'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { verifyOtpAction, resetOtpState } from '../store/slices/otp.slice'

const otpSchema = z.object({
  otp: z
    .string()
    .min(1, 'OTP is required')
    .regex(/^\d{6}$/, 'Enter the 6 digit code'),
})

type OtpFormValues = z.infer<typeof otpSchema>

export function VerifyOtp() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const email = (location.state as { email?: string } | null)?.email

  const { loading, error, success } = useAppSelector((state) => state.otp)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  })

  useEffect(() => {
    if (!email) {
      navigate('/register')
    }
  }, [email, navigate])

  const onSubmit = (values: OtpFormValues) => {
    if (!email) return
    dispatch(verifyOtpAction({ email, otp: values.otp }))
  }

  useEffect(() => {
    if (error) {
      message.error(error)
      dispatch(resetOtpState())
    }
  }, [error, dispatch])

  useEffect(() => {
    if (success) {
      navigate('/login')
    }
  }, [success, navigate])

  return (
    <div className="verify-otp">
      <div className="verify-otp__topbar">
        <Logo className="verify-otp__logo" />
        <Link to="/login" className="verify-otp__signin">
          Already have an account? <span>Sign in</span>
        </Link>
      </div>

      <div className="verify-otp__card">
        <div className="verify-otp__illustration">
          <div className="verify-otp__illustration-art">
            <RegisterIllustration />
          </div>
        </div>

        <div className="verify-otp__panel">
          <div className="verify-otp__form-wrap">
            <h1 className="verify-otp__title">Verify your email</h1>
            <p className="verify-otp__subtitle">
              {email
                ? <>We've sent a 6 digit code to <strong>{email}</strong>. Enter it below to verify your account.</>
                : 'We’ve sent a 6 digit code to your email. Enter it below to verify your account.'}
            </p>

            <form className="verify-otp__form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <label className="field">
                <span className="field__label">OTP Code</span>
                <input
                  className={errors.otp ? 'field__input field__input--error verify-otp__input' : 'field__input verify-otp__input'}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="000000"
                  {...register('otp')}
                />
                {errors.otp && <span className="field__error">{errors.otp.message}</span>}
              </label>

              <button type="submit" className="verify-otp__submit" disabled={loading}>
                {loading ? 'Verifying…' : 'Verify Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
