import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";

type Props = {
  displayText: string;
  showAfter?: boolean;
  fontSize?: string;
};

const Button = (props: Props) => {
  const fontSize =
    props.fontSize == "sm"
      ? "1.25rem"
      : props.fontSize == "md"
      ? "1.625rem"
      : "2rem";

  return props.showAfter ? (
    <button className={styles.btnaft} style={{ fontSize: fontSize }}>
      <Link href="/devs">{props.displayText}</Link>
    </button>
  ) : (
    <button className={styles.btn} style={{ fontSize: fontSize }}>
      <Link href="/devs">{props.displayText}</Link>
    </button>
  );
};

export default Button;
