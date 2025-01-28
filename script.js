$(document).ready(function() {
    let flippedCards = [];
    let matchedCards = [];

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
        } else {
            $card1.removeClass('is-flipped');
            $card2.removeClass('is-flipped');
        }

        flippedCards = [];
    }
});