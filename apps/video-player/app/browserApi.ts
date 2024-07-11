import { IDevice } from "./filters/[id]/FilterPageContents";

export interface ISchool {
  id: string;
  name: string;
  email?: string;
  emailDomain?: string;
  website?: string;
  address?: string;
  postcode?: string;
  country?: string;
  isDeleted: boolean;
  devices: IDevice[];
  joinCode: string;
  teacherCode: string;
  ownerId: string;
  deviceLimit?: number;
  teacherLimit: number;
  expirationDate?: string;
  free?: boolean;
}

export interface IChannel_DEPRECATED {
  id: string;
  creatorId?: string;
  schoolId: string;
  title: string;
  nLinks: number;
  nStacks: number;
  starter?: boolean;
  color: string;
}

export interface IStack {
  id: string;
  creatorId?: string;
  schoolId: string;
  channelId: string;
  title: string;
  description?: string;
  imageUrls: string[];
  backgroundColors: string[];
  createdAt: string;
  nLinks: number;
}

const BACKEND_URLS = {
  development: "http://localhost:8080",
  preview:
    "https://058vkvcapb.execute-api.eu-west-1.amazonaws.com/dev/dev-ursor-express-serverless",
  production: "https://xdt8565hsf.execute-api.eu-west-1.amazonaws.com/prod/api",
};

export const getAbsoluteUrl = (url: string) => `https://${url}`;

