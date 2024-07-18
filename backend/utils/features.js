import { userSocketIdsMap } from "../index.js"


const getSockets = (users = []) => {
    const sockets = users.map((user) => userSocketIdsMap.get(user.toString()));
  
    return sockets;
  };


const emitEvent = (req ,event, users, data) => {
    const io = req.app.get("io");  //we have set the instance of io in index.js
    const usersSocketIDS = getSockets(users);

    io.to(usersSocketIDS).emit(event, data);
}



const getBase64 = (file) =>
{
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
}

export {
  getSockets,
  emitEvent,
  getBase64
}