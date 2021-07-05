# microservice-template
Template repository für Microservices

## Verwendung
Das vorliegende Repository ist ein Template für die Entwicklung von Mircoservices, die dann auf einen Kubernetes Cluster ausgeliefert werden. Nachdem ihr anhand des Templates euer eigenes Repository erstellt habt, müssen noch einige Einstellungen vorgenommen werden, die im folgenden beschrieben werden.

### Dockerfile
Die Dockerfile ist die Grundlage um euren Microservice zu kontainierisieren. Ein paar einfache Dockerfiles für Golang, NodeJS und Python sind im Repository enthalten, müssen aber entsprechend den Anforderungen des jeweiligen Microservice angepasst und erweitert werden. 

### Manifest
Die Manifest-Datei stellt die Konfiguration des Microservices auf dem Cluster dar. Dazu gehören z.B. das in den Kontainern auzuführende Image, Ports sowie der Kuberneter-Service, der einzelne Kontainer zusammenfasst. Eine Beispielkonfiguration findet ihr in der Datei `manifests/myapp.yaml`. Ersetzt darin die Labels `myapp` mit eurem eigenen Bezeichner und stellt sicher, dass die richtigen Ports sowie das richtige Container-Image eingetragen sind. Letzteres ist im Format `<REGISTRY>/<IMAGE_NAME>:<TAG>` anzugeben, wobei für euch aber nur `<IMAGE_NAME>` relevant ist.

### CI/CD
Um die CI/CD Pipeline zu konfigurieren müsst ihr in der Datei `.github/workflows/deploy.yml` die folgenden Umgebungsvariablen setzen:
* IMAGE_NAME: Der Name des zu erstellenden Image. Muss der selbe sein wie in der Manifest-Datei (d.h. ohne Registry und Tag)
* SERVICE_NAME: Der Name unter dem der Service auf dem Cluster laufen soll
* DOCKERFILE: Pfad zu eurer Dockerefile (z.B. `./Dockerfile`)
* MANIFESTFILE: Pfad zu eurer Manifest-Datei (z.B. `manifests/myapp.yaml`)

Die CI/CD Pipeline basiert auf einer GitHub Action, die automatisch startet sobald ein Push auf den Main-Branch ausgeführt wird. Die Action arbeitet in zwei Schritten: `build` und `deploy`. Im ersten Schritt wird anhand der Dockerfile aus euren Quellen ein neues Image gebaut und auf die Container-Registry für den Cluster hochgeladen. Im zweiten Schritt wird dann der Microservice mit diesem Image neu gestartet. Unter dem Reiter `Actions` in eurem Repository könnt ihr den Status der Action nachsehen. Falls es beim Ausführen der Action zu einem Fehler kommt, könnt ihr auch die Logs einsehen.
