import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import logo from "../../public/android-chrome-512x512.png";
import Button from "../Button/Button";
import Link from "next/link";

type Props = {
  showSearchButton: boolean;
};

const Navbar = (props: Props) => {
  const iconColor = "#27ae60";

  const [inputText, setInputText] = useState("");

  const openRegisterModal = () => {
    console.log("Open register modal");
    return;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <nav className={styles.nav_container}>
        <div className={styles.left}>
          <div className={styles.icon_div}>
            <FontAwesomeIcon icon={faLinkedin} color={iconColor} />
          </div>
          <div className={styles.icon_div}>
            <FontAwesomeIcon icon={faFacebook} color={iconColor} />
          </div>
          <div className="">
            <FontAwesomeIcon icon={faDiscord} color={iconColor} />
          </div>
        </div>
        <div className={styles.center}>
          <Link href="/">
            <Image
              src={logo}
              width="50%"
              height="50%"
              className={styles.logoLink}
            />
          </Link>
          <span className={styles.logoTitle}>Ballerini Devs</span>
        </div>
        <div className={styles.right}>
          {props.showSearchButton ? (
            <>
              <FontAwesomeIcon
                icon={faSearch}
                color="#a9a9a9"
                className={styles.searchIcon}
              />
              <input
                type="text"
                className={styles.navInput}
                placeholder="Cadastro de Devs"
                onChange={(e) => setInputText(e.target.value)}
              />
            </>
          ) : (
            <div></div>
          )}
        </div>
      </nav>
      {props.showSearchButton ? (
        <div className={styles.btnContainer}>
          <button
            onClick={(e) => openRegisterModal()}
            className={styles.searchBtn}
          >
            Cadastrar Dev
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Navbar;
