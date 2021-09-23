import {
  Button as InternalButton,
  ButtonTypeMap,
  ExtendButtonBase,
  Theme,
} from "@material-ui/core";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import ButtonStyles from "../styles/Button";

// interface ButtonProps extends ExtendButtonBase<ButtonTypeMap<{}, "button">> {
//   variantType: "primary" | "secondary";
// }

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variantType: "primary" | "secondary";
  variant: "text" | "outlined" | "contained";
}

export const Button = ({
  children,
  variantType,
  type,
  variant,
  style,
  onClick,
  ...props
}: ButtonProps): JSX.Element => {
  const styles = ButtonStyles();

  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      whileTap={{
        y: 2,
      }}
    >
      <InternalButton
        variant={variant}
        type={type}
        className={
          variantType === "primary"
            ? styles.primaryButton
            : styles.secondaryButton
        }
        style={style}
        onClick={onClick}
      >
        {children}
      </InternalButton>
    </motion.div>
  );
};
