import { actionsEnums } from "../common/actionsEnums";
import { MemberEntity } from "../model/member";
import { memberAPI } from "../api/member";

export const memberScroll = () => ({
  type: actionsEnums.MEMBER_REQUEST_COMPLETED
});

export const memberRequestCompleted = (members: MemberEntity[]) => ({
  type: actionsEnums.MEMBER_REQUEST_COMPLETED,
  payload: members
});

export const memberRequestInitialize = () => ({
  type: actionsEnums.MEMBER_REQUEST_COMPLETED
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
  dispatcher(memberRequestInitialize());
  promise.then(data =>
    dispatcher(memberRequestCompleted(data))
      .catch((error: Error) => dispatcher(memberRequestError(error)))
      .finally(() => dispatcher(memberRequestFinally()))
  );

  return promise;
};
