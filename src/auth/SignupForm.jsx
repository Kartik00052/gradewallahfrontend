import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from './AuthContext';
import OAuthButtons from './OAuthButtons';

const variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 280, damping: 26 } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.15 } },
};

export default function SignupForm({ onSwitch, onSuccess }) {
  const { signUp } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setError(null);
    setLoading(true);
    try {
      await signUp({ email: data.email, password: data.password });
      onSuccess();
    } catch (e) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="auth-form-wrapper" variants={variants} initial="initial" animate="animate" exit="exit">
      <div className="auth-header">
        <h2 className="auth-title">Create account</h2>
        <p className="auth-subtitle">Join Gradewallah and track your academics</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={`auth-field ${errors.email ? 'has-error' : ''}`}>
          <label className="auth-label">Email</label>
          <input
            className="auth-input"
            type="email"
            placeholder="you@university.edu.in"
            autoComplete="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
            })}
          />
          {errors.email && <span className="auth-error">{errors.email.message}</span>}
        </div>

        <div className={`auth-field ${errors.password ? 'has-error' : ''}`}>
          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="At least 6 characters"
            autoComplete="new-password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'At least 6 characters' },
            })}
          />
          {errors.password && <span className="auth-error">{errors.password.message}</span>}
        </div>

        <div className={`auth-field ${errors.confirmPassword ? 'has-error' : ''}`}>
          <label className="auth-label">Confirm Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="Repeat your password"
            autoComplete="new-password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (v) => v === password || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && <span className="auth-error">{errors.confirmPassword.message}</span>}
        </div>

        {error && (
          <motion.div className="auth-error-banner" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
            {error}
          </motion.div>
        )}

        <motion.button
          className="auth-submit"
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          aria-label="Create your account"
        >
          {loading ? <span className="auth-submit-spinner" /> : 'Create Account'}
        </motion.button>
      </form>

      <OAuthButtons />

      <p className="auth-switch">
        Already have an account?{' '}
        <button type="button" className="auth-link" onClick={() => onSwitch('login')} aria-label="Switch to sign in form">Sign in</button>
      </p>
    </motion.div>
  );
}
