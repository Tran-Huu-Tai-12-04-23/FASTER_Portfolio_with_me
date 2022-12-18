import clsx from "clsx";

import styles from "./Button.module.scss";
function Button({
  primary,
  rounded,
  small,
  large,
  outline,
  to,
  href,
  onClick,
  leftIcon,
  rightIcon,
  children,
  className,
  ...moreProps
}) {
  const classNames = clsx(
    styles.wrapper,
    className,
    styles.normal,
    {
      [styles.small]: small,
    },
    {
      [styles.large]: large,
    },
    {
      [styles.outline]: outline,
    },
    {
      [styles.primary]: primary,
    },
    {
      [styles.rounded]: rounded,
    },
    styles.content__item
  );
  let StyleButton = "div";
  if (to) {
    StyleButton = "Link";
  } else if (href) {
    StyleButton = "a";
  }

  const props = {
    to,
    href,
    onClick,
  };

  return (
    <StyleButton className={classNames} {...props}>
      {leftIcon}
      <span className={clsx(styles.title)}>{children}</span>
      {rightIcon}
    </StyleButton>
  );
}

export default Button;
