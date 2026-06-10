/** @typedef {import('./directions/types.mjs').DirectionSpec} DirectionSpec */

/**
 * @param {DirectionSpec} direction
 * @returns {Array<{ name: string, scope: string | string[], settings: Record<string, string> }>}
 */
export function buildPreviewTokenColors(direction) {
  const s = direction.syntax;

  return [
    {
      name: "Comments",
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: s.comment, fontStyle: "italic" },
    },
    {
      name: "SQL keywords",
      scope: [
        "keyword",
        "keyword.other.sql",
        "keyword.other.DML.sql",
        "keyword.other.DDL.sql",
        "storage.type",
        "storage.modifier",
      ],
      settings: { foreground: s.keyword },
    },
    {
      name: "Functions",
      scope: ["entity.name.function", "support.function", "support.function.sql", "meta.function-call"],
      settings: { foreground: s.function },
    },
    {
      name: "Types",
      scope: ["entity.name.type", "support.type", "support.type.sql"],
      settings: { foreground: s.type },
    },
    {
      name: "Tables",
      scope: ["entity.name.table.sql", "entity.name.class"],
      settings: { foreground: s.table },
    },
    {
      name: "Columns and variables",
      scope: [
        "variable",
        "variable.other",
        "meta.column.sql",
        "variable.other.column.sql",
        "support.variable",
      ],
      settings: { foreground: s.column },
    },
    {
      name: "Aliases and parameters",
      scope: ["variable.parameter.sql", "variable.other.sql", "variable.parameter"],
      settings: { foreground: s.alias },
    },
    {
      name: "Strings",
      scope: ["string", "string.quoted.single.sql", "string.quoted.double.sql"],
      settings: { foreground: s.string },
    },
    {
      name: "Numbers",
      scope: ["constant.numeric", "constant.language"],
      settings: { foreground: s.number },
    },
    {
      name: "Operators",
      scope: ["keyword.operator", "keyword.operator.sql", "punctuation"],
      settings: { foreground: s.operator },
    },
    {
      name: "Constants",
      scope: ["constant.other", "support.constant"],
      settings: { foreground: s.constant },
    },
    {
      name: "JSON keys",
      scope: ["support.type.property-name.json"],
      settings: { foreground: s.type },
    },
    {
      name: "Invalid",
      scope: ["invalid", "invalid.illegal"],
      settings: {
        foreground: direction.accents.error,
        background: "#3A1828",
      },
    },
  ].map((rule) => ({
    ...rule,
    settings: Object.fromEntries(
      Object.entries(rule.settings).filter(([, v]) => v !== undefined),
    ),
  }));
}

/**
 * @param {DirectionSpec} direction
 * @returns {Record<string, string>}
 */
export function buildPreviewSemanticTokens(direction) {
  const s = direction.syntax;
  return {
    keyword: s.keyword,
    function: s.function,
    method: s.function,
    class: s.type,
    type: s.type,
    struct: s.type,
    interface: s.type,
    enum: s.type,
    parameter: s.alias,
    variable: s.column,
    property: s.column,
    string: s.string,
    number: s.number,
    comment: s.comment,
    operator: s.operator,
  };
}
