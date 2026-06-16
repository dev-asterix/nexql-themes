/** @typedef {import('./directions/types.mjs').DirectionSpec} DirectionSpec */

/**
 * @param {DirectionSpec} direction
 * @returns {Array<{ name: string, scope: string | string[], settings: Record<string, string> }>}
 */
export function buildPreviewTokenColors(direction) {
  const s = direction.syntax;

  const decorator = s.decorator ?? s.type;
  const templateLiteral = s.templateLiteral ?? s.string;
  const escape = s.escape ?? s.number;
  const cssSelector = s.cssSelector ?? s.type;
  const regex = s.regex ?? s.string;
  const yamlKey = s.yamlKey ?? s.type;
  const preprocessor = s.preprocessor ?? s.keyword;
  const docTag = s.docTag ?? s.comment;
  const lifetime = s.lifetime ?? s.number;
  const selfKeyword = s.selfKeyword ?? s.keyword;

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
      name: "Decorators",
      scope: ["meta.decorator", "punctuation.decorator"],
      settings: { foreground: decorator },
    },
    {
      name: "Template literals",
      scope: ["string.template", "punctuation.definition.template-expression"],
      settings: { foreground: templateLiteral },
    },
    {
      name: "Escape characters",
      scope: ["constant.character.escape"],
      settings: { foreground: escape },
    },
    {
      name: "CSS selectors",
      scope: ["entity.name.tag.css", "entity.other.attribute-name.class.css", "entity.other.attribute-name.id.css"],
      settings: { foreground: cssSelector },
    },
    {
      name: "Regex",
      scope: ["string.regexp", "keyword.control.anchor.regexp", "constant.other.character-class.regexp"],
      settings: { foreground: regex },
    },
    {
      name: "YAML keys",
      scope: ["entity.name.tag.yaml"],
      settings: { foreground: yamlKey },
    },
    {
      name: "Preprocessor directives",
      scope: ["meta.preprocessor", "keyword.control.directive"],
      settings: { foreground: preprocessor },
    },
    {
      name: "JSDoc / TSDoc",
      scope: ["storage.type.class.jsdoc", "variable.other.jsdoc", "entity.name.type.instance.jsdoc"],
      settings: { foreground: docTag, fontStyle: "italic" },
    },
    {
      name: "Markdown lists",
      scope: ["markup.list", "punctuation.definition.list"],
      settings: { foreground: s.keyword },
    },
    {
      name: "Shell variables",
      scope: ["variable.other.special.shell"],
      settings: { foreground: s.column },
    },
    {
      name: "Rust lifetimes",
      scope: ["entity.name.lifetime.rust", "keyword.operator.borrow.rust"],
      settings: { foreground: lifetime },
    },
    {
      name: "Python self/cls",
      scope: ["variable.language.special.self.python", "variable.language.special.self"],
      settings: { foreground: selfKeyword },
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
 * @returns {Record<string, any>}
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
    comment: {
      foreground: s.comment,
      italic: true,
    },
    operator: s.operator,

    // Expansion modifiers
    "variable.declaration": s.column,
    "function.declaration": { foreground: s.function, fontStyle: "bold" },
    "class.declaration": { foreground: s.type, fontStyle: "bold" },
    "variable.static": s.column,
    "type.defaultLibrary": s.type,
    "function.defaultLibrary": s.function,
    "variable.defaultLibrary": s.column,
    "*.deprecated": { fontStyle: "strikethrough" },
    "*.modification": s.column,
    label: s.keyword,
    typeParameter: s.type,
    regexp: s.string,
    event: s.function,
  };
}
