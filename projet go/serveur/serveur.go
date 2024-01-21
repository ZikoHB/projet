package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

func main() {
	ln, err := net.Listen("tcp", ":8080")
	if err != nil {
		fmt.Println(err)
		return
	}

	for {
		conn, err := ln.Accept()
		if err != nil {
			fmt.Println(err)
			continue
		}

		id, _ := bufio.NewReader(conn).ReadString('\n')
		fmt.Printf("%s s'est connecter au serveur ", id) /* ici les problèmes d'indentation sont dû a la lecture au faite que ReadString() s'arrête au \n mais ne l'enlève pas du coup le retour a ligne est interpreter malgré tout*/

		go handleConnection(conn, id)
	}

}

func handleConnection(conn net.Conn, id string) {

	log, _ := os.OpenFile("log.txt", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0600)
	defer conn.Close()
	defer log.Close()

	//cpt := 3

	for {
		/*for cpt != 0 {
			fmt.Printf("identifiez-vous pour acceder au serveur")
			id, err := bufio.NewReader(conn).ReadString('\n')
			if err != nil {
				fmt.Println(err)
				return
			}
			if id == "" {
				cpt -= 1
				fmt.Printf("entrez un vrai nom (%v essai restant)", cpt)
			}
		}*/
		/*if cpt == 0 {
			fmt.Printf("accès refusé")
			return
		}*/
		buf := make([]byte, 1024)
		msg, err := conn.Read(buf)
		if err != nil {
			fmt.Println(err)
			return
		}
		if string(buf) == "EOF" {
			return
		}
		log.WriteString(string(id) + " : " + string(msg))
		fmt.Printf("\n%s -> %s", id, buf)
	}
}
