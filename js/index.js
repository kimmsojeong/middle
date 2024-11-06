$(document).ready(function () {
  const initialPosition = { left: "7%", bottom: "23%" };

  function initializeCanvas(canvasId) {
    const canvas = $(canvasId)[0];
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return context;
  }

  const pixieContext = initializeCanvas("#pixie");
  const busRouteContext = initializeCanvas("#bus-route");

  function percentageToPixels(percent, dimension) {
    return (parseFloat(percent) / 100) * dimension;
  }

  let lastPosition = {
    x: percentageToPixels(initialPosition.left, window.innerWidth),
    y:
      window.innerHeight -
      percentageToPixels(initialPosition.bottom, window.innerHeight),
  };

  function animateLineDraw(destinationX, destinationY, duration) {
    const startX = lastPosition.x;
    const startY = lastPosition.y;
    const distanceX = destinationX - startX;
    const distanceY = destinationY - startY;
    const startTime = performance.now();

    function drawFrame(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentX = startX + distanceX * progress;
      const currentY = startY + distanceY * progress;

      busRouteContext.beginPath();
      busRouteContext.moveTo(lastPosition.x, lastPosition.y);
      busRouteContext.lineTo(currentX, currentY);
      busRouteContext.strokeStyle = "rgba(255, 255, 255, 1)";
      busRouteContext.lineWidth = 2;
      busRouteContext.shadowBlur = 10;
      busRouteContext.shadowColor = "rgba(84, 171, 255)";
      busRouteContext.stroke();

      lastPosition = { x: currentX, y: currentY };

      if (progress < 1) {
        requestAnimationFrame(drawFrame);
      } else {
        lastPosition = { x: destinationX, y: destinationY };
      }
    }

    requestAnimationFrame(drawFrame);
  }

  function animateLineErase(destinationX, destinationY, duration) {
    const startX = lastPosition.x;
    const startY = lastPosition.y;
    const distanceX = destinationX - startX;
    const distanceY = destinationY - startY;
    const startTime = performance.now();

    function eraseFrame(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentX = startX + distanceX * (1 - progress);
      const currentY = startY + distanceY * (1 - progress);

      busRouteContext.clearRect(currentX - 5, currentY - 5, 10, 10);

      if (progress < 1) {
        requestAnimationFrame(eraseFrame);
      } else {
        lastPosition = { x: destinationX, y: destinationY };
      }
    }

    requestAnimationFrame(eraseFrame);
  }

  //text-box 상자 내 들어갈 내용 설정
  const starTexts = {
    ".star-1": `야생화 정원 산책, 웰컴티를 마시며 버스킹 관람<br><br>
    <span style="font-family: 'GmarketSansLight'; color: #E1DEF3; font-size: 0.8em; 
    opacity: 0.8; line-height: 1.8; margin-top: -25px; display: inline-block;">
      어느날 밤 소풍을 온 듯한 기분! 그리스 신전과도 같은 큰 규모의 공간을 경험하고<br>
      0.5층 가이아의 정원 무대에서 여름과 잘 어울리는 아임버스커 아티스트의 공연 관람하기
    </span>`,
    ".star-2": `<수영장 이야기> 작가와 함께하는 힐링여행<br><br>
      <span style="font-family: 'GmarketSansLight'; color: #E1DEF3; font-size: 0.8em; 
      opacity: 0.8; line-height: 1.8; margin-top: -25px; display: inline-block;">
        마치 파리의 살롱에 입장한 듯한 기분이 드는 시간정원의 작업실에서<br>
        <수영장이야기>작가 박영희와의 만남, 컬러링북 채색 체험 등을 통해 갖는 힐링의 시간
      </span>`,
    ".star-3": `넓은 초원에서 즐기는 유럽풍 콘서트와 낙농체험<br><br>
          <span style="font-family: 'GmarketSansLight'; color: #E1DEF3; font-size: 0.8em; 
          opacity: 0.8; line-height: 1.8; margin-top: -25px; display: inline-block;">
            우리나라에서 가장 오래된 농장 중 하나로 3대째 가업을 잇고 있는 목장. 넓은 초지 초원과<br>
            반딧불이가 서식하는 청정환경으로 스위스 알프스를 연상케 해 하이디가 우리를 반기는 모습이 떠오르는 곳
          </span>`,
  };
  $(".text-box, #additional-text-box").hide();

  $(".star-0").on("click", function () {
    $(".text-box, #additional-text-box").fadeOut(500);
  });

  $(".star-1, .star-2, .star-3").on("click", function () {
    const starClass = "." + $(this).attr("class").split(" ")[1];

    $(".text-box").stop(true, true).hide();

    setTimeout(() => {
      $("#star-text").html(starTexts[starClass]);
      $(".text-box").fadeIn(500);
    }, 300);

    if (starClass === ".star-2") {
      $("#additional-text").html(
        `<span style='font-weight: bold; font-size: 1.3em; line-height: 2; color: #B8FFFF; margin-top: -20px; display: inline-block;'>추천코스</span>
          <br>나에게 전하는 메세지 → 작가와의 만남→ <br>
          컬러링북 채색 → 수영장 이야기 (전시)"`
      );
      $("#additional-text-box").fadeIn(500);
    } else {
      $("#additional-text-box").fadeOut(500);
    }
  });

  const starPositions = {
    ".star-0": {
      left: "6%",
      bottom: "23%",
      textId: "#text0",
      textId2: "#text-0",
      newImage: "img/Star_2.png",
      moonImage: "img/Moon.png",
    },
    ".star-1": {
      left: "30%",
      bottom: "23%",
      textId: "#text1",
      textId2: "#text-1",
      newImage: "img/Star_2.png",
      textDisplay: "#text-first",
      additionalTexts: ["#text-additional1"],
      moonImage: "img/Moon_1.png",
    },
    ".star-2": {
      left: "60%",
      bottom: "23%",
      textId: "#text2",
      textId2: "#text-2",
      newImage: "img/Star_2.png",
      textDisplay: "#text-second",
      additionalTexts: ["#text-additional2"],
      moonImage: "img/Moon_2.png",
    },
    ".star-3": {
      left: "90%",
      bottom: "23%",
      textId: "#text3",
      textId2: "#text-3",
      newImage: "img/Star_2.png",
      textDisplay: "#text-third",
      additionalTexts: ["#text-additional3"],
      moonImage: "img/Moon_3.png",
    },
  };

  $(".bus").css(initialPosition);

  let currentPositionIndex = 0;

  $.each(starPositions, function (starClass, position) {
    $(starClass).on("click", function () {
      const destinationX = percentageToPixels(position.left, window.innerWidth);
      const destinationY =
        window.innerHeight -
        percentageToPixels(position.bottom, window.innerHeight);

      const clickedPositionIndex =
        Object.keys(starPositions).indexOf(starClass);

      if (clickedPositionIndex > currentPositionIndex) {
        animateLineDraw(destinationX, destinationY, 1000);
      } else if (clickedPositionIndex < currentPositionIndex) {
        animateLineErase(destinationX, destinationY, 1000);
      }

      currentPositionIndex = clickedPositionIndex;

      $(".bus").stop().animate(
        {
          left: position.left,
          bottom: position.bottom,
        },
        1000
      );

      Object.keys(starPositions).forEach((key, index) => {
        if (index <= clickedPositionIndex) {
          $(key).addClass("visited").attr("src", "img/Star_2.png");
        } else {
          $(key).removeClass("visited active").attr("src", "img/Star.png");
        }
      });

      $(this).addClass("active");

      $(position.textId).addClass("active");
      $(position.textId2).addClass("active");

      $.each(starPositions, function (otherStarClass, otherPosition) {
        if (otherStarClass !== starClass) {
          $(otherPosition.textId).removeClass("active");
          $(otherPosition.textId2).removeClass("active");
          $(otherStarClass).removeClass("active");
        }
      });

      // 첫 번째에서 두 번째 별로 이동할 때는 전환 효과 제외
      if (currentPositionIndex !== 0 || clickedPositionIndex !== 1) {
        if (starClass !== ".star-0") {
          $(".tittle, .subtitle, .date, .info, .info_detail")
            .stop()
            .fadeOut(1000);

          // 달 이미지 페이드 아웃 -> 변경 -> 페이드 인
          $(".moon").fadeOut(500, function () {
            $(this).attr("src", position.moonImage).fadeIn(500);
            $(this).addClass("expand");
          });

          // 모든 text-display 요소를 숨기고, 현재 별에 해당하는 텍스트만 타이핑 효과로 보여줌
          $(".text-display").hide();
          if (position.textDisplay) {
            $(position.textDisplay).show(); // 먼저 보이게 설정
            typeEffect(position.textDisplay, 100); // 타이핑 효과 적용
          }

          // 추가 텍스트 요소 순차적으로 나타나기
          if (position.additionalTexts) {
            position.additionalTexts.forEach((selector, index) => {
              setTimeout(function () {
                $(selector).fadeIn(1000);
              }, 1000 * (index + 1));
            });
          }

          // 첫 번째 별이 아닌 경우에만 text-box를 업데이트하고 보여줌
          if (starClass !== ".star-0") {
            $("#star-text").html(starTexts[starClass]);
            $(".text-box").fadeIn(500); // 텍스트 박스를 표시
          }
        } else {
          $(".tittle, .subtitle, .date, .info, .info_detail").fadeIn(1000);
          $(".moon")
            .removeClass("expand new-image-position")
            .attr("src", "img/Moon.png")
            .fadeIn(500);
          $(".text-display").hide();
          $(".text-box").fadeOut(500);
        }
      } else {
        if (starClass !== ".star-0") {
          $(".moon").attr("src", position.moonImage).addClass("expand");
          $(".text-display").hide();
          if (position.textDisplay) {
            $(position.textDisplay).show();
          }
        }
      }
    });
  });

  $(".star-0").trigger("click");

  // 타이핑 효과 함수
  function typeEffect(element, speed) {
    const text = $(element).text();
    $(element).html("");
    let i = 0;
    function typing() {
      if (i < text.length) {
        $(element).append(text.charAt(i));
        i++;
        setTimeout(typing, speed);
      }
    }
    typing();
  }

  let animationTimeouts = []; // 애니메이션 타임아웃 ID를 저장할 배열

  // 초기 텍스트 애니메이션 효과
  function startInitialAnimations() {
    $(".tittle").hide().fadeIn(2000);

    $(".subtitle").css("visibility", "hidden");
    animationTimeouts.push(
      setTimeout(function () {
        $(".subtitle").css("visibility", "visible");
        typeEffect(".subtitle", 100);
      }, 1000)
    );

    $(".date, .info.info-1, .info.info-2, .info_detail").hide();
    animationTimeouts.push(
      setTimeout(function () {
        $(".date").fadeIn(2000);
      }, 2500)
    );
    animationTimeouts.push(
      setTimeout(function () {
        $(".info.info-1, .info.info-2").fadeIn(2000);
      }, 4000)
    );
    animationTimeouts.push(
      setTimeout(function () {
        $(".info_detail").fadeIn(2000);
      }, 6000)
    );
  }

  // 첫 화면 애니메이션 중단 및 요소 숨기기
  function stopInitialAnimations() {
    // 예약된 모든 타임아웃을 취소
    animationTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    animationTimeouts = []; // 타임아웃 ID 배열 초기화

    // 즉시 요소를 숨기기
    $(".tittle, .subtitle, .date, .info.info-1, .info.info-2, .info_detail")
      .stop(true, true)
      .hide();
  }

  // 첫 화면 애니메이션 시작
  startInitialAnimations();

  // 별 클릭 이벤트
  $(".star-1, .star-2, .star-3").on("click", function () {
    const starClass = "." + $(this).attr("class").split(" ")[1];

    // 첫 화면 애니메이션 중단 (2~4번째 별 클릭 시)
    stopInitialAnimations();

    // 별 텍스트 박스 업데이트 및 표시
    $(".text-box").stop(true, true).hide();
    setTimeout(() => {
      $("#star-text").html(starTexts[starClass]);
      $(".text-box").fadeIn(500);
    }, 300);
  });

  //밤하늘 별 움직임
  var WIDTH = $(window).width();
  var HEIGHT = $(window).height();
  var MAX_PARTICLES = (WIDTH * HEIGHT) / 20000;
  var DRAW_INTERVAL = 60;
  var canvas = $("#pixie")[0];
  var context = canvas.getContext("2d");
  var gradient = null;
  var pixies = [];

  function setDimensions() {
    WIDTH = $(window).width();
    HEIGHT = $(window).height();
    MAX_PARTICLES = (WIDTH * HEIGHT) / 15000;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    console.log("Resize to " + WIDTH + "x" + HEIGHT);
  }

  setDimensions();
  $(window).on("resize", setDimensions);

  function Circle() {
    this.settings = {
      ttl: 5000,
      xmax: 0.8,
      ymax: 0.3,
      rmin: 7,
      rmax: 10,
      drt: 10,
    };

    this.reset = function () {
      this.x = WIDTH * Math.random();
      this.y = HEIGHT * Math.random();
      this.r = (this.settings.rmax - 1) * Math.random() + 1;
      this.dx =
        Math.random() * this.settings.xmax * (Math.random() < 0.5 ? -1 : 1);
      this.dy =
        Math.random() * this.settings.ymax * (Math.random() < 0.5 ? -1 : 1);
      this.hl =
        (this.settings.ttl / DRAW_INTERVAL) * (this.r / this.settings.rmax);
      this.rt = 0;
      this.settings.drt = Math.random() + 1;
      this.stop = Math.random() * 0.2 + 0.4;
    };

    this.fade = function () {
      this.rt += this.settings.drt;

      if (this.rt >= this.hl) {
        this.rt = this.hl;
        this.settings.drt = this.settings.drt * -1;
      } else if (this.rt < 0) {
        this.reset();
      }
    };

    this.draw = function () {
      var newo = this.rt / this.hl;
      context.beginPath();
      context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
      context.closePath();

      var cr = this.r * newo;
      gradient = context.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        cr < this.settings.rmin ? this.settings.rmin : cr
      );
      gradient.addColorStop(0.0, "rgba(84, 171, 255," + newo + ")");
      gradient.addColorStop(this.stop, "rgba(0, 71, 227," + newo * 0.4 + ")");
      gradient.addColorStop(1.0, "rgba(88, 121, 190,0)");
      context.fillStyle = gradient;
      context.fill();
    };

    this.move = function () {
      this.x += (1 - this.rt / this.hl) * this.dx;
      this.y += (1 - this.rt / this.hl) * this.dy;
      if (this.x > WIDTH || this.x < 0) this.dx *= -1;
      if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
    };
  }

  function draw() {
    context.clearRect(0, 0, WIDTH, HEIGHT);

    for (var i = pixies.length; i < MAX_PARTICLES; i++) {
      pixies.push(new Circle());
      pixies[i].reset();
    }

    for (var i = 0; i < MAX_PARTICLES; i++) {
      pixies[i].fade();
      pixies[i].move();
      pixies[i].draw();
    }
  }

  setInterval(draw, DRAW_INTERVAL);

  //유성 떨어지는 효과
  const MAX_METEORS = 5;
  const colors = ["#54abff", "#97CCFF"];

  function createMeteor() {
    const meteor = $('<div class="meteor"></div>');
    $("#meteor-container").append(meteor);

    const angle = 30;
    const delay = Math.random() * 5 + "s";
    const duration = Math.random() * 3.5 + 2 + "s";
    const color = colors[Math.floor(Math.random() * colors.length)];

    const startX = Math.random() * window.innerWidth;
    meteor.css({
      left: `${startX}px`,
      top: "-10vh",
      transform: `rotate(${angle}deg)`,
      backgroundColor: color,
      animationDelay: delay,
      animationDuration: duration,
      opacity: 0.8,
    });

    meteor.css({
      animationName: "fall",
    });

    meteor.on("animationend", function () {
      meteor.remove();
    });
  }

  $("<style>")
    .prop("type", "text/css")
    .html(
      `
      @keyframes fall {
        0% { top: -10vh; opacity: 1; }
        100% { top: 110vh; transform: translateX(150vw); opacity: 0; }
      }
    `
    )
    .appendTo("head");

  setInterval(createMeteor, 1000);
});
