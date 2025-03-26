import { FormEvent, useState, useEffect } from "react";
import { Header } from "../componets/header";
import { Input } from "../componets/input";
import { db } from "../services/firebase-connection";
import { setDoc, addDoc, getDoc, doc } from "firebase/firestore";

export const Networks = () => {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    const getLinks = async () => {
      const docRef = doc(db, "social", "link");

      try {
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLinks();
  }, []);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // 'social' é a collection, 'link' é o nome do doc
      await setDoc(doc(db, "social", "link"), {
        facebook: facebook,
        instagram: instagram,
        youtube: youtube,
      });
      console.log("CADASTRADO COM SUCESSO");
    } catch (error) {
      console.log("ERRO AO CADASTRAR" + error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-2 pb-7">
      <Header />
      <h1 className="mt-8 mb-4 text-2xl font-medium text-white">
        Minhas redes sociais
      </h1>
      <form onSubmit={handleRegister} className="flex w-full max-w-xl flex-col">
        <label className="my-2 font-medium text-white">Link do Facebook</label>
        <Input
          placeholder="Digite a url do Facebook..."
          type="url"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <label className="my-2 font-medium text-white">Link do Instagram</label>
        <Input
          placeholder="Digite a url do Instagram..."
          type="url"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label className="my-2 font-medium text-white">Link do Youtube</label>
        <Input
          placeholder="Digite a url do Youtube..."
          type="url"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <button
          type="submit"
          className="mb-7 flex h-9 cursor-pointer items-center justify-center rounded-md bg-blue-600 font-medium text-white"
        >
          Salvar links
        </button>
      </form>
    </div>
  );
};
