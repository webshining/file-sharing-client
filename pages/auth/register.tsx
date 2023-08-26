import { useActions } from "@/hooks/redux";
import axios from "axios";
import { useState } from "react";

const Login = () => {
	const [values, setValues] = useState<{ name: string; email: string; password: string }>({
		name: "",
		email: "",
		password: "",
	});
	const { addNotification } = useActions();
	const onChange = (e: any) => {
		const name: "name" | "email" | "password" = e.target.name;
		setValues((prev) => {
			prev[name] = e.target.value;
			return prev;
		});
	};
	const onSubmit = async (e: any) => {
		e.preventDefault();
		axios
			.post("https://webshining.server.com/api/auth/register", values)
			.then(({ data }) => {
				console.log(data);
			})
			.catch(({ response }) => {
				addNotification({ text: response.data.error, type: "ERROR" });
			});
	};
	return (
		<div className="auth" onSubmit={onSubmit}>
			<form className="auth__form">
				<h1>Sign Up</h1>
				<input
					onChange={onChange}
					className="auth__input"
					name="name"
					type="text"
					placeholder="Name"
					required
				/>
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
