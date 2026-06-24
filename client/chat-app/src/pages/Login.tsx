import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router'
import { message } from 'antd'
import { Logo } from '../components/ui/Logo'
import { RegisterIllustration } from '../components/ui/RegisterIllustration'
import './Login.css'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { loginAction } from '../store/slices/login.slice'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loading, error, token } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = (values: LoginFormValues) => {
    dispatch(loginAction(values))
  }

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  useEffect(() => {
    if (token && token['userId']) {
      sessionStorage.setItem('token', token['accessToken']);
      navigate('/')
    }
  }, [token, navigate])

  return (
    <div className="login">
      <div className="login__topbar">
        <Logo className="login__logo" />
        <Link to="/register" className="login__signup">
          Don't have an account? <span>Sign up</span>
        </Link>
      </div>

      <div className="login__card">
        <div className="login__illustration">
          <div className="login__illustration-art">
            <RegisterIllustration />
          </div>
        </div>

        <div className="login__panel">
          <div className="login__form-wrap">
            <h1 className="login__title">Sign in to Denjo</h1>
            <p className="login__subtitle">
              Welcome back. Enter your details to continue chatting.
            </p>

            <div className="login__oauth">
              <button type="button" className="login__oauth-btn">
                Sign in with Google
              </button>
              <button type="button" className="login__oauth-btn">
                Sign in with Facebook
              </button>
            </div>

            <div className="login__divider">
              <span>or</span>
            </div>

            <form className="login__form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                <span className="field__label">Password</span>
                <input
                  className={errors.password ? 'field__input field__input--error' : 'field__input'}
                  type="password"
                  autoComplete="current-password"
                  {...register('password')}
                />
                {errors.password && <span className="field__error">{errors.password.message}</span>}
              </label>

              <button type="submit" className="login__submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
