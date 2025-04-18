import { FormEvent, useState, useEffect } from "react";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { FiTrash } from "react-icons/fi";
import { db } from "../services/firebase-connection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export const Admin: React.FC = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [textColor, setTextColor] = useState("#f1f1f1");
  const [bgColor, setBgColor] = useState("#121212");
  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    // referencia a collection 'links'
    const linksRef = collection(db, "links");
    // faz uma busca personalizada no banco dentro da referencia passada
    const queryRef = query(linksRef, orderBy("created", "asc"));
    // busca os dados em tempo real --- snapshot é o retorno do banco
    const unsub = onSnapshot(queryRef, (snapshot) => {
      const list = [] as LinkProps[];

      // passa por todos os docs da collection
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(list);
    });

    return () => unsub();
  }, []);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (name === "" || url === "") {
      alert("Preencha todos os campos");
    }

    try {
      await addDoc(collection(db, "links"), {
        name: name,
        url: url,
        bg: bgColor,
        color: textColor,
        created: new Date(),
      });
      setName("");
      setUrl("");
    } catch (error) {
      console.log("ERRO AO CADASTRAR NO BANCO" + error);
    }
  };

  const handleDelete = async (docID: string) => {
    const docRef = doc(db, "links", docID);

    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-2 pb-7">
      <Header />
      <form
        className="mt-8 mb-3 flex w-full max-w-xl flex-col"
        onSubmit={handleRegister}
      >
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
          className="mb-7 flex cursor-pointer items-center justify-center gap-4 rounded-md bg-blue-600 py-3 font-medium text-white"
        >
          Cadastrar
        </button>
      </form>
      <h2 className="mb-7 text-2xl font-bold text-white">Meus Links</h2>
      {links.map((item) => (
        <article
          key={item.id}
          className="mb-2 flex w-11/12 max-w-xl items-center justify-between rounded-md px-2 py-3 select-none"
          style={{ backgroundColor: item.bg, color: item.color }}
        >
          <p>{item.name}</p>
          <div>
            <button
              className="cursor-pointer rounded border border-dashed bg-neutral-700 px-2 py-1"
              onClick={() => handleDelete(item.id)}
            >
              <FiTrash size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};
