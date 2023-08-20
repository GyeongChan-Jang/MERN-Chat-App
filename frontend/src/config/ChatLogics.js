export const getSender = (loggedUser, users) => {
  // 보내는 사람이 로그인한 유저와 같으면 받는 사람을 리턴하고, 그렇지 않으면 보내는 사람을 리턴한다.
  return users[0]?._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]?._id === loggedUser._id ? users[1] : users[0];
};
