const _               = require('lodash');

/**
 * Rule Class with static functions to handle rule comparision and more
 *
 * @static
 */
class Rule {

    /**
     * Checks if rule is a native duplicate. Checks all properties but excluded
     * @static
     *
     * @param rule1
     * @param rule2
     * @param excludedProperties
     *
     * @return {boolean}
     */
    static isRuleDuplicate(rule1, rule2, excludedProperties) {
        excludedProperties = excludedProperties || [];

        const hasSameProperties = _.isEqualWith(rule1, rule2, (value1, value2, propKey) => {
            if(excludedProperties.includes(propKey)) return true;
        });

        return hasSameProperties;
    }

    /**
     *  Compares 2 ast rules by type
     *
     * @static
     * @param {!Object} rule1
     * @param {!Object} rule2
     * @returns {boolean}
     */
    static isSameRuleType(rule1, rule2) {
        return rule1.type === rule2.type;
    }

    /**
     * Returns true if rule is of type "media"
     *
     * @static
     * @param {Object} rule
     * @returns {boolean}
     */
    static isMediaRule(rule) {
        return rule.type === "media";
    }

    /**
     * Returns true if selector_1 is matching selector_2 as a media rule selector.
     * Also checks valid differences between media selectors that mean the same.
     * "all and " is not needed for the same result. Therefor we need to check the rules more gracefully
     *
     * @static
     * @param selector_1
     * @param selector_2
     * @returns {boolean}
     */
    static isMatchingMediaRuleSelector(selector_1, selector_2) {
        return selector_1 === selector_2 ||
            selector_1 === selector_2.replace("all and ", "") ||
            selector_2 === selector_1.replace("all and ", "") ||
            selector_1.replace("all and ", "") === selector_2.replace("all and ", "")
    }

}

module.exports = Rule;