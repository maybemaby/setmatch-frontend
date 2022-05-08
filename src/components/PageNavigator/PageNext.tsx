import { usePageContext } from "./usePageProvider";

export const PageNext = () => {
  const pageContext = usePageContext();

  if (pageContext?.page.limitReached !== "top") {
    return (
      <button onClick={() => pageContext?.dispatchPage({ type: "next" })}>
        Next
      </button>
    );
  }

  return null;
};
