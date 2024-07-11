# Use uma imagem base com um servidor web (por exemplo, Nginx)
# O nginx é um servidor leve e de código fonte aberto para realizar requisições HTTP
FROM nginx:alpine

# Copie o conteúdo do diretório atual para o diretório padrão de conteúdo do Nginx
COPY . /usr/share/nginx/html

# Garanta que o Nginx tenha permissão para acessar os arquivos estáticos
RUN chmod -R 755 /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]

