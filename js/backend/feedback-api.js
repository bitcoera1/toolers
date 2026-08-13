/*
====================================================

ToolXone Backend

Feedback API

Version:
1.0.0

Responsibility

Communicate with
Feedback endpoints.

====================================================
*/

const FeedbackAPI = {

    async submit(data) {

        return APIClient.post(
            BackendConfig.ENDPOINTS.FEEDBACK,
            data
        );

    },

    async getAll(toolId = null) {

        const endpoint =
            toolId
                ? `${BackendConfig.ENDPOINTS.FEEDBACK}?toolId=${encodeURIComponent(toolId)}`
                : BackendConfig.ENDPOINTS.FEEDBACK;

        return APIClient.get(
            endpoint
        );

    },

    async getById(id) {

        return APIClient.get(
            `${BackendConfig.ENDPOINTS.FEEDBACK}/${id}`
        );

    },

        async helpful(id) {

        return APIClient.post(
            `${BackendConfig.ENDPOINTS.FEEDBACK}/${id}/helpful`
        );

    },
    
    async delete(id) {

        return APIClient.delete(
            `${BackendConfig.ENDPOINTS.FEEDBACK}/${id}`
        );

    }

};

Object.freeze(

    FeedbackAPI

);