import paramiko
import re
import requests

# Configuración de la conexión SSH
HOST = "201.96.100.21"
USER = "ADMON_SSH_diagnos"
PORT = 5728
PASSWORD = "DIAGNOSAdmon69_ssh"

# URL de la API
API_URL = "http://localhost:8001/api/Test/save"  # Cambia con la URL correcta de tu API

# Configuración de las opciones SSH
KEX_ALGORITHMS = "diffie-hellman-group1-sha1"
HOST_KEY_ALGORITHMS = "ssh-rsa"
PUBKEY_ACCEPTED_KEY_TYPES = "ssh-rsa"

# Función para obtener la configuración del switch
def obtener_configuracion():
    try:
        # Configuración del cliente SSH
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        # Establecer la conexión SSH con las opciones correctas
        client.connect(
            hostname=HOST,
            port=PORT,
            username=USER,
            password=PASSWORD,
            look_for_keys=False,
            allow_agent=False,
            disabled_algorithms={
                'kex': [KEX_ALGORITHMS],
                'hostkey': [HOST_KEY_ALGORITHMS],
                'pubkeys': [PUBKEY_ACCEPTED_KEY_TYPES]
            }
        )

        # Ejecutar el comando para obtener la configuración
        stdin, stdout, stderr = client.exec_command("show config")
        configuracion = stdout.read().decode()

        # Cerrar la conexión SSH
        client.close()
        return configuracion
    except Exception as e:
        print(f"Error al conectar: {e}")
        return None

# Función para extraer los datos clave de la configuración
def extraer_datos(configuracion):
    patrones = {
        "version": r"version (\d+\.\d+)",
        "hostname": r"hostname (\S+)",
        "enable_secret": r"enable secret 5 (\S+)",
        "ssh_version": r"ip ssh version (\d+)",
        "ssh_timeout": r"ip ssh time-out (\d+)",
        "ssh_port": r"ip ssh port (\d+) rotary (\d+)",
        "dhcp_excluded_addresses": r"ip dhcp excluded-address (\d+\.\d+\.\d+\.\d+)",
        "license": r"license udi pid (\S+) sn (\S+)",
        "username_privilege": r"username (\S+) privilege (\d+) password 7 (\S+)",
        "interfaces": r"interface (\S+)\s+description (.+?)\s+ip address (\d+\.\d+\.\d+\.\d+ \d+\.\d+\.\d+\.\d+)",
        "ip_routes": r"ip route (\d+\.\d+\.\d+\.\d+ \d+\.\d+\.\d+\.\d+ \d+\.\d+\.\d+\.\d+)",
        "access_lists": r"access-list (\d+) (permit|deny) (\S+)",
        "line_con_password": r"line con \d+\s+password 7 (\S+)",
        "line_vty_password": r"line vty \d+ \d+\s+.*?password 7 (\S+)",
    }

    # Aplicar los patrones para extraer los datos
    datos = {clave: re.findall(patron, configuracion) for clave, patron in patrones.items()}
    return datos

def enviar_a_api(datos):
    # Crear el payload asegurando que todos los datos se envíen incluso si están vacíos
    payload = {
        "version": datos.get("version", [""])[0] if datos.get("version") else "",
        "hostname": datos.get("hostname", [""])[0] if datos.get("hostname") else "",
        "enableSecret": datos.get("enable_secret", [""])[0] if datos.get("enable_secret") else "",
        "sshVersion": datos.get("ssh_version", [""])[0] if datos.get("ssh_version") else "",
        "sshTimeout": datos.get("ssh_timeout", [""])[0] if datos.get("ssh_timeout") else "",
        "sshPort": datos.get("ssh_port", [("", "")])[0][0] if datos.get("ssh_port") else "",
        "dhcpExcludedAddresses": ', '.join([addr for addr in datos.get("dhcp_excluded_addresses", [])]),
        "licensePid": datos.get("license", [("", "")])[0][0] if datos.get("license") else "",
        "licenseSn": datos.get("license", [("", "")])[0][1] if datos.get("license") else "",
        "usernamePrivilege": str([{"username": u[0], "privilege": u[1], "password": u[2]} for u in datos.get("username_privilege", [])]) if datos.get("username_privilege") else "",
        "interfaces": str([{"interface": i[0], "description": i[1], "ip_address": i[2]} for i in datos.get("interfaces", [])]) if datos.get("interfaces") else "",
        "ipRoutes": ', '.join([route for route in datos.get("ip_routes", [])]),
        "accessLists": str([{"list_number": a[0], "action": a[1], "ip": a[2]} for a in datos.get("access_lists", [])]) if datos.get("access_lists") else "",
        "lineConPassword": datos.get("line_con_password", [""])[0] if datos.get("line_con_password") else "",
        "lineVtyPassword": ', '.join(datos.get("line_vty_password", [""])) if datos.get("line_vty_password") else "",   
    }

    # Enviar la solicitud POST a la API
    try:
        response = requests.post(API_URL, json=payload)
        response.raise_for_status()
        print("Datos enviados correctamente:", response.json())
    except requests.exceptions.HTTPError as err:
        print(f"Error al enviar los datos a la API: {err}")
        
# Main
if __name__ == "__main__":
    configuracion = obtener_configuracion()
    if configuracion:
        datos_filtrados = extraer_datos(configuracion)
        print("Datos extraídos:", datos_filtrados)
        enviar_a_api(datos_filtrados)