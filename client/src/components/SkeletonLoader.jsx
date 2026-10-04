export function StayCardSkeleton() {
  return (
    <div className="card listing-card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-thumb" />
      <div className="card-body">
        <div className="row-between">
          <div className="skeleton skeleton-tag" />
          <div className="skeleton skeleton-rating" />
        </div>
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-location" />
        <div className="skeleton skeleton-price" />
      </div>
    </div>
  );
}

export function TripCardSkeleton() {
  return (
    <div className="card trip skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-trip-thumb" />
      <div className="grow" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="skeleton skeleton-title" style={{ width: '60%' }} />
        <div className="skeleton skeleton-location" style={{ width: '35%' }} />
        <div className="skeleton skeleton-text" style={{ width: '75%' }} />
      </div>
      <div className="trip-side">
        <div className="skeleton skeleton-badge" />
        <div className="skeleton skeleton-price" style={{ width: '70px' }} />
      </div>
    </div>
  );
}

export default function SkeletonLoader({ type = 'stay', count = 1 }) {
  const items = Array.from({ length: count });

  if (type === 'trip') {
    return (
      <div className="trip-list" aria-busy="true" aria-label="Loading trips">
        {items.map((_, i) => (
          <TripCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid" aria-busy="true" aria-label="Loading stays">
      {items.map((_, i) => (
        <StayCardSkeleton key={i} />
      ))}
    </div>
  );
}
