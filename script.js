$(document).ready(function() {
    let flippedCards = [];
    let matchedCards = [];
    let matchedCount = 0;

    $(".card").on('click', function() {
        if (flippedCards.length < 2 &&! flippedCards.includes($(this)) &&!matchedCards.includes($(this))) {
            $(this).addClass('is-flipped');
            flippedCards.push($(this));
            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 1000);
            }
        }
    });

    function checkForMatch() {
        const $card1 = flippedCards[0];
        const $card2 = flippedCards[1];

        if ($card1.data('image') === $card2.data('image')) {
            matchedCards.push($card1, $card2);
            $card1.addClass('is-matched');
            $card2.addClass('is-matched');

            matchedCount++;
            if (matchedCount === $('.card').length / 2) {
                finishGame();
            }
        } else {
            $card1.removeClass('is-flipped');
            $card2.removeClass('is-flipped');
        }

        flippedCards = [];
    }

    function finishGame() {
        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }
});