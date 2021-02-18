default:
	make docker/build && \
	make docker/run

docker/run:
	docker run -it document-mutation

docker/build:
	docker build -t document-mutation .
