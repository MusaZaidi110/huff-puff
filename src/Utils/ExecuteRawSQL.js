const sequelize = require("../DatabaseConnection.js");
const { Logger } = require("../Utils/Logger.js"); // Import your Logger

/**
 * Executes a raw SQL query with parameter replacements and query type.
 * @param {string} query - The raw SQL query to execute
 * @param {Array|Object} params - Parameters for the query
 * @param {string} [type="SELECT"] - Query type ("SELECT", "INSERT", "UPDATE", "DELETE")
 * @returns {Promise<Object>} - Result object with success status, data, and metadata
 */
async function executeRawQuery(query, params = {}, type = "SELECT") {
    const queryId = Math.random().toString(36).substring(2, 8); // Unique ID for tracking
    const startTime = Date.now();

    try {
        // Log query initiation
        Logger.debug(`[Query ${queryId}] Starting execution`, {
            type: type,
            query: query,
            params: params,
            callStack: new Error().stack.split('\n').slice(2).join('\n') // Capture call stack
        });

        // Validate and map query type
        const queryTypeMap = {
            SELECT: sequelize.QueryTypes.SELECT,
            INSERT: sequelize.QueryTypes.INSERT,
            UPDATE: sequelize.QueryTypes.UPDATE,
            DELETE: sequelize.QueryTypes.DELETE,
            RAW: sequelize.QueryTypes.RAW
        };

        const normalizedType = type.toUpperCase();
        const queryType = queryTypeMap[normalizedType];
        
        if (!queryType) {
            Logger.warn(`[Query ${queryId}] Invalid query type provided`, {
                providedType: type,
                defaultingTo: "SELECT"
            });
        }

        // Execute the query
        const [results, metadata] = await sequelize.query(query, {
            replacements: params,
            type: queryType || sequelize.QueryTypes.SELECT,
            logging: (sql) => {
                Logger.debug(`[Query ${queryId}] Executing SQL`, { sql });
            }
        });

        // Log successful completion
        Logger.info(`[Query ${queryId}] Completed successfully`, {
            duration: `${Date.now() - startTime}ms`,
            resultCount: Array.isArray(results) ? results.length : 1,
            affectedRows: metadata?.affectedRows,
            changedRows: metadata?.changedRows
        });

        return {
            success: true,
            data: results,
            metadata: metadata,
            queryId: queryId,
            duration: Date.now() - startTime
        };

    } catch (error) {
        // Log detailed error information
        Logger.error(`[Query ${queryId}] Execution failed`, {
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack
            },
            query: query,
            params: params,
            type: type,
            duration: `${Date.now() - startTime}ms`
        });

        return {
            success: false,
            error: {
                code: error.name,
                message: error.message,
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            queryId: queryId,
            duration: Date.now() - startTime
        };
    }
}

module.exports = { executeRawQuery };