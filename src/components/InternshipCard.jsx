import { motion } from 'framer-motion';

export default function InternshipCard({ title, company, location, stipend, type }) {
  return (
    <motion.div
      className="internship-card"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
    >
      <div className="internship-card-top">
        <span className="internship-card-type">{type}</span>
      </div>
      <div className="internship-card-title">{title}</div>
      <div className="internship-card-company">{company}</div>
      <div className="internship-card-footer">
        <span className="internship-card-location">{location}</span>
        <span className="internship-card-stipend">{stipend}</span>
      </div>
    </motion.div>
  );
}
