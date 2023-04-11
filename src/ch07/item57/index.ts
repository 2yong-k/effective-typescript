{
    // TS code -> JS code 변환 시 비슷
    function addCounter(el: HTMLElement) {
        let clickCount = 0;
        const button = document.createElement('button');
        button.textContent = 'Click me';
        button.addEventListener('click', () => {
            clickCount++;
            button.textContent = `Click me (${clickCount})`;
        });
        el.appendChild(button)l
    }

    addCounter(document.body);

    // addCounter JS code
    function addCounterJS(el) {
        var clickCount = 0;
        var button = document.createElement('button');
        button.textContent = 'Click me';
        button.addEventListener('click', function () {
            clickCount++;
            button.textContent = "Click me (" + clickCount + ")";
        });
        el.appendChild(button);
    }

    addCounter(document.body);
}

{
    // TS code -> JS code 변환 시 매우 복잡
    function addCounter(el: HTMLElement) {
        let clickCount = 0;
        const triviaEl = document.createElement('p');
        const button = document.createElement('button');
        button.textContent = 'Click me';
        button.addEventListener('click', async() => {
            clickCount++;
            const response = await fetch(`http://numbersapi.com/${clickCount}`);
            const trivia = await response.text();
            triviaEl.textContent = trivia;
            button.textContent = `Click me (${clickCount})`;
        });
        el.appendChild(triviaEl);
        el.appendChild(button);
    }

    // addCounter JS code
    function addCounterJS(el) {
        var _this = this;
        var clickCount = 0;
        var triviaEl = document. createElement('p');
        var button = document.createElement('button');
        button.textContent = 'Click me';
        button.addEventListener('click', function () {
            var response, trivia;
            return __generator(this, function(_a)) {
                switch (_a.label) {
                    case 0:
                        clickCount++;
                        return [4 /*yield*/, fetch(`http://numbersapi.com/${clickCount}`)]
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 2:
                        trivia = _a.sent();
                        triviaEl.textContent = trivia;
                        button.textContent = "Click me (" + clickCount + ")";
                        return [2 /*return*/]
                }
            }
        })
    }

    // TS code -> JS code + sourceMap -> .js, .js.map
    // tsconfig.json
    // {
    //     "compilerOptions": {
    //         "sourceMap": true
    //     }
    // }
}