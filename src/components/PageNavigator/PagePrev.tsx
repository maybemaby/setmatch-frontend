import { usePageContext } from "./usePageProvider";

export const PagePrev = () => {
  const pageContext = usePageContext();

  return (
    <button onClick={() => pageContext?.dispatchPage({ type: "prev" })}>
      Prev
    </button>
  );
};
