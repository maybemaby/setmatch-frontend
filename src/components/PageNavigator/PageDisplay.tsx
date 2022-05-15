import { usePageContext } from "./usePageProvider";
import styles from "./PageNavigator.module.css";

export const PageDisplay = () => {
  const pageContext = usePageContext();
  return <div className={styles.display}>{pageContext?.page.page}</div>;
};
