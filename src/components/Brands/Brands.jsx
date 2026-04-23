import "./brands.css";

const logos = [
  "https://cdn.simpleicons.org/meta/1877F2",
  "https://cdn.simpleicons.org/appletv/FF0000",
  "https://cdn.simpleicons.org/netflix/E50914",
  "https://cdn.simpleicons.org/spotify/1DB954",
  "https://cdn.simpleicons.org/ebay/4A154B"
];

export default function Brands() {
  return (
    <section className="brands">
      <h3>Trusted by leading brands</h3>

      <div className="brands-wrapper">
        <div className="brands-track">
          {[...logos, ...logos].map((logo, i) => (
            <div className="brand-card" key={i}>
              <img src={logo} alt="brand" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}