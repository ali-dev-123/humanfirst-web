import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Seo from '../components/Seo'

function Login() {
  const [role, setRole] = useState<'admin' | 'student'>('admin')
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: connect to auth backend — pass { role, ...form }
    console.log('Login attempt:', { role, ...form })
  }

  const inputClasses =
    'w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl pl-11 pr-4 py-3 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors'

  return (
    <>
      <Seo title="Login" description="Sign in to your HumanFirst account." />
      <section className="px-6 py-20 min-h-[80vh] flex items-center">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-md bg-green-600 flex items-center justify-center text-sm font-mono text-white mx-auto mb-4">
            HF
          </div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm">
            Sign in to continue to HumanFirst
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm">
          {/* Role toggle */}
          <div className="grid grid-cols-2 gap-2 mb-6 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                role === 'admin'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              }`}
            >
              <Building2 className="w-4 h-4" strokeWidth={2} />
              Institution
            </button>
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                role === 'student'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" strokeWidth={2} />
              Student
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400 dark:text-neutral-500" strokeWidth={2} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={role === 'admin' ? 'admin@institution.edu' : 'student@institution.edu'}
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-green-700 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400 dark:text-neutral-500" strokeWidth={2} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`${inputClasses} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" strokeWidth={2} /> : <Eye className="w-4.5 h-4.5" strokeWidth={2} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md shadow-green-600/20 hover:shadow-lg hover:shadow-green-600/30 hover:-translate-y-0.5"
            >
              Login {role === 'admin' ? 'as Institution' : 'as Student'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-6">
          Don't have an institution account?{' '}
          <Link to="/signup" className="text-green-700 dark:text-green-400 font-semibold hover:text-green-600 dark:hover:text-green-300">
            Sign up
          </Link>
        </p>
      </div>
    </section>
    </>
  )
}

export default Login