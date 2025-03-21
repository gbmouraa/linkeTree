import { Social } from "../componets/social";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export const Home: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center py-4">
      <h1 className="mt-20 text-3xl font-bold text-white md:text-4xl">
        Gabriel Frontend
      </h1>
      <span className="mt-3 mb-5 text-white">Veja meus links 👇</span>
      <main className="flex w-11/12 max-w-xl flex-col text-center">
        <section className="mb-4 w-full cursor-pointer rounded-lg bg-white py-2 transition-transform select-none hover:scale-105">
          <a>
            <p className="text-base md:text-lg">Linkedin</p>
          </a>
        </section>
        <section className="mb-4 w-full cursor-pointer rounded-lg bg-white py-2 transition-transform select-none hover:scale-105">
          <a>
            <p className="text-base md:text-lg">Github</p>
          </a>
        </section>
        <footer className="my-4 flex justify-center gap-3">
          <Social url="https://www.linkedin.com/in/gabriel-moura-b63382161/">
            <FaLinkedin size={35} color="#fff" />
          </Social>
          <Social url="https://github.com/gbmouraa">
            <FaGithub size={35} color="#fff" />
          </Social>
        </footer>
      </main>
    </div>
  );
};
