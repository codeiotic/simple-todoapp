import { Button as InternalButton } from "@material-ui/core";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import ButtonStyles from "../styles/Button";

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  /**
   * The variant of the button.
   */
  variantType: "primary" | "secondary";
  /**
   * The variant used by Material UI
   */
  variant: "text" | "outlined" | "contained";
  /**
   * The size of the button.
   * @default 'medium'
   */
  size?: "small" | "medium" | "large";
}

/**
 * Creates a nice animated button!
 * @param {ButtonProps} ButtonProps
 * @default <Button variantType="primary" variant="contained" size="medium">
 * {children}
 * </Button>
 * @see /components/Button.tsx
 */
export const Button: FC<ButtonProps> = ({
  children,
  variantType,
  type,
  variant,
  style,
  size,
  onClick,
}) => {
  const styles = ButtonStyles();

  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      whileTap={{
        y: 1,
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
        size={size}
      >
        {children}
      </InternalButton>
    </motion.div>
  );
};
