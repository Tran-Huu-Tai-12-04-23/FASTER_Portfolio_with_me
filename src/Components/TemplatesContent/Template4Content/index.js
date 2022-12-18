import clsx from "clsx";

import styles from "./Template4Content.module.scss";
import { Grid, Item } from "~/Components";

function Template4Content() {
  return (
    <div className={clsx(styles.wrapper)}>
      <Grid id='grid_4'></Grid>
    </div>
  );
}

export default Template4Content;
