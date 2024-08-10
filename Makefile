install:
	cd client && npm install
	cd server && npm install

infra-build-run:
	docker compose up --build -d

infra-run:
	docker compose up -d

run:
	cd client && npm run dev
	cd server && npm run start:dev