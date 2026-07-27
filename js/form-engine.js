function renderForm(containerId, fields) {
    const container =
        document.getElementById(containerId);

    if (!container) return;

    let html = "";

    fields.forEach(field => {

        html += `
            <div class="form-group">
                <label for="${field.id}">
                    ${field.label}
                </label>
        `;

        if (field.type === "select") {

            html += `
                <select
                    id="${field.id}"
                    ${field.name ? `name="${field.name}"` : ""}
                    ${field.required ? "required" : ""}
                    ${field.ariaLabel ? `aria-label="${field.ariaLabel}"` : ""}
                >
            `;

            field.options.forEach(option => {
                html += `
                    <option value="${option.value}">
                        ${option.label}
                    </option>
                `;
            });

            html += `
                </select>
            `;

        } else {

            html += `
                <input
                    type="${field.type}"
                    id="${field.id}"
                    ${field.name ? `name="${field.name}"` : ""}
                    ${field.placeholder ? `placeholder="${field.placeholder}"` : ""}
                    ${field.min !== undefined ? `min="${field.min}"` : ""}
                    ${field.max !== undefined ? `max="${field.max}"` : ""}
                    ${field.step !== undefined ? `step="${field.step}"` : ""}
                    ${field.inputmode ? `inputmode="${field.inputmode}"` : ""}
                    ${field.autocomplete ? `autocomplete="${field.autocomplete}"` : ""}
                    ${field.required ? "required" : ""}
                    ${field.ariaLabel ? `aria-label="${field.ariaLabel}"` : ""}
                >
            `;
        }

        html += `
            </div>
        `;
    });

    container.innerHTML = html;
}