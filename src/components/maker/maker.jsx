import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ authService }) => {
  const [cards, setCards] = useState([
    {
      id: "1",
      name: "jiwon",
      company: "Samsung",
      theme: "light",
      title: "SoftWare Engineer",
      email: "njw10099@gmail.com",
      message: "go for it",
      fileName: "jiwon",
      fileURL: null,
    },
    {
      id: "2",
      name: "jiwon2",
      company: "Samsung",
      theme: "dark",
      title: "SoftWare Engineer",
      email: "njw10099@gmail.com",
      message: "go for it",
      fileName: "jiwon",
      fileURL: "jiwon.png",
    },
    {
      id: "3",
      name: "jiwon3",
      company: "Samsung",
      theme: "colorful",
      title: "SoftWare Engineer",
      email: "njw10099@gmail.com",
      message: "go for it",
      fileName: "jiwon",
      fileURL: null,
    },
  ]);

  const history = useHistory();
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push("/");
      }
    });
  });

  const addCard = (card) => {
    const updated = [...cards, card];
    setCards(updated);
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} addCard={addCard} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
