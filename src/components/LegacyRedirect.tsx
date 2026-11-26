import { Navigate, useLocation } from 'react-router-dom';
import { getRedirectTarget } from '@/data/catalogue';

/**
 * Maps legacy pcsuk.co.uk product/category paths onto catalogue routes.
 */
export default function LegacyRedirect() {
  const location = useLocation();
  const target = getRedirectTarget(location.pathname);
  if (target) {
    return <Navigate to={`${target}${location.search}`} replace />;
  }
  return <Navigate to="/catalogue" replace />;
}
