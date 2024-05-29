import { Children, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/components/Navbar.scss";

type NavbarLinkProps = {
    text?: string;
    children?: any;
    to: string;
    activeClassName?: string;
};

const NavbarLink = ({ text, children, to }: NavbarLinkProps) => {
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const toSegment = to !== "/" ? `/${to}` : to;
        setIsActive(location.pathname === toSegment);
    }, [location.pathname, to]);

    return (
        <Link
            className={`${isActive ? "active " : ""}upper navbar-link`}
            to={to}
        >
            {text || Children.map(children, (child) => child)}
        </Link>
    );
};

export default NavbarLink;
