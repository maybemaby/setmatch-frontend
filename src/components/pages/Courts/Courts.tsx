import { useContext, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { CourtList } from "./CourtList/CourtList";
import { SearchBox } from "../../SearchBox/SearchBox";
import { usePageContext } from "../../PageNavigator/usePageProvider";
import { PageNavigator } from "../../PageNavigator/PageNavigator";
import { useCourts } from "../../../hooks/useCourts";
import { UserContext } from "../../UserProvider/UserProvider";
import { loginRequest } from "../../../config";
import styles from "./Courts.module.css";
import { Loader } from "../../Loader/Loader";

export const Courts = () => {
  const pageContext = usePageContext();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const { instance, accounts } = useMsal();
  const [token, setToken] = useState<string | null>(null);
  const userContext = useContext(UserContext);
  const { data, isLoading, isError } = useCourts(
    token,
    pageContext?.page.page,
    search
  );

  useEffect(() => {
    const fetchToken = async () => {
      instance.setActiveAccount(accounts[0]);
      const token = (await instance.acquireTokenSilent(loginRequest))
        .accessToken;
      setToken(token);
    };

    fetchToken().catch((err) => console.error(err));
    pageContext?.dispatchPage({ type: "to", page: 1 });
  }, []);

  useEffect(() => {
    if (typeof data?.length !== "undefined" && data.length < 10) {
      pageContext?.dispatchPage({ type: "limitSwitch", direction: "top" });
    }
  }, [data]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === "enter") {
      pageContext?.dispatchPage({ type: "to", page: 1 });
      setSearch(e.currentTarget.value);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Find a court</h1>
      <div className={styles.search}>
        <SearchBox
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          onKeyDown={handleSearch}
          placeholder={"Search courts"}
        />
      </div>
      {userContext?.user && userContext.user.homeCourt === null ? (
        <div className={styles.alert}>Home Court: Not set</div>
      ) : (
        <div className={styles.alert}>
          Current Home Court: {userContext?.user?.homeCourt?.address}
        </div>
      )}
      {isLoading && (
        <div className="centered">
          <Loader
            message="Fetching results..."
            size="100px"
            horizontal={false}
          />
        </div>
      )}
      {isError && <div>Could not fetch results, try again later</div>}
      <CourtList courts={data ?? []} isLoading={isLoading} />
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
