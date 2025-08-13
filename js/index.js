const app = Vue.createApp({ // 실시간 반응형 인터페이스
  data() {
    return {
      isPlayingOrWatching: false, // isPlayingOrWatching변수 초기값 지정
    };
  },
  mounted() {
const socket = new ReconnectingWebSocket(`ws://${window.location.host}/ws`); // 게임 웹소켓 연결

    socket.onmessage = (event) => { // 서버에서 받은 데이터 처리
      try {
        const data = JSON.parse(event.data); // 서버에서 받은 데이터 json 형식으로
		// console.log('받은 데이터:', data);  // 이거 활성화하면 인게임 데이터 로컬웹 콘솔창에 발사함
        const isPlayingNow = (data.menu?.state === 2); // menu.state 값이 2라면 게임플레이 중

        if (isPlayingNow !== this.isPlayingOrWatching) { // 이전에 저장된 상태(isPlayingOrWatching)와 현재 상태(isPlayingNow)가 다를 때
          this.isPlayingOrWatching = isPlayingNow; //  isPlayingOrWatching 값에 isPlayingNow를 넣음
        }
      } catch (e) {}
    };
  },
});

app.mount('#overlay');
