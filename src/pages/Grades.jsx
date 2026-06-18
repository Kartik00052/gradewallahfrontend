import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp, fadeInRight, scalePop } from '../motion';
import { useAnimatedInView, useCountUp } from '../motion';
import { GradeCard, GradeChart } from '../components';
import { calcSGPA, calcCGPA, calcTargetSGPA, exportGrades, getGrade } from '../utils/grades';

function createSubject() {
  return { name: '', code: '', credit: 2, marks: '' };
}

export default function Grades() {
  const [subjects, setSubjects] = useState([
    { name: 'Mathematics-IV', code: 'KCS-201', credit: 4, marks: 88 },
    { name: 'Data Structures', code: 'KCS-202', credit: 3, marks: 76 },
    { name: 'Digital Electronics', code: 'KEC-201', credit: 3, marks: 82 },
    { name: 'Discrete Maths', code: 'KCS-203', credit: 3, marks: 91 },
    { name: 'Python Programming', code: 'KCS-251', credit: 2, marks: 85 },
  ]);

  const [semesters, setSemesters] = useState([
    { name: 'Sem 1', sgpa: 7.8, credit: 24 },
    { name: 'Sem 2', sgpa: 8.2, credit: 24 },
    { name: 'Sem 3', sgpa: 8.5, credit: 24 },
  ]);

  const [targetCGPA, setTargetCGPA] = useState(9);
  const [semCredit, setSemCredit] = useState(24);
  const [remainingSems, setRemainingSems] = useState(4);

  const gradedSubjects = useMemo(
    () => subjects.map((s) => ({ ...s, grade: getGrade(s.marks) })),
    [subjects]
  );

  const sgpa = useMemo(() => calcSGPA(gradedSubjects), [gradedSubjects]);
  const cgpa = useMemo(() => calcCGPA(semesters), [semesters]);

  const currentCredits = useMemo(
    () => semesters.reduce((sum, s) => sum + s.credit, 0),
    [semesters]
  );
  const remainingCredits = remainingSems * semCredit;
  const neededSGPA = useMemo(
    () => calcTargetSGPA(cgpa, currentCredits, targetCGPA, remainingCredits),
    [cgpa, currentCredits, targetCGPA, remainingCredits]
  );

  const handleSubjectChange = useCallback((index, updated) => {
    setSubjects((prev) => {
      const next = [...prev];
      next[index] = updated;
      return next;
    });
  }, []);

  const addSubject = useCallback(() => {
    setSubjects((prev) => [...prev, createSubject()]);
  }, []);

  const removeSubject = useCallback((index) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const resetSubjects = useCallback(() => {
    setSubjects([createSubject()]);
  }, []);

  const totalCredits = useMemo(
    () => gradedSubjects.reduce((sum, s) => sum + (s.grade ? s.credit : 0), 0),
    [gradedSubjects]
  );

  const [sgpaRef, sgpaInView] = useAnimatedInView({ threshold: 0.5 });
  const [cgpaRef, cgpaInView] = useAnimatedInView({ threshold: 0.5 });
  const sgpaAnim = useCountUp(Math.round(sgpa * 100), { duration: 1000, enabled: sgpaInView });
  const cgpaAnim = useCountUp(Math.round(cgpa * 100), { duration: 1000, enabled: cgpaInView });

  return (
    <div className="grades-page">
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <h1 className="page-title">My Grades</h1>
        <p className="page-desc">Enter your subject marks to calculate SGPA and CGPA.</p>
      </motion.div>

      <main className="grades-layout">
        <div className="grades-main">
          <motion.div className="grades-section" variants={fadeInUp} initial="initial" animate="animate">
            <div className="grades-section-header">
              <h2 className="section-title">Subjects</h2>
              <div className="grades-header-actions">
                <motion.button className="grades-btn grades-btn-sm" onClick={resetSubjects} whileTap={{ scale: 0.95 }}>
                  Reset
                </motion.button>
                <motion.button className="grades-btn grades-btn-primary grades-btn-sm" onClick={addSubject} whileTap={{ scale: 0.95 }}>
                  + Add Subject
                </motion.button>
              </div>
            </div>

            <motion.div className="subjects-list" variants={staggerContainer} initial="initial" animate="animate">
              <AnimatePresence mode="popLayout">
                {gradedSubjects.map((s, i) => (
                  <GradeCard
                    key={`${s.name}-${i}`}
                    subject={s}
                    index={i}
                    onChange={handleSubjectChange}
                    onRemove={removeSubject}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          <motion.div className="grades-section" variants={fadeInUp} initial="initial" animate="animate">
            <h2 className="section-title">Grade Distribution</h2>
            <GradeChart subjects={gradedSubjects} />
          </motion.div>
        </div>

        <aside className="grades-sidebar">
          <motion.div className="grades-section" variants={fadeInRight} initial="initial" animate="animate">
            <h2 className="section-title">Live Results</h2>

            <div className="grades-result-cards">
              <div ref={sgpaRef} className="grades-result-card">
                <span className="grades-result-label">Current SGPA</span>
                <span className="grades-result-value">
                  {(sgpaAnim / 100).toFixed(2)}
                </span>
                <span className="grades-result-sub">
                  {gradedSubjects.filter((s) => s.grade).length} subjects · {totalCredits} credits
                </span>
              </div>

              <div ref={cgpaRef} className="grades-result-card">
                <span className="grades-result-label">Overall CGPA</span>
                <span className="grades-result-value">
                  {(cgpaAnim / 100).toFixed(2)}
                </span>
                <span className="grades-result-sub">
                  {semesters.length} semesters · {currentCredits} credits
                </span>
              </div>
            </div>

            <motion.button
              className="grades-btn grades-btn-primary grades-btn-full"
              onClick={() => exportGrades(gradedSubjects, sgpa, cgpa)}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.01 }}
            >
              📥 Export Report
            </motion.button>
          </motion.div>

          <motion.div className="grades-section" variants={fadeInRight} initial="initial" animate="animate">
            <h2 className="section-title">SGPA History</h2>
            <div className="sgpa-history">
              <AnimatePresence>
                {semesters.map((s, i) => (
                  <motion.div
                    key={s.name}
                    className="sgpa-history-row"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 24 }}
                  >
                    <span className="sgpa-history-name">{s.name}</span>
                    <span className="sgpa-history-bar-wrap">
                      <motion.span
                        className="sgpa-history-bar"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: s.sgpa / 10 }}
                        transition={{ delay: i * 0.06, type: 'spring', stiffness: 120, damping: 18 }}
                      />
                    </span>
                    <span className="sgpa-history-value">{s.sgpa.toFixed(1)}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div className="grades-section" variants={fadeInRight} initial="initial" animate="animate">
            <h2 className="section-title">🎯 Target CGPA Planner</h2>
            <div className="target-planner">
              <div className="target-planner-field">
                <label className="target-planner-label">Current CGPA</label>
                <div className="target-planner-value">{cgpa.toFixed(2)}</div>
              </div>

              <div className="target-planner-field">
                <label className="target-planner-label">Target CGPA</label>
                <div className="target-planner-control">
                  <input
                    type="range"
                    min="6"
                    max="10"
                    step="0.1"
                    value={targetCGPA}
                    onChange={(e) => setTargetCGPA(Number(e.target.value))}
                    className="target-planner-range"
                  />
                  <span className="target-planner-badge">{targetCGPA.toFixed(1)}</span>
                </div>
              </div>

              <div className="target-planner-field">
                <label className="target-planner-label">Remaining Semesters</label>
                <div className="target-planner-control">
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="1"
                    value={remainingSems}
                    onChange={(e) => setRemainingSems(Number(e.target.value))}
                    className="target-planner-range"
                  />
                  <span className="target-planner-badge">{remainingSems}</span>
                </div>
              </div>

              <div className="target-planner-field">
                <label className="target-planner-label">Credits / Sem</label>
                <div className="target-planner-control">
                  <input
                    type="range"
                    min="15"
                    max="30"
                    step="1"
                    value={semCredit}
                    onChange={(e) => setSemCredit(Number(e.target.value))}
                    className="target-planner-range"
                  />
                  <span className="target-planner-badge">{semCredit}</span>
                </div>
              </div>

              <motion.div
                className="target-planner-result"
                key={neededSGPA}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="target-planner-result-label">SGPA Needed</div>
                <div className={`target-planner-result-value ${neededSGPA > 10 ? 'impossible' : neededSGPA > 9 ? 'hard' : 'achievable'}`}>
                  {neededSGPA <= 10 ? neededSGPA.toFixed(2) : 'Not possible'}
                </div>
                <div className="target-planner-result-sub">
                  {remainingSems} semesters · {remainingCredits} credits remaining
                </div>
              </motion.div>
            </div>
          </motion.div>
        </aside>
      </main>
    </div>
  );
}
