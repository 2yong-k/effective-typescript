{
    // 별칭 만들기
    {
        const borough = {
            name: 'Brooklyn',
            location: [40.688, -73.979]
        };
        const loc = borough.location;
        //     ^?

        // 별칭으로 값 변경 가능
        loc[0] = 0;
        console.log(borough.location);
    }

    // 자료구조 가정
    // 별칭은 타입 좁히는 것을 방해 -> 별칭 사용 시 일관되게 사용 -> 구조 분해를 통해 사용
    {
        interface Coordinate {
            x: number;
            y: number;
        }

        interface BoundingBox {
            x: [number, number];
            y: [number, number];
        }

        interface Polygon {
            exterior: Coordinate[];
            holes: Coordinate[][];
            bbox?: BoundingBox;
        }

        function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
            const box = polygon.bbox;
            const {bbox} = polygon;
            if (polygon.bbox) {
                // if (pt.x < polygon.bbox.x[0] || pt.x > polygon.bbox.x[1] || 
                //     pt.y < polygon.bbox.y[0] || pt.y > polygon.bbox.y[1]) {
                //         return false;
                //     }

                // polygon.bbox의 타입은 정제했지만, box는 그렇지 않았기에 오류 발생
                if (pt.x < box.x[0] || pt.x > box.x[1] ||
                    pt.y < box.y[0] || pt.y > box.y[1]) {
                        // ^?
                        return false;
                    }
            }

            // if 속성 체크에 box 사용 시 오류 해결
            if (box) {
                if (pt.x < box.x[0] || pt.x > box.x[1] ||
                    pt.y < box.y[0] || pt.y > box.y[1]) {
                        return false;
                    }
            }

            // 새로운 별칭을 만들지 않고 구조 분해를 통해
            // x와 y가 선택적 속성일 경우 속성 체크 필요! null값 추가
            if (bbox) {
                const {x, y} = bbox;
                if (pt.x < x[0] || pt.x > x[1] ||
                    pt.y < y[0] || pt.y > y[1]) {
                        // ^?
                        return false;
                    }
            }

            if (!bbox) {
                calculatePolygonBox(polygon);   // polygon.bbox가 채워집니다.
                // 이제 polygon.bbox와 bbox는 다른 값을 참조
            }

            function fn(p: Polygon) {}
            polygon.bbox;
            //      ^?
            if (polygon.bbox) {
                polygon.bbox;
                //      ^?
                fn(polygon);
                polygon.bbox;
                //      ^?
            }
        }
    }
}