const getRecipientName = (users, onlineUser) => {
  return users?.filter((user) => user !== onlineUser);
};

export default getRecipientName;
