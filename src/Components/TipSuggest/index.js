import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";

function TipSuggest({
  children,
  content,
  classNames,
  html,
  trigger,
  position = "bottom",
}) {
  return (
    <Tooltip
      html={html}
      trigger={trigger}
      className={classNames}
      title={content}
      position={position}
    >
      {children}
    </Tooltip>
  );
}

export default TipSuggest;
