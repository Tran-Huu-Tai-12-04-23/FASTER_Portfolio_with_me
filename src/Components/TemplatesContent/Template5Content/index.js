import clsx from "clsx";

import styles from "./Template5Content.module.scss";
import { Grid, Item } from "~/Components";

function Template5Content() {
  return (
    <div className={clsx(styles.wrapper)}>
      <Grid id='grid_5'></Grid>
    </div>
  );
}

export default Template5Content;
