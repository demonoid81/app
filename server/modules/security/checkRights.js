const mm = require("micromatch")
const GraphQLError = require( 'graphql')

class ValidationError extends GraphQLError {
    constructor(errors) {
        super('The request is invalid.')
        this.state = errors.reduce((result, error) => {
            if (Object.prototype.hasOwnProperty.call(result, error.key)) {
                result[error.key].push(error.message)
            } else {
                result[error.key] = [error.message]
            }
            return result
        }, {})
    }
}


function getPolicesForRole(roles) {
    return policies = this.policies.filter((policy) => {
        const matchedPolicy = mm.some(roles, policy.roles, {
            nocase: true,
        })
        if (matchedPolicy) {
            return policy
        }
    })
}

function matchPolicies({ policies, action, resource, context, }) {
    try {
        return policies.filter((policy) => {
            let policyResourceCheck = false
            let policyActionCheck = false
            let policyConditionCheck = false
            if (mm.some(resource, policy.resources)) {
                log("Policy does match resource.")
                policyResourceCheck = true
            }
            else {
                log("Policy does not match resource.")
                return false
            }
            if (mm.some(action, policy.actions)) {
                log("Policy does match action.")
                policyActionCheck = true
            }
            else {
                log("Policy does not match action.")
                return false
            }
            if (typeof policy.conditions !== "undefined" &&
                policy.conditions.length >= 1) {
                policyConditionCheck = evaluateAllConditions({
                    policy,
                    resource,
                    context,
                })
            }
            else {
                policyConditionCheck = true
            }
            debug(JSON.stringify({
                policy,
                policyResourceCheck,
                policyActionCheck,
                policyConditionCheck,
            }))
            if (policyResourceCheck &&
                policyActionCheck &&
                policyConditionCheck) {
                return true
            }
            return false
        })
    }
    catch (err) {
        throw err
    }
}

function evaluateAllConditions({ policy, resource, context, }) {
    try {
        let outcome = false
        if (typeof policy.conditions === "undefined") {
            throw new errors_1.AuthorizationDeniedError(policy, "Access has not been allowed.")
        }
        outcome = policy.conditions
            .map((condition) => {
                return evaluateCondition({ condition, resource, context })
            })
            .reduce((accumulator, currentOutcome) => {
                if (accumulator === false) {
                    return false
                }
                else {
                    return currentOutcome
                }
            })
        return outcome
    }
    catch (err) {
        throw err
    }
}

function evaluateCondition({ condition, resource, context, }) {
    try {
        let outcome = false
        if (typeof condition.expected !== "undefined" &&
            Array.isArray(condition.expected)) {
            outcome = condition.expected
                .map(() => matchSingleValue({
                    condition,
                    resource,
                    context,
                    expected: true,
                    expectedOnContext: false,
                }))
                .reduce(reduceToBoolean)
        }
        else if (typeof condition.expectedOnContext !== "undefined" &&
            Array.isArray(condition.expectedOnContext)) {
            outcome = condition.expectedOnContext
                .map(() => matchSingleValue({
                    condition,
                    resource,
                    context,
                    expected: false,
                    expectedOnContext: true,
                }))
                .reduce(reduceToBoolean)
        }
        return outcome
    }
    catch (err) {
        throw err
    }
}
function matchSingleValue({ condition, resource, context, expected, expectedOnContext, }) {
    try {
        let outcome = false
        let matchResult = undefined
        let numericResult = undefined
        if (condition.operator === index_1.PolicyOperator.match ||
            condition.operator === index_1.PolicyOperator.notMatch) {
            if (expected === true && Array.isArray(condition.expected)) {
                matchResult = condition.expected
                    .map((val) => mm.isMatch(get(context, condition.field), `${val}`))
                    .reduce(reduceToBoolean)
            }
            else if (expectedOnContext === true &&
                Array.isArray(condition.expectedOnContext)) {
                matchResult = condition.expectedOnContext
                    .map((val) => mm.any(get(context, condition.field), get(context, val)))
                    .reduce(reduceToBoolean)
            }
            else {
                log("Invalid condition, skip it")
            }
        }
        else if (condition.operator === index_1.PolicyOperator.lessThan ||
            condition.operator === index_1.PolicyOperator.greaterThan) {
            const field = get(context, condition.field)
            let expectedValue = undefined
            if (expected === true) {
                expectedValue = Number(condition.expected)
            }
            else if (expectedOnContext === true) {
                expectedValue = get(context, condition.expectedOnContext)
            }
            else {
                log("Invalid condition, skip it")
            }
            if (field > Number(condition.expected)) {
                numericResult = index_1.PolicyOperator.greaterThan
            }
            else if (field < Number(condition.expected)) {
                numericResult = index_1.PolicyOperator.lessThan
            }
        }
        switch (condition.operator) {
        case index_1.PolicyOperator.match:
            if (matchResult === true) {
                outcome = true
            }
            break
        case index_1.PolicyOperator.notMatch:
            if (matchResult === false) {
                outcome = true
            }
            break
        case index_1.PolicyOperator.lessThan:
            if (numericResult === index_1.PolicyOperator.lessThan) {
                outcome = true
            }
        case index_1.PolicyOperator.greaterThan:
            if (numericResult === index_1.PolicyOperator.greaterThan) {
                outcome = true
            }
        }
        return outcome
    }
    catch (err) {
        throw err
    }
}

function evaluateAccess({ context, action, resource, }) {
    try {
        let outcome = false
        const policies = getPolicesForRole(context.user.roles)
        const matchedPolicies = matchPolicies({
            policies,
            action,
            resource,
            context,
        })
        if (typeof matchedPolicies.length === "undefined" ||
            matchedPolicies.length === 0) {
            throw new errors_1.AuthorizationDeniedError(null, "No policies matched the request.")
        }
        debug(`Matched policies for: ${JSON.stringify({
            resource,
            action,
            context,
            matchedPolicies,
        })}`)
        matchedPolicies.forEach((policy) => {
            if (policy.effect === index_1.PolicyEffect.Deny) {
                throw new errors_1.AuthorizationDeniedError(policy, "Access has been explicty denied.")
            }
            if (policy.effect === index_1.PolicyEffect.Allow) {
                outcome = true
            }
            else {
                throw new errors_1.AuthorizationDeniedError(policy, "Access has not been allowed.")
            }
        })
        return outcome
    }
    catch (err) {
        if (err instanceof errors_1.AuthorizationDeniedError) {
        }
        else {
            console.log(err.message, err.stack)
        }
        throw err
    }
}


// function evaluateAccess({ context, action, resource, }) {
//     try {
//             let outcome = false;
//             const policies = getPolicesForRole(context.user.roles);
//             outcome = evaluate_1.evaluateAccess({
//                 policies,
//                 context,
//                 action,
//                 resource,
//             });
//             return outcome;
//         }
//         catch (AuthorizationDeniedError) {
//             this.evaluationFailCallback({
//                 policy: AuthorizationDeniedError.policy,
//                 context,
//                 action,
//                 resource,
//                 reason: AuthorizationDeniedError.reason,
//             });
//             throw AuthorizationDeniedError;
//         }
//     }
// }

module.exports = {
    resolverHook: (root, args, context, info, next) => {
        let resource = `${info.parentType.name}:`
        resource = `${resource}:${info.fieldName}`
        const action = info.operation.operation
        const authorization = evaluateAccess(
            context,
            action,
            resource,)
        return authorization

    }
}

\\
