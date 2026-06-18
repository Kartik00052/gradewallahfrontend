import { getGrade, calcSGPA } from './grades';

export function analyseSubjects(subjects) {
  const graded = subjects.map((s) => ({ ...s, grade: getGrade(s.marks) }));

  const weak = graded.filter((s) => s.grade && s.grade.point <= 5);
  const borderline = graded.filter((s) => s.grade && s.grade.point === 6);
  const safe = graded.filter((s) => s.grade && s.grade.point >= 7);

  const currentSGPA = calcSGPA(graded);

  const weakByCredit = [...weak].sort((a, b) => (b.credit || 0) - (a.credit || 0));

  const improvement = weakByCredit.map((s) => {
    const currentPoint = s.grade ? s.grade.point : 0;
    const targetGrade = getGrade(Math.min(100, (s.marks || 0) + 20));
    const targetPoint = targetGrade ? targetGrade.point : currentPoint;
    const gain = targetPoint - currentPoint;
    return {
      ...s,
      currentPoint,
      targetGrade: targetGrade ? targetGrade.grade : s.grade?.grade,
      targetPoint,
      gain: Math.max(0, gain),
    };
  });

  const simSubjects = graded.map((s) => {
    const isWeak = weak.some((w) => w.name === s.name);
    return { ...s, isWeak };
  });

  return {
    graded,
    weak,
    borderline,
    safe,
    currentSGPA,
    improvement,
    simSubjects,
    weakCount: weak.length,
    borderlineCount: borderline.length,
    safeCount: safe.length,
  };
}

export function simulateSGPA(subjects, boostMap) {
  const simulated = subjects.map((s) => {
    const boost = boostMap[s.name] || 0;
    const newMarks = Math.min(100, (s.marks || 0) + boost);
    return { ...s, marks: newMarks, grade: getGrade(newMarks) };
  });
  return calcSGPA(simulated);
}

export function generateSuggestions(weak, borderline) {
  const suggestions = [];

  if (weak.length > 0) {
    suggestions.push({
      type: 'critical',
      icon: '🚨',
      title: `${weak.length} weak subject${weak.length > 1 ? 's' : ''} need${weak.length === 1 ? 's' : ''} immediate attention`,
      desc: `Focus on ${weak.map((s) => s.name).join(', ')}. These subjects are pulling your SGPA down the most.`,
    });
  }

  if (borderline.length > 0) {
    suggestions.push({
      type: 'warning',
      icon: '⚠️',
      title: `${borderline.length} borderline subject${borderline.length > 1 ? 's' : ''} can boost your score`,
      desc: `Improving ${borderline.map((s) => s.name).join(', ')} by even 10 marks can significantly raise your grade.`,
    });
  }

  const weakByCredit = [...weak].sort((a, b) => (b.credit || 0) - (a.credit || 0));
  if (weakByCredit.length > 0) {
    const top = weakByCredit[0];
    suggestions.push({
      type: 'tip',
      icon: '💡',
      title: `Focus on high-credit subjects first`,
      desc: `${top.name} (${top.credit} credits) has the highest impact. Improving this subject gives the best ROI.`,
    });
  }

  suggestions.push({
    type: 'tip',
    icon: '📅',
    title: 'Create a study schedule',
    desc: 'Dedicate 2 hours daily to weak subjects. Consistent effort > last-minute cramming.',
  });

  suggestions.push({
    type: 'tip',
    icon: '👨‍🏫',
    title: 'Use available resources',
    desc: 'Check the Study Resources section for video lectures, notes, and PYQs for your weak subjects.',
  });

  return suggestions;
}
