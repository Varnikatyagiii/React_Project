import { useState } from "react";

const theme = {
  green900: "#173404",
  green800: "#27500A",
  green700: "#3B6D11",
  green600: "#639922",
  green200: "#C0DD97",
  green100: "#EAF3DE",
  amber100: "#FAEEDA",
  amber400: "#EF9F27",
  white: "#ffffff",
  gray50: "#F8F7F4",
  gray100: "#F1EFE8",
  gray200: "#D3D1C7",
  gray500: "#888780",
  gray800: "#444441",
};

const styles = {
  app: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: theme.gray50,
    minHeight: "100vh",
    color: theme.gray800,
  },
  nav: {
    background: theme.white,
    borderBottom: `1px solid ${theme.gray200}`,
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 22,
    fontWeight: 700,
    color: theme.green700,
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
  },
  logoLeaf: {
    width: 20,
    height: 20,
    background: theme.green700,
    borderRadius: "50% 50% 50% 0",
    transform: "rotate(-45deg)",
  },
  navLinks: {
    display: "flex",
    gap: 28,
    fontSize: 14,
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
};

const PRODUCTS = [
  { id: 1, name: "Alphonso Mangoes", farm: "Ramesh Patil Farm", location: "Nashik, MH", price: 180, unit: "kg", emoji: "🥭", bg: theme.amber100, tag: "Harvested today", category: "Fruits" },
  { id: 2, name: "Organic Carrots", farm: "Sunita Farms", location: "Nashik, MH", price: 40, unit: "500g", emoji: "🥕", bg: theme.amber100, tag: "Harvested today", category: "Vegetables" },
  { id: 3, name: "Cherry Tomatoes", farm: "Green Valley", location: "Pune, MH", price: 65, unit: "500g", emoji: "🍅", bg: theme.amber100, tag: "Harvested today", category: "Vegetables" },
  { id: 4, name: "Baby Spinach", farm: "Patel Organics", location: "Ahmedabad, GJ", price: 55, unit: "250g", emoji: "🥬", bg: theme.green100, tag: "Harvested yesterday", category: "Vegetables" },
  { id: 5, name: "Raw Honey", farm: "Himalayan Bees", location: "Shimla, HP", price: 320, unit: "500ml", emoji: "🍯", bg: theme.amber100, tag: "Limited stock", category: "Preserved" },
  { id: 6, name: "Green Capsicum", farm: "Kisan Direct", location: "Jaipur, RJ", price: 45, unit: "kg", emoji: "🫑", bg: theme.green100, tag: "Harvested today", category: "Vegetables" },
  { id: 7, name: "Sweet Corn", farm: "Maize King", location: "Indore, MP", price: 30, unit: "2 pcs", emoji: "🌽", bg: theme.amber100, tag: "Harvested today", category: "Grains" },
  { id: 8, name: "A2 Desi Milk", farm: "Gir Cow Dairy", location: "Anand, GJ", price: 90, unit: "liter", emoji: "🥛", bg: theme.white, tag: "Morning fresh", category: "Dairy" },
];

const FARMERS = [
  { id: 1, name: "Ramesh Patil", location: "Nashik, MH", emoji: "👨‍🌾", specialties: ["Mangoes", "Grapes"], rating: 4.9, orders: 340 },
  { id: 2, name: "Sunita Devi", location: "Shimla, HP", emoji: "👩‍🌾", specialties: ["Apples", "Herbs"], rating: 4.8, orders: 215 },
  { id: 3, name: "Arjun Reddy", location: "Hyderabad, TG", emoji: "🧑‍🌾", specialties: ["Rice", "Pulses"], rating: 4.7, orders: 180 },
  { id: 4, name: "Meena Kumari", location: "Jaipur, RJ", emoji: "👩‍🌾", specialties: ["Dairy", "Veggies"], rating: 4.9, orders: 420 },
];

const CATEGORIES = ["All", "Vegetables", "Fruits", "Dairy", "Grains", "Herbs", "Preserved"];

const ORDERS = [
  { id: "FD-2041", items: "Mangoes × 2kg", farmer: "Ramesh Patil", total: 360, step: 2, status: "On the way" },
  { id: "FD-2038", items: "Spinach, Tomatoes", farmer: "Patel Organics", total: 120, step: 3, status: "Delivered" },
];

const STEPS = ["Ordered", "Harvested", "Dispatched", "Delivered"];

