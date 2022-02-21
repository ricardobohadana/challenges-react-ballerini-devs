import React from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

type Props = {};

const Navbar = (props: Props) => {
  const iconColor = "#27ae60";
  return (
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
      <div className={styles.center}>icon - Ballerini Devs</div>
      <div className="right"></div>
    </nav>
  );
};

export default Navbar;
