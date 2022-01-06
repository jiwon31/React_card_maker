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
      theme: "SoftWare Engineer",
      email: "njw10099@gmail.com",
      message: "go for it",
      fileName: "jiwon",
      fileURL: "jiwon.png",
    },
    {
      id: "2",
      name: "jiwon2",
      company: "Samsung",
      theme: "SoftWare Engineer",
      email: "njw10099@gmail.com",
      message: "go for it",
      fileName: "jiwon",
      fileURL: "jiwon.png",
    },
    {
      id: "3",
      name: "jiwon3",
      company: "Samsung",
      theme: "SoftWare Engineer",
      email: "njw10099@gmail.com",
      message: "go for it",
      fileName: "jiwon",
      fileURL: "jiwon.png",
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

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
