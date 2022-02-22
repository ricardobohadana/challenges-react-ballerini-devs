import React from "react";
import styles from "./Card.module.css";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import Image from "next/image";
type Props = {
  fullName?: string;
  techCareer?: string;
  githubLink?: string;
  linkedinLink?: string;
  avatarLink?: string;
};

const Card = (props: Props) => {
  const avatarSrc = props.avatarLink
    ? props.avatarLink
    : "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png";

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.avatar}>
          <Image width="175px" height="175px" src={avatarSrc} />
        </div>
        <div className={styles.greenBar}>______________</div>
        <h5 className={styles.name}>Ricardo Martins</h5>
        <p className={styles.description}>Data Scientist</p>
        <div className={styles.actionContent}>
          <FontAwesomeIcon
            icon={faLinkedin}
            size="3x"
            color="#f5f5f5"
            className={styles.icons}
          />
          <FontAwesomeIcon
            className={styles.icons}
            icon={faGithub}
            size="3x"
            color="#f5f5f5"
          />
          <div>
            <Button displayText="Ver perfil" fontSize="sm" />
          </div>
        </div>
      </div>
      <div className={styles.actionBtnContainer}>
        <button className={styles.editBtn}>Editar</button>
        <button className={styles.deleteBtn}>Excluir</button>
      </div>
    </div>
  );
};

export default Card;
