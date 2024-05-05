// post
// comment
// user

// POST { id: 'a', title: 'post a' }
// COMMENT { id: 'aa', text: 'comment aa', postId: 'a', userId: 'aaa' }
// USER { id: 'aaa', name: 'Roman' }

// You can choose the right parameters, these are written as examples.

type TPost = {
  id: number;
  userId: TUser["id"];
  title: string;
  comments: TComment["id"][];
};

type TUser = {
  id: number;
  name: string;
  mail: string;
  comments: TComment["id"][];
};

type TComment = {
  id: number;
  userId: TUser["id"];
  postId: TPost["id"];
  text: string;
};

let posts: TPost[] = [
  // { id: 1, userId: 1, title: "post 1", comment: [] },
  // { id: 2, userId: 2, title: "post 2", comment: [] },
  // { id: 3, userId: 3, title: "post 3", comment: [] },
  // { id: 4, userId: 4, title: "post 4", comment: [] },
  // { id: 5, userId: 5, title: "post 5", comment: [] },
];

let users: TUser[] = [
  { id: 1, name: "Artyom", mail: "123@mail.ru", comments: [] },
  { id: 2, name: "Artyom", mail: "234@mail.ru", comments: [] },
  { id: 3, name: "Artyom", mail: "345@mail.ru", comments: [] },
  { id: 4, name: "Artyom", mail: "456@mail.ru", comments: [] },
  { id: 5, name: "Artyom", mail: "567@mail.ru", comments: [] },
];

let comments: TComment[] = [];

function createPost(userId: TUser["id"], title: TPost["title"]): void {
  const lastPostId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;

  posts.push({ id: lastPostId, userId, title, comments: [] });
}

function deletePost(postId: TPost["id"]): void {
  const foundPostIndex = posts.findIndex((post) => post.id == postId);

  if (foundPostIndex == -1) {
    return;
  } else {
    posts.splice(foundPostIndex, 1);
  }
}

function leaveComment(
  postId: TPost["id"],
  userId: TUser["id"],
  text: TComment["text"]
): void {
  const foundPost = posts.find((post) => post.id == postId);
  if (!foundPost) {
    return;
  }

  const foundUser = users.find((user) => user.id == userId);
  if (!foundUser) {
    return;
  }

  const lastCommentId =
    comments.length > 0 ? comments[comments.length - 1].id + 1 : 1;
  const comment = {
    id: lastCommentId,
    userId,
    text,
    postId,
  };

  comments.push(comment);
  foundPost.comments.push(comment.id);
  foundUser.comments.push(comment.id);
}

function deleteComment(commentId: TComment["id"]): void {
  const foundCommentIndex = comments.findIndex(
    (comment) => comment.id == commentId
  );
  if (foundCommentIndex == -1) {
    return;
  }

  const { postId, userId } = comments[foundCommentIndex];

  const foundPost = posts.find((post) => post.id == postId);
  if (!foundPost) {
    return;
  }
  const commentIndexInPost = foundPost.comments.indexOf(commentId);
  if (commentIndexInPost == -1) {
    return;
  }
  foundPost.comments.splice(commentIndexInPost, 1);

  const foundUser = users.find((user) => user.id == userId);
  if (!foundUser) {
    return;
  }

  const commentIndexInUser = foundUser.comments.indexOf(commentId);
  if (commentIndexInUser == -1) {
    return;
  }
  foundUser.comments.splice(commentIndexInUser, 1);

  comments.splice(foundCommentIndex, 1);
}

function getUserComments(userId: TUser["id"]): TComment[] | undefined {
  const foundUserIndex = users.findIndex((user) => user.id == userId);

  if (foundUserIndex == -1) {
    return;
  } else {
    return comments.filter((comment) => comment.userId == userId);
  }
}

createPost(1, "Hello World!");
leaveComment(1, 1, "Hello comment");
leaveComment(1, 2, "Hello comment");

console.log(getUserComments(1));
deleteComment(1);
console.log(getUserComments(1));

console.log(JSON.stringify(posts, null, 2));
console.log(JSON.stringify(comments, null, 2));
