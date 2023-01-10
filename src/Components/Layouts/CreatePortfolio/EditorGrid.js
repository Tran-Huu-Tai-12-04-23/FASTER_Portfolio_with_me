import clsx from "clsx";
import styles from "./CreatePortfolio.module.scss";
import { IoIosColorFilter } from "react-icons/io";
import { BiImageAdd } from "react-icons/bi";
import { TipSuggest } from "~/Components";
import { AiOutlineBgColors } from "react-icons/ai";
function EditorGrid() {
    return (
        <div className={clsx(styles.editor)}>
            <div>
                <TipSuggest content='Set background color'>
                    <AiOutlineBgColors />
                </TipSuggest>
            </div>
            <div>
                <TipSuggest content='Set Image'>
                    <BiImageAdd />
                </TipSuggest>
            </div>
            <div>
                <TipSuggest content='Set background color'>
                    <IoIosColorFilter />
                </TipSuggest>
            </div>
        </div>
    );
}
export default EditorGrid;
