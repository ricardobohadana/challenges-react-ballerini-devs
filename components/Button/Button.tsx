import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  displaytext?: string;
  showafter: boolean;
  fontSize?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;
  const fontSize =
    props.fontSize == "sm"
      ? "0.95rem"
      : props.fontSize == "md"
      ? "1.2rem"
      : "1.45rem";

  return props.showafter ? (
    <button {...rest} className={styles.btnaft} style={{ fontSize: fontSize }}>
      <Link key={props.key} href="/devs">
        {props.displaytext}
      </Link>
    </button>
  ) : (
    <button {...rest} className={styles.btn} style={{ fontSize: fontSize }}>
      <Link href="/devs">{props.displaytext}</Link>
      {children}
    </button>
  );
};

export default Button;
