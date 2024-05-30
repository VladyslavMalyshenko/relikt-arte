import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function useNavbar() {
    const navbarRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const shouldBeScrolled =
                location.pathname !== "/" || window.scrollY > 0;
            if (navbarRef.current) {
                navbarRef.current.classList.toggle(
                    "scrolled",
                    shouldBeScrolled
                );
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [location.pathname]);

    return { navbarRef };
}

export default useNavbar;
