install:
		npm ci
		npm link
gendiff:
		node bin/gendiff.js # запуск					
publish:
		npm publish --dry-run # публикация
lint:
		npx eslint . # eslinting
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage