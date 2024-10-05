import "./App.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import type { InferType } from "yup";

const userSchema = yup.object({
	name: yup.string().required("名前は必須です。"),
	email: yup
		.string()
		.required("メールアドレスは必須です。")
		.email("メールアドレス形式で入力してください。"),
	password: yup
		.string()
		.required("パスワードは必須です。")
		.min(8, "パスワードは８文字以上で入力してください。"),
});

type User = InferType<typeof userSchema>;

function App() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<User>({ mode: "onChange", resolver: yupResolver(userSchema) });

	const onSubmit: SubmitHandler<User> = (data) => {
		console.log(data);
	};

	console.log(watch("name"));

	return (
		<div className="form-container">
			<h1>React-Hook-Form + Yup</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="name">名前</label>
				<input
					type="text"
					id="name"
					placeholder="田中太郎"
					{...register("name")}
				/>
				<p>{errors.name?.message}</p>
				<label htmlFor="email">メールアドレス</label>
				<input
					type="email"
					id="email"
					placeholder="sample@gmail.com"
					{...register("email")}
				/>
				<p>{errors.email?.message}</p>
				<label htmlFor="password">パスワード</label>
				<input type="password" id="password" {...register("password")} />
				<p>{errors.password?.message}</p>
				<button type="submit">送信</button>
			</form>
		</div>
	);
}

export default App;
