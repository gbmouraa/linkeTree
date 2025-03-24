import { useState } from "react";
import { Header } from "../componets/header";
import { Input } from "../componets/input";
import { FiTrash } from "react-icons/fi";

export const Admin: React.FC = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [textColor, setTextColor] = useState("#f1f1f1");
  const [bgColor, setBgColor] = useState("#121212");

  return (
    <div className="flex min-h-screen flex-col items-center px-2 pb-7">
      <Header />
      <form className="mt-8 mb-3 flex w-full max-w-xl flex-col">
        <label className="my-2 font-medium text-white">Nome do link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="my-2 font-medium text-white">Url do link</label>
        <Input
          type="url"
          placeholder="Digite o nome do link..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <section className="my-4 flex gap-5">
          <div className="flex items-center space-x-2">
            <label className="my-2 font-medium text-white">Fundo do link</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="my-2 font-medium text-white">Cor do link</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
        </section>
        {name !== "" && (
          <div className="mb-7 flex flex-col items-center justify-center rounded-md border border-gray-100/25 p-1">
            <label className="my-2 font-medium text-white">
              Veja como está ficando:
            </label>
            <article
              className="flex w-11/12 max-w-lg flex-col items-center justify-between rounded bg-zinc-900 px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: bgColor,
              }}
            >
              <p className="font-medium" style={{ color: textColor }}>
                {name}
              </p>
            </article>
          </div>
        )}
        <button
          type="submit"
          className="mb-7 flex items-center justify-center gap-4 rounded-md bg-blue-600 py-3 font-medium text-white"
        >
          Cadastrar
        </button>
      </form>
      <h2 className="mb-7 text-2xl font-bold text-white">Meus Links</h2>
      <article
        className="mb-2 flex w-11/12 max-w-xl items-center justify-between rounded-md px-2 py-3 select-none"
        style={{ backgroundColor: "#135DFB", color: "#fff" }}
      >
        <p>Canal do youtube</p>
        <div>
          <button className="cursor-pointer rounded border border-dashed bg-neutral-700 px-2 py-1">
            <FiTrash size={18} color="#fff" />
          </button>
        </div>
      </article>
    </div>
  );
};
