import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import oc from 'open-color';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

/*

*/

const Map = (props) => {
  console.log('Map props', props);
  return (
    <div>
      여기는 Map component 입니다. 카카오맵 api를 사용하여 맵을 보여줍니다.
    </div>
  );
};

export default withRouter(Map);
