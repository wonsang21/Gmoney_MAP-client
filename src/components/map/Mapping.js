/* global kakao */
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mapping: {
    width: '100%',
    height: '100%',
  },
}));

/*
ex) location 객체 속성
address_name: "경기 용인시 수지구 동천동 859"
category_group_code: ""
category_group_name: ""
category_name: "부동산 > 주거시설 > 아파트"
distance: ""
id: "7845657"
phone: ""
place_name: "동천마을현대홈타운1차아파트"
place_url: "http://place.map.kakao.com/7845657"
road_address_name: "경기 용인시 수지구 수지로 487"
x: "127.09905878253333"
y: "37.33977437206489"
*/

const Mapping = (props) => {
  const classes = useStyles();
  const { location } = props;
  const mapContainer = useRef();

  const [kakaomap, setKakaoMap] = useState(null);
  const [searchMarker, setSearchMarker] = useState(null);

  // 첫 화면을 지도에 보여줍니다.
  const handleMapping = () => {
    const options = {
      center: new kakao.maps.LatLng(37.275095, 127.009444), // 경기도청 좌표
      level: 4,
    };
    // 지도를 생성합니다
    const map = new window.kakao.maps.Map(mapContainer.current, options);
    // 지도 state에 저장합니다.
    setKakaoMap(map);
  };

  // 기존마커들을 삭제합니다.
  const removeMarker = () => {
    if (searchMarker !== null) {
      searchMarker.setMap(null);
    }
  };

  // 새로운 마커들을 찍어줍니다.
  const displayMarker = (map, position) => {
    const marker = new kakao.maps.Marker({ map, position });
    setSearchMarker(marker);
    marker.setMap(kakaomap);

    // 새로운 위치를 지도에 설정합니다.
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(position);
    kakaomap.setBounds(bounds);
  };

  // 변경된 지도를 보여줍니다.
  // eslint-disable-next-line consistent-return
  const handleChangeMapping = () => {
    if (kakaomap !== null && location !== null) {
      const position = new kakao.maps.LatLng(location.y, location.x);
      // 기존 마커들을 삭제합니다.
      removeMarker();
      // 새로운 마커들을 찍어줍니다.
      displayMarker(kakaomap, position);
    }
  };

  //

  useEffect(() => {
    handleMapping();
  }, [mapContainer]);

  useEffect(() => {
    handleChangeMapping();
  }, [kakaomap, location]);

  return (
    <>
      <div id="mapContainer" ref={mapContainer} className={classes.mapping} />
    </>
  );
};

export default Mapping;
