import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ FileInput, authService, cardRepository }) => {
  const history = useHistory();
  const historyState = history?.location?.state;
  const [cards, setCards] = useState({});
  const [userId, setUserID] = useState(historyState && historyState.id);

  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);
  // useCallback을 이용한다는 것은 한 번 만들어진 동일한 함수를 계속 재사용한다는 것
  // 즉, authService가 변경되어도 이 함수는 예전에 저장된 authService를 사용하게됨
  // 그래서 authService에 변화가 생긴다면 새로운 콜백을 만들 수 있도록 인자를 줘야함!

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, (cards) => {
      setCards(cards);
    });
    return () => stopSync();
    // unmount되었을 때(컴포넌트가 더이상 보여지지 않을 때) 리턴 해줄 수 있음
    // 어떤 함수를 리턴하면 컴포넌트가 unmount 되었을 때 알아서 이 리턴한 함수를 호출해줌
  }, [userId, cardRepository]); // 컴포넌트가 mount되었을 때 그리고 userId가 업데이트 되었을 때 useEffect 호출

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        history.push("/");
      }
    });
  }, [authService, history]);

  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
