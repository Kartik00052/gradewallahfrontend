import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, listStagger, listItem } from '../motion';
import { AccordionItem, AccordionGroup, AccordionChild, ResourceCard } from '../components';
import { semesterData } from '../utils/resourcesData';

export default function Resources() {
  const [openSemesters, setOpenSemesters] = useState(new Set());
  const [openSubjects, setOpenSubjects] = useState(new Set());
  const [openUnits, setOpenUnits] = useState(new Set());

  const toggle = useCallback((set) => (id) => {
    set((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSemester = toggle(setOpenSemesters);
  const toggleSubject = toggle(setOpenSubjects);
  const toggleUnit = toggle(setOpenUnits);

  const grouped = semesterData.reduce((acc, sem) => {
    const totalResources = sem.subjects.reduce(
      (sum, sub) => sum + sub.units.reduce((s, u) => s + u.resources.length, 0),
      0
    );
    acc.push({ ...sem, totalResources });
    return acc;
  }, []);

  return (
    <div className="resources-page">
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <h1 className="page-title">Study Resources</h1>
        <p className="page-desc">Semester-wise academic content — videos, notes, PYQs, and more.</p>
      </motion.div>

      <motion.div
        className="resources-content"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <AccordionGroup stagger={0.06}>
          {grouped.map((semester) => (
            <AccordionChild key={semester.id}>
              <AccordionItem
                id={semester.id}
                isOpen={openSemesters.has(semester.id)}
                onToggle={toggleSemester}
                title={semester.name}
                subtitle={`${semester.subjects.length} subjects`}
                badge={semester.totalResources}
                depth={0}
              >
                <AccordionGroup stagger={0.04}>
                  {semester.subjects.map((subject) => (
                    <AccordionChild key={subject.id}>
                      <AccordionItem
                        id={subject.id}
                        isOpen={openSubjects.has(subject.id)}
                        onToggle={toggleSubject}
                        title={subject.name}
                        subtitle={subject.code}
                        badge={subject.units.length}
                        depth={1}
                      >
                        <AccordionGroup stagger={0.03}>
                          {subject.units.map((unit) => (
                            <AccordionChild key={unit.id}>
                              <AccordionItem
                                id={unit.id}
                                isOpen={openUnits.has(unit.id)}
                                onToggle={toggleUnit}
                                title={unit.name}
                                badge={unit.resources.length}
                                depth={2}
                              >
                                <motion.div
                                  className="resource-list"
                                  variants={listStagger}
                                  initial="initial"
                                  animate="animate"
                                >
                                  {unit.resources.map((resource, i) => (
                                    <motion.div key={resource.id} variants={listItem}>
                                      <ResourceCard resource={resource} index={i} />
                                    </motion.div>
                                  ))}
                                </motion.div>
                              </AccordionItem>
                            </AccordionChild>
                          ))}
                        </AccordionGroup>
                      </AccordionItem>
                    </AccordionChild>
                  ))}
                </AccordionGroup>
              </AccordionItem>
            </AccordionChild>
          ))}
        </AccordionGroup>
      </motion.div>
    </div>
  );
}
