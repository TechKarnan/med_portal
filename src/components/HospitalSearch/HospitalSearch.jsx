import { useState, useEffect, useCallback } from "react";
import "./hospitalSearch.css";

const SPECIALIZATIONS = [
  "",
  "Cardiology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "General Surgery",
  "Gynecology",
  "Emergency Medicine",
];

const BASE_URL = "https://med-backend-r8bj.onrender.com";

const IMPORTANT_CITIES = [
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Delhi", lat: 28.7041, lng: 77.1025 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { name: "Surat", lat: 21.1702, lng: 72.8311 },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
  { name: "Kanpur", lat: 26.4499, lng: 80.3319 },
  { name: "Nagpur", lat: 21.1458, lng: 79.0882 },
  { name: "Indore", lat: 22.7196, lng: 75.8577 },
  { name: "Thane", lat: 19.2183, lng: 72.9781 },
  { name: "Bhopal", lat: 23.2599, lng: 77.4126 },
  { name: "Visakhapatnam", lat: 17.6868, lng: 83.2185 },
  { name: "Pimpri-Chinchwad", lat: 18.6298, lng: 73.7997 },
  { name: "Patna", lat: 25.5941, lng: 85.1376 },
  { name: "Vadodara", lat: 22.3072, lng: 73.1812 },
];

const DEFAULT_FILTERS = {
  specialization: "",
};

