import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { paths } from "../router/paths";
import "../styles/components/Navbar.scss";
import useNavbar from "../utils/useNavbar";
import CartModal from "./UI/CartModal";
import NavbarLink from "./UI/NavbarLink";

const Navbar = () => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const { navbarRef } = useNavbar();
    const buttonRef = useRef<HTMLDivElement>(null);
    const currentWidth = useSelector(
        (state: any) => state.ScreenPropertiesReducer.width
    );
    const isAuth = useSelector((state: any) => state.AuthReducer.auth);

    const handleNavbar = (remove?: boolean) => {
        const navbarRefClasslist = navbarRef?.current?.classList;
        const buttonRefClasslist = buttonRef?.current?.classList;

        if (navbarRefClasslist && buttonRefClasslist) {
            if (remove) {
                navbarRefClasslist.remove("active");
                buttonRefClasslist.remove("active");
                return;
            }

            navbarRefClasslist.toggle("active");
            buttonRefClasslist.toggle("active");
        }
    };

    return (
        <>
            {currentWidth <= 900 && (
                <div
                    className="navbar-button"
                    ref={buttonRef}
                    onClick={() => handleNavbar()}
                >
                    <svg
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 6H20M4 12H20M4 18H20"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            )}

            {isModalOpened && (
                <CartModal closeModal={() => setIsModalOpened(false)} />
            )}
            <nav ref={navbarRef}>
                <div className="navbar-category">
                    <Link
                        className="navbar-link-static"
                        onClick={() => handleNavbar(true)}
                        to="/"
                    >
                        <img src={Logo} alt="Logo" />
                    </Link>
                </div>
                <div className="navbar-category">
                    <NavbarLink
                        onClick={() => handleNavbar(true)}
                        to={paths.main}
                    >
                        Головна
                    </NavbarLink>

                    <NavbarLink
                        onClick={() => handleNavbar(true)}
                        to={paths.buy}
                    >
                        Продукція
                    </NavbarLink>

                    <NavbarLink
                        onClick={() => handleNavbar(true)}
                        to={paths.materials}
                    >
                        Матеріали
                    </NavbarLink>

                    <NavbarLink
                        onClick={() => handleNavbar(true)}
                        to={paths.contacts}
                    >
                        Контакти
                    </NavbarLink>
                </div>
                <div className="navbar-category">
                    <NavbarLink
                        onClick={() => handleNavbar(true)}
                        to={isAuth ? paths.profile : paths.register}
                        activeLocations={[
                            paths.profile,
                            paths.register,
                            paths.singIn,
                        ]}
                    >
                        <svg
                            width="18"
                            height="23"
                            viewBox="0 0 18 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.1663 5.80416C13.1663 8.10535 11.3009 9.97083 8.99967 9.97083V10.9708C11.8531 10.9708 14.1663 8.65763 14.1663 5.80416H13.1663ZM8.99967 9.97083C6.69849 9.97083 4.83301 8.10535 4.83301 5.80416H3.83301C3.83301 8.65763 6.1462 10.9708 8.99967 10.9708V9.97083ZM4.83301 5.80416C4.83301 3.50298 6.69849 1.6375 8.99967 1.6375V0.637497C6.1462 0.637497 3.83301 2.95069 3.83301 5.80416H4.83301ZM8.99967 1.6375C11.3009 1.6375 13.1663 3.50298 13.1663 5.80416H14.1663C14.1663 2.95069 11.8531 0.637497 8.99967 0.637497V1.6375ZM16.6663 18.0542C16.6663 18.8903 15.9755 19.7819 14.5508 20.4943C13.156 21.1917 11.194 21.6375 8.99967 21.6375V22.6375C11.3156 22.6375 13.4371 22.1692 14.998 21.3887C16.529 20.6232 17.6663 19.4732 17.6663 18.0542H16.6663ZM8.99967 21.6375C6.8053 21.6375 4.84339 21.1917 3.44858 20.4943C2.02385 19.7819 1.33301 18.8903 1.33301 18.0542H0.333008C0.333008 19.4732 1.47033 20.6232 3.00136 21.3887C4.5623 22.1692 6.68372 22.6375 8.99967 22.6375V21.6375ZM1.33301 18.0542C1.33301 17.218 2.02385 16.3264 3.44858 15.614C4.84339 14.9166 6.8053 14.4708 8.99967 14.4708V13.4708C6.68372 13.4708 4.5623 13.9391 3.00136 14.7196C1.47033 15.4851 0.333008 16.6352 0.333008 18.0542H1.33301ZM8.99967 14.4708C11.194 14.4708 13.156 14.9166 14.5508 15.614C15.9755 16.3264 16.6663 17.218 16.6663 18.0542H17.6663C17.6663 16.6352 16.529 15.4851 14.998 14.7196C13.4371 13.9391 11.3156 13.4708 8.99967 13.4708V14.4708Z"
                                fill="currentColor"
                            />
                        </svg>
                    </NavbarLink>

                    <svg
                        onClick={() => {
                            handleNavbar(true);
                            setIsModalOpened(true);
                        }}
                        width="28"
                        height="29"
                        viewBox="0 0 28 29"
                        fill="none"
                        className="upper navbar-link"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.8">
                            <path
                                d="M12.833 24.5542C12.833 25.5207 12.0495 26.3042 11.083 26.3042C10.1165 26.3042 9.33301 25.5207 9.33301 24.5542C9.33301 23.5877 10.1165 22.8042 11.083 22.8042C12.0495 22.8042 12.833 23.5877 12.833 24.5542Z"
                                stroke="currentColor"
                            />
                            <path
                                d="M23.333 24.5542C23.333 25.5207 22.5495 26.3042 21.583 26.3042C20.6165 26.3042 19.833 25.5207 19.833 24.5542C19.833 23.5877 20.6165 22.8042 21.583 22.8042C22.5495 22.8042 23.333 23.5877 23.333 24.5542Z"
                                stroke="currentColor"
                            />
                            <path
                                d="M6.99967 5.30416H20.9997C23.577 5.30416 25.6663 7.3935 25.6663 9.97082V15.8042C25.6663 18.3815 23.577 20.4708 20.9997 20.4708H11.6663C9.08901 20.4708 6.99967 18.3815 6.99967 15.8042V5.30416ZM6.99967 5.30416C6.99967 4.01549 5.95501 2.97083 4.66634 2.97083H2.33301M6.99967 9.97082H25.083"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
