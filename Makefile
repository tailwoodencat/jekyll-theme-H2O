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
	gem list rake	gem install rake
	gem install bundler
	gem install --user-install jekyll -v '${ENV_JEKYLL_VERSION}'

init:
	@echo "=> this project use rake more: https://github.com/ruby/rake"
	@echo "-> if not install just run [make installDev]"
	rake -V
	bundle -v

install:
	bundle install

debug:
	bundle exec jekyll serve --host ${ENV_JEKYLL_HOST} --port ${ENV_JEKYLL_PORT}

help: printInfo
	@echo "Help of task"
	@echo "make init ~> init check"
	@echo "make debug ~> run at http://${ENV_JEKYLL_HOST}:${ENV_JEKYLL_PORT}/"
	@echo "you can install rake and new file as"
	@echo "rake post title='article name'"