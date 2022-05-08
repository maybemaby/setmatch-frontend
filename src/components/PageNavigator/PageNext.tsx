import { usePageContext } from "./usePageProvider";

export const PageNext = () => {
  const pageContext = usePageContext();

  return (
    <button onClick={() => pageContext?.dispatchPage({ type: "next" })}>
      Next
    </button>
  );
};
