/**
 * ==========================================================
 * ToolXone Statistics Animation
 * Version: 1.0
 * ==========================================================
 * Handles all statistics animations.
 * ==========================================================
 */

const ToolXoneStatisticsAnimation = (() => {

    /**
     * Animate Number
     */

    function animateValue(

        element,

        endValue,

        duration = 1200

    ) {

        if (!element) {

            return;

        }

        const startValue = Number(

    element.textContent.replace(/,/g, "")

) || 0;

if (startValue === endValue) {

    return;

}

const startTime = performance.now();

        function update(currentTime) {

            const progress = Math.min(

                (currentTime - startTime) / duration,

                1

            );

            const value = Math.floor(

                startValue +

                (endValue - startValue) * progress

            );

            const formattedValue = value.toLocaleString();

if (element.textContent !== formattedValue) {

    element.textContent = formattedValue;

}

if (progress < 1) {

    requestAnimationFrame(update);

}

else {

    element.textContent =
        endValue.toLocaleString();

}
        }

        requestAnimationFrame(update);

    }

    return {

        animateValue

    };

})();