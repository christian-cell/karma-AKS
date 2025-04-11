FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080

ENV DOCKER_ENV=docker

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release

WORKDIR /src
COPY . .

RUN dotnet restore "Karma.API/Karma.API.csproj"
RUN dotnet build "Karma.API/Karma.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Karma.API/Karma.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Karma.API.dll"]
#ENTRYPOINT ["dotnet", "watch","run", -v, "--project" , "Karma.API/Karma.API.csproj"]