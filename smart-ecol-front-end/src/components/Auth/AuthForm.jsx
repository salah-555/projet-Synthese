const AuthForm = ({ type, onSubmit, children }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        {type === 'login' ? 'Connexion' : 'Inscription'}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          {type === 'login' ? 'Se connecter' : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;