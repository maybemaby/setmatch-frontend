import { useSearchUsers } from "../../../hooks/useSearchUsers";
import { useAccessToken } from "../../../hooks/useAccessToken";
import { usePageContext } from "../../PageNavigator/usePageProvider";
import { UserList } from "./UserList/UserList";
import { PageNavigator } from "../../PageNavigator/PageNavigator";
import { Loader } from "../../Loader/Loader";
import styles from "./Search.module.css";
import { useEffect } from "react";

export const SearchPage = () => {
  const pageContext = usePageContext();
  const authToken = useAccessToken();
  const { data, isError, isLoading } = useSearchUsers(
    { page: pageContext?.page.page },
    authToken ?? undefined
  );

  useEffect(() => {
    pageContext?.dispatchPage({ type: "to", page: 1 });
  }, []);

  useEffect(() => {
    if (typeof data?.length !== "undefined" && data.length < 10) {
      pageContext?.dispatchPage({ type: "limitSwitch", direction: "top" });
    }
  }, [data]);

  return (
    <main className={styles.container}>
      {isLoading && (
        <div className="centered">
          <Loader size="100px" message="Fetching matching users..." />
        </div>
      )}
      {isError && <div>Failed to fetch users, try again later</div>}
      <UserList users={data ?? []} />

      {!isLoading && !isError && (
        <PageNavigator>
          <PageNavigator.Previous />
          <PageNavigator.Display />
          <PageNavigator.Next />
        </PageNavigator>
      )}
    </main>
  );
};
