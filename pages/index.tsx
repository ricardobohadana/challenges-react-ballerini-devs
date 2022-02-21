import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <div className={styles.landing}>
          <h2>O maior banco de Devs do Brasil</h2>
          <p>
            Não importa se front ou back end, fazer networking é muito
            importante. Faça parte da maior comunidade de desenvolvedores
            brasileiros
          </p>
        </div>
        <Image
          src="/../public/programador.png"
          height="400px"
          width="400px"
        ></Image>
      </div>
    </div>
  );
};

export default Home;
