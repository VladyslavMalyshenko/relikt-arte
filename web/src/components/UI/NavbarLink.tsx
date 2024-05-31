import { Children, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/components/Navbar.scss";

type NavbarLinkProps = {
    text?: string;
    children?: any;
    to: string;
    activeLocations?: string[];
};

const NavbarLink = ({
    text,
    children,
    to,
    activeLocations,
}: NavbarLinkProps) => {
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const isActive =
            location.pathname === to ||
            (activeLocations?.some(
                (locationPath) => locationPath === location.pathname
            ) ??
                false);

        setIsActive(isActive);
    }, [location.pathname, to, activeLocations, setIsActive]);

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
