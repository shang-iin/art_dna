export default function Home() {
  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Art DNA</h1>
      <p style={styles.subtitle}>
        Discover your artistic personality
      </p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2>Art Personality Test</h2>
          <p>Find out your artistic DNA.</p>
          <button style={styles.button}>Start Test</button>
        </div>

        <div style={styles.card}>
          <h2>Art History Explorer</h2>
          <p>Explore artists and movements.</p>
          <button style={styles.button}>Explore</button>
        </div>

        <div style={styles.card}>
          <h2>Your Art Profile</h2>
          <p>See your personal art taste.</p>
          <button style={styles.button}>View Profile</button>
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center" as const,
    padding: "60px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh"
  },

  title: {
    fontSize: "48px",
    marginBottom: "10px"
  },

  subtitle: {
    fontSize: "20px",
    marginBottom: "40px",
    color: "#666"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    maxWidth: "900px",
    margin: "0 auto"
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  button: {
    marginTop: "15px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "black",
    color: "white",
    cursor: "pointer",
    fontSize: "16px"
  }
};