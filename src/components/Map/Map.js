import React, { Component } from 'react';
import { render } from 'react-dom';

class Map extends Component {

  componentDidMount() {
    const { ymaps } = window;
    ymaps.ready(init);
      function init(){
          // Создание карты.
          var myMap = new ymaps.Map("map", {
              // Координаты центра карты.
              // Порядок по умолчанию: «широта, долгота».
              // Чтобы не определять координаты центра карты вручную,
              // воспользуйтесь инструментом Определение координат.
              center: [55.76, 37.64],
              // Уровень масштабирования. Допустимые значения:
              // от 0 (весь мир) до 19.
              zoom: 12
          });
      }
  }

  render() {
    return (
      <div className="col-md-6 col-lg-6 map-wrapper">
        <div id="map" className="map"></div>
      </div>
    )
  }
}

export default Map;