import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp, fadeInRight, scalePop, buttonTap } from '../motion';
import { useAnimatedInView, useCountUp } from '../motion';
import { analyseSubjects, simulateSGPA, generateSuggestions } from '../utils/analyser';
import { getGrade, calcSGPA } from '../utils/grades';

const sampleSubjects = [
  { name: 'Mathematics-IV', code: 'KCS-201', credit: 4, marks: 88 },
  { name: 'Data Structures', code: 'KCS-202', credit: 3, marks: 76 },
  { name: 'Digital Electronics', code: 'KEC-201', credit: 3, marks: 45 },
  { name: 'Discrete Maths', code: 'KCS-203', credit: 3, marks: 91 },
  { name: 'Python Programming', code: 'KCS-251', credit: 2, marks: 52 },
  { name: 'Computer Networks', code: 'KCS-402', credit: 3, marks: 58 },
  { name: 'Operating Systems', code: 'KCS-401', credit: 3, marks: 39 },
];

function PulseIndicator({ level }) {
  return (
    <motion.span
      className={`pulse-dot level-${level}`}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function SubjectAnalysisCard({ subject, type }) {
  const grade = getGrade(subject.marks);
  return (
    <motion.div
      className={`analysis-card type-${type}`}
      variants={scalePop}
      initial="initial"
      animate="animate"
      layout
    >
      <div className="analysis-card-left">
        <PulseIndicator level={type === 'weak' ? 'high' : 'mid'} />
        <div className="analysis-card-info">
          <span className="analysis-card-name">{subject.name}</span>
          <span className="analysis-card-code">{subject.code}</span>
        </div>
      </div>
      <div className="analysis-card-right">
        <span className="analysis-card-marks">{subject.marks}</span>
        <span className={`analysis-card-grade grade-${grade ? grade.grade.toLowerCase().replace('+', 'p') : 'none'}`}>
          {grade ? grade.grade : '—'}
        </span>
      </div>
    </motion.div>
  );
}

function CGPAVisualizer({ current, simulated }) {
  const [ref, inView] = useAnimatedInView({ threshold: 0.5 });
  const currAnim = useCountUp(Math.round(current * 100), { duration: 800, enabled: inView });
  const simAnim = useCountUp(Math.round(simulated * 100), { duration: 800, enabled: inView });
  const maxVal = Math.max(current, simulated, 10);

  return (
    <div ref={ref} className="cgpa-visualizer">
      <div className="cgpa-vis-bars">
        <div className="cgpa-vis-col">
          <motion.div
            className="cgpa-vis-bar current"
            initial={{ height: 0 }}
            animate={inView ? { height: `${(current / maxVal) * 100}%` } : { height: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
          />
          <span className="cgpa-vis-label">Current</span>
          <span className="cgpa-vis-value">{(currAnim / 100).toFixed(2)}</span>
        </div>
        <div className="cgpa-vis-col">
          <motion.div
            className="cgpa-vis-bar simulated"
            initial={{ height: 0 }}
            animate={inView ? { height: `${(simulated / maxVal) * 100}%` } : { height: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.2 }}
          />
          <span className="cgpa-vis-label">Simulated</span>
          <span className="cgpa-vis-value">{(simAnim / 100).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ suggestion, delay }) {
  return (
    <motion.div
      className={`insight-card type-${suggestion.type}`}
      variants={fadeInRight}
      initial="initial"
      animate="animate"
      transition={{ delay }}
    >
      <span className="insight-card-icon">{suggestion.icon}</span>
      <div className="insight-card-body">
        <span className="insight-card-title">{suggestion.title}</span>
        <span className="insight-card-desc">{suggestion.desc}</span>
      </div>
    </motion.div>
  );
}

function GainSimulator({ subjects, currentSGPA }) {
  const [boost, setBoost] = useState(10);
  const [ref, inView] = useAnimatedInView({ threshold: 0.3 });

  const weak = useMemo(() => subjects.filter((s) => s.isWeak), [subjects]);

  const boostMap = useMemo(() => {
    const map = {};
    for (const s of weak) {
      map[s.name] = boost;
    }
    return map;
  }, [weak, boost]);

  const simulatedSGPA = useMemo(
    () => simulateSGPA(subjects, boostMap),
    [subjects, boostMap]
  );

  const gain = simulatedSGPA - currentSGPA;
  const simAnim = useCountUp(Math.round(simulatedSGPA * 100), { duration: 600, enabled: inView });

  return (
    <div ref={ref} className="gain-simulator">
      <div className="gain-sim-header">
        <span className="gain-sim-label">Boost marks by</span>
        <span className="gain-sim-value">+{boost}</span>
      </div>
      <input
        type="range"
        min="0"
        max="30"
        step="1"
        value={boost}
        onChange={(e) => setBoost(Number(e.target.value))}
        className="gain-sim-range"
      />
      <div className="gain-sim-result">
        <div className="gain-sim-result-col">
          <span className="gain-sim-result-label">Current SGPA</span>
          <span className="gain-sim-result-value">{currentSGPA.toFixed(2)}</span>
        </div>
        <motion.span
          className="gain-sim-arrow"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
        <div className="gain-sim-result-col">
          <span className="gain-sim-result-label">With +{boost} boost</span>
          <span className="gain-sim-result-value simulated">{(simAnim / 100).toFixed(2)}</span>
        </div>
        <div className="gain-sim-result-col">
          <span className="gain-sim-result-label">Gain</span>
          <span className={`gain-sim-result-value ${gain > 0 ? 'positive' : 'neutral'}`}>
            +{gain.toFixed(2)}
          </span>
        </div>
      </div>
      <CGPAVisualizer current={currentSGPA} simulated={simulatedSGPA} />
    </div>
  );
}

export default function Analyser() {
  const analysis = useMemo(() => analyseSubjects(sampleSubjects), []);
  const suggestions = useMemo(
    () => generateSuggestions(analysis.weak, analysis.borderline),
    [analysis]
  );

  return (
    <div className="analyser-page">
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <h1 className="page-title">Result Analyser</h1>
        <p className="page-desc">Get insights on your academic performance and find areas to improve.</p>
      </motion.div>

      <div className="analyser-summary">
        <motion.div
          className="analyser-summary-card"
          variants={scalePop}
          initial="initial"
          animate="animate"
          whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
        >
          <span className="analyser-summary-icon">📊</span>
          <span className="analyser-summary-value">{analysis.currentSGPA.toFixed(2)}</span>
          <span className="analyser-summary-label">Current SGPA</span>
        </motion.div>
        <motion.div
          className="analyser-summary-card weak"
          variants={scalePop}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.05 }}
          whileHover={{ y: -2 }}
        >
          <span className="analyser-summary-icon">🔴</span>
          <span className="analyser-summary-value">{analysis.weakCount}</span>
          <span className="analyser-summary-label">Weak Subjects</span>
        </motion.div>
        <motion.div
          className="analyser-summary-card borderline"
          variants={scalePop}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
          whileHover={{ y: -2 }}
        >
          <span className="analyser-summary-icon">🟡</span>
          <span className="analyser-summary-value">{analysis.borderlineCount}</span>
          <span className="analyser-summary-label">Borderline</span>
        </motion.div>
        <motion.div
          className="analyser-summary-card safe"
          variants={scalePop}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.15 }}
          whileHover={{ y: -2 }}
        >
          <span className="analyser-summary-icon">🟢</span>
          <span className="analyser-summary-value">{analysis.safeCount}</span>
          <span className="analyser-summary-label">Strong Subjects</span>
        </motion.div>
      </div>

      <div className="analyser-grid">
        <motion.div
          className="analyser-section"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="section-title">
            Weak Subjects
            {analysis.weakCount > 0 && (
              <motion.span
                className="section-badge danger"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {analysis.weakCount}
              </motion.span>
            )}
          </h2>
          <motion.div
            className="analysis-list"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <AnimatePresence mode="popLayout">
              {analysis.weak.length > 0 ? (
                analysis.weak.map((s) => (
                  <SubjectAnalysisCard key={s.name} subject={s} type="weak" />
                ))
              ) : (
                <div className="analysis-empty">No weak subjects 🎉</div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div
          className="analyser-section"
          variants={fadeInRight}
          initial="initial"
          animate="animate"
        >
          <h2 className="section-title">Borderline Subjects</h2>
          <motion.div
            className="analysis-list"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <AnimatePresence mode="popLayout">
              {analysis.borderline.length > 0 ? (
                analysis.borderline.map((s) => (
                  <SubjectAnalysisCard key={s.name} subject={s} type="borderline" />
                ))
              ) : (
                <div className="analysis-empty">No borderline subjects</div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <div className="analyser-grid">
        <motion.div
          className="analyser-section analyser-section-wide"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="section-title">CGPA Gain Simulator</h2>
          <GainSimulator
            subjects={analysis.simSubjects}
            currentSGPA={analysis.currentSGPA}
          />
        </motion.div>

        <motion.div
          className="analyser-section"
          variants={fadeInRight}
          initial="initial"
          animate="animate"
        >
          <h2 className="section-title">Improvement Suggestions</h2>
          <div className="insight-list">
            {suggestions.map((s, i) => (
              <InsightCard key={s.title} suggestion={s} delay={i * 0.06} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
