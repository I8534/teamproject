import React, { useState } from 'react';
import './SwipeMenu.css'



      {/* 
      1. 큰 박스를 만들고 이미지를 나열 시키자 박스를 넘어가도 된다.
      2. 오버플로우 히든으로 하자
      3. 왼쪽 오른쪽 버튼을 누르면 이미지 하나 크기 정도로만 가게 하자. 
      */}

const SwipeMenu = () => {

  const [currentImgIndex, setCurrentImgIndex] = useState(5);

  const [style, setStyle] = useState({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  const nextSlide = () => {
    setCurrentImgIndex(currentImgIndex + 1);
    setStyle({
      transform: `translateX(-${currentImgIndex + 1}0%)`,
      transition: `all 0.2s ease-in-out`,
    });
  };

  const prevSlide = () => {
    setCurrentImgIndex(currentImgIndex - 1);
    setStyle({
      transform: `translateX(-${currentImgIndex - 1}0%)`,
      transition: `all 0.2s ease-in-out`,
    });
  };
  //-> 이건 내가 작성한 것인데 한번 싹 공부하자.


  // const calculateTransform = () => {
  //   const percentage = currentImgIndex * -10;
  //   return `translateX(${percentage}%)`;
  // };
  
  // const [currentImgIndex, setCurrentImgIndex] = useState(5);

  // const [style, setStyle] = useState({
  //   transform: calculateTransform(),
  //   transition: `all 0.2s ease-in-out`,
  // });

  // const nextSlide = () => {
  //   setCurrentImgIndex(currentImgIndex + 1);
  //   setStyle({
  //     transform: calculateTransform(),
  //     transition: `all 0.2s ease-in-out`,
  //   });
  // };

  // const prevSlide = () => {
  //   setCurrentImgIndex(currentImgIndex - 1);
  //   setStyle({
  //     transform: calculateTransform(),
  //     transition: `all 0.2s ease-in-out`,
  //   });
  // }; 
  // -> 이건 컴퓨터가 내놓은 답안인데 솔직히 완벽하진 않다.


  return (
    <div>

      <div className='wrapper'>
        <img onClick={nextSlide} className='arrow' src="./teamproject-img-main/icon/blue-btn-left.png" alt="" />
        <div style={style} className="menu-box">
          <img className='menu-img' src="./teamproject-img-main/icon/mayor-1.png" alt="" />
          <img className='menu-img' src="./teamproject-img-main/icon/mayor-2.png" alt="" />
          <img className='menu-img' src="./teamproject-img-main/icon/mayor-3.png" alt="" />
          <img className='menu-img' src="./teamproject-img-main/icon/service (2).png" alt="" />
          <img className='menu-img' src="./teamproject-img-main/icon/service (3).png" alt="" />
          <img className='menu-img' src="./teamproject-img-main/icon/mayor-1.png" alt="" />
          <img className='menu-img' src="./teamproject-img-main/icon/mayor-2.png" alt="" />
          <img className='menu-img' src="./teamproject-img-main/icon/mayor-3.png" alt="" />
          <img className='menu-img' src="./teamproject-img-main/icon/mayor-1.png" alt="" />
          <img className='menu-img' src="./teamproject-img-main/icon/mayor-2.png" alt="" />
          <img className='menu-img' src="./teamproject-img-main/icon/mayor-3.png" alt="" />
        </div>
        <img onClick={prevSlide} className='arrow' src="./teamproject-img-main/icon/blue-btn-right.png" alt="" />
        {/* <img className='setting' src="./teamproject-img-main/icon/setting-txt.png" alt="" /> */}

      </div>

    </div>
  )
}

export default SwipeMenu


//  지금 저 코드의 문제는 화살표 방향을 클릭하면 나중에 움직이기 시작한다는 건데 이유를 모르겠음. 그래서 챗지피티한테 물어봄

// 현재 코드에서 nextSlide() 함수는 currentImgIndex를 1 증가시키고, 
// transform 속성을 업데이트합니다. 그리고 이벤트 리스너로 할당된 onClick 이벤트 핸들러에 의해 호출됩니다.

// 따라서, nextSlide() 함수를 한 번 호출할 때마다 transform 속성값이 변경되고, 
// currentImgIndex가 1 증가합니다. 그러나, style 상태를 업데이트하는 것은 비동기적으로 이루어지기 때문에, 
// 현재 style 값을 바로 읽어와서 사용하지 않고 이전 currentImgIndex 값으로 계산됩니다. 

// 따라서, 버튼을 빠르게 클릭하면 여러 번 호출되고, 이전 style 값으로 계산되는 경우가 발생할 수 있습니다.

// 해결 방법으로는, nextSlide()와 prevSlide() 함수에서 style 상태 값을 업데이트하는 대신, 
// transform 속성값을 계산하는 함수를 만들고, 이 함수를 style 속성에 직접 할당하는 것입니다. 
// 이렇게 하면, 항상 최신 currentImgIndex 값을 사용하여 transform 속성값이 계산되기 때문에, 버튼을 빠르게 클릭해도 원하는 대로 동작할 것입니다.




// 
// 해결 방법으로는, nextSlide()와 prevSlide() 함수에서 style 상태 값을 업데이트하는 대신, 
// transform 속성값을 계산하는 함수를 만들고, 이 함수를 style 속성에 직접 할당하는 것입니다. 
// 이렇게 하면, 항상 최신 currentImgIndex 값을 사용하여 transform 속성값이 계산되기 때문에, 버튼을 빠르게 클릭해도 원하는 대로 동작할 것입니다.

// 저 상황에 맞는 transform 속성값을 계산하는 함수를 만들어봐
// 아래와 같이 transform 속성값을 계산하는 함수를 만들 수 있습니다.

// const calculateTransform = () => {
//   const percentage = currentImgIndex * -10;
//   return `translateX(${percentage}%)`;
// };
// 이 함수는 현재 이미지 인덱스 값(currentImgIndex)을 사용하여, 현재 슬라이드 위치에 맞는 transform 속성값을 계산합니다. 이때, 이미지 하나당 10%씩 이동하도록 계산하였습니다.

// 이제, 이 함수를 style 속성에 할당하고, nextSlide()와 prevSlide() 함수에서는 currentImgIndex 상태 값을 업데이트만 하도록 변경해주면 됩니다.

// jsx
// Copy code
// const SwipeMenu = () => {

//   const [currentImgIndex, setCurrentImgIndex] = useState(5);

//   const [style, setStyle] = useState({
//     transform: calculateTransform(),
//     transition: `all 0.2s ease-in-out`,
//   });

//   const nextSlide = () => {
//     setCurrentImgIndex(currentImgIndex + 1);
//     setStyle({
//       transform: calculateTransform(),
//       transition: `all 0.2s ease-in-out`,
//     });
//   };

//   const prevSlide = () => {
//     setCurrentImgIndex(currentImgIndex - 1);
//     setStyle({
//       transform: calculateTransform(),
//       transition: `all 0.2s ease-in-out`,
//     });
//   };

//   return (
//     <div>
//       <div className='wrapper'>
//         <img onClick={nextSlide} className='arrow' src="./teamproject-img-main/icon/blue-btn-left.png" alt="" />
//         <div style={style} className="menu-box">
//           {/* 이미지들 */}
//         </div>
//         <img onClick={prevSlide} className='arrow' src="./teamproject-img-main/icon/blue-btn-right.png" alt="" />
//       </div>
//     </div>
//   );
// };
// 이렇게 변경하면, 버튼을 빠르게 클릭해도 원하는 대로 동작할 것입니다.




// 왜 style이 비동기적으로 업데이트 되느냐는 질문에 대한 대답

// React에서 상태(state)를 업데이트할 때, 해당 업데이트는 비동기적으로 이루어집니다. 이는 React의 성능 최적화를 위한 것입니다. 
//React는 업데이트가 일어난 컴포넌트만 다시 렌더링하므로, 여러 개의 상태 업데이트가 동시에 이루어진다면 불필요한 렌더링이 발생할 수 있기 때문입니다.

//따라서, setStyle 함수에 전달하는 객체 안에 currentImgIndex 값을 바로 사용하면 이전 값이 사용될 수 있습니다. 
//이러한 문제를 해결하기 위해서는, setCurrentImgIndex 함수를 호출한 후에 setStyle 함수를 호출하여야 합니다. 
//이렇게 하면, setStyle 함수에서 currentImgIndex 값이 항상 최신 값으로 계산됩니다.




//무슨 말인지 이해가 잘 안가 좀 더 쉽게 설명해줘. 

//React에서 state 값을 변경하면 해당 컴포넌트는 다시 렌더링됩니다. 그리고 컴포넌트가 다시 렌더링되면서, 
//컴포넌트 내부에서 state 값을 참조하는 코드들도 새롭게 실행됩니다.

//그런데, state 값을 변경하는 함수(setState)는 비동기적으로 이루어집니다. 
//즉, state 값을 변경하더라도, 바로 그 다음 줄에서 변경된 값을 사용할 수 없는 경우가 발생할 수 있습니다.

//예를 들어, 코드에서 setCurrentImgIndex(currentImgIndex + 1); 라인에서 state 값을 변경했지만, 
//그 다음 라인에서 setStyle 함수를 호출하여 state 값을 업데이트합니다. 
//이때 setStyle 함수가 호출되는 시점에는 이미 setCurrentImgIndex 함수가 실행되어 state 값이 변경되었지만, 
//setStyle 함수는 아직 변경된 state 값을 알지 못합니다. 따라서 setStyle 함수에서 이전 state 값을 사용하게 되는 것입니다. 
//이것이 비동기적인 상태 업데이트로 인한 문제점입니다.



// 이게 너가 짜준 코드야. 이걸 참조해서 코드를 수정했는데 문제가 발생했어. 
// 예를 들어서, 왼쪽 버튼을 클릭하면 처음은 오른쪽으로 가. 그 다음 클릭부터는 왼쪽으로 이동해. 
// 오른쪽 버튼에서도 똑같은 문제가 발생해. 오른쪽을 클릭하면 처음은 왼쪽을 가. 그 다음부터 오른쪽으로 이동해. 왜 그런거야?

// 문제가 발생한 부분은 슬라이드 이동 방향에 따라 이미지가 이동하지 않고 반대 방향으로 이동하는 것입니다. 
// 이는 현재 이미지 인덱스(currentImgIndex)를 사용하여 transform 속성값을 계산하는 함수(calculateTransform)에서 발생합니다.

// 현재 코드에서는 이미지 하나당 10%씩 이동하도록 계산하고 있기 때문에, 이동 방향에 따라 percentage 값이 양수 또는 음수가 되어야 합니다. 
// 예를 들어, 왼쪽 버튼을 클릭하면 currentImgIndex를 1 감소시키고, percentage는 -10이 되어야 합니다. 
// 반면에 오른쪽 버튼을 클릭하면 currentImgIndex를 1 증가시키고, percentage는 10이 되어야 합니다.

// 문제 해결을 위해서는 슬라이드 이동 방향에 따라 percentage 값이 올바르게 계산되도록 함수를 수정해야 합니다. 
// 아래와 같이 calculateTransform 함수를 수정하면 됩니다.

// jsx
// Copy code
// const calculateTransform = () => {
// const percentage = (currentImgIndex - 5) * -10;
// return translateX(${percentage}%);
// };

// 여기서, 5를 빼는 이유는 currentImgIndex가 5부터 시작하기 때문입니다. 이제 코드를 수정하면, 버튼 클릭에 따라 올바르게 이미지가 이동할 것입니다.