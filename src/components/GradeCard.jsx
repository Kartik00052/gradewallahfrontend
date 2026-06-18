import { motion } from 'framer-motion';
import { scalePop } from '../motion';
import { getGrade } from '../utils/grades';

export default function GradeCard({ subject, index, onChange, onRemove }) {
  const grade = getGrade(subject.marks);

  const handleChange = (field, value) => {
    onChange(index, { ...subject, [field]: value });
  };

  return (
    <motion.div
      className="grade-card"
      variants={scalePop}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <div className="grade-card-header">
        <input
          className="grade-input grade-input-name"
          type="text"
          placeholder="Subject name"
          value={subject.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <motion.button
          className="grade-remove-btn"
          onClick={() => onRemove(index)}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
        >
          ✕
        </motion.button>
      </div>

      <div className="grade-card-fields">
        <div className="grade-field">
          <label className="grade-field-label">Code</label>
          <input
            className="grade-input grade-input-sm"
            type="text"
            placeholder="KCS-xxx"
            value={subject.code || ''}
            onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
          />
        </div>

        <div className="grade-field">
          <label className="grade-field-label">Credit</label>
          <select
            className="grade-input grade-select"
            value={subject.credit || ''}
            onChange={(e) => handleChange('credit', Number(e.target.value))}
          >
            <option value="">—</option>
            {[1, 2, 3, 4, 5].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="grade-field">
          <label className="grade-field-label">Marks</label>
          <input
            className="grade-input grade-input-sm"
            type="number"
            min="0"
            max="100"
            placeholder="0-100"
            value={subject.marks ?? ''}
            onChange={(e) => handleChange('marks', e.target.value === '' ? '' : Number(e.target.value))}
          />
        </div>

        <div className="grade-field grade-field-grade">
          <label className="grade-field-label">Grade</label>
          <div className={`grade-badge ${grade ? grade.grade.toLowerCase().replace('+', 'p') : ''}`}>
            {grade ? grade.grade : '—'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
