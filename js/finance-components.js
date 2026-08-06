// ======================================
// TOOLXONE Finance Components
// Shared UI Components
// ======================================

function renderFinanceInfo(containerId, title, description) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `
        <section class="info-section">
            <h2>${title}</h2>
            <p>${description}</p>
        </section>
    `;
}

function renderFinanceFAQ(containerId, faqs) {

    const container = document.getElementById(containerId);

    if (!container || !Array.isArray(faqs)) return;

    container.innerHTML = `
<section class="tx-faq-section">

    <h2>Frequently Asked Questions</h2>

    ${faqs.map(item => `
<details class="toolxone-faq-item">

    <summary
        aria-expanded="false"
    >
        ${item.question}
    </summary>

    <div class="toolxone-faq-answer">

        <p>
            ${item.answer}
        </p>

        </div>

         </details>
    `).join("")}

   </section>
`;

}

function renderFinanceFeedback(containerId, toolName = "ToolXone Tool") {

    const container = document.getElementById(containerId);

    if (!container) return;

container.innerHTML = `
<section class="tx-feedback-section" data-tool="${toolName}">

    <div class="tx-feedback-header">

        <div class="tx-feedback-icon">
            💬
        </div>

        <h2>Help Improve ToolXone</h2>

        <p>
            Your feedback helps us build faster, smarter and more accurate tools
            for everyone.
        </p>

    </div>

    <div class="tx-feedback-tool">

        <span class="tx-feedback-label">
            Current Tool
        </span>

        <strong>${toolName}</strong>

    </div>

    <form class="feedback-form">

        <!-- Rating -->

        <div class="tx-feedback-group">

            <label class="tx-feedback-title">
                ⭐ Rate this Tool
            </label>

            <div class="rating-options">

                <label class="rating-card">

                    <input
                        type="radio"
                        name="toolRating"
                        value="5"
                    >

                    <span>★★★★★</span>

                    <small>Excellent</small>

                </label>

                <label class="rating-card">

                    <input
                        type="radio"
                        name="toolRating"
                        value="4"
                    >

                    <span>★★★★☆</span>

                    <small>Very Good</small>

                </label>

                <label class="rating-card">

                    <input
                        type="radio"
                        name="toolRating"
                        value="3"
                    >

                    <span>★★★☆☆</span>

                    <small>Good</small>

                </label>

                <label class="rating-card">

                    <input
                        type="radio"
                        name="toolRating"
                        value="2"
                    >

                    <span>★★☆☆☆</span>

                    <small>Needs Improvement</small>

                </label>

                <label class="rating-card">

                    <input
                        type="radio"
                        name="toolRating"
                        value="1"
                    >

                    <span>★☆☆☆☆</span>

                    <small>Poor</small>

                </label>

            </div>

        </div>

        <!-- Feedback Type -->

        <div class="tx-feedback-group">

            <label>
                Feedback Type
            </label>

            <select class="feedback-type">

                <option>💡 Suggest a Feature</option>

                <option>🐞 Report a Bug</option>

                <option>❤️ General Feedback</option>

                <option>⚡ Performance Issue</option>

                <option>🎨 UI / Design Suggestion</option>

            </select>

        </div>

        <!-- Name -->

        <div class="tx-feedback-group">

            <label>
                Your Name (Optional)
            </label>

            <input
                type="text"
                class="feedback-name"
                placeholder="Enter your name"
            >

        </div>

        <!-- Email -->

        <div class="tx-feedback-group">

            <label>
                Email (Optional)
            </label>

            <input
                type="email"
                class="feedback-email"
                placeholder="your@email.com"
            >

        </div>

        <!-- Message -->

        <div class="tx-feedback-group">

            <label>
                Your Message
            </label>

            <textarea
                class="feedback-message"
                rows="7"
                placeholder="Tell us your experience, report a bug or suggest a new feature..."
            ></textarea>

        </div>

        <button
            class="feedback-submit"
            type="submit"
        >
            🚀 Submit Feedback
        </button>

        <div class="feedback-status"></div>

    </form>

    <div class="tx-feedback-note">

        🔒 Your information stays private.
        We never publish your email address.

    </div>

</section>
`;

}

/*=========================================================
  ToolXone Review Component
=========================================================*/

