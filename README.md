# Gigapay API Documentation

Based on [slate docs](https://github.com/slatedocs/slate).

### Running the development server
```
$ docker run --rm --name slate -p 4567:4567 -v $(pwd)/source:/srv/slate/source slatedocs/slate serve
```
### Deploying
```
$  ./deploy.sh --push-only
```
