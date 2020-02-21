import { MemberEntity, createDefaultMemberEntity } from "../model/member";

class MemberAPI {
  // Just return a copy of the mock data
  getAllMembers(
    organizationName: string,
    page: number
  ): Promise<MemberEntity[]> {
    const gitHubMembersUrl: string = `https://api.github.com/orgs/${organizationName}/members?page=${page}`;

    return fetch(gitHubMembersUrl)
      .then(response => this.checkStatus(response))
      .then(response => this.parseJSON(response))
      .then(data => this.resolveMembers(data));
  }

  getMemberByName(username: string): Promise<MemberEntity> {
    const gitHubMembersUrl: string = `https://api.github.com/users/${username}`;

    return fetch(gitHubMembersUrl)
      .then(response => this.checkStatus(response))
      .then(response => this.parseJSON(response))
      .then(data => this.resolveAMember(data));
  }

  private checkStatus(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      let error = new Error(response.statusText);
      throw error;
    }
  }

  private parseJSON(response: Response): any {
    return response.json();
  }

  private resolveMembers(data: any): Promise<MemberEntity[]> {
    const members = data.map(this.mapAMember);
    return Promise.resolve(members);
  }

  private resolveAMember(data: any): Promise<MemberEntity> {
    const member = this.mapAMember(data);
    return Promise.resolve(member);
  }

  private mapAMember(gitHubMember: any): MemberEntity {
    var member: MemberEntity = createDefaultMemberEntity();
    member.id = gitHubMember.id;
    member.login = gitHubMember.login;
    member.avatar_url = gitHubMember.avatar_url;
    return member;
  }
}

export const memberAPI = new MemberAPI();
