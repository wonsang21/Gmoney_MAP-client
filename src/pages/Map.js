import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Mapping from '../components/map/Mapping';
import AddressDialog from '../components/map/AddressDialog';

/*
카카오맵 api를 연결하여 지도를 출력한다. (완료)

찾고싶은 키워드 text태그를 만든다. (완료)
찾고싶은 키워드 text태그를 클릭시 키워드결과 컴포넌트를 출력한다. (완료)
오른쪽에 가맹점 카테고리 분류태그를 만든다. (미완성)

AddressDialog에서 받아온 위치정보를 state으로 끌어올린다. (완료)
받은 위치정보를 Mapping으로 전달한다 (미완료)
위치정보를 각 컴포넌트끼리 공유한다. (미완성)
*/

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  mapping: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  searching: {
    width: '100%',
    padding: '20px',
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
  },
  searchDialog: {
    marginRight: '10px',
    backgroundColor: 'white',
    borderRadius: '4px 4px 4px 4px',
    flex: 3,
  },
  sortCategory: {
    marginRight: '10px',
    backgroundColor: 'white',
    borderRadius: '4px 4px 4px 4px',
    flex: 1,
  },
  currentLocation: {
    // marginRight: '10px',
    backgroundColor: 'white',
    borderRadius: '4px 4px 4px 4px',
    flex: 3,
  },
}));

const Map = () => {
  const classes = useStyles();
  const [location, setLocation] = useState(null);

  const handleLocation = (place) => {
    setLocation(place);
  };

  useEffect(() => {
    console.log('선택한 위치정보입니다.', location);
  }, [location]);

  return (
    <div className={classes.root}>
      <div className={classes.mapping}>
        <Mapping location={location}></Mapping>
      </div>
      <div className={classes.searching}>
        <div className={classes.searchDialog}>
          <AddressDialog handleLocation={handleLocation}></AddressDialog>
        </div>
        <div className={classes.sortCategory}>
          <AddressDialog handleLocation={handleLocation}></AddressDialog>
        </div>
        <div className={classes.currentLocation}>
          <AddressDialog handleLocation={handleLocation}></AddressDialog>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Map);
