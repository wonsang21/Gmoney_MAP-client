/* global kakao */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import dotenv from 'dotenv';

dotenv.config();

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  searchBar: {
    width: '98%',
    margin: '10px 10px 10px 10px',
  },
  searchBtn: {
    width: '40%',
    marginRight: '10px',
    borderRadius: '4px 4px 4px 4px',
  },
  searchDivider: {
    backgroundColor: 'black',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddressDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchPlaces = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        // 장소 검색 객체를 생성합니다
        const ps = new kakao.maps.services.Places();

        // 검색결과 목록의 자식 Element를 제거하는 함수입니다
        const removeAllChildNods = (el) => {
          while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
          }
        };

        // 검색 결과 목록을 표출하는 함수입니다
        const displayPlaces = (places) => {
          const listEl = document.getElementById('placesList');
          const menuEl = document.getElementById('menu_wrap');
          const fragment = document.createDocumentFragment();

          // 검색 결과 목록에 추가된 항목들을 제거합니다
          removeAllChildNods(listEl);

          // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
          listEl.appendChild(fragment);
          menuEl.scrollTop = 0;
        };

        // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
        const displayPagination = (pagination) => {
          const paginationEl = document.getElementById('pagination');
          const fragment = document.createDocumentFragment();
          const i = 0;

          // 기존에 추가된 페이지번호를 삭제합니다
          while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild);
          }

          for (i = 1; i <= pagination.last; i++) {
            var el = document.createElement('a');
            el.href = '#';
            el.innerHTML = i;

            if (i === pagination.current) {
              el.className = 'on';
            } else {
              el.onclick = (function (i) {
                return function () {
                  pagination.gotoPage(i);
                };
              })(i);
            }

            fragment.appendChild(el);
          }
          paginationEl.appendChild(fragment);
        };

        // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        const placesSearchCB = (data, status, pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);

            // 페이지 번호를 표출합니다
            displayPagination(pagination);
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
          } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
          }
        };
      });
    };
  };

  return (
    <>
      <TextField
        id="outlined-read-only-input"
        label="찾고 싶은 곳이 있나요?"
        defaultValue="용인시 수지구 동천동"
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
        fullWidth="true"
        onClick={handleClickOpen}
      />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              주소 또는 상호명을 검색하세요
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.searchBar}>
          <div className={classes.searchBtn}>
            <TextField
              id="outlined-input"
              label="ex) 효원로 1, 롯데리아.."
              variant="outlined"
              autoFocus="true"
              fullWidth="true"
            />
          </div>
        </div>
        <Divider className={classes.searchDivider} />
        <List id="placesList">
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};

export default AddressDialog;