export default function HospitalSearch() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [locationStatus, setLocationStatus] = useState("loading");
  const [hospitals, setHospitals] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState({ loading: false, error: "", message: "" });

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const findNearestCity = useCallback((lat, lng) => {
    let nearestCity = IMPORTANT_CITIES[0];
    let minDistance = Infinity;

    for (const city of IMPORTANT_CITIES) {
      const distance = calculateDistance(lat, lng, city.lat, city.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city;
      }
    }

    return nearestCity;
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setUserCoordinates({ lat: userLat, lng: userLng });

          const nearestCity = findNearestCity(userLat, userLng);
          const distanceToNearestCity = calculateDistance(
            userLat,
            userLng,
            nearestCity.lat,
            nearestCity.lng
          );

          if (distanceToNearestCity > 50) {
            setSelectedCity("Current Location");
          } else {
            setSelectedCity(nearestCity.name);
          }

          setLocationStatus("granted");
        },
        () => {
          setLocationStatus("denied");
        }
      );
    } else {
      setLocationStatus("error");
    }
  }, [findNearestCity]);

  const getSelectedCityCoordinates = () => {
    if (selectedCity === "Current Location" && userCoordinates) {
      return userCoordinates;
    }

    const city = IMPORTANT_CITIES.find((c) => c.name === selectedCity);
    return city
      ? { lat: city.lat, lng: city.lng }
      : { lat: 12.9716, lng: 77.5946 };
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (event) => {
    const cityName = event.target.value;
    setSelectedCity(cityName);
    setCurrentPage(1);
  };

  const fetchHospitals = async (page = 1) => {
    const cityCoords = getSelectedCityCoordinates();

    setStatus({ loading: true, error: "", message: "" });

    try {
      const params = new URLSearchParams();
      if (filters.specialization.trim()) {
        params.append("specialization", filters.specialization.trim());
      }
      params.append("lat", cityCoords.lat.toString());
      params.append("lng", cityCoords.lng.toString());
      params.append("page", page.toString());
      params.append("limit", "10");

      const response = await fetch(`${BASE_URL}/api/hospitals?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Network error while fetching hospitals");
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Unable to fetch hospitals");
      }

      setHospitals(data.data || []);
      setPagination(data.pagination || null);
      setCurrentPage(page);
      setStatus({
        loading: false,
        error: "",
        message: data.data?.length
          ? `Found ${data.pagination?.total || data.data.length} hospital${(data.pagination?.total || data.data.length) === 1 ? "" : "s"} near ${selectedCity}.`
          : "No hospitals found for those filters.",
      });
    } catch (error) {
      setStatus({
        loading: false,
        error: error.message || "Unable to fetch hospitals.",
        message: "",
      });
      setHospitals([]);
      setPagination(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCurrentPage(1);
    await fetchHospitals(1);
  };

  return (
    <section className="hospital-search-section">
      <div className="hospital-search-card">
        <div className="hospital-search-top">
          <div>
            <h2>Find nearby hospitals in India</h2>
            <p>
              Search hospitals by specialization near your current location using free open data. Results show real hospital locations with distance information.
            </p>
          </div>
        </div>

        <form className="hospital-search-form" onSubmit={handleSubmit}>
          <label className="hospital-search-field">
            <span>Specialization</span>
            <select name="specialization" value={filters.specialization} onChange={handleChange}>
              {SPECIALIZATIONS.map((item) => (
                <option key={item} value={item}>
                  {item === "" ? "All specializations" : item}
                </option>
              ))}
            </select>
          </label>

          <label className="hospital-search-field">
            <span>City</span>
            <select name="city" value={selectedCity} onChange={handleCityChange}>
              {userCoordinates && (
                <option key="current-location" value="Current Location">
                  📍 Current Location
                </option>
              )}
              {IMPORTANT_CITIES.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>

          <div className="hospital-search-field">
            <span>Location Detection</span>
            <div className="location-status">
              {locationStatus === "loading" && <span className="status-loading">Detecting your location...</span>}
              {locationStatus === "granted" && <span className="status-granted">✓ Auto-detected: {selectedCity}</span>}
              {locationStatus === "denied" && <span className="status-denied">⚠ Using default city: {selectedCity}</span>}
              {locationStatus === "error" && <span className="status-error">⚠ Using default city: {selectedCity}</span>}
            </div>
          </div>

          <button type="submit" className="btn-primary hospital-search-button" disabled={status.loading}>
            {status.loading ? "Searching..." : "Find nearby hospitals"}
          </button>
        </form>

        <div className="hospital-search-feedback">
          {status.error && <p className="error-text">{status.error}</p>}
          {!status.error && status.message && <p className="success-text">{status.message}</p>}
          {!status.error && !status.message && !status.loading && (
            <p className="info-text">💡 Using free OpenStreetMap data for accurate hospital locations</p>
          )}
        </div>

        <div className="hospital-search-results">
          {status.loading && (
            <div className="hospital-loading">
              <div className="loading-spinner">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#E5E7EB" strokeWidth="2"/>
                  <path d="M12 2C13.1046 2 14 2.89543 14 4V8C14 9.10457 13.1046 10 12 10C10.8954 10 10 9.10457 10 8V4C10 2.89543 10.8954 2 12 2Z" fill="#3B82F6">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                  </path>
                </svg>
              </div>
              <p>Finding hospitals near {selectedCity}...</p>
            </div>
          )}

          {!status.loading && hospitals.map((hospital) => (
            <article key={hospital.id || `${hospital.name}-${hospital.city}`} className="hospital-card">
              <div className="hospital-photo">
                <img src="/hospital.jpg" alt={hospital.name} />
              </div>

              <div className="hospital-card-body">
                <h3>{hospital.name}</h3>
                <p className="hospital-meta">{hospital.specialization} · {hospital.city}</p>
                <p>{hospital.address}</p>
                {hospital.distance && <p className="hospital-distance">📍 {hospital.distance.toFixed(1)} km away</p>}
                {hospital.rating && <p className="hospital-rating">⭐ {hospital.rating.toFixed(1)}</p>}
                {hospital.phone && <p className="hospital-phone">📞 {hospital.phone}</p>}
                {hospital.source && (
                  <p className="hospital-source">
                    Source: {hospital.source === 'openstreetmap' ? 'OpenStreetMap (Free)' : hospital.source}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="hospital-pagination">
            <div className="pagination-info">
              <span>
                Showing {((currentPage - 1) * pagination.limit) + 1} to {Math.min(currentPage * pagination.limit, pagination.total)} of {pagination.total} hospitals
              </span>
            </div>

            <div className="pagination-controls">
              <button
                className="pagination-btn"
                onClick={() => fetchHospitals(currentPage - 1)}
                disabled={!pagination.hasPrev || status.loading}
              >
                ← Previous
              </button>

              <div className="pagination-pages">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, currentPage - 2)) + i;
                  if (pageNum > pagination.totalPages) return null;
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-page ${pageNum === currentPage ? 'active' : ''}`}
                      onClick={() => fetchHospitals(pageNum)}
                      disabled={status.loading}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn"
                onClick={() => fetchHospitals(currentPage + 1)}
                disabled={!pagination.hasNext || status.loading}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}