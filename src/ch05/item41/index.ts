// any[] 타입이 number를 넣는 순간, number[]로 변함.
function range(start: number, limit: number) {
    const out = [];
    //     ^?
    for (let i=start; i<limit; i++) {
        out.push(i);
        //^?
    }
    return out;
    //      ^?
}

{
    let val;
    //  ^?
    if (Math.random() < 0.5) {
        val = /hello/;
        val
        //^?
    } else {
        val = 12;
        val
        //^?
    }
    val
    //^?
}

{
    let val=null;
    //  ^?
    try {
        somethingDangerous();
        val = 12;
        val
        //^?
    } catch (e) {
        console.warn('alas!');
    }
    val
    //^?
}

{
    let val: any;
    if (Math.random() < 0.5) {
        val = /hello/;
        val
    }
}

{
    function range(start: number, limit: number) {
        const out = [];
        if (start === limit) {
            return out;
        }
        for (let i = start; i < limit; i++) {
            out.push(i);
        }
        return out;
    }
}