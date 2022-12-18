import clsx from "clsx";
import styles from "./Template.module.scss";

function Template({ icon, background, content }) {
  let Tag = "div";
  if (background) {
    Tag = "img";
  }
  return (
    <div className={clsx(styles.wrapper)}>
      <span className={clsx(styles.tip_suggest)}>{content}</span>
      <Tag src={background}>{icon}</Tag>
    </div>
  );
}

export default Template;
