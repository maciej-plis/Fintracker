import {
  AND, ComparisonNode,
  ComparisonOperator,
  createComparisonNode,
  createLogicNode,
  createSelectorNode,
  createValueNode,
  ExpressionNode,
  LogicOperator,
  OR
} from '@rsql/ast';
import { RsqlOperators } from '@shared/constants/rsql.constants';

type ComparisonValue = string | number | null;

export class RsqlBuilder {

    static comparison(selector: string, operator: ComparisonOperator, value: ComparisonValue | ComparisonValue[]): ComparisonNode {
        return createComparisonNode(
            createSelectorNode(selector),
            operator,
            createValueNode(Array.isArray(value) ? value.map((singleValue) => String(singleValue)) : String(value))
        );
    }

    static equals(selector: string, value: ComparisonValue, ignoreCase: boolean = false): ComparisonNode {
        return RsqlBuilder.comparison(selector, RsqlOperators.EQUALS, (ignoreCase ? '^' : '') + value);
    }

    static notEquals(selector: string, value: ComparisonValue, ignoreCase: boolean = false): ComparisonNode {
        return RsqlBuilder.comparison(selector, RsqlOperators.NOT_EQUALS, (ignoreCase ? '^' : '') + value);
    }

    static contains(selector: string, value: ComparisonValue, ignoreCase: boolean = false): ComparisonNode {
        return RsqlBuilder.comparison(selector, RsqlOperators.EQUALS, (ignoreCase ? '^' : '') + '*' + value + '*');
    }

    static notContains(selector: string, value: ComparisonValue, ignoreCase: boolean = false): ComparisonNode {
        return RsqlBuilder.comparison(selector, RsqlOperators.NOT_EQUALS, (ignoreCase ? '^' : '') + '*' + value + '*');
    }

    static startsWith(selector: string, value: ComparisonValue, ignoreCase: boolean = false): ComparisonNode {
        return RsqlBuilder.comparison(selector, RsqlOperators.EQUALS, (ignoreCase ? '^' : '') + value + '*');
    }

    static endsWith(selector: string, value: ComparisonValue, ignoreCase: boolean = false): ComparisonNode {
        return RsqlBuilder.comparison(selector, RsqlOperators.EQUALS, (ignoreCase ? '^' : '') + '*' + value);
    }

    static lessThan(selector: string, value: ComparisonValue): ComparisonNode {
        return RsqlBuilder.comparison(selector, RsqlOperators.LESS_THAN, value);
    }

    static lessThanOrEqual(selector: string, value: ComparisonValue): ComparisonNode {
        return RsqlBuilder.comparison(selector, RsqlOperators.LESS_THAN_OR_EQUAL, value);
    }

    static greaterThan(selector: string, value: ComparisonValue): ComparisonNode {
        return RsqlBuilder.comparison(selector, RsqlOperators.GREATER_THAN, value);
    }

    static greaterThanOrEqual(selector: string, value: ComparisonValue): ComparisonNode {
        return RsqlBuilder.comparison(selector, RsqlOperators.GREATER_THAN_OR_EQUAL, value);
    }

    static in(selector: string, values: ComparisonValue[]): ComparisonNode {
        return RsqlBuilder.comparison(selector, RsqlOperators.IN, values);
    }

    static blank(selector: string): ComparisonNode {
        return RsqlBuilder.comparison(selector, RsqlOperators.IS_NULL, '\'\'');
    }

    static notBlank(selector: string): ComparisonNode {
        return RsqlBuilder.comparison(selector, RsqlOperators.IS_NOT_NULL, '\'\'');
    }

    static inRange(selector: string, values: ComparisonValue[]) {
        if (values.length != 2) throw new Error(`The between expression builder requires exactly 2 values.`);
        return RsqlBuilder.comparison(selector, RsqlOperators.BETWEEN, values);
    }

    static logic(expressions: ExpressionNode[], operator: LogicOperator): ExpressionNode {
        if (!expressions.length) throw new Error(`The logic expression builder requires at least one expression but none passed.`);

        return expressions
            .slice(1)
            .reduce(
                (leftExpression, rightExpression) => createLogicNode(leftExpression, operator, rightExpression),
                expressions[0]
            );
    }

    static and(...expressions: ExpressionNode[]): ExpressionNode {
        return RsqlBuilder.logic(expressions, AND);
    }

    static or(...expressions: ExpressionNode[]): ExpressionNode {
        return RsqlBuilder.logic(expressions, OR);
    }
}
