import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { Modal } from "../components/Modal/Modal";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/Devs.module.css";

type Props = {};

interface Devs {
  avatarLink?: string;
  fullName: string;
  techCareer: string;
  githubLink: string;
  linkedinLink: string;
}

const devs = (props: Props) => {
  const [devData, setDevData] = useState<Devs[]>([]);

  const dummyData = [
    {
      fullName: "Ricardo Martins",
      githubLink: "ricardobohadana",
      linkedinLink: "ricardobohadana",
      techCareer: "Data Scientist",
    },
    {
      fullName: "Ricardo Martins",
      githubLink: "ricardobohadana",
      linkedinLink: "ricardobohadana",
      techCareer: "Software Engineer",
    },
    {
      fullName: "Ricardo Martins",
      githubLink: "ricardobohadana",
      linkedinLink: "ricardobohadana",
      techCareer: "Software Developer",
    },
  ];
  useEffect(() => {
    setDevData(dummyData);
  }, []);
  const content = <React.Fragment>Hey, I'm a modal.</React.Fragment>;
  return (
    <div className={styles.container}>
      <Navbar showSearchButton={true} />
      <div className={styles.mainContent}>
        {devData.length == 0 ? (
          <div style={{ color: "#f9f9f9" }}>
            Não há Devs cadastrados em nosso banco de dados
          </div>
        ) : (
          devData.map((dev: Devs, index: number) => {
            return <Card key={index} {...dev} />;
          })
        )}
      </div>
    </div>
  );
};

export default devs;
