
# SOAR Service Mesh

This document provides a guide for deploying microservices using a SOAR service mesh, including the installation of Linkerd, Prometheus, and Grafana.

## Table of Contents
1. [Deploying Microservices](#deploying-microservices)
2. [Installing Linkerd](#installing-linkerd)
3. [Prometheus and Grafana](#prometheus-and-grafana)

## Deploying Microservices

### Creating a Namespace
Create a namespace for the SOAR task:
```bash
kubectl create namespace soar-task
```

### Setting the Folder Structure
Assume a monorepo structure for simplicity.

### Kubernetes: Helm Packages for the Microservices
Add Helm packages for each microservice.

### Adding Express Docker Files
Example Dockerfile for an Express service:
```dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --verbose
COPY . .
CMD ["node", "serviceA.js"]
```
- **Node18-alpine**: Lightweight version of Node.js.
- **WORKDIR**: Sets the working directory to `/usr/src/app`.
- **COPY**: Copies package files and source code.
- **RUN npm ci**: Performs a clean installation to ensure `package.json` is maintainable in production.

Build all images and push them to Docker Hub.

### Helm Packages
Each service has its own Helm package for modularity. Example command:
```bash
helm upgrade servicec ./ -n soar-task --install
```
Since Linkerd is not installed yet, it will only have 1/1 replica pods.

## Installing Linkerd
Follow the [Linkerd documentation](https://linkerd.io/2.15/getting-started/) for installation. There are multiple deployment models, but for Dockerized microservices on Kubernetes, we use a sidecar proxy.

### Injecting the Sidecar
Add the sidecar injection in the Kubernetes manifest:
```yaml
template:
  metadata:
    labels:
      app: {{ include "servicec.name" . }}
      release: {{ .Release.Name }}
    annotations:
      linkerd.io/inject: enabled
```

## Prometheus and Grafana
After setting up the service mesh, integrate Prometheus and Grafana to persist metrics.

### Installing Grafana
Install the Linkerd viz extension, which includes Prometheus. Then, follow the [Linkerd Grafana integration guide](https://linkerd.io/2.15/tasks/grafana/#hook-grafana-with-linkerd-viz-dashboard) to install Grafana.

### Viewing Metrics
Once Grafana is installed, access the dashboard to view Linkerd metrics.
