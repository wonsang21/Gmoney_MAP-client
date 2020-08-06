/* global kakao */
import axios from 'axios';
import './Info.css';

import dotenv from 'dotenv';

dotenv.config();

const Mapping = () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API}&autoload=false&libraries=services,clusterer,drawing`;
  document.head.appendChild(script);

  script.onload = () => {
    kakao.maps.load(() => {
      const container = document.getElementById('mapContainer');
      const options = {
        center: new kakao.maps.LatLng(37.275095, 127.009444), // 경기도청 좌표
        level: 3,
      };

      // 지도를 생성합니다
      const map = new window.kakao.maps.Map(container, options);
    });
  };
};

export default Mapping;
