const options = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "God's API"
        },
    },
    apis: ["./routes/gods.js"],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "HTTP",
                schema: "Bearer",
                bearerFormat: "JWT"
            }
        }
    }
}

module.exports = options;
