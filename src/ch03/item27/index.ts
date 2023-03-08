import _ from 'lodash';

interface BasketballPlayer {
    name: string;
    team: string;
    salary: number;
}
declare const rosters: {[team: string]: BasketballPlayer[]};

// map, flatMap, filter, reduce 등 라이브러리의 일부 기능 사용
{
  // 절차형 vs. 함수형 라이브러리 vs. 서드파티 라이브러리
  {
    const csvData = "...";
    const rawRows = csvData.split("\n");
    const headers = rawRows[0].split(",");

    // 절차형 오류 발생: 타입 구문 추가 시 해결
    const rows = rawRows.slice(1).map((rowStr) => {
      const row = {};
      rowStr.split(",").forEach((val, j) => {
        row[headers[j]] = val;
        //^?
      });
      return row;
    });

    // 함수형 오류 발생: 타입 구문 추가 시 해결
    const rows2 = rawRows.slice(1).map(
      (rowStr) =>
        rowStr
          .split(",")
          .reduce((row, val, i) => ((row[headers[i]] = val), row), {})
      //                              ^?
    );

    // 서드파티 정상 작동
    const rows3 = rawRows
      .slice(1)
      .map((rowStr) => _.zipObject(headers, rowStr.split(",")));
  }

  // 예제1) NBA 팀 명단
  {
    // 오류 발생: 타입 구문 추가 필요
    let allPlayers = [];
    //  ^?
    for (const players of Object.values(rosters)) {
        allPlayers = allPlayers.concat(players);
        //              ^?
    }

    // 정상 작동
    let allPlayers2: BasketballPlayer[] = [];
    for (const players of Object.values(rosters)) {
        allPlayers2 = allPlayers2.concat(players);
    }

    // 정상 작동: flat 사용 시 평탄화 작업 => T[][]->T[]
    const allPlayers3 = Object.values(rosters).flat();
  }

  // 예제2) NBA 팀 명단
  {
    const allPlayers = Object.values(rosters).flat();
    const teamToPlayers: {[team: string]: BasketballPlayer[]} = {};
    for (const player of allPlayers) {
        const {team} = player;
        teamToPlayers[team] = teamToPlayers[team] || [];
        teamToPlayers[team].push(player);
    }

    for (const players of Object.values(teamToPlayers)) {
        players.sort((a, b) => b.salary - a.salary);
    }

    const bestPaid = Object.values(teamToPlayers).map(players => players[0]);
    bestPaid.sort((playerA, playerB) => playerB.salary - playerA.salary);
    console.log(bestPaid);


    // 로대시 사용
    const bestPaid
  }
}
