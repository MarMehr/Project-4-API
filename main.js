/* =========================
   CALCULATOR LOGIC
========================= */

const calcDisplay = document.getElementById("calcDisplay");
const buttons = document.querySelectorAll(".btn-calc, .btn-op");
const clearBtn = document.getElementById("clearBtn");
const equalsBtn = document.getElementById("equalsBtn");

let expression = "";

// When any number / operator is clicked
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    expression += btn.dataset.val;
    calcDisplay.value = expression;
  });
});

// Clear button
clearBtn.addEventListener("click", () => {
  expression = "";
  calcDisplay.value = "";
});

// Popmotion imported globally from the script tag in index.html
const { tween, easing, styler } = window.popmotion || popmotion;

// Styler for the display to animate it
const displayStyler = styler(calcDisplay);

// Tiny animation on display when calculation completes
const animateDisplay = () => {
  tween({
    from: { scale: 1, boxShadow: "0px 0px 0px rgba(0, 255, 176, 0.0)" },
    to: { scale: 1.04, boxShadow: "0px 0px 12px rgba(0, 255, 176, 0.8)" },
    duration: 200,
    ease: easing.easeOut
  }).start({
    update: (v) => displayStyler.set(v),
    complete: () => {
      // Tween back to normal
      tween({
        from: { scale: 1.04, boxShadow: "0px 0px 12px rgba(0, 255, 176, 0.8)" },
        to: { scale: 1, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" },
        duration: 200,
        ease: easing.easeIn
      }).start((v) => displayStyler.set(v));
    }
  });
};

// Equals / evaluation
equalsBtn.addEventListener("click", () => {
  if (!expression) return;

  try {
    // Evaluate the expression (simple calculator)
    const result = eval(expression); // OK here for a small demo
    expression = result.toString();
    calcDisplay.value = expression;

    // Animate the display with Popmotion
    animateDisplay();
  } catch (err) {
    calcDisplay.value = "Error";
    expression = "";
  }
});

/* =========================
   POPMOTION ANIMATION (BOX)
========================= */

const animateBtn = document.getElementById("animateBtn");
const resetBtn = document.getElementById("resetBtn");
const animBox = document.getElementById("animBox");

const boxStyler = styler(animBox);

const resetBox = () => {
  boxStyler.set({
    x: 0,
    scale: 1,
    rotate: 0
  });
};

resetBtn.addEventListener("click", resetBox);

animateBtn.addEventListener("click", () => {
  // Move right, rotate, scale up
  tween({
    from: { x: 0, scale: 1, rotate: 0 },
    to: { x: 220, scale: 1.3, rotate: 360 },
    duration: 900,
    ease: easing.easeInOut
  }).start((v) => boxStyler.set(v));

  // Then return to original
  setTimeout(() => {
    tween({
      from: { x: 220, scale: 1.3, rotate: 360 },
      to: { x: 0, scale: 1, rotate: 0 },
      duration: 700,
      ease: easing.easeOut
    }).start((v) => boxStyler.set(v));
  }, 920);
});

// Initialize
resetBox();
