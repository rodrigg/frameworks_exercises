import { actionsEnums } from "../common/actionsEnums";
import { MemberEntity } from "../model/member";
import { memberAPI } from "../api/member";
import { FiltroMembers } from "../model/filtromembers.vm";

export const memberRequestCompleted = (
  members: MemberEntity[],
  page: number
) => ({
  type: actionsEnums.MEMBER_REQUEST_COMPLETED,
  payload: { members, page }
});
export const memberByNameRequestCompleted = (
  member: MemberEntity
) => ({
  type: actionsEnums.MEMBER_BY_NAME_REQUEST_COMPLETED,
  payload: member
});
const memberRequestInitialize = (page: number) => ({
  type: actionsEnums.MEMBER_REQUEST_INIT,
  payload: page
});
const memberRequestError = (error: Error) => ({
  type: actionsEnums.MEMBER_REQUEST_ERROR,
  payload: error
});

const memberRequestFinally = () => ({
  type: actionsEnums.MEMBER_REQUEST_FINALLY
});

export const memberScroll = (isFetchingScroll: boolean) => ({
  type: actionsEnums.MEMBER_REQUEST_SCROLL,
  payload: isFetchingScroll
});

export const memberChangeFiltro = (name: keyof FiltroMembers, value: any) => ({
  type: actionsEnums.MEMBER_CHANGE_FILTRO,
  payload: { name, value }
});

export const memberRequest = (page: number, nameOrganization: string) => dispatcher => {
  dispatcher(memberRequestInitialize(page));
  const promise = memberAPI.getAllMembers(nameOrganization, page).then(data =>
    dispatcher(memberRequestCompleted(data, page))
  ).catch((error: Error) => dispatcher(memberRequestError(error)))
    .finally(() => dispatcher(memberRequestFinally()));

  return promise;
};



export const memberByName = (name: string) => dispatcher => {
  const promise = memberAPI.getMemberByName(name).then(data =>
    dispatcher(memberByNameRequestCompleted(data))
  )

  return promise;
};