const get = (route: string) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`
  );

//@ts-ignore
const post = (route: string, body?: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    }
  );

const patch = (route: string, body: any) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

const dellete = (route: string) =>
  fetch(
    //@ts-ignore
    `${BACKEND_URLS[process.env.NEXT_PUBLIC_VERCEL_ENV]}/${route}`,
    {
      method: "DELETE",
    }
  );

class BrowserApiController {
  static async getSchool(id: string) {
    return get(`schools/${id}`).then((response: any) => response.json());
  }
  static async checkTeacherExists(email: string, name?: string) {
    return post("teachers/checkTeacherExists", { email, name }).then(
      (response: any) => response.json()
    );
  }
  static async startLock(
    schoolId: string,
    deviceIds: string[],
    endTime: string
  ) {
    return patch(`schools/${schoolId}/startLock`, {
      deviceIds,
      endTime,
    }).then((response: any) => response.json());
  }
  static async endLock(schoolId: string) {
    return patch(`schools/${schoolId}/endLock`, {}).then((response: any) =>
      response.json()
    );
  }
  static async approveApprovalRequest(requestId: string, reviewerId: string) {
    return post(`schools/approvalRequests/${requestId}/approve`, {
      reviewerId,
    }).then((response: any) => response.json());
  }

  static async denyApprovalRequest(requestId: string, reviewerId: string) {
    return post(`schools/approvalRequests/${requestId}/deny`, {
      reviewerId,
    }).then((response: any) => response.json());
  }

  static async approveDevice(deviceId: string, reviewerId: string) {
    return post(`schools/devices/${deviceId}/approve`, {
      reviewerId,
    }).then((response: any) => response.json());
  }

  static async rejectDevice(deviceId: string, reviewerId: string) {
    return post(`schools/devices/${deviceId}/reject`, {
      reviewerId,
    }).then((response: any) => response.json());
  }

  static async updateDeviceName(deviceId: string, name: string) {
    return patch(`schools/devices/${deviceId}/name`, { name }).then(
      (response: any) => response.json()
    );
  }

  static async getTeachersInSchool(schoolId: string) {
    return get("schools/" + schoolId + "/teachers").then((response: any) =>
      response.json()
    );
  }

  static async getHistoryForDevice(deviceId: string) {
    return get(`schools/devices/${deviceId}/history`).then((response: any) =>
      response.json()
    );
  }

  static async getLatestBrowsingState(deviceId: string) {
    return get(`schools/${deviceId}/browsingState`).then((response: any) => {
      return response.json();
    });
  }

  static async getLatestBrowsingStates(schoolId: string) {
    return get(`schools/${schoolId}/latestBrowsingStates`).then(
      (response: any) => {
        return response.json();
      }
    );
  }

  static async getDomainsWithLinks(
    id: string,
    page: number,
    sortColumn: string,
    sortDirection: "asc" | "desc",
    searchValue: string
  ) {
    return get(
      `schools/${id}/domainsWithLinks?${new URLSearchParams({
        page: page.toString(),
        sortColumn,
        sortDirection,
        searchValue,
      })}`
    ).then((response: any) => {
      return response.json();
    });
  }

  static async getApprovalRequestsInSchool(schoolId: string) {
    return get(`schools/${schoolId}/approvalRequests`).then((response: any) => {
      return response.json();
    });
  }

  static async getDomainLinks(schoolId: string, domain: string) {
    return get(`schools/${schoolId}/domainLinks?domain=${domain}`).then(
      (response: any) => {
        return response.json();
      }
    );
  }

  static async deleteDomain(schoolId: string, domainId: string) {
    return dellete(`schools/${schoolId}/domains/${domainId}`);
  }

  static async deleteLink(id: string) {
    return dellete(`links/${id}`);
  }

  static async deleteStack(id: string) {
    return dellete(`stacks/${id}`);
  }

  static async deletePlatform(id: string) {
    return dellete(`platform/${id}`);
  }

  static async getLinksInSchool(schoolId: string) {
    return get(`schools/${schoolId}/links`).then((response: any) => {
      return response.json();
    });
  }

  static async getStacksInSchool(schoolId: string) {
    return get(`schools/${schoolId}/stacks`).then((response: any) => {
      return response.json();
    });
  }

  static async getChannelsInSchool(schoolId: string) {
    return get(`schools/${schoolId}/channels`).then((response: any) => {
      return response.json();
    });
  }

  static async updateLink(id: string, update: any) {
    return patch(`links/${id}`, update).then((response: any) => {
      return response.json();
    });
  }

  static async updateChannel(id: string, update: any) {
    return patch(`channel/${id}`, update).then((response: any) => {
      return response.json();
    });
  }

  static async updateStack(id: string, update: any) {
    return patch(`stacks/${id}`, update).then((response: any) => {
      return response.json();
    });
  }

  static async createLink(details: any) {
    return post(`links`, details).then((response: any) => {
      return response.json();
    });
  }

  static async unStackifyLink(id: string) {
    return post(`links/${id}/unStackify`).then((response: any) => {
      return response.json();
    });
  }

  static async createStack(details: any) {
    return post("stacks", details).then((response: any) => {
      return response.json();
    });
  }

  static async createChannel(
    title: string,
    color: string,
    schoolId: string,
    creatorId: string
  ) {
    return post("channels", {
      title,
      color,
      schoolId,
      creatorId,
    }).then((response: any) => {
      return response.json();
    });
  }

  static async updatePlatform(platformId: string, update: any) {
    return patch(`platform/${platformId}`, update).then((response: any) => {
      return response.json();
    });
  }

  static async createPlatform(details: any) {
    return post(`platform`, details).then((response: any) => {
      return response.json();
    });
  }

  static async createTemporarySchool(schoolName: string, teacherId: string) {
    return post(`schools/temporarySchool`, { schoolName, teacherId }).then(
      (response: any) => {
        return response.json();
      }
    );
  }

  static async changeSchool(teacherId: string, schoolId: string) {
    return post(`teachers/${teacherId}/changeSchool`, {
      schoolId,
    }).then((response: any) => {
      return response.json();
    });
  }

  static async updateTeacher(teacherId: string, update: any) {
    return patch(`teachers/${teacherId}`, update).then((response: any) => {
      return response.json();
    });
  }

  static async getTeacherApprovalRequests(schoolId: string) {
    return get(`schools/${schoolId}/teachers/approvalRequests`).then(
      (response: any) => {
        return response.json();
      }
    );
  }

  static async inviteTeacher(email: string, inviterId: string) {
    return post(`teachers/invite`, {
      email,
      inviterId,
    }).then((response: any) => {
      return response.json();
    });
  }

  static async cancelTeacherJoiningRequest(teacherId: string) {
    return post(`teachers/${teacherId}/denyJoiningRequest`).then(
      (response: any) => {
        return response.json();
      }
    );
  }

  static async approveTeacherJoiningRequest(
    teacherId: string,
    reviewerId: string
  ) {
    return post(`teachers/${teacherId}/approveJoiningRequest`, {
      reviewerId,
    }).then((response: any) => {
      return response.json();
    });
  }

  static async replyToInvitation(teacherId: string, accept: boolean) {
    return post(`teachers/${teacherId}/replyToInvitation`, { accept }).then(
      (response: any) => {
        return response.json();
      }
    );
  }

  static async getAppsInSchool(schoolId: string) {
    return get(`schools/${schoolId}/platforms`).then((response: any) => {
      return response.json();
    });
  }

  static async duplicateChannel(id: string) {
    return post(`channels/${id}/duplicate`).then((response: any) => {
      return response.json();
    });
  }

  static async deleteChannel(id: string) {
    return dellete(`channels/${id}`);
  }

  static async duplicateLink(id: string, creatorId: string) {
    return post(`links/${id}/duplicate`, {
      creatorId,
    }).then((response: any) => {
      return response.json();
    });
  }

  static async duplicateStack(id: string) {
    return post(`stacks/${id}/duplicate`).then((response: any) => {
      return response.json();
    });
  }

  static async verifyTeacherCode(teacherCode: string) {
    return post(`schools/verifyTeacherCode`, {
      teacherCode,
    }).then((response: any) => {
      return response.json();
    });
  }

  static async createTeacher(email: string, name: string) {
    return post("teachers", { email, name }).then((response: any) => {
      return response.json();
    });
  }

  static async getTeacher(teacherId: string) {
    return get("teachers/" + teacherId).then((response: any) => {
      return response.json();
    });
  }

  static async unFreeifySchool(id: string) {
    return post(`schools/${id}/unFreeify`).then((response: any) => {
      return response.json();
    });
  }

  static async updateSchool(id: string, update: any) {
    return patch(`schools/${id}`, update).then((response: any) => {
      return response.json();
    });
  }

  static async deleteTeacher(teacherId: string) {
    return dellete(`teachers/${teacherId}`);
  }

  static async getUserSchoolOwnerEmail(email: string) {
    return post(`schools/owner/email`, { email }).then((response: any) => {
      return response.json();
    });
  }

  static async addDummyVideoChannel() {
    return post(`videoChannel/addDummy`);
  }
}

export default BrowserApiController;
