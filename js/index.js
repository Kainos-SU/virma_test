(()=>{
        function colorBlocks() {
                $(".color-block--adjustable").each(function (index) {
                var text = $(this).children(".color-block__text");
                if (text.length === 0) {
                    this.style.color = "gray";
                    return;
                }

                var reg = /^#([A-F,a-f,0-9]{3}|[A-F,a-f,0-9]{6})$/gi;
                if (reg.exec(text.text()) === null) {
                    this.style.color = "gray";
                    return;
                }

                this.style.color = text.text();
            });
            window.requestAnimationFrame(colorBlocks);
        }

        colorBlocks();
        
        
})()