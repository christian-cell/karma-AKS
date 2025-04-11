Run container

```
$parameters = @(
    "--publish", "8084:8084"
    "--publish", "8085-8086:8085-8086"
    "--name", "windows-emulator"
    "--detach"
)
docker run @parameters mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:latest
```

Certificates

```
$parameters = @{
    Uri = 'https://localhost:8084/_explorer/emulator.pem'
    Method = 'GET'
    OutFile = 'emulatorcert.crt'
    SkipCertificateCheck = $True
}
Invoke-WebRequest -Uri 'https://localhost:8084/_explorer/emulator.pem' -Method GET -OutFile 'emulatorcert.crt' -UseBasicParsing

```

Install Certificates

```
$parameters = @{
    FilePath = 'emulatorcert.crt'
    CertStoreLocation = 'Cert:\CurrentUser\Root'
}
Import-Certificate @parameters
```