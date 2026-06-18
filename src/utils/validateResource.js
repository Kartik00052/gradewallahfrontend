const VALID_TYPES = new Set(['video', 'notes', 'pyq', 'pdf']);

export function validateId(id, label) {
  if (typeof id !== 'string' || id.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Resources] Invalid ${label} ID:`, id);
    }
    return false;
  }
  return true;
}

export function validateSemester(sem) {
  if (!sem || typeof sem !== 'object') return false;
  if (!validateId(sem.id, 'semester')) return false;
  if (typeof sem.name !== 'string' || sem.name.length === 0) return false;
  if (!Array.isArray(sem.subjects)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Resources] Semester "${sem.id}" has no subjects array`);
    }
    sem.subjects = [];
  }
  return true;
}

export function validateSubject(sub) {
  if (!sub || typeof sub !== 'object') return false;
  if (!validateId(sub.id, 'subject')) return false;
  if (typeof sub.name !== 'string' || sub.name.length === 0) return false;
  if (!Array.isArray(sub.units)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Resources] Subject "${sub.id}" has no units array`);
    }
    sub.units = [];
  }
  return true;
}

export function validateUnit(unit) {
  if (!unit || typeof unit !== 'object') return false;
  if (!validateId(unit.id, 'unit')) return false;
  if (typeof unit.name !== 'string' || unit.name.length === 0) return false;
  if (!Array.isArray(unit.resources)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Resources] Unit "${unit.id}" has no resources array`);
    }
    unit.resources = [];
  }
  return true;
}

export function validateResource(res) {
  if (!res || typeof res !== 'object') return false;
  if (!validateId(res.id, 'resource')) return false;
  if (typeof res.title !== 'string' || res.title.length === 0) return false;
  if (!VALID_TYPES.has(res.type)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Resources] Unknown resource type "${res.type}" for "${res.id}", falling back to "notes"`);
    }
    res.type = 'notes';
  }
  return true;
}

export function validateResourceTree(data) {
  if (!Array.isArray(data)) {
    console.error('[Resources] semesterData must be an array');
    return [];
  }

  return data.filter(validateSemester).map((sem) => ({
    ...sem,
    subjects: sem.subjects.filter(validateSubject).map((sub) => ({
      ...sub,
      units: sub.units.filter(validateUnit).map((unit) => ({
        ...unit,
        resources: unit.resources.filter(validateResource),
      })),
    })),
  }));
}
