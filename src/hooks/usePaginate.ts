import React, { useReducer } from "react";

type Action =
  | { type: "next" }
  | { type: "prev" }
  | { type: "to"; page: number };

type State = {
  page: number;
  limitReached: boolean;
  pageLimit?: number;
};

const nextPage = (current: State): State => {
  if (current.page === current.pageLimit) {
    return current;
  }
  const next = { ...current, page: current.page + 1 };
  if (next.page === current.pageLimit) {
    next.limitReached = true;
  } else {
    next.limitReached = false;
  }
  return next;
};

const prevPage = (current: State): State => {
  if (current.page === 1) {
    return current;
  }
  const next = { ...current, page: current.page - 1 };
  if (next.page === 1) {
    next.limitReached = true;
  } else {
    next.limitReached = false;
  }
  return next;
};

const to = (current: State, destination: number): State => {
  if (
    destination < 1 ||
    (current.pageLimit && destination > current.pageLimit)
  ) {
    return current;
  } else {
    current.limitReached = false;
    return { ...current, page: destination };
  }
};

const pageReducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case "next":
      return nextPage(state);
      break;
    case "prev":
      return prevPage(state);
      break;
    case "to":
      return to(state, action.page);
      break;
  }
};

export function usePaginate(startPage = 1, limit?: number) {
  const [page, dispatchPage] = useReducer(pageReducer, {
    page: startPage,
    limitReached: false,
    pageLimit: limit,
  });

  return { page, dispatchPage };
}
