import { motion } from 'framer-motion';

export function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="filter-search">
      <span className="filter-search-icon">🔍</span>
      <input
        className="filter-search-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button type="button" className="filter-search-clear" onClick={() => onChange('')}>
          ✕
        </button>
      )}
    </div>
  );
}

export function FilterChips({ label, options, selected, onChange }) {
  return (
    <div className="filter-chips">
      {label && <span className="filter-chips-label">{label}</span>}
      <div className="filter-chips-list">
        {options.map((opt) => (
          <motion.button
            type="button"
            key={opt}
            className={`filter-chip ${selected === opt ? 'active' : ''}`}
            onClick={() => onChange(selected === opt ? null : opt)}
            whileTap={{ scale: 0.95 }}
            aria-label={`Filter by ${label ? label + ': ' : ''}${opt}`}
            aria-pressed={selected === opt}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export function SortSelect({ value, onChange, options }) {
  return (
    <div className="filter-sort">
      <span className="filter-sort-label">Sort by</span>
      <select
        className="filter-sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export function CompanyBadge({ logo, company, size = 'md' }) {
  return (
    <div className={`company-badge size-${size}`}>
      <span className="company-badge-logo">{logo}</span>
      <span className="company-badge-name">{company}</span>
    </div>
  );
}

export function TagList({ tags }) {
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <span key={tag} className="tag">{tag}</span>
      ))}
    </div>
  );
}

export function DeadlineBadge({ deadline }) {
  const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return <span className="deadline-badge expired">Expired</span>;
  }

  const level = daysLeft <= 3 ? 'urgent' : daysLeft <= 7 ? 'soon' : 'normal';

  return (
    <span className={`deadline-badge ${level}`}>
      {daysLeft === 0 ? 'Today' : `${daysLeft}d left`}
    </span>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-line skeleton-logo" />
          <div className="skeleton-line skeleton-title" />
          <div className="skeleton-line skeleton-subtitle" />
          <div className="skeleton-line skeleton-meta" />
          <div className="skeleton-tags">
            <div className="skeleton-line skeleton-tag" />
            <div className="skeleton-line skeleton-tag" />
          </div>
        </div>
      ))}
    </div>
  );
}
