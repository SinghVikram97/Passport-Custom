let User = [
  {
    id: 123,
    username: "vikram.bedi98@gmail.com",
    password: "test1"
  },
  {
    id: 124,
    username: "singh",
    password: "test2"
  },
  {
    id: 125,
    username: "bedi",
    password: "test3"
  },
  {
    id: 126,
    username: "random",
    password: "test4"
  },
  {
    id: 127,
    username: "user",
    password: "test5"
  }
];

module.exports = { User };

// DB
/*
  User Table-> id,username,password,phonenumber
  Document Table-> id,foreignKey(User.id),documents
  Details Table->id,foreignKey(User.id),details like region and dept
*/