export default function FarmDirectMarketplace() {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState({});
  const [category, setCategory] = useState("All");
  const [farmerView, setFarmerView] = useState(false);

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id) => setCart((c) => { const n = { ...c }; if (n[id] > 1) n[id]--; else delete n[id]; return n; });
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find((p) => p.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const filtered = category === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  return (
    <div style={styles.app}>
      {/* Inject Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap'); * { box-sizing: border-box; } body { margin: 0; }`}</style>

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => setActiveTab("home")}>
          <div style={styles.logoLeaf} />
          FarmDirect
        </div>
        <div style={styles.navLinks}>
          {["home", "products", "farmers", "orders", "about"].map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                cursor: "pointer",
                color: activeTab === tab ? theme.green700 : theme.gray500,
                fontWeight: activeTab === tab ? 500 : 400,
                textTransform: "capitalize",
                borderBottom: activeTab === tab ? `2px solid ${theme.green700}` : "2px solid transparent",
                paddingBottom: 4,
                transition: "all 0.15s",
              }}
            >
              {tab}
            </span>
          ))}
        </div>
        <div style={styles.navRight}>
          <button
            onClick={() => setActiveTab("cart")}
            style={{
              background: cartCount > 0 ? theme.green100 : "transparent",
              border: `1px solid ${cartCount > 0 ? theme.green200 : theme.gray200}`,
              borderRadius: 8,
              padding: "6px 14px",
              fontSize: 13,
              cursor: "pointer",
              color: cartCount > 0 ? theme.green700 : theme.gray500,
              fontWeight: 500,
              transition: "all 0.15s",
            }}
          >
            🛒 Cart {cartCount > 0 && `(${cartCount})`}
          </button>
          <button
            onClick={() => setFarmerView(!farmerView)}
            style={{
              background: farmerView ? theme.green700 : theme.green100,
              border: "none",
              borderRadius: 8,
              padding: "7px 16px",
              fontSize: 13,
              cursor: "pointer",
              color: farmerView ? theme.green100 : theme.green700,
              fontWeight: 500,
              fontFamily: "inherit",
            }}
          >
            {farmerView ? "Consumer view" : "Farmer view"}
          </button>
        </div>
      </nav>

      {/* Pages */}
      {activeTab === "home" && !farmerView && <HomePage setActiveTab={setActiveTab} addToCart={addToCart} />}
      {activeTab === "home" && farmerView && <FarmerDashboard />}
      {activeTab === "products" && <ProductsPage filtered={filtered} category={category} setCategory={setCategory} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />}
      {activeTab === "farmers" && <FarmersPage />}
      {activeTab === "orders" && <OrdersPage />}
      {activeTab === "cart" && <CartPage cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} cartTotal={cartTotal} setActiveTab={setActiveTab} />}
      {activeTab === "about" && <AboutPage setActiveTab={setActiveTab} />}
    </div>
  );
}

