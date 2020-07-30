const uuidv4 = require("uuid/v4");

// createUser
const createUser = ({ name = "" } = {}) => ({
  id: uuidv4(),
  name,
});

// createMessage
const createMessage = ({ message = "", sender = "" } = {}) => ({
  id: uuidv4(),
  time: getTime(new Date(Date.now())),
  message,
  sender,
});

// createChat
const createChat = ({
  messages = [],
  name = "Community",
  users = [],
} = {}) => ({
  id: uuidv4(),
  name,
  messages,
  users,
  typingUsers: [],
});

// utility fun => getTime to get 24-Hr time
// returns hours and minutes only
const getTime = (date) => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};
