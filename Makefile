.PHONY: all clean install build validate package package-dry-run watch debug open help

# Variables
NODE_BIN := node
NPM_BIN := npm
VSCE_CMD := npx -y @vscode/vsce@2.24.0
VSCODE ?= code

EXTENSION_NAME := $(shell $(NODE_BIN) -p "require('./package.json').name")
EXTENSION_VERSION := $(shell $(NODE_BIN) -p "require('./package.json').version")
VSIX_FILE := $(EXTENSION_NAME)-$(EXTENSION_VERSION).vsix

# Default target
all: clean install build package

help:
	@printf '%s\n' \
		'Usage: make <target>' \
		'' \
		'Targets:' \
		'  all             Clean, install, build, and package' \
		'  clean           Remove build artifacts' \
		'  install         Install dependencies' \
		'  build           Generate + validate themes (pre-F5 / pre-package)' \
		'  validate        Run theme manifest validation' \
		'  package         Create a VS Code extension package (.vsix)' \
		'  package-dry-run Inspect the files that would be packaged' \
		'  watch           Re-run validation (no compile step for themes)' \
		'  debug           Launch Extension Development Host via CLI' \
		'  open            Open the workspace in VS Code' \
		'' \
		'Development:' \
		'  Press F5 in VS Code ("Run Extension") to test without packaging.'

clean:
	rm -rf *.vsix node_modules

install:
	$(NPM_BIN) install

build:
	$(NPM_BIN) run compile

validate:
	$(NPM_BIN) run validate

package: build
	$(VSCE_CMD) package

package-dry-run:
	npm pack --dry-run

watch:
	$(NPM_BIN) run watch

debug:
	$(VSCODE) --new-window --extensionDevelopmentPath="$(PWD)" "$(PWD)"

open:
	$(VSCODE) --new-window "$(PWD)"
