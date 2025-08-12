const HOST = window.location.host;
const socket = new ReconnectingWebSocket(`ws://${HOST}/ws`);

let isPlayingOrWatching = false;

socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data); // 인게임 데이터 문자열을 JSON 형식으로 데이터 변경하기
    // console.log('받은 데이터:', data);  // 이거 활성화하면 인게임 데이터 로컬웹 콘솔창에 발사함
    const gamestate = data.menu?.state; // 인게임 상태 데이터를 gamestate 변수에 넣기
    const isPlayingNow = (gamestate === 2); // gamestate가 2면 플레이 중(true), 아니면 false

    if (isPlayingNow !== isPlayingOrWatching) { // isPlayingNow 값이랑 isPlayingOrWatching 비교해서 다르면
      isPlayingOrWatching = isPlayingNow; // isPlayingOrWatching에다가 isPlayingNow의 값 집어넣기

      // 전역 변수에 저장해서 Vue 등에서 접근 가능하게
      window.isPlayingOrWatching = isPlayingOrWatching;
    }
  } catch (e) {}
};