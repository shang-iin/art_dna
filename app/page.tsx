export default function Home() {
  return (
    <main style={S.page}>
      <div style={S.container}>
        <section style={S.hero}>
          <div style={S.eyebrow}>ArtDNA · Europe</div>

          <h1 style={S.title}>
            发现你的
            <br />
            欧洲艺术人格
          </h1>

          <p style={S.subtitle}>
            通过 20 道问题，生成你的专属艺术气质档案，
            并一键保存属于你的 ArtDNA 海报。
          </p>

          <div style={S.actions}>
            <a href="/test" style={S.primaryLink}>
              开始测试
            </a>
          </div>
        </section>

        <section style={S.grid}>
          <div style={S.card}>
            <div style={S.cardNumber}>01</div>
            <h2 style={S.cardTitle}>20 道专为你定制的偏好问题</h2>
            <p style={S.cardText}>
              从旅行、审美、艺术偏好与城市感知出发，
              判断你的艺术气质倾向。
            </p>
          </div>

          <div style={S.card}>
            <div style={S.cardNumber}>02</div>
            <h2 style={S.cardTitle}>8 种欧洲艺术人格</h2>
            <p style={S.cardText}>
              巴黎、维也纳、佛罗伦萨、柏林、英国、巴塞罗那、
              冰岛、希腊 —— 对应不同的艺术精神。
            </p>
          </div>

          <div style={S.card}>
            <div style={S.cardNumber}>03</div>
            <h2 style={S.cardTitle}>生成专属于你的艺术海报</h2>
            <p style={S.cardText}>
              测试结束后自动生成可保存的海报图片，
              适合分享到朋友圈、小红书与抖音。
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f3f3f3",
    padding: "40px 20px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: "#111",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },

  hero: {
    background: "#fff",
    borderRadius: "28px",
    padding: "64px 40px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  eyebrow: {
    fontSize: "13px",
    color: "#666",
    letterSpacing: "1px",
    marginBottom: "18px",
    textTransform: "uppercase",
  },

  title: {
    fontSize: "56px",
    lineHeight: 1.05,
    fontWeight: 900,
    margin: 0,
    letterSpacing: "-1px",
  },

  subtitle: {
    maxWidth: "700px",
    margin: "24px auto 0",
    fontSize: "18px",
    lineHeight: 1.8,
    color: "#555",
  },

  actions: {
    marginTop: "32px",
    display: "flex",
    justifyContent: "center",
  },

  primaryLink: {
    display: "inline-block",
    padding: "14px 28px",
    borderRadius: "14px",
    background: "#111",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "15px",
  },

  grid: {
    marginTop: "24px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "18px",
  },

  card: {
    background: "#fff",
    borderRadius: "22px",
    padding: "26px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  },

  cardNumber: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "16px",
    fontWeight: 700,
    letterSpacing: "1px",
  },

  cardTitle: {
    fontSize: "22px",
    margin: 0,
    marginBottom: "12px",
    fontWeight: 800,
  },

  cardText: {
    fontSize: "15px",
    lineHeight: 1.75,
    color: "#555",
    margin: 0,
  },
};