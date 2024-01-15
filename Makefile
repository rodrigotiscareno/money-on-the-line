APP_DIR := app
SERVER_DIR := server

install-app:
	cd $(APP_DIR) && npm install --legacy-peer-deps

start-app:
	cd $(APP_DIR) && npm expo start

start-server:
	cd $(SERVER_DIR) && source venv/bin/acivate && python app.py

start-all:
	make -j2 start-app start-server

.PHONY: install start-app start-server start-all
