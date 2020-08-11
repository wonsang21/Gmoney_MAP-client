/* global kakao */

import React, { useState, useEffect, forwardRef } from 'react';
import { withRouter } from 'react-router-dom';
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
  searchInput: {
    width: '40%',
    marginRight: '10px',
    borderRadius: '4px 4px 4px 4px',
    float: 'left',
  },
  searchBtn: {
    width: '10%',
    height: '56px',
    marginRight: '10px',
    borderRadius: '4px 4px 4px 4px',
    float: 'left',
  },
  searchDivider: {
    backgroundColor: 'black',
  },
  paging: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'black',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  pageBtn: {
    display: 'block',
    marginLeft: '10px',
  },
  pageBtnClick: {
    fontWeight: 'bold',
    cursor: 'default',
    color: '#777',
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddressDialog = (props) => {
  const classes = useStyles();
  const { handleLocation } = props;
  const ps = new kakao.maps.services.Places(); // 장소 검색 객체를 생성합니다

  const [open, setOpen] = useState(false);
  const [places, setPlaces] = useState(null); // 검색결과 장소

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPlaces(null);
  };

  useEffect(() => {
    console.log('새로운 검색결과입니다.', places);
  }, [places]);

  // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다 (미완료)
  const displayPagination = (pagination) => {
    const paginationEl = document.getElementById('pagination');
    const fragment = document.createDocumentFragment();
    let i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    // eslint-disable-next-line no-plusplus
    for (i = 1; i <= pagination.last; i++) {
      const el = document.createElement('a');
      el.className = classes.pageBtn;
      el.href = '#';
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = classes.pageBtnClick;
      } else {
        // eslint-disable-next-line no-shadow
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

  // 검색 결과 목록을 표출하는 함수입니다
  // eslint-disable-next-line consistent-return
  const displayPlaces = () => {
    if (places !== null) {
      return places.map((place) => (
        <>
          <ListItem button divider>
            <ListItemText
              primary={place.place_name}
              secondary={
                place.road_address_name
                  ? place.road_address_name
                  : place.address_name
              }
              onClick={() => {
                handleLocation(place);
                handleClose();
                props.history.push('/');
              }}
            />
          </ListItem>
        </>
      ));
    }
  };

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다 (완료)
  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록을 state로 끌어올립니다.
      setPlaces(data);

      // 페이지 번호를 표출합니다
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  };

  // 키워드 검색을 요청하는 함수입니다 (완료)
  const searchPlaces = () => {
    const keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB);
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
        fullWidth
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchPlaces();
            }}
          >
            <div className={classes.searchInput}>
              <TextField
                id="keyword"
                label="ex) 효원로 1, 롯데리아.."
                variant="outlined"
                autoFocus
                fullWidth
              />
            </div>
            <div className={classes.searchBtn}>
              <Button type="submit">검색</Button>
            </div>
          </form>
        </div>

        <Divider className={classes.searchDivider} />
        <List>{displayPlaces()}</List>
        <div className={classes.paging}>
          <div id="pagination" className={classes.pagination}></div>
        </div>
      </Dialog>
    </>
  );
};

export default withRouter(AddressDialog);