function renderToolReviews(containerId, toolName = "ToolXone Tool") {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = `

<section class="tx-review-section">

    <div class="tx-review-header">

        <div class="tx-review-icon">
            ⭐
        </div>

        <h2>Tool Reviews</h2>

        <p>

            See what our users think about the
            <strong>${toolName}</strong>.

            Every review helps us improve ToolXone.

        </p>

    </div>

    <div class="tx-review-summary">

        <div class="tx-review-score">

            <div class="tx-rating-number">
                4.9
            </div>

            <div class="tx-rating-stars">
                ★★★★★
            </div>

            <div class="tx-rating-text">

                Based on

                <strong>1,247</strong>

                reviews

            </div>

        </div>
        
                <div class="tx-rating-breakdown">

            <div class="tx-rating-row">

                <span>★★★★★</span>

                <div class="tx-rating-bar">
                    <div class="tx-rating-fill" style="width:92%"></div>
                </div>

                <strong>92%</strong>

            </div>

            <div class="tx-rating-row">

                <span>★★★★☆</span>

                <div class="tx-rating-bar">
                    <div class="tx-rating-fill" style="width:6%"></div>
                </div>

                <strong>6%</strong>

            </div>

            <div class="tx-rating-row">

                <span>★★★☆☆</span>

                <div class="tx-rating-bar">
                    <div class="tx-rating-fill" style="width:1%"></div>
                </div>

                <strong>1%</strong>

            </div>

            <div class="tx-rating-row">

                <span>★★☆☆☆</span>

                <div class="tx-rating-bar">
                    <div class="tx-rating-fill" style="width:0%"></div>
                </div>

                <strong>0%</strong>

            </div>

            <div class="tx-rating-row">

                <span>★☆☆☆☆</span>

                <div class="tx-rating-bar">
                    <div class="tx-rating-fill" style="width:1%"></div>
                </div>

                <strong>1%</strong>

            </div>

        </div>

    </div>

        <div class="tx-review-list">

        <article class="tx-review-card">

            <div class="tx-review-top">

                <div class="tx-review-avatar">
                    U
                </div>

                <div class="tx-review-user">

                    <h4>Umar</h4>

                    <span>Verified User</span>

                </div>

                <div class="tx-review-date">
                    2 days ago
                </div>

            </div>

            <div class="tx-review-stars">

                ★★★★★

            </div>

            <p class="tx-review-message">

                Excellent calculator. Very fast, accurate and easy to use.
                It has every scientific function I needed.

            </p>

            <div class="tx-review-footer">

                <button
                    class="tx-review-helpful"
                    type="button"
                >

                    👍 Helpful (24)

                </button>

            </div>

        </article>

                <article class="tx-review-card">

            <div class="tx-review-top">

                <div class="tx-review-avatar">
                    S
                </div>

                <div class="tx-review-user">

                    <h4>Sarah</h4>

                    <span>Verified User</span>

                </div>

                <div class="tx-review-date">
                    Yesterday
                </div>

            </div>

            <div class="tx-review-stars">

                ★★★★☆

            </div>

            <p class="tx-review-message">

                Very clean interface and extremely easy to use.
                It works perfectly on both desktop and mobile.

            </p>

            <div class="tx-review-footer">

                <button
                    class="tx-review-helpful"
                    type="button"
                >

                    👍 Helpful (18)

                </button>

            </div>

        </article>

    </div>

    </section>

    `;

}

window.renderToolReviews = renderToolReviews;


// ===============================
// TOOLXONE FEEDBACK SYSTEM
// ===============================

document.addEventListener("submit", function (e) {

    if (!e.target.classList.contains("feedback-form")) return;

    e.preventDefault();

    const form = e.target;
    const section = form.closest(".feedback-section");
    const submitBtn = form.querySelector(".feedback-submit");
    const status = form.querySelector(".feedback-status");

    const rating = form.querySelector('input[name="toolRating"]:checked');
    const type = form.querySelector(".feedback-type").value;
    const name = form.querySelector(".feedback-name").value.trim() || "Anonymous";
    const email = form.querySelector(".feedback-email").value.trim() || "Not Provided";
    const message = form.querySelector(".feedback-message").value.trim();

    if (!rating) {
        status.innerHTML = "⭐ Please select a rating.";
        status.className = "feedback-status error";
        return;
    }

    if (message.length < 10) {
        status.innerHTML = "✍️ Please write at least 10 characters.";
        status.className = "feedback-status error";
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = "⏳ Sending...";

    const ratingMap = {
        "5": "★★★★★ Excellent",
        "4": "★★★★ Very Good",
        "3": "★★★ Good",
        "2": "★★ Needs Improvement",
        "1": "★ Poor"
    };

    const googleForm = document.createElement("form");
    googleForm.method = "POST";
    googleForm.action = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdOXkUo9mkEQp8p-Jv-P8-1rhTj50icBwMtq5HkVrlbbUt0pg/formResponse?pli=1";
    googleForm.target = "hiddenGoogleFormFrame";
    googleForm.style.display = "none";

    const iframe = document.createElement("iframe");
    iframe.name = "hiddenGoogleFormFrame";
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const fields = {
        "entry.114908239": section.dataset.tool,
        "entry.1084107115": ratingMap[rating.value],
        "entry.1298677595": type,
        "entry.1551489435": name,
        "entry.1422424945": email,
        "entry.115849848": message,
        "fvv": "1",
        "partialResponse": '[null,null,"4696885395784088671"]',
        "pageHistory": "0",
        "fbzx": "4696885395784088671",
        "submissionTimestamp": "-1"
    };

    for (const key in fields) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = fields[key];
        googleForm.appendChild(input);
    }

    document.body.appendChild(googleForm);
    googleForm.submit();

    status.innerHTML = `🎉 Thank you, ${name}! Your feedback has been submitted successfully.`;
    status.className = "feedback-status success";

    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = "🚀 Submit Feedback";

    setTimeout(() => {
        googleForm.remove();
        iframe.remove();
    }, 3000);
});