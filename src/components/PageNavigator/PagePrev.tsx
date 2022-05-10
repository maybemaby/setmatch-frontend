import { usePageContext } from "./usePageProvider";

export const PagePrev = () => {
  const pageContext = usePageContext();

  if (
    pageContext?.page.limitReached !== "bottom" &&
    pageContext?.page.page !== 1
  ) {
    return (
      <button onClick={() => pageContext?.dispatchPage({ type: "prev" })}>
        Prev
      </button>
    );
  }
  return null;
};
