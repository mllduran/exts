kubectl apply -f k8s/1-express.yaml

kubectl -n staging port-forward svc/express 8080:8080

kubectl get svc -n ingress-nginx