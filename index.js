window.addEventListener('DOMContentLoaded', () => {
    //menu
    const burgerButton = document.querySelector('[data-burger-menu-opener]');
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerMenuOverlay = burgerMenu.querySelector('.burger-menu__overlay');
    const burgerMenuCloseButton = burgerMenu.querySelector('.burger-menu__close-btn');

    burgerButton.addEventListener('click', () => {
        burgerMenu.classList.toggle('hidden');
    });

    burgerMenu.addEventListener('click', (e) => {
        if (e.target === burgerMenuOverlay || (e.target === burgerMenuCloseButton || burgerMenuCloseButton.contains(e.target))) {
            burgerMenu.classList.toggle('hidden');
        }
    });

    //modal view
    
    const cartButton = document.querySelector('[data-cart-button]');
    const cartModal = document.querySelector('.cart-modal');

    cartButton.addEventListener('mouseenter', () => {
        cartModal.classList.toggle('hidden');
    });


    //slider
    const sliderBtn = document.querySelector('.sliderBtn-next');

    function slider(width, maxWidth) {
        let offset = 0;
        const sliderLine = document.querySelector('.sliderLine');

        document.querySelector('.sliderBtn-next').addEventListener('click', () => {
            offset = offset - width;
            console.log('as')

            if (offset <= -maxWidth) {
                offset = 0;
            }

            sliderLine.style.left = offset + 'px';
        });
    }
   
    if (sliderBtn) {
        slider(375, 1000);
    }

    //form
    function validateForm() {
        const form = document.querySelector('#form');
        const userNameInpun = document.querySelector('#name');
        const userPhoneInput = document.querySelector('#phone');
        const resultModalView = document.querySelector('#resultModalView');
        const resultModalClose = document.querySelector('#resultModalClose');

        function sendData(name, phone) {
            fetch('/backend/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone
                })
            })

            openResultModal();

            resultModalClose.addEventListener('click', () => {
                closeResultModal()
            });
        }   

        function openResultModal() {
            resultModalView.classList.remove('hidden');
        }

        function closeResultModal() {
            resultModalView.classList.add('hidden');
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let userName = userNameInpun.value.replace(/\s/g, "").toLowerCase();
            let userPhone = userPhoneInput.value.replace(/\s/g, "");      

            if (isNaN(userPhoneInput.value)) {
                console.error('Input type error!');
                return;
            }

            if (userNameInpun.value === '' || userPhoneInput.value === '') {
                console.error('Input must not be empty!');
                return;
            }

            sendData(userName, userPhone);
        });
    }

    validateForm();
});