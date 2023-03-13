// 페이지의 상태를 나타내는 인터페이스
interface State {
    pageText: string;
    isLoading: boolean;
    error?: string;
}

{
    // 필드를 전부 고려해서 상태 표시를 분기
    function renderPage(state: State) {
        if (state.error) {
            return `Error! Unable to load ${currentPage}: ${state.error}`
            //                                                      ^?
        } else if (state.isLoading) {
            return `Loading ${currentPage}...`;
        }
        return `<h1>${currentPage}</h1>\n${state.pageText}`;
    }

    // 문제 발생: 두 가지 속성이 동시에 정보가 부족하거나 충돌 할 수 있다.
    async function changePage(state: State, newPage: string) {
        state.isLoading = true;
        try {
            const response = await fetch(getUrlForPage(newPage));
            if (!response.ok) {
                throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
            }
            const text = await response.text();
            state.isLoading = false;
            state.pageText = text;
        } catch (e) {
            state.error = '' + e;
        }
    }
}


// 페이지의 상태를 나타내는 인터페이스 무효한 상태 개선
interface RequestPending {
    state: 'pending';
}
interface RequestError {
    state: 'error';
    error: string;
}
interface RequestSuccess {
    state: 'ok';
    pageText: string;
}
type RequestState = RequestPending | RequestError | RequestSuccess;

interface StateImp {
    currentPage: string;
    requests: {[page: string]: RequestState};
}


// 모호함은 완전히 사라지고 현재 페이지가 무엇인지 명확하고, 모든 요청은 하나의 상태로 맞아 떨어진다.
{
    function renderPage(state: StateImp) {
        const {currentPage} = state;
        const requestState = state.requests[currentPage];
        switch (requestState.state) {
            case 'pending': return `Loading ${currentPage}...`;
            case 'error': return `Error! Unable to load ${currentPage}: ${requestState.error}`;
            case 'ok': return `<h1>${currentPage}</h1>\n${requestState.pageText}`;
        }
    }

    async function changePage(state: StateImp, newPage: string) {
        state.requests[newPage] = {state: 'pending'};
        state.currentPage = newPage;
        try {
            const response = await fetch(getUrlForPage(newPage));
            //      ^?
            if (!response.ok) {
                throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
            }
            const pageText = await response.text();
            state.requests[newPage] = {state: 'ok', pageText};
        } catch (e) {
            state.requests[newPage] = {state: 'error', error: ''+e};
        }
    }
}


// 예제: 에어버스 330 조종석. 두 개의 사이드 스틱은 독립적으로 움직이는 이중 입력 모드 시스템
interface CockpitControls {
    /** 왼쪽 사이드 스틱의 각도, 0 = 중립, + = 앞으로 */
    leftSideStick: number;
    /** 오른쪽 사이드 스틱의 각도, 0 = 중립, + = 앞으로 */
    rightSideStick: number;
}

{
    function getStickSetting(controls: CockpitControls) {
        const {leftSideStick, rightSideStick} = controls;

        // 중립인 경우
        if (leftSideStick === 0) {
            return rightSideStick;
        } else if (rightSideStick === 0) {
            return leftSideStick;
        }

        // 두 스틱이 비슷한 값인 경우. 각도를 평균
        if (Math.abs(leftSideStick - rightSideStick) < 5) {
            return (leftSideStick + rightSideStick) / 2;
        }

        // 두 스틱의 각도가 매우 다른 경우 오류
    }
}

// 예제 개선
interface CockpitControlsImp {
    /** 스틱의 각도, 0 = 중립, + = 앞으로 */
    stickAngle: number;
}
