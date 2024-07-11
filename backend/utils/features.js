import { userSocketIdsMap } from "../index.js"


export const getSockets = (users = []) => {
    const sockets = users.map((user) => userSocketIdsMap.get(user.toString()));
  
    return sockets;
  };


export const emitEvent = (req ,event, users, data) => {
    const io = req.app.get("io");  //we have set the instance of io in index.js
    const usersSocketIDS = getSockets(users);

    io.to(usersSocketIDS).emit(event, data);
}