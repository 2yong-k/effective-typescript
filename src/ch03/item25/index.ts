{
  {
    fetchURL(url1, function (response1) {
      fetchURL(url2, function (response2) {
        fetchURL(url3, function (response3) {
          console.log(1);
        });
        console.log(2);
      });
      console.log(3);
    });
    console.log(4);
  }

  {
    // promise사용 시 작성과 타입 추론이 쉽다.
    // async/await를 사용 시 간결하고 직관적이며 항상 promise를 반환
    async function fetchPages() {
      const [response1, response2, responnse3] = await Promise.all([
        fetch(url1),
        fetch(url2),
        fetch(url3),
      ]);
    }

    function timeout(millis: number): Promis<never> {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject("timeout"), millis);
      });
    }

    async function fetchWithTimeout(url: string, ms: number) {
        // timeout보다 fetch가 길어지면 에러를 던질 때 사용 가능
      return Promise.race([fetch(url), timeout(ms)]);
    }

    // async 사용
    async function getNumber() {
      //              ^?
      return 42;
    }

    // async와 arrow 함수 사용
    const getNumber2 = async () => 42;
    //    ^?

    // promise 사용
    const getNumber3 = () => Promise.resolve(42);
    //    ^?
  }

  // DO NOT! -> 콜백 함수가 동기로 호출되어 사용하기 어려움
  {
    const _cache: { [url: string]: string } = {};
    function fetchWithCache(url: string, callback: (text: string) => void) {
      if (url in _cache) {
        callback(_cache[url]);
      } else {
        fetchURL(url, (text) => {
          _cache[url] = text;
          callback(text);
        });
      }
    }

    let requestStatus: "loading" | "success" | "error";
    function getUser(userId: string) {
      fetchWithCache(`/user/${userId}`, (profile) => {
        requestStatus = "success";
      });
      requestStatus = "loading";
    }
  }

  // DO!
  {
    const _cache: {[url: string]: string} = {};
    async function fetchWithCache(url: string) {
        if (url in _cache) {
            return _cache[url];
        }
        const response = await fetch(url);
        const text = await response.text();
        _cache[url] = text;
        return text;
    }

    let requestStatus: 'loading' | 'success' | 'error';
    async function getUser(userId: string) {
        requestStatus = 'loading';
        const profile = await fetchWithCache(`/user/${userId}`);
        requestStatus = 'success';
    }
  }

  // promise 반환 시 다른 프로미스로 래핑되지 않음.
  // Promise<Promise<T>> X ////////// Promise<T> O
  {
    async function getJSON(url: string) {
        //          ^?
        const response = await fetch(url);
        const jsonPromise = response.json();
        //      ^?
        return jsonPromise
    }
  }
}
