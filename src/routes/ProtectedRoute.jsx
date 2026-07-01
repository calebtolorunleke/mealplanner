const { user, loading } = useAuth();

if (loading) return <Spinner />;

return user ? children : <Navigate to="/login" replace />;
