import { userSocketIdsMap } from "../index.js"


export const getSockets = (users = []) => {
    const sockets = users.map((user) => userSocketIdsMap.get(user.toString()));
  
    return sockets;
  };