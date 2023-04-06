import React, { useState, useRef,useEffect } from 'react';
import './SwipeMenu.css'
import Img from './component/Img';



const SwipeMenu = () => {


  // 바뀔 로컬스토리지 너비를 반영할 스테이트이고 기본값은 널이다. 
  const [saveCheckedLength, setSaveCheckedLength] = useState(null);


  // 로컬스토리지 너비 기본값에 변화있을 때 반영될 값 ->?? 이게 꼭 필요한가???
  useEffect(() => {
    // 로컬스토리지 안에 값이 있따면 적용될 너비값을 얻기 위해 만든 것이다.
    if (localStorage.getItem("saveChecked")) {
      setSaveCheckedLength(JSON.parse(localStorage.getItem('saveChecked')).length);
    } else {
      localStorage.setItem("saveChecked", null);
    }
  }, [localStorage.getItem("saveChecked")])




  // 이 렝스라는 변수의 목표는 앞으로 선택될 메뉴 갯수에 따라 너비값을 결정하기 위해서 만든 것이다.

  const [widthLength, setWidthLength] = useState(length);

  const [currentImgIndex, setCurrentImgIndex] = useState(1);


  // 이 스타일 스테이트는 메뉴박스2 즉, 메뉴들을 직접 담는 박스 안에 대한 스테이트이다.
  const [style, setStyle] = useState({
    transform: `translateX(${1 - currentImgIndex}%)`,
    // 우선 처음 화면이니 5개의 이미지가 있을 때의 너비값을 넣자. 대략 1000px 정도 되는 것이다. 이건 상의해서 결정하자.
    // 너비를 계산한 값을 넣으려는 거죠
    width : `calc(200px*5)`
    });


  // 이건 로컬스토리지에 변화가 있을 경우 메뉴박스1에 저스티파이콘텐츠 센터 주려 목적으로 만들었따.
  const [style2, setStyle2] = useState(null);



    // 여긴 로컬스토리지가 변할 때 어떻게 보여줄지 결정하는 곳인데 
    // 내일 실행시켜봐서 별 문제 없으면 그냥 없에버리자.

  // useEffect(() => {
  //   // 로컬스토리지 렝스 반영해서 우선 너비 스테이트를 변경시키자..
  //   setSaveCheckedLength(JSON.parse(localStorage.getItem('saveChecked')));

  //   // 로컬스토리지 안에 값이 있고 그 갯수가 0개 이상 8개 이하인 경우는 좌우 버튼이 안 먹히고, 메뉴들을 가운데에 있게 하자.
  //   if (0< saveCheckedLength < 8) {

  //     // 잠만 이렇게 할 필요가 없는 것이... 그냥 모달창 입력하면 되자나 병신아.

      

  //     //-> 기존 값을 없에고 다시 덮어쓰기 때문에 잘못하면 계속 반복되기 때문에 주의해서 하자.
  //     // 우선 menu-box2 안을 비우자.
  //     document.querySelector('.menu-box2').innerText = '';

  //     // 이미지번호에 입력을 시켜버리자. -> 이건 포이치 함수로 세이브드체크 갯수만큼 돌려버리자.
  //     // 그리고 이걸 div에 입력시키자.
  //     saveCheckedLength.map((item, i)=>{
  //       document.querySelector('.menu-box2').innerHTML += `<img className='menu-img' src="./teamproject-img-main/icon/service (${item}).png" alt="" />`; // innerText 대신 innerHTML을 사용하여 img 태그 추가
  //     });

  //     // 그리고 화살표 방향에 함수를 빼버리자.
  //     document.querySelector('.arrow1').outerHTML = "<img className='arrow1' src='./teamproject-img-main/icon/made-icon-left.png' alt='뒤로' />";
  //     document.querySelector('.arrow2').outerHTML = "<img className='arrow2' src='./teamproject-img-main/icon/made-icon-right.png' alt='앞으로' />";


  //     // 그리고  style2에도 변화를 주자. 이미지들을 가운데로 모아버리자.

  //     setStyle2({
  //       justifyContent: `center`
  //     });

  //   }  else if(localStorage.getItem('saveChecked') == null) {
  //     // 만약 로컬스토리지가 널이라면 이 스타일을 적용할 것이다. 즉 맨 처음 스타일을 적용시킬 것이다.

  //     setStyle({
  //       transform: `translateX(${1 - currentImgIndex}%)`,
  //       width : `calc(200px*5)`
  //     });
      
  //     setStyle2(null)

  //   } else if(localStorage.length && length > 8) {
  //     // 만약 로컬스토리지 값이 9개 이상이면 스타일을 다르게 적용시킬 것이다.


  //   }


  // }, [localStorage.getItem("saveChecked")]);




    
  // 버튼 관련 함수이다.
  const nextSlide = () => {
    setCurrentImgIndex(currentImgIndex + 1);
    setStyle({
      transform: `translateX(-${currentImgIndex + 1}0%)`,
      transition: `all 0.2s ease-in-out`,
    });
  };

  // 버튼 관련 함수이다.
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




  // 이건 currentimageindex가 10이 넘어가면 오바되서 10 넘어가면 0으로 회귀시키려는 것
  // 즉 버튼을 많이 눌렀을 때 원상 복구시키기 위한 것이다.
  useEffect(() => {
    if(currentImgIndex == 10) {
      setCurrentImgIndex(9);
    } else if(currentImgIndex == -10) {
      setCurrentImgIndex(1);
    }
   }, [style]);




   // 이거는 버튼을 누르면 메뉴 상태창이 뜨게 만들려는 것이다.
   const [averlay, setAverlay] = useState(null);

   // 이 세팅이라는 함수는 세팅버튼을 클릭했을 시 메뉴 선택창이 뜨게 만드는 것이다.
   const setting = () => {
     setAverlay(true);
   };

   // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ//

   // 여기가 부모컴포넌트의 return 이다.
  return (
    <div>
      {/* 여기는 로컬스토리의 세이브드체크 상태에 따라 보여줄 자식 컴포넌트를 결정하는 것이다. */}
      { localStorage.getItem("saveChecked") = null ? <NullMenu /> : (localStorage.getItem("saveChecked").lenght < 8 ? <eight_under_Menu/> : <nine_over_Menu/>) } 

      {/* 여기는 버튼을 클릭했을 때 선택할 메뉴 모음집을 보여줄지 말지를 결정하는 것이다. */}
      { averlay ? <Img setAverlay={setAverlay} /> : null }
    </div>
  )
}


  //  최초  saveChecked의 벨류 값이 널이다. 
  // 이러면 삼항 연산자로 세이브 첵크가 널이면 NullMenu 화면 아니면 이런 화면을 입력해서 수정하자.
  // 우선 null일 경우 보이는 화면을 보여줄 자식컴포넌트를 만들자.

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


  
  //  이건 로컬스토리지 값이 8개 이하일 때의 자식 컴포넌트

  const eight_under_Menu = () => {

    // 여기는 8개 이하일 때 스타일 수정을 해줘야 한다. 
    return(

    <div>
      <div className='wrapper'>
        <div className='menu-box'>
          <div className="menu-box1" style={style2}>
            <div style={style} className="menu-box2">
              {saveCheckedLength.map((item, i) => { 
              `<img className='menu-img' src="./teamproject-img-main/icon/service (${item}).png" alt="" />`
              })}
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


  // 선택한 메뉴가 9개 이상 나왔을 때의 자식 컴포넌트 구성
  const nine_over_Menu = () => {

    return(

      <div>
      <div className='wrapper'>
        <div className='menu-box'>
          <div className="menu-box1" style={style2}>
            <div style={style} className="menu-box2">
              {saveCheckedLength.map((item, i) => { 
              `<img className='menu-img' src="./teamproject-img-main/icon/service (${item}).png" alt="" />`
              })}
            </div>
          </div> 
          <div className='setting'>
            <img onClick={setting}  src="./teamproject-img-main/icon/setting-icon.png" alt="" />
          </div>
        </div>
        <img onClick={nextSlide} className='arrow1' src="./teamproject-img-main/icon/made-icon-left.png" alt="뒤로" />
        <img onClick={prevSlide} className='arrow2' src="./teamproject-img-main/icon/made-icon-right.png" alt="앞으로" />
      </div>       
    </div>   

    )

  }






export default SwipeMenu


// document.querySelector('.arrow1').outerHTML = "<img className='arrow1' src='./teamproject-img-main/icon/made-icon-left.png' alt='뒤로' />";
// document.querySelector('.arrow2').outerHTML = "<img className='arrow2' src='./teamproject-img-main/icon/made-icon-right.png' alt='앞으로' />";
