import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 280, damping: 26 } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.15 } },
};

const courses = ['B.Tech', 'B.E.', 'B.Sc', 'BCA', 'BBA', 'M.Tech', 'MCA', 'MBA', 'Other'];

export default function OnboardingStep1({ data, onNext }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: data.name || '', email: data.email || '', university: data.university || '', course: data.course || '' },
  });

  const onSubmit = (formData) => onNext(formData);

  return (
    <motion.div className="auth-form-wrapper" variants={variants} initial="initial" animate="animate" exit="exit">
      <div className="auth-header">
        <h2 className="auth-title">Tell us about yourself</h2>
        <p className="auth-subtitle">Step 1 of 2 — Basic info</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={`auth-field ${errors.name ? 'has-error' : ''}`}>
          <label className="auth-label">Full Name</label>
          <input
            className="auth-input"
            type="text"
            placeholder="Your full name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="auth-error">{errors.name.message}</span>}
        </div>

        <div className={`auth-field ${errors.email ? 'has-error' : ''}`}>
          <label className="auth-label">Email</label>
          <input
            className="auth-input"
            type="email"
            placeholder="you@university.edu.in"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            })}
          />
          {errors.email && <span className="auth-error">{errors.email.message}</span>}
        </div>

        <div className={`auth-field ${errors.university ? 'has-error' : ''}`}>
          <label className="auth-label">University</label>
          <input
            className="auth-input"
            type="text"
            placeholder="e.g. AKTU"
            {...register('university', { required: 'University is required' })}
          />
          {errors.university && <span className="auth-error">{errors.university.message}</span>}
        </div>

        <div className={`auth-field ${errors.course ? 'has-error' : ''}`}>
          <label className="auth-label">Course</label>
          <select className="auth-input auth-select" {...register('course', { required: 'Course is required' })}>
            <option value="">Select course</option>
            {courses.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.course && <span className="auth-error">{errors.course.message}</span>}
        </div>

        <motion.button
          className="auth-submit"
          type="submit"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
        >
          Next Step
        </motion.button>
      </form>
    </motion.div>
  );
}
