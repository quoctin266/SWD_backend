export interface IPermission {
  name: string;
  description?: string;
  apiPath: string;
  method: string;
}

export interface IAction {
  action: string;
  method: string;
}

const actionArr: IAction[] = [
  {
    action: 'CREATE',
    method: 'POST',
  },
  {
    action: 'READ',
    method: 'GET',
  },
  {
    action: 'UPDATE',
    method: 'PATCH',
  },
  {
    action: 'DELETE',
    method: 'DELETE',
  },
];

export const generatePermissions = (permissions: string[]): IPermission[] => {
  let result: IPermission[] = [];
  permissions.forEach((permission) => {
    actionArr.forEach((action) => {
      const permissionObj: IPermission = {
        name: `${permission.toUpperCase()}_${action.action.toUpperCase()}`,
        description: `Permission to ${action.action.toLowerCase()} ${permission.toLowerCase()} data`,
        apiPath: `/api/v1/${permission.toLowerCase()}s`,
        method: action.method.toUpperCase(),
      };
      result.push(permissionObj);
    });
  });
  return result;
};
