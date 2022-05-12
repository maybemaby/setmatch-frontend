import { PageDisplay } from "./PageDisplay";
import { PageNext } from "./PageNext";
import { PagePrev } from "./PagePrev";

interface PageNavigatorProps {
  children: React.ReactNode;
}

export const PageNavigator = ({ children }: PageNavigatorProps) => {
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        alignItems: "center",
        position: "sticky",
        bottom: 0,
      }}
    >
      {children}
    </div>
  );
};

PageNavigator.Display = PageDisplay;
PageNavigator.Next = PageNext;
PageNavigator.Previous = PagePrev;
