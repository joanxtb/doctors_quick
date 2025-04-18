import { Outlet } from 'react-router-dom';
//           ^ hook to get paramaters from the url
import { NavLink } from 'react-router';
import BlackOverlay from '../components/globals/black_overlay';

const Layout = () => {
    return (<section className="w3-container pattern">
        <BlackOverlay />
        <div className="w3-content" style={{ overflowY: 'auto', zIndex: 1, position: 'relative' }}>
            {/* {isNavigating && <GlobalSpinner /> */}
            <nav className="d-flex justify-content-start py-4 white gap-3" role="navigation">
                <NavLink to="/" className={({ isActive }) => isActive ? "white" : "whiteish"}>Home</NavLink>
                <NavLink to="/bookings" className={({ isActive }) => isActive ? "white" : "whiteish"}>Bookings</NavLink>
            </nav>
            <Outlet />
            {/* ^ this is where the children routes are gonna be rendered */}
            <div className="white text-center font-6 btn-block my-4">©TryCatch Solutions 2024. Powered by Freddy Torres. All rights reserved.</div>
        </div>
    </section>)
}

export default Layout;