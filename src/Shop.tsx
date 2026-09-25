import { useState } from 'react';
import { useStore, useFilteredProducts } from './store';
import { categories, brands, formatNaira, products } from './data';
import { ProductCard } from './Product';

const PAGE_SIZE = 24;

export default function Shop() {
  const { category, setCategory, brand, setBrand, sort, setSort, maxPrice, setMaxPrice, search, setSearch } = useStore();
  const filtered = useFilteredProducts();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [showFilters, setShowFilters] = useState(false);

  const reset = () => { setCategory('All'); setBrand('All'); setMaxPrice(2500000); setSearch(''); setSort('featured'); };
  const shown = filtered.slice(0, visible);

  return (
    <>
      <section className="shop-hero">
        <div className="container">
          <h1>Shop</h1>
          <p>Browse our full catalog of {products.length} products.</p>
        </div>
      </section>
      <section className="section section-tight">
        <div className="container shop-in">
          <aside className={`shop-filters${showFilters ? ' open' : ''}`}>
            <div className="filter-head">
              <h3>Filters</h3>
              <button className="filter-reset" onClick={reset}>Reset</button>
            </div>
            <div className="filter-group">
              <label>Search</label>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" />
            </div>
            <div className="filter-group">
              <label>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="All">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>Brand</label>
              <select value={brand} onChange={e => setBrand(e.target.value)}>
                <option value="All">All Brands</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>Max Price: {formatNaira(maxPrice)}</label>
              <input type="range" min={5000} max={2500000} step={5000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} />
            </div>
            <div className="filter-group">
              <label>Sort</label>
              <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </aside>
          <div className="shop-main">
            <div className="shop-bar">
              <span className="shop-count">Showing 1–{Math.min(visible, filtered.length)} of {filtered.length} products</span>
              <button className="filter-toggle" onClick={() => setShowFilters(s => !s)}>Filters</button>
            </div>
            {shown.length === 0 ? (
              <div className="empty">
                <span className="empty-ico">🔍</span>
                <h3>No products found</h3>
                <p>Try adjusting your search or filters.</p>
                <button className="btn btn-primary" onClick={reset}>Reset Filters</button>
              </div>
            ) : (
              <div className="grid grid-4">
                {shown.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
            {visible < filtered.length && (
              <div className="load-more">
                <button className="btn btn-outline" onClick={() => setVisible(v => v + PAGE_SIZE)}>Load More</button>
              </div>
            )}
          </div>
        </div>
      </section>
      <style>{`
        .shop-hero { background: linear-gradient(135deg, var(--navy), var(--blue)); color: white; padding: 40px 0; }
        .shop-hero h1 { color: white; font-size: 32px; margin-bottom: 4px; }
        .shop-hero p { color: #cbd5e1; margin: 0; }
        .shop-in { display: grid; grid-template-columns: 240px 1fr; gap: 28px; }
        .shop-filters { background: var(--light); border-radius: var(--radius); padding: 20px; height: fit-content; display: flex; flex-direction: column; gap: 16px; position: sticky; top: 140px; }
        .filter-head { display: flex; justify-content: space-between; align-items: center; }
        .filter-head h3 { font-size: 16px; }
        .filter-reset { font-size: 12px; color: var(--electric); font-weight: 700; background: none; border: none; }
        .filter-group { display: flex; flex-direction: column; gap: 6px; }
        .filter-group label { font-size: 12px; font-weight: 700; color: var(--navy); }
        .filter-group input, .filter-group select { padding: 9px 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; }
        .filter-group input[type=range] { padding: 0; }
        .shop-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .shop-count { font-size: 14px; color: var(--grey); font-weight: 600; }
        .filter-toggle { display: none; font-weight: 700; color: var(--electric); background: none; border: 1px solid var(--electric); padding: 6px 14px; border-radius: 999px; }
        .empty { text-align: center; padding: 60px 20px; }
        .empty-ico { font-size: 48px; }
        .empty h3 { margin: 12px 0 6px; }
        .empty p { color: var(--grey); margin: 0 0 16px; }
        .load-more { text-align: center; margin-top: 28px; }
        @media (max-width: 880px) {
          .shop-in { grid-template-columns: 1fr; }
          .shop-filters { display: none; position: static; }
          .shop-filters.open { display: flex; }
          .filter-toggle { display: inline-flex; }
        }
      `}</style>
    </>
  );
}
