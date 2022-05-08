import { usePageContext } from "./usePageProvider";

export const PageDisplay = () => {
  const pageContext = usePageContext();
  return <div>{pageContext?.page.page}</div>;
};