function HomePage({ setActiveTab, addToCart }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${theme.green100} 0%, #f0f7e6 100%)`, padding: "3rem 2rem", display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: "inline-block", background: theme.green200, color: theme.green800, fontSize: 12, fontWeight: 500, padding: "4px 12px", borderRadius: 20, marginBottom: 16 }}>
            🌿 100% Farm-fresh
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 40, color: theme.green900, lineHeight: 1.15, margin: "0 0 16px", maxWidth: 380 }}>
            Farm fresh,{" "}
            <em style={{ color: theme.green700, fontStyle: "italic" }}>direct to you</em>
          </h1>
          <p style={{ fontSize: 15, color: theme.green800, lineHeight: 1.7, maxWidth: 360, margin: "0 0 28px" }}>
            Skip the middlemen. Order straight from local farmers — harvested today, delivered in 48 hours.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setActiveTab("products")} style={{ background: theme.green700, border: "none", borderRadius: 8, padding: "11px 24px", fontSize: 14, cursor: "pointer", color: theme.green100, fontFamily: "inherit", fontWeight: 500 }}>
              Shop now →
            </button>
            <button onClick={() => setActiveTab("farmers")} style={{ background: "transparent", border: `1.5px solid ${theme.green700}`, borderRadius: 8, padding: "11px 24px", fontSize: 14, cursor: "pointer", color: theme.green700, fontFamily: "inherit" }}>
              Meet farmers
            </button>
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 32 }}>
            {[["1,200+", "Farmers"], ["48hr", "Delivery"], ["Zero", "Middlemen"]].map(([val, lbl]) => (
              <div key={lbl}>
                <div style={{ fontSize: 22, fontWeight: 500, color: theme.green700 }}>{val}</div>
                <div style={{ fontSize: 12, color: theme.green800, marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured card */}
        <div style={{ background: theme.white, borderRadius: 16, border: `1px solid ${theme.green200}`, padding: "1.25rem", width: 230, flexShrink: 0 }}>
          <div style={{ fontSize: 11, background: theme.green100, color: theme.green700, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 10, fontWeight: 500 }}>
            Just harvested
          </div>
          <div style={{ height: 100, background: theme.amber100, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50, marginBottom: 12 }}>🥭</div>
          <div style={{ fontWeight: 500, fontSize: 15 }}>Alphonso Mangoes</div>
          <div style={{ fontSize: 12, color: theme.gray500, marginTop: 3 }}>Ramesh Patil Farm · Nashik</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
            <span style={{ fontSize: 17, fontWeight: 500, color: theme.green700 }}>₹180 / kg</span>
            <button onClick={() => addToCart(1)} style={{ background: theme.green700, border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", color: theme.green100, fontFamily: "inherit", fontWeight: 500 }}>
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Today's picks */}
      <div style={{ padding: "2rem 2rem 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: theme.green900, margin: 0 }}>Today's fresh picks</h2>
          <span onClick={() => setActiveTab("products")} style={{ fontSize: 13, color: theme.green700, cursor: "pointer" }}>View all →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 12 }}>
          {PRODUCTS.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} onAdd={() => addToCart(p.id)} />
          ))}
        </div>
      </div>

      {/* Banner */}
      <div style={{ margin: "2rem 2rem 0", background: theme.green800, borderRadius: 14, padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 20, color: theme.green200 }}>Are you a farmer?</div>
          <div style={{ fontSize: 13, color: theme.green600, marginTop: 5 }}>List produce · Set own prices · Receive direct payments</div>
        </div>
        <button style={{ background: theme.green200, border: "none", borderRadius: 8, padding: "10px 22px", fontSize: 14, cursor: "pointer", color: theme.green900, fontFamily: "inherit", fontWeight: 500 }}>
          Start selling →
        </button>
      </div>

      {/* Featured Farmers */}
      <div style={{ padding: "2rem" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: theme.green900, margin: "0 0 16px" }}>Featured farmers</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {FARMERS.map((f) => (
            <div key={f.id} style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 12, padding: "1rem", display: "flex", gap: 12, alignItems: "center", cursor: "pointer", transition: "border-color 0.15s" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: theme.green100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{f.emoji}</div>
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{f.name}</div>
                <div style={{ fontSize: 12, color: theme.gray500, marginTop: 2 }}>📍 {f.location}</div>
                <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                  {f.specialties.map((s) => (
                    <span key={s} style={{ fontSize: 11, background: theme.green100, color: theme.green700, padding: "2px 8px", borderRadius: 10 }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product: p, onAdd, qty, onRemove }) {
  return (
    <div style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
      <div style={{ height: 110, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46 }}>{p.emoji}</div>
      <div style={{ padding: "10px 12px 12px" }}>
        <div style={{ fontWeight: 500, fontSize: 13 }}>{p.name}</div>
        <div style={{ fontSize: 11, color: theme.gray500, marginTop: 2 }}>{p.farm}</div>
        <div style={{ fontSize: 11, color: theme.gray500, marginTop: 1 }}>📍 {p.location}</div>
        <div style={{ fontSize: 10, background: theme.green100, color: theme.green700, padding: "2px 7px", borderRadius: 10, display: "inline-block", marginTop: 5, fontWeight: 500 }}>{p.tag}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: theme.green700 }}>₹{p.price}</div>
            <div style={{ fontSize: 11, color: theme.gray500 }}>/{p.unit}</div>
          </div>
          {qty > 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button onClick={onRemove} style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${theme.green200}`, background: theme.green100, color: theme.green700, cursor: "pointer", fontWeight: 500, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
              <span style={{ fontSize: 13, fontWeight: 500, minWidth: 16, textAlign: "center" }}>{qty}</span>
              <button onClick={onAdd} style={{ width: 24, height: 24, borderRadius: 6, border: "none", background: theme.green700, color: theme.green100, cursor: "pointer", fontWeight: 500, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
            </div>
          ) : (
            <button onClick={onAdd} style={{ background: theme.green100, border: "none", borderRadius: 7, padding: "4px 10px", fontSize: 11, cursor: "pointer", color: theme.green700, fontFamily: "inherit", fontWeight: 500 }}>+ Add</button>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductsPage({ filtered, category, setCategory, cart, addToCart, removeFromCart }) {
  return (
    <div style={{ padding: "1.5rem 2rem" }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 26, color: theme.green900, margin: "0 0 16px" }}>All produce</h2>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 20 }}>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)} style={{ background: category === c ? theme.green100 : theme.white, border: `1px solid ${category === c ? theme.green200 : theme.gray200}`, borderRadius: 20, padding: "7px 16px", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", color: category === c ? theme.green700 : theme.gray500, fontFamily: "inherit", fontWeight: category === c ? 500 : 400 }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 12 }}>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} qty={cart[p.id] || 0} onAdd={() => addToCart(p.id)} onRemove={() => removeFromCart(p.id)} />
        ))}
      </div>
    </div>
  );
}

function FarmersPage() {
  return (
    <div style={{ padding: "1.5rem 2rem" }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 26, color: theme.green900, margin: "0 0 6px" }}>Our farmers</h2>
      <p style={{ fontSize: 14, color: theme.gray500, marginBottom: 24 }}>Meet the people growing your food</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {FARMERS.map((f) => (
          <div key={f.id} style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 14, padding: "1.5rem", cursor: "pointer" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: theme.green100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{f.emoji}</div>
              <div>
                <div style={{ fontWeight: 500, fontSize: 16 }}>{f.name}</div>
                <div style={{ fontSize: 13, color: theme.gray500, marginTop: 3 }}>📍 {f.location}</div>
                <div style={{ fontSize: 12, color: theme.green700, marginTop: 3 }}>⭐ {f.rating} · {f.orders} orders</div>
              </div>
            </div>
            <div style={{ borderTop: `1px solid ${theme.gray100}`, paddingTop: 12 }}>
              <div style={{ fontSize: 12, color: theme.gray500, marginBottom: 6 }}>Specialties</div>
              <div style={{ display: "flex", gap: 6 }}>
                {f.specialties.map((s) => (
                  <span key={s} style={{ fontSize: 12, background: theme.green100, color: theme.green700, padding: "3px 10px", borderRadius: 10, fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </div>
            <button style={{ width: "100%", background: theme.green100, border: "none", borderRadius: 8, padding: "9px", fontSize: 13, cursor: "pointer", color: theme.green700, fontFamily: "inherit", fontWeight: 500, marginTop: 14 }}>
              View produce →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersPage() {
  return (
    <div style={{ padding: "1.5rem 2rem" }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 26, color: theme.green900, margin: "0 0 20px" }}>Your orders</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 640 }}>
        {ORDERS.map((order) => (
          <div key={order.id} style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 14, padding: "1.25rem 1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 15 }}>Order #{order.id}</div>
                <div style={{ fontSize: 12, color: theme.gray500, marginTop: 3 }}>{order.items} · {order.farmer}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <span style={{ fontSize: 11, background: order.step === 3 ? theme.green100 : theme.amber100, color: order.step === 3 ? theme.green700 : theme.amber400, padding: "3px 10px", borderRadius: 10, fontWeight: 500 }}>
                  {order.status}
                </span>
                <span style={{ fontSize: 14, fontWeight: 500, color: theme.green700 }}>₹{order.total}</span>
              </div>
            </div>
            {/* Tracker */}
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {STEPS.map((step, i) => (
                <div key={step} style={{ flex: 1, textAlign: "center", position: "relative" }}>
                  {i < STEPS.length - 1 && (
                    <div style={{ position: "absolute", top: 10, left: "50%", width: "100%", height: 2, background: i <= order.step ? theme.green700 : theme.gray200, zIndex: 0 }} />
                  )}
                  <div style={{ width: 22, height: 22, borderRadius: "50%", margin: "0 auto 6px", position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, background: i < order.step ? theme.green700 : i === order.step ? theme.green100 : theme.gray100, border: i === order.step ? `2px solid ${theme.green700}` : "none", color: i < order.step ? theme.green100 : i === order.step ? theme.green700 : theme.gray500 }}>
                    {i < order.step ? "✓" : i + 1}
                  </div>
                  <div style={{ fontSize: 10, color: i <= order.step ? theme.green700 : theme.gray500, fontWeight: i === order.step ? 500 : 400 }}>{step}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartPage({ cart, addToCart, removeFromCart, cartTotal, setActiveTab }) {
  const items = Object.entries(cart).map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === Number(id)), qty }));

  if (items.length === 0) {
    return (
      <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: theme.green900, marginBottom: 8 }}>Your cart is empty</div>
        <div style={{ fontSize: 14, color: theme.gray500, marginBottom: 24 }}>Add some fresh produce to get started</div>
        <button onClick={() => setActiveTab("products")} style={{ background: theme.green700, border: "none", borderRadius: 8, padding: "11px 24px", fontSize: 14, cursor: "pointer", color: theme.green100, fontFamily: "inherit", fontWeight: 500 }}>
          Browse produce →
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "1.5rem 2rem", maxWidth: 700, margin: "0 auto" }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: 26, color: theme.green900, margin: "0 0 20px" }}>Your cart</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {items.map((item) => (
          <div key={item.id} style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 50, height: 50, background: item.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{item.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: theme.gray500, marginTop: 2 }}>{item.farm}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => removeFromCart(item.id)} style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${theme.gray200}`, background: theme.white, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: theme.gray500 }}>−</button>
              <span style={{ fontWeight: 500, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
              <button onClick={() => addToCart(item.id)} style={{ width: 28, height: 28, borderRadius: 7, border: "none", background: theme.green700, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", color: theme.green100 }}>+</button>
            </div>
            <div style={{ fontWeight: 500, fontSize: 15, color: theme.green700, minWidth: 64, textAlign: "right" }}>₹{item.price * item.qty}</div>
          </div>
        ))}
      </div>
      <div style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 14, padding: "1.25rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: theme.gray500, marginBottom: 8 }}>
          <span>Subtotal</span><span>₹{cartTotal}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: theme.gray500, marginBottom: 8 }}>
          <span>Delivery</span><span style={{ color: theme.green700 }}>Free</span>
        </div>
        <div style={{ borderTop: `1px solid ${theme.gray100}`, paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 500, fontSize: 17, marginBottom: 16 }}>
          <span>Total</span><span style={{ color: theme.green700 }}>₹{cartTotal}</span>
        </div>
        <button style={{ width: "100%", background: theme.green700, border: "none", borderRadius: 10, padding: "12px", fontSize: 15, cursor: "pointer", color: theme.green100, fontFamily: "inherit", fontWeight: 500 }}>
          Proceed to checkout →
        </button>
      </div>
    </div>
  );
}

function AboutPage({ setActiveTab }) {
  const values = [
    { emoji: "🌱", title: "Farm-first philosophy", desc: "Every product is sourced directly from verified farmers. No wholesalers, no cold storage chains — just fresh produce from field to doorstep." },
    { emoji: "💸", title: "Fair prices for farmers", desc: "Farmers set their own prices and keep up to 90% of every sale. We believe the people growing your food deserve to be paid fairly." },
    { emoji: "⚡", title: "48-hour delivery", desc: "Produce is harvested on demand and delivered within 48 hours. You get fresher food; farmers avoid waste." },
    { emoji: "🤝", title: "Community rooted", desc: "We partner with farming cooperatives across India to bring regional specialties to your table while supporting rural livelihoods." },
  ];
  const team = [
    { name: "Priya Nair", role: "Co-founder & CEO", emoji: "👩‍💼", location: "Mumbai" },
    { name: "Karan Mehta", role: "Co-founder & CTO", emoji: "👨‍💻", location: "Bengaluru" },
    { name: "Anita Sharma", role: "Head of Farmer Relations", emoji: "👩‍🌾", location: "Pune" },
  ];
  return (
    <div style={{ padding: "0 0 3rem" }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.green900} 0%, ${theme.green800} 100%)`, padding: "3rem 2rem", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: theme.green600, marginBottom: 12, fontWeight: 500 }}>Our story</div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36, color: theme.green200, lineHeight: 1.2, margin: "0 auto 16px", maxWidth: 520 }}>
          Reconnecting farms <em style={{ color: theme.amber400, fontStyle: "italic" }}>with families</em>
        </h1>
        <p style={{ fontSize: 15, color: theme.green600, lineHeight: 1.8, maxWidth: 480, margin: "0 auto 28px" }}>
          FarmDirect was founded in 2021 by two friends who couldn't find truly fresh produce in the city — and decided to fix that by going straight to the source.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {[["1,200+", "Partner farmers"], ["38", "States covered"], ["4.8★", "Avg. rating"]].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 500, color: theme.amber400 }}>{val}</div>
              <div style={{ fontSize: 12, color: theme.green600, marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "2.5rem 2rem" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: theme.green900, margin: "0 0 20px", textAlign: "center" }}>What we stand for</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, maxWidth: 900, margin: "0 auto" }}>
          {values.map((v) => (
            <div key={v.title} style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 14, padding: "1.5rem" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{v.emoji}</div>
              <div style={{ fontWeight: 500, fontSize: 15, color: theme.green900, marginBottom: 8 }}>{v.title}</div>
              <div style={{ fontSize: 13, color: theme.gray500, lineHeight: 1.7 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 2rem 1rem", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: theme.green900, margin: "0 0 20px", textAlign: "center" }}>The team</h2>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          {team.map((t) => (
            <div key={t.name} style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 14, padding: "1.5rem", textAlign: "center", minWidth: 180 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: theme.green100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 12px" }}>{t.emoji}</div>
              <div style={{ fontWeight: 500, fontSize: 15 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: theme.green700, marginTop: 4 }}>{t.role}</div>
              <div style={{ fontSize: 11, color: theme.gray500, marginTop: 3 }}>📍 {t.location}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ margin: "2rem 2rem 0", background: theme.green100, borderRadius: 14, padding: "2rem", textAlign: "center" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: theme.green900, marginBottom: 8 }}>Ready to eat fresher?</div>
        <div style={{ fontSize: 14, color: theme.green800, marginBottom: 20 }}>Join thousands of families already buying direct from farms.</div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setActiveTab("products")} style={{ background: theme.green700, border: "none", borderRadius: 8, padding: "11px 24px", fontSize: 14, cursor: "pointer", color: theme.green100, fontFamily: "inherit", fontWeight: 500 }}>
            Shop now →
          </button>
          <button onClick={() => setActiveTab("farmers")} style={{ background: "transparent", border: `1.5px solid ${theme.green700}`, borderRadius: 8, padding: "11px 24px", fontSize: 14, cursor: "pointer", color: theme.green700, fontFamily: "inherit" }}>
            Meet our farmers
          </button>
        </div>
      </div>
    </div>
  );
}

function FarmerDashboard() {
  const [listings] = useState([
    { id: 1, name: "Alphonso Mangoes", price: 180, unit: "kg", stock: 200, orders: 12, emoji: "🥭" },
    { id: 2, name: "Organic Carrots", price: 40, unit: "500g", stock: 80, orders: 5, emoji: "🥕" },
  ]);

  return (
    <div style={{ padding: "1.5rem 2rem" }}>
      <div style={{ background: theme.green900, borderRadius: 14, padding: "1.5rem", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: theme.green200 }}>Welcome, Ramesh Patil 👨‍🌾</div>
          <div style={{ fontSize: 13, color: theme.green600, marginTop: 4 }}>Nashik, Maharashtra · Active seller</div>
        </div>
        <button style={{ background: theme.green200, border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, cursor: "pointer", color: theme.green900, fontFamily: "inherit", fontWeight: 500 }}>
          + Add listing
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
        {[["₹6,840", "This month"], ["17", "Orders"], ["2", "Listings"], ["4.9 ⭐", "Rating"]].map(([val, lbl]) => (
          <div key={lbl} style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 12, padding: "1rem" }}>
            <div style={{ fontSize: 22, fontWeight: 500, color: theme.green700 }}>{val}</div>
            <div style={{ fontSize: 12, color: theme.gray500, marginTop: 4 }}>{lbl}</div>
          </div>
        ))}
      </div>
      <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, color: theme.green900, margin: "0 0 14px" }}>Your listings</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {listings.map((l) => (
          <div key={l.id} style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 50, height: 50, background: theme.green100, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{l.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{l.name}</div>
              <div style={{ fontSize: 12, color: theme.gray500, marginTop: 2 }}>₹{l.price}/{l.unit} · {l.stock}kg in stock</div>
            </div>
            <div style={{ fontSize: 13, color: theme.green700, fontWeight: 500 }}>{l.orders} orders</div>
            <button style={{ background: theme.green100, border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 12, cursor: "pointer", color: theme.green700, fontFamily: "inherit" }}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}