import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router'
import { message } from 'antd'
import { Logo } from '../components/ui/Logo'
import { RegisterIllustration } from '../components/ui/RegisterIllustration'
import './Register.css'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { registerAction, resetRegisterState } from '../store/slices/register.slice'

const passwordRequirements = [
  { id: 'length', label: 'Minimum 8 characters', test: (value: string) => value.length >= 8 },
  { id: 'lowercase', label: 'One lowercase letter', test: (value: string) => /[a-z]/.test(value) },
  { id: 'uppercase', label: 'One uppercase letter', test: (value: string) => /[A-Z]/.test(value) },
  { id: 'symbol', label: 'One symbol', test: (value: string) => /[^A-Za-z0-9]/.test(value) },
]

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(24, 'Username must be at most 24 characters')
    .regex(/^[a-zA-Z0-9_.]+$/, 'Only letters, numbers, dot and underscores are allowed'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .refine(
      (value) => passwordRequirements.every((requirement) => requirement.test(value)),
      'Password does not meet all requirements',
    ),
  agree: z.boolean().refine((value) => value === true, 'You must agree to the Terms of Service'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useAppSelector((state) => state.register);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', username: '', email: '', password: '', agree: false },
  })

  const password = watch('password')
  const email = watch('email')

  const onSubmit = (values: RegisterFormValues) => {
    const {agree, ...remainingValues} = values
    dispatch(registerAction(remainingValues))
  }

  useEffect(() => {
    if (error) {
      message.error(error)
      dispatch(resetRegisterState())
    }
  }, [error, dispatch])

  useEffect(() => {
    if (success) {
      navigate('/verify-otp', { state: { email } })
    }
  }, [success, navigate, email])

  return (
    <div className="register">
      <div className="register__topbar">
        <Logo className="register__logo" />
        <Link to="/login" className="register__signin">
          Already have an account? <span>Sign in</span>
        </Link>
      </div>

      <div className="register__card">
        <div className="register__illustration">
          <div className="register__illustration-art">
            <RegisterIllustration />
          </div>
        </div>

        <div className="register__panel">
          <div className="register__form-wrap">
          <h1 className="register__title">Sign up to Denjo</h1>
          <p className="register__subtitle">
            Join the conversation. Create your account and start chatting in seconds.
          </p>

          <div className="register__oauth">
            <button type="button" className="register__oauth-btn">
              Sign up with Google
            </button>
            <button type="button" className="register__oauth-btn">
              Sign up with Facebook
            </button>
          </div>

          <div className="register__divider">
            <span>or</span>
          </div>

            <form className="register__form" onSubmit={handleSubmit(onSubmit)} noValidate>
               <label className="field">
                <span className="field__label">Name</span>
                <input
                  className={errors.name ? 'field__input field__input--error' : 'field__input'}
                  type="text"
                  autoComplete="name"
                  {...register('name')}
                />
                {errors.name && <span className="field__error">{errors.name.message}</span>}
              </label>
              <label className="field">
                <span className="field__label">Username</span>
                <input
                  className={errors.username ? 'field__input field__input--error' : 'field__input'}
                  type="text"
                  autoComplete="username"
                  {...register('username')}
                />
                {errors.username && <span className="field__error">{errors.username.message}</span>}
              </label>

              <label className="field">
                <span className="field__label">Email Address</span>
                <input
                  className={errors.email ? 'field__input field__input--error' : 'field__input'}
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                />
                {errors.email && <span className="field__error">{errors.email.message}</span>}
              </label>

              <label className="field">
                <span className="field__label">Password</span>
                <input
                  className={errors.password ? 'field__input field__input--error' : 'field__input'}
                  type="password"
                  autoComplete="new-password"
                  {...register('password')}
                />
                <ul className="password-rules">
                  {passwordRequirements.map((requirement) => {
                    const met = requirement.test(password ?? '')
                    return (
                      <li key={requirement.id} className={met ? 'password-rules__met' : 'password-rules__unmet'}>
                        {met ? '✓' : '•'} {requirement.label}
                      </li>
                    )
                  })}
                </ul>
              </label>

              <label className="field field--checkbox">
                <input type="checkbox" {...register('agree')} />
                <span>
                  I've read and agree with the <a href="#">Terms of Service</a> and our{' '}
                  <a href="#">Privacy Policy</a>
                </span>
              </label>
              {errors.agree && <span className="field__error">{errors.agree.message}</span>}

              <button type="submit" className="register__submit" disabled={loading}>
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
