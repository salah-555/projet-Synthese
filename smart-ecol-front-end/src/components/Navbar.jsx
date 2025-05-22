
import React, {useState, useEffect} from'react';
import {Menu, X} from "lucide-react";
import Logo from './Logo'
import NavLink from './NavLink'
import './Navbar.css';

const Navbar = ()  => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOopen, setIsMobileMenuOpen] = useState(false);


    useEffect (() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >  20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect (() => {
        document.body.style.overflow = isMobileMenuOopen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOopen]);

    return (
        <nav className={`navbar  ${isScrolled} ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                <Logo />

                {/* Desktop links */}
                <div className="nav-links">
                    <NavLink to="/courses" variant="default">Cours</NavLink>
                    <NavLink to="/about" variant="default">À propos</NavLink>
                    <NavLink to="/contact" variant="default">Contact</NavLink>
                    <div className="divider"></div>
                    <NavLink to="/login" variant="primary">Connexion</NavLink>
                    <NavLink to="/register" variant="secondary">Inscription</NavLink>
                </div>

                {/* Mobile menu button */}
                <button className="mobile-menu-button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOopen)}
                aria-label={isMobileMenuOopen ? "Fermer le menu": "Ouvrir le menu"}>
                    {isMobileMenuOopen ? <X size={24} /> : <Menu size={24} />}
                </button>
        </div>

          {/* Mobile menu */}
          {isMobileMenuOopen && (
             <div className="mobile-menu">
                <div className="mobile-nav-links">
                  <NavLink to="/courses" variant="default">Cours</NavLink>
                  <NavLink to="/about" variant="default">À propos</NavLink>
                  <NavLink to="/contact" variant="default">Contact</NavLink>
                  <div className="divider"></div>
                  <NavLink to="/login" variant="primary">Connexion</NavLink>
                  <NavLink to="/register" variant="secondary">Inscription</NavLink>
                </div>
            </div>

          )}

        </nav>
    )
}

export default Navbar;