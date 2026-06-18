import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp, scalePop, buttonTap, fadeInScale } from '../motion';
import { useAnimatedInView, useCountUp } from '../motion';
import GridScan from '../components/GridScan';

function UploadZone({ onFile, disabled }) {
  const [dragOver, setDragOver] = useState(false);
  const [ref, inView] = useAnimatedInView({ threshold: 0.3 });

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  const handleChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  return (
    <motion.div
      ref={ref}
      className={`upload-zone ${dragOver ? 'drag-over' : ''} ${disabled ? 'disabled' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && document.getElementById('scan-file-input')?.click()}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      whileHover={disabled ? {} : { scale: 1.01 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      <input
        id="scan-file-input"
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <motion.div
        className="upload-zone-icon"
        animate={dragOver ? { scale: 1.2, rotate: [0, -10, 10, -5, 0] } : { scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {dragOver ? '📄' : '📷'}
      </motion.div>
      <span className="upload-zone-title">
        {dragOver ? 'Drop your file here' : 'Upload Marksheet'}
      </span>
      <span className="upload-zone-desc">
        Drag & drop or click to browse — JPEG, PNG, PDF
      </span>
    </motion.div>
  );
}

function ScanningOverlay({ progress }) {
  return (
    <motion.div
      className="scanning-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="scanning-content">
        <motion.div
          className="scanning-scanner"
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="scanning-icon"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          🔍
        </motion.div>
        <span className="scanning-title">Scanning...</span>
        <div className="scanning-bar-track">
          <motion.div
            className="scanning-bar-fill"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="scanning-pct">{progress}%</span>
        <span className="scanning-desc">Extracting marks from your marksheet</span>
      </div>
    </motion.div>
  );
}

function ExtractedSubject({ subject, index, delay }) {
  return (
    <motion.div
      className="extracted-subject"
      variants={fadeInScale}
      initial="initial"
      animate="animate"
      transition={{ delay }}
    >
      <div className="extracted-subject-left">
        <span className="extracted-subject-index">{index + 1}</span>
        <div className="extracted-subject-info">
          <span className="extracted-subject-name">{subject.name}</span>
          <span className="extracted-subject-code">{subject.code}</span>
        </div>
      </div>
      <div className="extracted-subject-right">
        <motion.span
          className="extracted-subject-marks"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.3, type: 'spring', stiffness: 300, damping: 14 }}
        >
          {subject.marks}
        </motion.span>
        <span className={`extracted-subject-grade grade-${subject.grade.toLowerCase().replace('+', 'p')}`}>
          {subject.grade}
        </span>
      </div>
    </motion.div>
  );
}

function ResultSummary({ subjects, sgpa }) {
  const [ref, inView] = useAnimatedInView({ threshold: 0.4 });
  const sgpaAnim = useCountUp(Math.round(sgpa * 100), { duration: 1500, enabled: inView });

  return (
    <motion.div
      ref={ref}
      className="result-summary"
      variants={fadeInUp}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
    >
      <div className="result-summary-sgpa">
        <span className="result-summary-label">Extracted SGPA</span>
        <motion.span
          className="result-summary-value"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
        >
          {(sgpaAnim / 100).toFixed(2)}
        </motion.span>
      </div>
      <div className="result-summary-stats">
        <div className="result-summary-stat">
          <span className="result-summary-stat-value">{subjects.length}</span>
          <span className="result-summary-stat-label">Subjects</span>
        </div>
        <div className="result-summary-stat">
          <span className="result-summary-stat-value">
            {subjects.filter((s) => s.grade === 'O' || s.grade === 'A+').length}
          </span>
          <span className="result-summary-stat-label">Top Grades</span>
        </div>
        <div className="result-summary-stat">
          <span className="result-summary-stat-value">
            {subjects.filter((s) => s.marks >= 50).length}/{subjects.length}
          </span>
          <span className="result-summary-stat-label">Passed</span>
        </div>
      </div>
    </motion.div>
  );
}

const mockSubjects = [
  { name: 'Mathematics-IV', code: 'KCS-201', marks: 88, grade: 'A+' },
  { name: 'Data Structures', code: 'KCS-202', marks: 76, grade: 'A' },
  { name: 'Digital Electronics', code: 'KEC-201', marks: 45, grade: 'C' },
  { name: 'Discrete Maths', code: 'KCS-203', marks: 91, grade: 'O' },
  { name: 'Python Programming', code: 'KCS-251', marks: 85, grade: 'A+' },
  { name: 'Computer Networks', code: 'KCS-402', marks: 52, grade: 'B' },
];

export default function ScanResult() {
  const [phase, setPhase] = useState('upload');
  const [scanProgress, setScanProgress] = useState(0);
  const [subjects] = useState(mockSubjects);
  const timerRef = useRef(null);

  const sgpa = subjects.reduce((sum, s) => sum + s.marks, 0) / subjects.length / 10;

  const handleFile = useCallback(() => {
    setPhase('scanning');
    setScanProgress(0);

    timerRef.current = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current);
          setTimeout(() => setPhase('result'), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleReset = useCallback(() => {
    setPhase('upload');
    setScanProgress(0);
  }, []);

  return (
    <div className="scan-page">
      <div className="scan-bg">
        <GridScan
          scanColor="#FF9FFC"
          scanOpacity={0.25}
          linesColor="#2F293A"
          gridScale={0.08}
          scanDirection="pingpong"
          scanGlow={0.5}
          scanSoftness={2}
          scanDuration={3}
          scanDelay={2}
          bloomIntensity={0.2}
          chromaticAberration={0.001}
          noiseIntensity={0.005}
        />
      </div>

      <div className="scan-content">
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="scan-header">
          <h1 className="page-title">Scan Result</h1>
          <p className="page-desc">Upload or scan your marksheet to auto-fill grades.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 'upload' && (
            <motion.div
              key="upload"
              className="scan-body"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, y: -20 }}
            >
              <UploadZone onFile={handleFile} disabled={false} />
            </motion.div>
          )}

          {phase === 'scanning' && (
            <ScanningOverlay key="scanning" progress={scanProgress} />
          )}

          {phase === 'result' && (
            <motion.div
              key="result"
              className="scan-body"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <ResultSummary subjects={subjects} sgpa={sgpa} />

              <motion.div className="extracted-section" variants={fadeInUp}>
                <h2 className="section-title">Extracted Marks</h2>
                <div className="extracted-list">
                  {subjects.map((s, i) => (
                    <ExtractedSubject key={s.code} subject={s} index={i} delay={i * 0.08} />
                  ))}
                </div>
              </motion.div>

              <motion.div className="scan-actions" variants={fadeInUp}>
                <motion.button
                  className="scan-btn scan-btn-primary"
                  variants={buttonTap}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  ✓ Confirm & Save
                </motion.button>
                <motion.button
                  className="scan-btn scan-btn-secondary"
                  variants={buttonTap}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleReset}
                >
                  ↺ Scan Again
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
