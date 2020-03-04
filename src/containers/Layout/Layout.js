import React, { Component } from 'react';
import UserInput from '../../components/UserInput/UserInput';

const DEFAULT_COORDS = [55.76, 37.64];

class Layout extends Component {
    state = {
        inputValue: '',
        points: [
            // // { name: string; coords: number[], id: number, mapPoint: GeoObject }
            // { name: 'The first point', coords: [55.75, 37.63], id: 123, mapPoint: this.generateMapPoint([55.75, 37.63]) },
            // { name: 'The second point', coords: [55.77, 37.65], id: 124, mapPoint: this.generateMapPoint([55.77, 37.65]) },
            // { name: 'The third point', coords: [55.78, 37.66], id: 125, mapPoint: this.generateMapPoint([55.78, 37.66]) },
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
                        mapPoint: this.generateMapPoint(DEFAULT_COORDS)
                    },
                ],
                inputValue: '',
            }));
        }
    };

    removePointHandler = removeId => {
        const removedPoint = this.state.points.filter(({ id }) => id === removeId)[0];
        this.state.map.geoObjects.remove(removedPoint.mapPoint);
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
        };

        ymaps.ready(init);
    }

    drawPointsOnMap() {
      this.state.points.forEach(({ mapPoint }) => {
          // const mapPoint = this.generateMapPoint(coords);
          this.state.map.geoObjects.add(mapPoint);
      });
    }

    render() {
        if (this.state.points && this.state.map) {
          this.drawPointsOnMap();
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
