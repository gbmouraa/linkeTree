import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase-connection";

export const Header = () => {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="mt-4 w-full max-w-xl px-1">
      <nav className="flex h-12 w-full items-center justify-between rounded-md bg-white px-3">
        <div className="space-x-4 font-medium">
          <Link to="/">Home</Link>
          <Link to="/admin">Links</Link>
          <Link to="/admin/social">Redes sociais</Link>
        </div>
        <button onClick={handleLogout} className="cursor-pointer">
          <BiLogOut size={28} color="#db2629" />
        </button>
      </nav>
    </header>
  );
};
