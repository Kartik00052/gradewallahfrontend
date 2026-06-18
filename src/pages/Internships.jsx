import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, scalePop } from '../motion';
import { SearchBar, FilterChips, SortSelect, CompanyBadge, TagList, SkeletonGrid } from '../components/FilterBar';
import { internshipData } from '../utils/placementData';

const typeOptions = ['Remote', 'Hybrid', 'On-site'];
const domainOptions = [...new Set(internshipData.map((i) => i.domain))];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'stipend-high', label: 'Stipend: High to Low' },
  { value: 'stipend-low', label: 'Stipend: Low to High' },
];

function parseStipend(str) {
  const num = str.replace(/[^0-9]/g, '');
  return Number(num) || 0;
}

function InternshipCard({ internship, index }) {
  return (
    <motion.div
      className="internship-card-detailed"
      variants={scalePop}
      initial="initial"
      animate="animate"
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      layout
      whileHover={{
        y: -4,
        boxShadow: '0 12px 28px rgba(0,0,0,0.1)',
        transition: { type: 'spring', stiffness: 400, damping: 20 },
      }}
    >
      <div className="internship-card-top">
        <CompanyBadge logo={internship.logo} company={internship.company} />
        <span className="internship-badge-type">{internship.type}</span>
      </div>
      <h3 className="internship-card-title">{internship.title}</h3>
      <div className="internship-card-meta">
        <span className="internship-card-location">📍 {internship.location}</span>
        <span className="internship-card-stipend">💰 {internship.stipend}</span>
      </div>
      <TagList tags={internship.tags} />
      <div className="internship-card-footer">
        <span className="internship-card-posted">{internship.posted}</span>
        <motion.button
          className="internship-card-apply"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
        >
          Apply Now
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Internships() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState(null);
  const [domainFilter, setDomainFilter] = useState(null);
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let result = [...internshipData];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.company.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (typeFilter) result = result.filter((i) => i.type === typeFilter);
    if (domainFilter) result = result.filter((i) => i.domain === domainFilter);

    result.sort((a, b) => {
      if (sort === 'stipend-high') return parseStipend(b.stipend) - parseStipend(a.stipend);
      if (sort === 'stipend-low') return parseStipend(a.stipend) - parseStipend(b.stipend);
      return 0;
    });

    return result;
  }, [search, typeFilter, domainFilter, sort]);

  return (
    <div className="internships-page">
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <h1 className="page-title">Internships</h1>
        <p className="page-desc">AI-matched opportunities based on your domain of interest.</p>
      </motion.div>

      <motion.div className="filters-bar" variants={fadeInUp} initial="initial" animate="animate">
        <SearchBar value={search} onChange={setSearch} placeholder="Search internships, companies, skills..." />
        <div className="filters-row">
          <FilterChips label="Type" options={typeOptions} selected={typeFilter} onChange={setTypeFilter} />
          <FilterChips label="Domain" options={domainOptions} selected={domainFilter} onChange={setDomainFilter} />
          <SortSelect value={sort} onChange={setSort} options={sortOptions} />
        </div>
        <div className="filters-count">{filtered.length} internship{filtered.length !== 1 ? 's' : ''} found</div>
      </motion.div>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : (
        <motion.div
          className="internship-grid"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((internship, i) => (
              <InternshipCard key={internship.id} internship={internship} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && filtered.length === 0 && (
        <motion.div className="filters-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          No internships match your filters. Try adjusting your search.
        </motion.div>
      )}
    </div>
  );
}
