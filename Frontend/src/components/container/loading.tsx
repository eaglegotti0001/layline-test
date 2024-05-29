export default function Loading() {
  return (
    <div className="overlay">
      <div className="app-loading">
        <div className="logo">
          <svg className="spinner" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}
