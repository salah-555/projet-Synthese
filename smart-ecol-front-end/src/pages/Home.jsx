import Navbar from '../components/Navbar'

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="text-center py-20">
                    <h1 className="text-4xl font-bold text-blue-600 mb-6">
                        Bienvenue sur SmartEcol
                    </h1>
                    <p className="text-xl text-gray-600">
                        La plateforme éducative intelligente pour les écoles
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home;