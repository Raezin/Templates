import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, InView } from "../utils/animations";

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    occasion: "",
    requests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div style={{ paddingTop: 72 }}>
      <section
        style={{
          background: "var(--charcoal)",
          padding: "5rem clamp(1rem,7vw,7rem) 4rem",
        }}
      >
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="section-label"
            style={{ color: "var(--gold-light)" }}
          >
            Book a Table
          </motion.p>
          <motion.div variants={fadeUp} className="divider" />
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(2rem,6vw,4rem)",
              fontWeight: 700,
              color: "var(--cream)",
            }}
          >
            Reservations
          </motion.h1>
          <motion.p
            variants={fadeUp}
            style={{
              color: "rgba(247,243,238,.4)",
              maxWidth: 440,
              marginTop: "1rem",
              lineHeight: 1.85,
            }}
          >
            Reserve your table and let us prepare an exceptional evening for
            you.
          </motion.p>
        </motion.div>
      </section>

      <section
        style={{
          padding: "5rem clamp(1rem,7vw,7rem)",
          background: "var(--ivory)",
        }}
      >
        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "4rem",
            maxWidth: 1060,
            margin: "0 auto",
            alignItems: "start",
          }}
        >
          <InView>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: "3rem",
                  border: "1px solid var(--gold)",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "2rem", color: "var(--gold)" }}>
                  ✓
                </span>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    margin: "1rem 0 .5rem",
                  }}
                >
                  Reservation Received
                </h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                  Thank you, {form.name}. We'll confirm at {form.email} within
                  24 hours.
                </p>
              </motion.div>
            ) : (
              <div>
                <h2
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    marginBottom: "2rem",
                  }}
                >
                  Your Details
                </h2>
                <div
                  className="form-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  {[
                    { k: "name", label: "Full Name", type: "text", ph: "Your name" },
                    {
                      k: "email",
                      label: "Email",
                      type: "email",
                      ph: "your@email.com",
                    },
                    {
                      k: "phone",
                      label: "Phone",
                      type: "tel",
                      ph: "+92 300 0000000",
                    },
                    { k: "date", label: "Date", type: "date", ph: "" },
                  ].map((f) => (
                    <div key={f.k}>
                      <label
                        style={{
                          fontSize: ".67rem",
                          letterSpacing: ".12em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          display: "block",
                          marginBottom: 7,
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        className="input-field"
                        placeholder={f.ph}
                        value={form[f.k]}
                        onChange={upd(f.k)}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      style={{
                        fontSize: ".67rem",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        display: "block",
                        marginBottom: 7,
                      }}
                    >
                      Preferred Time
                    </label>
                    <select
                      className="input-field"
                      value={form.time}
                      onChange={upd("time")}
                    >
                      <option value="">Select time</option>
                      {[
                        "12:00 PM",
                        "12:30 PM",
                        "1:00 PM",
                        "7:00 PM",
                        "7:30 PM",
                        "8:00 PM",
                        "8:30 PM",
                        "9:00 PM",
                        "9:30 PM",
                      ].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: ".67rem",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        display: "block",
                        marginBottom: 7,
                      }}
                    >
                      Guests
                    </label>
                    <select
                      className="input-field"
                      value={form.guests}
                      onChange={upd("guests")}
                    >
                      <option value="">Number of guests</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n}>
                          {n} {n === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ gridColumn: "1/-1" }}>
                    <label
                      style={{
                        fontSize: ".67rem",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        display: "block",
                        marginBottom: 7,
                      }}
                    >
                      Occasion
                    </label>
                    <select
                      className="input-field"
                      value={form.occasion}
                      onChange={upd("occasion")}
                    >
                      <option value="">None</option>
                      {[
                        "Birthday",
                        "Anniversary",
                        "Business Dinner",
                        "Family Gathering",
                        "Date Night",
                        "Other",
                      ].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ gridColumn: "1/-1" }}>
                    <label
                      style={{
                        fontSize: ".67rem",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        display: "block",
                        marginBottom: 7,
                      }}
                    >
                      Special Requests
                    </label>
                    <textarea
                      className="input-field"
                      rows={4}
                      placeholder="Dietary requirements, seating preferences..."
                      value={form.requests}
                      onChange={upd("requests")}
                      style={{ resize: "vertical" }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setSubmitted(true)}
                  style={{
                    marginTop: "1.5rem",
                    padding: "14px 38px",
                    background: "var(--charcoal)",
                    border: "none",
                    color: "var(--cream)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: ".77rem",
                    letterSpacing: ".13em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Request Reservation
                </button>
              </div>
            )}
          </InView>

          <InView delay={0.2}>
            <div
              style={{
                background: "var(--cream)",
                border: "1px solid var(--border)",
                borderTop: "2px solid var(--gold)",
                padding: "2.25rem",
              }}
            >
              <h3
                style={{
                  fontSize: ".9rem",
                  fontWeight: 600,
                  marginBottom: "1.4rem",
                }}
              >
                Reservation Info
              </h3>
              {[
                { label: "Lunch", value: "12:00 PM – 3:00 PM" },
                { label: "Dinner", value: "7:00 PM – 11:00 PM" },
                { label: "Days", value: "Monday – Sunday" },
                { label: "Phone", value: "+92 42 3500 0000" },
                { label: "Email", value: "reservations@wokin.pk" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: ".75rem 0",
                    borderBottom: "1px solid var(--border)",
                    gap: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: ".7rem",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: ".07em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontSize: ".82rem",
                      fontWeight: 500,
                      textAlign: "right",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
              <p
                style={{
                  marginTop: "1.25rem",
                  fontSize: ".74rem",
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  padding: ".9rem",
                  background: "var(--ivory)",
                  border: "1px solid var(--border)",
                }}
              >
                Reservations held 15 min past booking. For parties of 8+, call
                us directly.
              </p>
            </div>
          </InView>
        </div>
      </section>
    </div>
  );
}