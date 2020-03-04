import React, { Component } from 'react';
import { render } from 'react-dom';

const map = props => {
    const generateMapPoint = coords => {
        const { ymaps } = window;
        return new ymaps.GeoObject({
            geometry: {
                type: 'Point', // тип геометрии - точка
                coordinates: coords, // координаты точки
            },
        });
    };

    console.log(props);
    const { ymaps } = window;
    const init = () => {
        // Создание карты.
        const myMap = new ymaps.Map('map', {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.76, 37.64],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 12,
        });
        console.log(props.points);
        if (props.points) {
            props.points.forEach(({ coords }) => {
                const mapPoint = generateMapPoint(coords);
                myMap.geoObjects.add(mapPoint);
            });
        }
    };

    ymaps.ready(init);

    return (
        <div className="col-md-6 col-lg-6 map-wrapper">
            <div id="map" className="map"></div>
        </div>
    );
};
// class Map extends Component {
//   constructor(props) {
//     super(props);
//   }

//     componentDidMount() {
//         console.log(this.props);
//         const { ymaps } = window;
//         const init = () => {
//             // Создание карты.
//             const myMap = new ymaps.Map('map', {
//                 // Координаты центра карты.
//                 // Порядок по умолчанию: «широта, долгота».
//                 // Чтобы не определять координаты центра карты вручную,
//                 // воспользуйтесь инструментом Определение координат.
//                 center: [55.76, 37.64],
//                 // Уровень масштабирования. Допустимые значения:
//                 // от 0 (весь мир) до 19.
//                 zoom: 12,
//             });
//             console.log(this.props.points);
//             if (this.props.points) {
//               this.props.points.forEach(({ coords }) => {
//                 const mapPoint = this.generateMapPoint(coords);
//                 myMap.geoObjects.add(mapPoint);
//               });
//             }
//         };

//         ymaps.ready(init);
//     }

//     generateMapPoint(coords) {
//         const { ymaps } = window;
//         return new ymaps.GeoObject({
//             geometry: {
//                 type: 'Point', // тип геометрии - точка
//                 coordinates: coords, // координаты точки
//             },
//         });
//     }

//     render() {
//         return (
//             <div className="col-md-6 col-lg-6 map-wrapper">
//                 <div id="map" className="map"></div>
//             </div>
//         );
//     }
// }

export default map;
