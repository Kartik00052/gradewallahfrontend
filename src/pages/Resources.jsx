import { useState, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, listStagger, listItem } from '../motion';
import { AccordionItem, AccordionGroup, AccordionChild } from '../components/Accordion';
import ResourceCard from '../components/ResourceCard';
import ErrorBoundary from '../components/ErrorBoundary';
import { semesterData as rawData } from '../utils/resourcesData';
import { validateResourceTree } from '../utils/validateResource';

const semesterData = validateResourceTree(rawData);

function toggleInSet(set, id) {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

const ResourceList = memo(function ResourceList({ resources }) {
  return (
    <motion.div
      className="resource-list"
      variants={listStagger}
      initial="initial"
      animate="animate"
    >
      {resources.map((resource, i) => (
        <motion.div key={resource.id} variants={listItem}>
          <ResourceCard resource={resource} index={i} />
        </motion.div>
      ))}
    </motion.div>
  );
});

const UnitItem = memo(function UnitItem({
  unit,
  isOpen,
  onToggle,
}) {
  return (
    <AccordionItem
      id={unit.id}
      isOpen={isOpen}
      onToggle={onToggle}
      title={unit.name}
      badge={unit.resources.length}
      depth={2}
    >
      <ResourceList resources={unit.resources} />
    </AccordionItem>
  );
});

const SubjectItem = memo(function SubjectItem({
  subject,
  isOpen,
  onToggle,
  unitOpen,
  onUnitToggle,
}) {
  return (
    <AccordionItem
      id={subject.id}
      isOpen={isOpen}
      onToggle={onToggle}
      title={subject.name}
      subtitle={subject.code}
      badge={subject.units.length}
      depth={1}
    >
      <AccordionGroup stagger={0.03}>
        {subject.units.map((unit) => (
          <AccordionChild key={unit.id}>
            <UnitItem
              unit={unit}
              isOpen={unitOpen.has(unit.id)}
              onToggle={onUnitToggle}
            />
          </AccordionChild>
        ))}
      </AccordionGroup>
    </AccordionItem>
  );
});

const SemesterItem = memo(function SemesterItem({
  semester,
  isOpen,
  onToggle,
  subjectOpen,
  onSubjectToggle,
  unitOpen,
  onUnitToggle,
}) {
  return (
    <AccordionItem
      id={semester.id}
      isOpen={isOpen}
      onToggle={onToggle}
      title={semester.name}
      subtitle={`${semester.subjects.length} subjects`}
      badge={semester.totalResources}
      depth={0}
    >
      <AccordionGroup stagger={0.04}>
        {semester.subjects.map((subject) => (
          <AccordionChild key={subject.id}>
            <SubjectItem
              subject={subject}
              isOpen={subjectOpen.has(subject.id)}
              onToggle={onSubjectToggle}
              unitOpen={unitOpen}
              onUnitToggle={onUnitToggle}
            />
          </AccordionChild>
        ))}
      </AccordionGroup>
    </AccordionItem>
  );
});

function ResourcesInner() {
  const [openSemesters, setOpenSemesters] = useState(() => new Set());
  const [openSubjects, setOpenSubjects] = useState(() => new Set());
  const [openUnits, setOpenUnits] = useState(() => new Set());

  const toggleSemester = useCallback((id) => {
    setOpenSemesters((prev) => toggleInSet(prev, id));
  }, []);

  const toggleSubject = useCallback((id) => {
    setOpenSubjects((prev) => toggleInSet(prev, id));
  }, []);

  const toggleUnit = useCallback((id) => {
    setOpenUnits((prev) => toggleInSet(prev, id));
  }, []);

  const grouped = useMemo(
    () =>
      semesterData.map((sem) => {
        let count = 0;
        for (const sub of sem.subjects) {
          for (const unit of sub.units) {
            count += unit.resources.length;
          }
        }
        return { ...sem, totalResources: count };
      }),
    []
  );

  return (
    <div className="resources-page">
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <h1 className="page-title">Study Resources</h1>
        <p className="page-desc">
          Semester-wise academic content — videos, notes, PYQs, and more.
        </p>
      </motion.div>

      <div className="resources-content">
        <AccordionGroup stagger={0.06}>
          {grouped.map((semester) => (
            <AccordionChild key={semester.id}>
              <SemesterItem
                semester={semester}
                isOpen={openSemesters.has(semester.id)}
                onToggle={toggleSemester}
                subjectOpen={openSubjects}
                onSubjectToggle={toggleSubject}
                unitOpen={openUnits}
                onUnitToggle={toggleUnit}
              />
            </AccordionChild>
          ))}
        </AccordionGroup>
      </div>
    </div>
  );
}

export default function Resources() {
  return (
    <ErrorBoundary>
      <ResourcesInner />
    </ErrorBoundary>
  );
}
