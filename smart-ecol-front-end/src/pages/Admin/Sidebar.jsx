import React from 'react';
import { NavLink } from "react-router-dom";
import './css/dashboard.css';


const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">SmartEco</h2>
            <nav>
                <ul className="sidebar-nav">
                        <li>
                            <NavLink to="/admin/dashboard">Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/classes">Classes</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/matieres">Matières</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/emploi">Gestion d'emploi du temps</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/eleve">Élèves</NavLink>
                        </li>   
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;