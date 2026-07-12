import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PrintIcon from "@mui/icons-material/Print";
import BottomNav from "../../components/navigation/BottomNav";

// ─── Data ────────────────────────────────────────────────────────────────────

const fetchCategories = async () => {
  const response = await fetch(
    "https://backend-mealablev2.onrender.com/api/grocery",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch grocery list");
  }
  return data.data;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const GroceryItem = ({ item, checked, onToggle }) => (
  <li className="gl-item" onClick={() => onToggle(item.name)}>
    <label className="gl-item__label">
      <span
        className={`gl-item__checkbox ${checked ? "gl-item__checkbox--checked" : ""}`}
        aria-checked={checked}
        role="checkbox"
        tabIndex={0}
        onKeyDown={(e) => e.key === " " && onToggle(item.name)}
      >
        {checked && (
          <svg viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className={`gl-item__text ${checked ? "gl-item__text--done" : ""}`}>
        {item.name}{" "}
        <span className="gl-item__qty">({item.totalQuantity} {item.unit})</span>
      </span>
    </label>
  </li>
);

const getCategoryDetails = (catName) => {
  switch (catName.toLowerCase()) {
    case "produce":
      return { icon: "🌿", iconBg: "#4a7c59" };
    case "protein":
      return { icon: "🥩", iconBg: "#c0392b" };
    case "dairy":
      return { icon: "🥚", iconBg: "#7d8c6a" };
    case "grains":
      return { icon: "🌾", iconBg: "#b5895a" };
    case "pantry":
      return { icon: "🥫", iconBg: "#d35400" };
    default:
      return { icon: "📦", iconBg: "#7f8c8d" };
  }
};

const CategoryCard = ({ category, checkedItems, onToggle }) => {
  const details = getCategoryDetails(category.category);

  return (
    <div className="gl-card">
      <div className="gl-card__header">
        <div className="gl-card__title-row">
          <span
            className="gl-card__icon"
            style={{ background: details.iconBg + "22", color: details.iconBg }}
          >
            {details.icon}
          </span>
          <h2 className="gl-card__title">{category.category}</h2>
        </div>
        <span className="gl-card__badge">
          {category.items.length} Items
        </span>
      </div>

      <ul className="gl-card__list">
        {category.items.map((item) => (
          <GroceryItem
            key={item.name}
            item={item}
            checked={!!checkedItems[item.name]}
            onToggle={onToggle}
          />
        ))}
      </ul>

      {category.image && (
        <div className="gl-card__img-wrap">
          <img
            src={category.image}
            alt={category.imageLabel}
            className="gl-card__img"
          />
          <span className="gl-card__img-label">{category.imageLabel}</span>
        </div>
      )}
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const GroceryList = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState({});
  const [activeNav, setActiveNav] = useState("groceries");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true;
    fetchCategories()
      .then((data) => {
        if (active) {
          if (data && data.length > 0) {
            setCategories(data);
            setError(null);
          } else {
            setCategories([]);
            setError("No ingredients found. Add some meals first to generate your automated shopping list.");
          }
        }
      })
      .catch((err) => {
        console.error("Error loading grocery list:", err);
        if (active) {
          setCategories([]);
          setError("Connection failed. Please make sure the local server is running on port 4000.");
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const handleToggle = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavClick = (id) => {
    setActiveNav(id);
    if (id === "plan") navigate("/dashboard");
    if (id === "groceries") navigate("/grocerylist");
    if (id === "recipes") navigate("/meals");
    if (id === "profile") navigate("/editprofile");
  };

  return (
    <div className="gl-root">
      {/* ── Mobile Header ─────────────────────────────────────── */}
      <header className="gl-header">
        <span className="gl-header__brand" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>MealPlanner</span>
        <div className="gl-header__actions">
          <button className="gl-header__icon-btn" aria-label="Cart">
            <ShoppingCartIcon fontSize="small" />
          </button>
          <div className="gl-header__avatar" aria-label="User profile" onClick={() => navigate("/editprofile")} style={{ cursor: "pointer" }}>
            <img
              src="https://i.pravatar.cc/40?img=47"
              alt="User avatar"
              className="gl-header__avatar-img"
            />
          </div>
        </div>
      </header>

      {/* ── Page Content ──────────────────────────────────────── */}
      <main className="gl-main">
        {/* Hero */}
        <section className="gl-hero">
          <div className="gl-hero__meta">OCTOBER 2023 PLAN</div>
          <h1 className="gl-hero__title">Monthly Grocery List</h1>
          <p className="gl-hero__subtitle">
            All ingredients aggregated from your monthly meal schedule, organized for
            an efficient shopping experience.
          </p>
          <button
            className="gl-hero__print-btn"
            onClick={() => window.print()}
            aria-label="Print grocery list"
          >
            <PrintIcon fontSize="small" />
            Print List
          </button>
        </section>

        {/* Category Grid */}
        <section className={categories.length > 0 ? "gl-grid" : ""}>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <CategoryCard
                key={cat.category}
                category={cat}
                checkedItems={checkedItems}
                onToggle={handleToggle}
              />
            ))
          ) : (
            <div className="gl-empty">
              <div className="gl-empty__icon-wrap">
                <ShoppingCartIcon className="gl-empty__icon" />
              </div>
              <h2 className="gl-empty__title">Your Grocery List is Empty</h2>
              <p className="gl-empty__subtitle">{error}</p>
              <button
                className="gl-empty__btn"
                onClick={() => navigate("/dashboard")}
              >
                Plan Your Meals
              </button>
            </div>
          )}
        </section>

        {/* Savings Banner */}
        <section className="gl-savings">
          <div className="gl-savings__text">
            <h3 className="gl-savings__title">Monthly Plan Savings</h3>
            <p className="gl-savings__body">
              By aggregating your ingredients into one monthly list, you've reduced
              estimated food waste by 18% and saved approximately $45 compared to
              weekly shopping.
            </p>
            <div className="gl-savings__stats">
              <div className="gl-savings__stat">
                <span className="gl-savings__stat-value">$120</span>
                <span className="gl-savings__stat-label">EST. BUDGET</span>
              </div>
              <div className="gl-savings__stat">
                <span className="gl-savings__stat-value">2.4kg</span>
                <span className="gl-savings__stat-label">CARBON OFFSET</span>
              </div>
            </div>
          </div>
          <div className="gl-savings__img-wrap">
            <img
              src="/grains_bowls.png"
              alt="Assorted grains and legumes in glass bowls"
              className="gl-savings__img"
            />
          </div>
        </section>
      </main>

      <BottomNav />

      {/* ── Scoped Styles ─────────────────────────────────────── */}
      <style>{`
        /* ── Reset / Root ─────────────────────────────────── */
        .gl-root {
          min-height: 100dvh;
          background: #f4f7f2;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          position: relative;
          color: #1a1f17;
        }

        /* ── Header ──────────────────────────────────────── */
        .gl-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #f0f5ee;
          border-bottom: 1px solid #dce6d8;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
        }
        .gl-header__brand {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #1a1f17;
        }
        .gl-header__actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .gl-header__icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #3d5a40;
          display: flex;
          align-items: center;
          padding: 0.25rem;
          border-radius: 50%;
          transition: background 0.15s;
        }
        .gl-header__icon-btn:hover { background: #dce6d8; }
        .gl-header__avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #4a7c59;
        }
        .gl-header__avatar-img { width: 100%; height: 100%; object-fit: cover; }

        /* ── Main ────────────────────────────────────────── */
        .gl-main {
          flex: 1;
          padding: 1.5rem 1.25rem 6rem;
          max-width: 860px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        /* ── Hero ────────────────────────────────────────── */
        .gl-hero {
          margin-bottom: 1.75rem;
          position: relative;
        }
        .gl-hero__meta {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #4a7c59;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
        }
        .gl-hero__title {
          font-size: clamp(1.75rem, 6vw, 2.5rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: #1a1f17;
          margin: 0 0 0.6rem;
          line-height: 1.1;
        }
        .gl-hero__subtitle {
          font-size: 0.875rem;
          color: #596655;
          max-width: 340px;
          line-height: 1.6;
          margin: 0;
        }
        .gl-hero__print-btn {
          position: absolute;
          right: 0;
          top: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: #3d5a40;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0.55rem 1rem;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 2px 8px rgba(61, 90, 64, 0.3);
        }
        .gl-hero__print-btn:hover {
          background: #2e4430;
          transform: translateY(-1px);
        }

        /* ── Category Grid ───────────────────────────────── */
        .gl-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        @media (min-width: 600px) {
          .gl-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── Category Card ───────────────────────────────── */
        .gl-card {
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s;
        }
        .gl-card:hover {
          box-shadow: 0 2px 8px rgba(0,0,0,0.09), 0 8px 24px rgba(0,0,0,0.07);
        }
        .gl-card__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.1rem 0.75rem;
        }
        .gl-card__title-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .gl-card__icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .gl-card__title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #1a1f17;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .gl-card__badge {
          font-size: 0.72rem;
          font-weight: 600;
          color: #3d5a40;
          background: #e8f2e8;
          border-radius: 999px;
          padding: 0.2rem 0.65rem;
          white-space: nowrap;
        }

        /* ── Item List ───────────────────────────────────── */
        .gl-card__list {
          list-style: none;
          margin: 0;
          padding: 0 1.1rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .gl-item {
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.12s;
          padding: 0.15rem 0.25rem;
        }
        .gl-item:hover { background: #f4f7f2; }
        .gl-item__label {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
        }
        .gl-item__checkbox {
          width: 18px;
          height: 18px;
          border-radius: 5px;
          border: 1.8px solid #b0c4b0;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, border-color 0.15s;
          outline: none;
        }
        .gl-item__checkbox:focus-visible {
          box-shadow: 0 0 0 2px #4a7c5980;
        }
        .gl-item__checkbox--checked {
          background: #3d5a40;
          border-color: #3d5a40;
        }
        .gl-item__checkbox svg { width: 10px; height: 8px; }
        .gl-item__text {
          font-size: 0.9rem;
          color: #1a1f17;
          transition: color 0.15s;
        }
        .gl-item__text--done {
          text-decoration: line-through;
          color: #9fac9a;
        }
        .gl-item__qty { color: #7a8e75; font-size: 0.85rem; }

        /* ── Card Image ──────────────────────────────────── */
        .gl-card__img-wrap {
          position: relative;
          margin-top: auto;
          height: 130px;
          overflow: hidden;
          border-radius: 0 0 18px 18px;
          flex-shrink: 0;
        }
        .gl-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .gl-card:hover .gl-card__img { transform: scale(1.04); }
        .gl-card__img-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0.4rem 0.75rem;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%);
          color: #fff;
          font-size: 0.78rem;
          font-weight: 600;
        }

        /* ── Savings Banner ──────────────────────────────── */
        .gl-savings {
          border-radius: 20px;
          background: #3d5a40;
          overflow: hidden;
          display: flex;
          min-height: 200px;
          position: relative;
        }
        .gl-savings__text {
          padding: 1.75rem 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 1;
        }
        .gl-savings__title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 0.6rem;
          letter-spacing: -0.03em;
        }
        .gl-savings__body {
          font-size: 0.8rem;
          color: #b8d4b8;
          line-height: 1.65;
          margin: 0 0 1.1rem;
          max-width: 240px;
        }
        .gl-savings__stats {
          display: flex;
          gap: 0.75rem;
        }
        .gl-savings__stat {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(4px);
          border-radius: 10px;
          padding: 0.5rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          min-width: 90px;
        }
        .gl-savings__stat-value {
          font-size: 1.05rem;
          font-weight: 800;
          color: #fff;
          line-height: 1;
        }
        .gl-savings__stat-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #a8c8a8;
          text-transform: uppercase;
        }
        .gl-savings__img-wrap {
          width: 45%;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .gl-savings__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0.9;
        }
        @media (max-width: 480px) {
          .gl-savings__img-wrap { display: none; }
          .gl-hero__print-btn { position: static; margin-top: 1rem; }
        }

        /* ── Bottom Nav ──────────────────────────────────── */
        .gl-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(12px);
          border-top: 1px solid #dce6d8;
          display: flex;
          justify-content: space-around;
          padding: 0.5rem 0 0.75rem;
          z-index: 100;
        }
        .gl-bottom-nav__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.68rem;
          font-weight: 600;
          color: #9fac9a;
          padding: 0.35rem 1rem;
          border-radius: 12px;
          transition: color 0.15s, background 0.15s;
        }
        .gl-bottom-nav__item--active {
          color: #fff;
          background: #3d5a40;
        }
        .gl-bottom-nav__item:not(.gl-bottom-nav__item--active):hover {
          background: #e8f2e8;
          color: #3d5a40;
        }

        /* ── Empty State ─────────────────────────────────── */
        .gl-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3.5rem 2rem;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
          max-width: 440px;
          margin: 1.5rem auto;
          box-sizing: border-box;
        }
        .gl-empty__icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #e8f2e8;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: #3d5a40;
        }
        .gl-empty__icon {
          font-size: 2rem !important;
        }
        .gl-empty__title {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #1a1f17;
          margin: 0 0 0.5rem;
        }
        .gl-empty__subtitle {
          font-size: 0.875rem;
          color: #7a8e75;
          line-height: 1.6;
          max-width: 320px;
          margin: 0 0 1.5rem;
        }
        .gl-empty__btn {
          background: #3d5a40;
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 0.65rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 2px 8px rgba(61, 90, 64, 0.25);
        }
        .gl-empty__btn:hover {
          background: #2e4430;
          transform: translateY(-1px);
        }
        .gl-empty__btn:active {
          transform: translateY(0);
        }
        @media print {
          .gl-header, .gl-bottom-nav, .gl-hero__print-btn, .gl-savings { display: none; }
          .gl-main { padding: 0; }
        }
      `}</style>
    </div>
  );
};

export default GroceryList;