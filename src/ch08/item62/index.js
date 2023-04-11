class Chart {
    indices: number[]; // 잘못된 타입
}

// noImplicitAny 설정하지 않으면 오류발생하지 않음
// 설정 시에는 오류 발생
function getRanfes() {
    for (const r of this.indices) {
        const low = r[0];
        //     ^?
        const high = r[1];
        //     ^?
    }
}