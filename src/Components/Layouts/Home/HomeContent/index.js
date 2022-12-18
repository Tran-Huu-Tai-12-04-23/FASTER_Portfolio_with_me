import clsx from "clsx";

import styles from "./HomeContent.module.scss";

function HomeContent({ stateModalChooseTemplate }) {
  return (
    <div className={clsx(styles.wrapper)} id='home'>
      <div
        className={clsx(styles.button_cerate)}
        onClick={(e) => {
          e.preventDefault();
          stateModalChooseTemplate(true);
        }}
      >
        <button>Create new portfolio</button>
        <span className={clsx(styles.span1)}></span>
        <span className={clsx(styles.span2)}></span>
        <span className={clsx(styles.span3)}></span>
        <span className={clsx(styles.span4)}></span>
      </div>
      <div className={clsx(styles.wrapper_text)}>
        <h5 className={clsx(styles.static_text)}>Create</h5>

        <ul className={clsx(styles.dynamic_txt)}>
          <div className={clsx(styles.wrapper_content_txt)}>
            <li>A new portfolio now!!</li>
            <li>Web portfolio quickly</li>
            <li>Portfolio in minutes!</li>
          </div>
        </ul>
      </div>
      <div className={clsx(styles.bubble1, styles.bubble)}></div>
      <div className={clsx(styles.bubble2, styles.bubble)}></div>
      <div className={clsx(styles.bubble3, styles.bubble)}></div>
      <div className={clsx(styles.bubble4, styles.bubble)}></div>
    </div>
  );
}
export default HomeContent;
