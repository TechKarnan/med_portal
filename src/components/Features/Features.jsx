import "./features.css";

export default function Features() {
  return (
    <section className="features container">

      <div className="feature-block">
        <div className="feature-text">
          <h2>Fastest way to launch your ideas</h2>
          <p>
            Build, design and ship your product faster with an all-in-one platform.
          </p>
        </div>

        <img
          className="feature-img"
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a"
          alt=""
        />
      </div>

      <div className="feature-block reverse">
        <div className="feature-text">
          <h2>Collaborate with your team</h2>
          <p>
            Work together in real-time and manage your workflow efficiently.
          </p>
        </div>

        <img
          className="feature-img"
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
          alt=""
        />
      </div>

      <div className="feature-block">
        <div className="feature-text">
          <h2>Scale without limits</h2>
          <p>
            Deploy globally and handle millions of users with ease.
          </p>
        </div>

        <img
          className="feature-img"
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
          alt=""
        />
      </div>

    </section>
  );
}