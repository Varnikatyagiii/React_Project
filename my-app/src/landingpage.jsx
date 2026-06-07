import { useState, useEffect } from "react";

export default function LandingPage({ onGetStarted }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: "1,200+", label: "Farmers" },
    { value: "48hr", label: "Delivery" },
    { value: "Zero", label: "Middlemen" },
    { value: "38", label: "States" },
  ];

  const steps = [
    { emoji: "📝", title: "Register", desc: "Sign up as a farmer or consumer in minutes" },
    { emoji: "🛒", title: "Browse & Order", desc: "Explore fresh produce directly from local farms" },
    { emoji: "🚚", title: "Track Delivery", desc: "Real-time updates from harvest to your doorstep" },
    { emoji: "✅", title: "Enjoy Fresh", desc: "Receive farm-fresh produce within 48 hours" },
  ];

  const features = [
    { emoji: "🌾", title: "Farm Fresh Guarantee", desc: "Every product is harvested within 24 hours of your order. No cold storage, no delays." },
    { emoji: "💰", title: "Fair Farmer Prices", desc: "Farmers keep 90% of every sale. We believe the people growing your food deserve fair pay." },
    { emoji: "📦", title: "Order Tracking", desc: "Track every order from Ordered → Harvested → Dispatched → Delivered in real time." },
    { emoji: "🔒", title: "Secure Payments", desc: "End-to-end encrypted transactions. Your payment is safe and protected." },
    { emoji: "👨‍🌾", title: "Verified Farmers", desc: "Every farmer is verified by our team before listing. Quality you can trust." },
    { emoji: "♻️", title: "Zero Waste", desc: "Produce is harvested on demand — reducing food waste across the supply chain." },
  ];

  const testimonials = [
    { name: "Ramesh Patil", role: "Mango Farmer, Nashik", text: "Before FarmDirect I was selling mangoes for ₹5/kg to traders. Now I get ₹15/kg directly. My income tripled in one season.", emoji: "👨‍🌾" },
    { name: "Priya Sharma", role: "Consumer, Mumbai", text: "The spinach I get from FarmDirect is so fresh it lasts 5 days in my fridge. Supermarket spinach used to wilt in 2 days!", emoji: "👩" },
    { name: "Sunita Devi", role: "Apple Farmer, Shimla", text: "I never knew how to reach city customers. FarmDirect gave me a platform and now I have 200+ regular buyers.", emoji: "👩‍🌾" },
  ];

  const theme = {
    green900: "#173404", green800: "#27500A", green700: "#3B6D11",
    green600: "#639922", green200: "#C0DD97", green100: "#EAF3DE",
    amber100: "#FAEEDA", amber400: "#EF9F27",
    white: "#ffffff", gray50: "#F8F7F4", gray100: "#F1EFE8",
    gray200: "#D3D1C7", gray500: "#888780", gray800: "#444441",
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: theme.gray50, color: theme.gray800, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .hero-text { animation: fadeUp 0.8s ease forwards; }
        .hero-card { animation: float 3s ease-in-out infinite; }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        .feature-card { transition: all 0.2s ease; }
        .step-card:hover { background: #EAF3DE; }
        .step-card { transition: background 0.2s ease; }
        .cta-btn:hover { background: #27500A; transform: translateY(-2px); }
        .cta-btn { transition: all 0.2s ease; }
        .outline-btn:hover { background: #EAF3DE; }
        .outline-btn { transition: all 0.2s ease; }
      `}</style>

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? `1px solid ${theme.gray200}` : "none",
        padding: "0 2rem", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.3s ease",
      }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: theme.green700, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 18, height: 18, background: theme.green700, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)" }} />
          FarmDirect
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14 }}>
          {["How it works", "Features", "Farmers"].map((item) => (
            <span key={item} style={{ cursor: "pointer", color: theme.gray500, fontWeight: 400 }}>{item}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onGetStarted} className="outline-btn" style={{ background: "transparent", border: `1.5px solid ${theme.green700}`, borderRadius: 8, padding: "8px 20px", fontSize: 13, cursor: "pointer", color: theme.green700, fontFamily: "inherit", fontWeight: 500 }}>Login</button>
          <button onClick={onGetStarted} className="cta-btn" style={{ background: theme.green700, border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, cursor: "pointer", color: theme.white, fontFamily: "inherit", fontWeight: 500 }}>Get Started →</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${theme.green100} 0%, #f0f7e6 60%, ${theme.amber100} 100%)`, padding: "5rem 2rem 4rem", display: "flex", gap: "3rem", alignItems: "center", justifyContent: "center", flexWrap: "wrap", minHeight: "90vh" }}>
        <div className="hero-text" style={{ flex: 1, minWidth: 300, maxWidth: 520 }}>
          <div style={{ display: "inline-block", background: theme.green200, color: theme.green800, fontSize: 12, fontWeight: 500, padding: "5px 14px", borderRadius: 20, marginBottom: 20 }}>
            🌿 100% Farm-fresh · Zero Middlemen
          </div>
          <h1 style={{ fontFamily: "Georgia, 'DM Serif Display', serif", fontSize: 52, color: theme.green900, lineHeight: 1.1, marginBottom: 20 }}>
            Farm fresh,{" "}
            <em style={{ color: theme.green700, fontStyle: "italic" }}>direct to you</em>
          </h1>
          <p style={{ fontSize: 17, color: theme.green800, lineHeight: 1.8, marginBottom: 32, maxWidth: 420 }}>
            Skip the middlemen. Order straight from local farmers — harvested today, delivered to your door in 48 hours.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
            <button onClick={onGetStarted} className="cta-btn" style={{ background: theme.green700, border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, cursor: "pointer", color: theme.white, fontFamily: "inherit", fontWeight: 500 }}>
              Shop now →
            </button>
            <button onClick={onGetStarted} className="outline-btn" style={{ background: "transparent", border: `1.5px solid ${theme.green700}`, borderRadius: 10, padding: "14px 28px", fontSize: 15, cursor: "pointer", color: theme.green700, fontFamily: "inherit" }}>
              I'm a farmer
            </button>
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontSize: 26, fontWeight: 500, color: theme.green700 }}>{value}</div>
                <div style={{ fontSize: 12, color: theme.green800, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Card */}
        <div className="hero-card" style={{ background: theme.white, borderRadius: 20, border: `1px solid ${theme.green200}`, padding: "1.5rem", width: 260, boxShadow: "0 20px 60px rgba(59,109,17,0.12)", flexShrink: 0 }}>
          <div style={{ fontSize: 11, background: theme.green100, color: theme.green700, padding: "4px 12px", borderRadius: 20, display: "inline-block", marginBottom: 12, fontWeight: 500 }}>Just harvested 🌾</div>
          <div style={{ height: 120, background: theme.amber100, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60, marginBottom: 14 }}>🥭</div>
          <div style={{ fontWeight: 500, fontSize: 16 }}>Alphonso Mangoes</div>
          <div style={{ fontSize: 12, color: theme.gray500, marginTop: 4 }}>Ramesh Patil Farm · Nashik</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 500, color: theme.green700 }}>₹180</div>
              <div style={{ fontSize: 11, color: theme.gray500 }}>per kg</div>
            </div>
            <button onClick={onGetStarted} style={{ background: theme.green700, border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", color: theme.white, fontFamily: "inherit", fontWeight: 500 }}>Add to cart</button>
          </div>
          <div style={{ marginTop: 14, padding: "10px 12px", background: theme.green100, borderRadius: 10, fontSize: 12, color: theme.green800 }}>
            🚚 Delivered within 48 hours
          </div>
        </div>
      </div>

      {/* Problem Banner */}
      <div style={{ background: theme.green900, padding: "3rem 2rem", textAlign: "center" }}>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 22, color: theme.green200, maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>
          "A farmer sells tomatoes for <span style={{ color: theme.amber400 }}>₹5/kg</span>. You buy them at <span style={{ color: theme.amber400 }}>₹40/kg</span>. That ₹35 goes to middlemen. <em>We're here to fix that.</em>"
        </p>
      </div>

      {/* How it works */}
      <div style={{ padding: "4rem 2rem", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 12, color: theme.green700, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Simple Process</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 34, color: theme.green900 }}>How FarmDirect works</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {steps.map((step, i) => (
            <div key={i} className="step-card" style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 16, padding: "1.5rem", textAlign: "center", cursor: "default" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{step.emoji}</div>
              <div style={{ fontWeight: 500, fontSize: 15, color: theme.green900, marginBottom: 8 }}>{step.title}</div>
              <div style={{ fontSize: 13, color: theme.gray500, lineHeight: 1.6 }}>{step.desc}</div>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: theme.green100, color: theme.green700, fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", margin: "14px auto 0" }}>{i + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ background: theme.gray100, padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 12, color: theme.green700, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Why choose us</div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 34, color: theme.green900 }}>Built for farmers and families</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card" style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 16, padding: "1.5rem", cursor: "default" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{f.emoji}</div>
                <div style={{ fontWeight: 500, fontSize: 15, color: theme.green900, marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: theme.gray500, lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: "4rem 2rem", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 12, color: theme.green700, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Real Stories</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 34, color: theme.green900, marginBottom: 40 }}>What people are saying</h2>
        <div style={{ background: theme.white, border: `1px solid ${theme.gray200}`, borderRadius: 20, padding: "2rem", minHeight: 200 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{testimonials[activeTestimonial].emoji}</div>
          <p style={{ fontSize: 16, color: theme.gray800, lineHeight: 1.8, marginBottom: 20, fontStyle: "italic" }}>
            "{testimonials[activeTestimonial].text}"
          </p>
          <div style={{ fontWeight: 500, fontSize: 14, color: theme.green700 }}>{testimonials[activeTestimonial].name}</div>
          <div style={{ fontSize: 12, color: theme.gray500, marginTop: 4 }}>{testimonials[activeTestimonial].role}</div>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
          {testimonials.map((_, i) => (
            <div key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 24 : 8, height: 8, borderRadius: 4, background: i === activeTestimonial ? theme.green700 : theme.gray200, cursor: "pointer", transition: "all 0.3s ease" }} />
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div style={{ background: theme.green100, padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 34, color: theme.green900, marginBottom: 40 }}>The FarmDirect difference</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#fff5f5", border: "1px solid #f7c1c1", borderRadius: 16, padding: "1.5rem" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#a32d2d", marginBottom: 16 }}>❌ Without FarmDirect</div>
              {[["Farmer earns", "₹5/kg"], ["Consumer pays", "₹40/kg"], ["Days in storage", "5-7 days"], ["Middlemen involved", "4-5 people"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "8px 0", borderBottom: "1px solid #fceaea" }}>
                  <span style={{ color: theme.gray500 }}>{k}</span>
                  <span style={{ fontWeight: 500, color: "#a32d2d" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: theme.green100, border: `1px solid ${theme.green200}`, borderRadius: 16, padding: "1.5rem" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: theme.green700, marginBottom: 16 }}>✅ With FarmDirect</div>
              {[["Farmer earns", "₹15/kg"], ["Consumer pays", "₹20/kg"], ["Days in storage", "0 days"], ["Middlemen involved", "Zero"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "8px 0", borderBottom: `1px solid ${theme.green200}` }}>
                  <span style={{ color: theme.gray500 }}>{k}</span>
                  <span style={{ fontWeight: 500, color: theme.green700 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: `linear-gradient(135deg, ${theme.green800} 0%, ${theme.green900} 100%)`, padding: "5rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 38, color: theme.green200, marginBottom: 16 }}>
          Ready to eat <em style={{ color: theme.amber400 }}>fresher</em>?
        </h2>
        <p style={{ fontSize: 16, color: theme.green600, marginBottom: 32, maxWidth: 400, margin: "0 auto 32px" }}>
          Join 1,200+ farmers and thousands of families already using FarmDirect.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onGetStarted} className="cta-btn" style={{ background: theme.green200, border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 15, cursor: "pointer", color: theme.green900, fontFamily: "inherit", fontWeight: 500 }}>
            Shop fresh produce →
          </button>
          <button onClick={onGetStarted} className="outline-btn" style={{ background: "transparent", border: `1.5px solid ${theme.green600}`, borderRadius: 10, padding: "14px 32px", fontSize: 15, cursor: "pointer", color: theme.green200, fontFamily: "inherit" }}>
            Join as a farmer
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: theme.green900, padding: "2rem", textAlign: "center", borderTop: `1px solid ${theme.green800}` }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 18, color: theme.green600, marginBottom: 8 }}>🌿 FarmDirect</div>
        <div style={{ fontSize: 12, color: theme.green700 }}>Connecting farms to families · Made with ❤️ by Team FarmDirect</div>
      </div>
    </div>
  );
}