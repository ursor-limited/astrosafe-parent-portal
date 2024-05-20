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
  lock?: ILock;
  joinCode: string;
  teacherCode: string;
  deviceLimit?: number;
  expirationDate?: string;
  free?: boolean;
}

export interface ILock {
  devices: string[];
  endTime: string;
}

export type ContentAgeMode = "trailblazer" | "explorer" | "adventurer";

export interface IDevice {
  id: string;
  name: string;
  lastOnline?: string;
  history: { studentId: string; startTime: string; endTime?: string }[];
  connected?: "approved" | "denied";
  reviewerId?: string;
  type: "chrome" | "ipad";
  contentAgeMode: ContentAgeMode;
}

export interface ISession {
  id: string;
  name: string;
  students: string[];
  joinCode: string;
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
  static async checkTeacherExists(email: string) {
    return post("teachers/checkTeacherExists", { email }).then(
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

  static async updateDeviceAge(deviceId: string, mode: ContentAgeMode) {
    return patch(`schools/devices/${deviceId}/contentAgeMode`, { mode }).then(
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
}

export default BrowserApiController;
