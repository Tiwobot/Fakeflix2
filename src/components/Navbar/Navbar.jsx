import "./navbar.scss";
import { useState, useRef } from "react";
import useViewport from "../../hooks/useViewport";
import useScroll from "../../hooks/useScroll";
import useOutsideClick from "../../hooks/useOutsideClick";
import { motion } from "framer-motion";
import { navbarFadeInVariants } from "../../motionUtils";
import { FaCaretDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/auth.selectors";
import { signOutStart } from "../../redux/auth/auth.actions";

const Navbar = () => {
	const { width } = useViewport();
	const isScrolled = useScroll(70);
	const [genresNav, setGenresNav] = useState(false);
	const [profileNav, setProfileNav] = useState(false);
	const genresNavRef = useRef();
	const profileNavRef = useRef();
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

	useOutsideClick(genresNavRef, () => {
		if (genresNav) setGenresNav(false);
	});
	useOutsideClick(profileNavRef, () => {
		if (profileNav) setProfileNav(false);
	});

	return (
		<>
			<motion.nav
				className={`Navbar ${isScrolled && "Navbar__fixed"}`}
				variants={navbarFadeInVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				<Link to="/">
					<img className="Navbar__logo" src={"tudepIco_nav.png"} alt="" />
				</Link>
				{width >= 1024 ? (
					<ul className="Navbar__primarynav Navbar__navlinks">
						<li className="Navbar__navlinks--link">
							<NavLink to="/browse" activeClassName="activeNavLink">
								Giriş
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/tvseries" activeClassName="activeNavLink">
								Gıda
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/movies" activeClassName="activeNavLink">
								Giyim
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/popular" activeClassName="activeNavLink">
								Diğer
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							<NavLink to="/mylist" activeClassName="activeNavLink">
								Favorilerim
							</NavLink>
						</li>
					</ul>
				) : (
					<div
						className={`Navbar__primarynav Navbar__navlinks ${isScrolled && "Navbar__primarynav--scrolled"}`}
						onClick={() => setGenresNav(!genresNav)}
					>
						<span className="Navbar__navlinks--link">Discover</span>
						<FaCaretDown className="Navbar__primarynav--toggler Navbar__primarynav--caret" />
						<div
							className={`Navbar__primarynav--content ${genresNav ? "active" : ""}`}
						>
							{genresNav && (
								<ul
									className="Navbar__primarynav--content-wrp"
									ref={genresNavRef}
								>
									<li className="Navbar__navlinks--link">
										<NavLink to="/browse" activeClassName="activeNavLink">
											Giriş
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/tvseries" activeClassName="activeNavLink">
											Gıda
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/movies" activeClassName="activeNavLink">
											Giyim
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/popular" activeClassName="activeNavLink">
											Diğer
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/mylist" activeClassName="activeNavLink">
											Favorilerim
										</NavLink>
									</li>
								</ul>
							)}
						</div>
					</div>
				)}
				<div className="Navbar__secondarynav">
					<div className="Navbar__navitem">
						<Searchbar />
					</div>
					<div className="Navbar__navitem">
						<div
							className={`Navbar__navprofile ${profileNav && "active"}`}
							onClick={() => setProfileNav(!profileNav)}
						>
							
							<FaCaretDown className="Navbar__navprofile--toggler Navbar__navprofile--caret" />
							<div className={`Navbar__navprofile--content ${profileNav ? "active" : ""}`}>
								{profileNav && (
									<ul
										className="Navbar__navprofile--content-wrp"
										ref={profileNavRef}
									>
										{currentUser && (
											<li
												className="Navbar__navlinks--link"
												onClick={() => dispatch(signOutStart())}
											>
												Sign Out
											</li>
										)}
									</ul>
								)}
							</div>
						</div>
					</div>
				</div>
			</motion.nav>
		</>
	);
};

export default Navbar;
