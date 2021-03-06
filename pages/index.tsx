import type { NextPage } from "next";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import programadorImg from "../public/programador-main.svg";
import blobs_side from "../public/blobs_side.svg";
import blobs_bottom from "../public/blobs_bottom.svg";
import Button from "../components/Button/Button";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  // console.log(h, w)
  return (
    <div>
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
            <Button
              displaytext="Entre agora"
              showAfter={true}
              onClick={() => router.push("/devs")}
            ></Button>
          </div>
          <Image src={programadorImg} alt="Programador"></Image>
        </div>
      </div>
      <div className={styles.blobs_bottom}>
        <Image src={blobs_bottom} alt="Estilização inferior"></Image>
      </div>
      <div className={styles.blobs_side}>
        <Image src={blobs_side} alt="Estilização lateral"></Image>
      </div>
    </div>
  );
};

export default Home;
