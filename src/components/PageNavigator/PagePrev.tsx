import { usePageContext } from "./usePageProvider";

export const PagePrev = () => {
  const pageContext = usePageContext();

  if (pageContext?.page.limitReached !== "bottom") {
    return (
      <button onClick={() => pageContext?.dispatchPage({ type: "prev" })}>
        Prev
      </button>
    );
  }
  return null;
};
