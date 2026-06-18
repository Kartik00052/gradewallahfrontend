import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 280, damping: 26 } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.15 } },
};

const branches = [
  'CSE', 'IT', 'ECE', 'EE', 'ME', 'CE', 'AI & ML', 'DS', 'CSIT', 'AIML',
  'Chemical', 'Biotech', 'Others',
];

const batchGroups = ['2024-2028', '2023-2027', '2022-2026', '2021-2025', 'Other'];

const domains = [
  'Web Development', 'App Development', 'AI & ML', 'Data Science',
  'Cybersecurity', 'Cloud Computing', 'Blockchain', 'IoT',
  'Competitive Programming', 'Open Source', 'DevOps', 'Other',
];

export default function OnboardingStep2({ data, onBack, onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      college: data.college || '',
      rollNumber: data.rollNumber || '',
      branch: data.branch || '',
      batchGroup: data.batchGroup || '',
      domain: data.domain || '',
    },
  });

  const handleFormSubmit = (formData) => onSubmit(formData);

  return (
    <motion.div className="auth-form-wrapper" variants={variants} initial="initial" animate="animate" exit="exit">
      <div className="auth-header">
        <h2 className="auth-title">Almost done!</h2>
        <p className="auth-subtitle">Step 2 of 2 — Academic details</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className={`auth-field ${errors.college ? 'has-error' : ''}`}>
          <label className="auth-label">College</label>
          <input
            className="auth-input"
            type="text"
            placeholder="Your college name"
            {...register('college', { required: 'College is required' })}
          />
          {errors.college && <span className="auth-error">{errors.college.message}</span>}
        </div>

        <div className={`auth-field ${errors.rollNumber ? 'has-error' : ''}`}>
          <label className="auth-label">Roll Number</label>
          <input
            className="auth-input"
            type="text"
            placeholder="e.g. 220011010001"
            {...register('rollNumber', { required: 'Roll number is required' })}
          />
          {errors.rollNumber && <span className="auth-error">{errors.rollNumber.message}</span>}
        </div>

        <div className={`auth-field ${errors.branch ? 'has-error' : ''}`}>
          <label className="auth-label">Branch</label>
          <select className="auth-input auth-select" {...register('branch', { required: 'Branch is required' })}>
            <option value="">Select branch</option>
            {branches.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          {errors.branch && <span className="auth-error">{errors.branch.message}</span>}
        </div>

        <div className={`auth-field ${errors.batchGroup ? 'has-error' : ''}`}>
          <label className="auth-label">Batch Group</label>
          <select className="auth-input auth-select" {...register('batchGroup', { required: 'Batch is required' })}>
            <option value="">Select batch</option>
            {batchGroups.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          {errors.batchGroup && <span className="auth-error">{errors.batchGroup.message}</span>}
        </div>

        <div className={`auth-field ${errors.domain ? 'has-error' : ''}`}>
          <label className="auth-label">Domain of Interest</label>
          <select className="auth-input auth-select" {...register('domain', { required: 'Domain is required' })}>
            <option value="">Select domain</option>
            {domains.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {errors.domain && <span className="auth-error">{errors.domain.message}</span>}
        </div>

        <div className="auth-row">
          <motion.button
            type="button"
            className="auth-submit auth-back"
            onClick={onBack}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
          >
            Back
          </motion.button>
          <motion.button
            type="submit"
            className="auth-submit"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
          >
            Complete Setup
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
