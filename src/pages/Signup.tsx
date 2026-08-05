import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Mail, Lock, User, Info } from 'lucide-react'
import Seo from '../components/Seo'

function Signup() {
  const [form, setForm] = useState({ name: '', institution: '', email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: connect to auth backend — creates an Institution/Admin account
    console.log('Signup attempt:', form)
  }

  const inputClasses =
    'w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl pl-11 pr-4 py-3 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors'

  return (
    <>
      <Seo title="Sign Up" description="Create your institution account on HumanFirst and set up academic integrity enforcement for your school, college, or university." />
      <section className="px-6 py-20 min-h-[80vh] flex items-center">
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-md bg-green-600 flex items-center justify-center text-sm font-mono text-white mx-auto mb-4">
            HF
          </div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
            Create Your Institution Account
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm">
            Set up HumanFirst for your school, college, or university
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400 dark:text-neutral-500" strokeWidth={2} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ahmed Khan"
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Institution Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400 dark:text-neutral-500" strokeWidth={2} />
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  required
                  value={form.institution}
                  onChange={handleChange}
                  placeholder="Government College University"
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Work Email
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
                  placeholder="admin@institution.edu"
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400 dark:text-neutral-500" strokeWidth={2} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className={inputClasses}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md shadow-green-600/20 hover:shadow-lg hover:shadow-green-600/30 hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </form>

          <div className="mt-5 flex items-start gap-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl p-3.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              Students don't sign up directly — once your institution account is set up, you can invite students by email.
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-green-700 dark:text-green-400 font-semibold hover:text-green-600 dark:hover:text-green-300">
            Login
          </Link>
        </p>
      </div>
    </section>
    </>
  )
}

export default Signup