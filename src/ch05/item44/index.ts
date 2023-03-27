declare module "my-module";

import {someMethod, someSymbol} from 'my-module';

function getColumnInfo(name: string): any {
    return utils.buildColumnInfo(appState.dataSchema, name);    // any 반환
}

const pt1 = {
    // ^?
    x: 1,
    y: 2,
};
const pt2 = someMethod(pt1, someSymbol);
//     ^?