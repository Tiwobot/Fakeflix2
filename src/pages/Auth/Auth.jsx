import "./auth.scss";
import { useState } from "react";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import { motion } from "framer-motion";
import { staggerOne, authFadeInUpVariants, modalVariants, authPageFadeInVariants } from "../../motionUtils";
import { SIGNIN_BGIMG_URL } from "../../requests.js";
import { useSelector } from "react-redux";
import { selectAuthErrors } from "../../redux/auth/auth.selectors";

const Auth = () => {
	const [isSignedUp] = useState(true);
	const authError = useSelector(selectAuthErrors);

	return (
		<motion.div
			className="Auth"
			variants={authPageFadeInVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<div className="Auth__opacityLayer" />
			<div className="Auth__bgLayer" style={{ backgroundImage: `url(${SIGNIN_BGIMG_URL})` }} />
			
			<motion.div
				className="Auth__content"
				variants={modalVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				<motion.div variants={staggerOne} initial="initial" animate="animate" exit="exit">
					<motion.h2 variants={authFadeInUpVariants} className="Auth__content--title">
						{isSignedUp ? "Tudep" : "Tudep"}
					</motion.h2>
					{isSignedUp ? <SignIn /> : <SignUp />}
					{authError && <motion.p variants={authFadeInUpVariants} className='Auth__content--errors'>{authError}</motion.p>}
					<motion.hr variants={authFadeInUpVariants} className="Auth__content--divider" />
					<motion.small variants={authFadeInUpVariants} className="Auth__content--toggleView">
						{isSignedUp
							? ``
							: ""}
						<span className="toggler" onClick={() => null}>
							{isSignedUp ? "Tudep - Deprem Sonrası Stok Takip Sistemi" : "Tudep - Deprem Sonrası Stok Takip Sistemi"}
						</span>
					</motion.small>
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default Auth;
