import React, { useReducer } from "react";

type Action =
  | { type: "next" }
  | { type: "prev" }
  | { type: "to"; page: number }
  | { type: "limitSwitch"; direction: Limit };

type Limit = "bottom" | "top" | "none";

type State = {
  page: number;
  limitReached: Limit;
  pageLimit?: number;
};

const nextPage = (current: State): State => {
  if (current.page === current.pageLimit) {
    return current;
  }
  const next = { ...current, page: current.page + 1 };
  if (next.page === current.pageLimit) {
    next.limitReached = "top";
  } else {
    next.limitReached = "none";
  }
  return next;
};

const prevPage = (current: State): State => {
  if (current.page === 1) {
    return { ...current, limitReached: "bottom" };
  }
  const next = { ...current, page: current.page - 1 };
  if (next.page === 1) {
    next.limitReached = "bottom";
  } else {
    next.limitReached = "none";
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
    current.limitReached = "none";
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
    case "limitSwitch":
      return { ...state, limitReached: action.direction };
      break;
  }
};

export function usePaginate(startPage = 1, limit?: number) {
  const [page, dispatchPage] = useReducer(pageReducer, {
    page: startPage,
    limitReached: startPage === 1 ? "bottom" : "none",
    pageLimit: limit,
  });

  return { page, dispatchPage };
}
