import { actionsEnums } from "../common/actionsEnums";
import { MemberEntity } from "../model/member";

export interface memberState {
  members: MemberEntity[];
  noEncontrado: boolean;
  pageCount: number;
  hasMore: boolean;
  isFetchingMore: boolean;
  fetchingFirst: boolean;
  error: boolean;
}

export const memberReducer = (state: memberState, action) => {
  switch (action.type) {
    case actionsEnums.MEMBER_REQUEST_COMPLETED:
      return handleMemberRequestCompletedAction(state, action.payload);
    case actionsEnums.MEMBER_REQUEST_INIT:
      return handleMemberRequestInit(state, action.payload);
    case actionsEnums.MEMBER_REQUEST_ERROR:
      return handleMemberRequestError(state, action.payload);
    case actionsEnums.MEMBER_REQUEST_FINALLY:
      return handleMemberRequestFinally(state);
    case actionsEnums.MEMBER_REQUEST_SCROLL:
      return handleMemberRequestScroll(state);
  }

  return state;
};

const handleMemberRequestCompletedAction = (
  state: memberState,
  { members, page }: { members: MemberEntity[]; page: number }
): memberState => {
  if (members.length !== 0) {
    if (page === 1) {
      return {
        ...state,
        members: page === 1 ? members : [...state.members, ...members],
        pageCount: state.pageCount + 1
      };
    }
  } else {
    return { ...state, hasMore: false };
  }
};

const handleMemberRequestInit = (
  state: memberState,
  page: number
): memberState => {
  return {
    ...state,
    error: false,
    noEncontrado: false,
    hasMore: page === 1,
    fetchingFirst: page === 1
  };
};

const handleMemberRequestError = (
  state: memberState,
  error: Error
): memberState => {
  if (error.message === "Not Found") {
    return {
      ...state,
      noEncontrado: true,
      members: []
    };
  } else {
    return {
      ...state,
      error: true
    };
  }
};
const handleMemberRequestFinally = (state: memberState): memberState => ({
  ...state,
  fetchingFirst: false,
  isFetchingMore: false
});

const handleMemberRequestScroll = (state: memberState): memberState => ({
  ...state,
  isFetchingMore: true
});
