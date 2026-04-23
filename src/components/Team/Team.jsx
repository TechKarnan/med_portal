import "./team.css";

export default function Team() {
  return (
    <section className="team container">
      <div className="team-card">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="profile"
        />

        <div className="team-info">
          <h3>Start your next project with Minte Space</h3>
          <p>Work with a creative team to design and build your product.</p>

          <button className="btn-primary">Get Started</button>
        </div>
      </div>
    </section>
  );
}