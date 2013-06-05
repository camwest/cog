#/bin/bash

TESTS = $(shell find test -name "*Spec.js")

test:
	@./node_modules/.bin/mocha $(TESTS)

.PHONY: test
