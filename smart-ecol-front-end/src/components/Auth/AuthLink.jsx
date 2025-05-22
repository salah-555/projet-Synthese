import { Link } from 'react-router-dom';

const AuthLink = ({ type }) => {
  return (
    <p className="text-center mt-4 text-gray-600">
      {type === 'login' ? (
        <>
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Créer un compte
          </Link>
        </>
      ) : (
        <>
          Déjà un compte ?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Se connecter
          </Link>
        </>
      )}
    </p>
  );
};

export default AuthLink;