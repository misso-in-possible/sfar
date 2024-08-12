import anime from 'animejs/lib/anime.es.js';
import { VFX } from "@vfx-js/core";
import { version } from 'animejs';

// 正しい要素を取得
const element = document.querySelector('#abc');

const vfx = new VFX();
vfx.add(element, { shader: "glitch" });


// fitElementToParent関数: 親要素に対して要素のサイズを調整
function fitElementToParent(el, padding) {
  var timeout = null;

  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, { scale: 1 });
    var pad = padding || 0;
    var parentEl = el.parentNode;
    var elOffsetWidth = el.offsetWidth - pad;
    var parentOffsetWidth = parentEl.offsetWidth;
    var ratio = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(function() {
      anime.set(el, { scale: ratio });
    }, 10);
  }

  // 初期リサイズ実行
  resize();
  // ウィンドウのリサイズ時にresize関数を実行
  window.addEventListener('resize', resize);
}

// layeredAnimation: アルファベットにアニメーションを適用する関数
var layeredAnimation = (function() {
  var layeredAnimationEl = document.querySelector('.layered-animations');
  var shapeEls = layeredAnimationEl.querySelectorAll('.large');
  var easings = ['easeInOutQuad', 'easeInOutCirc', 'easeInOutSine', 'spring'];

  // 親要素にフィットさせる
  fitElementToParent(layeredAnimationEl);

  function createKeyframes(value) {
    var keyframes = [];
    for (var i = 0; i < 30; i++) keyframes.push({ value: value });
    return keyframes;
  }

  function animateShape(el) {
    anime.timeline({
      targets: el,
      duration: function() { return anime.random(600, 2200); },
      easing: function() { return easings[anime.random(0, easings.length - 1)]; },
      loop: true,  // ここでループを設定
      complete: function(anim) { 
        // ここは不要になります。loop: true により自動でループするため。消したらエラー起きたからとりあえず置いとく
      }
    })

    .add({
      translateX: createKeyframes(function(el) {
        return anime.random(-300, 300);
      }),
      translateY: createKeyframes(function(el) {
        return anime.random(-110, 110);
      }),
      rotate: createKeyframes(function() { return anime.random(-180, 180);
      }),
      scale: Array.from({ length: 80 }, (_, i) => ({
        value: anime.random(i % 2 === 0 ? 3 : 10, i % 2 === 0 ? 10 : 3),
        duration: 500
      }))
      
    }, 0);
  }

  // 全てのアルファベットに対してアニメーションを適用
  shapeEls.forEach(function(el) {
    animateShape(el);
  });

})();





// anime({
//   targets: 'box',
//   translateX: 250,
//   rotate: '1turn',
//   backgroundColor: '#0000ff',
//   duration: 800
// });

// anime({
//   targets: '.button',
//   translateX: 250,
//   backgroundColor: '#086776'
// });
