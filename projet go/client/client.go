package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"strings"
)

func main() {
	/* arguments := os.Args
	if len(argument) == 1{
		fmt.Println("donnez un port hôte")
		return
	}
	conn := arguments[1]
	*/
	conn, err := net.Dial("tcp", "localhost:8080")
	if err != nil {
		fmt.Println(err)
		return
	}

	/*message := promptClient("Votre nom ? : ")
	_, err = conn.Write([]byte(message))*/
	fmt.Printf(("Votre nom ? : "))
	rid := bufio.NewReader(os.Stdin)
	id, _ := rid.ReadString('\n')
	fmt.Fprint(conn, id)

	for {
		fmt.Printf(">>> ")
		r := bufio.NewReader(os.Stdin)
		text, _ := r.ReadString('\n')
		if text == "!exit\n" {
			break
		}

		fmt.Fprint(conn, text)

		if err != nil {
			fmt.Println(err)
			return
		}
	}

	conn.Close()
}

func promptClient(texte string) string {
	var s string
	r := bufio.NewReader(os.Stdin)
	fmt.Fprint(os.Stderr, texte)
	s, _ = r.ReadString('\n')
	return strings.TrimSpace(s)
}
