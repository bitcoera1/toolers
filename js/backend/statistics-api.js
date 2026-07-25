/*
====================================================

ToolXone Backend

Statistics API

Version:
1.0.0

Responsibility

Communicate with the
Statistics endpoints.

====================================================
*/

const StatisticsAPI = {

    async getAll() {

        return APIClient.get(

            BackendConfig.ENDPOINTS.STATISTICS

        );

    },

    async get(statKey) {

        return APIClient.get(

            `${BackendConfig.ENDPOINTS.STATISTICS}/${statKey}`

        );

    },

    async increment(statKey) {

        return APIClient.post(

            `${BackendConfig.ENDPOINTS.STATISTICS}/increment`,

            {

                statKey

            }

        );

        
    },

    async recordTool(

    toolId,

    toolName

) {

    return APIClient.post(

        `${BackendConfig.ENDPOINTS.STATISTICS}/tool`,

        {

            toolId,

            toolName

        }

    );

},

    async update(

        statKey,

        value

    ) {

        return APIClient.put(

            `${BackendConfig.ENDPOINTS.STATISTICS}/${statKey}`,

            {

                value

            }

        );

    }

};

Object.freeze(

    StatisticsAPI

);