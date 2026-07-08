import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="screen notfound">
      <h1>Not found</h1>
      <p className="muted">That page isn’t part of the app.</p>
      <Link className="btn btn-primary" to="/">
        Back to Home
      </Link>
    </div>
  );
}
