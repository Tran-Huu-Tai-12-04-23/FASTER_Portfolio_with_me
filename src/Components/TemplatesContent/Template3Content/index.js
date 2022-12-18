import clsx from "clsx";

import styles from "./Template3Content.module.scss";
import { Grid } from "~/Components";

function Template3Content() {
  return (
    <div className={clsx(styles.wrapper)}>
      <Grid id='grid_3'></Grid>
    </div>
  );
}

export default Template3Content;
