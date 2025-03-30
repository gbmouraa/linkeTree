import { useEffect, useState } from "react";
import { Social } from "../components/social";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { db } from "../services/firebase-connection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinkProps {
  facebook: string;
  youtube: string;
  instagram: string;
}

export const Home = () => {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinkProps>();

  useEffect(() => {
    const getLinks = async () => {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      try {
        const snapshot = await getDocs(queryRef);
        if (snapshot.size !== 0) {
          const list = [] as LinkProps[];

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
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLinks();
  }, []);

  useEffect(() => {
    const getSocialLinks = async () => {
      const docRef = doc(db, "social", "link");

      try {
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSocialLinks();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center py-4">
      <h1 className="mt-20 text-3xl font-bold text-white md:text-4xl">
        Gabriel Frontend
      </h1>
      <span className="mt-3 mb-5 text-white">Veja meus links 👇</span>
      <main className="flex w-11/12 max-w-xl flex-col text-center">
        {links.map((item) => (
          <section
            key={item.id}
            style={{ color: item.color, backgroundColor: item.bg }}
            className="mb-4 w-full cursor-pointer rounded-lg py-2 transition-transform select-none hover:scale-105"
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <p className="text-base md:text-lg">{item.name}</p>
            </a>
          </section>
        ))}
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="my-4 flex justify-center gap-3">
            {socialLinks?.facebook !== "" && (
              <Social url={socialLinks.facebook}>
                <FaFacebook size={35} color="#fff" />
              </Social>
            )}
            {socialLinks?.instagram !== "" && (
              <Social url={socialLinks.instagram}>
                <FaInstagram size={35} color="#fff" />
              </Social>
            )}
            {socialLinks?.youtube !== "" && (
              <Social url={socialLinks.youtube}>
                <FaYoutube size={35} color="#fff" />
              </Social>
            )}
          </footer>
        )}
      </main>
    </div>
  );
};
