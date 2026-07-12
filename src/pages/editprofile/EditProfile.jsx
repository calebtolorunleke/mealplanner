import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import BottomNav from "../../components/navigation/BottomNav";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "../../assets/images/profileimage.jpeg"

// ─── Data ─────────────────────────────────────────────────────────────────────

const DIETARY_OPTIONS = ["None", "Vegan", "Vegetarian", "Pescatarian", "Flexitarian", "Paleo", "Gluten-Free", "Keto"];

const NAV_LINKS = ["Plan", "Groceries", "Recipes", "Profile"];

// ─── Page ─────────────────────────────────────────────────────────────────────

const EditProfile = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [calorieGoal, setCalorieGoal] = useState("");
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [avatarSrc, setAvatarSrc] = useState(Avatar);
  const [activeNav, setActiveNav] = useState("Profile");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  const toggleDiet = (diet) => {
    setSelectedDiets((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  const getProfileData = async () => {
    const response = await fetch(`https://backend-mealablev2.onrender.com/api/profile`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to fetch profile");
    }
    return result.data || result;
  };

  const fetchUserData = async () => {
    try {
      const data = await getProfileData();
      setError(null);
      if (data) {
        setDisplayName(data.name || data.displayName || "");
        setCalorieGoal(data.calorieGoal || "");
        setSelectedDiets(data.diets || data.dietaryPreference || []);
        if (data.avatar) {
          setAvatarSrc(data.avatar);
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch user data");
    }
  };

  const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append("displayName", displayName);
    selectedDiets.forEach((pref) => {
      formData.append("dietaryPreference[]", pref);
    });
    formData.append("calorieGoal", calorieGoal);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    const response = await fetch("https://backend-mealablev2.onrender.com/api/profile", {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to update profile");
    }
    return result.data || result;
  };

  const handleSave = async () => {
    setError(null);
    setSaved(false);
    try {
      await handleProfileUpdate();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update user profile");
    }
  };

  const handleCancel = () => {
    fetchUserData();
  };

  const handleNavClick = (link) => {
    setActiveNav(link);
    if (link === "Plan") navigate("/dashboard");
    if (link === "Groceries") navigate("/grocerylist");
    if (link === "Recipes") navigate("/meals");
    if (link === "Profile") navigate("/editprofile");
  };

  useEffect(() => {
    let active = true;
    getProfileData()
      .then((data) => {
        if (active && data) {
          setError(null);
          setDisplayName(data.name || data.displayName || "");
          setCalorieGoal(data.calorieGoal || "");
          setSelectedDiets(data.diets || data.dietaryPreference || []);
          if (data.avatar) {
            setAvatarSrc(data.avatar);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        if (active) {
          setError(err.message || "Failed to fetch user data");
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="ep-root">
      {/* ── Desktop / Tablet Header ───────────────────────────── */}
      <header className="ep-header">
        <div className="ep-header__inner">
          {/* Back + Brand */}
          <div className="ep-header__left">
            <button
              className="ep-header__back-btn"
              aria-label="Go back"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowBackIcon fontSize="small" />
            </button>
            <span className="ep-header__brand" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>MealPlanner</span>
          </div>

          {/* Nav links */}
          <nav aria-label="Main navigation">
            <ul className="ep-header__nav">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button
                    id={`nav-${link.toLowerCase()}`}
                    className={`ep-header__nav-link ${activeNav === link ? "ep-header__nav-link--active" : ""}`}
                    onClick={() => handleNavClick(link)}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right utilities */}
          <div className="ep-header__right">
            <button className="ep-header__icon-btn" aria-label="Cart">
              <ShoppingCartIcon fontSize="small" />
            </button>
            <button
              className="ep-header__avatar-btn"
              aria-label="User avatar"
              onClick={() => navigate("/editprofile")}
            >
              <img
                src={avatarSrc}
                alt="User"
                className="ep-header__avatar-img"
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Page Body ─────────────────────────────────────────── */}
      <main className="ep-main">
        {/* Page title */}
        <div className="ep-page-title">
          <h1 className="ep-page-title__h1">Edit Profile</h1>
          <p className="ep-page-title__sub">
            Customize your culinary preferences and goals.
          </p>
        </div>

        {/* Form card */}
        <div className="ep-card">
          {/* ── Profile Photo ─────────────────────────── */}
          <section className="ep-section ep-section--photo">
            <div className="ep-photo">
              <div className="ep-photo__ring">
                <img
                  src={avatarSrc}
                  alt="Profile"
                  className="ep-photo__img"
                />
                <button
                  className="ep-photo__edit-dot"
                  aria-label="Edit profile photo"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <EditIcon style={{ fontSize: 12 }} />
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                id="profile-photo-input"
              />
            </div>

            <div className="ep-photo__info">
              <h2 className="ep-photo__label">Profile Photo</h2>
              <p className="ep-photo__hint">
                Update your <em>photo</em> for a personalized experience.
              </p>
              <button
                className="ep-photo__change-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Image
              </button>
            </div>
          </section>

          <hr className="ep-divider" />

          {/* ── Display Name ──────────────────────────── */}
          <section className="ep-section">
            <label htmlFor="display-name" className="ep-label">
              Display Name
            </label>
            <input
              id="display-name"
              type="text"
              className="ep-input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
              autoComplete="name"
            />
          </section>

          {/* ── Dietary Preferences ───────────────────── */}
          <section className="ep-section">
            <label className="ep-label">Dietary Preferences</label>
            <p className="ep-label-hint">
              Select all that apply to tailor your recipes.
            </p>
            <div className="ep-diet-chips" role="group" aria-label="Dietary preferences">
              {DIETARY_OPTIONS.map((diet) => {
                const active = selectedDiets.includes(diet);
                return (
                  <button
                    key={diet}
                    id={`diet-${diet.toLowerCase().replace(/[^a-z]/g, "")}`}
                    className={`ep-chip ${active ? "ep-chip--active" : ""}`}
                    onClick={() => toggleDiet(diet)}
                    aria-pressed={active}
                  >
                    {diet}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Weekly Calorie Goal ───────────────────── */}
          <section className="ep-section">
            <label htmlFor="calorie-goal" className="ep-label">
              Weekly Calorie Goal
            </label>
            <div className="ep-input-wrap">
              <input
                id="calorie-goal"
                type="number"
                className="ep-input ep-input--with-unit"
                value={calorieGoal}
                placeholder="2,500"
                onChange={(e) => setCalorieGoal(e.target.value)}
                min={0}
                max={99999}
              />
              <span className="ep-input-unit">kcal</span>
            </div>
            <p className="ep-input-hint">
              Average suggested: 12,000 – 18,000 kcal/week
            </p>
          </section>

          <hr className="ep-divider" />

          {/* ── Actions ───────────────────────────────── */}
          <div className="ep-actions">
            <button
              className="ep-actions__cancel"
              onClick={handleCancel}
              id="cancel-edit-profile"
            >
              Cancel
            </button>
            <button
              className={`ep-actions__save ${saved ? "ep-actions__save--saved" : ""}`}
              onClick={handleSave}
              id="save-edit-profile"
            >
              {saved ? "✓ Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </main>

      <BottomNav />

      {/* ── Toast feedback ────────────────────────────────────── */}
      {saved && (
        <div className="ep-toast" role="status">
          Profile updated successfully!
        </div>
      )}

      {error && (
        <div className="ep-toast ep-toast--error" role="alert">
          {error}
        </div>
      )}

      {/* ── Scoped Styles ─────────────────────────────────────── */}
      <style>{`
        /* ── Root ─────────────────────────────────────────── */
        .ep-root {
          min-height: 100dvh;
          background: #f4f7f2;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          color: #1a1f17;
          display: flex;
          flex-direction: column;
        }

        /* ── Header ───────────────────────────────────────── */
        .ep-header {
          background: #f4f7f2;
          border-bottom: 1px solid #dce6d8;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .ep-header__inner {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0.7rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .ep-header__left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .ep-header__back-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #3d5a40;
          display: flex;
          align-items: center;
          padding: 0.3rem;
          border-radius: 50%;
          transition: background 0.15s;
        }
        .ep-header__back-btn:hover { background: #dce6d8; }
        .ep-header__brand {
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #1a1f17;
        }
        .ep-header__nav {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: 0.25rem;
        }
        .ep-header__nav-link {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 600;
          color: #596655;
          padding: 0.35rem 0.65rem;
          border-radius: 8px;
          transition: color 0.15s, background 0.15s;
        }
        .ep-header__nav-link:hover { color: #3d5a40; background: #e8f2e8; }
        .ep-header__nav-link--active { color: #1a1f17; }
        .ep-header__right {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .ep-header__icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #3d5a40;
          display: flex;
          align-items: center;
          padding: 0.3rem;
          border-radius: 50%;
          transition: background 0.15s;
        }
        .ep-header__icon-btn:hover { background: #dce6d8; }
        .ep-header__avatar-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          border-radius: 50%;
        }
        .ep-header__avatar-img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #4a7c59;
          display: block;
          transition: box-shadow 0.15s;
        }
        .ep-header__avatar-img:hover {
          box-shadow: 0 0 0 3px #4a7c5940;
        }

        /* ── Main ─────────────────────────────────────────── */
        .ep-main {
          flex: 1;
          max-width: 680px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 3rem;
          width: 100%;
          box-sizing: border-box;
        }

        /* ── Page title ───────────────────────────────────── */
        .ep-page-title { margin-bottom: 2rem; }
        .ep-page-title__h1 {
          font-size: clamp(1.75rem, 5vw, 2.25rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #1a1f17;
          margin: 0 0 0.3rem;
        }
        .ep-page-title__sub {
          font-size: 0.9rem;
          color: #596655;
          margin: 0;
        }

        /* ── Card ─────────────────────────────────────────── */
        .ep-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05), 0 6px 24px rgba(0,0,0,0.06);
          padding: 2rem 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        @media (max-width: 480px) {
          .ep-card { padding: 1.25rem 1rem 1.25rem; }
        }

        /* ── Section ──────────────────────────────────────── */
        .ep-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .ep-section--photo {
          flex-direction: row;
          align-items: center;
          gap: 1.5rem;
        }

        /* ── Profile Photo ────────────────────────────────── */
        .ep-photo { flex-shrink: 0; }
        .ep-photo__ring {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #c9d9c5;
          border: 3px solid #dce6d8;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: visible;
        }
        .ep-photo__img {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }
        .ep-photo__edit-dot {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #3d5a40;
          color: #fff;
          border: 2px solid #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        .ep-photo__edit-dot:hover { background: #2e4430; transform: scale(1.1); }
        .ep-photo__info { display: flex; flex-direction: column; gap: 0.35rem; }
        .ep-photo__label {
          font-size: 1rem;
          font-weight: 700;
          color: #1a1f17;
          margin: 0;
        }
        .ep-photo__hint {
          font-size: 0.83rem;
          color: #7a8e75;
          margin: 0;
          line-height: 1.5;
        }
        .ep-photo__hint em { font-style: normal; font-weight: 600; color: #4a7c59; }
        .ep-photo__change-btn {
          align-self: flex-start;
          background: none;
          border: 1.5px solid #b0c4b0;
          border-radius: 8px;
          padding: 0.35rem 0.85rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #3d5a40;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .ep-photo__change-btn:hover {
          background: #e8f2e8;
          border-color: #4a7c59;
        }

        /* ── Divider ──────────────────────────────────────── */
        .ep-divider {
          border: none;
          border-top: 1px solid #e8ede6;
          margin: 0;
        }

        /* ── Labels ───────────────────────────────────────── */
        .ep-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a1f17;
        }
        .ep-label-hint {
          font-size: 0.8rem;
          color: #7a8e75;
          margin: 0;
        }

        /* ── Input ────────────────────────────────────────── */
        .ep-input {
          width: 100%;
          box-sizing: border-box;
          border: 1.5px solid #dce6d8;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          font-family: inherit;
          color: #1a1f17;
          background: #f9fbf8;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          -moz-appearance: textfield;
        }
        .ep-input::-webkit-inner-spin-button,
        .ep-input::-webkit-outer-spin-button { -webkit-appearance: none; }
        .ep-input:focus {
          border-color: #4a7c59;
          box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.15);
          background: #fff;
        }
        .ep-input-wrap { position: relative; }
        .ep-input--with-unit { padding-right: 3.5rem; }
        .ep-input-unit {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.8rem;
          font-weight: 600;
          color: #9fac9a;
          pointer-events: none;
        }
        .ep-input-hint {
          font-size: 0.78rem;
          color: #9fac9a;
          margin: 0;
        }

        /* ── Diet chips ───────────────────────────────────── */
        .ep-diet-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }
        .ep-chip {
          border: 1.5px solid #dce6d8;
          border-radius: 999px;
          padding: 0.4rem 1rem;
          font-size: 0.82rem;
          font-weight: 600;
          background: #f9fbf8;
          color: #596655;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.1s;
        }
        .ep-chip:hover { border-color: #4a7c59; background: #e8f2e8; }
        .ep-chip--active {
          background: #3d5a40;
          border-color: #3d5a40;
          color: #fff;
        }
        .ep-chip--active:hover { background: #2e4430; border-color: #2e4430; }
        .ep-chip:active { transform: scale(0.96); }

        /* ── Actions ──────────────────────────────────────── */
        .ep-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 0.25rem;
        }
        .ep-actions__cancel {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 600;
          color: #596655;
          padding: 0.55rem 1rem;
          border-radius: 10px;
          transition: background 0.15s, color 0.15s;
        }
        .ep-actions__cancel:hover { background: #e8f2e8; color: #3d5a40; }
        .ep-actions__save {
          background: #3d5a40;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0.6rem 1.35rem;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(61, 90, 64, 0.28);
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          min-width: 130px;
        }
        .ep-actions__save:hover {
          background: #2e4430;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(61, 90, 64, 0.35);
        }
        .ep-actions__save--saved {
          background: #4a7c59;
        }

        /* ── Toast ────────────────────────────────────────── */
        .ep-toast {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: #3d5a40;
          color: #fff;
          padding: 0.65rem 1.4rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
          z-index: 200;
          animation: ep-toast-in 0.25s ease;
          white-space: nowrap;
        }
        .ep-toast--error {
          background: #c0392b;
        }
        @keyframes ep-toast-in {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* ── Bottom Nav ───────────────────────────────────── */
        .ep-bottom-nav {
          display: none;
        }

        @media (max-width: 768px) {
          .ep-header__nav {
            display: none;
          }
          .ep-header__inner {
            padding: 0.7rem 1rem;
          }
          .ep-main {
            padding: 1.5rem 1rem 6rem;
          }
          .ep-bottom-nav {
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
          .ep-bottom-nav__item {
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
          .ep-bottom-nav__item--active {
            color: #fff;
            background: #3d5a40;
          }
          .ep-bottom-nav__item:not(.ep-bottom-nav__item--active):hover {
            background: #e8f2e8;
            color: #3d5a40;
          }
        }

        @media (max-width: 480px) {
          .ep-section--photo {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .ep-card {
            padding: 1.25rem 1rem;
          }
          .ep-actions {
            flex-direction: column-reverse;
            align-items: stretch;
            gap: 0.75rem;
          }
          .ep-actions__cancel,
          .ep-actions__save {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default EditProfile;