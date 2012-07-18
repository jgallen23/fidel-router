build:
	./node_modules/.bin/smoosh make ./build.json

install:
	npm install chai
	npm install mocha
	npm install smoosh

.PHONY: install
