const makeName = (x, y) => {
  return [x, y].sort().join('_');
}

const Query = {
  chatBox: async (parent, { name1 , name2 }, { ChatBoxModel }) => {
    const name = makeName(name1, name2);
    console.log(name);
    let box = await ChatBoxModel.findOne({ name });
    if (!box) {
      box = await new ChatBoxModel({ name }).save();
    }
    return box;
  }
}

export { Query as default };

// const Query = {
//   users(parent, args, { db }, info) {
//     if (!args.name) {
//       return db.users;
//     }

//     return db.users.filter((user) => {
//       return user.name.toLowerCase().includes(args.name.toLowerCase());
//     });
//   },
//   posts(parent, args, { db }, info) {
//     if (!args.query) {
//       return db.posts;
//     }

//     return db.posts.filter((post) => {
//       const isTitleMatch = post.title
//         .toLowerCase()
//         .includes(args.query.toLowerCase());
//       const isBodyMatch = post.body
//         .toLowerCase()
//         .includes(args.query.toLowerCase());
//       return isTitleMatch || isBodyMatch;
//     });
//   },
//   comments(parent, args, { db }, info) {
//     return db.comments;
//   },
//   me() {
//     return {
//       id: '123098',
//       name: 'Mike',
//       email: 'mike@example.com',
//     };
//   },
//   post() {
//     return {
//       id: '092',
//       title: 'GraphQL 101',
//       body: '',
//       published: false,
//     };
//   },
// };

// export { Query as default };
