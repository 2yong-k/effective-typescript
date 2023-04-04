{
    interface ABC {
        a: string;
        b: string;
        c: string;
    }

    function foo(abc: ABC) {
        for (const [k, v] of Object.entries(abc)) {
            k;
        //  ^?
            v;
        //  ^?
        }
    }

    // function foo(abc: ABC) {
    //   let k: keyof ABC;
    //   for (k in abc) {
    //     const v = abc[k];
    //     //    ^?
    //   }
    // }
}

interface ABC {
  a: string;
  b: string;
  c: string;
}

function foo(abc: ABC) {
  for (const [k, v] of Object.entries(abc)) {
    k;
    v;
  }
}