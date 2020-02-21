import { actionsEnums } from "../common/actionsEnums";
import { MemberEntity } from "../model/member";
import { memberAPI } from "../api/member";

export const memberRequestCompleted = (
  members: MemberEntity[],
  page: number
) => ({
  type: actionsEnums.MEMBER_REQUEST_COMPLETED,
  payload: { members, page }
});

export const memberRequestInitialize = (page: number) => ({
  type: actionsEnums.MEMBER_REQUEST_COMPLETED,
  payload: page
});
export const memberRequestError = (error: Error) => ({
  type: actionsEnums.MEMBER_REQUEST_ERROR,
  payload: error
});

export const memberRequestFinally = () => ({
  type: actionsEnums.MEMBER_REQUEST_FINALLY
});

export const memberRequest = (page: number) => dispatcher => {
  const promise = memberAPI.getAllMembers("lemoncode");
  dispatcher(memberRequestInitialize(page));
  promise.then(data =>
    dispatcher(memberRequestCompleted(data, page))
      .catch((error: Error) => dispatcher(memberRequestError(error)))
      .finally(() => dispatcher(memberRequestFinally()))
  );

  return promise;
};
