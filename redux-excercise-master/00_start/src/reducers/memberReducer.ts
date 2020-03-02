import { actionsEnums } from "../common/actionsEnums";
import { MemberEntity, createDefaultMemberEntity } from "../model/member";
import { createDefaultFiltroMiembros, FiltroMembers } from "../model/filtromembers.vm";

export interface memberState {
  members: MemberEntity[];
  noEncontrado: boolean;
  pageCount: number;
  hasMore: boolean;
  isFetchingMore: boolean;
  fetchingFirst: boolean;
  filtroMiembros: FiltroMembers;
  memberByName: MemberEntity;
  error: boolean;
}
const defaultMemberState: memberState = {
  members: [],
  noEncontrado: false,
  pageCount: 0,
  hasMore: true,
  isFetchingMore: false,
  fetchingFirst: false,
  filtroMiembros: createDefaultFiltroMiembros(),
  memberByName: createDefaultMemberEntity(),
  error: false,
};
export const memberReducer = (state: memberState = defaultMemberState, action) => {
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
      return handleMemberRequestScroll(state, action.payload);
    case actionsEnums.MEMBER_CHANGE_FILTRO:
      return memberChangeFiltro(state, action.payload.name, action.payload.value);
    case actionsEnums.MEMBER_BY_NAME_REQUEST_COMPLETED:
      return handleMemberByNameRequestCompletedAction(state, action.payload);

  }

  return state;
};

const handleMemberRequestCompletedAction = (
  state: memberState,
  { members, page }: { members: MemberEntity[]; page: number }
): memberState => {
  if (members && members.length !== 0) {
    return {
      ...state,
      members: page === 1 ? members : [...state.members, ...members],
      pageCount: state.pageCount + 1
    };

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
    hasMore: (page === 1) ? true : state.hasMore,
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

const handleMemberRequestScroll = (state: memberState, isFetchingMore): memberState => ({
  ...state,
  isFetchingMore
});


const memberChangeFiltro = (state: memberState, name: keyof FiltroMembers, value: any): memberState => ({
  ...state, filtroMiembros: { ...state.filtroMiembros, [name]: value }

});



const handleMemberByNameRequestCompletedAction = (
  state: memberState,
  memberByName: MemberEntity
): memberState =>
  ({ ...state, memberByName });



