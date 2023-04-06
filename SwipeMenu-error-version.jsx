import React, { useState, useRef,useEffect } from 'react';
import './SwipeMenu.css'
import Img from './component/Img';


// useeffect에서 로컬스토리지를 유스 스테이트에 담아서 가져오기로.

const SwipeMenu = () => {

 

  // 로컬스토리지 너비 기본값
  const [saveCheckedLength, setSaveCheckedLength] = useState(null);

  // 로컬스토리지 너비 기본값에 변화있을 때 반영될 값
  useEffect(() => {
    if (localStorage.getItem("saveChecked")) {
      setSaveCheckedLength(JSON.parse(localStorage.getItem('saveChecked')).length);
    } else {
      localStorage.setItem("saveChecked", null);
    }
  }, [saveCheckedLength])


  const length = null;

  const [widthLength, setWidthLength] = useState(length);

  const [currentImgIndex, setCurrentImgIndex] = useState(1);

  const [style, setStyle] = useState({
    transform: `translateX(${1 - currentImgIndex}%)`,
    // widthLength 즉 로컬스토리지의 길이만큼을 반영해서 너비를 정하고 여기에 너비를 계산하는 스테이트를 넣자.
    // 너비를 계산한 값을 넣으려는 거죠
    width : `calc(200px*${length})`
    });

  // 이건 메뉴박스1에 저스티파이콘텐츠 센터 주려는 것
  const [style2, setStyle2] = useState(null);
    

  const nextSlide = () => {
    setCurrentImgIndex(currentImgIndex + 1);
    setStyle({
      transform: `translateX(-${currentImgIndex + 1}0%)`,
      transition: `all 0.2s ease-in-out`,
    });
  };

  const prevSlide = () => {
    if(currentImgIndex <= 0){
      setCurrentImgIndex(1);
      return;
      // return이 있고 없고의 차이가 궁금
    }
    setCurrentImgIndex(currentImgIndex - 1);
    setStyle({
      transform: `translateX(-${currentImgIndex - 1}0%)`,
      transition: `all 0.2s ease-in-out`,
    });
  };

  const [averlay, setAverlay] = useState(null);
  // const [overlay, setOverlay] = useState(false); 이거는 버튼을 누르면 상태가 바뀌게 만드는 것이다.

  const setting = () => {
    setAverlay(true);
  };

  {/* 로컬스토리지의 값이 0이면 그냥 뭐 가마니 있고, 로컬스토리지 안에 값이 있다면 그 값을 기반으로 하자. */}


  const [savelocal, setSaveLocal] = useState(null);


  useEffect(() => {
    // 로컬스토리지 렝스 반영해서 너비 결정할 거임.

    // 로컬스토리지 안에 값이 있는데, 그 갯수가 8개 이하인 경우는 좌우 버튼이 안 먹히고 가운데에 있게 하자.
    if (localStorage.length && length < 8) {
      // 로컬스토리지 벨류 값을 가져오기
      const saveChecked = JSON.parse(localStorage.getItem('saveChecked'));
      console.log(saveChecked);
      //-> 기존 값을 없에고 다시 덮어쓰기 때문에 잘못하면 계속 반복된다.

      // 우선 menu-box2 안을 비우자.
      document.querySelector('.menu-box2').innerText = '';
      // 이미지번호에 입력을 시켜버리자. -> 이건 포이치 함수로 세이브드체크 갯수만큼 돌려버리자.
      // 그리고 이걸 div에 입력시키자.
      saveChecked.map((item, i)=>{
        document.querySelector('.menu-box2').innerHTML += `<img className='menu-img' src="./teamproject-img-main/icon/service (${item}).png" alt="" />`; // innerText 대신 innerHTML을 사용하여 img 태그 추가
      });
      setStyle2({
        justifyContent: `center`
      });

    } 
    // 로컬스토리지에 변화가 있으면 style에 변화를 줘야 한다.
  }, [localStorage.getItem("saveChecked")]);


  //이건 currentimageindex가 10이 넘어가면 오바되서 10 넘어가면 0으로 회귀시키려는 것
  useEffect(() => {
    if(currentImgIndex == 10) {
      setCurrentImgIndex(9);
    } else if(currentImgIndex == -10) {
      setCurrentImgIndex(1);
    }
   }, [style]);







  return (
    <div>
      <div className='wrapper'>
        <div className='menu-box'>
          <div className="menu-box1" style={style2}>
            <div style={style} className="menu-box2">
                <div className='img-box'>
                  <img className='menu-img' src="./teamproject-img-main/icon/service (21).png" alt="" />
                </div>
                <div className='img-box'>
                  <img className='menu-img' src="./teamproject-img-main/icon/service (2).png" alt="" />
                </div>
                <div className='img-box'>
                  <img className='menu-img' src="./teamproject-img-main/icon/service (4).png" alt="" />
                </div>
                <div className='img-box'>
                  <img className='menu-img' src="./teamproject-img-main/icon/service (3).png" alt="" />
                </div>
                <div className='img-box'>
                  <img className='menu-img' src="./teamproject-img-main/icon/service (5).png" alt="" />
                </div>
                <div className='img-box'>
                  <img className='menu-img' src="./teamproject-img-main/icon/service (21).png" alt="" />
                </div>
            </div>
          </div> 
          <div className='setting'>
              <img onClick={setting}  src="./teamproject-img-main/icon/setting-icon.png" alt="" />
          </div>
        </div>
        <img onClick={nextSlide} className='arrow1' src="./teamproject-img-main/icon/made-icon-left.png" alt="뒤로" />
        <img onClick={prevSlide} className='arrow2' src="./teamproject-img-main/icon/made-icon-right.png" alt="앞으로" />

      </div>
      { averlay ? <Img setAverlay={setAverlay} /> : null }
    </div>
  )
}

export default SwipeMenu


// document.querySelector('.arrow1').outerHTML = "<img className='arrow1' src='./teamproject-img-main/icon/made-icon-left.png' alt='뒤로' />";
// document.querySelector('.arrow2').outerHTML = "<img className='arrow2' src='./teamproject-img-main/icon/made-icon-right.png' alt='앞으로' />";
