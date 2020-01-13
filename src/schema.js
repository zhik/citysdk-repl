import Ajv from 'ajv'

//todo add async checks

const ajv = new Ajv({
    allErrors: true
})

const argumentSchema = ajv.compile({
    type: 'object',
    properties: {
        vintage: {
            type: ["number", "string"]
        },
        geoHierarchy: {
            type: "object"
        },
        sourcePath: {
            type: "array"
        },
        values: {
            type: "array"
        },
        geoResolution: {
            type: "string"
        },
        predicates: {
            type: "object"
        },
        statsKey: {
            type: "string"
        }
    }
});

export default argumentSchema;