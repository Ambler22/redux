void (function () {
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

  let posts: readonly TPost[] = [
    { id: 1, userId: 1, title: "post 1", comments: [] },
    { id: 2, userId: 2, title: "post 2", comments: [] },
    { id: 3, userId: 3, title: "post 3", comments: [] },
    { id: 4, userId: 4, title: "post 4", comments: [] },
    { id: 5, userId: 5, title: "post 5", comments: [] },
  ];

  let users: readonly TUser[] = [
    { id: 1, name: "Artyom", mail: "123@mail.ru", comments: [] },
    { id: 2, name: "Roman", mail: "234@mail.ru", comments: [] },
    { id: 3, name: "Mikhail", mail: "345@mail.ru", comments: [] },
    { id: 4, name: "Jora", mail: "456@mail.ru", comments: [] },
    { id: 5, name: "Pavel", mail: "567@mail.ru", comments: [] },
  ];

  let comments: readonly TComment[] = [
    { id: 2, userId: 2, text: "hello world", postId: 3 },
  ];

  // immutable array methods - they do not change the array - they create a copy
  // concat
  // map
  // filter
  // slice
  // [...]
  // toSpliced

  function createPost(
    posts: readonly TPost[],
    userId: TUser["id"],
    title: TPost["title"]
  ): TPost[] {
    let newPosts = [...posts];

    const lastPostId =
      newPosts.length > 0 ? newPosts[newPosts.length - 1].id + 1 : 1;
    newPosts.push({ id: lastPostId, userId, title, comments: [] });

    return newPosts;
  }

  function leaveComment(
    posts: readonly TPost[],
    users: readonly TUser[],
    comments: readonly TComment[],
    postId: TPost["id"],
    userId: TUser["id"],
    text: TComment["text"]
  ) {
    // Создаем новый список комментариев
    let newComments = [...comments];

    // Генерируем идентификатор для нового комментария
    const lastCommentId =
      newComments.length > 0 ? newComments[newComments.length - 1].id + 1 : 1;
    const comment = { id: lastCommentId, userId, text, postId };

    // Добавляем новый комментарий в список
    newComments.push(comment);

    // Создаем глубокие копии массивов posts и users
    const newPosts = JSON.parse(JSON.stringify(posts));
    const newUsers = JSON.parse(JSON.stringify(users));

    // Находим и обновляем пост в новом массиве posts
    const postIndex = newPosts.findIndex((post: TPost) => post.id === postId);
    if (postIndex !== -1) {
      if (!newPosts[postIndex].comments) {
        newPosts[postIndex].comments = [];
      }
      newPosts[postIndex].comments.push(lastCommentId);
    }

    // Находим и обновляем пользователя в новом массиве users
    const userIndex = newUsers.findIndex((user: TUser) => user.id === userId);
    if (userIndex !== -1) {
      if (!newUsers[userIndex].comments) {
        newUsers[userIndex].comments = [];
      }
      newUsers[userIndex].comments.push(lastCommentId);
    }

    return { newPosts, newUsers, newComments };
  }

  function deletePost(posts: readonly TPost[], postId: TPost["id"]): TPost[] {
    const arrayWithDeletedElement = posts.filter((post) => post.id != postId);
    return arrayWithDeletedElement;
  }

  function deleteComment(
    comments: readonly TComment[],
    commentId: TComment["id"]
  ) {
    const filteredCommentsArr = comments.filter(
      (comment) => comment.id != commentId
    );
    return filteredCommentsArr;
  }

  function getUserComments(
    users: TUser[],
    userId: TUser["id"]
  ): TComment[] | undefined {
    const foundUserIndex = users.findIndex((user) => user.id == userId);

    if (foundUserIndex == -1) {
      return;
    } else {
      return comments.filter((comment) => comment.userId == userId);
    }
  }

  // write all the mutating functions, they now have to accept old state as READONLY parameter and return a copy of the state with modifications

  const qwe = leaveComment(posts, users, comments, 2, 3, "new comment! Hello!");

  getUserComments(qwe.newUsers, 3);
  console.log(qwe);
})();
