const gradeMap = [
  { min: 91, grade: 'O', point: 10 },
  { min: 81, grade: 'A+', point: 9 },
  { min: 71, grade: 'A', point: 8 },
  { min: 61, grade: 'B+', point: 7 },
  { min: 51, grade: 'B', point: 6 },
  { min: 41, grade: 'C', point: 5 },
  { min: 30, grade: 'P', point: 4 },
  { min: 0, grade: 'F', point: 0 },
];

export function getGrade(marks) {
  if (marks == null || marks === '') return null;
  const m = Number(marks);
  if (isNaN(m) || m < 0 || m > 100) return null;
  return gradeMap.find((g) => m >= g.min);
}

export function calcSGPA(subjects) {
  const valid = subjects.filter((s) => s.grade && s.credit);
  if (valid.length === 0) return 0;
  const totalPoints = valid.reduce((sum, s) => sum + s.grade.point * s.credit, 0);
  const totalCredits = valid.reduce((sum, s) => sum + s.credit, 0);
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
}

export function calcCGPA(semesters) {
  const valid = semesters.filter((s) => s.sgpa > 0 && s.credit > 0);
  if (valid.length === 0) return 0;
  const totalPoints = valid.reduce((sum, s) => sum + s.sgpa * s.credit, 0);
  const totalCredits = valid.reduce((sum, s) => sum + s.credit, 0);
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
}

export function calcTargetSGPA(currentCGPA, currentCredits, targetCGPA, remainingCredits) {
  if (remainingCredits <= 0) return 0;
  const needed = targetCGPA * (currentCredits + remainingCredits) - currentCGPA * currentCredits;
  return Math.max(0, Math.min(10, needed / remainingCredits));
}

export function exportGrades(subjects, sgpa, cgpa) {
  const rows = subjects
    .filter((s) => s.name)
    .map((s) => ({
      Subject: s.name,
      Code: s.code || '-',
      Credit: s.credit || 0,
      Marks: s.marks ?? '-',
      Grade: s.grade?.grade || '-',
      'Grade Point': s.grade?.point || 0,
    }));

  let csv = 'Subject,Code,Credit,Marks,Grade,Grade Point\n';
  for (const r of rows) {
    csv += `${r.Subject},${r.Code},${r.Credit},${r.Marks},${r.Grade},${r['Grade Point']}\n`;
  }
  csv += `\nSGPA,${sgpa.toFixed(2)}\n`;
  csv += `CGPA,${cgpa.toFixed(2)}\n`;

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'gradewallah-grades.csv';
  a.click();
  URL.revokeObjectURL(url);
}
