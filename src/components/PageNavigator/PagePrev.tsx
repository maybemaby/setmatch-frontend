import { usePageContext } from "./usePageProvider";
import styles from "./PageNavigator.module.css";

export const PagePrev = () => {
  const pageContext = usePageContext();

  if (
    pageContext?.page.limitReached !== "bottom" &&
    pageContext?.page.page !== 1
  ) {
    return (
      <button
        className={styles.button}
        onClick={() => pageContext?.dispatchPage({ type: "prev" })}
      >
        Prev
      </button>
    );
  }
  return null;
};
