import { useActions } from "@/hooks/redux";
import axios from "axios";
import { useState } from "react";

const Login = () => {
	const [values, setValues] = useState<{ email: string; password: string }>({
		email: "",
		password: "",
	});
	const { addNotification, setUser } = useActions();
	const onChange = (e: any) => {
		const name: "email" | "password" = e.target.name;
		setValues((prev) => {
			prev[name] = e.target.value;
			return prev;
		});
	};
	const onSubmit = async (e: any) => {
		e.preventDefault();
		axios
			.post("https://webshining.server.com/api/auth/login", values, { withCredentials: true })
			.then(({ data }) => {
				localStorage.setItem("accessToken", data.accessToken);
				setUser(data.user);
			})
			.catch(({ response }) => {
				addNotification({ text: response.data.error, type: "ERROR" });
			});
	};
	return (
		<div className="auth" onSubmit={onSubmit}>
			<form className="auth__form">
				<h1>Sign In</h1>
				<input
					onChange={onChange}
					className="auth__input"
					name="email"
					type="email"
					placeholder="Email"
					required
				/>
				<input
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
				<div className="auth__social"></div>
			</form>
		</div>
	);
};

export default Login;
