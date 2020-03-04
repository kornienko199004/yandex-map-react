import React, { Component } from 'react';
import UserInput from '../../components/UserInput/UserInput';
import Map from '../../components/Map/Map';

const DEFAULT_COORDS = [55.76, 37.64];

class Layout extends Component {
    state = {
        inputValue: '',
        points: [
            // { name: string; coords: number[], id: number }
            { name: 'The first point', coords: [55.75, 37.63], id: 123 },
            { name: 'The second point', coords: [55.77, 37.65], id: 124 },
            { name: 'The third point', coords: [55.78, 37.66], id: 125 },
        ],
        map: null,
    };

    inputHandler = event => {
        this.setState({
            inputValue: event.target.value,
        });
    };

    inputKeyPress = event => {
        if (event.key === 'Enter') {
            this.setState((state, props) => ({
                points: [
                    ...state.points,
                    {
                        name: state.inputValue,
                        coords: DEFAULT_COORDS,
                        id: Date.now(),
                    },
                ],
                inputValue: '',
            }));
        }
    };

    removePointHandler = removeId => {
        this.setState((state, props) => ({
            points: [...state.points.filter(({ id }) => id !== removeId)],
        }));
    };

    generateMapPoint(coords) {
        const { ymaps } = window;
        return new ymaps.GeoObject({
            geometry: {
                type: 'Point', // тип геометрии - точка
                coordinates: coords, // координаты точки
            },
        });
    }

    componentDidMount() {
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
            this.setState({
                map: myMap,
            });
            // console.log(this.state.points);
            // if (this.state.points) {
            //     this.state.points.forEach(({ coords }) => {
            //         const mapPoint = this.generateMapPoint(coords);
            //         myMap.geoObjects.add(mapPoint);
            //     });
            // }
        };

        ymaps.ready(init);
    }

    render() {
        if (this.state.points && this.state.map) {
            this.state.points.forEach(({ coords }) => {
                const mapPoint = this.generateMapPoint(coords);
                this.state.map.geoObjects.add(mapPoint);
            });
        }
        return (
            <div className="container row text-center col-md-12">
                <UserInput
                    value={this.state.inputValue}
                    onChange={this.inputHandler}
                    keyPress={this.inputKeyPress}
                    points={this.state.points}
                    removeHandler={this.removePointHandler}
                />
                <div className="col-md-6 col-lg-6 map-wrapper">
                    <div id="map" className="map"></div>
                </div>
            </div>
        );
    }
}

export default Layout;
