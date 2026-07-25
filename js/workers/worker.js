/*
====================================================

ToolXone Backend

Cloudflare Worker

Version:
1.0.0

Responsibility

Main backend entry point.

====================================================
*/

export default {

    async fetch(request, env, ctx) {

        return WorkerRouter.handle(

            request,
            env,
            ctx

        );

    }

};

const WorkerRouter = {

    async handle(

        request,
        env,
        ctx

    ) {

        try {

            const url = new URL(request.url);

const path = url.pathname;

const method = request.method;

if (method === "OPTIONS") {

    return this.cors();

}

return this.dispatch(

    path,
    method,
    request,
    env,
    ctx

);


  }

        catch (error) {

            return this.serverError(

                error

            );

        }

    },

    async dispatch(
    path,
    method,
    request,
    env,
    ctx
) {

    // Get all statistics
    if (
        path === "/statistics" &&
        method === "GET"
    ) {

        return this.getStatistics(env);

    }

    // Increment a statistic
    // Increment a statistic
if (
    path === "/statistics/increment" &&
    method === "POST"
) {

    return this.incrementStatistic(
        request,
        env
    );

}

// Record individual tool usage
if (
    path === "/statistics/tool" &&
    method === "POST"
) {

    return this.recordToolUsage(
        request,
        env
    );

}

    return this.notFound();

},

    async getStatistics(env) {

    try {

        // Get summary statistics
        const { results: summary } = await env.DB
            .prepare(`
                SELECT
                    stat_key,
                    stat_value
                FROM
                    statistics
                ORDER BY
                    id
            `)
            .all();

        // Get individual tool usage
        const { results: tools } = await env.DB
            .prepare(`
                SELECT
                    tool_id,
                    tool_name,
                    usage_count,
                    last_used
                FROM
                    tool_usage
                ORDER BY
                    usage_count DESC
            `)
            .all();

        return this.json({

            success: true,

            summary,

            tools

        });

    }

    catch (error) {

        return this.serverError(error);

    }

},

async incrementStatistic(
    request,
    env
) {

    try {

        const {

            statKey

        } = await request.json();

        if (

            !statKey

        ) {

            return this.json(

                {

                    success: false,

                    message:
                        "Statistic key is required."

                },

                400

            );

        }

        await env.DB

            .prepare(

                `
                UPDATE statistics
                SET stat_value = stat_value + 1
                WHERE stat_key = ?
                `

            )

            .bind(

                statKey

            )

            .run();

        return this.json(

            {

                success: true,

                statKey

            }

        );

    }

    catch (error) {

        return this.serverError(

            error

        );

    }

},

async recordToolUsage(
    request,
    env
) {

    try {

        const {

            toolId,
            toolName

        } = await request.json();

        if (

            !toolId ||

            !toolName

        ) {

            return this.json(

                {

                    success: false,

                    message:
                        "Tool ID and Tool Name are required."

                },

                400

            );

        }

        await env.DB

            .prepare(

                `
                INSERT INTO tool_usage (

                    tool_id,
                    tool_name,
                    usage_count

                )

                VALUES (

                    ?, ?, 1

                )

                ON CONFLICT(tool_id)

                DO UPDATE SET

                    usage_count = usage_count + 1,

                    last_used = CURRENT_TIMESTAMP
                `

            )

            .bind(

                toolId,
                toolName

            )

            .run();

        return this.json(

            {

                success: true,

                toolId

            }

        );

    }

    catch (error) {

        return this.serverError(

            error

        );

    }

},

    json(

        data,

        status = 200

    ) {

        return new Response(

            JSON.stringify(

                data

            ),

            {

                status,

                headers: {

                    "Content-Type":
                        "application/json",

                    "Access-Control-Allow-Origin":
                        "*",

                    "Access-Control-Allow-Headers":
                        "*",

                    "Access-Control-Allow-Methods":
                        "GET,POST,PUT,DELETE,OPTIONS"

                }

            }

        );

    },

    cors() {

        return new Response(

            null,

            {

                status: 204,

                headers: {

                    "Access-Control-Allow-Origin":
                        "*",

                    "Access-Control-Allow-Headers":
                        "*",

                    "Access-Control-Allow-Methods":
                        "GET,POST,PUT,DELETE,OPTIONS"

                }

            }

        );

    },

    notFound() {

        return this.json(

            {

                success: false,

                message:

                    "Endpoint not found."

            },

            404

        );

    },

    serverError(error) {

        return this.json(

            {

                success: false,

                message:

                    error.message

            },

            500

        );

        
    }

    
};

