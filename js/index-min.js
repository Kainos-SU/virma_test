(()=>{!function t(){$(".color-block--adjustable").each(function(t){var e=$(this).children(".color-block__text");0!==e.length&&null!==/^#([A-F,a-f,0-9]{3}|[A-F,a-f,0-9]{6})$/gi.exec(e.text())?this.style.color=e.text():this.style.color="gray"}),window.requestAnimationFrame(t)}()})();