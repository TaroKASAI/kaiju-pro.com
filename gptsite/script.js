document.addEventListener('DOMContentLoaded', function() {
    // お問い合わせ内容で「その他」を選択した場合の処理
    var inquirySelect = document.getElementById('inquiry');
    var otherInquiry = document.getElementById('other-inquiry');
    if (inquirySelect) {
        inquirySelect.addEventListener('change', function() {
            if (this.value === '見積もり依頼' || this.value === 'サービスに関する質問' || this.value === 'コラボレーションの提案' || this.value === 'その他') {
                otherInquiry.style.display = 'block';
            } else {
                otherInquiry.style.display = 'none';
            }
        });
    }
    
    

    // スライドショーの設定
    var slider = document.querySelector('.works-slider');
    var slides = [];
    var slideIndex = 0;

    var imageIndex = 1;

    function loadImage() {
        var imgPath = 'images/page (' + imageIndex + ').jpg';
        var img = new Image();
        img.onload = function() {
            var slide = document.createElement('div');
            slide.className = 'slide';
            var imgElement = document.createElement('img');
            imgElement.src = imgPath;
            imgElement.alt = '作品ページ' + imageIndex;
            imgElement.dataset.index = slides.length; // インデックスをデータ属性に保存
            slide.appendChild(imgElement);
            slider.appendChild(slide);
            slides.push(slide);

            // イベントリスナーを追加
            imgElement.addEventListener('click', function() {
                openLightbox(parseInt(this.dataset.index));
            });

            imageIndex++;
            loadImage(); // 次の画像を読み込む
        };
        img.onerror = function() {
            if (slides.length === 0) {
                console.error('画像が見つかりませんでした。');
            } else {
                startAutoSlide();
            }
        };
        img.src = imgPath;
    }

    loadImage();

    // 自動スライド用タイマー
    var autoSlideTimer;

    function startAutoSlide() {
        autoSlideTimer = setInterval(autoSlide, 4000); // 4秒ごとにスライド
    }

    function autoSlide() {
        moveSlide(1);
    }

    function moveSlide(n) {
        var slideWidth = slides[0].offsetWidth + 10; // スライド幅とマージン
        slideIndex = (slideIndex + n) % slides.length;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        slider.style.transform = 'translateX(' + (-slideIndex * slideWidth) + 'px)';
    }

    // 左右の矢印によるスライド操作
    var leftArrow = document.querySelector('.works-slider-container .left-arrow');
    var rightArrow = document.querySelector('.works-slider-container .right-arrow');

    leftArrow.addEventListener('click', function() {
        clearInterval(autoSlideTimer);
        moveSlide(-1);
        startAutoSlide();
    });

    rightArrow.addEventListener('click', function() {
        clearInterval(autoSlideTimer);
        moveSlide(1);
        startAutoSlide();
    });

    // スライド画像をクリックしたときの処理（拡大表示）
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxLeft = document.getElementById('lightbox-left');
    var lightboxRight = document.getElementById('lightbox-right');
    var closeBtn = document.querySelector('.lightbox .close');

    function openLightbox(index) {
        clearInterval(autoSlideTimer);
        slideIndex = index;
        updateLightbox();
        lightbox.style.display = 'flex';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        startAutoSlide();
    }

    function updateLightbox() {
        lightboxImg.src = slides[slideIndex].querySelector('img').src;
        var slideWidth = slides[0].offsetWidth + 10;
        slider.style.transform = 'translateX(' + (-slideIndex * slideWidth) + 'px)';
    }

    lightboxLeft.addEventListener('click', function(event) {
        event.stopPropagation();
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        updateLightbox();
    });

    lightboxRight.addEventListener('click', function(event) {
        event.stopPropagation();
        slideIndex = (slideIndex + 1) % slides.length;
        updateLightbox();
    });

    closeBtn.addEventListener('click', function() {
        closeLightbox();
    });

    // モーダル外をクリックしたときに閉じる
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // 画面幅をチェックして、h3のテキストを変更する関数
    function updateHeadingText() {
        const heading = document.getElementById('message-from-artist');
        if (window.innerWidth <= 480) {
            heading.textContent = 'メッセージ';
        } else {
            heading.textContent = '制作陣からのメッセージ';
        }
    }

    // ページ読み込み時に一度チェック
    updateHeadingText();

    // 画面サイズが変更されたときにチェック
    window.addEventListener('resize', updateHeadingText);
});
