.PHONY: dist test build
ENV_VERSION = 1.0.0
ENV_JEKYLL_VERSION ?= 3.8.7
ENV_JEKYLL_HOST ?= 0.0.0.0
ENV_JEKYLL_PORT ?= 54000

printInfo:
	@echo "=> Script Info version $(ENV_VERSION)"
	@echo ""
	@echo "jekyll theme use https://github.com/kaeyleo/jekyll-theme-H2O"
	@echo "jekyll version use as: $(ENV_JEKYLL_VERSION)"
	@echo ""

installDev:
	@echo "=> start install rake more: https://github.com/ruby/rake"
	gem list rake
	gem install rake
	gem install bundler
	gem install sass
	gem install --user-install jekyll -v '${ENV_JEKYLL_VERSION}'
	npm install uglifyjs-folder -g

init:
	@echo "=> this project use rake more: https://github.com/ruby/rake"
	@echo "-> if not install just run [make installDev]"
	rake -V
	bundle -v

install:
	@if [ -d node_modules ]; \
	then rm -rf node_modules && echo "~> cleaned node_modules"; \
	else echo "~> has cleaned node_modules"; \
	fi
	@if [ -f package-lock.json ]; \
	then rm -rf package-lock.json && echo "~> cleaned package-lock.json"; \
	else echo "~> has cleaned package-lock.json"; \
	fi
	bundle install

debug:
	bundle exec jekyll serve --host ${ENV_JEKYLL_HOST} --port ${ENV_JEKYLL_PORT}

build: install
	bundle exec bundle exec jekyll build --baseurl /

uglifyjs:
	uglifyjs-folder dev/js/ -o assets/js/index.min.js

minifySass:
	@if [ -d .sass-cache ]; \
	then rm -rf .sass-cache && echo "~> cleaned .sass-cache"; \
	else echo "~> has cleaned .sass-cache"; \
	fi
	sass -v
	sass --style compressed --sourcemap=none dev/sass/app.scss assets/css/app.min.css

minify: uglifyjs minifySass
	@echo "minify success"

help: printInfo
	@echo "Help of task"
	@echo "make init       ~> init check"
	@echo "make debug      ~> run at http://${ENV_JEKYLL_HOST}:${ENV_JEKYLL_PORT}/"
	@echo "make build      ~> build at _site"
	@echo ""
	@echo "=> new file as"
	@echo "rake post title='article name'"
	@echo "=> new assets for image as:"
	@echo "rake assetsFoder -g img"