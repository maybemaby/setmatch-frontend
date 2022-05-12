import { usePageContext } from "./usePageProvider";
import styles from "./PageNavigator.module.css";

export const PageNext = () => {
  const pageContext = usePageContext();

  if (pageContext?.page.limitReached !== "top") {
    return (
      <button
        className={styles.button}
        onClick={() => pageContext?.dispatchPage({ type: "next" })}
      >
        Next
      </button>
    );
  }

  return null;
};
