import clsx from "clsx";
import uuid from "react-uuid";
import { useCallback, useContext, useEffect } from "react";

import styles from "./Template2Content.module.scss";
import { Grid, Item } from "~/Components";
import { ContextItemsIngrid } from "~/Store/Context";

function Template2Content() {
  return (
    <div className={clsx(styles.wrapper)}>
      <Grid id='grid_2'></Grid>
    </div>
  );
}

export default Template2Content;
