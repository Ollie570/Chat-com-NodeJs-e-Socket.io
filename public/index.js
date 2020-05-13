function salvar() {
    let nome = document.getElementById("nome").value;
    let texto = document.getElementById("texto").value;
    let blob = new Blob([texto],
        {
            type: "text/plain;charset=utf-8"
        });

        //Método do FileSaver:
        saveAs(blob, nome + ".txt");
}
