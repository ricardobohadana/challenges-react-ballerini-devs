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

const Navbar: React.FC = ({ children }) => {
  const iconColor = "#27ae60";

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
          <Link href="/" passHref>
            <Image
              src={logo}
              width="50%"
              height="50%"
              className={styles.logoLink}
              alt="Ballerini Devs logo"
            />
          </Link>
          <span className={styles.logoTitle}>Ballerini Devs</span>
        </div>
        <div className={styles.right}>{children}</div>
      </nav>
    </div>
  );
};

export default Navbar;
