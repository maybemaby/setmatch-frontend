import { useCallback, useContext, useMemo } from "react";
import { useSearchUsers } from "../../../hooks/useSearchUsers";
import { useAccessToken } from "../../../hooks/useAccessToken";
import { usePageContext } from "../../PageNavigator/usePageProvider";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { UserContext } from "../../UserProvider/UserProvider";
import { UserList } from "./UserList/UserList";
import { PageNavigator } from "../../PageNavigator/PageNavigator";
import { Loader } from "../../Loader/Loader";
import { SearchSettings } from "./SearchSettings/SearchSettings";
import { UserSearchFilter } from "../../../types/UserSearchFilter";
import styles from "./Search.module.css";

export const SearchPage = () => {
  const userContext = useContext(UserContext);
  const pageContext = usePageContext();
  const authToken = useAccessToken();
  const methods = useForm<UserSearchFilter>({ mode: "onChange" });
  const courtId = useCallback(() => {
    return methods.getValues().matchingHomeCourt
      ? userContext?.user?.homeCourt?.id
      : undefined;
  }, [methods.formState.isSubmitSuccessful]);

  const minNtrp = useCallback(() => {
    return methods.getValues().minNtrp ?? undefined;
  }, [methods.formState.isSubmitSuccessful]);

  const maxNtrp = useCallback(() => {
    return methods.getValues().maxNtrp ?? undefined;
  }, [methods.formState.isSubmitSuccessful]);

  const { data, isError, isLoading } = useSearchUsers(
    {
      page: pageContext?.page.page,
      exclude: userContext?.user?.id,
      minNtrp: minNtrp(),
      maxNtrp: maxNtrp(),
      homeCourtId: courtId(),
    },
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
      <FormProvider {...methods}>
        <SearchSettings />
      </FormProvider>
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
