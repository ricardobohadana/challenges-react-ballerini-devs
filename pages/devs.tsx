import React from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/Devs.module.css";

type Props = {};

const devs = (props: Props) => {
  return (
    <div className={styles.container}>
      <Navbar showSearchButton={true} />
      <div className={styles.mainContent}></div>
    </div>
  );
};

export default devs;
