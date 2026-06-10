/**
 * @typedef {object} DirectionSurfaces
 * @property {string} bg0 Editor / deepest void
 * @property {string} bg1 Sidebar / structural
 * @property {string} bg2 Panel / elevated chrome
 * @property {string} bg3 Selection / hover wells
 * @property {string} fg0 Primary text
 * @property {string} fg1 Body text
 * @property {string} fg2 Secondary text
 * @property {string} fg3 Muted text
 * @property {string} border0 Primary border
 * @property {string} border1 Emphasis border
 */

/**
 * @typedef {object} DirectionAccents
 * @property {string} focus Focus ring
 * @property {string} cursor Editor cursor
 * @property {string} findMatch Find match highlight
 * @property {string} selection Selection background (hex8 ok)
 * @property {string} listActive List active row background
 * @property {string} listActiveFg List active row foreground
 * @property {string} statusBar Status bar background
 * @property {string} statusBarFg Status bar foreground
 * @property {string} tabActiveTop Active tab top border
 * @property {string} activityBar Activity bar accent (optional fg tweak)
 * @property {string} error
 * @property {string} warning
 * @property {string} success
 * @property {string} modified Git modified
 * @property {string} added Git added
 * @property {string} deleted Git deleted
 */

/**
 * @typedef {object} DirectionSyntax
 * @property {string} comment
 * @property {string} keyword
 * @property {string} keywordJoin FROM/JOIN tier (cartography)
 * @property {string} function
 * @property {string} type
 * @property {string} table Table / entity names
 * @property {string} column Column / variable
 * @property {string} alias Alias / parameter
 * @property {string} string
 * @property {string} number
 * @property {string} operator
 * @property {string} constant
 */

/**
 * @typedef {object} DirectionSpec
 * @property {string} id
 * @property {string} label
 * @property {string} filename
 * @property {DirectionSurfaces} surfaces
 * @property {DirectionAccents} accents
 * @property {DirectionSyntax} syntax
 * @property {Record<string, string>} [workbenchOverrides]
 * @property {string[]} [bracketColors] Up to 6 bracket highlight colors
 */

export {};
