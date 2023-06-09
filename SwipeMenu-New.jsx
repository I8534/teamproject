import React, { useState, useRef,useEffect } from 'react';
import './Swipemenu3.css'
import Img from './component/Img';

const SwipeMenu3 = () => {

    const new_saveChecked = JSON.parse(localStorage.getItem('saveChecked')) || [];

    // 바뀔 로컬스토리지 벨류 어레이를 받기 위한 것이다. 이걸로 맵함수 돌릴 것이다.
    const [saveChecked, setSaveChecked] = useState(new_saveChecked);

    // 바뀔 로컬스토리지 너비를 반영할 스테이트이고 기본값은 널이다. 이걸 이용해서 메뉴박스2의 너비를 결정할 것이다.
    const [saveCheckedLength, setSaveCheckedLength] = useState(null);
  
    // 이 렝스라는 변수의 목표는 앞으로 선택될 메뉴 갯수에 따라 너비값을 결정하기 위해서 만든 것이다.
    const [widthLength, setWidthLength] = useState(null);
  
    // 이건 눌렀을 때 이동하는 정도를 정하기 위해서이다.
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
  
     // 이 스타일 스테이트는 메뉴박스2 즉, 메뉴들을 직접 담는 박스 안에 대한 스테이트이다.
    const [style, setStyle] = useState({
      transform: `translateX(0)`,
      // 우선 처음 화면이니 5개의 이미지가 있을 때의 너비값을 넣자. 대략 1000px 정도 되는 것이다. 이건 상황봐서 수정하자.
      // 너비를 계산한 값을 넣으려는 거죠
      width : `calc(200px*5)`
    });


    // saveChecked 에 변화있을 때 반영한 것
    useEffect(() => {
      if (new_saveChecked.length > 8) {
        // 바뀐 로컬스토리지 어레이 반영
        setSaveChecked(new_saveChecked);
        // 바뀐 로컬스토리지 어레이 갯수 반영
        setSaveCheckedLength(new_saveChecked.length);
        // 스타일 변경도 반영
        setStyle({
          transform: `translateX(${1 - currentImgIndex}%)`,
          width : `calc(200px*${new_saveChecked.length})`
        })
      } else if(new_saveChecked.length <= 7) {
        // 바뀐 로컬스토리지 어레이 반영
        setSaveChecked(new_saveChecked);
        // 바뀐 로컬스토리지 어레이 갯수 반영
        setSaveCheckedLength(new_saveChecked.length);
        // 스타일 변경도 반영
        setStyle2({
          display: `flex`,
          justifyContent: `center`,
          alingItem:`cener`
        })
      } 
 
    }, [localStorage.getItem("saveChecked")])
    

  // 이건 로컬스토리지에 변화가 있을 경우 메뉴박스1에 저스티파이콘텐츠 센터 주려 목적으로 만들었따.
  const [style2, setStyle2] = useState(null);

      // 이거는 버튼을 누르면 메뉴 상태창이 뜨게 만들려는 것이다.
  const [averlay, setAverlay] = useState(null);

  // 이 세팅이라는 함수는 세팅버튼을 클릭했을 시 메뉴 선택창이 뜨게 만드는 것이다.
  const setting = () => {
   setAverlay(true);
  };
  
  console.log(currentImgIndex);

  // 버튼 관련 함수이다.
  const nextSlide = () => {
    if(currentImgIndex < 8){
      setCurrentImgIndex(currentImgIndex + 1);
      setStyle({
        transform: `translateX(-${currentImgIndex + 1}0%)`,
        transition: `all 0.2s ease-in-out`,
      });
    } 
    else if(currentImgIndex == 8){
      setCurrentImgIndex(0);
      setStyle({
        transform: `translateX(0%)`,
        transition: `all 0.2s ease-in-out`,
      });
    }
  };
  
  // 버튼 관련 함수이다.
  const prevSlide = () => {
    if(currentImgIndex <= 0){
      setCurrentImgIndex(0);
      setStyle({
        transform: `translateX(-${currentImgIndex - 1}0%)`,
        transition: `all 0.2s ease-in-out`,
      });
    }
  };


    //이건 로컬스토리지가 null 일 때의 자식 컴포넌트, 즉 화면 처음 켰을 때

  const NullMenu = () => {

    return(
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
        <img className='arrow1' src="./teamproject-img-main/icon/made-icon-left.png" alt="뒤로" />
        <img className='arrow2' src="./teamproject-img-main/icon/made-icon-right.png" alt="앞으로" />
      </div>       
    </div>   
    )
  }

  //  이건 로컬스토리지 값이 7개 이하일 때의 자식 컴포넌트

  const Seven_under_Menu = () => {

    // 여기는 7개 이하일 때 스타일 수정을 해줘야 한다. 
    return(
    <div>
      <div className='wrapper'>
        <div className='menu-box'>
          <div className="menu-box1" style={style2}>
            <div style={style} className="menu-box2">
            {saveChecked.map((item, i) => (
            <img key={i} className='menu-img' src={`./teamproject-img-main/icon/service (${item}).png`} alt="" />
            ))}
            </div>
          </div> 
          <div className='setting'>
              <img onClick={setting}  src="./teamproject-img-main/icon/setting-icon.png" alt="" />
          </div>
        </div>
          <img className='arrow1' src="./teamproject-img-main/icon/made-icon-left.png" alt="뒤로" />
          <img className='arrow2' src="./teamproject-img-main/icon/made-icon-right.png" alt="앞으로" />
        </div>       
      </div>   
      )
    }

  
  // 선택한 메뉴가 8개 이상 나왔을 때의 자식 컴포넌트 구성
  const Eight_over_Menu = () => {

    return(
      <div>
        <div className='wrapper'>
          <div className='menu-box'>
            <div className="menu-box1" style={style2}>
              <div style={style} className="menu-box2">
              {saveChecked.map((item, i) => (
              <img key={i} className='menu-img' src={`./teamproject-img-main/icon/service (${item}).png`} alt="" />
              ))}
              </div>
            </div> 
            <div className='setting'>
              <img onClick={setting}  src="./teamproject-img-main/icon/setting-icon.png" alt="" />
            </div>
          </div>
          <img onClick={prevSlide} className='arrow1' src="./teamproject-img-main/icon/made-icon-left.png" alt="뒤로" />
          <img onClick={nextSlide} className='arrow2' src="./teamproject-img-main/icon/made-icon-right.png" alt="앞으로" />
        </div>       
      </div>   
      )  
    }  

  return (
    <div>
      {/* 여기는 로컬스토리의 세이브드체크 상태에 따라 보여줄 자식 컴포넌트를 결정하는 것이다. */}
      { localStorage.getItem("saveChecked") == null  ?  <NullMenu /> : (new_saveChecked.length < 8 ? <Seven_under_Menu /> : <Eight_over_Menu />)} 

      {/* 여기는 버튼을 클릭했을 때 선택할 메뉴 모음집을 보여줄지 말지를 결정하는 것이다. */}
      { averlay ? <Img setAverlay={setAverlay} /> : null }
    </div>
  )
}

export default SwipeMenu3
