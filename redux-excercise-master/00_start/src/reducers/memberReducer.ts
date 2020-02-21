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
      return handleMemberRequestInit(state);
    case actionsEnums.MEMBER_REQUEST_ERROR:
      return handleMemberRequestError(state, action.payload);
    case actionsEnums.MEMBER_REQUEST_FINALLY:
      return handleMemberRequestFinally(state);
  }

  return state;
};

const handleMemberRequestCompletedAction = (
  state: memberState,
  members: MemberEntity[]
): memberState => {
  if (members.length !== 0) {
    if (state.pageCount === 1) {
      return {
        ...state,
        members:
          state.pageCount === 1 ? members : [...state.members, ...members],
        pageCount: state.pageCount + 1
      };
    }
  } else {
    return { ...state, hasMore: false };
  }
};

const handleMemberRequestInit = (state: memberState): memberState => {
  return {
    ...state,
    error: false,
    noEncontrado: false,
    hasMore: state.pageCount === 1, //TODO no está en el estado
    fetchingFirst: state.pageCount === 1
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
