// strickNullChecks 설정을 켜둘 경우 문제점
// undefined가 있으면 할당 불가
{
  function extent(nums: number[]) {
    let min, max;
    for (const num of nums) {
      if (!min) {
        min = num;
        max = num;
      } else {
        min = Math.min(min, num);
        max = Math.max(max, num);
        //              ^?
      }
    }
    return [min, max];
    //      ^?
  }

  const [min, max] = extent([0, 1, 2]);
  const span = max - min;
  //            ^?
}

// min과 max를 한 객체 안에 넣고 null 체크
{
  function extent(nums: number[]) {
    let result: [number, number] | null = null;
    for (const num of nums) {
      if (!result) {
        result = [num, num];
      } else {
        result = [Math.min(num, result[0]), Math.max(num, result[1])];
      }
    }
    return result;
  }

  // null 아님 단언(!)을 사용하면 값을 얻을 수 있다.
      const [min, max] = extent([0,1,2])!;
      const span = max - min;

  // if 구문으로도 체크 가능
  const range = extent([0, 1, 2]);
  if (range) {
    const [min, max] = range;
    const span = max - min;
  }
}

// 오류 발생: null과 null값이 아닌 값을 섞어서 사용 시
{
    class UserPosts {
        user: UserInfo | null;
        posts: Post[] | null;

        constructor() {
            this.user = null;
            this.posts = null;
        }

        async init(userId: string) {
            return Promise.all([
                async () => this.user = await fetchUser(userId),
                async () => this.posts = await fetchPostsForUser(userId)
            ]);
        }

        getUserName() {
            // ...
        }
    }
}

// class 설계 개선: null이 안되도록
{
    class UserPosts {
        user: UserInfo;
        posts: Post[];

        constructor(user: UserInfo, posts: Post[]) {
            this.user = user;
            this.posts = posts;
        }

        static async init(userId: string): Promise<UserPost> {
            const [user, posts] = await Promise.all([
                fetchUser(userId),
                fetchPostsForUser(userId)
            ]);
            return new UserPosts(user, posts);
        }

        getUserName() {
            return this.user.name;
        }
    }
}