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
*/

const useStyles = makeStyles((theme) => ({
  mapping: {
    width: '100%',
    height: '91%',
    position: 'absolute',
    zIndex: 1,
  },
  searching: {
    width: '98%',
    margin: '10px 10px 10px 10px',
    position: 'absolute',
    zIndex: 2,
  },
  searchDialog: {
    width: '40%',
    marginRight: '10px',
    backgroundColor: 'white',
    borderRadius: '4px 4px 4px 4px',
  },
}));

const Map = () => {
  const classes = useStyles();

  useEffect(() => {
    Mapping();
  }, []);

  return (
    <div>
      <div id="mapContainer" className={classes.mapping}></div>
      <div className={classes.searching}>
        <div className={classes.searchDialog}>
          <AddressDialog></AddressDialog>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Map);
