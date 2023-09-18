"use client";

import { useActions, useAppSelector } from "@/actions/hooks/redux";
import { getUser } from "@/storage/reducers/user";
import { UserBody } from "@/types/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthContent = () => {
	const [values, setValue] = useState<UserBody>({ name: "", email: "", password: "" });
	const { push } = useRouter();
	const { setUser, loginUser, registerUser, addNotification } = useActions();
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const { user } = useAppSelector((state) => state.user);
	useEffect(() => {
		if (window.location.hash) {
			const data = JSON.parse(decodeURI(window.location.hash).slice(1));
			localStorage.setItem("accessToken", data.accessToken);
			if (!data.error) setUser(getUser(data.accessToken));
			push("/");
		}
	}, []);
	useEffect(() => {
		if (user) push("/");
	}, [user]);
	const onChange = (e: any) => {
		setValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = async (e: any) => {
		e.preventDefault();
		const { payload } = (await (isLogin ? loginUser(values) : registerUser(values))) as any;
		if (payload.error) addNotification({ text: payload.error, type: "ERROR" });
	};
	const redirectGoogle = () => {
		push(`${process.env.API_URL}/auth/google?state=` + window.location.href);
	};
	const redirectGithub = () => {
		push(`${process.env.API_URL}/auth/github?state=` + window.location.href);
	};
	return (
		<div className="auth">
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
