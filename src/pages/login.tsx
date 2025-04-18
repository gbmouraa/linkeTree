import { Link } from "react-router-dom";
import { Input } from "../components/input";
import { FormEvent, useState } from "react";
import { auth } from "../services/firebase-connection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Preencha todos os campos");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // replace substitui o histórico de navegação
      navigate("/admin", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Link to="/">
        <h1 className="mt-11 mb-7 text-5xl font-bold text-white">
          Dev
          <span className="inline-block -translate-x-2 bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>
      <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col">
        <Input
          placeholder="Digite o seu email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="h-9 rounded border-0 bg-blue-600 text-lg font-medium text-white"
        >
          Acessar
        </button>
      </form>
    </div>
  );
};
