import React from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import logo from "../../public/android-chrome-512x512.png";

type Props = {
  showSearchButton: boolean;
};

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
      <div className={styles.center}>
        <div>
          <Image src={logo} width="50%" height="50%"></Image>
        </div>
        <div>Ballerini Devs</div>
      </div>
      <div className={styles.right}>
        {props.showSearchButton ? <input type="text" /> : <div></div>}
      </div>
    </nav>
  );
};

export default Navbar;
