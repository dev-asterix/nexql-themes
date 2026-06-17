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
      name: "Control keywords",
      scope: [
        "keyword.control",
        "keyword.control.flow",
        "keyword.control.import",
        "keyword.control.conditional",
        "keyword.control.loop",
      ],
      settings: { foreground: s.keyword },
    },
    {
      name: "Storage modifiers",
      scope: ["storage.modifier", "storage.type.modifier"],
      settings: { foreground: s.keyword },
    },
    {
      name: "Language variables (this/super)",
      scope: ["variable.language", "variable.language.this", "variable.language.super"],
      settings: { foreground: selfKeyword, fontStyle: "italic" },
    },
    {
      name: "Namespaces",
      scope: ["entity.name.namespace", "entity.name.scope-resolution"],
      settings: { foreground: s.type },
    },
    {
      name: "Inherited class",
      scope: ["entity.other.inherited-class"],
      settings: { foreground: s.type, fontStyle: "italic" },
    },
    {
      name: "Object properties",
      scope: ["variable.other.property", "variable.other.object.property", "meta.object-literal.key"],
      settings: { foreground: s.column },
    },
    {
      name: "Built-in support",
      scope: ["support.class", "support.other", "support.constant.property-value"],
      settings: { foreground: s.type },
    },
    {
      name: "Annotations",
      scope: ["meta.annotation", "storage.type.annotation", "punctuation.definition.annotation"],
      settings: { foreground: decorator },
    },
    {
      name: "Accessor / separator punctuation",
      scope: ["punctuation.accessor", "punctuation.separator", "meta.brace"],
      settings: { foreground: s.operator },
    },
    {
      name: "String interpolation",
      scope: ["meta.template.expression", "punctuation.section.embedded"],
      settings: { foreground: s.operator },
    },
    {
      name: "HTML/XML tags",
      scope: ["entity.name.tag", "entity.name.tag.html", "entity.name.tag.xml"],
      settings: { foreground: s.keyword },
    },
    {
      name: "HTML/XML attributes",
      scope: ["entity.other.attribute-name", "entity.other.attribute-name.html"],
      settings: { foreground: s.alias },
    },
    {
      name: "Tag punctuation",
      scope: ["punctuation.definition.tag", "punctuation.separator.key-value.html"],
      settings: { foreground: s.operator },
    },
    {
      name: "JSX/TSX components",
      scope: ["support.class.component", "entity.name.tag.jsx", "entity.name.tag.tsx"],
      settings: { foreground: s.type },
    },
    {
      name: "CSS properties",
      scope: ["support.type.property-name.css", "support.type.vendored.property-name.css"],
      settings: { foreground: s.column },
    },
    {
      name: "CSS units and colors",
      scope: ["keyword.other.unit", "constant.numeric.css", "constant.other.color"],
      settings: { foreground: s.number },
    },
    {
      name: "Markdown headings",
      scope: ["markup.heading", "entity.name.section.markdown", "punctuation.definition.heading.markdown"],
      settings: { foreground: s.keyword, fontStyle: "bold" },
    },
    {
      name: "Markdown bold",
      scope: ["markup.bold", "punctuation.definition.bold"],
      settings: { foreground: s.number, fontStyle: "bold" },
    },
    {
      name: "Markdown italic",
      scope: ["markup.italic", "punctuation.definition.italic"],
      settings: { foreground: s.type, fontStyle: "italic" },
    },
    {
      name: "Markdown quote",
      scope: ["markup.quote"],
      settings: { foreground: s.comment, fontStyle: "italic" },
    },
    {
      name: "Markdown inline / fenced code",
      scope: ["markup.inline.raw", "markup.fenced_code", "markup.raw"],
      settings: { foreground: s.string },
    },
    {
      name: "Markdown links",
      scope: ["markup.underline.link", "string.other.link", "constant.other.reference.link.markdown"],
      settings: { foreground: s.function },
    },
    {
      name: "Markdown link text",
      scope: ["string.other.link.title.markdown", "string.other.link.description.markdown"],
      settings: { foreground: s.alias },
    },
    {
      name: "Markdown separators",
      scope: ["meta.separator.markdown", "punctuation.definition.constant.markdown"],
      settings: { foreground: s.comment },
    },
    {
      name: "Diff inserted",
      scope: ["markup.inserted", "meta.diff.header.to-file"],
      settings: { foreground: direction.accents.added },
    },
    {
      name: "Diff deleted",
      scope: ["markup.deleted", "meta.diff.header.from-file"],
      settings: { foreground: direction.accents.deleted },
    },
    {
      name: "Diff changed",
      scope: ["markup.changed"],
      settings: { foreground: direction.accents.modified },
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
  const decorator = s.decorator ?? s.type;
  const selfKeyword = s.selfKeyword ?? s.keyword;
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
    "*.readonly": s.constant,
    "*.async": { foreground: s.function, fontStyle: "italic" },
    "*.abstract": { foreground: s.type, fontStyle: "italic" },
    label: s.keyword,
    typeParameter: s.type,
    regexp: s.string,
    event: s.function,

    // Additional standard semantic token types
    namespace: s.type,
    enumMember: s.constant,
    decorator: decorator,
    macro: s.keyword,
    selfParameter: selfKeyword,
    builtinType: s.type,
    typeAlias: s.type,
    "variable.builtin": selfKeyword,
    "function.builtin": s.function,
    "method.declaration": { foreground: s.function, fontStyle: "bold" },
  };
}
