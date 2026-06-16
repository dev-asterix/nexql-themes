import { sortColors, withAlpha } from "./utils.mjs";

/** @typedef {import('./directions/types.mjs').DirectionSpec} DirectionSpec */

/**
 * @param {DirectionSpec} direction
 * @returns {Record<string, string>}
 */
export function buildPreviewWorkbench(direction) {
  const { surfaces: s, accents: a } = direction;
  const brackets = direction.bracketColors ?? [];
  const isHc = direction.type === "hc";

  /**
   * Helper to return transparent color for standard themes, or opaque fallback for HC.
   * @param {string} hex
   * @param {number} alpha
   * @param {string} opaqueFallback
   */
  const alphaColor = (hex, alpha, opaqueFallback) => {
    if (isHc) return opaqueFallback;
    return withAlpha(hex, alpha);
  };

  /** @type {Record<string, string>} */
  const colors = {
    focusBorder: a.focus,
    foreground: s.fg1,
    descriptionForeground: s.fg3,
    errorForeground: a.error,
    "icon.foreground": s.fg2,
    "sash.hoverBorder": a.focus,
    "window.activeBorder": a.focus,
    "window.inactiveBorder": s.border0,

    "titleBar.activeBackground": s.bg0,
    "titleBar.activeForeground": s.fg0,
    "titleBar.inactiveBackground": s.bg1,
    "titleBar.inactiveForeground": s.fg3,
    "titleBar.border": s.border0,

    "activityBar.background": s.bg0,
    "activityBar.foreground": a.activityBar,
    "activityBar.inactiveForeground": s.fg3,
    "activityBar.border": s.border0,
    "activityBar.activeBorder": a.focus,
    "activityBarBadge.background": a.focus,
    "activityBarBadge.foreground": s.bg0,

    "sideBar.background": s.bg1,
    "sideBar.foreground": s.fg2,
    "sideBar.border": s.border0,
    "sideBarTitle.foreground": s.fg0,
    "sideBarSectionHeader.background": s.bg2,
    "sideBarSectionHeader.foreground": s.fg1,
    "sideBarSectionHeader.border": s.border1,

    "list.activeSelectionBackground": a.listActive,
    "list.activeSelectionForeground": a.listActiveFg,
    "list.inactiveSelectionBackground": s.bg3,
    "list.inactiveSelectionForeground": s.fg1,
    "list.hoverBackground": s.bg3,
    "list.hoverForeground": s.fg0,
    "list.focusBackground": a.listActive,
    "list.focusForeground": a.listActiveFg,
    "list.focusOutline": alphaColor(a.focus, 0.5, a.focus),
    "list.focusHighlightForeground": alphaColor(a.focus, 0.75, a.focus),
    "list.highlightForeground": a.focus,
    "list.errorForeground": a.error,
    "list.warningForeground": a.warning,
    "list.filterMatchBackground": alphaColor(a.findMatch, 0.35, s.bg3),
    "list.deemphasizedForeground": s.fg3,

    "tree.indentGuidesStroke": s.border1,
    "tree.inactiveIndentGuidesStroke": s.border0,
    "tree.tableColumnsBorder": s.border1,
    "tree.tableOddRowsBackground": alphaColor(s.bg2, 0.5, s.bg2),

    "editor.background": s.bg0,
    "editor.foreground": s.fg1,
    "editorLineNumber.foreground": s.fg3,
    "editorLineNumber.activeForeground": a.cursor,
    "editorCursor.foreground": a.cursor,
    "editor.selectionBackground": a.selection,
    "editor.inactiveSelectionBackground": alphaColor(s.bg3, 0.8, s.bg3),
    "editor.selectionHighlightBackground": alphaColor(a.focus, 0.2, s.bg3),
    "editor.wordHighlightBackground": alphaColor(a.focus, 0.15, s.bg3),
    "editor.wordHighlightStrongBackground": alphaColor(a.focus, 0.25, s.bg3),
    "editor.findMatchBackground": alphaColor(a.findMatch, 0.4, s.bg3),
    "editor.findMatchHighlightBackground": alphaColor(a.focus, 0.2, s.bg3),
    "editor.lineHighlightBackground": alphaColor(s.bg1, 0.6, s.bg1),
    "editor.lineHighlightBorder": s.border0,
    "editorWhitespace.foreground": alphaColor(s.fg3, 0.35, s.fg3),
    "editorIndentGuide.background1": s.border0,
    "editorIndentGuide.activeBackground1": alphaColor(a.focus, 0.45, a.focus),
    "editorRuler.foreground": s.border0,
    "editorBracketMatch.background": alphaColor(a.focus, 0.12, s.bg3),
    "editorBracketMatch.border": a.focus,
    "editorGutter.background": s.bg0,
    "editorGutter.modifiedBackground": a.modified,
    "editorGutter.addedBackground": a.added,
    "editorGutter.deletedBackground": a.deleted,
    "editorError.foreground": a.error,
    "editorWarning.foreground": a.warning,
    "editorInfo.foreground": a.focus,
    "editorGhostText.foreground": alphaColor(s.fg3, 0.65, s.fg3),
    "editorInlayHint.foreground": s.fg3,
    "editorInlayHint.background": alphaColor(s.bg2, 0.9, s.bg2),
    "editorSuggestWidget.background": s.bg2,
    "editorSuggestWidget.border": s.border1,
    "editorSuggestWidget.foreground": s.fg1,
    "editorSuggestWidget.highlightForeground": a.focus,
    "editorSuggestWidget.selectedBackground": a.listActive,
    "editorSuggestWidget.selectedForeground": a.listActiveFg,
    "editorHoverWidget.background": s.bg2,
    "editorHoverWidget.border": s.border1,
    "editorWidget.background": s.bg2,
    "editorWidget.border": s.border1,

    "editorGroupHeader.tabsBackground": s.bg0,
    "editorGroupHeader.tabsBorder": s.border0,
    "tab.activeBackground": s.bg1,
    "tab.activeForeground": s.fg0,
    "tab.activeBorderTop": a.tabActiveTop,
    "tab.inactiveBackground": s.bg0,
    "tab.inactiveForeground": s.fg3,
    "tab.hoverBackground": s.bg2,
    "tab.border": s.border0,
    "breadcrumb.foreground": s.fg3,
    "breadcrumb.background": s.bg1,
    "breadcrumb.focusForeground": s.fg0,
    "breadcrumb.activeSelectionForeground": a.focus,

    "panel.background": s.bg2,
    "panel.border": s.border0,
    "panelTitle.activeForeground": s.fg0,
    "panelTitle.inactiveForeground": s.fg3,
    "panelTitle.activeBorder": a.focus,

    "statusBar.background": a.statusBar,
    "statusBar.foreground": a.statusBarFg,
    "statusBar.border": s.border0,
    "statusBar.debuggingBackground": a.warning,
    "statusBar.debuggingForeground": s.bg0,
    "statusBar.noFolderBackground": s.bg2,
    "statusBar.noFolderForeground": s.fg1,
    "statusBarItem.hoverBackground": alphaColor(a.focus, 0.2, s.bg3),
    "statusBarItem.remoteBackground": a.focus,
    "statusBarItem.remoteForeground": s.bg0,

    "terminal.background": s.bg0,
    "terminal.foreground": s.fg1,
    "terminal.border": s.border0,
    "terminalCursor.foreground": a.cursor,
    "terminal.selectionBackground": a.selection,
    "terminal.ansiBlack": s.bg0,
    "terminal.ansiRed": a.error,
    "terminal.ansiGreen": a.success,
    "terminal.ansiYellow": a.warning,
    "terminal.ansiBlue": a.focus,
    "terminal.ansiMagenta": a.modified,
    "terminal.ansiCyan": a.focus,
    "terminal.ansiWhite": s.fg1,
    "terminal.ansiBrightBlack": s.fg3,
    "terminal.ansiBrightRed": a.error,
    "terminal.ansiBrightGreen": a.success,
    "terminal.ansiBrightYellow": a.warning,
    "terminal.ansiBrightBlue": a.focus,
    "terminal.ansiBrightMagenta": a.modified,
    "terminal.ansiBrightCyan": a.focus,
    "terminal.ansiBrightWhite": s.fg0,

    "input.background": s.bg2,
    "input.foreground": s.fg0,
    "input.border": s.border1,
    "input.placeholderForeground": s.fg3,
    "inputOption.activeBorder": a.focus,
    "inputValidation.errorBackground": alphaColor(a.error, 0.15, s.bg2),
    "inputValidation.errorBorder": a.error,
    "inputValidation.warningBackground": alphaColor(a.warning, 0.15, s.bg2),
    "inputValidation.warningBorder": a.warning,

    "button.background": a.focus,
    "button.foreground": s.bg0,
    "button.hoverBackground": alphaColor(a.focus, 0.85, a.focus),
    "button.secondaryBackground": s.bg3,
    "button.secondaryForeground": s.fg1,
    "extensionButton.background": a.focus,
    "extensionButton.foreground": s.bg0,
    "extensionButton.hoverBackground": alphaColor(a.focus, 0.85, a.focus),
    "extensionButton.prominentBackground": a.focus,
    "extensionButton.prominentForeground": s.bg0,
    "extensionButton.prominentHoverBackground": alphaColor(a.focus, 0.85, a.focus),
    "dropdown.background": s.bg2,
    "dropdown.foreground": s.fg0,
    "dropdown.border": s.border1,

    "badge.background": s.bg3,
    "badge.foreground": s.fg1,
    "progressBar.background": a.focus,

    "scrollbarSlider.background": alphaColor(s.bg3, 0.7, s.bg3),
    "scrollbarSlider.hoverBackground": alphaColor(s.border1, 0.8, s.border1),
    "scrollbarSlider.activeBackground": alphaColor(a.focus, 0.6, a.focus),

    "peekView.border": a.focus,
    "peekViewEditor.background": s.bg1,
    "peekViewResult.background": s.bg0,
    "peekViewTitle.background": s.bg2,

    "diffEditor.insertedTextBackground": alphaColor(a.added, 0.15, s.bg1),
    "diffEditor.removedTextBackground": alphaColor(a.deleted, 0.15, s.bg1),

    "quickInput.background": s.bg2,
    "quickInput.foreground": s.fg1,
    "quickInputList.focusBackground": a.listActive,
    "quickInputList.focusForeground": a.listActiveFg,
    "quickInputList.focusIconForeground": alphaColor(a.focus, 0.75, a.focus),

    "menu.background": s.bg2,
    "menu.foreground": s.fg1,
    "menu.selectionBackground": a.listActive,
    "menu.selectionForeground": a.listActiveFg,

    textLink: a.focus,
    "textLink.activeForeground": a.focus,
    textPreformatForeground: s.fg2,
    textPreformatBackground: s.bg3,
    textCodeBlockBackground: s.bg2,

    "gitDecoration.addedResourceForeground": a.added,
    "gitDecoration.modifiedResourceForeground": a.modified,
    "gitDecoration.deletedResourceForeground": a.deleted,

    "keybindingLabel.background": s.bg3,
    "keybindingLabel.foreground": s.fg0,
    "keybindingLabel.border": s.border1,

    // Chat and AI
    "chat.background": s.bg1,
    "chat.requestBackground": s.bg0,
    "chat.requestBorder": s.border0,
    "chat.slashCommandBackground": alphaColor(a.focus, 0.2, s.bg3),
    "chat.slashCommandForeground": a.focus,
    "chat.avatarBackground": s.bg2,
    "chat.avatarForeground": s.fg1,
    "inlineChat.background": s.bg2,
    "inlineChat.border": s.border1,
    "inlineChat.shadow": alphaColor(s.bg0, 0.5, s.border0),
    "inlineChatInput.background": s.bg0,
    "inlineChatInput.border": s.border0,
    "inlineChatInput.focusBorder": a.focus,
    "inlineChatInput.placeholderForeground": s.fg3,
    "inlineChatDiff.inserted": alphaColor(a.added, 0.15, s.bg1),
    "inlineChatDiff.removed": alphaColor(a.deleted, 0.15, s.bg1),

    // SCM Graph
    "scmGraph.foreground1": a.focus,
    "scmGraph.foreground2": a.warning,
    "scmGraph.foreground3": a.error,
    "scmGraph.foreground4": a.success,
    "scmGraph.foreground5": a.modified,
    "scmGraph.historyItemBaseRefColor": a.focus,
    "scmGraph.historyItemHoverAdditionsForeground": a.added,
    "scmGraph.historyItemHoverDeletionsForeground": a.deleted,
    "scmGraph.historyItemHoverLabelForeground": s.fg0,
    "scmGraph.historyItemRefColor": a.focus,
    "scmGraph.historyItemRemoteRefColor": a.modified,

    // Radio & Gauge
    "radio.activeBackground": alphaColor(a.focus, 0.2, s.bg3),
    "radio.activeBorder": a.focus,
    "radio.activeForeground": a.focus,
    "radio.inactiveBackground": s.bg2,
    "radio.inactiveBorder": s.border1,
    "radio.inactiveForeground": s.fg2,
    "radio.inactiveHoverBackground": s.bg3,
    "gauge.errorBackground": alphaColor(a.error, 0.2, s.bg2),
    "gauge.errorForeground": a.error,
    "gauge.infoBackground": alphaColor(a.focus, 0.2, s.bg2),
    "gauge.infoForeground": a.focus,
    "gauge.warningBackground": alphaColor(a.warning, 0.2, s.bg2),
    "gauge.warningForeground": a.warning,

    // CommandCenter
    "commandCenter.background": s.bg2,
    "commandCenter.foreground": s.fg2,
    "commandCenter.border": s.border0,
    "commandCenter.activeBackground": s.bg3,
    "commandCenter.activeForeground": s.fg0,
    "commandCenter.activeBorder": a.focus,
    "commandCenter.debuggingBackground": a.warning,
    "commandCenter.inactiveForeground": s.fg3,
    "commandCenter.inactiveBorder": s.border0,

    // MultiDiff
    "multiDiffEditor.background": s.bg0,
    "multiDiffEditor.border": s.border0,
    "multiDiffEditor.headerBackground": s.bg2,

    // ProfileBadge
    "profileBadge.background": s.bg3,
    "profileBadge.foreground": s.fg1,

    // Checkbox
    "checkbox.background": s.bg2,
    "checkbox.border": s.border1,
    "checkbox.foreground": s.fg0,
    "checkbox.selectBackground": a.focus,
    "checkbox.selectBorder": a.focus,

    // Symbol Icons
    "symbolIcon.arrayForeground": direction.syntax.column,
    "symbolIcon.booleanForeground": direction.syntax.number,
    "symbolIcon.classForeground": direction.syntax.type,
    "symbolIcon.colorForeground": s.fg2,
    "symbolIcon.constantForeground": direction.syntax.constant,
    "symbolIcon.constructorForeground": direction.syntax.function,
    "symbolIcon.enumeratorForeground": direction.syntax.type,
    "symbolIcon.enumeratorMemberForeground": direction.syntax.constant,
    "symbolIcon.eventForeground": direction.syntax.function,
    "symbolIcon.fieldForeground": direction.syntax.column,
    "symbolIcon.fileForeground": s.fg1,
    "symbolIcon.folderForeground": s.fg2,
    "symbolIcon.functionForeground": direction.syntax.function,
    "symbolIcon.interfaceForeground": direction.syntax.type,
    "symbolIcon.keyForeground": direction.syntax.type,
    "symbolIcon.keywordForeground": direction.syntax.keyword,
    "symbolIcon.methodForeground": direction.syntax.function,
    "symbolIcon.moduleForeground": direction.syntax.keyword,
    "symbolIcon.namespaceForeground": direction.syntax.keyword,
    "symbolIcon.numberForeground": direction.syntax.number,
    "symbolIcon.objectForeground": direction.syntax.column,
    "symbolIcon.operatorForeground": direction.syntax.operator,
    "symbolIcon.packageForeground": direction.syntax.keyword,
    "symbolIcon.propertyForeground": direction.syntax.column,
    "symbolIcon.referenceForeground": direction.syntax.alias,
    "symbolIcon.snippetForeground": direction.syntax.alias,
    "symbolIcon.stringForeground": direction.syntax.string,
    "symbolIcon.structForeground": direction.syntax.type,
    "symbolIcon.textForeground": s.fg1,
    "symbolIcon.typeParameterForeground": direction.syntax.type,
    "symbolIcon.unitForeground": direction.syntax.number,
    "symbolIcon.variableForeground": direction.syntax.column,
  };

  // High-contrast specific keys
  if (isHc) {
    colors.contrastActiveBorder = a.focus;
    colors.contrastBorder = s.border0;
  }

  for (let i = 0; i < 6; i += 1) {
    if (brackets[i]) {
      colors[`editorBracketHighlight.foreground${i + 1}`] = brackets[i];
    }
  }

  return sortColors({ ...colors, ...direction.workbenchOverrides });
}

/** Keys every preview theme must define. */
export const PREVIEW_COLOR_KEYS = Object.freeze([
  "focusBorder",
  "foreground",
  "editor.background",
  "editor.foreground",
  "sideBar.background",
  "list.activeSelectionBackground",
  "list.activeSelectionForeground",
  "statusBar.background",
  "statusBar.foreground",
  "tab.activeBorderTop",
  "terminal.background",
  "input.background",
  "input.foreground",
]);
