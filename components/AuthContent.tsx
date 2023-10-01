"use client";

import { useActions, useAppSelector } from "@/actions/hooks/redux";
import { getUser } from "@/storage/reducers/user";
import { UserBody } from "@/types/user";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { default as usePush } from "./Push";

const AuthContent = () => {
	const push = usePush();
	const { setUser, loginUser, registerUser, addNotification, removeNotifications } = useActions();
	const { user } = useAppSelector((state) => state.user);
	const [values, setValue] = useState<UserBody>({ name: "", email: "", password: "" });
	const authRef = useRef(null);

	useEffect(() => {
		if (window.location.hash) {
			const data = JSON.parse(decodeURI(window.location.hash).slice(1));
			if (!data.error) {
				localStorage.setItem("accessToken", data.accessToken);
				setUser(getUser(data.accessToken));
				removeNotifications();
				push("/", authRef.current, 800);
			} else {
				addNotification({ text: data.error, type: "ERROR" });
			}
		}
	}, []);
	useEffect(() => {
		if (user) {
			removeNotifications();
			push("/", authRef.current, 800);
		}
	}, [user]);

	const onChange = (e: any) => {
		setValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const [isLogin, setIsLogin] = useState<boolean>(true);
	const onSubmit = async (e: any) => {
		e.preventDefault();
		const { payload } = (await (isLogin ? loginUser(values) : registerUser(values))) as any;
		if (payload.error) addNotification({ text: payload.error, type: "ERROR" });
	};

	const redirectGoogle = () => {
		push(`${process.env.API_URL}/auth/google?state=` + window.location.href, authRef.current, 800);
	};
	const redirectGithub = () => {
		push(`${process.env.API_URL}/auth/github?state=` + window.location.href, authRef.current, 800);
	};
	return (
		<div className="auth" ref={authRef}>
			<form className="auth__form" onSubmit={onSubmit}>
				<h1>{isLogin ? "Sign In" : "Sign Up"}</h1>
				<span onClick={(e) => setIsLogin(!isLogin)}>{isLogin ? "Sign Up" : "Sign In"}</span>
				{!isLogin && (
					<input
						value={values.name}
						onChange={onChange}
						className="auth__input"
						name="name"
						type="text"
						placeholder="Name"
						required
					/>
				)}
				<input
					value={values.email}
					onChange={onChange}
					className="auth__input"
					name="email"
					type="email"
					placeholder="Email"
					required
				/>
				<input
					value={values.password}
					onChange={onChange}
					className="auth__input"
					name="password"
					type="password"
					placeholder="Password"
					required
				/>
				<button className="auth__button" type="submit">
					Submit
				</button>
				<div className="auth__social">
					<Image src="/google.png" onClick={redirectGoogle} width={30} height={30} alt="google" />
					<Image src="/github.png" onClick={redirectGithub} width={30} height={30} alt="github" />
				</div>
			</form>
		</div>
	);
};

export default AuthContent;
