import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, scalePop } from '../motion';
import { SearchBar, FilterChips, CompanyBadge, TagList, DeadlineBadge, SkeletonGrid } from '../components/FilterBar';
import { placementData } from '../utils/placementData';

const typeOptions = ['On-Campus', 'Off-Campus'];
const sortOptions = [
  { value: 'deadline', label: 'Deadline: Soonest' },
  { value: 'package-high', label: 'Package: High to Low' },
  { value: 'package-low', label: 'Package: Low to High' },
];

function parsePackage(str) {
  const num = str.replace(/[^0-9]/g, '');
  return Number(num) || 0;
}

function PlacementCard({ placement, index }) {
  return (
    <motion.div
      className="placement-card-detailed"
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
      <div className="placement-card-top">
        <CompanyBadge logo={placement.logo} company={placement.company} />
        <DeadlineBadge deadline={placement.deadline} />
      </div>
      <h3 className="placement-card-role">{placement.role}</h3>
      <div className="placement-card-meta">
        <span className="placement-card-package">💰 {placement.package}</span>
        <span className="placement-card-openings">
          👥 {placement.openings} opening{placement.openings !== 1 ? 's' : ''}
        </span>
      </div>
      <TagList tags={placement.tags} />
      <div className="placement-card-footer">
        <span className="placement-card-type">{placement.type}</span>
        <motion.button
          className="placement-card-apply"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
        >
          Apply
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Placements() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState(null);
  const [sort, setSort] = useState('deadline');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let result = [...placementData];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.company.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (typeFilter) result = result.filter((p) => p.type === typeFilter);

    result.sort((a, b) => {
      if (sort === 'package-high') return parsePackage(b.package) - parsePackage(a.package);
      if (sort === 'package-low') return parsePackage(a.package) - parsePackage(b.package);
      return new Date(a.deadline) - new Date(b.deadline);
    });

    return result;
  }, [search, typeFilter, sort]);

  return (
    <div className="placements-page">
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <h1 className="page-title">Placements</h1>
        <p className="page-desc">On-campus and off-campus placement drives for you.</p>
      </motion.div>

      <motion.div className="filters-bar" variants={fadeInUp} initial="initial" animate="animate">
        <SearchBar value={search} onChange={setSearch} placeholder="Search companies, roles, skills..." />
        <div className="filters-row">
          <FilterChips label="Type" options={typeOptions} selected={typeFilter} onChange={setTypeFilter} />
          <div className="filters-sort-label">
            <span className="filter-sort-label">Sort by</span>
            <select className="filter-sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="filters-count">{filtered.length} placement{filtered.length !== 1 ? 's' : ''} found</div>
      </motion.div>

      {loading ? (
        <SkeletonGrid count={6} />
      ) : (
        <motion.div
          className="placement-grid"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <PlacementCard key={p.id} placement={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && filtered.length === 0 && (
        <motion.div className="filters-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          No placements match your filters. Try adjusting your search.
        </motion.div>
      )}
    </div>
  );
}
